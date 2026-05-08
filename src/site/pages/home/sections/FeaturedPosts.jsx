import { Icon } from "@iconify/react";

export default function FeaturedPosts() {
  const posts = [
    {
      category: "Technology",
      title: "The Future of Artificial Intelligence in Everyday Life",
      desc: "Explore how AI is transforming healthcare, education, work, and personal productivity in modern society.",
      author: "Alireza",
      read: "8 min read",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
    },
    {
      category: "Programming",
      title: "Why React + TailwindCSS Is Dominating Modern UI Development",
      desc: "A deep look into why developers are choosing modern frontend stacks for speed, beauty, and scalability.",
      author: "John Carter",
      read: "6 min read",
      image:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop",
    },
    {
      category: "Startup",
      title: "How Small Teams Build Billion-Dollar Products",
      desc: "Lessons from startups that scaled fast with strong product thinking and lean engineering culture.",
      author: "Emma Watson",
      read: "5 min read",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <section className="w-full py-10 bg-[linear-gradient(39deg,_#214252_0%,_#2E5666_35%,_#4A6B78_65%,_#D1D5DB_100%,_#F5F6F7_100%)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-14">
          <div>
            <span className="text-center inline-block px-5 py-2 rounded-full bg-slate-100 text-[#214252] font-medium text-sm mb-5">
              Editor Choice
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-slate-100">
              Featured Posts
            </h2>

            <p className="mt-4 text-slate-200 max-w-2xl leading-8">
              Handpicked articles covering innovation, business,
              programming, and future technology.
            </p>
          </div>

          <button className="flex items-center gap-2 text-[#214252] font-semibold hover:gap-3 transition">
            View All
            <Icon icon="solar:arrow-right-linear" width="18" />
          </button>
        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article
              key={index}
              className="group bg-[linear-gradient(135deg,_#214252_0%,_#2E5666_35%,_#4A6B78_65%,_#D1D5DB_90%,_#F5F6F7_100%)] rounded-[28px] overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition duration-300 hover:-translate-y-2 cursor-pointer "
            >
              {/* image */}
              <div className="overflow-hidden h-[250px] relative">
                <span className="inline-block absolute top-3 right-3 px-4 py-1 rounded-full bg-slate-100 text-[#214252] text-sm font-medium">
                  {post.category}
                </span>
                <img
                  src={post.image}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
              </div>

              {/* content */}
              <div className="p-4">

                <h3 className="mt-1 text-lg font-bold text-slate-100 leading-snug group-hover:text-[#214252] transition">
                  {post.title}
                </h3>

                {/* footer */}
                <div className="mt-7 pt-6 border-t border-slate-200 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[linear-gradient(135deg,_#214252_0%,_#2E5666_35%,_#4A6B78_65%,_#D1D5DB_100%)] flex items-center justify-center">
                      <Icon
                        icon="heroicons:user-20-solid"
                        width="20"
                        className="text-white"
                      />
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-200">
                        {post.author}
                      </h4>
                      <p className="text-sm text-slate-300">
                        {post.read}
                      </p>
                    </div>
                  </div>

                  <button className="w-11 h-11 rounded-full bg-slate-100 flex justify-center items-center text-[#214252] group-hover:bg-[#214252] group-hover:text-white transition">
                    <Icon icon="solar:arrow-right-linear" width="20" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}