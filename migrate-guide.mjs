/**
 * Migrates the Warranty Management Software guide from Webflow to Sanity.
 * Downloads the hero image + all inline images, uploads to Sanity,
 * converts HTML → Portable Text, creates the guide document.
 */
import {createClient} from '@sanity/client';
import https from 'https';
import {readFileSync} from 'fs';

const config = JSON.parse(readFileSync(`${process.env.HOME}/.config/sanity/config.json`, 'utf8'));
const client = createClient({
  projectId: '2clvfbpa', dataset: 'production',
  apiVersion: '2026-06-03', token: config.authToken, useCdn: false,
});

const WF_TOKEN = process.env.WEBFLOW_API_TOKEN || '';
const GUIDE_COLLECTION = '69612683c85979e67986479d';

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    https.get(u, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location)
        return fetchBuffer(res.headers.location).then(resolve).catch(reject);
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function uploadImage(url, filename) {
  if (!url) return null;
  try {
    console.log(`  ↑ Uploading: ${filename}`);
    const buf = await fetchBuffer(url);
    const ext = url.split('?')[0].split('.').pop().toLowerCase();
    const mimeMap = {png:'image/png',jpg:'image/jpeg',jpeg:'image/jpeg',webp:'image/webp',gif:'image/gif',svg:'image/svg+xml'};
    const asset = await client.assets.upload('image', buf, {filename, contentType: mimeMap[ext] || 'image/jpeg'});
    return asset;
  } catch(e) {
    console.warn(`  ⚠ Failed: ${filename}: ${e.message}`);
    return null;
  }
}

// ── HTML → Portable Text with image uploads ────────────────────────────────
let keyCounter = 0;
const nextKey = () => `k${keyCounter++}`;

async function htmlToBlocks(html) {
  const blocks = [];

  // Pre-upload all images
  const imgRegex = /<img[^>]+src="([^"]+)"[^>]*>/gi;
  const imgMap = {};
  let imgMatch;
  let imgIdx = 0;
  while ((imgMatch = imgRegex.exec(html)) !== null) {
    const imgUrl = imgMatch[1];
    if (!imgMap[imgUrl]) {
      const asset = await uploadImage(imgUrl, `guide-img-${imgIdx++}`);
      if (asset) imgMap[imgUrl] = asset._id;
    }
  }

  // Split on block-level element boundaries
  const parts = html.split(/(?=<(?:h[1-6]|p|ul|ol|blockquote|figure|img)[^>]*>)/i);

  for (const part of parts) {
    if (!part.trim()) continue;

    // Headings
    const hMatch = part.match(/^<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/i);
    if (hMatch) {
      const style = hMatch[1].toLowerCase();
      const {children, markDefs} = parseInline(hMatch[2]);
      if (children.length > 0)
        blocks.push({_type: 'block', _key: nextKey(), style, children, markDefs});
      continue;
    }

    // Standalone img tag
    const imgTag = part.match(/^<img[^>]+src="([^"]+)"[^>]*>/i);
    if (imgTag) {
      const imgUrl = imgTag[1];
      const altM = part.match(/alt="([^"]*)"/i);
      if (imgMap[imgUrl]) {
        blocks.push({_type: 'image', _key: nextKey(), alt: altM?.[1] || '', asset: {_type: 'reference', _ref: imgMap[imgUrl]}});
      }
      continue;
    }

    // Unordered list
    const ulMatch = part.match(/^<ul[^>]*>([\s\S]*?)<\/ul>/i);
    if (ulMatch) {
      for (const [, inner] of ulMatch[1].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)) {
        const {children, markDefs} = parseInline(inner);
        if (children.length > 0)
          blocks.push({_type: 'block', _key: nextKey(), style: 'normal', listItem: 'bullet', level: 1, children, markDefs});
      }
      continue;
    }

    // Ordered list
    const olMatch = part.match(/^<ol[^>]*>([\s\S]*?)<\/ol>/i);
    if (olMatch) {
      for (const [, inner] of olMatch[1].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)) {
        const {children, markDefs} = parseInline(inner);
        if (children.length > 0)
          blocks.push({_type: 'block', _key: nextKey(), style: 'normal', listItem: 'number', level: 1, children, markDefs});
      }
      continue;
    }

    // Blockquote
    const bqMatch = part.match(/^<blockquote[^>]*>([\s\S]*?)<\/blockquote>/i);
    if (bqMatch) {
      const {children, markDefs} = parseInline(bqMatch[1]);
      if (children.length > 0)
        blocks.push({_type: 'block', _key: nextKey(), style: 'blockquote', children, markDefs});
      continue;
    }

    // Paragraph
    const pMatch = part.match(/^<p[^>]*>([\s\S]*?)<\/p>/i);
    if (pMatch) {
      const inner = pMatch[1];
      // Paragraph containing an image
      const pImgMatch = inner.match(/<img[^>]+src="([^"]+)"[^>]*>/i);
      if (pImgMatch && imgMap[pImgMatch[1]]) {
        const altM = inner.match(/alt="([^"]*)"/i);
        blocks.push({_type: 'image', _key: nextKey(), alt: altM?.[1] || '', asset: {_type: 'reference', _ref: imgMap[pImgMatch[1]]}});
        const textOnly = stripTags(inner.replace(/<img[^>]*>/gi, '')).trim();
        if (textOnly)
          blocks.push({_type: 'block', _key: nextKey(), style: 'normal', children: [{_type: 'span', _key: nextKey(), text: textOnly, marks: []}], markDefs: []});
        continue;
      }
      const {children, markDefs} = parseInline(inner);
      if (children.length > 0 && children.some(c => c.text?.trim()))
        blocks.push({_type: 'block', _key: nextKey(), style: 'normal', children, markDefs});
      continue;
    }
  }

  return blocks;
}

function parseInline(html) {
  const children = [];
  const markDefs = [];
  const cleaned = html.replace(/<img[^>]*>/gi, '').replace(/<br\s*\/?>/gi, '\n');

  // Tokenize inline elements
  const regex = /(<(?:strong|b|em|i|u|a)[^>]*>[\s\S]*?<\/(?:strong|b|em|i|u|a)>)/gi;
  const parts = cleaned.split(regex);

  for (const part of parts) {
    if (!part) continue;

    const strongMatch = part.match(/^<(?:strong|b)[^>]*>([\s\S]*?)<\/(?:strong|b)>/i);
    if (strongMatch) {
      // Could also contain em or a inside — handle recursively for common case
      const inner = strongMatch[1];
      const linkM = inner.match(/^<a[^>]+href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/i);
      if (linkM) {
        const key = nextKey();
        const mdKey = nextKey();
        markDefs.push({_type: 'link', _key: mdKey, href: linkM[1]});
        const text = stripTags(linkM[2]).trim();
        if (text) children.push({_type: 'span', _key: key, text, marks: ['strong', mdKey]});
      } else {
        const text = stripTags(inner).trim();
        if (text) children.push({_type: 'span', _key: nextKey(), text, marks: ['strong']});
      }
      continue;
    }

    const emMatch = part.match(/^<(?:em|i)[^>]*>([\s\S]*?)<\/(?:em|i)>/i);
    if (emMatch) {
      const text = stripTags(emMatch[1]).trim();
      if (text) children.push({_type: 'span', _key: nextKey(), text, marks: ['em']});
      continue;
    }

    const linkMatch = part.match(/^<a[^>]+href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/i);
    if (linkMatch) {
      const mdKey = nextKey();
      markDefs.push({_type: 'link', _key: mdKey, href: linkMatch[1]});
      const text = stripTags(linkMatch[2]).trim();
      if (text) children.push({_type: 'span', _key: nextKey(), text, marks: [mdKey]});
      continue;
    }

    const text = stripTags(part);
    if (text.trim()) children.push({_type: 'span', _key: nextKey(), text, marks: []});
  }

  if (children.length === 0) {
    const fallback = stripTags(html).trim();
    if (fallback) children.push({_type: 'span', _key: nextKey(), text: fallback, marks: []});
  }

  return {children, markDefs};
}

function stripTags(html) {
  return html.replace(/<[^>]+>/g, '')
    .replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>')
    .replace(/&nbsp;/g,' ').replace(/&#39;/g,"'").replace(/&quot;/g,'"')
    .replace(/​/g,'').replace(/‍/g,'');
}

// ── Main ───────────────────────────────────────────────────────────────────
(async () => {
  console.log('📥 Fetching guide from Webflow...');
  const res = await new Promise((resolve, reject) => {
    https.get({
      hostname: 'api.webflow.com',
      path: `/v2/collections/${GUIDE_COLLECTION}/items?limit=5`,
      headers: {'Authorization': `Bearer ${WF_TOKEN}`},
    }, (r) => {
      let d = '';
      r.on('data', c => d += c);
      r.on('end', () => resolve(JSON.parse(d)));
      r.on('error', reject);
    }).on('error', reject);
  });

  const item = res.items[0];
  const f = item.fieldData;

  console.log(`\n📄 Guide: ${f.name}`);
  console.log(`   Slug: ${f.slug}`);
  console.log(`   Body: ${f['post-body'].length} chars\n`);

  // Upload cover image
  const coverAsset = await uploadImage(f['main-image']?.url, 'guide-cover-warranty-management');

  // Convert body HTML → Portable Text
  console.log('\n🔄 Converting HTML → Portable Text...');
  const bodyBlocks = await htmlToBlocks(f['post-body']);
  console.log(`   Created ${bodyBlocks.length} blocks (${bodyBlocks.filter(b => b._type === 'image').length} images)\n`);

  // Create/replace document
  const doc = {
    _id: 'guide-warranty-management-software',
    _type: 'guide',
    title: f.title || f.name,
    slug: {_type: 'slug', current: f.slug},
    excerpt: f['post-summary'] || '',
    ...(coverAsset && {
      coverImage: {
        _type: 'image',
        asset: {_type: 'reference', _ref: coverAsset._id},
        alt: 'Warranty Management Software Dashboard — Dyrect',
      },
    }),
    body: bodyBlocks,
    publishedAt: item.lastPublished || item.createdOn,
    status: 'published',
    seoTitle: 'Warranty Management Software: The Complete 2026 Guide for Brands',
    seoDescription: 'Learn how to manage warranty claims efficiently with automation, tracking, and end-to-end warranty management software like Dyrect.',
  };

  await client.createOrReplace(doc);
  console.log('✅ Guide created in Sanity!');
  console.log(`   → /guide/${f.slug}`);
})().catch(console.error);
