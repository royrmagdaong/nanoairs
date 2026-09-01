"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import type { ChartData, ChartOptions } from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import WaterRoundedIcon from "@mui/icons-material/WaterRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Filler, Tooltip, Legend);

type Metric = {
  title: string;
  value: number;
  displayValue: string;
  average: string;
  units: string;
  color: string;
  min: number;
  max: number;
};

const metrics: Metric[] = [
  { title: "Temperature", value: 31.56, displayValue: "31.56", average: "32.21", units: "°C", color: "#c242d7", min: 10, max: 50 },
  { title: "pH", value: 8.13, displayValue: "8.13", average: "8.1", units: "", color: "#e2373e", min: 1, max: 12 },
  { title: "Salinity", value: 24.55, displayValue: "24.55", average: "24.15", units: "ppt", color: "#f4a62f", min: 0, max: 35 },
  { title: "Dissolved Oxygen", value: 20.14, displayValue: "20.14", average: "20.5", units: "mg/L", color: "#31bce5", min: 0, max: 30 },
  { title: "Alkalinity", value: 17.23, displayValue: "17.23", average: "16.5", units: "mg/L", color: "#6558d8", min: 0, max: 30 },
  { title: "Dissolved CO2", value: 4.25, displayValue: "4.25", average: "5.5", units: "mg/L", color: "#72c86c", min: 0, max: 30 },
];

const activityRows = [
  ["Nano-bubble Generator", "On", "Aug 19, 10:01 AM"],
  ["Pump 1", "On", "Aug 19, 09:15 AM"],
  ["DO Sensor R1", "Danger", "Aug 19, 09:12 AM"],
  ["pH Sensor R1", "Warning", "Aug 19, 09:00 AM"],
  ["Sal Sensor R1", "Low", "Aug 19, 08:57 AM"],
  ["Temp Sensor R1", "Normal", "Aug 19, 08:35 AM"],
  ["Pump 2", "Off", "Aug 19, 08:34 AM"],
  ["Pump 3", "On", "Aug 19, 08:16 AM"],
  ["Sal Sensor R2", "Normal", "Aug 19, 07:15 AM"],
  ["DO Sensor R2", "Normal", "Aug 19, 07:15 AM"],
  ["pH Sensor R2", "Normal", "Aug 19, 07:15 AM"],
  ["Temp Sensor R2", "Normal", "Aug 19, 07:15 AM"],
];

const navGroups = [
  [
    { label: "Dashboard", icon: DashboardRoundedIcon, href: "/nanoairs/dashboard" },
    { label: "Raceways 1", icon: WaterRoundedIcon, href: "/nanoairs/dashboard/v1/raceways-1", active: true, nested: true },
    { label: "Raceways 2", icon: WaterRoundedIcon, href: "/nanoairs/dashboard/raceways-2", nested: true },
    { label: "Control Pond 1", icon: WaterRoundedIcon, href: "/nanoairs/dashboard/control-pond-1", nested: true },
    { label: "Control Pond 2", icon: WaterRoundedIcon, href: "/nanoairs/dashboard/control-pond-2", nested: true },
  ],
  [{ label: "Users", icon: PeopleAltRoundedIcon, href: "/nanoairs/dashboard" }],
  [{ label: "Settings", icon: SettingsRoundedIcon, href: "/nanoairs/dashboard" }],
];

function NanoLogo() {
  return (
    <div className="relative h-7 w-7 shrink-0">
      <span className="absolute left-1 top-1 h-4 w-4 rounded-[5px] bg-[#ce2be0]" />
      <span className="absolute left-2.5 top-0 h-4 w-4 rounded-[5px] bg-[#31bee8]" />
      <span className="absolute left-2.5 top-2 h-2.5 w-2.5 rounded-[4px] bg-[#635fe9]" />
    </div>
  );
}

function Sidebar({ open, close }: { open: boolean; close: () => void }) {
  return (
    <>
      {open && <button aria-label="Close navigation" onClick={close} className="fixed inset-0 z-40 bg-black/30 lg:hidden" />}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[226px] flex-col border-r border-[#dedee1] bg-white px-5 py-6 text-[#57575b] shadow-[4px_0_10px_rgba(0,0,0,0.06)] transition-transform duration-300 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between">
          <Link href="/nanoairs/dashboard" onClick={close} className="flex items-center gap-2">
            <NanoLogo />
            <span className="text-[16px] font-semibold tracking-[0.02em] text-[#45454a]">NANO AIRS</span>
          </Link>
          <button aria-label="Close menu" onClick={close} className="grid h-8 w-8 place-items-center lg:hidden"><CloseRoundedIcon sx={{ fontSize: 18 }} /></button>
          <span className="hidden text-[11px] text-[#777] lg:block">‹ ›</span>
        </div>

        <label className="mt-7 flex h-9 items-center gap-2 rounded-sm border border-[#dfdfe2] px-3 shadow-[0_2px_4px_rgba(0,0,0,0.12)]">
          <SearchRoundedIcon sx={{ fontSize: 15, color: "#555" }} />
          <input aria-label="Search" placeholder="Search for..." className="min-w-0 flex-1 bg-transparent text-[9px] outline-none placeholder:text-[#535359]" />
        </label>

        <nav className="mt-6 flex-1">
          {navGroups.map((group, groupIndex) => (
            <div key={groupIndex} className={groupIndex ? "mt-5" : ""}>
              {group.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={close}
                    className={`relative flex h-[34px] items-center gap-2 rounded-sm py-2 text-[11px] transition hover:bg-[#f6f6f7] ${
                      item.active ? "bg-[#f4f4f5] font-semibold text-[#323237] before:absolute before:inset-y-0 before:left-0 before:w-[2px] before:bg-[#35bee2]" : item.label === "Dashboard" ? "text-[#32b9df]" : ""
                    } ${item.nested ? "pl-3" : ""}`}
                  >
                    {!item.nested && <Icon sx={{ fontSize: 14 }} />}
                    <span>{item.label}</span>
                    {!item.nested && <KeyboardArrowDownRoundedIcon className="ml-auto" sx={{ fontSize: 13 }} />}
                  </Link>
                );
              })}
            </div>
          ))}

          <div className="mt-5 flex items-center gap-3 py-2">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-[linear-gradient(145deg,#4bc4e4,#8966d8)] text-[10px] font-bold text-white">RM</div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold text-[#46464a]">Roy M.</p>
              <p className="text-[8px] text-[#66666a]">Account Settings</p>
            </div>
            <KeyboardArrowRightRoundedIcon sx={{ fontSize: 14 }} />
          </div>
        </nav>

        <button className="mb-[278px] flex h-10 w-full items-center justify-center gap-1 rounded-[3px] bg-[#2bb7de] text-[10px] font-semibold text-white shadow-sm transition hover:bg-[#20a8ce] xl:mb-[286px]">
          Download Reports <FileDownloadOutlinedIcon sx={{ fontSize: 14 }} />
        </button>
      </aside>
    </>
  );
}

function StatusTag({ status }: { status: string }) {
  const className = status === "Danger" || status === "Off"
    ? "border-[#efb9bf] bg-[#f9dfe2] text-[#d75e69]"
    : status === "Warning"
      ? "border-[#f2d7ad] bg-[#fff0d5] text-[#d79a36]"
      : status === "Low"
        ? "border-[#d3d7c7] bg-[#e8ebe1] text-[#8e9784]"
        : "border-[#b8e4cf] bg-[#d9f4e5] text-[#39a96d]";
  return <span className={`inline-flex min-w-10 justify-center rounded-sm border px-2 py-0.5 text-[8px] ${className}`}>{status}</span>;
}

function ActivityLogs() {
  return (
    <section className="h-full overflow-hidden rounded-[7px] border border-[#dedee1] bg-white text-[#55555a]">
      <h2 className="px-4 pb-3 pt-4 text-[12px] font-semibold">Activity Logs</h2>
      <table className="w-full table-fixed">
        <thead>
          <tr className="border-b border-[#dedee1] text-left text-[7px] font-semibold uppercase text-[#66666a]">
            <th className="w-[40%] px-4 py-2">Component</th>
            <th className="w-[27%] px-1 py-2">▣ Status</th>
            <th className="px-1 py-2">▣ Date</th>
          </tr>
        </thead>
        <tbody>
          {activityRows.map(([component, status, date], index) => (
            <tr key={`${component}-${index}`} className={`border-b border-[#e4e4e5] text-[8px] ${index % 2 === 0 ? "bg-[#f6f6f6]" : "bg-white"}`}>
              <td className="px-4 py-[7px] leading-3">{component}</td>
              <td className="px-1 py-[7px]"><StatusTag status={status} /></td>
              <td className="whitespace-nowrap px-1 py-[7px] text-[7px] text-[#707075]">{date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-center gap-2 py-3 text-[8px] text-[#77777b]">
        <button>«</button><button>‹</button>
        {[1, 2, 3, 4, 5].map((page) => <button key={page} className="grid h-5 w-5 place-items-center rounded border border-[#d8d8da] bg-white shadow-sm">{page}</button>)}
        <button>›</button><button>»</button>
      </div>
    </section>
  );
}

function Diagnosis() {
  return (
    <section className="rounded-[7px] border border-[#dedee1] bg-white px-7 py-4 text-[#4c4c51]">
      <h2 className="text-[12px] font-semibold">AI Diagnosis</h2>
      <ul className="mt-1 list-disc pl-3 text-[10px] leading-[18px]">
        <li>Water condition is chemically unstable due to low alkalinity, and DO data is unreliable due to sensor error.</li>
        <li>The farm is not in immediate collapse condition, but if alkalinity is not corrected, pH crash risk is high.</li>
      </ul>
    </section>
  );
}

const baseChartOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { intersect: false, mode: "index" },
  scales: {
    x: {
      border: { display: false },
      grid: { display: false },
      ticks: { color: "#66666a", font: { size: 8 }, maxRotation: 0 },
    },
    y: {
      min: 0,
      max: 60,
      border: { display: false },
      grid: { color: "#e7e7ea" },
      ticks: { color: "#66666a", font: { size: 8 }, stepSize: 10 },
    },
  },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "#ffffff",
      titleColor: "#55555a",
      bodyColor: "#55555a",
      borderColor: "#dedee1",
      borderWidth: 1,
      padding: 10,
      cornerRadius: 7,
      displayColors: false,
    },
  },
};

function LiveBadge() {
  return <span className="inline-flex items-center gap-1 rounded-sm bg-[#dff7e9] px-2 py-1 text-[7px] text-[#43bd7e]"><span className="h-1 w-1 rounded-full bg-[#4cc383]" />Live</span>;
}

function ComparisonChart() {
  const [visible, setVisible] = useState({ kH: false, CO2: false, DO: true, Temp: true, Sal: false, pH: false });
  const mainData = useMemo<ChartData<"line">>(() => ({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Temperature",
        data: [0, 2, 6, 13, 23, 29, 30, 31, 38, 46, 52, 55],
        borderColor: "#c746d9",
        backgroundColor: "rgba(144,120,232,0.18)",
        borderWidth: 1.3,
        pointRadius: 1.7,
        pointHoverRadius: 4,
        pointBackgroundColor: "#c746d9",
        fill: true,
        tension: 0.38,
        hidden: !visible.Temp,
      },
      {
        label: "Dissolved Oxygen",
        data: [12, 16, 10, 8, 13, 23, 24, 19, 35, 43, 29, 20],
        borderColor: "#32bde3",
        backgroundColor: "rgba(50,189,227,0.05)",
        borderWidth: 1.3,
        pointRadius: 1.7,
        pointHoverRadius: 4,
        pointBackgroundColor: "#32bde3",
        fill: false,
        tension: 0.4,
        hidden: !visible.DO,
      },
      { label: "Salinity", data: [14, 16, 18, 22, 28, 30, 31, 29, 27, 25, 24, 25], borderColor: "#f1a43a", borderWidth: 1.3, pointRadius: 1.5, tension: 0.4, hidden: !visible.Sal },
      { label: "pH", data: [8, 9, 8, 8, 9, 8, 8, 9, 8, 8, 8, 8], borderColor: "#df4b43", borderWidth: 1.3, pointRadius: 1.5, tension: 0.4, hidden: !visible.pH },
      { label: "kH", data: [16, 18, 19, 21, 24, 27, 25, 24, 23, 21, 20, 19], borderColor: "#6056d9", borderWidth: 1.3, pointRadius: 1.5, tension: 0.4, hidden: !visible.kH },
      { label: "CO2", data: [5, 6, 7, 6, 8, 10, 9, 7, 6, 7, 6, 5], borderColor: "#72c76e", borderWidth: 1.3, pointRadius: 1.5, tension: 0.4, hidden: !visible.CO2 },
    ],
  }), [visible]);

  const doData: ChartData<"bar"> = {
    labels: Array.from({ length: 24 }, (_, index) => `${index}`),
    datasets: [{ data: [7, 8, 6, 8, 4, 9, 7, 12, 8, 10, 7, 11, 8, 6, 9, 7, 10, 6, 11, 8, 9, 7, 10, 11], backgroundColor: "rgba(49,185,221,0.82)", barThickness: 3 }],
  };
  const temperatureData: ChartData<"line"> = {
    labels: ["12 AM", "2 AM", "4 AM", "6 AM", "8 AM", "10 AM", "12 PM", "2 PM", "4 PM", "6 PM", "8 PM", "11 PM"],
    datasets: [{ data: [25, 80, 35, 170, 55, 25, 120, 410, 40, 35, 180, 30], borderColor: "#c34bd8", backgroundColor: "rgba(195,75,216,0.12)", borderWidth: 1.2, pointRadius: 1.6, tension: 0, fill: false }],
  };
  const smallOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { border: { display: false }, grid: { color: "#eeeeef" }, ticks: { color: "#707075", font: { size: 6 }, maxTicksLimit: 4, maxRotation: 0 } },
      y: { min: 0, max: 500, border: { display: false }, grid: { color: "#eeeeef" }, ticks: { color: "#707075", font: { size: 6 }, maxTicksLimit: 3 } },
    },
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
  };
  const barOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { border: { display: false }, grid: { display: false }, ticks: { color: "#707075", font: { size: 6 }, callback: (_, index) => index === 0 ? "12 AM" : index === 8 ? "8 AM" : index === 16 ? "4 PM" : index === 23 ? "11 PM" : "" } },
      y: { display: false, min: 0, max: 14 },
    },
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
  };

  const toggle = (key: keyof typeof visible) => setVisible((current) => {
    const enabled = Object.values(current).filter(Boolean).length;
    if (current[key] && enabled === 1) return current;
    return { ...current, [key]: !current[key] };
  });

  const legendColors: Record<keyof typeof visible, string> = { kH: "#6056d9", CO2: "#72c76e", DO: "#32bde3", Temp: "#c746d9", Sal: "#f1a43a", pH: "#df4b43" };

  return (
    <section className="grid min-h-[420px] overflow-hidden rounded-[7px] border border-[#dedee1] bg-white md:grid-cols-[minmax(0,1fr)_270px]">
      <div className="min-w-0 border-b border-[#dedee1] px-7 py-7 md:border-b-0 md:border-r">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <h2 className="text-[13px] font-medium leading-[15px] tracking-[0.08em] text-[#4e4e53]">Parameters<br />Comparison</h2>
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            {(Object.keys(visible) as Array<keyof typeof visible>).map((key) => (
              <button key={key} onClick={() => toggle(key)} className={`flex items-center gap-1 text-[7px] ${visible[key] ? "text-[#424247]" : "text-[#999] line-through"}`}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: legendColors[key] }} />{key}
              </button>
            ))}
          </div>
          <button className="flex h-7 shrink-0 items-center gap-2 rounded border border-[#d9d9dc] px-2 text-[7px] text-[#525257] shadow-sm">
            <CalendarMonthRoundedIcon sx={{ fontSize: 11 }} />Jan 2024 - Dec 2024<KeyboardArrowDownRoundedIcon sx={{ fontSize: 12 }} />
          </button>
        </div>
        <div className="mt-7 h-[280px]"><Line data={mainData} options={baseChartOptions} /></div>
      </div>

      <div className="grid grid-rows-2 divide-y divide-[#dedee1]">
        <div className="flex min-h-0 flex-col px-5 pb-3 pt-4">
          <p className="flex items-center gap-2 text-[8px] text-[#626267]"><BoltRoundedIcon sx={{ fontSize: 12, color: "#aaa" }} />12 hours window</p>
          <div className="mt-1 flex items-center gap-3"><strong className="text-[19px] font-semibold text-[#55555a]">8.01 mg/L</strong><span className="flex items-center gap-1 rounded-sm bg-[#dff6e8] px-1.5 py-0.5 text-[7px] text-[#44b87a]">3.1% <ArrowOutwardRoundedIcon sx={{ fontSize: 10 }} /></span></div>
          <div className="mt-2 min-h-0 flex-1"><Bar data={doData} options={barOptions} /></div>
          <div className="mt-2 flex items-center justify-between border-t border-[#e8e8e9] pt-2"><span className="flex items-center gap-2"><LiveBadge /><span className="text-[8px] text-[#66666a]">Dissolved Oxygen</span></span><button className="text-[8px] text-[#37bfdf]">View report</button></div>
        </div>
        <div className="flex min-h-0 flex-col px-5 pb-3 pt-4">
          <p className="flex items-center gap-2 text-[8px] text-[#626267]"><BoltRoundedIcon sx={{ fontSize: 12, color: "#aaa" }} />12 hours window</p>
          <div className="mt-1 flex items-center gap-3"><strong className="text-[19px] font-semibold text-[#55555a]">32.2 °C</strong><span className="flex items-center gap-1 rounded-sm bg-[#dff6e8] px-1.5 py-0.5 text-[7px] text-[#44b87a]">3.1% <ArrowOutwardRoundedIcon sx={{ fontSize: 10 }} /></span></div>
          <div className="mt-2 min-h-0 flex-1"><Line data={temperatureData} options={smallOptions} /></div>
          <div className="mt-2 flex items-center justify-between border-t border-[#e8e8e9] pt-2"><span className="flex items-center gap-2"><LiveBadge /><span className="text-[8px] text-[#66666a]">Temperature</span></span><button className="text-[8px] text-[#37bfdf]">View report</button></div>
        </div>
      </div>
    </section>
  );
}

function Gauge({ value, min, max }: Pick<Metric, "value" | "min" | "max">) {
  const percent = Math.max(0, Math.min(1, (value - min) / (max - min)));
  const angle = Math.PI * (1 - percent);
  const x = 80 + Math.cos(angle) * 47;
  const y = 72 - Math.sin(angle) * 47;

  return (
    <svg viewBox="0 0 160 84" className="h-[70px] w-full" aria-hidden="true">
      <path d="M18 72 A62 62 0 0 1 142 72" pathLength="100" fill="none" stroke="#edf0ea" strokeWidth="18" />
      <path d="M18 72 A62 62 0 0 1 142 72" pathLength="100" fill="none" stroke="#b7c6a8" strokeWidth="18" strokeDasharray="20 80" />
      <path d="M18 72 A62 62 0 0 1 142 72" pathLength="100" fill="none" stroke="#159625" strokeWidth="18" strokeDasharray="49 51" strokeDashoffset="-21" />
      <path d="M18 72 A62 62 0 0 1 142 72" pathLength="100" fill="none" stroke="#f2a62e" strokeWidth="18" strokeDasharray="14 86" strokeDashoffset="-71" />
      <path d="M18 72 A62 62 0 0 1 142 72" pathLength="100" fill="none" stroke="#dd4037" strokeWidth="18" strokeDasharray="14 86" strokeDashoffset="-86" />
      <line x1="80" y1="72" x2={x} y2={y} stroke="#31533f" strokeWidth="3" strokeLinecap="round" />
      <circle cx="80" cy="72" r="6" fill="#31533f" />
    </svg>
  );
}

function SensorMetricCard({ metric }: { metric: Metric }) {
  return (
    <div className="min-w-0 text-[#59595e]">
      <div className="rounded-[7px] border border-[#dedee1] bg-white px-4 pb-3 pt-3 text-center">
        <Gauge value={metric.value} min={metric.min} max={metric.max} />
        <p className="-mt-1 whitespace-nowrap text-[14px] font-semibold">{metric.displayValue} {metric.units}</p>
        <p className="text-[7px] tracking-[0.04em] text-[#707075]">{metric.title}</p>
        <div className="mx-auto mt-2 grid max-w-[112px] grid-cols-2 gap-x-4 gap-y-1 text-left text-[6px]">
          <span className="flex items-center gap-1"><i className="h-1.5 w-1.5 rounded-full bg-[#159625]" />Normal</span>
          <span className="flex items-center gap-1"><i className="h-1.5 w-1.5 rounded-full bg-[#f2a62e]" />Warning</span>
          <span className="flex items-center gap-1"><i className="h-1.5 w-1.5 rounded-full bg-[#b7c6a8]" />Low</span>
          <span className="flex items-center gap-1"><i className="h-1.5 w-1.5 rounded-full bg-[#dd4037]" />Danger</span>
        </div>
      </div>
      <div className="mt-3 rounded-[7px] border border-[#dedee1] bg-white px-3 py-3">
        <div className="flex items-center justify-between gap-1">
          <p className="flex min-w-0 items-center gap-1.5 truncate text-[7px]"><span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: metric.color }} />Average {metric.title === "Dissolved CO2" ? "CO2" : metric.title}</p>
          <MoreHorizRoundedIcon sx={{ fontSize: 12, color: "#777" }} />
        </div>
        <div className="mt-2 flex items-center gap-2">
          <strong className="whitespace-nowrap text-[13px]">{metric.average} {metric.units}</strong>
          <span className="flex items-center gap-1 rounded-sm bg-[#dff6e8] px-1.5 py-0.5 text-[7px] text-[#44b87a]">3.1% <ArrowOutwardRoundedIcon sx={{ fontSize: 9 }} /></span>
        </div>
      </div>
    </div>
  );
}

export default function RacewayDashboardV1() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7f7f9] font-sans text-[#505055]">
      <Sidebar open={mobileNavOpen} close={() => setMobileNavOpen(false)} />
      <div className="min-w-0 lg:pl-[226px]">
        <header className="flex h-[72px] items-center justify-between px-5 lg:px-6">
          <div className="flex items-center gap-3">
            <button aria-label="Open navigation" onClick={() => setMobileNavOpen(true)} className="grid h-9 w-9 place-items-center rounded border border-[#dedee1] bg-white lg:hidden"><MenuRoundedIcon sx={{ fontSize: 18 }} /></button>
            <p className="text-[12px] font-semibold"><Link href="/nanoairs/dashboard">Dashboard</Link> <span className="text-[#777]">&gt;</span> Raceways 1</p>
          </div>
          <button className="flex h-6 items-center gap-1 rounded-[3px] bg-[#31bae1] px-3 text-[7px] font-semibold text-white">Aug 2025 <KeyboardArrowDownRoundedIcon sx={{ fontSize: 11 }} /></button>
        </header>

        <main className="px-4 pb-5 lg:px-6">
          <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_262px]">
            <div className="min-w-0 space-y-3">
              <Diagnosis />
              <ComparisonChart />
            </div>
            <ActivityLogs />
            <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:col-span-2 xl:grid-cols-6">
              {metrics.map((metric) => <SensorMetricCard key={metric.title} metric={metric} />)}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
