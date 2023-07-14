import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.moneybridge.co.kr/",
      lastModified: new Date(),
    },
    {
      url: "https://www.moneybridge.co.kr/login",
      lastModified: new Date(),
    },
    {
      url: "https://www.moneybridge.co.kr/lounge",
      lastModified: new Date(),
    },
    {
      url: "https://www.moneybridge.co.kr/analysis",
      lastModified: new Date(),
    },
    {
      url: "https://www.moneybridge.co.kr/reservation",
      lastModified: new Date(),
    },
    {
      url: "https://www.moneybridge.co.kr/pblist",
      lastModified: new Date(),
    },
    {
      url: "https://www.moneybridge.co.kr/bookmark",
      lastModified: new Date(),
    },
    {
      url: "https://www.moneybridge.co.kr/my",
      lastModified: new Date(),
    },
    {
      url: "https://www.moneybridge.co.kr/myCounseling",
      lastModified: new Date(),
    },
  ];
}
