import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../config/Firebase";

// ====================
// Stat Card
// ====================
const StatCard = ({ icon, value, label, sublabel, color }) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    red: "bg-red-50 text-red-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
  };

  return (
    <div className="bg-[linear-gradient(46deg,_#214252_0%,_#2E5666_35%,_#4A6B78_82%,_#D1D5DB_83%,_#F5F6F7_100%)] rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
      <div
        className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${colorClasses[color]}`}
      >
        {icon}
      </div>

      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-gray-200">{label}</div>
      <div className="text-xs text-gray-300 mt-1">{sublabel}</div>
    </div>
  );
};

// ====================
// Stats Grid
// ====================
const StatsGrid = ({ posts, comments, messages }) => {
  const stats = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      value: posts,
      label: "Total Posts",
      sublabel: `${posts} published`,
      color: "blue",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
      value: comments,
      label: "Comments",
      sublabel: "All time",
      color: "green",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      value: 1,
      label: "Users",
      sublabel: "Registered",
      color: "purple",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      value: messages,
      label: "Messages",
      sublabel: `${messages} total`,
      color: "orange",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

// ====================
// Comment Row
// ====================
const CommentRow = ({ name, comment, postTitle }) => {
  return (
    <div className="bg-[linear-gradient(85deg,_#214252_0%,_#2E5666_35%,_#4A6B78_48%,_#D1D5DB_99%,_#F5F6F7_100%)] rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
      <h3 className="font-semibold text-white mb-2">{name || "Anonymous"}</h3>

      <p className="text-gray-200 text-sm mb-2">
        {comment || "No comment text"}
      </p>

      <p className="text-xs text-gray-300">
        On post: {postTitle || "Unknown Post"}
      </p>
    </div>
  );
};

// ====================
// Recent Comments
// ====================
const RecentComments = ({ comments }) => {
  return (
    <div>
      <h2 className="text-2xl font-serif font-bold text-white mb-6">
        Recent Comments
      </h2>

      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((item) => (
            <CommentRow
              key={item.id}
              name={item.name}
              comment={item.message}
              postTitle={item.post_name}
            />
          ))
        ) : (
          <p className="text-white">No comments found</p>
        )}
      </div>
    </div>
  );
};

// ====================
// Dashboard
// ====================
const Dashboard = () => {
  const [posts, setPosts] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [messages, setMessages] = useState(0);
  const [recentComments, setRecentComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);

      try {
        const postSnap = await getDocs(query(collection(db, "posts")));
        const commentSnap = await getDocs(query(collection(db, "comments")));
        const messageSnap = await getDocs(query(collection(db, "message")));

        setPosts(postSnap.size);
        setCommentsCount(commentSnap.size);
        setMessages(messageSnap.size);

        const commentsData = commentSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setRecentComments(commentsData.slice(0, 4));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-[linear-gradient(-150deg,_#214252_0%,_#2E5666_35%,_#4A6B78_48%,_#D1D5DB_99%,_#F5F6F7_100%)]">
      <main className="ml-64">
        <div className="p-8">
          <div className="mb-2 text-sm text-gray-100 font-medium">
            Dashboard
          </div>

          <h1 className="text-3xl font-serif font-bold text-white mb-8">
            Overview
          </h1>

          {loading ? (
            <div className="text-white text-lg">Loading...</div>
          ) : (
            <>
              <StatsGrid
                posts={posts}
                comments={commentsCount}
                messages={messages}
              />

              <RecentComments comments={recentComments} />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;