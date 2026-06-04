export default function RichText({blocks = []}) {
  return (
    <div>
      {blocks.map((block) => {
        if (block._type !== 'block') return null;

        const children = (block.children || []).map((child, i) => {
          const text = child.text || '';
          const marks = child.marks || [];
          if (marks.includes('strong')) return <strong key={i}>{text}</strong>;
          if (marks.includes('em')) return <em key={i}>{text}</em>;
          if (marks.includes('underline')) return <u key={i}>{text}</u>;
          if (marks.includes('code')) return <code key={i}>{text}</code>;
          return <span key={i}>{text}</span>;
        });

        const key = block._key;
        if (block.style === 'h2') return <h2 key={key}>{children}</h2>;
        if (block.style === 'h3') return <h3 key={key}>{children}</h3>;
        if (block.style === 'h4') return <h4 key={key}>{children}</h4>;
        if (block.style === 'blockquote') return <blockquote key={key}>{children}</blockquote>;
        if (block.listItem === 'bullet') return <li key={key}>{children}</li>;
        if (block.listItem === 'number') return <li key={key}>{children}</li>;
        return <p key={key}>{children}</p>;
      })}
    </div>
  );
}
