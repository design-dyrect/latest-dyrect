import {urlFor} from '../../sanity/lib/image';

/**
 * Renders Sanity Portable Text blocks for guide articles.
 * Handles: headings, paragraphs, bold, italic, links, bullet/number lists,
 * blockquotes, and inline images with alt text.
 */
export default function GuideBody({blocks = []}) {
  let inList = false;
  let listType = null;
  const elements = [];

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];

    // Handle images
    if (block._type === 'image') {
      // Close any open list
      if (inList) {
        elements.push(listType === 'bullet'
          ? <ul key={`list-end-${i}`} className="guide-list">{elements.splice(elements.length - countPrevListItems(blocks, i), elements.length)}</ul>
          : <ol key={`list-end-${i}`} className="guide-list">{elements.splice(elements.length - countPrevListItems(blocks, i), elements.length)}</ol>
        );
        inList = false;
      }

      const imgUrl = block.asset ? urlFor(block).url() : null;
      if (imgUrl) {
        elements.push(
          <figure key={block._key || i} className="guide-figure">
            <img src={imgUrl} alt={block.alt || ''} loading="lazy" />
            {block.alt && <figcaption>{block.alt}</figcaption>}
          </figure>
        );
      }
      continue;
    }

    if (block._type !== 'block') continue;

    const children = renderChildren(block.children || [], block.markDefs || []);
    const key = block._key || i;

    // Handle list items
    if (block.listItem) {
      if (!inList || listType !== block.listItem) {
        inList = true;
        listType = block.listItem;
      }
      elements.push(<li key={key}>{children}</li>);

      // Check if next block is NOT a list item — close the list
      const next = blocks[i + 1];
      if (!next || next.listItem !== block.listItem) {
        const items = [];
        // Collect all consecutive li elements
        while (elements.length > 0 && elements[elements.length - 1]?.type === 'li') {
          items.unshift(elements.pop());
        }
        if (listType === 'bullet') {
          elements.push(<ul key={`ul-${key}`} className="guide-list">{items}</ul>);
        } else {
          elements.push(<ol key={`ol-${key}`} className="guide-list">{items}</ol>);
        }
        inList = false;
      }
      continue;
    }

    // Close any open list
    inList = false;

    // Block-level elements
    switch (block.style) {
      case 'h1': elements.push(<h1 key={key}>{children}</h1>); break;
      case 'h2': elements.push(<h2 key={key} id={slugify(getPlainText(block.children))}>{children}</h2>); break;
      case 'h3': elements.push(<h3 key={key}>{children}</h3>); break;
      case 'h4': elements.push(<h4 key={key}>{children}</h4>); break;
      case 'blockquote': elements.push(<blockquote key={key}>{children}</blockquote>); break;
      default: elements.push(<p key={key}>{children}</p>);
    }
  }

  return <div className="guide-content">{elements}</div>;
}

function renderChildren(children, markDefs) {
  return children.map((child, i) => {
    if (child._type !== 'span') return null;
    let text = child.text || '';
    const marks = child.marks || [];

    // Check for link marks
    const linkMark = marks.find(m => markDefs.some(md => md._key === m));
    const linkDef = linkMark ? markDefs.find(md => md._key === linkMark) : null;

    // Apply decorators
    let el = <>{text}</>;
    if (marks.includes('strong')) el = <strong>{text}</strong>;
    else if (marks.includes('em')) el = <em>{text}</em>;
    else if (marks.includes('underline')) el = <u>{text}</u>;
    else if (marks.includes('code')) el = <code>{text}</code>;

    // Wrap in link if applicable
    if (linkDef?.href) {
      return <a key={i} href={linkDef.href} target={linkDef.href.startsWith('http') ? '_blank' : undefined} rel={linkDef.href.startsWith('http') ? 'noreferrer' : undefined}>{el}</a>;
    }

    return <span key={i}>{el}</span>;
  });
}

function getPlainText(children) {
  return (children || []).map(c => c.text || '').join('');
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
