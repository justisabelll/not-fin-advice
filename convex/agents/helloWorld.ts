import { components } from '../_generated/api';
import { Agent, createThread, Config } from '@convex-dev/agent';
import { action } from '../_generated/server';
import { v } from 'convex/values';
import { createGateway } from '@ai-sdk/gateway';

const gw = createGateway({ apiKey: process.env.AI_GATEWAY_API_KEY });

const helloWorldAgent = new Agent(components.agent, {
  name: 'hello-world',
  languageModel: gw.languageModel('openai/gpt-4o-mini'),
  storageOptions: { saveMessages: 'none' },
  usageHandler: async (_ctx, { provider, model }) => {},
});

export const helloWorld = action({
  args: { prompt: v.string() },
  handler: async (ctx, { prompt }) => {
    const threadId = await createThread(ctx, components.agent);
    const result = await helloWorldAgent.generateText(
      ctx,
      { threadId },
      {
        prompt,
      }
    );

    console.log(result.text);

    return result.text;
  },
});
