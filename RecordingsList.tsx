// frontend/src/components/RecordingsList.tsx

'use client';

import { useState } from 'react';
import { toast } from 'sonner';

interface Recording {
  id: string;
  type: string;
  title: string;
  description?: string;
  audioUrl?: string;
  videoUrl?: string;
  transcript?: string;
  isLocked: boolean;
  createdAt: string;
}

interface Profile {
  id: string;
  name: string;
  recordings: Recording[];
  messages: any[];
}

export default function RecordingsList({ 
  profile, 
  onUpdate 
}: { 
  profile: Profile; 
  onUpdate: () => void;
}) {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Recordings & Messages</h2>
        <button onClick={() => setShowAddModal(true)} className="btn-primary">
          + Add Recording
        </button>
      </div>

      {/* Recordings Grid */}
      {profile.recordings.length === 0 && profile.messages.length === 0 ? (
        <div className="card text-center py-12">
          <div className="text-6xl mb-4">🎙️</div>
          <h3 className="text-xl font-semibold mb-2">No Recordings Yet</h3>
          <p className="text-gray-600 mb-6">
            Record voice messages, wisdom, apologies, or special messages
            that will unlock at the right moment.
          </p>
          <button onClick={() => setShowAddModal(true)} className="btn-primary">
            Create First Recording
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profile.recordings.map((recording) => (
            <div key={recording.id} className="card">
              <div className="flex items-start justify-between mb-3">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  recording.type === 'APOLOGY' 
                    ? 'bg-red-100 text-red-700'
                    : recording.type === 'WISDOM'
                    ? 'bg-violet-100 text-violet-700'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {recording.type.replace('_', ' ')}
                </span>
                {recording.isLocked && (
                  <span className="text-gray-400">🔒</span>
                )}
              </div>
              
              <h4 className="font-semibold mb-2">{recording.title}</h4>
              {recording.description && (
                <p className="text-sm text-gray-600 mb-3">{recording.description}</p>
              )}
              
              {recording.audioUrl && !recording.isLocked && (
                <audio controls className="w-full" src={recording.audioUrl}>
                  Your browser does not support audio.
                </audio>
              )}
              
              <div className="mt-3 text-xs text-gray-400">
                {new Date(recording.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
          
          {profile.messages.map((message: any) => (
            <div key={message.id} className="card border-l-4 border-l-orange-400">
              <div className="flex items-start justify-between mb-3">
                <span className="px-2 py-1 rounded text-xs font-medium bg-orange-100 text-orange-700">
                  {message.isApologyVault ? 'APOLOGY VAULT' : 'MESSAGE'}
                </span>
                <span className="text-gray-400">🔒</span>
              </div>
              
              <h4 className="font-semibold mb-2">{message.title}</h4>
              {message.recipientName && (
                <p className="text-sm text-gray-500">For: {message.recipientName}</p>
              )}
              
              <div className="mt-3 text-xs text-gray-400">
                Unlocks based on conditions
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Recording Modal */}
      {showAddModal && (
        <AddRecordingModal
          profileId={profile.id}
          onClose={() => setShowAddModal(false)}
          onSave={() => {
            setShowAddModal(false);
            onUpdate();
          }}
        />
      )}
    </div>
  );
}

function AddRecordingModal({
  profileId,
  onClose,
  onSave,
}: {
  profileId: string;
  onClose: () => void;
  onSave: () => void;
}) {
  const [type, setType] = useState('VOICE_MESSAGE');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6">
        <h3 className="text-xl font-bold mb-4">Add Recording</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Type</label>
            <select
              className="input"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="VOICE_MESSAGE">Voice Message</option>
              <option value="WISDOM">Wisdom</option>
              <option value="STORY">Story</option>
              <option value="APOLOGY">Apology (Vault)</option>
              <option value="RITUAL">Ritual Instructions</option>
              <option value="RECIPE">Recipe</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              className="input"
              placeholder="e.g., For your wedding day"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <input
              type="text"
              className="input"
              placeholder="Brief description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Content / Transcript</label>
            <textarea
              className="input min-h-[150px]"
              placeholder="Write the message content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          
          {type === 'APOLOGY' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
              ⚠️ Apology Vault messages will only be released after death confirmation.
            </div>
          )}
        </div>
        
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="btn-secondary flex-1">
            Cancel
          </button>
          <button
            onClick={() => {
              toast.success('Recording saved (demo mode)');
              onSave();
            }}
            className="btn-primary flex-1"
          >
            Save Recording
          </button>
        </div>
      </div>
    </div>
  );
}
