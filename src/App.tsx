import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { MessageSquare, CreditCard, User, LogOut } from 'lucide-react';
import { Auth } from './components/Auth';
import { Chat } from './components/Chat';
import { Pricing } from './components/Pricing';
import { useAuthStore } from './store/authStore';

function App() {
  const { user, signOut } = useAuthStore();

  if (!user) {
    return <Auth />;
  }

  return (
    <Router>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 text-white p-4">
          <div className="flex items-center space-x-2 mb-8">
            <MessageSquare className="w-8 h-8" />
            <span className="text-xl font-bold">AI Chat Platform</span>
          </div>
          <nav className="space-y-2">
            <Link
              to="/"
              className="flex items-center space-x-2 p-2 rounded hover:bg-gray-800"
            >
              <MessageSquare size={20} />
              <span>Chat</span>
            </Link>
            <Link
              to="/pricing"
              className="flex items-center space-x-2 p-2 rounded hover:bg-gray-800"
            >
              <CreditCard size={20} />
              <span>Pricing</span>
            </Link>
          </nav>
          <div className="absolute bottom-4 left-4">
            <div className="flex items-center space-x-2 mb-2">
              <User size={20} />
              <span>{user.email}</span>
            </div>
            <button
              onClick={() => signOut()}
              className="flex items-center space-x-2 p-2 rounded hover:bg-gray-800 text-red-400"
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white">
          <Routes>
            <Route path="/" element={<Chat />} />
            <Route path="/pricing" element={<Pricing />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;