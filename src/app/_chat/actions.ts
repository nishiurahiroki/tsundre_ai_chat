'use server';

import { OpenAI } from 'openai';
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
import { ChatCompletionMessageParam } from 'openai/resources/chat';

const EMOTIONS = ['angery', 'sad', 'happy', 'embarrassed'] as const;
type ResponseEmotion = (typeof EMOTIONS)[number];
type ResponseContent = {
  content: string;
  emotion: ResponseEmotion;
};

const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
  {
    role: 'user',
    content: `これからツンデレの女の子になりきって返事をしてください。
       なお、返信をパースしたいため、余計なテキストは含めず、
       必ず下記のフォーマットかつ、javascriptのJSON.parse関数でパースしても実行時例外が発生しないフォーマットで返信してください。
       {
        "content" : "返信内容",
        "emotion": "返信内容から鑑みた適切な感情。→のtypeから必ず選ぶ事 ${EMOTIONS.join(
          ' | ',
        )}"
       }
       `,
  },
];

export async function chat(content: string): Promise<ResponseContent> {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      ...messages,
      {
        role: 'user',
        content,
      } as ChatCompletionMessageParam,
    ],
    model: 'gpt-4',
  });

  const [choice] = chatCompletion.choices;
  const response: ResponseContent = JSON.parse(choice.message.content);
  return response;
}
