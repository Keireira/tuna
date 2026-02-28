'use client';

import { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

export function StyledComponentsRegistry({ children }: { children: React.ReactNode }) {
  const [sheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = sheet.getStyleTags();
    sheet.instance.clearTag();
    return <>{/* eslint-disable-next-line react/no-danger */}<style dangerouslySetInnerHTML={{ __html: styles.replace(/<\/?style[^>]*>/g, '') }} /></>;
  });

  if (typeof window !== 'undefined') return children;

  return (
    <StyleSheetManager sheet={sheet.instance}>
      {children}
    </StyleSheetManager>
  );
}
