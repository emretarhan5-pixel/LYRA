"use client";

import { useEffect } from "react";
import { trackPageview } from "@/app/actions/analytics";

interface SiteTrackerProps {
  siteId: string;
}

export function SiteTracker({ siteId }: SiteTrackerProps) {
  useEffect(() => {
    trackPageview({
      siteId,
      path: window.location.pathname,
      referrer: document.referrer || undefined,
      userAgent: navigator.userAgent,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
