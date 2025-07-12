// src/app/user/ask/page.tsx

import AskQuestionForm from '@/components/user/ask/AskQuestionForm';
import UserNavbar from '@/components/usernavbar';

export default function AskQuestionPage() {
  return (
    <div className="min-h-screen text-black bg-gray-50">
        <UserNavbar />
      <AskQuestionForm />
    </div>
  );
}