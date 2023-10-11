import Image from 'next/image';

import styles from './messageList.module.css';
import { GREETING_MESSAGE, TSUNDERE_GIRL_ICON_IMAGE_SRC } from '../../consts';

export const GreetingMessage = () => (
  <div className={`${styles.chatMessage} ${styles.ai}`}>
    <Image
      src={TSUNDERE_GIRL_ICON_IMAGE_SRC}
      width={512}
      height={512}
      alt="アイコン"
      className={styles.icon}
    />
    <div className={`${styles.text} ${styles.aiText}`}>{GREETING_MESSAGE}</div>
  </div>
);
