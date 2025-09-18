'use client';

import { useState } from 'react';
import { Message, MessageContent } from '@/components/ai-elements/message';
import { Response } from '@/components/ai-elements/response';
import {
  PromptInput,
  PromptInputBody,
  PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from '@/components/ai-elements/prompt-input';
import { Button } from '@/components/ui/button';
import { useAction } from 'convex/react';
import { api } from '@/convex/_generated/api';

type ChatMessage = { role: 'user' | 'assistant'; text: string };

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <main className="w-full max-w-2xl flex flex-col gap-4">
        <header className="flex items-baseline justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Not Fin Advice
            </h1>
            <p className="text-sm text-muted-foreground">
              Ask questions — not financial advice.
            </p>
          </div>
        </header>
        <HelloWorldChat />
      </main>
    </div>
  );
}

// (removed header Clear button)

const HelloWorldChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [pending, setPending] = useState(false);
  const agentAction = useAction(api.agents.helloWorld.helloWorld);

  const handleSubmit = async (message: PromptInputMessage) => {
    const text = (message.text ?? '').trim();
    if (!text) return;

    setMessages((prev) => [...prev, { role: 'user', text }]);
    setPending(true);
    try {
      const reply = await agentAction({ prompt: text });
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: String(reply ?? '') },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: 'Sorry, something went wrong.' },
      ]);
      // eslint-disable-next-line no-console
      console.error(err);
    } finally {
      setPending(false);
    }
  };

  const clearAll = () => setMessages([]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button variant="ghost" size="sm" onClick={clearAll} disabled={pending}>
          Clear conversation
        </Button>
      </div>
      <div className="space-y-3 rounded-lg border p-4">
        {messages.map((m, i) => (
          <Message key={i} from={m.role}>
            <MessageContent>
              <Response>{m.text}</Response>
            </MessageContent>
          </Message>
        ))}
        {pending && (
          <Message from="assistant">
            <MessageContent>
              <Response>Thinking…</Response>
            </MessageContent>
          </Message>
        )}
      </div>
      <PromptInput onSubmit={handleSubmit}>
        <PromptInputBody>
          <PromptInputTextarea placeholder="Type your question…" />
        </PromptInputBody>
        <PromptInputToolbar>
          <PromptInputTools>
            <PromptInputSubmit disabled={pending} />
          </PromptInputTools>
        </PromptInputToolbar>
      </PromptInput>
    </div>
  );
};
