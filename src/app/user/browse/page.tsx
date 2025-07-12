// src/app/user/browse/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { Plus, User } from 'lucide-react';
import { Sidebar } from '@/components/user/browse/Sidebar';
import { StatsCards } from '@/components/user/browse/StatsCards';
import { FilterControls } from '@/components/user/browse/FilterControls';
import UserNavbar from '@/components/usernavbar';
import QuestionCard from '@/components/user/browse/QuestionCard';

const mockQuestions = [
    {
        id: '1',
        title: 'How to implement authentication in Next.js 14 with TypeScript?',
        description: "I'm building a Next.js application with TypeScript and need to implement user authentication. What's the best approach in 2024? I've heard about NextAuth.js, but I'm also considering building a custom solution with JWT tokens.",
        tags: ['nextjs', 'typescript', 'authentication', 'react'],
        voteCount: 25,
        answerCount: 7,
        views: 1200,
        timeAgo: '2 hours ago',
        author: {
            name: 'Sarah Chen',
            reputation: 1580,
        },
        isSolved: true,
        isBookmarked: false,
    },
    {
        id: '2',
        title: 'Best practices for state management in large React applications',
        description: 'As our React app grows, state management becomes more complex. Should we use Redux, Zustand, or stick with Context API? Our app has around 50+ components and multiple user roles.',
        tags: ['react', 'state-management', 'redux', 'architecture'],
        voteCount: 29,
        answerCount: 12,
        views: 2400,
        timeAgo: '4 hours ago',
        author: {
            name: 'Alex Rodriguez',
            reputation: 2340,
        },
        isSolved: false,
        isBookmarked: true,
    },
    {
        id: '3',
        title: 'Optimizing database queries in PostgreSQL for better performance',
        description: 'Our application is experiencing slow query performance. What are some proven techniques to optimize PostgreSQL queries? We\'re dealing with tables that have millions of rows.',
        tags: ['postgresql', 'database', 'performance', 'sql'],
        voteCount: 18,
        answerCount: 5,
        views: 800,
        timeAgo: '6 hours ago',
        author: {
            name: 'Michael Kim',
            reputation: 890,
        },
        isSolved: true,
        isBookmarked: false,
    },
    {
        id: '4',
        title: 'Docker container networking issue with Next.js and PostgreSQL',
        description: "I'm having trouble connecting my Next.js app to PostgreSQL when both are running in Docker containers. The connection keeps timing out.",
        tags: ['docker', 'nextjs', 'postgresql', 'networking'],
        voteCount: 12,
        answerCount: 3,
        views: 450,
        timeAgo: '8 hours ago',
        author: {
            name: 'Emily Johnson',
            reputation: 650,
        },
        isSolved: false,
        isBookmarked: false,
    },
];

const mockPopularTags = [
    { name: 'javascript', count: 1250 },
    { name: 'react', count: 980 },
    { name: 'typescript', count: 750 },
    { name: 'nextjs', count: 520 },
    { name: 'nodejs', count: 680 },
    { name: 'python', count: 890 },
    { name: 'postgresql', count: 320 },
    { name: 'docker', count: 280 },
    { name: 'aws', count: 450 },
    { name: 'graphql', count: 180 },
    { name: 'mongodb', count: 220 },
    { name: 'authentication', count: 340 },
    { name: 'api', count: 560 },
    { name: 'performance', count: 290 },
    { name: 'testing', count: 380 },
];

const mockCommunityStats = {
    questions: '12.5K',
    answers: '28.3K',
    users: '5.2K',
    tags: '850',
};

export default function BrowsePage() {
    const [questions, setQuestions] = useState(mockQuestions);
    const [filteredQuestions, setFilteredQuestions] = useState(mockQuestions);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = (query: string) => {
        const filtered = questions.filter(
            (q) =>
                q.title.toLowerCase().includes(query.toLowerCase()) ||
                q.description.toLowerCase().includes(query.toLowerCase()) ||
                q.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
        );
        setFilteredQuestions(filtered);
    };

    const handleSortChange = (sort: string) => {
        const sorted = [...filteredQuestions].sort((a, b) => {
            switch (sort) {
                case 'Newest':
                    return new Date(b.timeAgo).getTime() - new Date(a.timeAgo).getTime();
                case 'Oldest':
                    return new Date(a.timeAgo).getTime() - new Date(b.timeAgo).getTime();
                case 'Most Voted':
                    return b.voteCount - a.voteCount;
                case 'Most Answered':
                    return b.answerCount - a.answerCount;
                case 'Most Viewed':
                    return b.views - a.views;
                default:
                    return 0;
            }
        });
        setFilteredQuestions(sorted);
    };

    const handleFilterChange = (filter: string) => {
        let filtered = questions;

        switch (filter) {
            case 'Unanswered':
                filtered = questions.filter((q) => q.answerCount === 0);
                break;
            case 'Answered':
                filtered = questions.filter((q) => q.answerCount > 0);
                break;
            case 'Accepted':
                filtered = questions.filter((q) => q.isSolved);
                break;
            case 'My Questions':
                // This would filter by current user's questions
                filtered = questions;
                break;
            default:
                filtered = questions;
        }

        setFilteredQuestions(filtered);
    };

    // Calculate stats
    const totalQuestions = questions.length;
    const unansweredQuestions = questions.filter((q) => q.answerCount === 0).length;
    const answeredQuestions = questions.filter((q) => q.answerCount > 0).length;
    const acceptedQuestions = questions.filter((q) => q.isSolved).length;

    return (
        <div className="min-h-screen text-black bg-gray-50">
            <UserNavbar />
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">All Questions</h1>
                        <p className="text-gray-600 mt-1">{totalQuestions} questions</p>
                    </div>
                </div>

                <div className="flex gap-8">
                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Stats Cards */}
                        <StatsCards
                            totalQuestions={totalQuestions}
                            unansweredQuestions={unansweredQuestions}
                            answeredQuestions={answeredQuestions}
                            acceptedQuestions={acceptedQuestions}
                        />

                        {/* Filter Controls */}
                        <FilterControls
                            onSearch={handleSearch}
                            onSortChange={handleSortChange}
                            onFilterChange={handleFilterChange}
                        />

                        {/* Questions List */}
                        <div className="space-y-4">
                            {isLoading ? (
                                <div className="text-center py-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                                    <p className="text-gray-600 mt-2">Loading questions...</p>
                                </div>
                            ) : filteredQuestions.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-600">No questions found matching your criteria.</p>
                                </div>
                            ) : (
                                filteredQuestions.map((question) => (
                                    <QuestionCard key={question.id} {...question} />
                                ))
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <Sidebar
                        popularTags={mockPopularTags}
                        communityStats={mockCommunityStats}
                    />
                </div>
            </div>
        </div>
    );
}