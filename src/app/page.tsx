'use client';

import { useRef, useState, useTransition } from 'react';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

import styles from './styles.module.css';
import {
  MessageItem,
  MessageList,
  OtherMessage,
  SelfMessage,
} from './_chat/messageList';

import { chat } from './_chat/actions';
import { TSUNDERE_GIRL_ICON_IMAGE_SRC } from '../consts';
import ResizableTextarea from '../component/ResizableTextarea';

export default function Page() {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [isPending, startTransition] = useTransition();
  const form = useRef<HTMLFormElement>(null);

  const submitChat = (message: string) => {
    const updateMessages = [
      ...messages,
      {
        content: message,
        type: 'self',
      } as MessageItem,
    ];

    setMessages(updateMessages); // ユーザーが送信したメッセージを即時メッセージエリアに反映するためにtransition前にset

    startTransition(async () => {
      const chatHistories = updateMessages.map<ChatCompletionMessageParam>(
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

  const handleOnClickButton = () => {
    const message = form.current.elements['message'].value;

    if (!message) return;
    if (isPending) return;

    submitChat(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.shiftKey) return;
    if (e.key === 'Enter') {
      e.preventDefault();

      const message = e.currentTarget.value;

      if (!message.trim()) return;
      if (isPending) return;

      submitChat(message);
    }
  };

  return (
    <form ref={form}>
      <div className={styles.chatContainer}>
        <h1 className={styles.title}>ツンデレAIチャット</h1>
        <MessageList messages={messages} isOtherTyping={isPending} />
        <div className={styles.inputContainer}>
          <ResizableTextarea
            name="message"
            className={styles.textarea}
            placeholder="メッセージを入力..."
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleOnClickButton}
            className={`${styles.button} ${isPending ? styles.loading : ''}`}
            type="button"
            disabled={isPending}
          >
            {isPending ? '' : '送信'}
          </button>
        </div>
      </div>
    </form>
  );
}
