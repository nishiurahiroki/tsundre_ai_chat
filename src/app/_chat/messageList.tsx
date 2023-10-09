import Image from 'next/image';

import styles from './messageList.module.css';

export type SelfMessage = string;
export type OtherMessage = {
  content: string;
  iconUrl: string;
};

export type MessageItem = {
  type: 'self' | 'other';
  content: SelfMessage | OtherMessage;
};

type Props = {
  messages: MessageItem[];
  isOtherTyping?: boolean;
};

const TypingIndicator = () => (
  <div className={styles.typingIndicator}>
    <div className={styles.dot}></div>
    <div className={styles.dot}></div>
    <div className={styles.dot}></div>
  </div>
);

export const MessageList = (props: Props) => {
  return (
    <>
      <img
        src={'/images/emotion_faces/happy.png'}
        width={512}
        height={512}
        alt="AIアイコン"
        className={styles.icon}
      />
      {props.messages.map((message, index) => (
        <div
          key={index}
          className={`${styles.chatMessage} ${
            message.type === 'self' ? styles.user : styles.ai
          }`}
        >
          {message.type === 'other' && (
            <>
              <Image
                src={(message.content as OtherMessage).iconUrl}
                width={512}
                height={512}
                alt="アイコン"
                className={styles.icon}
              />
              <div className={`${styles.text} ${styles.aiText}`}>
                {(message.content as OtherMessage).content}
              </div>
            </>
          )}
          {message.type === 'self' && (
            <div className={`${styles.text} ${styles.userText}`}>
              {message.content as SelfMessage}
            </div>
          )}
        </div>
      ))}
      {props.isOtherTyping && <TypingIndicator />}
    </>
  );
};
