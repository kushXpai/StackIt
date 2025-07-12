// src/components/usernavbar.tsx

"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X, Bell, User, Settings, HelpCircle, LogOut, Plus } from 'lucide-react';

const UserNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const notifications = [
    {
      id: 1,
      type: 'comment',
      title: 'New comment',
      message: 'You have a new comment notification',
      time: 'Just now',
      unread: true
    },
    {
      id: 2,
      type: 'answer',
      title: 'New answer on your question',
      message: 'John Doe answered "How to center a div?"',
      time: '2h ago',
      unread: true
    },
    {
      id: 3,
      type: 'accepted',
      title: 'Your answer was accepted',
      message: 'Sarah accepted your answer on "React hooks"',
      time: '3h ago',
      unread: true
    },
    {
      id: 4,
      type: 'mention',
      title: 'Someone mentioned you',
      message: '@you in "Best practices for TypeScript"',
      time: '5h ago',
      unread: true
    }
  ];

  return (
    <nav className="bg-white text-black border-b border-gray-200 px-4 py-3 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold text-gray-800 hidden sm:block">StackIt</span>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search questions, tags, or users..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-4">
            <Link 
              href="/user/browse" 
              className="text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Browse
            </Link>
            
            {/* Ask Question Button */}
            <Link 
              href="/ask" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Ask Question
            </Link>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={toggleNotification}
                className="relative p-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <Bell className="w-5 h-5" />
                {notifications.some(n => n.unread) && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {notifications.filter(n => n.unread).length}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">Notifications</h3>
                    <button className="text-sm text-blue-600 hover:text-blue-800">Mark all read</button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-800 text-sm">{notification.title}</p>
                            <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                            <p className="text-gray-400 text-xs mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="flex items-center gap-2 p-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <User className="w-5 h-5" />
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <p className="font-semibold text-gray-800">Demo User</p>
                    <p className="text-sm text-gray-600">demo@stackit.com</p>
                  </div>
                  <div className="py-2">
                    <Link href="/profile" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50">
                      <User className="w-4 h-4" />
                      Profile
                    </Link>
                    <Link href="/settings" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50">
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>
                    <Link href="/help" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50">
                      <HelpCircle className="w-4 h-4" />
                      Help
                    </Link>
                    <button className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-50 w-full text-left">
                      <LogOut className="w-4 h-4" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile/Tablet Controls */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={toggleSearch}
              className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="lg:hidden mt-4 pb-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search questions, tags, or users..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-b border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/browse" 
                className="text-gray-600 hover:text-gray-800 font-medium transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Browse
              </Link>
              <Link 
                href="/ask" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 text-center flex items-center justify-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Plus className="w-4 h-4" />
                Ask Question
              </Link>
              <Link 
                href="/profile" 
                className="text-gray-600 hover:text-gray-800 font-medium transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <Link 
                href="/settings" 
                className="text-gray-600 hover:text-gray-800 font-medium transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Settings
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default UserNavbar;