// frontend/src/app/dashboard/profiles/[id]/page.tsx

'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import Link from 'next/link';
import { toast } from 'sonner';
import ConversationPanel from '@/components/ConversationPanel';
import WisdomBuilder from '@/components/WisdomBuilder';
import RecordingsList from '@/components/RecordingsList';

interface Profile {
  id: string;
  name: string;
  relationship: string;
  language: string;
  dialect?: string;
  personalityData: any;
  trainingStatus: string;
  voiceModelId?: string;
  recordings: any[];
  messages: any[];
  wisdomEntries: any[];
  recipes: any[];
  rituals: any[];
}

export default function ProfilePage({ params }: { params: { id: string } }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'conversation' | 'wisdom' | 'recordings' | 'settings'>('conversation');

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user, params.id]);

  const loadProfile = async () => {
    try {
      const response = await api.get(`/profiles/${params.id}`);
      setProfile(response.data);
    } catch (error) {
      toast.error('Failed to load profile');
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (isLoading || loading || !profile) {
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
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/dashboard" className="text-gray-500 hover:text-gray-700">
              ← Back to Dashboard
            </Link>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
              <p className="text-gray-500 capitalize">{profile.relationship} • {profile.language}</p>
            </div>
            
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${
              profile.trainingStatus === 'COMPLETED'
                ? 'bg-green-100 text-green-700'
                : profile.trainingStatus === 'PROCESSING'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {profile.trainingStatus === 'COMPLETED' ? '✓ AI Ready' : 
               profile.trainingStatus === 'PROCESSING' ? 'Training AI...' : 'Setup Required'}
            </span>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8 border-t border-gray-100 pt-4">
            {(['conversation', 'wisdom', 'recordings', 'settings'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-2 font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? 'text-violet-600 border-b-2 border-violet-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'conversation' && (
          <ConversationPanel profile={profile} onUpdate={loadProfile} />
        )}
        
        {activeTab === 'wisdom' && (
          <WisdomBuilder profile={profile} onUpdate={loadProfile} />
        )}
        
        {activeTab === 'recordings' && (
          <RecordingsList profile={profile} onUpdate={loadProfile} />
        )}
        
        {activeTab === 'settings' && (
          <ProfileSettings profile={profile} onUpdate={loadProfile} />
        )}
      </main>
    </div>
  );
}

function ProfileSettings({ profile, onUpdate }: { profile: Profile; onUpdate: () => void }) {
  const [personalityData, setPersonalityData] = useState(profile.personalityData || {
    traits: [],
    speakingStyle: '',
    commonPhrases: [],
    values: [],
    humor: '',
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.patch(`/profiles/${profile.id}/personality`, { personalityData });
      toast.success('Profile updated');
      onUpdate();
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">Personality Settings</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Speaking Style</label>
          <textarea
            className="input"
            rows={3}
            placeholder="e.g., warm and conversational, with occasional Telugu proverbs..."
            value={personalityData.speakingStyle}
            onChange={(e) => setPersonalityData({ ...personalityData, speakingStyle: e.target.value })}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Personality Traits (comma-separated)</label>
          <input
            type="text"
            className="input"
            placeholder="e.g., patient, wise, humorous, caring"
            value={personalityData.traits?.join(', ') || ''}
            onChange={(e) => setPersonalityData({ 
              ...personalityData, 
              traits: e.target.value.split(',').map((t: string) => t.trim()).filter(Boolean) 
            })}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Core Values (comma-separated)</label>
          <input
            type="text"
            className="input"
            placeholder="e.g., family, honesty, education, hard work"
            value={personalityData.values?.join(', ') || ''}
            onChange={(e) => setPersonalityData({ 
              ...personalityData, 
              values: e.target.value.split(',').map((t: string) => t.trim()).filter(Boolean) 
            })}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Common Phrases (comma-separated)</label>
          <input
            type="text"
            className="input"
            placeholder='e.g., "Let me tell you something...", "In my experience..."'
            value={personalityData.commonPhrases?.join(', ') || ''}
            onChange={(e) => setPersonalityData({ 
              ...personalityData, 
              commonPhrases: e.target.value.split(',').map((t: string) => t.trim()).filter(Boolean) 
            })}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Sense of Humor</label>
          <input
            type="text"
            className="input"
            placeholder="e.g., dry wit, dad jokes, gentle teasing, storytelling"
            value={personalityData.humor}
            onChange={(e) => setPersonalityData({ ...personalityData, humor: e.target.value })}
          />
        </div>
        
        <button onClick={handleSave} disabled={saving} className="btn-primary">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
