import type { ReactNode } from "react";

import { SiteLayout } from "../../src/landing/components/SiteLayout";
import OpenChatWidgetClient from "../widget-client";

type SiteRouteLayoutProps = {
  children: ReactNode;
};

export default function SiteRouteLayout({ children }: SiteRouteLayoutProps) {
  return (
    <>
      <SiteLayout>{children}</SiteLayout>
      <OpenChatWidgetClient />
    </>
  );
}
