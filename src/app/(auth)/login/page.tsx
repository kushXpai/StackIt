// src/app/(auth)/login/page.tsx

import LoginForm from '@/components/Auth/LoginForm';

export default function LoginPage() {
  return (
    <main className="flex text-black items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-orange-50">
      <LoginForm />
    </main>
  );
}