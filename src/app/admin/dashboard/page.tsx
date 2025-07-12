// src/app/admin/dashboard/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  is_admin: boolean;
  created_at: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for user session in localStorage
    const userSession = localStorage.getItem('userSession');
    
    if (!userSession) {
      router.push('/login');
      return;
    }

    try {
      const userData = JSON.parse(userSession);
      
      // Check if user is admin
      if (!userData.is_admin) {
        router.push('/login'); // or redirect to user dashboard
        return;
      }

      setUser(userData);
      setLoading(false);
    } catch (error) {
      console.error('Error parsing user session:', error);
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('userSession');
    router.push('/login');
  };

  if (loading) return <p className="p-8">Verifying admin...</p>;

  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Hello {user?.name || user?.username}! You have full access.</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>
      
      {/* Add your admin dashboard content here */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Users</h3>
          <p className="text-gray-600">Manage users and permissions</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Settings</h3>
          <p className="text-gray-600">Configure system settings</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Reports</h3>
          <p className="text-gray-600">View system reports</p>
        </div>
      </div>
    </main>
  );
}