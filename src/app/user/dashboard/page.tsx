// src/app/page.tsx
import UserNavbar from '@/components/usernavbar'
import Link from 'next/link'
import { TrendingUp, Users, MessageCircle, Target, Zap } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <UserNavbar />

      {/* Hero Section with Gradient Background */}
      <div className="bg-gradient-to-br from-purple-100 via-orange-50 to-white-50 text-center py-20 px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
          Stack your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-red-500">knowledge</span>,
          <br />
          share your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">expertise</span>
        </h1>

        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          Join the most collaborative Q&A platform for developers. Ask questions, share knowledge, and build your reputation in the tech community.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="browse">
            <button className="bg-gradient-to-r from-blue-600 to-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Browse Questions →
            </button>
          </Link>
          <Link href="ask">
            <button className="bg-white text-gray-700 px-8 py-3 rounded-lg font-semibold border border-gray-200 hover:shadow-lg transition-all duration-300">
              Ask Your First Question
            </button>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-800">12.5K+</div>
            <div className="text-sm text-gray-600">Active Developers</div>
            <div className="text-xs text-gray-500">Growing community</div>
          </div>

          <div className="text-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <MessageCircle className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-800">45K+</div>
            <div className="text-sm text-gray-600">Questions Asked</div>
            <div className="text-xs text-gray-500">Problems solved daily</div>
          </div>

          <div className="text-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Target className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-800">38K+</div>
            <div className="text-sm text-gray-600">Accepted Answers</div>
            <div className="text-xs text-gray-500">Solutions that work</div>
          </div>

          <div className="text-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-800">&lt; 30min</div>
            <div className="text-sm text-gray-600">Avg Response Time</div>
            <div className="text-xs text-gray-500">Fast community help</div>
          </div>
        </div>
      </div>

      {/* Trending Questions Section */}
      <div className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
              <TrendingUp className="w-8 h-8 text-blue-600" />
              Trending Questions
            </h2>
            <p className="text-gray-600">
              Discover the most engaging discussions happening in our community right now
            </p>
          </div>

          <div className="space-y-6">
            {/* Question 1 */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-gray-500">
                    <span className="text-sm">👍 24</span>
                    <span className="text-sm">💬 7</span>
                  </div>
                  <h3 className="text-lg font-semibold text-blue-600 hover:text-blue-700 cursor-pointer">
                    How to implement authentication in Next.js 14 with TypeScript?
                  </h3>
                </div>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  Solved
                </span>
              </div>

              <p className="text-gray-600 mb-4">
                I'm building a Next.js application with TypeScript and need to implement user authentication. What's the best approach in 2024?
              </p>

              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">nextjs</span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">typescript</span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">authentication</span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">react</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>Sarah Chen 1580</span>
                  <span>2 hours ago</span>
                  <span>1,200 views</span>
                </div>
              </div>
            </div>

            {/* Question 2 */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-gray-500">
                    <span className="text-sm">👍 31</span>
                    <span className="text-sm">💬 12</span>
                  </div>
                  <h3 className="text-lg font-semibold text-blue-600 hover:text-blue-700 cursor-pointer">
                    Best practices for state management in large React applications
                  </h3>
                </div>
              </div>

              <p className="text-gray-600 mb-4">
                As our React app grows, state management becomes more complex. Should we use Redux, Zustand, or stick with Context API?
              </p>

              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">react</span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">state-management</span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">redux</span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">architecture</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>Alex Rodriguez 2340</span>
                  <span>4 hours ago</span>
                  <span>2,400 views</span>
                </div>
              </div>
            </div>

            {/* Question 3 */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-gray-500">
                    <span className="text-sm">👍 18</span>
                    <span className="text-sm">💬 5</span>
                  </div>
                  <h3 className="text-lg font-semibold text-blue-600 hover:text-blue-700 cursor-pointer">
                    Optimizing database queries in PostgreSQL for better performance
                  </h3>
                </div>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  Solved
                </span>
              </div>

              <p className="text-gray-600 mb-4">
                Our application is experiencing slow query performance. What are some proven techniques to optimize PostgreSQL queries?
              </p>

              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">postgresql</span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">database</span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">performance</span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">sql</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>Michael Kim 890</span>
                  <span>6 hours ago</span>
                  <span>800 views</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <button className="bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold border border-gray-200 hover:shadow-lg transition-all duration-300">
              View All Questions
            </button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to join the community?</h2>
          <p className="text-xl mb-8">
            Start asking questions, sharing knowledge, and connecting with developers worldwide.
            <br />
            Your expertise matters.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/ask">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Ask Your Question
              </button>
            </Link>
            <Link href="/browse">
              <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
                Explore Questions
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-8 px-4 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">StackIt</span>
          </div>
          <p className="text-gray-600">
            Building the future of collaborative learning, one question at a time.
          </p>
        </div>
      </footer>
    </div>
  )
}