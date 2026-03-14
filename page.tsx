// frontend/src/app/page.tsx

'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-violet-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-orange-50">
        <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6">
              What if none of it had to{' '}
              <span className="text-violet-600">disappear?</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              The world's first Living Digital Will — consent-first, dignity-first, 
              built while you're alive. Preserve your voice, wisdom, and love for 
              generations to come.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="btn-primary text-lg">
                Start Your Legacy
              </Link>
              <Link href="/demo" className="btn-secondary text-lg">
                Try the Demo
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">
            Not just messages — <span className="text-violet-600">living presence</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="card hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">
            How Heiryn Works
          </h2>
          
          <div className="grid lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.title} className="text-center">
                <div className="w-16 h-16 bg-violet-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-violet-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Every person deserves to leave more than silence
          </h2>
          <p className="text-xl text-violet-100 mb-8">
            Start preserving your legacy today. Your wisdom, your voice, your love — 
            forever accessible to those who need it most.
          </p>
          <Link href="/register" className="bg-white text-violet-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-violet-50 transition-colors inline-block">
            Begin Your Living Will
          </Link>
        </div>
      </section>
    </main>
  );
}

const features = [
  {
    icon: '🔐',
    title: 'Consent Architecture',
    description: 'You control every unlock, every recipient, every moment. Messages unlock at the right time and the right feeling.',
  },
  {
    icon: '💬',
    title: 'Living Conversations',
    description: 'AI trained on your personality responds to questions your family will have — years from now.',
  },
  {
    icon: '⏳',
    title: 'Temporal Unlocking',
    description: 'Messages unlock at life events: graduation, wedding, first child, or when someone needs guidance most.',
  },
  {
    icon: '📖',
    title: 'Values Will',
    description: 'Build a wisdom map through guided questions. Descendants can query it for guidance rooted in real family values.',
  },
  {
    icon: '🥘',
    title: 'Recipe & Ritual Inheritance',
    description: 'Recipes recorded in hand measurements with the story behind each dish. The memory preserved alongside the instruction.',
  },
  {
    icon: '💙',
    title: 'Emotion-State Unlocking',
    description: 'AI detects grief, heartbreak, or self-doubt and surfaces the exact message recorded for that emotional moment.',
  },
];

const steps = [
  {
    title: 'Create Profile',
    description: 'Start building your memory profile with voice recordings, life wisdom, and values.',
  },
  {
    title: 'Train Your AI',
    description: 'The AI learns your speaking style, humor, warmth, and way of answering hard questions.',
  },
  {
    title: 'Set Unlock Rules',
    description: 'Configure when each message unlocks — by age, life event, time, or emotional state.',
  },
  {
    title: 'Live Forever',
    description: 'Your family can have real conversations with your AI presence, whenever they need you.',
  },
];
