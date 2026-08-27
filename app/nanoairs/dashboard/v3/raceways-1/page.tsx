import type { Metadata } from "next";
import RacewayDashboardV3 from "@/app/components/raceway-dashboard-v3";

export const metadata: Metadata = {
  title: "Raceway 1 Operations | Nano Airs",
  description: "Live operations, device health, and predictive monitoring for Raceway 1",
};

export default function RacewayOneDashboardV3Page() {
  return <RacewayDashboardV3 />;
}
