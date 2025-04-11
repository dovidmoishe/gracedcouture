import { Html, Head, Main, NextScript } from "next/document";
import { poppins } from "@/lib/fonts";

export default function Document() {
  return (
    <Html lang="en" className="light">
      <Head>
        <link rel="shortcut icon" href="logo.ico" type="image/x-icon" />
      </Head>
      <body className={`${poppins.variable} antialiased`}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
