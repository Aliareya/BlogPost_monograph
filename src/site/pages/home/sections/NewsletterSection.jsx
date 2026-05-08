import { Icon } from "@iconify/react";

export default function NewsletterSection() {
  return (
    <section className="w-full py-10 bg-[linear-gradient(-85deg,_#214252_0%,_#2E5666_35%,_#4A6B78_48%,_#D1D5DB_99%,_#F5F6F7_100%)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-[40px] bg-[linear-gradient(135deg,_#214252_0%,_#2E5666_35%,_#4A6B78_65%,_#D1D5DB_100%)] px-8 md:px-16 py-20 shadow-2xl">
          
          {/* glow */}
          <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-white/20 blur-[100px] rounded-full"></div>
          <div className="absolute bottom-[-120px] right-[-80px] w-[280px] h-[280px] bg-white/20 blur-[100px] rounded-full"></div>

          <div className="relative grid lg:grid-cols-2 gap-14 items-center">
            
            {/* left */}
            <div>
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/20 border border-white/20 text-white text-sm font-medium mb-6">
                <Icon icon="solar:bell-bold" width="18" />
                Join Our Community
              </span>

              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Get Fresh Articles
                <span className="block italic text-slate-100">
                  Delivered Weekly
                </span>
              </h2>

              <p className="mt-6 text-slate-100 text-lg leading-8 max-w-xl">
                Subscribe to AreyaPulse and receive curated articles on
                technology, programming, startups, business, and modern digital culture directly in your inbox.
              </p>

              {/* stats */}
              <div className="mt-10 flex flex-wrap gap-10">
                <div>
                  <h3 className="text-3xl font-bold text-white">25K+</h3>
                  <p className="text-slate-200">Subscribers</p>
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-white">Weekly</h3>
                  <p className="text-slate-200">Fresh Content</p>
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-white">100%</h3>
                  <p className="text-slate-200">Free</p>
                </div>
              </div>
            </div>

            {/* right */}
            <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-[30px] p-8 md:p-10 shadow-xl">
              <h3 className="text-2xl font-bold text-white">
                Subscribe Now
              </h3>

              <p className="mt-3 text-slate-100">
                Join thousands of readers already learning with AreyaPulse.
              </p>

              <div className="mt-8 space-y-4">
                <input
                  type="text"
                  placeholder="Your full name"
                  className="w-full h-14 rounded-xl px-5 bg-white text-slate-800 outline-none"
                />

                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full h-14 rounded-xl px-5 bg-white text-slate-800 outline-none"
                />

                <button className="w-full h-14 rounded-xl bg-white text-[#214252] font-semibold hover:scale-[1.02] transition">
                  Subscribe Free
                </button>
              </div>

              <div className="mt-6 flex items-center gap-2 text-sm text-slate-100">
                <Icon icon="solar:shield-check-bold" width="18" />
                No spam. Unsubscribe anytime.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}