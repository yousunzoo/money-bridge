import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://money-bridge.vercel.app/",
      lastModified: new Date(),
    },
    {
      url: "https://money-bridge.vercel.app/login",
      lastModified: new Date(),
    },
    {
      url: "https://money-bridge.vercel.app/lounge",
      lastModified: new Date(),
    },
    {
      url: "https://money-bridge.vercel.app/analysis",
      lastModified: new Date(),
    },
    {
      url: "https://money-bridge.vercel.app/reservation",
      lastModified: new Date(),
    },
    {
      url: "https://money-bridge.vercel.app/pblist",
      lastModified: new Date(),
    },
    {
      url: "https://money-bridge.vercel.app/bookmark",
      lastModified: new Date(),
    },
    {
      url: "https://money-bridge.vercel.app/my",
      lastModified: new Date(),
    },
    {
      url: "https://money-bridge.vercel.app/myCounseling",
      lastModified: new Date(),
    },
  ];
}
