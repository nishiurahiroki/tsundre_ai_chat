'use client';

import { useEffect } from 'react';

export const AdScript = () => {
  useEffect(() => {
    let lazyloadads = false;

    const handleScroll = () => {
      if (
        (document.documentElement.scrollTop !== 0 && !lazyloadads) ||
        (document.body.scrollTop !== 0 && !lazyloadads)
      ) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?${process.env.GOOGLE_ADSENSE_CLIENT_ID}`;
        const firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode.insertBefore(script, firstScript);

        lazyloadads = true;
      }
    };

    window.addEventListener('scroll', handleScroll, true);

    // イベントリスナーのクリーンアップ
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, []);

  return null; // このコンポーネントはビジュアルな要素をレンダリングしないため
};
