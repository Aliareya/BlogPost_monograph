import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/Firebase";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

/* =========================
   PAGE HEADER
========================= */
const PageHeader = () => {
  return (
    <div className="mb-8">
      <div className="mb-2 text-sm text-white/60 font-medium">
        Dashboard
      </div>
      <h1 className="text-3xl font-bold text-white">
        Comments
      </h1>
    </div>
  );
};

/* =========================
   CATEGORY FILTER
========================= */
const CategoryFilter = ({ activeCategory, onCategoryChange, counts }) => {
  const categories = [
    { name: "All", count: counts.all },
    { name: "Positive", count: counts.positive },
    { name: "Negative", count: counts.negative },
    { name: "Spam", count: counts.spam },
  ];

  return (
    <div className="mb-6 flex flex-wrap gap-3">
      {categories.map((cat) => (
        <button
          key={cat.name}
          onClick={() => onCategoryChange(cat.name)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            activeCategory === cat.name
              ? "bg-white text-[#214252]"
              : "bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          {cat.name} ({cat.count})
        </button>
      ))}
    </div>
  );
};

/* =========================
   TABLE HEADER
========================= */
const TableHeader = () => {
  return (
    <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-white/10 text-white text-sm font-semibold border-b border-white/10">
      <div className="col-span-2">Author</div>
      <div className="col-span-2">Post</div>
      <div className="col-span-3">Comment</div>
      <div className="col-span-2">Category</div>
      <div className="col-span-2">Status</div>
      <div className="col-span-1 text-right">Action</div>
    </div>
  );
};

/* =========================
   ROW
========================= */
const CommentRow = ({ comment, onView }) => {
  return (
    <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/10 text-white/90 hover:bg-white/5 transition">

      <div className="col-span-2 truncate">{comment?.name}</div>
      <div className="col-span-2 truncate">{comment?.post_name}</div>

      <div className="col-span-3 truncate text-white/80">
        {comment?.message}
      </div>

      <div className="col-span-2">{comment?.category}</div>

      <div className="col-span-2">{comment?.status}</div>

      <div className="col-span-1 flex justify-end">
        <button onClick={() => onView(comment)}>
          <Icon icon="mingcute:edit-line" width="22" className="text-white hover:text-orange-400 transition" />
        </button>
      </div>

    </div>
  );
};

/* =========================
   MODAL (IMPROVED)
========================= */
const CommentModal = ({ comment, onClose }) => {
  if (!comment) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-2xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >

        {/* HEADER */}
        <div className="flex justify-between px-5 py-4 border-b">
          <h3 className="font-semibold">Comment Details</h3>
          <button onClick={onClose}>✕</button>
        </div>

        {/* BODY */}
        <div className="p-5 space-y-3 text-sm">

          <p><b>Author:</b> {comment?.name}</p>
          <p><b>Post:</b> {comment?.post_name}</p>
          <p><b>Comment:</b> {comment?.message}</p>
          <p><b>Category:</b> {comment?.category}</p>
          <p><b>Status:</b> {comment?.status}</p>

          <p>
            <b>Reply:</b>{" "}
            {comment?.replays?.message || "No reply yet"}
          </p>

        </div>

        {/* FOOTER */}
        <div className="flex gap-3 justify-end px-5 py-4 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#214252] text-white rounded-lg"
          >
            Publish
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#214252] text-white rounded-lg"
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
};

/* =========================
   MAIN PAGE
========================= */
const Comments = () => {
  const [comments, setComments] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);

      const snap = await getDocs(collection(db, "comments"));

      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      setComments(data);
      setLoading(false);
    };

    fetch();
  }, []);

  const counts = {
    all: comments.length,
    positive: comments.filter(c => c.category === "Positive").length,
    negative: comments.filter(c => c.category === "Negative").length,
    spam: comments.filter(c => c.category === "Spam").length,
  };

  const filtered =
    activeCategory === "All"
      ? comments
      : comments.filter(c => c.category === activeCategory);

  return (
    <div className="min-h-screen bg-[linear-gradient(-85deg,_#214252_0%,_#2E5666_35%,_#4A6B78_98%,_#D1D5DB_130%,_#F5F6F7_100%)]">

      <main className="ml-64 p-8">

        <PageHeader />

        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          counts={counts}
        />

        {loading ? (
          <p className="text-white/60">Loading...</p>
        ) : (
          <div className="bg-white/10 backdrop-blur-xl rounded-xl overflow-hidden">

            <TableHeader />

            {filtered.map((c) => (
              <CommentRow
                key={c.id}
                comment={c}
                onView={setSelected}
              />
            ))}

          </div>
        )}

        <CommentModal
          comment={selected}
          onClose={() => setSelected(null)}
        />

      </main>
    </div>
  );
};

export default Comments;