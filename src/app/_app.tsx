// pages/_app.tsx

import type { AppProps } from "next/app";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script id="naver-analytics-wcslog" src="//wcs.naver.net/wcslog.js" strategy="afterInteractive" />
      <Script
        id="naver-analytics-custom"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            if (!wcs_add) var wcs_add = {};
            wcs_add["wa"] = "1c72383b4c03d20";
            if (window.wcs) {
              wcs_do();
            }
          `,
        }}
      />

      <div className="layout">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
