'use server';

import { OpenAI } from 'openai';
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
import { ChatCompletionMessageParam } from 'openai/resources/chat';
import {
  DEVELOPMENT_GPT_MODEL,
  GREETING_MESSAGE,
  PRODCTION_GPT_MODEL,
  TSUNDERE_BASE_PROMPT,
} from '../../consts';

const baseMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
  {
    role: 'user',
    content: TSUNDERE_BASE_PROMPT,
  },
  {
    role: 'assistant',
    content: GREETING_MESSAGE,
  },
];
export async function chat(
  chatHistories: ChatCompletionMessageParam[],
): Promise<string> {
  const chatCompletion = await openai.chat.completions.create({
    messages: [...baseMessages, ...chatHistories],
    model:
      process.env.NODE_ENV === 'production'
        ? PRODCTION_GPT_MODEL
        : DEVELOPMENT_GPT_MODEL,
  });

  const [choice] = chatCompletion.choices;
  return choice.message.content;
}
