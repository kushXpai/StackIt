// src/app/admin/dashboard/page.tsx
'use client';

import React, { useState } from 'react';
import { Users, MessageCircle, TrendingUp, AlertTriangle, CheckCircle, Shield, MoreHorizontal, Flag } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type StatCardProps = {
  icon: LucideIcon; // or React.ComponentType if using other icons
  label: string;
  value: string;
  color: string;
};
const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('reported');

  const stats = [
    { icon: Users, label: 'Total Users', value: '5,234', color: 'text-blue-600' },
    { icon: MessageCircle, label: 'Questions', value: '12,456', color: 'text-green-600' },
    { icon: TrendingUp, label: 'Answers', value: '28,901', color: 'text-purple-600' },
    { icon: AlertTriangle, label: 'Pending Reports', value: '15', color: 'text-orange-600' },
    { icon: CheckCircle, label: 'Resolved Today', value: '23', color: 'text-green-600' },
  ];

  const reportedContent = [
    {
      type: 'question',
      content: 'How to hack databases?',
      description: 'I want to learn how to hack into databases for malicious ...',
      author: 'BadActor',
      reporter: 'GoodUser',
      reason: 'Malicious content',
      date: '1/15/2024'
    },
    {
      type: 'answer',
      content: 'Spam answer with irrelevant links',
      description: 'Check out this amazing product at spamlink.com!!!',
      author: 'SpamBot',
      reporter: 'ModerateUser',
      reason: 'Spam',
      date: '1/15/2024'
    }
  ];

  const flaggedUsers = [
    {
      user: 'BadActor',
      email: 'bad@example.com',
      reputation: 5,
      activity: { questions: 3, answers: 1 },
      reports: 5,
      status: 'active'
    },
    {
      user: 'SpamBot',
      email: 'spam@example.com',
      reputation: 1,
      activity: { questions: 0, answers: 10 },
      reports: 8,
      status: 'active'
    }
  ];

  const StatCard = ({ icon: Icon, label, value, color }: StatCardProps) => (
    <div className="bg-white p-6 rounded-lg shadow border">
      <div className="flex items-center">
        <Icon className={`h-8 w-8 ${color}`} />
        <div className="ml-4">
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-sm text-gray-600">{label}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <Shield className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          </div>
          <p className="text-gray-600">Manage reported content and moderate the community</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-6">
          <button
            onClick={() => setActiveTab('reported')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'reported'
                ? 'bg-gray-200 text-gray-900'
                : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            Reported Content
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'users'
                ? 'bg-gray-200 text-gray-900'
                : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            User Management
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-lg shadow">
          {activeTab === 'reported' ? (
            <div className="p-6">
              <div className="flex items-center mb-6">
                <Flag className="h-5 w-5 text-gray-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Reported Content</h2>
                <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  2
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Content</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Author</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Reporter</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Reason</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportedContent.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.type === 'question' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                            {item.type}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="max-w-xs">
                            <p className="font-medium text-gray-900 truncate">{item.content}</p>
                            <p className="text-sm text-gray-500 truncate">{item.description}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium text-gray-600">
                                {item.author.charAt(0)}
                              </span>
                            </div>
                            <span className="ml-2 text-sm text-gray-900">{item.author}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-900">{item.reporter}</td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.reason === 'Malicious content' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                            {item.reason}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-900">{item.date}</td>
                        <td className="py-4 px-4">
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreHorizontal className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <div className="flex items-center mb-6">
                <Users className="h-5 w-5 text-gray-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Flagged Users</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">User</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Email</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Reputation</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Activity</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Reports</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {flaggedUsers.map((user, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium text-gray-600">
                                {user.user.charAt(0)}
                              </span>
                            </div>
                            <span className="ml-2 text-sm font-medium text-gray-900">{user.user}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-900">{user.email}</td>
                        <td className="py-4 px-4 text-sm text-gray-900">{user.reputation}</td>
                        <td className="py-4 px-4">
                          <div className="text-sm text-gray-900">
                            <div>{user.activity.questions} questions</div>
                            <div>{user.activity.answers} answers</div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.reports >= 8 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                            {user.reports} reports
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {user.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreHorizontal className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;