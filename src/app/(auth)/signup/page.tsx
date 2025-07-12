// src/app/(auth)/signup/page.tsx

import SignupForm from '@/components/Auth/SignupForm';

export default function SignupPage() {
  return (
    <div className="min-h-screen text-black flex items-center justify-center bg-gradient-to-br from-purple-50 to-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <SignupForm />
    </div>
  );
}