"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import type { ChartData, ChartOptions, Plugin } from "chart.js";
import { Line } from "react-chartjs-2";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import WaterRoundedIcon from "@mui/icons-material/WaterRounded";
import OpacityRoundedIcon from "@mui/icons-material/OpacityRounded";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import ThermostatRoundedIcon from "@mui/icons-material/ThermostatRounded";
import BubbleChartRoundedIcon from "@mui/icons-material/BubbleChartRounded";
import WavesRoundedIcon from "@mui/icons-material/WavesRounded";
import AirRoundedIcon from "@mui/icons-material/AirRounded";
import DeviceHubRoundedIcon from "@mui/icons-material/DeviceHubRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import QueryStatsRoundedIcon from "@mui/icons-material/QueryStatsRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import SpeedRoundedIcon from "@mui/icons-material/SpeedRounded";
import AcUnitRoundedIcon from "@mui/icons-material/AcUnitRounded";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

type ParameterKey = "temperature" | "ph" | "salinity" | "do" | "alkalinity" | "co2";
type PeriodKey = "12H" | "24H" | "7D" | "30D";
type StatusTone = "normal" | "warning" | "critical" | "off";

const panelClass =
  "rounded-xl border border-[#24434a] bg-[linear-gradient(145deg,rgba(14,38,47,0.98),rgba(8,28,37,0.98))] shadow-[0_12px_30px_rgba(0,0,0,0.14)]";

const parameterConfig: Record<
  ParameterKey,
  {
    label: string;
    chartLabel: string;
    value: string;
    unit: string;
    status: StatusTone;
    target: string;
    change: string;
    color: string;
    min: number;
    max: number;
    normalMin: number;
    normalMax: number;
    actual: number[];
    forecast: number[];
    spark: number[];
  }
> = {
  temperature: {
    label: "Temperature",
    chartLabel: "Temperature (°C)",
    value: "32.3",
    unit: "°C",
    status: "warning",
    target: "26 – 30 °C",
    change: "↑ 1.2 °C",
    color: "#ac7cff",
    min: 24,
    max: 36,
    normalMin: 26,
    normalMax: 30,
    actual: [27.8, 27.7, 27.7, 27.1, 27.0, 27.3, 27.7, 27.9, 28.1, 28.6, 28.9, 29.2, 28.8, 29.3, 29.5, 29.8, 30.2, 30.7, 30.6, 31.4, 31.4, 31.1, 31.5, 31.4, 31.1],
    forecast: [31.1, 31.6, 31.9, 32.2, 32.2, 32.3, 33.1, 32.5, 32.2, 32.0, 31.9, 31.7, 31.4, 31.2, 30.9, 30.6, 30.3, 30.0, 29.8],
    spark: [25, 28, 30, 34, 31, 36, 30, 38, 43, 40, 32, 29],
  },
  ph: {
    label: "pH",
    chartLabel: "pH level",
    value: "8.4",
    unit: "",
    status: "warning",
    target: "6.5 – 8.0",
    change: "↑ 0.3",
    color: "#2fa8ff",
    min: 6,
    max: 9,
    normalMin: 6.5,
    normalMax: 8,
    actual: [7.2, 7.3, 7.4, 7.5, 7.4, 7.6, 7.7, 7.6, 7.8, 7.7, 7.9, 8.0, 7.9, 8.0, 8.1, 8.0, 8.2, 8.1, 8.2, 8.3, 8.2, 8.3, 8.4, 8.3, 8.4],
    forecast: [8.4, 8.35, 8.3, 8.3, 8.25, 8.2, 8.15, 8.1, 8.05, 8.0, 7.95, 7.9, 7.85, 7.8, 7.8, 7.75, 7.7, 7.7, 7.65],
    spark: [24, 31, 35, 27, 39, 30, 21, 32, 20, 27, 35, 30],
  },
  salinity: {
    label: "Salinity",
    chartLabel: "Salinity (ppt)",
    value: "24.1",
    unit: "ppt",
    status: "normal",
    target: "15 – 30 ppt",
    change: "↑ 0.6 ppt",
    color: "#2dd4d4",
    min: 10,
    max: 34,
    normalMin: 15,
    normalMax: 30,
    actual: [20, 20.2, 20.4, 20.7, 20.9, 21.1, 21.4, 21.8, 22.1, 22.5, 22.3, 22.7, 23, 23.3, 23.1, 23.5, 23.8, 24, 23.9, 24.2, 24.1, 24.0, 24.2, 24.1, 24.1],
    forecast: [24.1, 24.2, 24.3, 24.3, 24.4, 24.5, 24.5, 24.6, 24.6, 24.7, 24.7, 24.8, 24.8, 24.8, 24.9, 24.9, 25, 25, 25],
    spark: [22, 25, 28, 29, 31, 33, 31, 34, 32, 33, 35, 34],
  },
  do: {
    label: "DO",
    chartLabel: "Dissolved oxygen (mg/L)",
    value: "15.5",
    unit: "mg/L",
    status: "normal",
    target: "> 5 mg/L",
    change: "↑ 0.8 mg/L",
    color: "#46d56a",
    min: 0,
    max: 20,
    normalMin: 5,
    normalMax: 18,
    actual: [14, 14.2, 14.1, 14.5, 14.8, 14.6, 14.9, 15.1, 15, 15.2, 15.4, 15.3, 15.6, 15.4, 15.5, 15.7, 15.6, 15.5, 15.4, 15.7, 15.6, 15.5, 15.6, 15.5, 15.5],
    forecast: [15.5, 15.4, 15.3, 15.2, 15.3, 15.4, 15.3, 15.2, 15.1, 15, 15.1, 15.2, 15.1, 15, 14.9, 15, 15.1, 15, 15],
    spark: [28, 31, 26, 35, 30, 38, 32, 26, 33, 28, 30, 32],
  },
  alkalinity: {
    label: "Alkalinity",
    chartLabel: "Alkalinity (mg/L)",
    value: "11.46",
    unit: "mg/L",
    status: "warning",
    target: "20 – 120 mg/L",
    change: "↓ 1.2 mg/L",
    color: "#f3a334",
    min: 0,
    max: 140,
    normalMin: 20,
    normalMax: 120,
    actual: [28, 27, 26, 27, 24, 23, 21, 22, 19, 18, 17, 19, 16, 15, 14, 16, 13, 12, 13, 12, 11.8, 11.6, 11.5, 11.46, 11.46],
    forecast: [11.46, 11.2, 11, 10.8, 10.5, 10.2, 10, 9.8, 9.5, 9.3, 9, 8.8, 8.6, 8.4, 8.2, 8, 7.8, 7.6, 7.5],
    spark: [40, 39, 36, 33, 35, 28, 32, 24, 26, 18, 16, 15],
  },
  co2: {
    label: "Dissolved CO₂",
    chartLabel: "Dissolved CO₂ (mg/L)",
    value: "8.47",
    unit: "mg/L",
    status: "critical",
    target: "< 5 mg/L",
    change: "↑ 1.7 mg/L",
    color: "#ff5b5f",
    min: 0,
    max: 12,
    normalMin: 0,
    normalMax: 5,
    actual: [4.2, 4.4, 4.5, 4.8, 4.6, 5, 5.2, 5.4, 5.8, 6, 6.2, 6.5, 6.3, 6.8, 7.1, 7.3, 7.2, 7.5, 7.8, 8, 8.2, 8.1, 8.3, 8.4, 8.47],
    forecast: [8.47, 8.5, 8.6, 8.7, 8.8, 8.9, 9, 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 9.8, 9.8, 9.9, 10, 10.1],
    spark: [37, 34, 30, 35, 27, 23, 26, 22, 25, 21, 28, 35],
  },
};

const timeLabels = [
  "12:00 AM", "1:00 AM", "2:00 AM", "3:00 AM", "4:00 AM", "5:00 AM", "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM", "12:00 AM",
];

const forecastLabels = ["1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM", "12:00 AM"];

const periodLabels: Record<PeriodKey, string[]> = {
  "12H": ["12 AM", "2 AM", "4 AM", "6 AM", "8 AM", "10 AM", "Now", "+2h", "+4h", "+6h"],
  "24H": [...timeLabels.filter((_, index) => index % 2 === 0), ...forecastLabels.filter((_, index) => index % 2 === 1)],
  "7D": ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Now", "Thu", "Fri"],
  "30D": ["Jul 29", "Aug 2", "Aug 6", "Aug 10", "Aug 14", "Aug 18", "Aug 22", "Now", "Aug 30"],
};

const navSections = [
  [
    { label: "Dashboard", icon: DashboardRoundedIcon, href: "/nanoairs/dashboard" },
    { label: "Raceways 1", icon: WaterRoundedIcon, href: "/nanoairs/dashboard/v3/raceways-1", active: true },
    { label: "Raceways 2", icon: WaterRoundedIcon, href: "/nanoairs/dashboard/raceways-2" },
    { label: "Control Pond 1", icon: OpacityRoundedIcon, href: "/nanoairs/dashboard/control-pond-1" },
    { label: "Control Pond 2", icon: OpacityRoundedIcon, href: "/nanoairs/dashboard/control-pond-2" },
  ],
  [
    { label: "Users", icon: PeopleAltOutlinedIcon, href: "/nanoairs/dashboard" },
    { label: "Settings", icon: SettingsOutlinedIcon, href: "/nanoairs/dashboard" },
    { label: "Logout", icon: LogoutRoundedIcon, href: "/nanoairs/dashboard" },
  ],
];

const deviceRows: Array<{ name: string; status: string; tone: StatusTone; icon: typeof WaterRoundedIcon }> = [
  { name: "Pump R1", status: "On", tone: "normal", icon: WaterRoundedIcon },
  { name: "Aerator R1", status: "On", tone: "normal", icon: AirRoundedIcon },
  { name: "Flow Sensor R1", status: "Normal", tone: "normal", icon: SpeedRoundedIcon },
  { name: "DO Sensor R1", status: "Normal", tone: "normal", icon: BubbleChartRoundedIcon },
  { name: "pH Sensor R1", status: "Warning", tone: "warning", icon: ScienceOutlinedIcon },
  { name: "CO2 Sensor R1", status: "Critical", tone: "critical", icon: ScienceOutlinedIcon },
  { name: "Cooling Fan R1", status: "Off", tone: "off", icon: AcUnitRoundedIcon },
];

const alertRows = [
  { time: "12:21 PM", title: "pH sensor abnormal", detail: "pH 8.4 exceeds target range", tone: "warning" as const },
  { time: "12:16 PM", title: "Temperature high", detail: "32.3 °C exceeds target range", tone: "warning" as const },
  { time: "12:12 PM", title: "Aerator R1 activated", detail: "Auto mode", tone: "normal" as const },
  { time: "12:07 PM", title: "Alkalinity low", detail: "11.46 mg/L below threshold", tone: "critical" as const },
  { time: "11:58 AM", title: "CO2 level critical", detail: "8.47 mg/L exceeds target", tone: "critical" as const },
  { time: "11:45 AM", title: "Pump R1 turned off", detail: "Manual", tone: "off" as const },
];

const toneStyles: Record<StatusTone, string> = {
  normal: "border-[#1f684f] bg-[#123f35] text-[#62e19a]",
  warning: "border-[#6b4b22] bg-[#4b351d] text-[#ffb84d]",
  critical: "border-[#673033] bg-[#51262b] text-[#ff7171]",
  off: "border-[#354750] bg-[#263842] text-[#b8c3c8]",
};

const dotStyles: Record<StatusTone, string> = {
  normal: "bg-[#61d66f] shadow-[0_0_8px_rgba(97,214,111,0.65)]",
  warning: "bg-[#ffad3d] shadow-[0_0_8px_rgba(255,173,61,0.6)]",
  critical: "bg-[#ff5960] shadow-[0_0_8px_rgba(255,89,96,0.6)]",
  off: "bg-[#9aa9b0] shadow-[0_0_8px_rgba(154,169,176,0.4)]",
};

const nowMarker: Plugin<"line"> = {
  id: "nowMarker",
  afterDraw(chart) {
    const xScale = chart.scales.x;
    const { ctx, chartArea } = chart;
    if (!xScale || !chartArea) return;
    const markerIndex = Math.max(0, Math.round((chart.data.labels?.length ?? 2) * 0.56));
    const x = xScale.getPixelForValue(markerIndex);
    ctx.save();
    ctx.setLineDash([3, 3]);
    ctx.strokeStyle = "rgba(142, 184, 193, 0.55)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, chartArea.top);
    ctx.lineTo(x, chartArea.bottom);
    ctx.stroke();
    ctx.restore();
  },
};

function BrandIcon() {
  return (
    <div className="grid h-8 w-8 place-items-center rounded-full border border-[#52c9bf] text-[#6ad8ce] shadow-[0_0_16px_rgba(82,201,191,0.15)]">
      <WavesRoundedIcon sx={{ fontSize: 19 }} />
    </div>
  );
}

function StatusBadge({ tone, children }: { tone: StatusTone; children: React.ReactNode }) {
  return <span className={`inline-flex min-w-14 justify-center rounded border px-2 py-0.5 text-[10px] font-medium ${toneStyles[tone]}`}>{children}</span>;
}

function Sidebar({ open, close }: { open: boolean; close: () => void }) {
  return (
    <>
      {open && <button aria-label="Close navigation" onClick={close} className="fixed inset-0 z-40 bg-black/65 backdrop-blur-sm lg:hidden" />}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[226px] flex-col border-r border-[#183843] bg-[radial-gradient(circle_at_15%_0%,rgba(30,108,119,0.12),transparent_28%),linear-gradient(180deg,#071923_0%,#061720_100%)] px-4 py-6 text-[#a8bac1] transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center justify-between px-2">
          <Link href="/nanoairs/dashboard" onClick={close} className="flex items-center gap-3 text-white">
            <BrandIcon />
            <span className="text-[15px] font-semibold tracking-[0.01em]">NANO AIRS</span>
          </Link>
          <button aria-label="Close menu" onClick={close} className="grid h-8 w-8 place-items-center rounded-lg hover:bg-white/5 lg:hidden">
            <CloseRoundedIcon sx={{ fontSize: 18 }} />
          </button>
        </div>

        <nav className="flex-1 space-y-4">
          {navSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className={sectionIndex === 1 ? "border-t border-[#1d3942] pt-4" : ""}>
              <div className="space-y-1">
                {section.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      href={link.href}
                      key={link.label}
                      onClick={close}
                      className={`relative flex items-center gap-3 rounded-lg px-3 py-3 text-[12px] transition ${
                        link.active ? "bg-[#17313e] font-semibold text-white shadow-[inset_3px_0_0_#55cfc4]" : "hover:bg-white/[0.035] hover:text-white"
                      }`}
                    >
                      <Icon sx={{ fontSize: 18 }} className={link.active ? "text-[#72dbd1]" : "text-[#8ba0a8]"} />
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-[#1d3942] pt-4">
          <div className="flex items-center gap-3 px-2">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#1b3543] text-xs font-semibold text-white">RM</div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-semibold text-white">ROY M.</p>
              <p className="mt-0.5 truncate text-[9px] text-[#80969e]">Account Settings</p>
            </div>
            <ArrowForwardIosRoundedIcon sx={{ fontSize: 13 }} />
          </div>
          <button className="mt-5 flex h-11 w-full items-center justify-center gap-3 rounded-lg border border-[#2ea99d] bg-[#176b6c] text-[11px] font-semibold text-white shadow-[0_0_20px_rgba(41,172,159,0.12)] transition hover:bg-[#21847f]">
            Download Report <FileDownloadOutlinedIcon sx={{ fontSize: 16 }} />
          </button>
          <div className="mt-28 border-t border-[#1d3942] px-2 pt-4 text-[9px] xl:mt-44">
            <p className="flex items-center gap-2 text-[#a6b8be]">System Status <span className="h-1.5 w-1.5 rounded-full bg-[#61d66f]" /></p>
            <p className="mt-1 text-[#667f87]">All Systems Operational</p>
          </div>
        </div>
      </aside>
    </>
  );
}

function TinySparkline({ values, color, height = 40 }: { values: number[]; color: string; height?: number }) {
  const width = 140;
  const pad = 3;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const points = values.map((value, index) => {
    const x = pad + (index / (values.length - 1)) * (width - pad * 2);
    const y = pad + ((max - value) / range) * (height - pad * 2);
    return `${x},${y}`;
  });
  const area = `${points.join(" ")} ${width - pad},${height} ${pad},${height}`;

  return (
    <svg aria-hidden="true" viewBox={`0 0 ${width} ${height}`} className="h-full w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`spark-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.28" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#spark-${color.replace("#", "")})`} />
      <polyline points={points.join(" ")} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      {points.filter((_, index) => index % 2 === 0).map((point) => {
        const [cx, cy] = point.split(",");
        return <circle key={point} cx={cx} cy={cy} r="1.8" fill={color} />;
      })}
    </svg>
  );
}

function TopStatus() {
  return (
    <section className={`${panelClass} p-3`}>
      <div className="flex flex-col gap-3 px-2 pb-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-[18px] font-semibold tracking-[-0.02em] text-white">Raceway 1</h1>
            <p className="mt-1 text-[10px] text-[#98aeb5]">Overview</p>
          </div>
          <div className="hidden h-10 w-px bg-[#29464e] sm:block" />
          <div className="flex items-center gap-2 rounded-lg border border-[#51472e] bg-[#342e20]/60 px-3 py-2 text-[#ffad45]">
            <WarningAmberRoundedIcon sx={{ fontSize: 20 }} />
            <span className="text-[14px] font-semibold">WARNING</span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 md:justify-end">
          {[
            { value: 2, label: "Critical", tone: "critical" as const },
            { value: 1, label: "Warning", tone: "warning" as const },
            { value: 5, label: "Normal", tone: "normal" as const },
          ].map((item) => (
            <div key={item.label} className="flex h-11 min-w-20 items-center gap-2 rounded-lg border border-[#243f48] bg-[#0b222c] px-2">
              <span className={`grid h-8 w-8 place-items-center rounded-md text-lg font-semibold ${toneStyles[item.tone]}`}>{item.value}</span>
              <span><strong className="block text-xs text-white">{item.value}</strong><small className="block text-[8px] text-[#99adb3]">{item.label}</small></span>
            </div>
          ))}
          <div className="ml-1 min-w-36 px-3">
            <p className="flex items-center gap-2 text-[11px] font-medium text-white"><span className="h-2 w-2 rounded-full bg-[#61d66f]" />Online</p>
            <p className="mt-1 flex items-center gap-1 text-[10px] text-[#859ca3]">Updated 12 sec ago <RefreshRoundedIcon sx={{ fontSize: 14 }} /></p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 rounded-lg border border-[#743439] bg-[linear-gradient(90deg,rgba(78,27,34,0.72),rgba(57,23,29,0.65))] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <WarningAmberRoundedIcon sx={{ fontSize: 20, color: "#ff6868" }} />
          <div>
            <p className="text-[12px] font-semibold text-[#ffe7e7]">Low alkalinity detected. pH stability at risk.</p>
            <p className="mt-1 text-[9px] text-[#e1bfc1]">Immediate attention recommended to prevent potential pH crash.</p>
          </div>
        </div>
        <button className="flex h-8 shrink-0 items-center gap-2 rounded-md border border-[#7f3439] px-3 text-[9px] font-semibold text-white transition hover:bg-[#7f3439]/30">
          View AI Recommendation <ArrowForwardIosRoundedIcon sx={{ fontSize: 10 }} />
        </button>
      </div>
    </section>
  );
}

function AIInsight() {
  return (
    <section className={`${panelClass} p-5`}>
      <div className="mb-4 flex items-center gap-3">
        <AutoAwesomeRoundedIcon sx={{ fontSize: 18, color: "#68d7cc" }} />
        <h2 className="text-[12px] font-semibold text-white">AI Insight</h2>
      </div>
      <div className="grid gap-4 text-[#bdcbd0] md:grid-cols-[1.35fr_0.75fr_0.85fr_0.7fr] md:divide-x md:divide-[#2c464e]">
        <div className="md:pr-4">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-[16px] font-semibold text-white">Low alkalinity detected</h3>
            <StatusBadge tone="critical">High Risk</StatusBadge>
          </div>
          <p className="mt-3 text-[10px] leading-5 text-[#9fb2b8]">Alkalinity has been below the target range for 6 hours.<br />pH stability is compromised.</p>
        </div>
        <div className="md:px-4">
          <p className="text-[11px] font-medium text-white">Impact</p>
          <ul className="mt-2 space-y-2 text-[9px] leading-4">
            <li>• Increased pH crash risk</li>
            <li>• Stress to aquatic organisms</li>
          </ul>
        </div>
        <div className="md:px-4">
          <p className="text-[11px] font-medium text-white">Recommended action</p>
          <div className="mt-3 flex gap-3">
            <ScienceOutlinedIcon sx={{ fontSize: 22, color: "#dcecef" }} />
            <p className="text-[10px] leading-5">Add sodium bicarbonate<br />(10–15 kg)</p>
          </div>
          <button className="mt-2 flex items-center gap-2 text-[10px] text-[#63d2c8]">View details <ArrowForwardIosRoundedIcon sx={{ fontSize: 9 }} /></button>
        </div>
        <div className="flex items-center justify-between gap-4 md:pl-4">
          <div>
            <p className="text-[11px] font-medium text-white">Confidence</p>
            <p className="mt-8 text-[11px] font-medium text-white">Data quality</p>
            <p className="mt-1 text-[9px]">5/6 sensors reliable</p>
          </div>
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[conic-gradient(#56d4c4_0deg,#56d4c4_328deg,#27454d_328deg)] p-1">
            <div className="grid h-full w-full place-items-center rounded-full bg-[#0b252f] text-xs font-semibold text-[#68dfd3]">91%</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrendChart({ selected, setSelected }: { selected: ParameterKey; setSelected: (key: ParameterKey) => void }) {
  const [period, setPeriod] = useState<PeriodKey>("24H");
  const config = parameterConfig[selected];

  const data = useMemo<ChartData<"line">>(() => {
    const labels = periodLabels[period];
    const total = labels.length;
    const split = Math.max(2, Math.round(total * 0.56));
    const sample = (source: number[], count: number) =>
      Array.from({ length: count }, (_, index) => source[Math.min(source.length - 1, Math.round((index / Math.max(1, count - 1)) * (source.length - 1)))]);
    const actualValues = sample(config.actual, split);
    const forecastValues = sample(config.forecast, total - split + 1);

    return {
      labels,
      datasets: [
        {
          label: "Normal maximum",
          data: Array(total).fill(config.normalMax),
          borderColor: "rgba(76, 207, 176, 0.62)",
          borderWidth: 1,
          borderDash: [5, 4],
          pointRadius: 0,
          fill: false,
        },
        {
          label: "Normal minimum",
          data: Array(total).fill(config.normalMin),
          borderColor: "rgba(76, 207, 176, 0.62)",
          borderWidth: 1,
          borderDash: [5, 4],
          pointRadius: 0,
          fill: false,
        },
        {
          label: "Actual",
          data: [...actualValues, ...Array(total - split).fill(null)],
          borderColor: "#3aa7ff",
          backgroundColor: "rgba(58,167,255,0.10)",
          borderWidth: 2,
          pointRadius: 2,
          pointHoverRadius: 4,
          pointBackgroundColor: "#3aa7ff",
          tension: 0.32,
          fill: false,
          spanGaps: false,
        },
        {
          label: "Forecast",
          data: [...Array(split - 1).fill(null), ...forecastValues],
          borderColor: "#3aa7ff",
          borderWidth: 1.5,
          borderDash: [4, 3],
          pointRadius: 0,
          pointHoverRadius: 3,
          tension: 0.35,
          fill: false,
          spanGaps: false,
        },
      ],
    };
  }, [config, period]);

  const options = useMemo<ChartOptions<"line">>(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 350 },
      interaction: { intersect: false, mode: "index" },
      scales: {
        x: {
          border: { color: "#27434b" },
          grid: { display: false },
          ticks: { color: "#8ba2a9", font: { size: 9 }, autoSkip: true, maxTicksLimit: 13, maxRotation: 0 },
        },
        y: {
          min: config.min,
          max: config.max,
          border: { display: false },
          grid: { color: "rgba(53,78,86,0.46)" },
          ticks: { color: "#8ba2a9", font: { size: 9 }, padding: 7, maxTicksLimit: 7 },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#112c37",
          borderColor: "#34515a",
          borderWidth: 1,
          titleColor: "#dce9ec",
          bodyColor: "#b8c9ce",
          padding: 10,
          cornerRadius: 8,
          displayColors: true,
          boxWidth: 7,
          boxHeight: 7,
          filter: (item) => item.dataset.label === "Actual" || item.dataset.label === "Forecast",
        },
      },
    }),
    [config],
  );

  return (
    <section className={`${panelClass} overflow-hidden`}>
      <div className="flex flex-col gap-3 border-b border-[#24414a] px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="mr-2 text-[12px] font-semibold text-white">Parameter Trend</h2>
          <div className="flex max-w-full overflow-x-auto rounded-md border border-[#29464f] bg-[#0b202a]">
            {(Object.keys(parameterConfig) as ParameterKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setSelected(key)}
                className={`whitespace-nowrap border-r border-[#29464f] px-4 py-2 text-[9px] font-medium last:border-r-0 ${
                  selected === key ? "bg-[#176b6c] text-white shadow-[inset_0_0_0_1px_#2ca89e]" : "text-[#aabac0] hover:bg-white/[0.03]"
                }`}
              >
                {key === "co2" ? "CO₂" : parameterConfig[key].label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-md border border-[#29464f] bg-[#0b202a]">
            {(Object.keys(periodLabels) as PeriodKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setPeriod(key)}
                className={`border-r border-[#29464f] px-4 py-2 text-[9px] last:border-r-0 ${period === key ? "bg-[#176b6c] font-semibold text-white" : "text-[#a6b7bc]"}`}
              >
                {key}
              </button>
            ))}
            <button aria-label="Choose date range" className="grid w-10 place-items-center text-[#9db0b6]"><CalendarMonthOutlinedIcon sx={{ fontSize: 15 }} /></button>
          </div>
          <button aria-label="Chart menu" className="text-[#9db0b6]"><MoreVertRoundedIcon sx={{ fontSize: 18 }} /></button>
        </div>
      </div>
      <div className="px-5 pb-3 pt-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-5">
            <p className="text-[10px] font-semibold text-white">{config.chartLabel}</p>
            <span className="flex items-center gap-1.5 text-[9px] text-[#9db0b5]"><span className="h-2 w-2 rounded-full bg-[#3aa7ff]" />Actual</span>
            <span className="flex items-center gap-1.5 text-[9px] text-[#9db0b5]"><span className="w-3 border-t border-dashed border-[#3aa7ff]" />Forecast</span>
            <span className="flex items-center gap-1.5 text-[9px] text-[#9db0b5]"><span className="h-2 w-2 rounded-sm bg-[#1b4b47]" />Normal Range</span>
          </div>
          <div className="text-right text-[9px] text-[#66d8ca]">
            <p>Normal Max <strong>{config.normalMax}</strong></p>
            <p className="mt-8 hidden sm:block">Normal Min <strong>{config.normalMin}</strong></p>
          </div>
        </div>
        <div className="mt-1 h-[195px] sm:h-[210px]">
          <Line data={data} options={options} plugins={[nowMarker]} />
        </div>
      </div>
    </section>
  );
}

function ParameterCard({ parameter, selected, onSelect }: { parameter: ParameterKey; selected: boolean; onSelect: () => void }) {
  const config = parameterConfig[parameter];
  const Icon = parameter === "temperature" ? ThermostatRoundedIcon : parameter === "ph" ? OpacityRoundedIcon : parameter === "salinity" ? BubbleChartRoundedIcon : parameter === "do" ? AirRoundedIcon : ScienceOutlinedIcon;
  const positive = config.change.startsWith("↑") && config.status !== "critical";

  return (
    <button
      onClick={onSelect}
      className={`min-w-0 rounded-xl border bg-[linear-gradient(155deg,#0f2a34,#0a202a)] p-3 text-left shadow-[0_10px_22px_rgba(0,0,0,0.12)] transition hover:-translate-y-0.5 ${selected ? "border-[#55cfc4] ring-1 ring-[#55cfc4]/25" : "border-[#27454e]"}`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full" style={{ backgroundColor: `${config.color}24`, color: config.color }}><Icon sx={{ fontSize: 16 }} /></span>
          <p className="truncate text-[10px] font-medium text-white">{config.label}</p>
        </div>
        <MoreHorizRoundedIcon sx={{ fontSize: 17, color: "#b1c1c6" }} />
      </div>
      <p className="mt-3 whitespace-nowrap text-[20px] font-semibold tracking-[-0.03em] text-white">{config.value} <span className="text-[12px]">{config.unit}</span></p>
      <div className="mt-2"><StatusBadge tone={config.status}>{config.status[0].toUpperCase() + config.status.slice(1)}</StatusBadge></div>
      <p className="mt-2 truncate text-[9px] text-[#a1b3b8]">Target: {config.target}</p>
      <div className="mt-2 h-12"><TinySparkline values={config.spark} color={config.color} height={48} /></div>
      <div className="mt-1 h-px" style={{ backgroundColor: config.color, opacity: 0.8 }} />
      <div className="mt-3 flex items-center justify-between gap-2">
        <span className={`whitespace-nowrap text-[10px] font-medium ${positive ? "text-[#55dcc1]" : config.status === "critical" ? "text-[#ff6268]" : "text-[#f6a740]"}`}>{config.change}</span>
        <span className="whitespace-nowrap text-[8px] text-[#768e95]">vs 12h ago</span>
      </div>
    </button>
  );
}

function DeviceHealth() {
  return (
    <section className={`${panelClass} p-4`}>
      <div className="flex items-center gap-3">
        <DeviceHubRoundedIcon sx={{ fontSize: 18, color: "#67d7cc" }} />
        <h2 className="text-[12px] font-semibold text-white">Device Health</h2>
      </div>
      <div className="mt-4">
        <div className="grid grid-cols-[1fr_92px] border-b border-[#304951] px-1 pb-2 text-[8px] uppercase text-[#81979e]"><span>Device</span><span>Status</span></div>
        {deviceRows.map((device) => {
          const Icon = device.icon;
          return (
            <div key={device.name} className="grid grid-cols-[1fr_92px] items-center border-b border-[#253f47] px-1 py-2 last:border-b-0">
              <div className="flex items-center gap-2.5 text-[10px] text-[#c1ced2]"><span className="grid h-6 w-6 place-items-center rounded-md bg-[#1a3541] text-[#c2d2d6]"><Icon sx={{ fontSize: 14 }} /></span>{device.name}</div>
              <div><StatusBadge tone={device.tone}>{device.status}</StatusBadge></div>
            </div>
          );
        })}
      </div>
      <button className="mt-3 flex w-full items-center justify-end gap-1 text-[9px] font-medium text-[#62d7ce]">View all devices <ArrowForwardIosRoundedIcon sx={{ fontSize: 8 }} /></button>
    </section>
  );
}

function AlertsAndEvents() {
  return (
    <section className={`${panelClass} p-4`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3"><NotificationsNoneRoundedIcon sx={{ fontSize: 18, color: "#d5e1e4" }} /><h2 className="text-[12px] font-semibold text-white">Alerts &amp; Events</h2></div>
        <button className="text-[9px] text-[#61d2ca]">View all</button>
      </div>
      <div className="mt-4">
        {alertRows.map((alert, index) => (
          <div key={`${alert.time}-${alert.title}`} className="relative grid grid-cols-[78px_1fr] gap-2 pb-3 last:pb-0">
            {index !== alertRows.length - 1 && <span className="absolute left-[7px] top-4 h-[calc(100%-4px)] w-px bg-[#38515a]" />}
            <div className="flex items-start gap-3 text-[9px] text-[#9baeb4]"><span className={`relative z-10 mt-1 h-2 w-2 shrink-0 rounded-full ring-4 ring-[#122c35] ${dotStyles[alert.tone]}`} />{alert.time}</div>
            <div>
              <p className="text-[10px] font-semibold text-[#dbe6e9]">{alert.title}</p>
              <p className="mt-1 text-[9px] text-[#93a8ae]">{alert.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PredictiveTrends() {
  const trends = [
    { icon: ThermostatRoundedIcon, color: "#aa77f4", title: <>Temp may reach <strong className="text-[#bd96ff]">33.1 °C</strong> in 2h</>, detail: "High risk if above 32 °C", values: [21, 22, 25, 29, 33, 36, 39, 38, 39, 37, 35, 31] },
    { icon: ScienceOutlinedIcon, color: "#f1a23a", title: <>Alkalinity likely to remain<br />below threshold without intervention</>, detail: "", values: [40, 39, 38, 34, 31, 27, 23, 20, 17, 15, 14, 14] },
  ];
  return (
    <section className={`${panelClass} p-4`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3"><QueryStatsRoundedIcon sx={{ fontSize: 18, color: "#d5e1e4" }} /><h2 className="text-[12px] font-semibold text-white">Predictive Trends</h2></div>
        <button className="text-[9px] text-[#61d2ca]">View details ↗</button>
      </div>
      <div className="mt-3 divide-y divide-[#263f48]">
        {trends.map((trend, index) => {
          const Icon = trend.icon;
          return (
            <div key={index} className="grid grid-cols-[1fr_145px] gap-3 py-3 first:pt-1">
              <div className="flex gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full" style={{ backgroundColor: `${trend.color}2b`, color: trend.color }}><Icon sx={{ fontSize: 18 }} /></span>
                <div><p className="text-[9px] leading-4 text-[#d0dcdf]">{trend.title}</p>{trend.detail && <p className="mt-1 text-[8px] text-[#82979e]">{trend.detail}</p>}</div>
              </div>
              <div>
                <div className="h-10 border-b border-l border-[#29434b]"><TinySparkline values={trend.values} color={trend.color} height={40} /></div>
                <div className="mt-1 flex justify-between text-[8px] text-[#869ba2]"><span>Now</span><span>{index === 0 ? "+6h" : "+24h"}</span></div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function RacewayDashboardV3() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [selectedParameter, setSelectedParameter] = useState<ParameterKey>("temperature");

  return (
    <div className="min-h-screen bg-[#061720] font-sans text-[#b8c8cd]">
      <Sidebar open={mobileNavOpen} close={() => setMobileNavOpen(false)} />
      <div className="min-w-0 lg:pl-[226px]">
        <div className="flex h-14 items-center justify-between border-b border-[#1c3841] px-4 lg:hidden">
          <button aria-label="Open navigation" onClick={() => setMobileNavOpen(true)} className="grid h-9 w-9 place-items-center rounded-lg border border-[#27444d] text-white"><MenuRoundedIcon sx={{ fontSize: 20 }} /></button>
          <div className="flex items-center gap-2 text-xs font-semibold text-white"><BrandIcon />NANO AIRS</div>
          <span className="h-2 w-2 rounded-full bg-[#61d66f]" />
        </div>

        <main className="p-3 xl:p-3">
          <div className="grid gap-3 2xl:grid-cols-[minmax(0,1fr)_400px]">
            <div className="min-w-0 space-y-3">
              <TopStatus />
              <AIInsight />
              <TrendChart selected={selectedParameter} setSelected={setSelectedParameter} />
              <section className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6">
                {(Object.keys(parameterConfig) as ParameterKey[]).map((key) => (
                  <ParameterCard key={key} parameter={key} selected={selectedParameter === key} onSelect={() => setSelectedParameter(key)} />
                ))}
              </section>
            </div>

            <aside className="grid content-start gap-3 md:grid-cols-2 2xl:grid-cols-1">
              <DeviceHealth />
              <AlertsAndEvents />
              <div className="md:col-span-2 2xl:col-span-1"><PredictiveTrends /></div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
