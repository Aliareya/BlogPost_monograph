import { Icon } from "@iconify/react";

export default function HeroSection() {
  return (
    <section className="w-full min-h-[90vh] bg-[linear-gradient(135deg,_#214252_0%,_#2E5666_35%,_#4A6B78_65%,_#D1D5DB_90%,_#F5F6F7_100%)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 grid lg:grid-cols-2 gap-14 items-center">
        
        {/* Left */}
        <div>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-medium mb-6">
            <Icon icon="solar:star-bold" width="18" />
            Premium Blog Platform
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold leading-tight text-white">
            Discover Stories,
            <span className="block text-slate-100 italic">
              Ideas & Inspiration
            </span>
          </h1>

          <p className="mt-6 text-base text-slate-100 max-w-xl leading-8">
            Explore high-quality articles about technology, programming,
            startups, business, design, and modern digital culture—
            curated for readers who love learning.
          </p>

          {/* Search */}
          <div className="mt-8 bg-white rounded-2xl p-2 shadow-2xl flex flex-col sm:flex-row gap-2">
            <div className="flex items-center px-4 flex-1">
              <Icon
                icon="mdi:magnify"
                width="22"
                className="text-slate-400"
              />
              <input
                type="text"
                placeholder="Search articles, topics, authors..."
                className="w-full px-3 py-2 outline-none text-slate-700"
              />
            </div>

            <button className="px-7 py-1 rounded-xl bg-[#214252] text-white font-semibold hover:scale-105 transition">
              Search
            </button>
          </div>

          {/* Buttons */}
          <div className="mt-7 flex flex-wrap gap-4">
            <button className="px-7 py-3 rounded-xl bg-white text-[#214252] font-semibold hover:scale-105 transition shadow-lg">
              Explore Blogs
            </button>

            <button className="px-7 py-3 rounded-xl border border-white text-white font-semibold hover:bg-white hover:text-[#214252] transition">
              Become Writer
            </button>
          </div>

          {/* Stats */}
          <div className="mt-10 flex gap-10 flex-wrap">
            <div>
              <h3 className="text-3xl font-bold text-white">10K+</h3>
              <p className="text-slate-200">Readers</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white">1.2K+</h3>
              <p className="text-slate-200">Articles</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white">250+</h3>
              <p className="text-slate-200">Writers</p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="relative w-full flex justify-center lg:justify-end">
          {/* Glow */}
          <div className="absolute w-[700px] h-[420px] bg-white/20 blur-[120px] rounded-full"></div>

          {/* Main Card */}
          <div className="relative w-full max-w-md bg-white/20 backdrop-blur-xl border border-white/30 rounded-[30px] p-6 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1499750310107-5fef28a66643"
              alt=""
              className="w-full h-[280px] object-cover rounded-2xl"
            />

            <div className="mt-5">
              <span className="absolute top-10 right-10 px-3 py-2 rounded-3xl bg-[#214252] text-white text-sm">
                Technology
              </span>

              <h3 className="mt-3 text-2xl font-bold text-white">
                The Future of Web Development in 2026
              </h3>

              <p className="mt-2 text-slate-100 leading-7">
                AI, serverless architecture, WebAssembly, and immersive UI
                are reshaping how developers build products.
              </p>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center">
                    <Icon
                      icon="heroicons:user-solid"
                      width="22"
                      className="text-slate-600"
                    />
                  </div>

                  <div>
                    <h4 className="font-semibold text-white">Alireza</h4>
                    <p className="text-sm text-slate-200">Author</p>
                  </div>
                </div>

                <button className="w-12 h-12 rounded-full bg-white text-[#214252] flex justify-center items-center hover:scale-110 transition">
                  <Icon icon="solar:arrow-right-linear" width="22" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}