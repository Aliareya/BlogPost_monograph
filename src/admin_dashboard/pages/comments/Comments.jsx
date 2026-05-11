import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../../config/Firebase";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";

/* =========================
   PAGE HEADER
========================= */
const PageHeader = () => (
  <div className="mb-8">
    <div className="mb-2 text-sm text-white/60 font-medium">
      Dashboard
    </div>
    <h1 className="text-3xl font-bold text-white">
      Comments
    </h1>
  </div>
);

/* =========================
   CATEGORY FILTER
========================= */
const CategoryFilter = ({
  activeCategory,
  onCategoryChange,
  counts,
}) => {
  const categories = [
    { name: "All", count: counts.all },
    { name: "Positive", count: counts.positive },
    { name: "Negative", count: counts.negative },
    { name: "Spam", count: counts.spam },
    { name: "Question", count: counts.question },
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
const TableHeader = () => (
  <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-white/10 text-white text-sm font-semibold border-b border-white/10">
    <div className="col-span-2">Author</div>
    <div className="col-span-2">Post</div>
    <div className="col-span-3">Comment</div>
    <div className="col-span-2">Category</div>
    <div className="col-span-2">Status</div>
    <div className="col-span-1 text-right">Action</div>
  </div>
);

/* =========================
   ROW
========================= */
const CommentRow = ({ comment, onView }) => {
  const color = {
    positive: "text-green-300",
    negative: "text-red-300",
    spam: "text-yellow-300",
  };

  return (
    <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/10 text-white/90 hover:bg-white/5">
      <div className="col-span-2 truncate">{comment.name}</div>
      <div className="col-span-2 truncate">{comment.post_name}</div>

      <div className="col-span-3 truncate text-white/70">
        {comment.message}
      </div>

      <div className={`col-span-2 capitalize ${color[comment.category]}`}>
        {comment.category}
      </div>

      <div className="col-span-2 capitalize">{comment.status}</div>

      <div className="col-span-1 flex justify-end">
        <button onClick={() => onView(comment)}>
          <Icon
            icon="mingcute:edit-line"
            width="22"
            className="text-white hover:text-orange-400"
          />
        </button>
      </div>
    </div>
  );
};

/* =========================
   LOADING SPINNER
========================= */
const Spinner = () => (
  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
);

/* =========================
   MODAL
========================= */
const CommentModal = ({ comment, onClose, onUpdateUI }) => {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const [loading, setLoading] = useState({
    message: false,
    reply: false,
    publish: false,
    delete: false,
  });

  useEffect(() => {
    if (comment) {
      setMessage(comment.message || "");
      setReply(comment?.replays?.message || "");
    }
  }, [comment]);

  if (!comment) return null;

  /* UPDATE MESSAGE */
  const handleUpdateMessage = async () => {
    setLoading((p) => ({ ...p, message: true }));

    try {
      await updateDoc(doc(db, "comments", comment.id), {
        message,
      });

      onUpdateUI({ ...comment, message });
      toast.success("Comment updated");
      onClose();
    } finally {
      setLoading((p) => ({ ...p, message: false }));
    }
  };

  /* UPDATE REPLY */
  const handleUpdateReply = async () => {
    setLoading((p) => ({ ...p, reply: true }));

    try {
      await updateDoc(doc(db, "comments", comment.id), {
        "replays.message": reply,
      });

      onUpdateUI({
        ...comment,
        replays: { message: reply },
      });

      toast.success("Reply updated");
      onClose();
    } finally {
      setLoading((p) => ({ ...p, reply: false }));
    }
  };

  /* PUBLISH */
  const handlePublish = async () => {
    setLoading((p) => ({ ...p, publish: true }));

    try {
      await updateDoc(doc(db, "comments", comment.id), {
        status: "published",
      });

      onUpdateUI({
        ...comment,
        status: "published",
      });

      toast.success("Published");
      onClose();
    } finally {
      setLoading((p) => ({ ...p, publish: false }));
    }
  };

  /* DELETE */
  const handleDelete = async () => {
    setLoading((p) => ({ ...p, delete: true }));

    try {
      await deleteDoc(doc(db, "comments", comment.id));

      onUpdateUI(null, comment.id);

      toast.success("Deleted");
      onClose();
    } finally {
      setLoading((p) => ({ ...p, delete: false }));
    }
  };

  return (
    <div
      className="fixed  inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-[linear-gradient(-150deg,_#214252_0%,_#2E5666_35%,_#4A6B78_48%,_#D1D5DB_99%,_#F5F6F7_100%)] w-full max-w-xl rounded-2xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex justify-between px-6 py-4 border-b">
          <h3 className="font-semibold">Comment Details</h3>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-4 text-sm text-gray-100">
          <p><b>Author:</b> {comment.name}</p>
          <p><b>Post:</b> {comment.post_name}</p>
          <p><b>Category:</b> {comment.category}</p>
          <p><b>Status:</b> {comment.status}</p>

          {/* MESSAGE */}
          <div className="">
            <b>Edit Message</b>
            <textarea
              className="w-full border text-black p-3 mt-2 rounded-lg"
              rows={1}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          {/* REPLY */}
          <div>
            <b>Edit Reply</b>
            <textarea
              className="w-full border text-black p-3 mt-2 rounded-lg"
              rows={2}
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-wrap gap-2 justify-end px-6 py-4 bg-gray-50">

          <button
            disabled={loading.message}
            onClick={handleUpdateMessage}
            className="px-4 py-2 bg-[linear-gradient(135deg,_#214252_0%,_#2E5666_35%,_#4A6B78_48%,_#D1D5DB_80%,_#F5F6F7_100%)] text-white rounded-lg flex items-center gap-2"
          >
            {loading.message && <Spinner />}
            Update Message
          </button>

          <button
            disabled={loading.reply}
            onClick={handleUpdateReply}
            className="px-4 py-2 bg-[linear-gradient(135deg,_#214252_0%,_#2E5666_35%,_#4A6B78_48%,_#D1D5DB_80%,_#F5F6F7_100%)] text-white rounded-lg flex items-center gap-2"
          >
            {loading.reply && <Spinner />}
            Update Reply
          </button>

          <button
            disabled={loading.publish}
            onClick={handlePublish}
            className="px-4 py-2 bg-[linear-gradient(-135deg,_#214252_0%,_#2E5666_35%,_#4A6B78_48%,_#D1D5DB_80%,_#F5F6F7_100%)] text-white rounded-lg flex items-center gap-2"
          >
            {loading.publish && <Spinner />}
            Publish
          </button>

          <button
            disabled={loading.delete}
            onClick={handleDelete}
            className="px-4 py-2 bg-red-300 text-white rounded-lg flex items-center gap-2"
          >
            {loading.delete && <Spinner />}
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
        category: d.data().category?.toLowerCase(),
        status: d.data().status?.toLowerCase(),
      }));

      setComments(data);
      setLoading(false);
    };

    fetch();
  }, []);

  const counts = {
    all: comments.length,
    positive: comments.filter((c) => c.category === "positive").length,
    negative: comments.filter((c) => c.category === "negative").length,
    spam: comments.filter((c) => c.category === "spam").length,
    question: comments.filter((c) => c.category === "question").length,
  };

  const filtered =
    activeCategory === "All"
      ? comments
      : comments.filter(
          (c) => c.category === activeCategory.toLowerCase()
        );

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
          <div className="bg-white/10 rounded-xl overflow-hidden">
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
          onUpdateUI={(updated, deletedId) => {
            if (deletedId) {
              setComments((p) =>
                p.filter((x) => x.id !== deletedId)
              );
              return;
            }

            setComments((p) =>
              p.map((x) =>
                x.id === updated.id ? updated : x
              )
            );
          }}
        />
      </main>
    </div>
  );
};

export default Comments;