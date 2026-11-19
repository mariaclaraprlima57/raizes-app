import type { PropsWithChildren } from "react";
import { ScrollViewStyleReset, useServerDocumentContext } from "expo-router/html";

export default function Root({ children }: PropsWithChildren) {
  const { headNodes, bodyNodes, htmlAttributes, bodyAttributes } = useServerDocumentContext();

  return <html lang="pt-BR" translate="no" {...htmlAttributes}>
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <meta name="google" content="notranslate" />
      <meta name="theme-color" content="#8f3f1b" />
      <meta name="application-name" content="Raízes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="Raízes" />
      <link rel="manifest" href={`${process.env.EXPO_BASE_URL}/manifest.json`} />
      <link rel="apple-touch-icon" href={`${process.env.EXPO_BASE_URL}/raizes-icon.png`} />
      <ScrollViewStyleReset />
      {headNodes}
    </head>
    <body {...bodyAttributes}>
      {children}
      {bodyNodes}
      <script dangerouslySetInnerHTML={{ __html: SERVICE_WORKER }} />
    </body>
  </html>;
}

const SERVICE_WORKER = `
  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('${process.env.EXPO_BASE_URL}/sw.js').catch(function (erro) {
        console.warn('Não foi possível ativar o modo instalável.', erro);
      });
    });
  }
`;
