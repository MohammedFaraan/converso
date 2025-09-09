'use client';

import React, { useState } from 'react';

type Msg = { role: 'user' | 'assistant'; content: string };

export default function ConversoSupportChat() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const allowedTopics = [
    'Account & Sign-in (Clerk)',
    'Companion Builder (create/edit companions)',
    'Starting / Stopping Companion Sessions',
    'Bookmarks & Review',
    'Topic filtering & navigation',
    'Deployment (Vercel) & Environment Variables',
  ];

  async function sendMessage() {
    if (!input.trim()) return;
    const userMsg: Msg = { role: 'user', content: input.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.content }),
      });

      const data = await res.json();

      if (!res.ok) {
        const err = data?.error ?? 'Unknown error';
        setMessages((m) => [...m, { role: 'assistant', content: `Error: ${err}` }]);
      } else {
        const assistantReply = data.reply ?? 'No reply from Converso.';
        setMessages((m) => [...m, { role: 'assistant', content: assistantReply }]);
      }
    } catch (err: any) {
      setMessages((m) => [...m, { role: 'assistant', content: `Network error: ${err?.message ?? err}` }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-6 space-y-6">
      <div className="rounded-lg p-6 border">
        <h2 className="text-2xl font-semibold">👋 Converso Support</h2>
        <p className="mt-2 text-sm text-gray-700">
          I can help you with everything about the Converso app — features, account, deployment, and
          troubleshooting. I do not answer subject/learning questions. Those belong to your active companions.
        </p>

        <div className="mt-4 p-3 bg-gray-50 rounded">
          <h3 className="font-medium">You can ask me about</h3>
          <ul className="list-disc ml-5 text-sm mt-2">
            {allowedTopics.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-lg border h-[420px] p-4 overflow-auto space-y-3">
        {messages.length === 0 ? (
          <div className="text-sm text-gray-500">Start by asking a question about the Converso app.</div>
        ) : (
          messages.map((m, i) => (
            <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
              <div
                className={
                  'inline-block rounded-xl px-4 py-2 ' + (m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900')
                }
              >
                {m.content}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 px-4 py-3 rounded-lg border outline-none"
          placeholder="Ask about Converso features, account, or troubleshooting..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading} className="px-4 py-3 rounded-lg bg-black text-white">
          {loading ? 'Working…' : 'Send'}
        </button>
      </div>
    </div>
  );
}