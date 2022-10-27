import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="description" content="Get off to a good start. Exemplum" />
        <link rel="icon" href="/favicon.ico" />
        <Script
          id="darkmode-setting"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            if (localStorage.getItem("color-theme") === "dark" ||
                (!("color-theme" in localStorage) &&
                  window.matchMedia("(prefers-color-scheme: dark)").matches)
              ) {
                document.documentElement.classList.add("dark");
              } else {
                document.documentElement.classList.remove("dark");
              }`,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
