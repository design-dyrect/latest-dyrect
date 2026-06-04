'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { SiteNav, LogoCloud, FinalCTA, SiteFooter } from './FaqsShared';



/* ─── Icon ─── */
function Ico({ d, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {typeof d === 'string' ? <path d={d} /> : d}
    </svg>
  );
}

const ICONS = {
  chevDown: 'M6 9l6 6 6-6',
  chevUp:   'M18 15l-6-6-6 6',
  search:   'M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z',
  x:        'M18 6 6 18M6 6l12 12',
  arrow:    'M5 12h14M13 5l7 7-7 7',
  check:    'M20 6 9 17l-5-5',
  mail:     '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
};

/* ─── Category icons (inline SVG paths) ─── */
const CAT_ICONS = {
  'getting-started':    'M13 2 3 14h9l-1 8 10-12h-9l1-8z',
  'registration':       'M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z',
  'claims':             'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  'extended-warranties':'M3 7a2 2 0 0 1 2-2h13a1 1 0 0 1 1 1v2M3 7v10a2 2 0 0 0 2 2h14a1 1 0 0 0 1-1v-3M21 11h-5a2 2 0 0 0 0 4h5a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1z',
  'analytics':          'M3 3v18h18M7 16l4-4 4 4 4-4',
  'integrations':       'M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18',
  'data-privacy':       'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  'pricing':            'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
  'industries':         'M2 20h20M4 20V10l8-6 8 6v10',
  'platform':           'M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z',
  'support':            'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
};

/* ─── All FAQ data ─── */
const FAQ_CATEGORIES = [
  {
    id: 'getting-started',
    label: 'Getting started',
    count: 8,
    faqs: [
      {
        q: 'What is Dyrect and what does it do?',
        a: 'Dyrect is a warranty management platform built for product brands. It unifies product registration, claims and service management, extended warranty selling, and post-sale analytics into a single system. Brands use Dyrect to capture buyer data at product activation, manage the full warranty lifecycle, sell protection plans that keep 100% of the revenue in-house, and get real data on product quality and claim costs.',
      },
      {
        q: 'Who is Dyrect built for?',
        a: 'Dyrect is built for product brands across consumer electronics, home appliances, outdoor gear, baby products, beauty devices, furniture, fitness equipment, cycling, smart home, mobile accessories, and more. Any brand that manufactures or sells a physical product with a warranty obligation can use Dyrect. We work with D2C brands, Shopify merchants, manufacturers, and brands that sell through retail and dealer networks.',
      },
      {
        q: 'Does Dyrect offer a free trial?',
        a: 'Yes. Dyrect offers a free trial on every plan so you can get the registration and claims workflows set up and running before you commit. You do not need a credit card to start. Speak to our team and we will provision a trial environment configured for your product category.',
      },
      {
        q: 'How long does it take to get set up on Dyrect?',
        a: 'Most brands are live with the core registration and claims setup in under 30 minutes. Every plan includes guided onboarding with a dedicated account executive who configures your QR codes, warranty rules, claim types, and Shopify integration in the first session. More complex setups including dealer portals, component-level warranty rules, and custom integrations typically take one to two business days.',
      },
      {
        q: 'Do I need a developer or technical resource to implement Dyrect?',
        a: 'No. The core Dyrect setup requires no engineering. Product registration flows, QR codes, warranty rules, claim forms, and customer portals are all configured through a no-code interface. If you use Shopify, the native app installs in one click. For teams that want custom integrations or want to embed Dyrect into an existing app, a REST API and webhooks are available.',
      },
      {
        q: 'Can Dyrect work alongside our existing warranty setup?',
        a: 'Yes. Brands moving from a manual or spreadsheet-based warranty process can migrate onto Dyrect without disrupting existing claims in flight. Historical purchase and registration data can be imported, and existing claims can continue to be managed in parallel during the transition period.',
      },
      {
        q: 'What happens after I sign up?',
        a: 'After sign-up, you are assigned a dedicated account executive who runs a 30-minute onboarding call. By the end of that call, your registration flow is live, your QR codes are generated, your warranty rules are set, and your claims workspace is ready. Your account executive stays available throughout your first 90 days for configuration changes and best-practice guidance.',
      },
      {
        q: 'Is Dyrect rated and reviewed anywhere I can check?',
        a: 'Yes. Dyrect is rated 4.8 stars on G2 and 5 stars on the Shopify App Store. Over 500 brands globally run their warranty operations on Dyrect, including brands in the electronics, appliance, outdoor, baby, cycling, and beauty categories.',
      },
    ],
  },
  {
    id: 'registration',
    label: 'Product registration',
    count: 10,
    faqs: [
      {
        q: 'How does product registration work in Dyrect?',
        a: 'Dyrect captures buyers at the point of product activation through multiple channels: QR codes on the product, packaging, or insert that the buyer scans to register; automatic Shopify sync that registers every D2C order without any buyer action; dealer and distributor portals where the channel partner registers on behalf of the buyer; and direct web registration links. Every registration creates a first-party ownership record linking the buyer to the specific product, serial number, and purchase date.',
      },
      {
        q: 'How do QR codes work for product registration?',
        a: 'Dyrect generates QR codes per SKU or per serialized unit that you print on the product, the packaging, the insert, or the warranty card. When a buyer scans the code with their phone camera, they land on a branded registration page with your logo and colors. They complete a short form that captures their contact details, product information, and purchase date. The registration takes under 60 seconds. No app download is required.',
      },
      {
        q: 'Can I capture buyers who purchased through Amazon or retail stores?',
        a: 'Yes. This is one of the primary reasons brands use Dyrect. QR codes on packaging capture buyers from any channel, including Amazon, retail, and dealer networks, at the point of product activation. The buyer scans the code, registers, and you now have their contact details and product ownership record regardless of where the sale happened and regardless of whether the marketplace or retailer would share that data.',
      },
      {
        q: 'Does Dyrect integrate with Shopify to register buyers automatically?',
        a: 'Yes. Dyrect has a native Shopify app rated 5 stars on the Shopify App Store. Once installed, every fulfilled Shopify order syncs automatically to create a registration record. The buyer does not need to take any action. Their contact details, product, and order information are captured the moment the order is fulfilled.',
      },
      {
        q: 'What data is captured at registration?',
        a: 'At a minimum, Dyrect captures buyer name, email, phone, product model, serial number, and purchase date. You can add custom fields to the registration form without any engineering, including fields for product configuration, variant, retailer name, proof of purchase upload, and any product-specific information your brand needs for warranty administration or re-targeting.',
      },
      {
        q: 'Can I customize the registration form for my brand?',
        a: 'Yes. Dyrect includes a no-code form builder that lets you add, remove, and reorder fields on the registration form without any engineering. You can add dropdowns, radio buttons, text inputs, date fields, file upload fields, and custom multi-step flows. The form is fully white-labeled with your brand name, logo, and color palette. Dyrect branding is not visible to the end customer.',
      },
      {
        q: 'Can I register products sold through dealers and distributors?',
        a: 'Yes. Dyrect includes a dealer and distributor portal that lets your channel partners register products on behalf of buyers at the point of sale. The dealer logs into the portal, enters the product serial and buyer details, and the registration record is created in your Dyrect database linked to that dealer. This captures buyer ownership records even when the sale happens entirely through a channel you do not control.',
      },
      {
        q: 'Does Dyrect support serialized product registration?',
        a: 'Yes. Dyrect validates serial numbers at registration against your production catalog in real time. Every ownership record is tied to the specific serialized unit. This prevents duplicate registrations, validates that the product being registered is a genuine unit, and creates the precise product history you need for accurate claim validation. For brands without serialization, Dyrect also supports model-level registration with optional serialization as a next step.',
      },
      {
        q: 'What does the registration experience look like for my customers?',
        a: 'The registration experience is a branded, mobile-first web flow that requires no app download. The customer scans a QR code or clicks a link, lands on a page with your brand name and logo, fills in a short form (typically 3 to 5 fields), and submits. They immediately receive a confirmation with their digital warranty card, warranty terms, and any post-registration content you have configured, such as a care guide or first-purchase offer. The whole flow takes under 60 seconds.',
      },
      {
        q: 'Can I view and export my full customer registration database?',
        a: 'Yes. Every registration is stored in your Dyrect dashboard and can be filtered by product, channel, date, and region. The full database is exportable to CSV at any time. You own the data entirely. It is never shared with third parties and never used by Dyrect for any purpose outside your account.',
      },
    ],
  },
  {
    id: 'claims',
    label: 'Claims management',
    count: 10,
    faqs: [
      {
        q: 'How does warranty claims management work in Dyrect?',
        a: 'When a customer files a warranty claim, Dyrect validates their eligibility automatically by checking the product serial number and purchase date against the registration record. A claim ticket is opened with the full product and ownership history visible. Your team assigns, processes, and resolves the claim from a single workspace. Customers are notified automatically at every stage. Every claim is tracked from intake to close with a complete audit trail.',
      },
      {
        q: 'Can customers file warranty claims themselves without contacting support?',
        a: 'Yes. Customers file claims through a branded self-serve claim form, accessible via a link in their warranty confirmation email, through their customer portal, or via a QR code on the product. The claim form collects fault description, photo and video evidence, and preferred resolution. The claim appears in your team\'s workspace the moment it is submitted. No support call is required from the customer to initiate a claim.',
      },
      {
        q: 'How does Dyrect validate warranty eligibility?',
        a: 'Eligibility is validated automatically against the registration record at the time a claim is filed. Dyrect checks the purchase date, the product serial number, the warranty period for that product, and any category-specific coverage rules you have configured. If the claim is eligible, it opens as an active ticket. If it falls outside the warranty period or fails a coverage rule, the system flags it and your team decides how to proceed.',
      },
      {
        q: 'What claim resolution types does Dyrect support?',
        a: 'Dyrect supports repair, replacement, refund, and store credit resolution types. Each claim type can have different workflows, approval rules, and routing logic. For example, replacement claims can trigger a dispatch and tracking flow inside the ticket, while repair claims can be routed to an authorized service center or field technician with scheduling and status tracking built in.',
      },
      {
        q: 'Can Dyrect handle dealer and service center warranty coordination?',
        a: 'Yes. Dyrect includes a dealer and service center portal that lets authorized partners receive claim assignments, log repair activity, track parts replacement, and submit reimbursement requests. Your team manages the full service network from the same dashboard as direct customer claims. Reimbursements are approved and tracked inside the claim ticket without any separate system.',
      },
      {
        q: 'Does Dyrect support photo and video evidence collection for claims?',
        a: 'Yes. The self-serve claim form includes a file upload field that lets customers attach photos and videos of the defect directly to the claim. Evidence is stored against the ticket and visible in the claim workspace immediately. Your team reviews the fault documentation without any email back-and-forth. For physical damage and visible defect claims, this eliminates most of the back-and-forth that slows resolution.',
      },
      {
        q: 'Can I track the full claim history for a specific product unit?',
        a: 'Yes. Every claim, repair event, part replacement, and resolution is stored against the product serial number. When a buyer contacts support, your team can pull up the full service history of that specific unit in seconds, including every previous claim, the outcome of each, any parts replaced, and which technician or service center was involved. This context makes every interaction faster and more accurate.',
      },
      {
        q: 'Does Dyrect automatically notify customers about claim status?',
        a: 'Yes. Dyrect sends automatic email notifications to the customer at every stage of the claim lifecycle: when the claim is received, when it is assigned, when a resolution is approved, when a replacement is dispatched, and when the claim is closed. You configure the notification content and timing. Your team does not need to send manual status updates at any stage.',
      },
      {
        q: 'Can claims be assigned to specific team members or departments?',
        a: 'Yes. Claims can be assigned manually or routed automatically based on product type, claim type, region, or priority. You can define routing rules so that, for example, all motor claims go to a technical team, all international claims go to a specific agent, and all safety-related claims are fast-tracked with a priority flag. Every assignment and reassignment is logged in the claim audit trail.',
      },
      {
        q: 'Does Dyrect support component-level warranty claims for complex products?',
        a: 'Yes. For products where different components carry different warranty terms, such as a one-year parts warranty and a five-year structural warranty, or an e-bike with separate motor, battery, and frame coverage, Dyrect validates each claim against the coverage record for the specific component reported. Claim routing can also differ by component type, ensuring complex products are handled correctly at scale.',
      },
    ],
  },
  {
    id: 'extended-warranties',
    label: 'Extended warranties',
    count: 8,
    faqs: [
      {
        q: 'How does extended warranty selling work in Dyrect?',
        a: 'Dyrect lets you create and sell branded protection plans directly to your customers without any third-party insurer. You configure the plan terms, pricing, exclusions, and coverage period using the no-code plan builder. Plan offers appear at the product page, at checkout, after purchase, and in the post-registration flow. Every plan sold stays entirely with your brand. There is no revenue share.',
      },
      {
        q: 'How much of the extended warranty revenue does Dyrect take?',
        a: 'None. Every penny of extended warranty revenue from every plan you sell stays with your brand. Dyrect charges a platform subscription fee, not a percentage of protection plan revenue. This is the fundamental difference between Dyrect and third-party warranty providers who take a large share of plan premiums as their margin.',
      },
      {
        q: 'Do I need an insurance partner to sell extended warranties through Dyrect?',
        a: 'No. Dyrect is a warranty administration platform, not an insurance product. You are the plan provider. Your brand sets the terms, prices the plan, and services the claims. You do not need to work with an insurer, and you do not share any revenue. If your legal or compliance team requires insurance backing for specific plan types, you can integrate an insurer of your choice, but it is not a requirement to use Dyrect.',
      },
      {
        q: 'Where can extended warranty plans be offered to customers?',
        a: 'Dyrect supports plan offers at multiple touchpoints: on the product detail page before purchase; at checkout as a native widget; in the order confirmation email after purchase; in the product registration confirmation; and proactively via email to existing registered customers whose standard warranty is approaching expiry. Each touchpoint is configured independently with its own offer format and call to action.',
      },
      {
        q: 'Can I configure different plan terms for different products?',
        a: 'Yes. The Dyrect plan builder lets you create separate protection plans for different product categories, price bands, and use types. For example, you can have a 2-year plan for entry-level products and a 5-year plan for premium products, a consumer plan and a separate commercial plan, or a standard plan and an accidental damage plan. Each plan has its own coverage rules, exclusions, and pricing.',
      },
      {
        q: 'How are extended warranty claims handled?',
        a: 'Extended warranty claims are managed through the same claims workspace as standard manufacturer warranty claims. When a customer files a claim under an extended plan, Dyrect validates their plan status automatically, confirms coverage for the fault type reported, and opens a ticket with the plan details visible. Your team resolves extended warranty claims with the same workflow as all other claims. There is no separate system.',
      },
      {
        q: 'Can extended warranties be sold through dealers and retail partners?',
        a: 'Yes. Extended warranty plans can be offered through the Dyrect dealer portal at the point of sale. Dealers can add a protection plan to a purchase when they register the product on behalf of the buyer. Plan revenue is tracked centrally, and dealer-sold plan claims route into the same workspace as all other claims.',
      },
      {
        q: 'Can I offer extended warranties to existing customers whose manufacturer warranty is expiring?',
        a: 'Yes. Dyrect can identify registered customers whose manufacturer warranty is approaching expiry and trigger an automated email offering an extended plan at that moment. This is one of the highest-converting touchpoints for protection plan sales because the customer is actively aware their coverage is ending and the offer arrives at exactly the right time.',
      },
    ],
  },
  {
    id: 'analytics',
    label: 'Analytics and insights',
    count: 6,
    faqs: [
      {
        q: 'What analytics does Dyrect provide?',
        a: 'Dyrect provides a warranty operations dashboard covering: registration rate by product, channel, and time period; claim rate by SKU, fault type, and region; cost per claim across repair, replacement, and refund types; defect trends by model and component; extended warranty attach rate and plan revenue; and time to resolve by team, agent, and claim priority. All metrics update in real time and can be filtered, segmented, and exported.',
      },
      {
        q: 'Can I see which products have the highest defect rates?',
        a: 'Yes. Claim frequency aggregated by product model and fault type is one of the primary views in the Dyrect analytics dashboard. You can see which SKUs generate the most claims, which fault types recur most frequently within a product line, and how defect rates trend over time. This data goes directly to product and quality teams as actionable quality intelligence.',
      },
      {
        q: 'Does Dyrect help identify product quality issues before they escalate?',
        a: 'Yes. Because every claim is tagged with a fault type and linked to the product serial and production batch, Dyrect can surface defect patterns that are not visible when claims are managed through email. A rising claim rate on a specific batch or a new fault type appearing across a model line shows up in the dashboard as a trend before it becomes a quality crisis or a recall situation.',
      },
      {
        q: 'Can I measure the financial performance of my warranty program?',
        a: 'Yes. Dyrect tracks total warranty cost, cost per claim, cost by resolution type, and extended warranty revenue and attach rate in one view. Finance teams can see the true P&L of their warranty operation, the margin contribution from protection plan sales, and how claim costs trend against registration volume over time.',
      },
      {
        q: 'Can the analytics be exported or connected to our BI tools?',
        a: 'Yes. All analytics data is exportable to CSV and Excel from the dashboard. For teams that want to pipe warranty data into a BI tool or data warehouse, Dyrect provides REST API access to analytics endpoints so data can be pulled programmatically into your existing reporting stack.',
      },
      {
        q: 'Can I see registration rates by channel and region?',
        a: 'Yes. Registration data is segmented by channel (D2C, retail, dealer, marketplace), by product, by region, and by time period. You can see which channels produce the highest registration rates, which geographies have lower capture rates, and how registration performance changes over time as you update your QR code placement or registration flow.',
      },
    ],
  },
  {
    id: 'integrations',
    label: 'Integrations and API',
    count: 8,
    faqs: [
      {
        q: 'What platforms does Dyrect integrate with?',
        a: 'Dyrect has a native Shopify app (5 stars on the App Store), and REST API and webhooks for custom integrations. Commonly integrated systems include CRMs such as Salesforce and HubSpot, ERP systems, helpdesk platforms such as Zendesk and Freshdesk, e-commerce platforms, and data warehouses. If you use a platform that is not on this list, the REST API makes it possible to build a custom integration without any proprietary connector requirement.',
      },
      {
        q: 'How does the Shopify integration work?',
        a: 'Install the Dyrect app from the Shopify App Store in one click. Once installed, every fulfilled Shopify order syncs to Dyrect automatically to create a registration record. Extended warranty plan widgets appear at checkout and on product pages without any theme code changes. Order data, customer contact details, and product information flow from Shopify into Dyrect in real time.',
      },
      {
        q: 'Does Dyrect have an API I can use for custom integrations?',
        a: 'Yes. Dyrect provides a fully documented REST API that covers registration, claims, products, customers, and analytics endpoints. You can use the API to push registrations from any source, pull claim status into your own systems, sync product catalog data, and retrieve analytics data programmatically. Webhooks are also available so that events in Dyrect, such as a new registration or a claim status change, can trigger actions in your own systems in real time.',
      },
      {
        q: 'Can Dyrect integrate with our existing CRM?',
        a: 'Yes. Dyrect includes a built-in CRM for warranty and service teams, but if your brand already uses Salesforce, HubSpot, or another CRM, registration and claim data can be synced via the REST API or via native webhook events. Most integrations can be configured without engineering using tools like Zapier or Make.',
      },
      {
        q: 'Can Dyrect connect to our ERP or production system for serial number validation?',
        a: 'Yes. Serial number validation at registration checks incoming serials against your product catalog. Your catalog can be uploaded to Dyrect manually via CSV, synced automatically via API from your ERP or production system, or maintained directly in the Dyrect product database. Real-time serial validation at registration requires an API connection or a regularly synced catalog file.',
      },
      {
        q: 'Can we use Dyrect with platforms other than Shopify?',
        a: 'Yes. While Shopify has the deepest native integration, Dyrect works with any e-commerce platform via the REST API. WooCommerce, Magento, BigCommerce, and custom-built stores can push order data into Dyrect using the registration API endpoint. Your development team can set this up with the API documentation available in the Dyrect developer portal.',
      },
      {
        q: 'Does the Dyrect integration break any marketplace rules?',
        a: 'No. Dyrect captures first-party buyer data through a consent-based registration flow, not by extracting marketplace data directly. Buyers who purchased on Amazon, Flipkart, or any other marketplace choose to register by scanning a QR code on the product or packaging. This is fully compliant with marketplace terms of service because the buyer is voluntarily providing their data to your brand at the point of product activation.',
      },
      {
        q: 'Can Dyrect be embedded in our own mobile app or customer portal?',
        a: 'Yes. The Dyrect REST API can be used to build registration, claim filing, and warranty status checking directly into your own mobile app or customer portal. For brands with existing customer-facing apps, the API makes it possible to deliver the full Dyrect warranty experience under your own brand without surfacing the Dyrect interface to the customer at any point.',
      },
    ],
  },
  {
    id: 'data-privacy',
    label: 'Data, privacy and security',
    count: 6,
    faqs: [
      {
        q: 'Who owns the customer data collected through Dyrect?',
        a: 'You do. All customer registration data, claim data, and product data collected through Dyrect belongs entirely to your brand. Dyrect does not share, sell, or use your customer data for any purpose outside your account. The data is stored under your account, accessible only by your team, and exportable in full at any time.',
      },
      {
        q: 'Is Dyrect GDPR and privacy law compliant?',
        a: 'Yes. Dyrect is compliant with GDPR in Europe, CCPA in California, and applicable privacy regulations in India and other markets. The registration flow includes configurable consent checkboxes for marketing communications, warranty notifications, and data processing. Buyers can request data deletion through the self-serve portal or by contacting your support team, and Dyrect supports the fulfillment of those requests within the regulatory timeframes.',
      },
      {
        q: 'How does Dyrect secure customer data?',
        a: 'Dyrect uses bank-grade security measures including data encryption at rest and in transit using AES-256 and TLS 1.2+, role-based access controls so only authorized team members can access customer data, SOC 2-aligned infrastructure, and regular third-party security audits. All data is hosted on enterprise cloud infrastructure with geographic redundancy and automated backups.',
      },
      {
        q: 'Can my customers request deletion of their data?',
        a: 'Yes. Buyers can request deletion of their registration and personal data through the self-serve customer portal or by contacting your support team. Dyrect supports data deletion workflows that allow you to fulfill these requests while preserving anonymized claim and product history that is required for quality reporting and regulatory compliance.',
      },
      {
        q: 'Is customer data shared with any third parties?',
        a: 'No. Customer data collected through Dyrect is never shared with any third party, including other Dyrect customers, advertising platforms, data brokers, or insurance providers. The only data movement outside your account is what you configure explicitly, such as webhooks to your own CRM or API syncs to your own data warehouse.',
      },
      {
        q: 'Can I control which team members have access to customer data?',
        a: 'Yes. Dyrect supports role-based access control with configurable permission levels. You can define which team members can view registration data, which can access claim information, which can see analytics, and which have admin-level access to configuration settings. Access permissions are managed from the Dyrect admin panel without any technical setup.',
      },
    ],
  },
  {
    id: 'pricing',
    label: 'Pricing and plans',
    count: 8,
    faqs: [
      {
        q: 'What plans does Dyrect offer?',
        a: 'Dyrect offers three plans: Starter for emerging brands getting started with digital warranty operations; Scaleup for growing brands that need advanced claims management and extended warranty selling; and Enterprise for large brands and manufacturers with complex dealer networks, high claim volumes, and custom integration requirements. All plans include the core registration, claims, and analytics features. Extended warranty selling is available on Scaleup and above.',
      },
      {
        q: 'Is there a free trial available?',
        a: 'Yes. Dyrect offers a free trial on every plan. You can set up your registration flow, generate QR codes, configure warranty rules, and run the full claims workflow before committing to a plan. No credit card is required to start a trial. Speak to the team to get your trial environment provisioned.',
      },
      {
        q: 'How does Dyrect pricing work? Is it per registration or a flat fee?',
        a: 'Dyrect is a subscription-based platform with a flat monthly or annual fee per plan. There is no per-registration, per-claim, or per-plan-sold fee. You can register as many products, manage as many claims, and sell as many extended warranty plans as your operation requires without any per-transaction cost. Annual billing is available with a discount.',
      },
      {
        q: 'Does Dyrect take a percentage of extended warranty revenue?',
        a: 'No. Dyrect charges only the plan subscription fee. Every penny of extended warranty revenue from every protection plan sold stays with your brand. This is a core principle of Dyrect\'s pricing model and a fundamental difference from third-party warranty providers who take a significant percentage of plan premiums.',
      },
      {
        q: 'What is included in the Enterprise plan?',
        a: 'The Enterprise plan is for large brands and manufacturers that need custom configuration, high-volume claim processing, advanced dealer network management, dedicated support, SLA commitments, and custom integration development. Enterprise pricing is custom-quoted based on your product volume, claim volume, and integration requirements. Speak to the sales team for a tailored proposal.',
      },
      {
        q: 'Can I upgrade or downgrade my plan?',
        a: 'Yes. You can upgrade your plan at any time and the additional features become available immediately. Downgrades take effect at the next billing cycle. There are no lock-in penalties for changing plans. If your needs change significantly, the team can help you restructure your subscription to the plan that fits best.',
      },
      {
        q: 'Is there a setup fee?',
        a: 'No. There is no setup fee on any Dyrect plan. Onboarding, QR code configuration, and first-session account setup are included in every subscription. Enterprise plans include dedicated implementation support at no additional charge.',
      },
      {
        q: 'Do you offer discounts for annual billing?',
        a: 'Yes. Annual billing on any Dyrect plan is available at a reduced rate compared to monthly billing. Speak to the team for the current annual billing discount and to discuss a multi-year arrangement if your brand has a longer-term procurement process.',
      },
    ],
  },
  {
    id: 'industries',
    label: 'Industries and use cases',
    count: 6,
    faqs: [
      {
        q: 'Which industries does Dyrect support?',
        a: 'Dyrect supports any brand selling a physical product with a warranty obligation. Current industry coverage includes consumer electronics, home appliances, outdoor and recreation gear, baby products, beauty and personal care devices, mobile accessories, fitness equipment, furniture, smart home devices, cycling, and automotive accessories. New industry-specific configurations are added based on customer demand.',
      },
      {
        q: 'Does Dyrect work for brands with both D2C and retail distribution?',
        a: 'Yes. Dyrect is specifically built for brands that sell across multiple channels. D2C buyers are registered automatically via Shopify. Retail buyers are captured via QR codes on packaging. Dealer and distributor buyers are registered through the dealer portal. All channels feed into the same registration database and claims workspace with channel attribution tracked per record.',
      },
      {
        q: 'Can Dyrect handle warranty operations for a brand that sells across multiple countries?',
        a: 'Yes. Dyrect supports multi-region operations with localized registration forms, multi-currency extended warranty pricing, region-specific warranty rules and coverage periods, and service network management across different markets. Language localization for registration forms and customer communications is configurable per region.',
      },
      {
        q: 'Does Dyrect work for manufacturers that sell through large retail chains?',
        a: 'Yes. Dyrect is used by manufacturers whose products sell exclusively through large retail chains and who have no direct buyer data. QR codes on packaging and product inserts capture those retail buyers at product activation. The manufacturer builds a direct buyer database from day one without requiring any cooperation from the retail partner.',
      },
      {
        q: 'Can Dyrect manage warranties for products with long warranty periods like furniture or appliances?',
        a: 'Yes. Dyrect is used by brands with warranty periods from 90 days to 25 years. Long-term warranty periods are configured with specific coverage rules per period, and claims are validated against the exact coverage in force at the time of the claim. Ownership records are maintained for the full warranty period regardless of how long ago the product was registered.',
      },
      {
        q: 'Does Dyrect support brands with both consumer and commercial products?',
        a: 'Yes. Consumer and commercial registrations can be managed separately with different warranty terms, coverage periods, and claim routing rules. For brands that sell to both end consumers and commercial buyers such as gyms, offices, or hospitality operators, Dyrect supports separate registration flows with appropriate commercial-use terms applied automatically.',
      },
    ],
  },
  {
    id: 'platform',
    label: 'Platform and customization',
    count: 6,
    faqs: [
      {
        q: 'Is Dyrect white-labeled? Will my customers see the Dyrect brand?',
        a: 'Dyrect is fully white-labeled on all paid plans. Every customer-facing touchpoint, from the registration page to the digital warranty card, the customer portal, the claim form, and all email communications, carries your brand name, logo, and color palette. Dyrect branding is not visible to your customers at any point in the experience.',
      },
      {
        q: 'Can I build custom registration and claim forms without a developer?',
        a: 'Yes. Dyrect includes a no-code form builder that lets you create, edit, and publish custom registration and claim forms without any engineering. You can add fields, change field types, reorder steps, add conditional logic, and set required fields from the form builder interface. Changes publish immediately without a deployment cycle.',
      },
      {
        q: 'Does Dyrect provide a customer self-serve portal?',
        a: 'Yes. Every Dyrect account includes a branded customer portal where buyers can view their registered products, check warranty status and expiry, view the digital warranty card and product manual, file a new claim, and track the progress of open claims. The portal reduces inbound support contacts significantly because customers find the information they need without calling your team.',
      },
      {
        q: 'Can I digitize my product manuals and guides in Dyrect?',
        a: 'Yes. Dyrect lets you upload digital product manuals, setup guides, care instructions, and safety documents that are delivered to the customer automatically after registration. Customers access them from the customer portal at any time. Paper manuals become optional, printing costs go down, and customers always have the latest version of every guide.',
      },
      {
        q: 'Can Dyrect handle products with multiple components and different warranty terms per component?',
        a: 'Yes. Component-level warranty configuration allows you to set different coverage periods and coverage rules for different parts of the same product. An appliance might have a one-year parts warranty, a five-year motor warranty, and a ten-year frame warranty. Dyrect validates every claim against the coverage term for the specific component reported, not a blanket product-level warranty period.',
      },
      {
        q: 'How does Dyrect handle product recalls or safety alerts?',
        a: 'Because every registered product is linked to a buyer contact with the product serial number and production batch on record, Dyrect enables precise recall communication. When a safety issue is identified with a specific model or production run, you can immediately identify every registered owner of affected products and send a targeted communication. Without a registration database, this is not operationally possible.',
      },
    ],
  },
  {
    id: 'support',
    label: 'Support and success',
    count: 6,
    faqs: [
      {
        q: 'What support do I get after signing up?',
        a: 'Every Dyrect plan includes guided onboarding with a dedicated account executive, email support, and access to the help center documentation. Scaleup plans include priority support and a named customer success manager. Enterprise plans include dedicated implementation support, SLA-backed response times, and ongoing strategic account management.',
      },
      {
        q: 'Is there a help center or documentation available?',
        a: 'Yes. Dyrect has a comprehensive help center at support.dyrect.co with articles, configuration guides, API documentation, and how-to videos covering every feature in the platform. The help center is searchable and updated with every product release.',
      },
      {
        q: 'Does Dyrect offer training for our warranty and customer service teams?',
        a: 'Yes. Onboarding includes a team training session that walks your warranty managers, claims agents, and service team leads through the claims workspace, reporting dashboard, and configuration interface. For Enterprise brands with larger teams, multi-session training programs and train-the-trainer formats are available.',
      },
      {
        q: 'What happens if I need a feature that Dyrect does not currently have?',
        a: 'Dyrect has a product roadmap driven heavily by customer feedback. If you need a capability that is not currently in the platform, you can submit a feature request through the in-product feedback tool or through your account executive. Enterprise customers have a direct line to the product team for roadmap input and can request custom development for high-priority requirements.',
      },
      {
        q: 'Can I book a demo before committing to a plan?',
        a: 'Yes. You can book a 30-minute personalized demo with the Dyrect team at any time. The demo is tailored to your product category, your current warranty setup, and the specific outcomes you are trying to achieve. You will see a live configuration walk-through with data relevant to your brand, not a generic platform tour.',
      },
      {
        q: 'Does Dyrect have a partner or reseller program?',
        a: 'Yes. Dyrect works with implementation partners, e-commerce agencies, and technology resellers who serve consumer brands. If you are an agency or platform that works with brands that have warranty obligations, the partner program provides co-selling support, partner pricing, and co-marketing opportunities. Reach out to the team at sales@dyrect.co to discuss.',
      },
    ],
  },
];

/* ─── Single FAQ accordion item ─── */
function FaqItem({ q, a, isOpen, onToggle }) {
  const bodyRef = useRef(null);
  return (
    <div style={{
      borderBottom: '1px solid var(--border-default)',
      transition: 'background 200ms',
    }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          padding: '20px 0', display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-start', gap: 20, textAlign: 'left',
        }}
      >
        <span style={{
          fontSize: 15.5, fontWeight: 600, color: isOpen ? 'var(--color-brand-blue)' : 'var(--color-slate-900)',
          lineHeight: 1.45, transition: 'color 180ms', flex: 1,
        }}>{q}</span>
        <span style={{
          flexShrink: 0, width: 28, height: 28, borderRadius: '50%',
          background: isOpen ? 'var(--color-brand-blue)' : 'var(--color-slate-100)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: isOpen ? 'white' : 'var(--fg-secondary)',
          transition: 'all 200ms', marginTop: 1,
        }}>
          <Ico d={isOpen ? ICONS.chevUp : ICONS.chevDown} size={14} />
        </span>
      </button>
      <div style={{
        overflow: 'hidden',
        maxHeight: isOpen ? 600 : 0,
        transition: 'max-height 300ms cubic-bezier(0.16,0.84,0.44,1)',
      }}>
        <p style={{
          fontSize: 15, lineHeight: 1.7, color: 'var(--fg-secondary)',
          paddingBottom: 22, margin: 0,
        }}>{a}</p>
      </div>
    </div>
  );
}

/* ─── FAQ section block ─── */
function FaqSection({ cat, openId, setOpenId }) {
  return (
    <section id={cat.id} style={{ paddingTop: 8, paddingBottom: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4, paddingBottom: 16, borderBottom: '2px solid var(--color-brand-blue)' }}>
        <div style={{
          width: 36, height: 36, borderRadius: 9,
          background: 'var(--color-brand-blue-subtle)',
          color: 'var(--color-brand-blue)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <Ico d={CAT_ICONS[cat.id]} size={17} />
        </div>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: 22, color: 'var(--color-slate-900)',
          letterSpacing: '-0.5px', margin: 0,
        }}>{cat.label}</h2>
        <span style={{
          marginLeft: 'auto', fontSize: 12, fontWeight: 600,
          background: 'var(--color-brand-blue-subtle)', color: 'var(--color-brand-blue)',
          borderRadius: 99, padding: '3px 10px',
        }}>{cat.faqs.length} questions</span>
      </div>
      {cat.faqs.map((item, i) => {
        const id = `${cat.id}-${i}`;
        return (
          <FaqItem
            key={id}
            q={item.q}
            a={item.a}
            isOpen={openId === id}
            onToggle={() => setOpenId(openId === id ? null : id)}
          />
        );
      })}
    </section>
  );
}

/* ─── Main FAQs page ─── */
export default function FaqsLegacyPage() {
  const [query, setQuery]     = useState('');
  const [openId, setOpenId]   = useState(null);
  const [activeSection, setActiveSection] = useState('getting-started');
  const navRef = useRef(null);

  /* ── Sticky nav offset detection ── */
  useEffect(() => {
    const handleScroll = () => {
      const offsets = FAQ_CATEGORIES.map(c => {
        const el = document.getElementById(c.id);
        return el ? { id: c.id, top: el.getBoundingClientRect().top } : null;
      }).filter(Boolean);
      const visible = offsets.filter(o => o.top <= 160);
      if (visible.length) setActiveSection(visible[visible.length - 1].id);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ── Search filter ── */
  const filteredCats = useMemo(() => {
    if (!query.trim()) return FAQ_CATEGORIES;
    const q = query.toLowerCase();
    return FAQ_CATEGORIES.map(cat => ({
      ...cat,
      faqs: cat.faqs.filter(f =>
        f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)
      ),
    })).filter(cat => cat.faqs.length > 0);
  }, [query]);

  const totalResults = filteredCats.reduce((s, c) => s + c.faqs.length, 0);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
  };

  return (
    <>
      <link rel="stylesheet" href="/faq-styles.css" />
      <link rel="stylesheet" href="/faq-responsive.css" />
      <SiteNav />
      <main>

        {/* ── Hero ── */}
        <section style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -5%, rgba(36,55,246,0.08) 0%, transparent 70%), #fff',
          padding: '80px 0 64px', borderBottom: '1px solid var(--border-default)',
          textAlign: 'center',
        }}>
          <div className="container" style={{ maxWidth: 720 }}>
            <p className="eyebrow" style={{ marginBottom: 16 }}>Help center</p>
            <h1 style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.04,
              letterSpacing: '-2px', color: 'var(--color-slate-900)', margin: 0,
            }}>
              Frequently asked <span className="em">questions</span>
            </h1>
            <p style={{ marginTop: 16, fontSize: 17, color: 'var(--fg-secondary)', lineHeight: 1.6 }}>
              Everything you need to know about Dyrect. Can't find your answer?{' '}
              <a href="mailto:sales@dyrect.co" style={{ color: 'var(--color-brand-blue)', fontWeight: 600, textDecoration: 'none' }}>
                Write to us directly.
              </a>
            </p>
            {/* Search */}
            <div style={{
              marginTop: 32, position: 'relative', maxWidth: 560, margin: '32px auto 0',
            }}>
              <div style={{
                position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
                color: 'var(--fg-muted)', pointerEvents: 'none',
              }}>
                <Ico d={ICONS.search} size={18} />
              </div>
              <input
                type="text"
                placeholder="Search any question..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                style={{
                  width: '100%', padding: '14px 44px 14px 48px',
                  fontSize: 15, border: '1.5px solid var(--border-default)',
                  borderRadius: 12, outline: 'none', background: 'white',
                  boxShadow: 'var(--shadow-sm)', color: 'var(--fg-primary)',
                  fontFamily: 'inherit', boxSizing: 'border-box',
                  transition: 'border-color 180ms',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--color-brand-blue)'}
                onBlur={e => e.target.style.borderColor = 'var(--border-default)'}
              />
              {query && (
                <button onClick={() => setQuery('')} style={{
                  position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--fg-muted)', padding: 4,
                }}>
                  <Ico d={ICONS.x} size={16} />
                </button>
              )}
            </div>
            {query && (
              <p style={{ marginTop: 12, fontSize: 13, color: 'var(--fg-muted)' }}>
                {totalResults} result{totalResults !== 1 ? 's' : ''} for <strong>"{query}"</strong>
              </p>
            )}
          </div>
        </section>

        {/* ── Body: left nav + right content ── */}
        <section style={{ background: 'white', padding: '64px 0 96px' }}>
          <div className="container">
            <div style={{ display: 'flex', gap: 56, alignItems: 'flex-start' }}>

              {/* Left sticky nav */}
              {!query && (
                <nav ref={navRef} style={{
                  width: 220, flexShrink: 0,
                  position: 'sticky', top: 96,
                  display: 'flex', flexDirection: 'column', gap: 2,
                }} className="faq-sidenav">
                  {FAQ_CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => scrollTo(cat.id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '9px 12px', borderRadius: 8,
                        background: activeSection === cat.id ? 'var(--color-brand-blue-subtle)' : 'transparent',
                        border: 'none', cursor: 'pointer', textAlign: 'left',
                        transition: 'background 180ms',
                      }}
                    >
                      <span style={{
                        fontSize: 13.5, fontWeight: activeSection === cat.id ? 600 : 500,
                        color: activeSection === cat.id ? 'var(--color-brand-blue)' : 'var(--fg-secondary)',
                        transition: 'color 180ms', lineHeight: 1.35,
                      }}>{cat.label}</span>
                      <span style={{
                        marginLeft: 'auto', fontSize: 11, fontWeight: 600,
                        color: activeSection === cat.id ? 'var(--color-brand-blue)' : 'var(--fg-muted)',
                        background: activeSection === cat.id ? 'rgba(36,55,246,0.12)' : 'var(--color-slate-100)',
                        borderRadius: 99, padding: '2px 7px', flexShrink: 0,
                      }}>{cat.count}</span>
                    </button>
                  ))}
                </nav>
              )}

              {/* Right: FAQ sections */}
              <div style={{ flex: 1, minWidth: 0 }}>
                {filteredCats.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '64px 0' }}>
                    <p style={{ fontSize: 16, color: 'var(--fg-muted)' }}>No questions match your search. Try a different term or{' '}
                      <a href="mailto:sales@dyrect.co" style={{ color: 'var(--color-brand-blue)' }}>write to us directly.</a>
                    </p>
                  </div>
                ) : (
                  filteredCats.map(cat => (
                    <FaqSection
                      key={cat.id}
                      cat={cat}
                      openId={openId}
                      setOpenId={setOpenId}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── Still have questions CTA ── */}
        <section style={{
          background: 'var(--color-slate-50)', borderTop: '1px solid var(--border-default)',
          borderBottom: '1px solid var(--border-default)', padding: '56px 0',
        }}>
          <div className="container">
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20,
            }} className="three-col">
              {[
                {
                  icon: ICONS.search,
                  title: 'Browse the help center',
                  desc: 'Step-by-step guides, configuration walkthroughs, and API documentation.',
                  cta: 'Go to help center',
                  href: 'https://www.support.dyrect.co',
                },
                {
                  icon: 'M15 10l4.553-2.069A1 1 0 0 1 21 8.82v6.36a1 1 0 0 1-1.447.89L15 14M3 8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z',
                  title: 'Book a demo',
                  desc: 'A 30-minute walkthrough configured for your product category and team.',
                  cta: 'Schedule a demo',
                  href: 'https://calendly.com/dyrect-co/demo',
                },
                {
                  icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6',
                  title: 'Write to the team',
                  desc: 'For questions not covered here, our team responds within one business day.',
                  cta: 'sales@dyrect.co',
                  href: 'mailto:sales@dyrect.co',
                },
              ].map((card, i) => (
                <div key={i} style={{
                  background: 'white', border: '1px solid var(--border-default)',
                  borderRadius: 16, padding: '28px 24px',
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: 'var(--color-brand-blue-subtle)',
                    color: 'var(--color-brand-blue)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
                  }}>
                    <Ico d={card.icon} size={19} />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-slate-900)', marginBottom: 8 }}>{card.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--fg-secondary)', margin: '0 0 18px' }}>{card.desc}</p>
                  <a href={card.href} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    fontSize: 14, fontWeight: 600, color: 'var(--color-brand-blue)',
                    textDecoration: 'none',
                  }}
                    onMouseEnter={e => e.currentTarget.style.gap = '10px'}
                    onMouseLeave={e => e.currentTarget.style.gap = '6px'}
                  >
                    {card.cta} <Ico d={ICONS.arrow} size={14} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <LogoCloud />

        <FinalCTA
          eyebrow="Get started"
          title="See Dyrect in action for your brand"
          body={<>Join 500+ brands running their warranty operations on Dyrect. <strong style={{ color: 'white' }}>Get live in under 30 minutes.</strong></>}
          primaryLabel="Get a demo"
          secondaryLabel="See pricing"
          checks={['No credit card needed', 'Live in under 30 min', '500+ brands trust Dyrect']}
        />
      </main>
      <SiteFooter />

      <style>{`
        @media (max-width: 860px) {
          .faq-sidenav { display: none !important; }
          .three-col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}


