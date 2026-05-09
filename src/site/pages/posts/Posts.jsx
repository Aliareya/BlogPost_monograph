import { Icon } from "@iconify/react";
import NewsletterSection from "../home/sections/NewsletterSection";

const Posts = () => {
  const posts = [
    {
      title: "The Future of Artificial Intelligence in Modern Business",
      category: "AI & Future",
      read: "8 min read",
      date: "May 8, 2026",
      author: "Alireza",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Why React + Tailwind Is the Perfect Frontend Stack",
      category: "Programming",
      read: "6 min read",
      date: "May 6, 2026",
      author: "Emma Watson",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Startup Growth Strategies That Actually Work",
      category: "Business",
      read: "5 min read",
      date: "May 3, 2026",
      author: "John Carter",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Minimal UI Design Principles for Better Products",
      category: "Design",
      read: "7 min read",
      date: "Apr 30, 2026",
      author: "Sophia Lee",
      image:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "10 Productivity Habits Every Developer Needs",
      category: "Lifestyle",
      read: "4 min read",
      date: "Apr 28, 2026",
      author: "Michael Brown",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "How Data Is Shaping the Future of Technology",
      category: "Technology",
      read: "9 min read",
      date: "Apr 26, 2026",
      author: "David Clark",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  const tags = [
    "React",
    "JavaScript",
    "AI",
    "Startup",
    "Database",
    "Design",
    "Node.js",
    "Business",
  ];

  return (
    <main className="bg-slate-50 min-h-screen">
      {/* Hero */}
      <section className="bg-[linear-gradient(135deg,_#214252_0%,_#2E5666_35%,_#4A6B78_65%,_#D1D5DB_100%)] py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <span className="px-5 py-2 rounded-full bg-white/20 text-white border border-white/20 text-sm">
            Explore Articles
          </span>

          <h1 className="mt-6 text-5xl md:text-4xl italic font-bold text-white">
            Discover Insightful Stories
          </h1>

          <p className="mt-5 text-lg text-slate-100 max-w-2xl mx-auto leading-8">
            Read articles about technology, programming, startups,
            design, and modern digital culture.
          </p>

        </div>
      </section>

      {/* Category pills */}
      <section className="py-5 border-b bg-[linear-gradient(-85deg,_#214252_0%,_#2E5666_35%,_#4A6B78_48%,_#D1D5DB_99%,_#F5F6F7_100%)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex justify-center gap-4 overflow-x-auto scrollbar-hide">
          {[
            "All",
            "Technology",
            "Programming",
            "Business",
            "Design",
            "AI & Future",
            "Lifestyle",
          ].map((item, i) => (
            <button
              key={i}
              className={`px-6 py-3 rounded-full whitespace-nowrap font-medium transition ${
                i === 0
                  ? "bg-[#214252] text-white"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {/* Content */}
      <section className="py-10 bg-[linear-gradient(135deg,_#214252_0%,_#2E5666_35%,_#4A6B78_65%,_#D1D5DB_90%,_#F5F6F7_100%)]">
        <div className="w-full mx-auto px-6 lg:px-10 flex flex-col">
          
            {/* grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <div className="relative w-full max-w-md bg-[linear-gradient(135deg,_#214252_0%,_#2E5666_35%,_#4A6B78_65%,_#D1D5DB_90%,_#F5F6F7_100%)] rounded-[28px] backdrop-blur-xl border border-white/30 rounded-[30px] p-3 shadow-2xl">
                            <img
                              src={post.image}
                              alt=""
                              className="w-full h-[280px] object-cover rounded-2xl"
                            />
                
                            <div className="mt-5">
                              <span className="absolute top-10 right-10 px-3 py-2 rounded-3xl bg-[#214252] text-white text-sm">
                                Technology
                              </span>
                
                              <h3 className="mt-3 text-xl font-bold text-white">
                                The Future of Web Development in 2026
                              </h3>
                
                              <p className="mt-2 text-slate-100 leading-7">
                                AI, serverless architecture, WebAssembly, and immersive UI
                                are....
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
              ))}
            </div>

            {/* pagination */}
            <div className="mt-16 flex justify-center gap-3">
              {[1, 2, 3, 4].map((num, i) => (
                <button
                  key={i}
                  className={`w-12 h-12 rounded-xl font-semibold ${
                    i === 0
                      ? "bg-[#214252] text-white"
                      : "bg-white border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>


      </section>

      <NewsletterSection/>
    </main>
  );
}


export default Posts;