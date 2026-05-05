import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../config/Firebase";
import { useNavigate } from "react-router-dom";

/* =========================
   PAGE HEADER
========================= */
const PageHeader = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">
          All Posts
        </h1>
        <p className="text-gray-600 text-lg">
          Explore our collection of articles and stories.
        </p>
      </div>
    </div>
  );
};

/* =========================
   SEARCH + FILTER
========================= */
const SearchAndFilter = ({
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
}) => {
  const categories = [
    "All",
    "programing",
    "technology",
    "design",
    "lifestyle",
    "business",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">

        {/* Search */}
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:max-w-md px-4 py-2 border rounded-full focus:ring-2 focus:ring-orange-500"
        />

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

/* =========================
   POST CARD
========================= */
const PostCard = ({ post }) => {
  const navigate = useNavigate()
  return (
    <div className="bg-white rounded-2xl shadow border overflow-hidden">
      <img
        src={post.image}
        alt={post.title}
        className="h-48 w-full object-cover"
      />

      <div className="p-5">
        <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">
          {post.category}
        </span>

        <h2 onClick={()=>navigate(`/posts/${post.id}`)}
          className="text-lg cursor-pointer font-bold mt-3">{post.title}</h2>

        <p className="text-gray-600 text-sm mt-2">
          {post.content?.slice(0, 100)}...
        </p>

        <div className="flex justify-between mt-4 text-sm text-gray-500">
          <span>{post.author || "Admin"}</span>
          <span>❤️ {post.likes || 0}</span>
        </div>
      </div>
    </div>
  );
};

/* =========================
   POSTS GRID
========================= */
const PostsGrid = ({ posts }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 pb-16">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No posts found
          </p>
        )}
      </div>
    </div>
  );
};

/* =========================
   MAIN COMPONENT
========================= */
export const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  /* =========================
     FETCH POSTS FROM FIREBASE
  ========================= */
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        const q = query(
          collection(db, "posts"),
          orderBy("create_at", "desc")
        );

        const querySnapshot = await getDocs(q);

        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  /* =========================
     FILTER LOGIC
  ========================= */
  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;

    const matchesSearch =
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <p className="text-center py-20 text-gray-500 h-[400px] flex justify-center items-center">Loading posts...</p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader />

      <SearchAndFilter
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <PostsGrid posts={filteredPosts} />
    </div>
  );
};