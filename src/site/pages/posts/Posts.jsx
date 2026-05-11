import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../../config/Firebase"
import NewsletterSection from "../home/sections/NewsletterSection";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts
  const getPosts = async () => {
    try {
      const postSnap = await getDocs(query(collection(db, "posts")));

      const postList = postSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPosts(postList);
      console.log(postList)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

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

      {/* Categories */}
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
              className={`px-6 py-3 rounded-full whitespace-nowrap font-medium transition ${i === 0
                  ? "bg-[#214252] text-white"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {/* Posts */}
      <section className="py-10 bg-[linear-gradient(135deg,_#214252_0%,_#2E5666_35%,_#4A6B78_65%,_#D1D5DB_90%,_#F5F6F7_100%)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {loading ? (
            <div className="text-center text-white text-xl py-20">
              Loading posts...
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center text-white text-xl py-20">
              No posts found
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="relative bg-[linear-gradient(135deg,_#214252_0%,_#2E5666_35%,_#4A6B78_65%,_#D1D5DB_90%,_#F5F6F7_100%)] rounded-[30px] p-3 shadow-2xl border border-white/30"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-[280px] object-cover rounded-2xl"
                  />

                  <div className="mt-5">
                    <span className="absolute top-10 right-10 px-3 py-2 rounded-3xl bg-[#214252] text-white text-sm">
                      {post.category || "Technology"}
                    </span>

                    <h3 onClick={()=>navigate(`/posts/${post.id}`)} className="mt-3 cursor-pointer text-xl font-bold text-white line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="mt-2 text-slate-100 leading-7 line-clamp-3">
                      {post.content || "No description available..."}
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
                          <h4 className="font-semibold text-white">
                            {post.author || "Admin"}
                          </h4>
                          <p className="text-sm text-slate-200">Author</p>
                        </div>
                      </div>

                      <button className="w-12 h-12 rounded-full bg-white text-[#214252] flex justify-center items-center hover:scale-110 transition">
                        <Icon
                          icon="solar:arrow-right-linear"
                          width="22"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-16 flex justify-center gap-3">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                className="w-12 h-12 rounded-xl font-semibold bg-white border border-slate-200 hover:bg-slate-100"
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </section>

      <NewsletterSection />
    </main>
  );
};

export default Posts;