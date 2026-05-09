import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../../config/Firebase";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

/* =========================
   PAGE HEADER
========================= */
const PageHeader = ({ postssize }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-bold text-white">Posts</h1>

      <button
        onClick={() =>
          navigate(`/admin/posts/create?postssize=${postssize}`)
        }
        className="bg-[#214252] hover:opacity-90 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition"
      >
        <Icon icon="solar:add-square-bold" width="20" />
        New Post
      </button>
    </div>
  );
};

/* =========================
   TABLE HEADER
========================= */
const TableHeader = () => {
  return (
    <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-white/10 backdrop-blur-xl border-b border-white/10 text-sm font-semibold text-white">
      <div className="col-span-3">Title</div>
      <div className="col-span-2">Category</div>
      <div className="col-span-2">Likes</div>
      <div className="col-span-2">Date</div>
      <div className="col-span-3 text-right">Actions</div>
    </div>
  );
};

/* =========================
   POST ROW
========================= */
const PostRow = ({ title, category, likes, date }) => {
  return (
    <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/10 items-center text-white/90 hover:bg-white/5 transition">

      {/* Title */}
      <div className="col-span-3 font-medium">
        {title}
      </div>

      {/* Category */}
      <div className="col-span-2">
        <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-white/10">
          {category}
        </span>
      </div>

      {/* Likes */}
      <div className="col-span-2 text-sm">
        {likes || 0}
      </div>

      {/* Date */}
      <div className="col-span-2 text-sm">
        {date}
      </div>

      {/* Actions */}
      <div className="col-span-3 flex items-center justify-end gap-2">

        {/* View */}
        <button className="p-2 rounded-lg hover:bg-white/10 transition">
          <Icon icon="solar:eye-bold" width="20" className="text-white" />
        </button>

        {/* Edit */}
        <button className="p-2 rounded-lg hover:bg-white/10 transition">
          <Icon icon="solar:pen-2-bold" width="20" className="text-blue-300" />
        </button>

        {/* Delete */}
        <button className="p-2 rounded-lg hover:bg-white/10 transition">
          <Icon icon="solar:trash-bin-trash-bold" width="20" className="text-red-400" />
        </button>

      </div>
    </div>
  );
};

/* =========================
   POSTS TABLE
========================= */
const PostsTable = ({ setPostsCount }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        const q = query(
          collection(db, "posts"),
          orderBy("create_at", "desc")
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => {
          const d = doc.data();

          return {
            id: doc.id,
            title: d.title,
            category: d.category,
            likes: d.likes,
            date: d.create_at
              ? d.create_at.toDate().toDateString()
              : "No date",
          };
        });

        setPosts(data);
        setPostsCount(data.length);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-white/70">
        Loading posts...
      </div>
    );
  }

  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl">
      <TableHeader />

      <div className="divide-y divide-white/10">
        {posts.length === 0 ? (
          <div className="p-6 text-white/60">
            No posts found
          </div>
        ) : (
          posts.map((post) => (
            <PostRow key={post.id} {...post} />
          ))
        )}
      </div>
    </div>
  );
};

/* =========================
   MAIN PAGE
========================= */
const Posts = () => {
  const [postsCount, setPostsCount] = useState(0);

  return (
    <div className="min-h-screen bg-[linear-gradient(74deg,_#214252_0%,_#2E5666_35%,_#4A6B78_78%,_#D1D5DB_108%,_#F5F6F7_100%)]">

      <main className="ml-64 p-8">

        {/* Breadcrumb */}
        <div className="mb-2 text-sm text-white/60">
          Dashboard / Posts
        </div>

        {/* Header */}
        <PageHeader postssize={postsCount} />

        {/* Table */}
        <PostsTable setPostsCount={setPostsCount} />

      </main>
    </div>
  );
};

export default Posts;