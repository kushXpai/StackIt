// src/components/Auth/LoginForm.tsx
'use client';

import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginForm() {
  const router = useRouter();
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      // Check if user exists with email or username and verify password
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .or(`email.eq.${emailOrUsername},username.eq.${emailOrUsername}`)
        .single();

      if (userError || !userData) {
        setError('Invalid email/username or password');
        setLoading(false);
        return;
      }

      // Check if password matches (plain text comparison)
      if (userData.password_hash !== password) {
        setError('Invalid email/username or password');
        setLoading(false);
        return;
      }

      // Since we're using custom authentication, we'll need to manage the session manually
      // For now, we'll store user info in localStorage and redirect
      // In a real app, you'd want to implement proper session management
      
      const userSession = {
        id: userData.id,
        username: userData.username,
        name: userData.name,
        email: userData.email,
        is_admin: userData.is_admin,
        created_at: userData.created_at
      };

      // Store user session (Note: In production, use secure HTTP-only cookies)
      localStorage.setItem('userSession', JSON.stringify(userSession));

      // Route based on admin status
      if (userData.is_admin) {
        router.push('/admin/dashboard');
      } else {
        router.push('/user/dashboard');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white shadow-lg p-8 rounded-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-orange-500 rounded-2xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <span className="ml-3 text-2xl font-bold text-gray-800">StackIt</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome back</h2>
        <p className="text-gray-600">Sign in to your account to continue</p>
      </div>

      {/* Email/Username Input */}
      <div className="mb-4">
        <label htmlFor="emailOrUsername" className="block text-sm font-medium text-gray-700 mb-2">
          Email or Username
        </label>
        <div className="relative">
          <input
            id="emailOrUsername"
            type="text"
            placeholder="Enter your email or username"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Password Input */}
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? (
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
              </svg>
            ) : (
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Remember Me and Forgot Password */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <input
            id="remember"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          />
          <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
            Remember me
          </label>
        </div>
        <a href="#" className="text-sm text-purple-600 hover:text-purple-500 font-medium">
          Forgot password?
        </a>
      </div>

      {/* Sign In Button */}
      <button
        onClick={handleLogin}
        disabled={loading}
        className="w-full bg-gradient-to-r from-purple-600 to-orange-500 text-white py-3 px-4 rounded-xl font-medium hover:from-purple-700 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {loading ? 'Signing In...' : 'Sign In'}
      </button>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Sign Up Link */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/signup" className="text-purple-600 hover:text-purple-500 font-medium">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}