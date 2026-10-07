"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * NavigationScrollManager
 * 
 * Rules:
 * 1. F5 / Page Reload on the SAME URL: Do NOT force scroll to top. Browser natively restores scroll position.
 * 2. Client-side navigation to a DIFFERENT URL: Instantly reset window scroll to top (scrollTop = 0).
 * 3. In-page anchor hash navigation (e.g. #section): Respects anchor location.
 */
export default function NavigationScrollManager() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPath = `${pathname}${searchParams?.toString() ? `?${searchParams.toString()}` : ""}`;

  const isFirstMountRef = useRef(true);
  const prevPathRef = useRef(currentPath);
  const isPopStateRef = useRef(false);

  useEffect(() => {
    const handlePopState = () => {
      isPopStateRef.current = true;
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    // 1. Initial Page Load / F5 / Hard Reload:
    // Do NOT touch scroll position; let browser native scroll restoration work.
    if (isFirstMountRef.current) {
      isFirstMountRef.current = false;
      prevPathRef.current = currentPath;
      return;
    }

    // 2. Browser Back / Forward (PopState):
    // Let browser restore the history entry's scroll position without forcing top.
    if (isPopStateRef.current) {
      isPopStateRef.current = false;
      prevPathRef.current = currentPath;
      return;
    }

    // 3. Client-side Navigation to a different URL (Link click / router.push):
    if (prevPathRef.current !== currentPath) {
      prevPathRef.current = currentPath;

      // If user is navigating to an anchor hash (e.g. #specs), let the browser handle it
      if (typeof window !== "undefined" && window.location.hash) {
        return;
      }

      // Reset scroll position immediately
      if (typeof window !== "undefined") {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "instant" as ScrollBehavior,
        });

        // Ensure top position after layout render
        requestAnimationFrame(() => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant" as ScrollBehavior,
          });
        });
      }
    }
  }, [pathname, searchParams, currentPath]);

  return null;
}
