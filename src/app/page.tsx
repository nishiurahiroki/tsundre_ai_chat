'use client';

import styles from './styles.module.css';
import { MessageItem, MessageList } from './_chat/messageList';
import { useRef, useState, useTransition } from 'react';
import { chat } from './_chat/actions';

export default function Page() {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [isPending, startTransition] = useTransition();
  const form = useRef<HTMLFormElement>(null);

  const handleOnClickButton = () => {
    const message = form.current.elements['message'].value;
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        content: message,
        type: 'self',
      },
    ]);
  };

  const handleFormAction = async (formData: FormData) => {
    startTransition(async () => {
      const message = formData.get('message').toString();
      const answer = await chat(message);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          content: answer,
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
            className={styles.button}
            type="submit"
          >
            送信
          </button>
        </div>
      </div>
    </form>
  );
}
