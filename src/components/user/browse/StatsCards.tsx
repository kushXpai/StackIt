// src/components/user/browse/StatsCards.tsx

import React from 'react';

interface StatsCardsProps {
  totalQuestions: number;
  unansweredQuestions: number;
  answeredQuestions: number;
  acceptedQuestions: number;
}

export const StatsCards: React.FC<StatsCardsProps> = ({
  totalQuestions,
  unansweredQuestions,
  answeredQuestions,
  acceptedQuestions,
}) => {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
        <div className="text-3xl font-bold text-gray-900 mb-2">{totalQuestions}</div>
        <div className="text-sm text-gray-600">Total</div>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
        <div className="text-3xl font-bold text-orange-600 mb-2">{unansweredQuestions}</div>
        <div className="text-sm text-gray-600">Unanswered</div>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
        <div className="text-3xl font-bold text-blue-600 mb-2">{answeredQuestions}</div>
        <div className="text-sm text-gray-600">Answered</div>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
        <div className="text-3xl font-bold text-green-600 mb-2">{acceptedQuestions}</div>
        <div className="text-sm text-gray-600">Accepted</div>
      </div>
    </div>
  );
};