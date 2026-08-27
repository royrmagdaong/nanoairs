"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import WaterRoundedIcon from "@mui/icons-material/WaterRounded";
import ScienceRoundedIcon from "@mui/icons-material/ScienceRounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ThermostatRoundedIcon from "@mui/icons-material/ThermostatRounded";
import OpacityRoundedIcon from "@mui/icons-material/OpacityRounded";
import WavesRoundedIcon from "@mui/icons-material/WavesRounded";
import BubbleChartRoundedIcon from "@mui/icons-material/BubbleChartRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import SensorsRoundedIcon from "@mui/icons-material/SensorsRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

type Period = "24h" | "7d" | "30d";
type MetricKey = "temperature" | "ph" | "oxygen" | "salinity";

const palette: Record<MetricKey, string> = {
  temperature: "#f59e73",
  ph: "#9b8afb",
  oxygen: "#24b9d0",
  salinity: "#68b596",
};

const series: Record<
  Period,
  { labels: string[]; values: Record<MetricKey, number[]> }
> = {
  "24h": {
    labels: ["12 AM", "3 AM", "6 AM", "9 AM", "12 PM", "3 PM", "6 PM", "9 PM", "Now"],
    values: {
      temperature: [27.6, 27.4, 27.2, 27.8, 28.5, 28.9, 28.7, 28.5, 28.4],
      ph: [7.6, 7.7, 7.7, 7.8, 7.8, 7.9, 7.8, 7.8, 7.8],
      oxygen: [7.5, 7.4, 7.3, 7.2, 7.0, 6.7, 6.8, 6.8, 6.9],
      salinity: [15.8, 15.9, 15.9, 16.0, 16.1, 16.3, 16.2, 16.2, 16.2],
    },
  },
  "7d": {
    labels: ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"],
    values: {
      temperature: [27.8, 28.1, 28.0, 28.6, 28.8, 28.3, 28.4],
      ph: [7.7, 7.8, 7.7, 7.8, 7.9, 7.8, 7.8],
      oxygen: [7.4, 7.2, 7.1, 7.0, 6.8, 6.7, 6.9],
      salinity: [15.7, 15.9, 16.0, 16.1, 16.3, 16.2, 16.2],
    },
  },
  "30d": {
    labels: ["Jul 29", "Aug 2", "Aug 6", "Aug 10", "Aug 14", "Aug 18", "Aug 22", "Aug 27"],
    values: {
      temperature: [27.4, 27.7, 27.5, 28.0, 28.2, 28.7, 28.5, 28.4],
      ph: [7.5, 7.6, 7.7, 7.8, 7.8, 7.9, 7.8, 7.8],
      oxygen: [7.8, 7.6, 7.5, 7.3, 7.1, 6.8, 6.7, 6.9],
      salinity: [15.4, 15.5, 15.7, 15.9, 16.0, 16.1, 16.2, 16.2],
    },
  },
};

const metricCards = [
  {
    key: "temperature" as const,
    label: "Water temperature",
    value: "28.4",
    unit: "°C",
    status: "Optimal",
    change: "+0.6%",
    helper: "Target 26–30°C",
    icon: ThermostatRoundedIcon,
    spark: "M1 25 C12 23,15 16,25 18 S42 27,52 17 S68 12,78 15 S94 7,111 9",
  },
  {
    key: "ph" as const,
    label: "pH level",
    value: "7.8",
    unit: "pH",
    status: "Stable",
    change: "+0.1%",
    helper: "Target 7.5–8.5",
    icon: ScienceRoundedIcon,
    spark: "M1 20 C12 19,17 13,27 16 S44 19,55 14 S72 17,83 11 S99 15,111 12",
  },
  {
    key: "oxygen" as const,
    label: "Dissolved oxygen",
    value: "6.9",
    unit: "mg/L",
    status: "Watch",
    change: "−2.4%",
    helper: "Target > 7.0 mg/L",
    icon: BubbleChartRoundedIcon,
    spark: "M1 9 C13 8,18 13,28 12 S43 16,54 15 S70 24,82 20 S98 24,111 22",
  },
  {
    key: "salinity" as const,
    label: "Salinity",
    value: "16.2",
    unit: "ppt",
    status: "Optimal",
    change: "+0.3%",
    helper: "Target 15–18 ppt",
    icon: WavesRoundedIcon,
    spark: "M1 24 C10 22,17 23,27 18 S44 17,54 16 S72 9,83 13 S98 10,111 9",
  },
];

const navGroups = [
  {
    label: "Monitoring",
    links: [
      { label: "Overview", icon: DashboardRoundedIcon, href: "/nanoairs/dashboard" },
      { label: "Raceway 1", icon: WaterRoundedIcon, href: "/nanoairs/dashboard/v2/raceways-1", active: true },
      { label: "Raceway 2", icon: WaterRoundedIcon, href: "/nanoairs/dashboard/raceways-2" },
      { label: "Control ponds", icon: OpacityRoundedIcon, href: "/nanoairs/dashboard/control-pond-1" },
    ],
  },
  {
    label: "Workspace",
    links: [
      { label: "Reports", icon: AssessmentRoundedIcon, href: "/nanoairs/dashboard" },
      { label: "Sensor health", icon: SensorsRoundedIcon, href: "/nanoairs/dashboard" },
      { label: "Settings", icon: SettingsRoundedIcon, href: "/nanoairs/dashboard" },
    ],
  },
];

const events = [
  {
    title: "DO approaching threshold",
    detail: "6.9 mg/L recorded by DO-01",
    time: "8 min ago",
    type: "warning",
  },
  {
    title: "Auto-feeder completed",
    detail: "Feed cycle #04 dispensed 12.4 kg",
    time: "42 min ago",
    type: "success",
  },
  {
    title: "Sensor calibration complete",
    detail: "pH-01 is reporting normally",
    time: "2 hr ago",
    type: "success",
  },
  {
    title: "Water exchange logged",
    detail: "8% volume exchange completed",
    time: "5 hr ago",
    type: "neutral",
  },
];

function BrandMark() {
  return (
    <div className="relative grid h-9 w-9 place-items-center rounded-xl bg-[#63d2c8] text-[#0b3037] shadow-[0_8px_24px_rgba(99,210,200,0.22)]">
      <WavesRoundedIcon sx={{ fontSize: 21 }} />
      <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#12343d] bg-[#e6b96e]" />
    </div>
  );
}

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {open && (
        <button
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-[#071f25]/55 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[252px] flex-col overflow-y-auto bg-[#12343d] px-4 pb-5 pt-6 text-white shadow-2xl transition-transform duration-300 lg:translate-x-0 lg:shadow-none ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center justify-between px-2">
          <Link href="/nanoairs/dashboard" className="flex items-center gap-3" onClick={onClose}>
            <BrandMark />
            <div>
              <p className="text-[17px] font-semibold tracking-[-0.02em]">nanoAIRS</p>
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#8eabb0]">Aquaculture OS</p>
            </div>
          </Link>
          <button
            aria-label="Close menu"
            className="grid h-9 w-9 place-items-center rounded-lg text-[#a9c0c4] hover:bg-white/10 lg:hidden"
            onClick={onClose}
          >
            <CloseRoundedIcon fontSize="small" />
          </button>
        </div>

        <nav className="flex-1 space-y-7">
          {navGroups.map((group) => (
            <div key={group.label}>
              <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#66878d]">
                {group.label}
              </p>
              <div className="space-y-1">
                {group.links.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={onClose}
                      className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition ${
                        link.active
                          ? "bg-[#24525a] text-white shadow-[inset_0_0_0_1px_rgba(116,217,206,0.12)]"
                          : "text-[#a9c0c4] hover:bg-white/[0.06] hover:text-white"
                      }`}
                    >
                      <span className={link.active ? "text-[#6ed5ca]" : "text-[#78979c] group-hover:text-[#9dc4c4]"}>
                        <Icon sx={{ fontSize: 19 }} />
                      </span>
                      {link.label}
                      {link.active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#6ed5ca]" />}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="mt-7 rounded-2xl border border-white/[0.08] bg-[#0e2d35] p-3.5">
          <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-[#204751] text-[#6ed5ca]">
            <HelpOutlineRoundedIcon sx={{ fontSize: 18 }} />
          </div>
          <p className="text-xs font-semibold">Need a hand?</p>
          <p className="mt-1 text-[10px] leading-4 text-[#78979c]">Review the operator guide or contact system support.</p>
          <button className="mt-3 text-[11px] font-semibold text-[#6ed5ca] hover:text-white">Open help center</button>
        </div>

        <div className="mt-4 flex items-center gap-3 border-t border-white/[0.08] px-1 pt-4">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#d6eee9] text-xs font-bold text-[#16424a]">RM</div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold">Roy Mendoza</p>
            <p className="truncate text-[10px] text-[#78979c]">Farm administrator</p>
          </div>
          <button aria-label="Log out" className="text-[#78979c] transition hover:text-white">
            <LogoutRoundedIcon sx={{ fontSize: 18 }} />
          </button>
        </div>
      </aside>
    </>
  );
}

function Sparkline({ path, color }: { path: string; color: string }) {
  return (
    <svg aria-hidden="true" className="h-8 w-28" viewBox="0 0 112 32" fill="none" preserveAspectRatio="none">
      <path d={`${path} L111 32 L1 32 Z`} fill={color} opacity="0.08" />
      <path d={path} stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function MetricCard({
  card,
  active,
  onClick,
}: {
  card: (typeof metricCards)[number];
  active: boolean;
  onClick: () => void;
}) {
  const Icon = card.icon;
  const isWarning = card.key === "oxygen";
  return (
    <button
      onClick={onClick}
      className={`group min-w-0 rounded-2xl border bg-white p-4 text-left shadow-[0_8px_28px_rgba(27,71,78,0.045)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(27,71,78,0.09)] ${
        active ? "border-[#72cfc6] ring-2 ring-[#72cfc6]/10" : "border-[#dfe8e8]"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl"
          style={{ color: palette[card.key], backgroundColor: `${palette[card.key]}16` }}
        >
          <Icon sx={{ fontSize: 20 }} />
        </div>
        <span
          className={`rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-[0.08em] ${
            isWarning ? "bg-[#fff3df] text-[#b6771c]" : "bg-[#eaf7f1] text-[#36836a]"
          }`}
        >
          {card.status}
        </span>
      </div>
      <p className="mt-3 truncate text-[11px] font-medium text-[#789092]">{card.label}</p>
      <div className="mt-0.5 flex items-baseline gap-1.5">
        <span className="text-[27px] font-semibold tracking-[-0.05em] text-[#183f46]">{card.value}</span>
        <span className="text-[11px] font-medium text-[#789092]">{card.unit}</span>
      </div>
      <div className="mt-3 flex items-end justify-between gap-2 border-t border-[#eef3f3] pt-3">
        <div>
          <p className={`text-[10px] font-semibold ${isWarning ? "text-[#bd7920]" : "text-[#4c987d]"}`}>{card.change} today</p>
          <p className="mt-0.5 whitespace-nowrap text-[9px] text-[#9aabad]">{card.helper}</p>
        </div>
        <Sparkline path={card.spark} color={palette[card.key]} />
      </div>
    </button>
  );
}

function HealthScore() {
  return (
    <section className="flex h-full flex-col rounded-2xl border border-[#dfe8e8] bg-white p-5 shadow-[0_8px_28px_rgba(27,71,78,0.045)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-[#183f46]">System health</p>
          <p className="mt-1 text-[10px] text-[#8ba0a2]">All sensor nodes combined</p>
        </div>
        <button aria-label="System health menu" className="text-[#96aaac] hover:text-[#183f46]">
          <MoreHorizRoundedIcon fontSize="small" />
        </button>
      </div>

      <div className="my-5 flex justify-center">
        <div className="relative grid h-32 w-32 place-items-center rounded-full bg-[conic-gradient(#58bca7_0deg,#58bca7_331deg,#edf3f2_331deg,#edf3f2_360deg)]">
          <div className="grid h-[102px] w-[102px] place-items-center rounded-full bg-white text-center">
            <div>
              <p className="text-3xl font-semibold tracking-[-0.05em] text-[#183f46]">92<span className="text-base">%</span></p>
              <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#7f9698]">Healthy</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto grid grid-cols-3 divide-x divide-[#e7eeee] border-t border-[#e7eeee] pt-4 text-center">
        <div>
          <p className="text-sm font-semibold text-[#244b51]">11</p>
          <p className="mt-0.5 text-[9px] text-[#8ca1a3]">Online</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-[#d0933a]">1</p>
          <p className="mt-0.5 text-[9px] text-[#8ca1a3]">Warning</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-[#244b51]">0</p>
          <p className="mt-0.5 text-[9px] text-[#8ca1a3]">Offline</p>
        </div>
      </div>
    </section>
  );
}

function ConditionsTable() {
  const conditions = [
    { name: "Alkalinity", sensor: "ALK-01", value: "142 mg/L", status: "Normal", color: "#6878df" },
    { name: "Dissolved CO₂", sensor: "CO2-01", value: "8.3 mg/L", status: "Normal", color: "#5eb28b" },
    { name: "Turbidity", sensor: "TUR-01", value: "3.6 NTU", status: "Normal", color: "#d4a05a" },
    { name: "Water level", sensor: "LVL-01", value: "1.42 m", status: "Normal", color: "#5ca6d1" },
  ];

  return (
    <section className="rounded-2xl border border-[#dfe8e8] bg-white shadow-[0_8px_28px_rgba(27,71,78,0.045)]">
      <div className="flex items-center justify-between border-b border-[#e8eeee] px-5 py-4">
        <div>
          <h2 className="text-sm font-semibold text-[#183f46]">Current conditions</h2>
          <p className="mt-1 text-[10px] text-[#8ba0a2]">Secondary readings from Raceway 1</p>
        </div>
        <button className="text-[10px] font-semibold text-[#3e948b] hover:text-[#1f7069]">View all sensors</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px] text-left">
          <thead>
            <tr className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#94a6a8]">
              <th className="px-5 py-3 font-semibold">Parameter</th>
              <th className="px-4 py-3 font-semibold">Sensor</th>
              <th className="px-4 py-3 font-semibold">Reading</th>
              <th className="px-5 py-3 text-right font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {conditions.map((condition) => (
              <tr key={condition.name} className="border-t border-[#eff3f3] text-[11px] text-[#536d70] transition hover:bg-[#f8fbfa]">
                <td className="px-5 py-3.5">
                  <span className="mr-2.5 inline-block h-2 w-2 rounded-full" style={{ backgroundColor: condition.color }} />
                  <span className="font-medium text-[#294f55]">{condition.name}</span>
                </td>
                <td className="px-4 py-3.5 font-mono text-[10px] text-[#8ba0a2]">{condition.sensor}</td>
                <td className="px-4 py-3.5 font-semibold text-[#294f55]">{condition.value}</td>
                <td className="px-5 py-3.5 text-right">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eaf7f1] px-2 py-1 text-[9px] font-semibold text-[#43866f]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#55aa8c]" /> {condition.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function InsightCard() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-[#cce3df] bg-[#eaf5f2] p-5 shadow-[0_8px_28px_rgba(27,71,78,0.045)]">
      <div className="absolute -right-12 -top-16 h-40 w-40 rounded-full bg-[#75cabd]/10" />
      <div className="relative">
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#d6ebe6] text-[#2e8178]">
            <AutoAwesomeRoundedIcon sx={{ fontSize: 17 }} />
          </div>
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#4e928a]">Nano intelligence</p>
            <h2 className="text-sm font-semibold text-[#183f46]">AI operational insight</h2>
          </div>
        </div>

        <p className="mt-4 text-xs leading-5 text-[#42666a]">
          Raceway 1 is stable. Dissolved oxygen is trending toward the lower threshold and may reach <strong className="font-semibold text-[#214e53]">6.5 mg/L by 16:00</strong> if the current pattern continues.
        </p>

        <div className="mt-4 rounded-xl border border-white/80 bg-white/70 p-3">
          <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#869d9e]">Recommended action</p>
          <p className="mt-1.5 text-[11px] leading-4 text-[#365d61]">Increase aerator output to 65% for the next two hours, then reassess.</p>
        </div>

        <button className="mt-4 flex items-center gap-1 text-[10px] font-bold text-[#2b7e76] transition hover:gap-2 hover:text-[#175d57]">
          Review recommendation <ArrowForwardRoundedIcon sx={{ fontSize: 15 }} />
        </button>
      </div>
    </section>
  );
}

function ActivityFeed() {
  return (
    <section className="rounded-2xl border border-[#dfe8e8] bg-white p-5 shadow-[0_8px_28px_rgba(27,71,78,0.045)]">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-sm font-semibold text-[#183f46]">Recent activity</h2>
          <p className="mt-1 text-[10px] text-[#8ba0a2]">Live operational timeline</p>
        </div>
        <button className="text-[10px] font-semibold text-[#3e948b]">View all</button>
      </div>
      <div className="mt-5">
        {events.map((event, index) => {
          const isWarning = event.type === "warning";
          return (
            <div key={event.title} className="relative flex gap-3 pb-5 last:pb-0">
              {index !== events.length - 1 && <span className="absolute left-[11px] top-6 h-[calc(100%-8px)] w-px bg-[#e3ebeb]" />}
              <div
                className={`relative z-10 mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full ${
                  isWarning ? "bg-[#fff0d8] text-[#c18225]" : "bg-[#e8f5f0] text-[#4d987d]"
                }`}
              >
                {isWarning ? <WarningAmberRoundedIcon sx={{ fontSize: 13 }} /> : <CheckCircleRoundedIcon sx={{ fontSize: 13 }} />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold leading-4 text-[#31565b]">{event.title}</p>
                <p className="mt-0.5 text-[9px] leading-4 text-[#899d9f]">{event.detail}</p>
                <p className="mt-1 text-[9px] font-medium text-[#acb9ba]">{event.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function RacewayDashboardV2() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [period, setPeriod] = useState<Period>("24h");
  const [activeMetrics, setActiveMetrics] = useState<MetricKey[]>(["temperature", "oxygen"]);
  const [refreshedAt, setRefreshedAt] = useState("just now");

  useEffect(() => {
    const timer = window.setInterval(() => setRefreshedAt("just now"), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const toggleMetric = (metric: MetricKey) => {
    setActiveMetrics((current) => {
      if (current.includes(metric)) {
        return current.length === 1 ? current : current.filter((item) => item !== metric);
      }
      return [...current, metric];
    });
  };

  const chartData = useMemo<ChartData<"line">>(() => {
    const labels: Record<MetricKey, string> = {
      temperature: "Temperature",
      ph: "pH level",
      oxygen: "Dissolved oxygen",
      salinity: "Salinity",
    };

    return {
      labels: series[period].labels,
      datasets: activeMetrics.map((key) => ({
        label: labels[key],
        data: series[period].values[key],
        borderColor: palette[key],
        backgroundColor: `${palette[key]}14`,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 3,
        pointHoverBackgroundColor: "#ffffff",
        tension: 0.42,
        fill: activeMetrics.length === 1,
      })),
    };
  }, [activeMetrics, period]);

  const chartOptions = useMemo<ChartOptions<"line">>(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      interaction: { intersect: false, mode: "index" },
      animation: { duration: 500 },
      scales: {
        x: {
          border: { display: false },
          grid: { display: false },
          ticks: { color: "#91a3a5", font: { size: 9 }, maxRotation: 0 },
        },
        y: {
          border: { display: false },
          grid: { color: "#edf2f2" },
          ticks: { color: "#91a3a5", font: { size: 9 }, padding: 8 },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#163a41",
          titleColor: "#b9cecf",
          bodyColor: "#ffffff",
          padding: 10,
          cornerRadius: 8,
          displayColors: true,
          boxWidth: 7,
          boxHeight: 7,
          bodyFont: { size: 10 },
          titleFont: { size: 9 },
        },
      },
    }),
    [],
  );

  return (
    <div className="min-h-screen bg-[#f4f8f7] font-sans text-[#294f55]">
      <Sidebar open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      <div className="min-w-0 lg:pl-[252px]">
        <header className="sticky top-0 z-30 flex h-[68px] items-center justify-between border-b border-[#dee8e7] bg-white/95 px-4 backdrop-blur md:px-7 xl:px-9">
          <div className="flex min-w-0 items-center gap-3">
            <button
              aria-label="Open navigation"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[#dfe8e8] text-[#45686c] lg:hidden"
              onClick={() => setMobileNavOpen(true)}
            >
              <MenuRoundedIcon fontSize="small" />
            </button>
            <div className="hidden text-[11px] text-[#8ba0a2] sm:block">
              <Link href="/nanoairs/dashboard" className="transition hover:text-[#2f8b83]">Dashboard</Link>
              <span className="mx-2 text-[#bdc9c9]">/</span>
              <span className="font-semibold text-[#31565b]">Raceway 1</span>
            </div>
            <div className="sm:hidden">
              <p className="text-xs font-semibold text-[#21484e]">Raceway 1</p>
              <p className="text-[9px] text-[#91a3a5]">Live overview</p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <label className="hidden h-9 w-52 items-center gap-2 rounded-xl border border-[#e1e9e9] bg-[#f8faf9] px-3 lg:flex">
              <SearchRoundedIcon sx={{ fontSize: 18, color: "#8da1a3" }} />
              <input className="min-w-0 flex-1 bg-transparent text-[10px] text-[#365b60] outline-none placeholder:text-[#9aabad]" placeholder="Search sensors, reports..." />
              <span className="rounded border border-[#dce6e5] bg-white px-1.5 py-0.5 text-[8px] text-[#94a6a8]">⌘ K</span>
            </label>
            <button aria-label="Search" className="grid h-9 w-9 place-items-center rounded-xl border border-[#e1e9e9] text-[#607a7d] lg:hidden">
              <SearchRoundedIcon sx={{ fontSize: 19 }} />
            </button>
            <button aria-label="Notifications" className="relative grid h-9 w-9 place-items-center rounded-xl border border-[#e1e9e9] text-[#607a7d] transition hover:bg-[#f5f9f8]">
              <NotificationsNoneRoundedIcon sx={{ fontSize: 19 }} />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#e98965] ring-2 ring-white" />
            </button>
            <div className="hidden h-6 w-px bg-[#e2e9e9] sm:block" />
            <div className="hidden items-center gap-2.5 sm:flex">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-[#d8ede9] text-[10px] font-bold text-[#2c6f69]">RM</div>
              <div className="hidden xl:block">
                <p className="text-[10px] font-semibold text-[#31565b]">Roy Mendoza</p>
                <p className="text-[9px] text-[#91a3a5]">Administrator</p>
              </div>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 md:px-7 xl:px-9 xl:py-7">
          <div className="mx-auto max-w-[1600px]">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="text-[24px] font-semibold tracking-[-0.045em] text-[#173e45] sm:text-[28px]">Raceway 1</h1>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e5f5ee] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.08em] text-[#3b876f]">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#54ad8c]" /> Live
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-[#82999b]">A clear view of water quality, sensor health, and operating conditions.</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button className="flex h-9 items-center gap-2 rounded-xl border border-[#dbe6e5] bg-white px-3 text-[10px] font-semibold text-[#4b6c70] shadow-sm transition hover:bg-[#f8fbfa]">
                  <CalendarMonthRoundedIcon sx={{ fontSize: 16 }} /> Aug 27, 2026
                </button>
                <button className="flex h-9 items-center gap-2 rounded-xl bg-[#173f46] px-3.5 text-[10px] font-semibold text-white shadow-[0_5px_16px_rgba(23,63,70,0.18)] transition hover:bg-[#24545b]">
                  <FileDownloadOutlinedIcon sx={{ fontSize: 16 }} /> Export report
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {metricCards.map((card) => (
                <MetricCard key={card.key} card={card} active={activeMetrics.includes(card.key)} onClick={() => toggleMetric(card.key)} />
              ))}
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_250px]">
              <section className="min-w-0 rounded-2xl border border-[#dfe8e8] bg-white p-5 shadow-[0_8px_28px_rgba(27,71,78,0.045)] sm:p-6">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div>
                    <h2 className="text-sm font-semibold text-[#183f46]">Water quality trends</h2>
                    <p className="mt-1 text-[10px] text-[#8ba0a2]">Select the cards above or the labels below to compare readings.</p>
                  </div>
                  <div className="flex items-center gap-1 rounded-xl border border-[#e2eaea] bg-[#f7faf9] p-1">
                    {(["24h", "7d", "30d"] as Period[]).map((value) => (
                      <button
                        key={value}
                        onClick={() => setPeriod(value)}
                        className={`rounded-lg px-3 py-1.5 text-[9px] font-semibold transition ${
                          period === value ? "bg-white text-[#244e53] shadow-sm" : "text-[#8ca0a2] hover:text-[#4e7073]"
                        }`}
                      >
                        {value === "24h" ? "24 hours" : value === "7d" ? "7 days" : "30 days"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                  {metricCards.map((metric) => {
                    const selected = activeMetrics.includes(metric.key);
                    return (
                      <button
                        key={metric.key}
                        onClick={() => toggleMetric(metric.key)}
                        className={`flex items-center gap-1.5 text-[9px] font-medium transition ${selected ? "text-[#496a6e]" : "text-[#aebbbc]"}`}
                      >
                        <span
                          className="h-2 w-2 rounded-full transition"
                          style={{ backgroundColor: selected ? palette[metric.key] : "#d5dddd" }}
                        />
                        {metric.label}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 h-[260px] sm:h-[290px]">
                  <Line data={chartData} options={chartOptions} />
                </div>
                <div className="mt-2 flex items-center justify-between border-t border-[#edf2f2] pt-3 text-[9px] text-[#95a7a9]">
                  <span>Last refreshed {refreshedAt}</span>
                  <button onClick={() => setRefreshedAt("just now")} className="flex items-center gap-1 font-semibold text-[#4e928b] hover:text-[#236e67]">
                    <TuneRoundedIcon sx={{ fontSize: 13 }} /> Configure chart
                  </button>
                </div>
              </section>
              <HealthScore />
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.8fr)_minmax(270px,0.7fr)]">
              <ConditionsTable />
              <InsightCard />
              <ActivityFeed />
            </div>

            <footer className="mt-6 flex flex-col gap-2 border-t border-[#e0e9e8] py-4 text-[9px] text-[#9babad] sm:flex-row sm:items-center sm:justify-between">
              <span>nanoAIRS Monitoring System · Station online</span>
              <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[#58af8e]" /> All systems synchronized at 09:42 AM</span>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
