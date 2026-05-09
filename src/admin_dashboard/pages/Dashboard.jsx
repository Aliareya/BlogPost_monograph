import React from 'react';

// Sidebar Component


// Stat Card Component
const StatCard = ({ icon, number, label, sublabel, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-red-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
  };

  return (
    <div className="bg-[linear-gradient(46deg,_#214252_0%,_#2E5666_35%,_#4A6B78_82%,_#D1D5DB_83%,_#F5F6F7_100%)] rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${colorClasses[color]}`}>
        {icon}
      </div>
      <div className="text-3xl font-bold text-gray-100 mb-1">{number}</div>
      <div className="text-sm text-gray-200">{label}</div>
      <div className="text-xs text-gray-300 mt-1">{sublabel}</div>
    </div>
  );
};

// Stats Grid Component
const StatsGrid = () => {
  const stats = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      number: '4',
      label: 'Total Posts',
      sublabel: '4 published',
      color: 'blue'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      number: '1',
      label: 'Comments',
      sublabel: 'All time',
      color: 'green'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      number: '41',
      label: 'Total Likes',
      sublabel: 'Across all posts',
      color: 'red'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      number: '0',
      label: 'Users',
      sublabel: 'Registered',
      color: 'purple'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      number: '0',
      label: 'Messages',
      sublabel: '0 unread',
      color: 'orange'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

// Post Row Component
const PostRow = ({ title, status, category, likes }) => {
  return (
    <div className="bg-[linear-gradient(85deg,_#214252_0%,_#2E5666_35%,_#4A6B78_48%,_#D1D5DB_99%,_#F5F6F7_100%)] rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow flex items-center justify-between">
      <div className="flex-1">
        <h3 className="font-semibold text-gray-100 mb-1">{title}</h3>
        <p className="text-sm text-gray-300">
          {status} · {category}
        </p>
      </div>
      <div className="flex items-center gap-1 text-gray-500">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <span className="text-sm">{likes}</span>
      </div>
    </div>
  );
};

// Recent Posts Component
const RecentPosts = () => {
  const posts = [
    {
      title: 'The Art of Minimalist Design in 2026',
      status: 'Published',
      category: 'Design',
      likes: 12
    },
    {
      title: 'Building Creative Habits That Last',
      status: 'Published',
      category: 'Lifestyle',
      likes: 8
    },
    {
      title: 'Hidden Gems: Mountain Towns Worth Visiting',
      status: 'Published',
      category: 'Travel',
      likes: 15
    },
    {
      title: 'Simple Recipes for Busy Weeknights',
      status: 'Published',
      category: 'Food',
      likes: 6
    }
  ];

  return (
    <div>
      <h2 className=" text-2xl font-serif font-bold text-gray-300 mb-6">Recent Posts</h2>
      <div className="space-y-4">
        {posts.map((post, index) => (
          <PostRow key={index} {...post} />
        ))}
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[linear-gradient(-150deg,_#214252_0%,_#2E5666_35%,_#4A6B78_48%,_#D1D5DB_99%,_#F5F6F7_100%)]">
      {/* <Sidebar /> */}

      <main className="ml-64">
        <div className="p-8">
          <div className="mb-2 text-sm text-gray-100 font-medium">Dashboard</div>
          <h1 className="text-3xl font-serif font-bold text-gray-200 mb-8">Overview</h1>

          <StatsGrid />
          <RecentPosts />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;