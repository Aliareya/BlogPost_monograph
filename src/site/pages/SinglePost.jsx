import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../config/Firebase";
import CommentsSection from "../components/CommentSection";
import { useParams } from "react-router-dom";

// Back
const BackLink = () => (
  <div className="max-w-4xl mx-auto px-4 pt-6">
    <a className="text-sm text-gray-600 hover:text-black" href="#">
      ← Back to Posts
    </a>
  </div>
);

// Header
const PostHeader = ({ post }) => (
  <div className="max-w-4xl mx-auto px-4 pt-6">
    <h1 className="text-4xl font-bold mb-2">
      {post?.title}
    </h1>
    <p className="text-gray-600">
      {post?.content?.slice(0, 50)}...
    </p>
  </div>
);

// Author
const AuthorInfo = ({ name }) => (
  <div className="max-w-4xl mx-auto px-4 py-4 text-sm text-gray-500">
    By {name}
  </div>
);

// Image
const FeaturedImage = () => (
  <div className="max-w-4xl mx-auto px-4 py-6">
    <img
      className="rounded-xl"
      src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1200"
      alt=""
    />
  </div>
);

// Content
const PostContent = ({ content }) => (
  <div className="max-w-4xl mx-auto px-4 text-gray-700 space-y-4">
    <p>{content}</p>
  </div>
);

// MAIN PAGE
const SinglePost = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const {id} = useParams()

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
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost(Number(id));
  }, []);

  if (loading) return <p className="text-center py-20 text-gray-500 h-[400px] flex justify-center items-center">Loading posts...</p>

  return (
    <div className="min-h-screen bg-white">
      <BackLink />
      <PostHeader post={post} />
      <AuthorInfo name={post?.author || "Unknown"} />
      <FeaturedImage />
      <PostContent content={post?.content} />
      <CommentsSection postId={id} post_name={post?.title} />
    </div>
  );
};

export default SinglePost;