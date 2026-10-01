import { NextResponse } from "next/server";

const INDEXNOW_KEY = "558b0930da0346399a5e840d5bfa78f5";
const DEFAULT_HOST = "vanmusic.com.vn";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || `https://${DEFAULT_HOST}`;
  const host = new URL(siteUrl).hostname;

  // Default core URLs to index immediately
  const coreUrls = [
    `${siteUrl}`,
    `${siteUrl}/ban-dj`,
    `${siteUrl}/thue-ban-dj`,
    `${siteUrl}/sua-chua-ban-dj`,
    `${siteUrl}/dj-equipment-rental-danang`,
    `${siteUrl}/products`,
    `${siteUrl}/products/xdj-rx3`,
    `${siteUrl}/products/xdj-rx2`,
    `${siteUrl}/products/xdj-rr`,
    `${siteUrl}/products/ddj-flx4`,
    `${siteUrl}/products/ddj-flx2`,
    `${siteUrl}/products/omnis-duo`,
    `${siteUrl}/products/xdj-az`,
    `${siteUrl}/products/xdj-an`,
    `${siteUrl}/products/xdj-xz`,
    `${siteUrl}/about`,
    `${siteUrl}/contact`,
  ];

  const customUrl = searchParams.get("url");
  const urlList = customUrl ? [customUrl] : coreUrls;

  try {
    const payload = {
      host,
      key: INDEXNOW_KEY,
      keyLocation: `https://${host}/${INDEXNOW_KEY}.txt`,
      urlList,
    };

    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    const isOk = res.ok || res.status === 200 || res.status === 202;

    return NextResponse.json({
      success: isOk,
      status: res.status,
      message: isOk
        ? "IndexNow URLs submitted successfully to Bing/IndexNow network"
        : `IndexNow responded with status ${res.status}`,
      submittedUrls: urlList,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to notify IndexNow";
    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || `https://${DEFAULT_HOST}`;
  const host = new URL(siteUrl).hostname;

  try {
    const body = await request.json().catch(() => ({}));
    const urlList: string[] = Array.isArray(body?.urls) && body.urls.length > 0
      ? body.urls
      : [
          `${siteUrl}`,
          `${siteUrl}/ban-dj`,
          `${siteUrl}/thue-ban-dj`,
          `${siteUrl}/sua-chua-ban-dj`,
          `${siteUrl}/products`,
          `${siteUrl}/products/xdj-rx3`,
          `${siteUrl}/products/xdj-rx2`,
          `${siteUrl}/products/xdj-rr`,
          `${siteUrl}/products/ddj-flx4`,
          `${siteUrl}/products/ddj-flx2`,
          `${siteUrl}/products/omnis-duo`,
          `${siteUrl}/products/xdj-az`,
          `${siteUrl}/products/xdj-an`,
          `${siteUrl}/products/xdj-xz`,
        ];

    const payload = {
      host,
      key: INDEXNOW_KEY,
      keyLocation: `https://${host}/${INDEXNOW_KEY}.txt`,
      urlList,
    };

    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    const isOk = res.ok || res.status === 200 || res.status === 202;

    return NextResponse.json({
      success: isOk,
      status: res.status,
      message: isOk
        ? "IndexNow URLs submitted successfully"
        : `IndexNow error status ${res.status}`,
      submittedUrls: urlList,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to call IndexNow";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
