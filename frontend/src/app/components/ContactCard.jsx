// src/app/components/ContactCard.jsx
export default function ContactCard() {
  return (
    <section className="w-full bg-[#071B35]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 grid gap-10 sm:grid-cols-3">
        <div className="sm:col-span-1">
          <p className="text-[#D9A12B] text-xs font-semibold uppercase tracking-[0.2em] mb-2">Get in touch</p>
          <h2 className="text-white font-serif text-2xl leading-snug">
            Questions or ideas for Caledon? I&apos;d like to hear from you.
          </h2>
        </div>
        <dl className="sm:col-span-2 grid gap-6 sm:grid-cols-3 text-white/90">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-1">Phone</dt>
            <dd><a href="tel:+19057990024" className="hover:text-[#D9A12B] transition">905-799-0024</a></dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-1">Office</dt>
            <dd>Unit 103, 2 Industrial Road<br />Bolton, ON L7E 1K6</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-1">Email</dt>
            <dd className="break-all">
              <a href="mailto:manjit4caledon@gmail.com" className="hover:text-[#D9A12B] transition">
                manjit4caledon@gmail.com
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
