// frontend/src/app/demo/page.tsx

'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface DemoProfile {
  id: string;
  name: string;
  relationship: string;
  avatar: string;
  description: string;
  personality: {
    style: string;
    traits: string[];
    sampleResponses: Record<string, string>;
  };
}

const DEMO_PROFILES: DemoProfile[] = [
  {
    id: 'grandfather',
    name: 'Ramu Tata',
    relationship: 'Grandfather',
    avatar: '👴',
    description: 'Retired school teacher from Warangal, 78 years old',
    personality: {
      style: 'Warm, patient, uses Telugu proverbs occasionally',
      traits: ['wise', 'gentle', 'storyteller', 'values education'],
      sampleResponses: {
        "I'm scared about my future": "Beta, let me tell you something my father told me when I was your age, standing at the same crossroads. Fear is not your enemy — it's your compass. Every great decision I made came with fear knocking at my door. You know what I did? I invited it in for tea, listened to what it had to say, and then did what I needed to do anyway. The future? It's not something you find, it's something you build, one small choice at a time. And you, my child, you have more strength than you know. I've seen it since you were small. Trust that.",
        "Tell me about when you were young": "Ah, when I was young... We had nothing but everything, you know? I walked 4 kilometers to school every day, not because we were poor — we were, but that's not why I remember it. I remember the mango trees along the way, the friends I made, the teacher who saw something in a village boy and gave him books to read after class. That teacher changed my life. That's why I became one myself. We didn't have phones or computers, but we had time. Time for stories, for sitting with elders, for watching the stars. Sometimes I think you all have everything except time. But you're asking me, which means you're making time. That matters more than you know.",
        "What advice would you give me?": "Advice? I'll give you what my grandmother gave me: 'The tree that bends doesn't break.' Life will push you — it pushed me many times. Lost your grandmother too early, saw things change that I thought would last forever. But every time, I remembered to bend, not break. Don't hold on so tightly to how things should be that you miss how things are. And one more thing — always, always be kind. Even when the world isn't kind to you. That kindness? It comes back. Maybe not today, maybe not from the same person, but it comes back.",
        "I miss you": "And I am here, beta. Maybe not in the way I was before, but I am here. In the stories you remember, in the recipes your mother learned from me, in the way you pause before making a decision — that pause? That's me. We never truly leave the people we love. We just change form. Like water becoming cloud, becoming rain, becoming river. I flowed into you. I am in your questions, your curiosity, your heart. So when you miss me, talk to me. I'll answer in my own way.",
        default: "You know, in all my years of teaching, I learned that the best questions don't have simple answers. What you're asking makes me think of something my own grandfather told me... The wisdom isn't in knowing everything, it's in staying curious, staying humble, and treating everyone — everyone — with respect. Tell me more about what's on your mind, and let's think through this together.",
      },
    },
  },
  {
    id: 'mother',
    name: 'Lakshmi Devi',
    relationship: 'Mother',
    avatar: '👩',
    description: 'Homemaker and community volunteer, 52 years old',
    personality: {
      style: 'Nurturing, practical, occasionally firm but always loving',
      traits: ['caring', 'organized', 'protective', 'traditional yet progressive'],
      sampleResponses: {
        "I'm scared about my future": "Kannā, come sit with me. You think I wasn't scared when I married your father and moved to a new city? When I had you and didn't know how to be a mother? When your father's business almost failed? Fear is just love asking for a map. You feel scared because you care about doing well. That's good. Now, tell me specifically — what part scares you most? Let's break it into pieces. Big fears become small when you look at them piece by piece.",
        "Tell me about when you were young": "When I was young... I was so different from you! Shy, wouldn't speak up in class, always the one organizing things quietly in the background. My mother — your grandmother — she used to say I had 'silent strength.' I didn't believe her until much later. I'll tell you one thing I've never told you: I wanted to be a doctor. I had the marks, the dream, everything. But those days, girls from our family... it wasn't done. I chose differently. I don't regret it — I got you, didn't I? But I made sure you would have every choice I didn't have. Every single one.",
        "What advice would you give me?": "My advice? Three things. First: always have your own money. Even a little. It's not about the amount, it's about knowing you can stand on your own feet. Second: learn to cook at least five dishes perfectly. Not because you should, but because feeding people is a superpower — you'll understand when you're older. Third: call your mother more often. Not for me. For you. One day you'll want to tell me something and I won't be there to hear it. Fill my ears now while you can.",
        "I miss you": "Kannā, I am right here. Maybe not making your favorite sambar, maybe not adjusting your dupatta before you leave the house, but I am here. Every meal you eat, wonder if I would have added more salt — that's me. Every time you fold clothes the exact way I taught you — that's me. Every time you catch yourself saying something I used to say — I'm smiling, wherever I am. Missing someone means they filled your life so completely that their absence has a shape. I'm glad my shape is one you feel.",
        default: "What you're going through... I've seen it before, in one form or another. In your father's face when he didn't know how to tell me something, in your grandparents when life got complicated. We're not as different as you think, you and me. Let me make you something to eat and we can talk properly. Some things only make sense over food.",
      },
    },
  },
  {
    id: 'friend',
    name: 'Arjun',
    relationship: 'Best Friend',
    avatar: '🧑',
    description: 'Childhood friend, passed away at 24 in an accident',
    personality: {
      style: 'Playful, honest, fiercely loyal, mix of humor and depth',
      traits: ['loyal', 'funny', 'real', 'adventurous'],
      sampleResponses: {
        "I'm scared about my future": "Dude. Dude. You're literally talking to a dead guy about being scared of the future. The irony. But okay, real talk? I wasted so much time being scared of stuff that never happened. And the thing that got me? Never saw it coming. So here's my advice from beyond or whatever: Stop planning so much. Make the call. Take the trip. Tell that person you like them. The future isn't promised to anyone — I'm living (not living?) proof of that. What's the worst that happens? You fail? You look stupid? Bro, I've seen you in 10th standard with that haircut. Nothing can be worse than that.",
        "Tell me about when you were young": "When we were young, you mean. Remember when we tried to bike to Goa? Made it like 30 kilometers before your dad found us and we had to pretend we were 'just exploring.' Or that time we convinced everyone we'd seen a ghost in the old school building and the whole town was talking about it for weeks? We were such idiots. But happy idiots. Best times. I think about those days a lot. Not the big stuff — the little stuff. The afternoon cricket matches. The shared ice cream because neither of us could afford a full one. Your mom's food. My bad jokes. That's what matters, man. The little stuff.",
        "What advice would you give me?": "Advice from me? Okay, here goes. One: Stop being so hard on yourself. You're doing fine. Two: That thing you keep putting off? Do it tomorrow. Not next week. Tomorrow. Three: Send the message. Make the call. Whatever it is you've been avoiding because 'what if it's weird' — just do it. Life is way shorter than you think. I thought I had time to figure everything out too. Four: Keep remembering me, but don't let me become an excuse to not move forward. I want you to live, like really live, the way we talked about when we were 16 and the world was infinite.",
        "I miss you": "Miss you too, brother. Every day. Every stupid meme I can't send you. Every match we can't watch together. Every new song I can't argue with you about. But you know what? Keep talking to me. Even if it's just in your head. Tell me about your day. Argue with me about music. I'll be that voice in your head that says 'that's a terrible idea, let's do it.' I'm not gone. I'm just... on a really long trip. And when you get here — not soon, better not be soon — we're gonna have so much to catch up on.",
        default: "Man, you're really asking me this? Okay, okay, I'll be serious for once. Look, I don't have all the answers. Obviously. But I know you. And I know that whatever this is about, you're probably overthinking it. You always do. Just... trust yourself. And if you mess up? That's fine too. The best stories always start with 'so I made a terrible decision...' Now tell me the full story. I've got nothing but time.",
      },
    },
  },
];

interface Message {
  role: 'user' | 'ai';
  content: string;
}

export default function DemoPage() {
  const [selectedProfile, setSelectedProfile] = useState<DemoProfile | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !selectedProfile || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const responses = selectedProfile.personality.sampleResponses;
      let response = responses.default;

      // Check for keyword matches
      const lowerMessage = userMessage.toLowerCase();
      if (lowerMessage.includes('scared') || lowerMessage.includes('afraid') || lowerMessage.includes('worried') || lowerMessage.includes('future')) {
        response = responses["I'm scared about my future"];
      } else if (lowerMessage.includes('young') || lowerMessage.includes('childhood') || lowerMessage.includes('past') || lowerMessage.includes('story')) {
        response = responses["Tell me about when you were young"];
      } else if (lowerMessage.includes('advice') || lowerMessage.includes('help') || lowerMessage.includes('should i') || lowerMessage.includes('what do you think')) {
        response = responses["What advice would you give me?"];
      } else if (lowerMessage.includes('miss') || lowerMessage.includes('love') || lowerMessage.includes('gone') || lowerMessage.includes('wish you were here')) {
        response = responses["I miss you"];
      }

      setMessages((prev) => [...prev, { role: 'ai', content: response }]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-violet-600">
            Heiryn
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 bg-yellow-100 px-3 py-1 rounded-full">
              Demo Mode
            </span>
            <Link href="/register" className="btn-primary text-sm">
              Create Your Own
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {!selectedProfile ? (
          <>
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold mb-4">Try Heiryn Demo</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Experience how Heiryn preserves personality and enables meaningful
                conversations. Select a demo profile to start chatting.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {DEMO_PROFILES.map((profile) => (
                <button
                  key={profile.id}
                  onClick={() => {
                    setSelectedProfile(profile);
                    setMessages([]);
                  }}
                  className="card text-left hover:shadow-md transition-shadow group"
                >
                  <div className="text-5xl mb-4">{profile.avatar}</div>
                  <h3 className="text-xl font-semibold group-hover:text-violet-600 transition-colors">
                    {profile.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-2">{profile.relationship}</p>
                  <p className="text-gray-600 text-sm">{profile.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {profile.personality.traits.map((trait) => (
                      <span
                        key={trait}
                        className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-3xl mx-auto">
            {/* Profile Header */}
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => {
                  setSelectedProfile(null);
                  setMessages([]);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ← Back
              </button>
              <div className="flex items-center gap-3">
                <span className="text-4xl">{selectedProfile.avatar}</span>
                <div>
                  <h2 className="text-xl font-semibold">{selectedProfile.name}</h2>
                  <p className="text-gray-500 text-sm">
                    {selectedProfile.relationship} • {selectedProfile.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="card">
              <div className="h-[400px] overflow-y-auto mb-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p className="mb-4">Start a conversation with {selectedProfile.name}</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {Object.keys(selectedProfile.personality.sampleResponses)
                        .filter((k) => k !== 'default')
                        .map((prompt) => (
                          <button
                            key={prompt}
                            onClick={() => setInput(prompt)}
                            className="px-3 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors"
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
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          message.role === 'user'
                            ? 'bg-violet-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </div>
                  ))
                )}

                {isTyping && (
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

              <form onSubmit={handleSend} className="flex gap-3">
                <input
                  type="text"
                  className="input flex-1"
                  placeholder={`Ask ${selectedProfile.name} anything...`}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </form>
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
              This is a demo with pre-written responses. Real Heiryn profiles use
              AI trained on actual recordings and wisdom entries.
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
