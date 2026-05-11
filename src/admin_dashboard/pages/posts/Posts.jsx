import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../../config/Firebase";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";

/* ================= MODALS ================= */

const DeleteModal = ({ open, post, onClose, onDelete }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-5">
      <div className="w-full max-w-md bg-white rounded-3xl p-7 shadow-2xl">
        <div className="w-20 h-20 mx-auto rounded-full bg-red-100 flex items-center justify-center">
          <Icon
            icon="solar:trash-bin-trash-bold"
            width="34"
            className="text-red-500"
          />
        </div>

        <h2 className="text-2xl font-bold text-center mt-5">
          Delete Post
        </h2>

        <p className="text-slate-500 text-center mt-3 leading-7">
          Are you sure you want to delete
          <span className="font-semibold text-slate-800">
            {" "}"{post?.title}"{" "}
          </span>
          ?
        </p>

        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-slate-300"
          >
            Cancel
          </button>

          <button
            onClick={() => onDelete(post.firebaseId)}
            className="flex-1 py-3 rounded-xl bg-red-500 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const EditModal = ({ open, post, onClose, onSave }) => {
  const [form, setForm] = useState({
    title: "",
    category: "",
    likes: 0,
  });

  useEffect(() => {
    if (post) {
      setForm({
        title: post.title || "",
        category: post.category || "",
        likes: post.likes || 0,
      });
    }
  }, [post]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-5">
      <div className="w-full max-w-xl bg-white rounded-3xl p-7 shadow-2xl">
        <h2 className="text-2xl font-bold mb-6">Edit Post</h2>

        <div className="space-y-5">
          <input
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            className="w-full p-4 rounded-xl border"
            placeholder="Title"
          />

          <input
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
            className="w-full p-4 rounded-xl border"
            placeholder="Category"
          />

          <input
            type="number"
            value={form.likes}
            onChange={(e) =>
              setForm({ ...form, likes: Number(e.target.value) })
            }
            className="w-full p-4 rounded-xl border"
            placeholder="Likes"
          />
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border"
          >
            Cancel
          </button>

          <button
            onClick={() => onSave(post.id, form)}
            className="flex-1 py-3 rounded-xl bg-[#214252] text-white"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

/* ================= PAGE HEADER ================= */

const PageHeader = ({ postssize }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-bold text-white">Posts</h1>

      <button
        onClick={() =>
          navigate(`/admin/posts/create?postssize=${postssize}`)
        }
        className="bg-[#214252] text-white px-6 py-3 rounded-xl flex gap-2"
      >
        <Icon icon="solar:add-square-bold" width="20" />
        New Post
      </button>
    </div>
  );
};

const TableHeader = () => (
  <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-white/10 text-white font-semibold">
    <div className="col-span-3">Title</div>
    <div className="col-span-2">Category</div>
    <div className="col-span-2">Likes</div>
    <div className="col-span-2">Date</div>
    <div className="col-span-3 text-right">Actions</div>
  </div>
);

/* ================= ROW ================= */

const PostRow = ({ post, onEdit, onDelete }) => (
  <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center text-white hover:bg-white/5">
    <div className="col-span-3">{post.title}</div>

    <div className="col-span-2">
      <span className="px-3 py-1 rounded-full bg-white/10 text-xs">
        {post.category}
      </span>
    </div>

    <div className="col-span-2">{post.likes}</div>
    <div className="col-span-2">{post.date}</div>

    <div className="col-span-3 flex justify-end gap-2">
      <button
        onClick={() => onEdit(post)}
        className="p-2 rounded-lg hover:bg-white/10"
      >
        <Icon icon="solar:pen-2-bold" className="text-blue-300" width="20" />
      </button>

      <button
        onClick={() => onDelete(post)}
        className="p-2 rounded-lg hover:bg-white/10"
      >
        <Icon
          icon="solar:trash-bin-trash-bold"
          className="text-red-400"
          width="20"
        />
      </button>
    </div>
  </div>
);

/* ================= TABLE ================= */

const PostsTable = ({ setPostsCount }) => {
  const [posts, setPosts] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const fetchPosts = async () => {
    const q = query(collection(db, "posts"), orderBy("create_at", "desc"));
    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((docSnap) => ({
      ...docSnap.data(),
      firebaseId: docSnap.id,
      date: docSnap.data().create_at?.toDate().toDateString(),
    }));
    console.log(data)

    setPosts(data);
    setPostsCount(data.length);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "posts", id));
    setDeleteOpen(false);
    toast.success("Posts Deleted Successfully.")
    fetchPosts();
  };

  const handleSave = async (id, form) => {
    await updateDoc(doc(db, "posts", id), form);
    setEditOpen(false);
    fetchPosts();
  };

  return (
    <>
      <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl">
        <TableHeader />

        {posts.map((post) => (
          <PostRow
            key={post.id}
            post={post}
            onEdit={(p) => {
              setSelectedPost(p);
              setEditOpen(true);
            }}
            onDelete={(p) => {
              setSelectedPost(p);
              setDeleteOpen(true);
            }}
          />
        ))}
      </div>

      <EditModal
        open={editOpen}
        post={selectedPost}
        onClose={() => setEditOpen(false)}
        onSave={handleSave}
      />

      <DeleteModal
        open={deleteOpen}
        post={selectedPost}
        onClose={() => setDeleteOpen(false)}
        onDelete={handleDelete}
      />
    </>
  );
};

/* ================= MAIN ================= */

const Posts = () => {
  const [postsCount, setPostsCount] = useState(0);

  return (
    <div className="min-h-screen bg-[linear-gradient(74deg,_#214252_0%,_#2E5666_35%,_#4A6B78_78%,_#D1D5DB_108%,_#F5F6F7_100%)]">
      <main className="ml-64 p-8">
        <div className="mb-2 text-sm text-white/60">
          Dashboard / Posts
        </div>

        <PageHeader postssize={postsCount} />
        <PostsTable setPostsCount={setPostsCount} />
      </main>
    </div>
  );
};

export default Posts;