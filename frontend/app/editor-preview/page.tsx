import type { Metadata } from "next";
import LiveHomePageClient from "../components/LiveHomePageClient";
import { DEFAULT_HOME_DATA, HomeData } from "../types/home_config";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "VanBass Editor Preview",
  robots: {
    index: false,
    follow: false,
  },
};

async function getEditorInitialConfig(): Promise<HomeData> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
    // Try fetching draft config or published config without caching
    const res = await fetch(`${apiUrl}/home-config`, {
      cache: "no-store",
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      const json = await res.json();
      if (json && json.data) {
        return {
          ...DEFAULT_HOME_DATA,
          ...json.data,
          visibility: { ...DEFAULT_HOME_DATA.visibility, ...(json.data.visibility || {}) },
          hero_left: { ...DEFAULT_HOME_DATA.hero_left, ...(json.data.hero_left || {}) },
          hero_center: { ...DEFAULT_HOME_DATA.hero_center, ...(json.data.hero_center || {}) },
          hero_right: { ...DEFAULT_HOME_DATA.hero_right, ...(json.data.hero_right || {}) },
          header: { ...DEFAULT_HOME_DATA.header, ...(json.data.header || {}) },
          categories_highlight: { ...DEFAULT_HOME_DATA.categories_highlight, ...(json.data.categories_highlight || {}) },
          intro: { ...DEFAULT_HOME_DATA.intro, ...(json.data.intro || {}) },
          rental: { ...DEFAULT_HOME_DATA.rental, ...(json.data.rental || {}) },
          local_cta: { ...DEFAULT_HOME_DATA.local_cta, ...(json.data.local_cta || {}) },
          floating_contacts: { ...DEFAULT_HOME_DATA.floating_contacts, ...(json.data.floating_contacts || {}) },
        };
      }
    }
  } catch {
    // Graceful fallback to static defaults
  }
  return DEFAULT_HOME_DATA;
}

export default async function EditorPreviewPage() {
  const homeData = await getEditorInitialConfig();

  return <LiveHomePageClient initialHomeData={homeData} mode="editor" />;
}
