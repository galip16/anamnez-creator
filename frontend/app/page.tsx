"use client";

import DesktopView from "@/components/DesktopView";
import MobileView from "@/components/MobileView";
import useIsMobile from "@/hooks/useIsMobile";

export default function Home() {
  const isMobile = useIsMobile();

  return isMobile ? <MobileView /> : <DesktopView />;
}