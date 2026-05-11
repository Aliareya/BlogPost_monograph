import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../config/Firebase";
import useAuthStore from "../../../store/AuthStore";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";

/* =========================
   CREATE POST PAGE
========================= */
const CreatePost = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const postsSize = searchParams.get("postssize");
  const newId = Number(postsSize) + 1;
  const user = useAuthStore((state)=>state.user);

  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "programing",
    image: "",
  });

  

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  /* =========================
     HANDLE INPUT CHANGE
  ========================= */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* =========================
     SUBMIT POST
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await addDoc(collection(db, "posts"), {
        title: form.title,
        content: form.content,
        category: form.category,
        image: form.image,
        author : user.name,
        id:newId,
        likes: 0,
        create_at: serverTimestamp(),
      });

      toast.success('post create successfully..');

      // reset form
      setForm({
        title: "",
        content: "",
        category: "programing",
        image: "",
      });

      navigate('/admin/posts')

    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" py-10 bg-[linear-gradient(74deg,_#214252_0%,_#2E5666_35%,_#4A6B78_78%,_#D1D5DB_108%,_#F5F6F7_100%)] pl-72 flex items-center justify-center px-4">
      <div className="bg-[linear-gradient(-74deg,_#214252_0%,_#2E5666_35%,_#4A6B78_78%,_#D1D5DB_108%,_#F5F6F7_100%)] w-full  p-6 rounded-2xl shadow">

        <h1 className="text-2xl text-gray-100 font-bold mb-6">Create New Post</h1>

        {success && (
          <p className="text-green-600 mb-4">
            Post created successfully 🎉
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Post title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          {/* Content */}
          <textarea
            name="content"
            placeholder="Post content"
            value={form.content}
            onChange={handleChange}
            className="w-full border p-3 rounded h-32"
            required
          />

          {/* Category */}
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            <option value="programing">Programming</option>
            <option value="design">Design</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="travel">Travel</option>
          </select>

          {/* Image URL */}
          <input
            type="text"
            name="image"
            placeholder="Image URL (Unsplash link)"
            value={form.image}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          {/* Preview Image */}
          {form.image && (
            <img
              src={form.image}
              alt="preview"
              className="w-full h-48 object-cover rounded"
            />
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[linear-gradient(74deg,_#214252_0%,_#2E5666_35%,_#4A6B78_78%,_#D1D5DB_108%,_#F5F6F7_100%)] text-white py-3 rounded hover:bg-gray-800"
          >
            {loading ? "Creating..." : "Create Post"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreatePost;