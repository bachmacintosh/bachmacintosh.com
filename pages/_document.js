import { Head, Html, Main, NextScript, } from "next/document";

export default function Document () {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Noto+Sans:wght@400;700&display=swap"
          rel="stylesheet" />
        <script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "f05c4e5bd9704045b8497e033a19daf3"}' />
      </Head>
      <body className="bg-blue-galaxy">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
