import type { Metadata } from "next";
import RacewayDashboardV2 from "@/app/components/raceway-dashboard-v2";

export const metadata: Metadata = {
  title: "Raceway 1 | Nano Airs",
  description: "Live water-quality monitoring for Raceway 1",
};

export default function RacewayOneDashboardV2Page() {
  return <RacewayDashboardV2 />;
}
