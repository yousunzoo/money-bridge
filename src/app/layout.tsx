import Navbar from "@/components/common/Navbar";
import Script from "next/script";
import ReactQueryProvider from "./ReactQueryProvider";
import "./globals.css";
import { Noto_Sans_KR } from "next/font/google";
import Main from "@/components/common/Main";
import { Metadata } from "next";
import Footer from "@/components/common/Footer";
import { TopNav } from "@/components/common/TopNav";

const noto = Noto_Sans_KR({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "머니브릿지 | %s",
    default: "머니브릿지",
  },
  description: '위치기반 투자자 PB 매칭 플랫폼, "머니브릿지"',
  openGraph: {
    title: "머니브릿지 - Money Bridge",
    description: "위치기반 투자자 PB 매칭 플랫폼",
    url: "https://www.moneybridge.co.kr/",
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
    site: "https://www.moneybridge.co.kr/",
    title: "머니브릿지 - Money Bridge",
    description: "위치기반 투자자 PB 매칭 플랫폼",
    images: ["https://moneybridge.s3.ap-northeast-2.amazonaws.com/default/post.png"],
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
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/assets/favicons/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
        <Script defer src="https://developers.kakao.com/sdk/js/kakao.min.js"></Script>
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&autoload=false`}
        />
      </head>
      <body className={noto.className}>
        <ReactQueryProvider>
          <Main>
            <TopNav />
            <div className="flex-1">{children}</div>
            <Footer />
            <Navbar />
          </Main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
