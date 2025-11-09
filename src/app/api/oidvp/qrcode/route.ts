import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.NEXT_VERIFY_API_BASE;
const ACCESS_TOKEN = process.env.NEXT_VERIFY_ACCESS_TOKEN;
const VCUID = process.env.NEXT_VERIFY_VCUID || "";          
const UPSTREAM = process.env.NEXT_VERIFY_API_BASE + "/oidvp/qrcode";
export async function OPTIONS() {
  // 允許預檢（保險，雖同源通常不需）
  return new NextResponse(null, { status: 204 });
}

export async function GET(req: NextRequest) {
  if (!API_BASE || !ACCESS_TOKEN) {
    return NextResponse.json(
      { message: "Server env missing: API_BASE / ACCESS_TOKEN" },
      { status: 500 }
    );
  }
  const ref = req.nextUrl.searchParams.get("ref") || VCUID;
  const transactionId = req.nextUrl.searchParams.get("transactionId") || "";

  const url = new URL(UPSTREAM);
  url.searchParams.set("ref", ref);
  url.searchParams.set("transactionId", transactionId);

  try {
    const upstream = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Access-Token": `${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const contentType = upstream.headers.get("content-type") || "application/json";
    
    // 根據 Content-Type 決定如何解析回應
    if (contentType.includes("application/json")) {
      const data = await upstream.json();
      return NextResponse.json(data, { status: upstream.status });
    } else {
      const buf = await upstream.arrayBuffer();
      return new NextResponse(buf, {
        status: upstream.status,
        headers: { "Content-Type": contentType },
      });
    }
  } catch (e: any) {
    return NextResponse.json({ message: e?.message || "Upstream error" }, { status: 502 });
  }
}
