import React, { useState } from 'react';
import { Clock, MessageCircle, Eye, Bookmark, MoreHorizontal, ChevronUp, ChevronDown, Star } from 'lucide-react';

export default function QuestionCard() {
  const [voteCount, setVoteCount] = useState(25);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleVote = (direction: 'up' | 'down') => {
    if (userVote === direction) {
      // Remove vote
      setVoteCount(prev => prev + (direction === 'up' ? -1 : 1));
      setUserVote(null);
    } else {
      // Change vote or new vote
      if (userVote === 'up') {
        setVoteCount(prev => prev - 2); // Remove upvote, add downvote
      } else if (userVote === 'down') {
        setVoteCount(prev => prev + 2); // Remove downvote, add upvote
      } else {
        setVoteCount(prev => prev + (direction === 'up' ? 1 : -1));
      }
      setUserVote(direction);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow max-w-4xl mx-auto">
      <div className="flex items-start gap-4">
        {/* Vote Section */}
        <div className="flex flex-col items-center min-w-[60px]">
          <button 
            onClick={() => handleVote('up')}
            className={`p-1 rounded hover:bg-gray-100 transition-colors ${
              userVote === 'up' ? 'text-green-600' : 'text-gray-400'
            }`}
          >
            <ChevronUp className="w-6 h-6" />
          </button>
          <div className={`text-2xl font-bold py-1 ${
            voteCount > 0 ? 'text-green-600' : voteCount < 0 ? 'text-red-600' : 'text-gray-700'
          }`}>
            {voteCount > 0 ? `+${voteCount}` : voteCount}
          </div>
          <button 
            onClick={() => handleVote('down')}
            className={`p-1 rounded hover:bg-gray-100 transition-colors ${
              userVote === 'down' ? 'text-red-600' : 'text-gray-400'
            }`}
          >
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer flex-1 pr-4">
              How to implement authentication in Next.js 14 with TypeScript?
            </h3>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <Star className="w-3 h-3 mr-1" />
                Solved
              </span>
              <button 
                onClick={() => setIsBookmarked(!isBookmarked)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current text-blue-500' : ''}`} />
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          <p className="text-gray-600 mb-4 line-clamp-2">
            I'm building a Next.js application with TypeScript and need to implement user authentication. What's the best approach in 2024? I've heard about NextAuth.js, but I'm also considering building a custom solution with JWT tokens.
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {['nextjs', 'typescript', 'authentication', 'react'].map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                <span>7 answers</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>1,200 views</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>2 hours ago</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">
                    S
                  </span>
                </div>
                <div className="text-sm">
                  <div className="text-gray-700">Sarah Chen</div>
                  <div className="text-gray-500">1,580</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}