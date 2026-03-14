// frontend/src/app/dashboard/page.tsx

'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import Link from 'next/link';
import { toast } from 'sonner';

interface Profile {
  id: string;
  name: string;
  relationship: string;
  language: string;
  trainingStatus: string;
  _count: {
    recordings: number;
    messages: number;
    wisdomEntries: number;
  };
}

export default function Dashboard() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      loadProfiles();
    }
  }, [user]);

  const loadProfiles = async () => {
    try {
      const response = await api.get('/profiles');
      setProfiles(response.data);
    } catch (error) {
      toast.error('Failed to load profiles');
    } finally {
      setLoading(false);
    }
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-violet-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="text-2xl font-bold text-violet-600">
            Heiryn
          </Link>
          
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, {user.name}</span>
            <button onClick={logout} className="text-gray-500 hover:text-gray-700">
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="text-3xl font-bold text-violet-600">{profiles.length}</div>
            <div className="text-gray-600">Memory Profiles</div>
          </div>
          <div className="card">
            <div className="text-3xl font-bold text-violet-600">
              {profiles.reduce((acc, p) => acc + p._count.recordings, 0)}
            </div>
            <div className="text-gray-600">Total Recordings</div>
          </div>
          <div className="card">
            <div className="text-3xl font-bold text-violet-600">
              {profiles.reduce((acc, p) => acc + p._count.wisdomEntries, 0)}
            </div>
            <div className="text-gray-600">Wisdom Entries</div>
          </div>
        </div>

        {/* Profiles Section */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Your Memory Profiles</h2>
          <Link href="/dashboard/profiles/new" className="btn-primary">
            + Create New Profile
          </Link>
        </div>

        {loading ? (
          <div className="card flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-violet-600 border-t-transparent" />
          </div>
        ) : profiles.length === 0 ? (
          <div className="card text-center py-12">
            <div className="text-6xl mb-4">🌱</div>
            <h3 className="text-xl font-semibold mb-2">Start Your First Profile</h3>
            <p className="text-gray-600 mb-6">
              Create a memory profile for yourself or a loved one to begin preserving their legacy.
            </p>
            <Link href="/dashboard/profiles/new" className="btn-primary">
              Create Profile
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map((profile) => (
              <Link
                key={profile.id}
                href={`/dashboard/profiles/${profile.id}`}
                className="card hover:shadow-md transition-shadow group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold group-hover:text-violet-600 transition-colors">
                      {profile.name}
                    </h3>
                    <p className="text-gray-500 capitalize">{profile.relationship}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    profile.trainingStatus === 'COMPLETED'
                      ? 'bg-green-100 text-green-700'
                      : profile.trainingStatus === 'PROCESSING'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {profile.trainingStatus === 'COMPLETED' ? 'Ready' : 
                     profile.trainingStatus === 'PROCESSING' ? 'Training...' : 'Setup'}
                  </span>
                </div>
                
                <div className="flex gap-4 text-sm text-gray-500">
                  <span>{profile._count.recordings} recordings</span>
                  <span>{profile._count.wisdomEntries} wisdom entries</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
