'use client';

import { useEffect } from 'react';
import { ko } from '@/lib/i18n/ko';
import { Landing } from '@/components/landing';

export default function Page() {
  useEffect(() => {
    document.documentElement.lang = 'ko';
    return () => {
      document.documentElement.lang = 'en';
    };
  }, []);

  return <Landing t={ko} lang="ko" />;
}
