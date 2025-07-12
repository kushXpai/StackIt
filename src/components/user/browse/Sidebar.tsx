// src/components/user/browse/Sidebar.tsx

import React from 'react';
import { Clock, Star, MessageCircle, TrendingUp } from 'lucide-react';

interface Tag {
  name: string;
  count: number;
}

interface SidebarProps {
  popularTags: Tag[];
  communityStats: {
    questions: string;
    answers: string;
    users: string;
    tags: string;
  };
}

export const Sidebar: React.FC<SidebarProps> = ({ popularTags, communityStats }) => {
  return (
    <div className="w-80 space-y-6">
      {/* Popular Tags */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Popular Tags</h3>
        </div>
        <div className="space-y-2">
          {popularTags.map((tag, index) => (
            <div key={index} className="flex items-center justify-between py-2 hover:bg-gray-50 rounded px-2 -mx-2 cursor-pointer">
              <span className="text-sm text-gray-700">{tag.name}</span>
              <span className="text-sm font-medium text-gray-500">{tag.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2 py-2 hover:bg-gray-50 rounded px-2 -mx-2 cursor-pointer">
            <Clock className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-700">Recent Questions</span>
          </div>
          <div className="flex items-center gap-2 py-2 hover:bg-gray-50 rounded px-2 -mx-2 cursor-pointer">
            <Star className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-700">Top Rated</span>
          </div>
          <div className="flex items-center gap-2 py-2 hover:bg-gray-50 rounded px-2 -mx-2 cursor-pointer">
            <MessageCircle className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-700">Most Discussed</span>
          </div>
        </div>
      </div>

      {/* Community Stats */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Community Stats</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Questions</span>
            <span className="text-sm font-medium text-gray-900">{communityStats.questions}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Answers</span>
            <span className="text-sm font-medium text-gray-900">{communityStats.answers}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Users</span>
            <span className="text-sm font-medium text-gray-900">{communityStats.users}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Tags</span>
            <span className="text-sm font-medium text-gray-900">{communityStats.tags}</span>
          </div>
        </div>
      </div>
    </div>
  );
};