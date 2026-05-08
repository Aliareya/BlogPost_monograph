import { Icon } from "@iconify/react";

export default function LatestArticles() {
    const posts = [
        {
            title: "10 JavaScript Tricks Every Developer Should Know",
            category: "Programming",
            date: "May 8, 2026",
            read: "7 min read",
            image:
                "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
        },
        {
            title: "How Startups Use AI to Grow Faster Than Ever",
            category: "Business",
            date: "May 5, 2026",
            read: "5 min read",
            image:
                "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=1200&auto=format&fit=crop",
        },
        {
            title: "Minimal UI Design Trends Dominating 2026",
            category: "Design",
            date: "May 2, 2026",
            read: "4 min read",
            image:
                "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
        },
        {
            title: "Remote Work Productivity Tips for Developers",
            category: "Lifestyle",
            date: "Apr 29, 2026",
            read: "6 min read",
            image:
                "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
        },
    ];

    return (
        <section className="w-full py-10 bg-[linear-gradient(-85deg,_#214252_0%,_#2E5666_35%,_#4A6B78_48%,_#D1D5DB_99%,_#F5F6F7_100%)]">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-10">
                    <div className="w-full flex flex-col justify-center items-center">
                        <span className="inline-block px-5 py-2 rounded-full bg-white border border-slate-200 text-[#214252] font-medium text-sm mb-5">
                            Fresh Content
                        </span>

                        <h2 className="text-4xl md:text-5xl font-bold text-slate-100">
                            Latest Articles
                        </h2>

                        <p className="mt-4 text-center text-slate-300 max-w-2xl leading-8">
                            Stay updated with fresh stories, industry trends,
                            programming tips, and creative ideas published weekly.
                        </p>

                        <button className="flex items-center gap-2 mt-5 rounded-2xl bg-white p-2 px-4 text-[#214252] font-semibold hover:gap-3 transition">
                            Browse All
                            <Icon icon="solar:arrow-right-linear" width="18" />
                        </button>
                    </div>

                </div>

                {/* Articles */}
                <div className="space-y-5">
                    {posts.map((post, index) => (
                        <article
                            key={index}
                            className="group bg-[linear-gradient(135deg,_#214252_0%,_#2E5666_35%,_#4A6B78_65%,_#D1D5DB_90%,_#F5F6F7_100%)] rounded-[28px] border border-slate-200 shadow-sm hover:shadow-xl transition duration-300 overflow-hidden"
                        >
                            <div className="grid lg:grid-cols-[320px_1fr] gap-0">
                                {/* image */}
                                <div className="h-full w-[350px] overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt=""
                                        className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                                    />
                                </div>

                                {/* content */}
                                <div className="p-8 md:p-10 flex flex-col justify-center">
                                    <span className="inline-block w-fit px-4 py-1 rounded-full bg-slate-100 text-[#214252] text-sm font-medium">
                                        {post.category}
                                    </span>

                                    <h3 className="mt-5 text-2xl md:text-3xl font-bold text-slate-100 leading-snug group-hover:text-[#bec7cd] transition">
                                        {post.title}
                                    </h3>

                                    <p className="mt-5 text-slate-200 leading-8">
                                        Discover practical insights, actionable strategies,
                                        and thoughtful perspectives that help readers stay ahead.
                                    </p>

                                    {/* meta */}
                                    <div className="mt-7 flex flex-wrap gap-6 text-slate-300 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Icon icon="solar:calendar-linear" width="18" />
                                            {post.date}
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Icon icon="solar:clock-circle-linear" width="18" />
                                            {post.read}
                                        </div>
                                    </div>

                                    <button className="mt-7 w-fit flex items-center gap-2 font-semibold text-[#a7b7c0] hover:gap-3 transition">
                                        Read Article
                                        <Icon icon="solar:arrow-right-linear" width="18" />
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