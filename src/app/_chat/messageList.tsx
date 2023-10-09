import styles from './messageList.module.css';

export type SelfMessage = string;
export type OtherMessage = string;

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
      {props.messages.map((message, index) => (
        <div
          key={index}
          className={`${styles.chatMessage} ${
            message.type === 'self' ? styles.user : styles.ai
          }`}
        >
          {message.type === 'other' && (
            <img
              src="path_to_ai_icon.jpg"
              alt="AIアイコン"
              className={styles.icon}
            />
          )}
          <div
            className={`${styles.text} ${
              message.type === 'self' ? styles.userText : styles.aiText
            }`}
          >
            {message.content}
          </div>
        </div>
      ))}
      {props.isOtherTyping && <TypingIndicator />}
    </>
  );
};
