import { Icon } from "@iconify/react";

export default function CategoriesSection() {
  const categories = [
    {
      title: "Technology",
      posts: "245 Posts",
      icon: "solar:cpu-bold",
    },
    {
      title: "Programming",
      posts: "198 Posts",
      icon: "solar:code-bold",
    },
    {
      title: "Business",
      posts: "132 Posts",
      icon: "solar:chart-bold",
    },
    {
      title: "Design",
      posts: "165 Posts",
      icon: "solar:palette-bold",
    },
    {
      title: "Startups",
      posts: "98 Posts",
      icon: "solar:rocket-bold",
    },
    {
      title: "Marketing",
      posts: "121 Posts",
      icon: "solar:speaker-bold",
    },
    {
      title: "AI & Future",
      posts: "87 Posts",
      icon: "solar:stars-bold",
    },
    {
      title: "Lifestyle",
      posts: "156 Posts",
      icon: "solar:heart-bold",
    },
  ];

  return (
    <section className="w-full py-9 bg-[linear-gradient(-85deg,_#214252_0%,_#2E5666_35%,_#4A6B78_48%,_#D1D5DB_99%,_#F5F6F7_100%)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-5 py-2 rounded-full bg-slate-200 text-[#214252] font-medium text-sm mb-5">
            Explore Topics
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-100">
            Browse by Category
          </h2>

          <p className="mt-5 text-gray-200 max-w-2xl mx-auto leading-8">
            Discover articles tailored to your interests—from programming
            and business to design, startups, and the future of AI.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group bg-white/20 backdrop-blur-xl rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition duration-300 cursor-pointer"
            >
            <div className="flex justify-between items-center w-full h-16">

              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-[linear-gradient(135deg,_#214252_0%,_#2E5666_35%,_#4A6B78_65%,_#D1D5DB_100%)] flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                <Icon
                  icon={category.icon}
                  width="28"
                  className="text-white"
                />
              </div>
                
                <p className="mt-2 text-gray-100">
                  {category.posts}
                </p>
            </div>    

              {/* Content */}
              <div className="mt-6">
                              <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#214252] transition">
                  {category.title}
                </h3>


                <div className="mt-6 flex items-center gap-2 text-[#214252] font-medium">
                  Explore
                  <Icon
                    icon="solar:arrow-right-linear"
                    width="18"
                    className="group-hover:translate-x-1 transition"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}