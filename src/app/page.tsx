'use client';

import styles from './styles.module.css';
import {
  MessageItem,
  MessageList,
  OtherMessage,
  SelfMessage,
} from './_chat/messageList';
import { useRef, useState, useTransition } from 'react';
import { chat } from './_chat/actions';
import { TSUNDERE_GIRL_ICON_IMAGE_SRC } from '../consts';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

export default function Page() {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [isPending, startTransition] = useTransition();
  const form = useRef<HTMLFormElement>(null);

  const handleOnClickButton = () => {
    const message = form.current.elements['message'].value;

    if (!message) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        content: message,
        type: 'self',
      },
    ]);
  };

  const handleFormAction = async (formData: FormData) => {
    const message = formData.get('message').toString();

    if (!message) return;
    if (isPending) return;

    startTransition(async () => {
      const chatHistories = messages.map<ChatCompletionMessageParam>(
        (message) => ({
          role: message.type === 'self' ? 'user' : 'assistant',
          content:
            message.type === 'self'
              ? (message.content as SelfMessage)
              : (message.content as OtherMessage).content,
        }),
      );
      const answer = await chat(chatHistories);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          content: {
            content: answer,
            iconUrl: TSUNDERE_GIRL_ICON_IMAGE_SRC,
          },
          type: 'other',
        },
      ]);
    });
    form.current?.reset();
  };

  return (
    <form ref={form} action={handleFormAction}>
      <div className={styles.chatContainer}>
        <h1 className={styles.title}>ツンデレAIチャット</h1>
        <MessageList messages={messages} isOtherTyping={isPending} />
        <div className={styles.inputContainer}>
          <input
            name="message"
            className={styles.input}
            type="text"
            placeholder="メッセージを入力..."
          />
          <button
            onClick={handleOnClickButton}
            className={`${styles.button} ${isPending ? styles.loading : ''}`}
            type="submit"
            disabled={isPending}
          >
            {isPending || '送信'}
          </button>
        </div>
      </div>
    </form>
  );
}
