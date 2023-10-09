import { Metadata } from 'next';
import styles from './styles.module.css';
import Favicon from '/public/images/metadata/favicon.ico';

export const metadata: Metadata = {
  title: 'ツンデレAIチャット',
  description:
    '最先端のツンデレAI技術を使用したチャットサービス。あなたの質問に迅速に答えます。ツンデレAIとのチャットをブラウザで楽しめます。',
  viewport: 'width=device-width, initial-scale=1.0',
  keywords:
    'チャット, チャット ブラウザ, ツンデレ, tsundere, ツンデレ AI, ツンデレ チャット',
  icons: [{ rel: 'icon', url: Favicon.src }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={styles.body}>{children}</body>
    </html>
  );
}
