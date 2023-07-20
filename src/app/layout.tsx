import Navbar from "@/components/common/Navbar";
import Script from "next/script";
import ReactQueryProvider from "./ReactQueryProvider";
import "./globals.css";
import { Noto_Sans_KR } from "next/font/google";
import Main from "@/components/common/Main";
import { Metadata } from "next";
import Footer from "@/components/common/Footer";
import { TopNav } from "@/components/common/TopNav";
import { Suspense } from "react";

const noto = Noto_Sans_KR({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.moneybridge.co.kr"),
  title: {
    template: "머니브릿지 | %s",
    default: "머니브릿지",
  },
  description: '위치기반 투자자 PB 매칭 플랫폼, "머니브릿지"',
  openGraph: {
    title: "머니브릿지 - Money Bridge",
    description: "위치기반 투자자 PB 매칭 플랫폼",
    url: "https://www.moneybridge.co.kr",
    siteName: "머니브릿지 - Money Bridge",
    images: [
      {
        url: "https://moneybridge.s3.ap-northeast-2.amazonaws.com/default/post.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "https://www.moneybridge.co.kr",
    title: "머니브릿지 - Money Bridge",
    description: "위치기반 투자자 PB 매칭 플랫폼",
    images: ["https://moneybridge.s3.ap-northeast-2.amazonaws.com/default/post.png"],
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

declare global {
  interface Window {
    Kakao: any;
  }
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="apple-touch-icon" sizes="57x57" href="/assets/favicons/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/assets/favicons/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/assets/favicons/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/assets/favicons/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/assets/favicons/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/assets/favicons/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/assets/favicons/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/assets/favicons/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicons/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/assets/favicons/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/assets/favicons/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicons/favicon-16x16.png" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="머니브릿지 - Money Bridge" />
        <meta property="og:description" content="위치기반 투자자 PB 매칭 플랫폼" />
        <meta property="og:url" content="https://www.moneybridge.co.kr" />
        <meta property="og:site_name" content="머니브릿지 - Money Bridge" />
        <meta property="og:image" content="https://moneybridge.s3.ap-northeast-2.amazonaws.com/default/post.png" />
        <meta property="og:type" content="website" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/assets/favicons/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
        <Script defer src="https://developers.kakao.com/sdk/js/kakao.min.js"></Script>
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&autoload=false`}
        />
        <Script src="//wcs.naver.net/wcslog.js" strategy="afterInteractive" />
        <Script
          id="naver-analytics"
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
      </head>
      <body className={noto.className}>
        <ReactQueryProvider>
          <Suspense>
            <Main>
              <TopNav />
              <div className="flex-1 mb-40">{children}</div>
              <Footer />
              <Navbar />
            </Main>
          </Suspense>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
