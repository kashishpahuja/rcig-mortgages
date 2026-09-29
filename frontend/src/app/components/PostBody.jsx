// src/app/components/PostBody.jsx

export default function PostBody({ content = [] }) {
  if (!Array.isArray(content) || content.length === 0) {
    return null;
  }

  return (
    <div className="prose-post text-[#2A362F] text-lg leading-8 space-y-8">

      {content.map((block, index) => {
        if (!block || !block.type) {
          return null;
        }

        {/* ================= HEADING ================= */}
        if (block.type === "heading") {
          const Heading =
            Number(block.level) === 3 ? "h3" : "h2";

          return (
            <Heading
              key={index}
              className={
                Heading === "h3"
                  ? "font-serif text-[#071B35] text-xl sm:text-2xl pt-4"
                  : "font-serif text-[#071B35] text-2xl sm:text-3xl pt-4"
              }
            >
              {block.text}
            </Heading>
          );
        }

        {/* ================= PARAGRAPH ================= */}
        if (block.type === "paragraph") {
          return (
            <p key={index}>
              {block.text}
            </p>
          );
        }

        {/* ================= IMAGE ================= */}
        if (block.type === "image") {
          if (!block.image) {
            return null;
          }

          return (
            <figure key={index} className="space-y-3">

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={block.image}
                alt={
                  block.alt ||
                  "Blog article image"
                }
                className="w-full rounded-xl border border-[#E3E8E4] shadow-sm object-cover"
              />

              {block.caption && (
                <figcaption className="text-sm text-[#5A6B64] text-center leading-relaxed">
                  {block.caption}
                </figcaption>
              )}
            </figure>
          );
        }

        {/* ================= LIST ================= */}
        if (block.type === "list") {
          const items = Array.isArray(block.items)
            ? block.items
            : [];

          if (items.length === 0) {
            return null;
          }

          return (
            <ul
              key={index}
              className="list-disc pl-6 space-y-2"
            >
              {items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  {item}
                </li>
              ))}
            </ul>
          );
        }

        {/* ================= QUOTE ================= */}
        if (block.type === "quote") {
          return (
            <blockquote
              key={index}
              className="border-l-4 border-[#D9A12B] pl-5 py-2 italic text-[#071B35] text-xl sm:text-2xl leading-relaxed"
            >
              {block.text}
            </blockquote>
          );
        }

        return null;
      })}
    </div>
  );
}