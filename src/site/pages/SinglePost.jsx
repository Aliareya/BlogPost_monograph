import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../config/Firebase";
import CommentsSection from "../components/CommentSection";
import { useParams } from "react-router-dom";
import { Icon } from "@iconify/react";

const SinglePost = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async (postId) => {
      try {
        setLoading(true);

        const q = query(
          collection(db, "posts"),
          where("id", "==", postId)
        );

        const querySnapshot = await getDocs(q);

        const result = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPost(result[0] || null);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost(Number(id));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[linear-gradient(-85deg,_#214252_0%,_#2E5666_35%,_#4A6B78_48%,_#D1D5DB_99%,_#F5F6F7_100%)] flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(-85deg,_#214252_0%,_#2E5666_35%,_#4A6B78_48%,_#D1D5DB_99%,_#F5F6F7_100%)] py-12">
      {/* Back */}
      <div className="max-w-6xl mx-auto px-6 mb-6">
        <a
          href="/posts"
          className="text-white flex items-center gap-2 hover:opacity-80"
        >
          <Icon icon="solar:arrow-left-linear" width="18" />
          Back to Posts
        </a>
      </div>

      {/* POST MAIN */}
      <div className="max-w-6xl mx-auto ">
        <div className="bg-[linear-gradient(-85deg,_#214252_0%,_#2E5666_35%,_#4A6B78_48%,_#D1D5DB_99%,_#F5F6F7_100%)] backdrop-blur-xl border border-white/30 rounded-[32px] shadow-2xl p-6 md:p-10">
          
          <div className="grid md:grid-cols-2 gap-10 items-start">
            
            {/* LEFT IMAGE */}
            <div className="rounded-[24px] overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1200"
                alt=""
                className="w-full h-[300px] md:h-[450px] object-cover"
              />
            </div>

            {/* RIGHT CONTENT */}
            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-[#214252] text-white text-sm">
                {post?.category || "Blog"}
              </span>

              <h1 className="mt-5 text-3xl md:text-5xl font-bold text-gray-50 leading-tight">
                {post?.title}
              </h1>

              <p className="mt-6 text-slate-300 leading-8">
                {post?.content}
              </p>

              {/* author */}
              <div className="mt-8 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[linear-gradient(135deg,_#214252,_#4A6B78)] flex items-center justify-center">
                  <Icon icon="heroicons:user-20-solid" className="text-white" />
                </div>

                <div>
                  <p className="font-semibold text-gray-100">
                    {post?.author || "Unknown"}
                  </p>
                  <p className="text-sm text-slate-200">
                    Author
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* COMMENTS SECTION */}
        <div className="mt-10 bg-[linear-gradient(-85deg,_#214252_0%,_#2E5666_35%,_#4A6B78_48%,_#D1D5DB_99%,_#F5F6F7_100%)] backdrop-blur-xl border border-white/30 rounded-[32px] shadow-2xl p-6 md:p-10">

          <CommentsSection
            postId={id}
            post_name={post?.title}
          />
        </div>
      </div>
    </main>
  );
};

export default SinglePost;