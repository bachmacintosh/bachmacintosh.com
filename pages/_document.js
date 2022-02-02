import Document, { Head, Html, Main, NextScript, } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx,) {
    const initialProps = await Document.getInitialProps(ctx,);
    return { ...initialProps, };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Noto+Sans:wght@400;700&display=swap"
            rel="stylesheet" />
        </Head>
        <body className="bg-blue-galaxy">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
