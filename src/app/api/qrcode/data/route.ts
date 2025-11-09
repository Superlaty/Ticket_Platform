import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.NEXT_API_BASE;
const ACCESS_TOKEN = process.env.NEXT_ACCESS_TOKEN;
const VCUID = process.env.NEXT_VCUID;            // 從環境帶入，統一由伺服器附加到 body
const ISSUANCE_DATE = process.env.NEXT_ISSUANCE_DATE; 
const EXPIRED_DATE = process.env.NEXT_EXPIRED_DATE; 
const IDCARD_VCUID = process.env.NEXT_IDCARD_VCUID;            // 從環境帶入，統一由伺服器附加到 body
const IDCARD_ISSUANCE_DATE = process.env.NEXT_IDCARD_ISSUANCE_DATE; 
const IDCARD_EXPIRED_DATE = process.env.NEXT_IDCARD_EXPIRED_DATE; 

export async function OPTIONS() {
  // 允許預檢（保險，雖同源通常不需）
  return new NextResponse(null, { status: 204 });
}

export async function POST(req: NextRequest) {
  if (!API_BASE || !ACCESS_TOKEN) {
    return NextResponse.json(
      { message: "Server env missing: API_BASE / ACCESS_TOKEN" },
      { status: 500 }
    );
  }

  // 前端可能提供完整的請求 body，包含 vcUid、issuanceDate、expiredDate、fields 等
  // 如果沒有提供 vcUid，則使用環境變數的 VCUID
  const clientBody = await req.json().catch(() => ({}));
  const isIdCard = clientBody.fields.map((x: { ename: string; }) => x.ename === "roc_birthday").includes(true)
  const upstreamBody = { ...clientBody, vcUid: isIdCard?IDCARD_VCUID:VCUID , issuanceDate: isIdCard?IDCARD_ISSUANCE_DATE:ISSUANCE_DATE, expiredDate: isIdCard?IDCARD_EXPIRED_DATE:EXPIRED_DATE};

  try {
    const upstream = await fetch(`${API_BASE}/qrcode/data`, {
      method: "POST",
      headers: {
        "Access-Token": `${ACCESS_TOKEN}`,
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
    return NextResponse.json({ message: e?.message || "Upstream error" }, { status: 502 });
  }
}
