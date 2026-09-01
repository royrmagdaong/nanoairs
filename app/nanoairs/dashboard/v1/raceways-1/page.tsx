import type { Metadata } from "next";
import RacewayDashboardV1 from "@/app/components/raceway-dashboard-v1";

export const metadata: Metadata = {
  title: "Raceways 1 | Nano Airs",
  description: "Nano Airs Raceway 1 monitoring dashboard",
};

export default function RacewayOneDashboardV1Page() {
  return <RacewayDashboardV1 />;
}
