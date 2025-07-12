// src/components/navbar.tsx

"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { TrendingUp, Users, MessageCircle, Target, Zap, Search, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

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
          <div className="hidden lg:flex items-center gap-6">
            <Link 
              href="/browse" 
              className="text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Browse
            </Link>
            <Link 
              href="/login" 
              className="text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Sign In
            </Link>
            <Link 
              href="/signup" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Sign Up
            </Link>
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
                href="/login" 
                className="text-gray-600 hover:text-gray-800 font-medium transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link 
                href="/signup" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;