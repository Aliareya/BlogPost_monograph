import React, { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../../config/Firebase";
import { useNavigate } from "react-router-dom";

/* ---------------- HERO ---------------- */
const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-orange-50 via-white to-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-gray-900">
          Stories that <span className="text-orange-500 italic">inspire</span>
        </h1>
        <p className="mt-4 text-gray-600 max-w-lg">
          Discover thoughtful writing on technology, design, and lifestyle.
        </p>
      </div>
    </section>
  );
};

/* ---------------- POST CARD ---------------- */
const PostCard = ({ post }) => {
  const navigate = useNavigate();
  return (
    <article className="bg-white rounded-xl shadow border overflow-hidden hover:shadow-lg transition">
      <img
        src={post.image}
        alt={post.title}
        className="h-48 w-full object-cover"
      />

      <div className="p-5">
        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
          {post.category}
        </span>

        <h3 onClick={()=>navigate(`/posts/${post.id}`)} className="cursor-pointer font-bold mt-2 text-lg">{post.title}</h3>

        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {post.description}
        </p>

        <div className="mt-4 text-sm text-gray-500 flex justify-between">
          <span>{post.author}</span>

          <span>
            {post.create_at
              ? new Date(post.create_at.seconds * 1000).toLocaleDateString()
              : ""}
          </span>
        </div>
      </div>
    </article>
  );
};

/* ---------------- TRENDING POSTS (NEW SECTION) ---------------- */
const TrendingPosts = ({ posts }) => {
  const navigate = useNavigate()
  const trending = posts?.slice(0, 2);

  if (!trending || trending.length === 0) return null;

  return (
    <section className="py-10 max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6">🔥 Trending Posts</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {trending.map((post) => (
          <div
            key={post.id}
            className="bg-white border rounded-xl overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={post.image}
              alt={post.title}
              className="h-56 w-full object-cover"
            />

            <div className="p-5">
              <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">
                {post.category}
              </span>

              <h3 onClick={()=>navigate(`/posts/${post.id}`)} className="text-lg cursor-pointer font-bold mt-2">{post.title}</h3>

              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                {post.description}
              </p>

              <div className="flex justify-between mt-4 text-xs text-gray-500">
                <span>{post.author}</span>

                <span>
                  {post.create_at
                    ? new Date(post.create_at.seconds * 1000).toLocaleDateString()
                    : ""}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ---------------- RECENT POSTS ---------------- */
const RecentPosts = ({ posts }) => {
  return (
    <section className="py-10 max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};

/* ---------------- MAIN HOME ---------------- */
const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        const q = query(
          collection(db, "posts"),
          orderBy("create_at", "desc"),
          limit(10)
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts(data);
      } catch (err) {
        console.log("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <Hero />

      {loading ? (
        <p className="text-center h-[400px] flex justify-center items-center">
          Loading...
        </p>
      ) : (
        <>
          <TrendingPosts posts={posts} />
          <RecentPosts posts={posts} />
        </>
      )}
    </div>
  );
};

export default Home;