import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import type { Message } from '../types';

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [selectedModel, setSelectedModel] = useState('gpt-3.5-turbo');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      chat_id: '1',
      content: input,
      role: 'user',
      created_at: new Date().toISOString(),
    };

    setMessages([...messages, userMessage]);
    setInput('');

    // TODO: Implement API call to selected AI model
    // For MVP, we'll just echo the message
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      chat_id: '1',
      content: `Echo: ${input}`,
      role: 'assistant',
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-4 ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex space-x-4">
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="rounded-md border-gray-300"
          >
            <option value="gpt-3.5-turbo">GPT-3.5</option>
            <option value="gpt-4">GPT-4</option>
            <option value="claude-2">Claude 2</option>
          </select>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-md border-gray-300"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}