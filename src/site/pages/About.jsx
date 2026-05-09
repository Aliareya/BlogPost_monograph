import { Icon } from "@iconify/react";

export default function About() {
  const stats = [
    { number: "50K+", label: "Monthly Readers", icon: "solar:users-group-rounded-bold" },
    { number: "1.2K+", label: "Published Articles", icon: "solar:document-text-bold" },
    { number: "250+", label: "Expert Writers", icon: "solar:pen-new-square-bold" },
    { number: "20+", label: "Content Categories", icon: "solar:layers-bold" },
  ];

  const team = [
    {
      name: "Alireza",
      role: "Founder & Editor",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Emma Watson",
      role: "Senior Writer",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "John Carter",
      role: "Tech Analyst",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <main className="bg-[linear-gradient(135deg,_#214252_0%,_#2E5666_35%,_#4A6B78_65%,_#D1D5DB_100%)]">
      {/* Hero */}
      <section className="bg-[linear-gradient(135deg,_#214252_0%,_#2E5666_35%,_#4A6B78_65%,_#D1D5DB_100%)] py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <span className="px-5 py-2 rounded-full bg-white/20 text-white border border-white/20 text-sm">
            About AreyaPulse
          </span>

          <h1 className="mt-6 text-5xl md:text-6xl font-bold text-white">
            Stories That Inspire,
            <span className="block italic text-slate-100">
              Knowledge That Matters
            </span>
          </h1>

          <p className="mt-6 text-lg text-slate-100 max-w-3xl mx-auto leading-8">
            AreyaPulse is a modern publishing platform dedicated to sharing
            meaningful stories, practical knowledge, and fresh insights on
            technology, programming, business, design, and digital culture.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="inline-block px-5 py-2 rounded-full bg-slate-200 text-[#214252] text-sm font-medium mb-5">
              Our Story
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-slate-100">
              Built For Curious Minds
            </h2>

            <p className="mt-6 text-slate-300 leading-8">
              We created AreyaPulse with one mission: to build a space where
              readers can discover high-quality content that informs,
              inspires, and helps them grow in a rapidly changing digital world.
            </p>

            <p className="mt-5 text-slate-300 leading-8">
              From in-depth technical guides to startup stories, design
              inspiration, and future technology trends—we publish content
              that matters.
            </p>

            <button className="mt-8 px-7 py-4 rounded-xl bg-[#214252] text-white font-semibold hover:scale-105 transition">
              Explore Articles
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-[#214252]/20 blur-[80px] rounded-full"></div>

            <img
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop"
              alt=""
              className="relative rounded-[30px] shadow-2xl w-full h-[500px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="pb-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-[linear-gradient(53deg,_#214252_0%,_#2E5666_35%,_#4A6B78_65%,_#D1D5DB_89%,_#F5F6F7_100%)] rounded-[28px] p-8 border border-slate-200 shadow-sm hover:shadow-xl transition"
            >
              <div className="w-16 h-16 rounded-2xl bg-[linear-gradient(135deg,_#214252_0%,_#2E5666_35%,_#4A6B78_65%,_#D1D5DB_100%)] flex items-center justify-center border border-white">
                <Icon icon={item.icon} width="28" className="text-white" />
              </div>

              <h3 className="mt-6 text-4xl font-bold text-slate-300">
                {item.number}
              </h3>

              <p className="mt-2 text-slate-300">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>



      {/* CTA */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="rounded-[40px] bg-[linear-gradient(135deg,_#214252_0%,_#2E5666_35%,_#4A6B78_65%,_#D1D5DB_100%)] px-10 md:px-20 py-20 text-center shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Join Our Growing Community
            </h2>

            <p className="mt-6 text-slate-100 text-lg max-w-2xl mx-auto leading-8">
              Discover premium articles, practical knowledge, and fresh ideas
              delivered regularly.
            </p>

            <button className="mt-8 px-8 py-4 rounded-xl bg-white text-[#214252] font-semibold hover:scale-105 transition">
              Start Reading
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}