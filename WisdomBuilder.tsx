// frontend/src/components/WisdomBuilder.tsx

'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import { toast } from 'sonner';

interface WisdomEntry {
  id: string;
  category: string;
  question: string;
  answer: string;
  tags: string[];
}

interface Profile {
  id: string;
  name: string;
  wisdomEntries: WisdomEntry[];
}

const WISDOM_QUESTIONS = {
  LIFE_ADVICE: [
    "What is the most important lesson life has taught you?",
    "What do you wish you had known at 20?",
    "What makes a good life?",
  ],
  CAREER: [
    "What career advice would you give?",
    "How do you handle failure at work?",
    "What does success mean to you?",
  ],
  RELATIONSHIPS: [
    "What makes a relationship last?",
    "How do you forgive someone who hurt you?",
    "What does love mean to you?",
  ],
  FAMILY_VALUES: [
    "What values are most important to our family?",
    "What traditions should we never forget?",
    "What does family mean to you?",
  ],
  SPIRITUALITY: [
    "What brings you peace?",
    "What do you believe happens after death?",
    "How do you find meaning in difficult times?",
  ],
};

export default function WisdomBuilder({ 
  profile, 
  onUpdate 
}: { 
  profile: Profile; 
  onUpdate: () => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>('LIFE_ADVICE');
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [customQuestion, setCustomQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    const question = customQuestion || selectedQuestion;
    if (!question || !answer) {
      toast.error('Please fill in both question and answer');
      return;
    }

    setSaving(true);
    try {
      await api.post('/wisdom', {
        profileId: profile.id,
        category: selectedCategory,
        question,
        answer,
        tags: [],
      });
      
      toast.success('Wisdom entry saved');
      setSelectedQuestion('');
      setCustomQuestion('');
      setAnswer('');
      onUpdate();
    } catch (error) {
      toast.error('Failed to save wisdom entry');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Add New Wisdom */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Add Wisdom</h2>
        
        <div className="space-y-4">
          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              className="input"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedQuestion('');
              }}
            >
              {Object.keys(WISDOM_QUESTIONS).map((cat) => (
                <option key={cat} value={cat}>
                  {cat.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>

          {/* Suggested Questions */}
          <div>
            <label className="block text-sm font-medium mb-2">Suggested Questions</label>
            <div className="space-y-2">
              {WISDOM_QUESTIONS[selectedCategory as keyof typeof WISDOM_QUESTIONS]?.map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    setSelectedQuestion(q);
                    setCustomQuestion('');
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                    selectedQuestion === q
                      ? 'border-violet-600 bg-violet-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Question */}
          <div>
            <label className="block text-sm font-medium mb-2">Or write your own question</label>
            <input
              type="text"
              className="input"
              placeholder="What would you like to be asked?"
              value={customQuestion}
              onChange={(e) => {
                setCustomQuestion(e.target.value);
                setSelectedQuestion('');
              }}
            />
          </div>

          {/* Answer */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Answer as {profile.name}
            </label>
            <textarea
              className="input min-h-[200px]"
              placeholder={`Write ${profile.name}'s response in their voice...`}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>

          <button
            onClick={handleSave}
            disabled={saving || (!selectedQuestion && !customQuestion) || !answer}
            className="btn-primary w-full disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Wisdom Entry'}
          </button>
        </div>
      </div>

      {/* Existing Wisdom */}
      <div>
        <h2 className="text-2xl font-bold mb-6">
          Recorded Wisdom ({profile.wisdomEntries.length})
        </h2>
        
        {profile.wisdomEntries.length === 0 ? (
          <div className="card text-center py-8 text-gray-500">
            <p>No wisdom entries yet.</p>
            <p className="text-sm mt-2">
              Add wisdom to train the AI personality.
            </p>
          </div>
        ) : (
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {profile.wisdomEntries.map((entry) => (
              <div key={entry.id} className="card">
                <div className="text-xs text-violet-600 font-medium mb-2">
                  {entry.category.replace('_', ' ')}
                </div>
                <h4 className="font-medium mb-2">{entry.question}</h4>
                <p className="text-gray-600 text-sm">{entry.answer}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
