import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("Authorization");
  console.log(accessToken);
  if (!accessToken) {
    console.log("hi");
    request.nextUrl.pathname = "/login";
    return NextResponse.rewrite(request.nextUrl);
  }
  return NextResponse.next();
}
