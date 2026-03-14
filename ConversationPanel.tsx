// frontend/src/components/ConversationPanel.tsx

'use client';

import { useState, useRef, useEffect } from 'react';
import { api } from '@/lib/api';
import { toast } from 'sonner';

interface Message {
  role: 'USER' | 'AI';
  content: string;
  audioUrl?: string;
  detectedEmotion?: string;
}

interface Profile {
  id: string;
  name: string;
  relationship: string;
  trainingStatus: string;
}

export default function ConversationPanel({ 
  profile, 
  onUpdate 
}: { 
  profile: Profile; 
  onUpdate: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadHistory();
  }, [profile.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadHistory = async () => {
    try {
      const response = await api.get(`/conversations/${profile.id}/history`);
      setMessages(response.data);
    } catch (error) {
      // No history yet, that's fine
    } finally {
      setLoadingHistory(false);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || sending) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'USER', content: userMessage }]);
    setSending(true);

    try {
      const response = await api.post('/conversations/message', {
        content: userMessage,
        profileId: profile.id,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: 'AI',
          content: response.data.response,
          audioUrl: response.data.audioUrl,
          detectedEmotion: response.data.detectedEmotion,
        },
      ]);

      if (response.data.unlockedMessages?.length > 0) {
        toast.success(`A special message has been unlocked for you`, {
          description: 'Check the recordings tab to view it.',
        });
      }
    } catch (error) {
      toast.error('Failed to send message');
      setMessages((prev) => prev.slice(0, -1));
      setInput(userMessage);
    } finally {
      setSending(false);
    }
  };

  if (profile.trainingStatus !== 'COMPLETED') {
    return (
      <div className="card text-center py-12">
        <div className="text-6xl mb-4">🎓</div>
        <h3 className="text-xl font-semibold mb-2">AI Training Required</h3>
        <p className="text-gray-600 mb-6">
          Add wisdom entries and recordings to train the AI personality.
          The more context you provide, the more authentic conversations will be.
        </p>
        <div className="text-sm text-gray-500">
          Minimum requirements: 5 wisdom entries or 3 recordings with transcripts
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-300px)]">
      {/* Conversation Header */}
      <div className="mb-4 text-center">
        <p className="text-gray-500">
          Talk to {profile.name} • AI will respond as they would
        </p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-white rounded-xl">
        {loadingHistory ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-violet-600 border-t-transparent" />
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="mb-4">Start a conversation with {profile.name}</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestionPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => setInput(prompt)}
                  className="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'USER' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === 'USER'
                    ? 'bg-violet-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                
                {message.audioUrl && (
                  <audio controls className="mt-2 w-full" src={message.audioUrl}>
                    Your browser does not support audio.
                  </audio>
                )}
                
                {message.detectedEmotion && message.role === 'USER' && (
                  <div className="mt-2 text-xs opacity-75">
                    Detected: {message.detectedEmotion.toLowerCase()}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        
        {sending && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={sendMessage} className="flex gap-3">
        <input
          type="text"
          className="input flex-1"
          placeholder={`Ask ${profile.name} anything...`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={sending}
        />
        <button
          type="submit"
          disabled={!input.trim() || sending}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </form>
    </div>
  );
}

const suggestionPrompts = [
  "I'm scared about my future",
  "Tell me about when you were young",
  "What advice would you give me?",
  "I miss you",
  "Help me make a decision",
];
