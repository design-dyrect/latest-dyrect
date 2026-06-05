/**
 * Renders a JSON-LD <script> tag for structured data.
 * Usage: <JsonLd data={schemaObject} />
 */
export default function JsonLd({data}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html: JSON.stringify(data)}}
    />
  );
}
