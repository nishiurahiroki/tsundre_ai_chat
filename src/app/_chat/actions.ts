'use server';

import { OpenAI } from 'openai';
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
import { ChatCompletionMessageParam } from 'openai/resources/chat';
import {
  DEVELOPMENT_GPT_MODEL,
  PRODCTION_GPT_MODEL,
  TSUNDERE_BASE_PROMPT,
} from '../../consts';

const baseMessage: OpenAI.Chat.Completions.ChatCompletionMessageParam = {
  role: 'user',
  content: TSUNDERE_BASE_PROMPT,
};
export async function chat(content: string): Promise<string> {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      baseMessage,
      {
        role: 'user',
        content,
      } as ChatCompletionMessageParam,
    ],
    model:
      process.env.NODE_ENV === 'production'
        ? PRODCTION_GPT_MODEL
        : DEVELOPMENT_GPT_MODEL,
  });

  const [choice] = chatCompletion.choices;
  return choice.message.content;
}
