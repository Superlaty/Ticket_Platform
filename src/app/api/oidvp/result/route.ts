import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.NEXT_VERIFY_API_BASE;
const ACCESS_TOKEN = process.env.NEXT_VERIFY_ACCESS_TOKEN;
const VCUID = process.env.NEXT_VERIFY_VCUID || ""; 

export async function OPTIONS() {
  // 允許預檢（保險，雖同源通常不需）
  return new NextResponse(null, { status: 204 });
}

export async function POST(req: NextRequest) {
  if (!ACCESS_TOKEN) {
    return NextResponse.json(
      { message: "Server env missing: ACCESS_TOKEN" },
      { status: 500 }
    );
  }

  // 讀取前端送來的 body，如果沒有 vcUid 則使用環境變數的 VCUID
  const clientBody = await req.json().catch(() => ({}));
  const upstreamBody = { ...clientBody, vcUid: clientBody.vcUid || VCUID };

  try {
    const upstream = await fetch(`${API_BASE}/oidvp/result`, {
      method: "POST",
      headers: {
        "Access-Token": ACCESS_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(upstreamBody),
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
    return NextResponse.json(
      { message: e?.message || "Upstream error" },
      { status: 502 }
    );
  }
}

