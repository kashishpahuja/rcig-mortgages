// src/app/components/BlogHero.jsx
export default function BlogHero() {
  return (
    <section className="w-full bg-[#071B35]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-20 pb-16 text-center">
        <p className="text-[#D9A12B] text-xs font-semibold uppercase tracking-[0.3em] mb-4">
          Manjit Bhondhi for Caledon
        </p>
        <h1 className="font-serif text-white text-4xl sm:text-5xl md:text-6xl leading-tight max-w-3xl mx-auto">
          Updates from the campaign
        </h1>
        <p className="text-white/70 text-lg mt-5 max-w-xl mx-auto">
          News, community stories and ideas for building a Caledon that grows responsibly —
          straight from Manjit and the team.
        </p>
      </div>
    </section>
  );
}
