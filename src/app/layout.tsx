import { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';

import Favicon from '/public/images/metadata/favicon.ico';
import Footer from './_footer';
import { AdScript } from '../component/AdScript';

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
      <head>
        {process.env.NODE_ENV === 'production' && <AdScript />}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
        />
      </head>
      <body>
        {children}
        <Footer />
      </body>
      <Analytics />
    </html>
  );
}
