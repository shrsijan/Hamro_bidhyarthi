import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  AlertTriangle,
  Heart,
  ChevronRight,
  X,
  Activity,
} from "lucide-react";
import { getStudents, getWatchlist } from "../api";

const RISK_COLOR = {
  low: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
  moderate: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
  high: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" },
  crisis: { bg: "bg-red-100", text: "text-red-800", dot: "bg-red-600" },
};

const MOOD_EMOJI = {
  1: { label: "Very Low", color: "text-red-600" },
  2: { label: "Low", color: "text-orange-500" },
  3: { label: "Okay", color: "text-amber-500" },
  4: { label: "Good", color: "text-emerald-500" },
  5: { label: "Great", color: "text-emerald-600" },
};

function MoodIndicator({ mood }) {
  if (!mood) return <span className="text-xs text-gray-300">No data</span>;
  const info = MOOD_EMOJI[mood] || MOOD_EMOJI[3];
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-px">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={`w-1.5 rounded-full ${
              level <= mood ? "bg-current" : "bg-gray-200"
            } ${level <= mood ? info.color : ""}`}
            style={{ height: `${8 + level * 2}px`, alignSelf: "flex-end" }}
          />
        ))}
      </div>
      <span className={`text-xs font-medium ${info.color}`}>
        {mood}/5
      </span>
    </div>
  );
}

function StudentNotificationItem({ student, onClose }) {
  const risk = RISK_COLOR[student.risk_level] || RISK_COLOR.low;
  return (
    <Link
      to={`/students/${student.id}`}
      onClick={onClose}
      className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
    >
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-xs font-semibold ${risk.bg} ${risk.text}`}
      >
        {student.name
          .split(" ")
          .map((n) => n[0])
          .join("")}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-medium text-gray-900 truncate">
            {student.name}
          </p>
          <span
            className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium capitalize ${risk.bg} ${risk.text}`}
          >
            <span className={`w-1 h-1 rounded-full ${risk.dot}`} />
            {student.risk_level}
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-0.5">
          Class {student.class}
          {student.concerns?.[0] && ` — ${student.concerns[0]}`}
        </p>
        <div className="flex items-center justify-between mt-1.5">
          <MoodIndicator mood={student.last_mood} />
          {student.last_energy && (
            <span className="text-[10px] text-gray-400 flex items-center gap-0.5">
              <Activity size={10} />
              Energy: {student.last_energy}/5
            </span>
          )}
        </div>
      </div>
      <ChevronRight size={14} className="text-gray-300 mt-2.5 shrink-0" />
    </Link>
  );
}

function HealthSummaryCard({ students }) {
  const total = students.length;
  const riskCounts = { low: 0, moderate: 0, high: 0, crisis: 0 };
  let moodSum = 0;
  let moodCount = 0;

  students.forEach((s) => {
    riskCounts[s.risk_level] = (riskCounts[s.risk_level] || 0) + 1;
    if (s.last_mood) {
      moodSum += s.last_mood;
      moodCount++;
    }
  });

  const avgMood = moodCount ? (moodSum / moodCount).toFixed(1) : "—";
  const needsAttention = riskCounts.high + riskCounts.crisis;

  return (
    <div className="mx-4 mb-3 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
      <div className="flex items-center gap-2 mb-2">
        <Heart size={14} className="text-blue-600" />
        <span className="text-xs font-semibold text-blue-900">
          Daily Health Overview
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="text-center">
          <p className="text-lg font-bold text-gray-900">{avgMood}</p>
          <p className="text-[10px] text-gray-500">Avg Mood</p>
        </div>
        <div className="text-center">
          <p className={`text-lg font-bold ${needsAttention > 0 ? "text-red-600" : "text-emerald-600"}`}>
            {needsAttention}
          </p>
          <p className="text-[10px] text-gray-500">Need Help</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-emerald-600">{riskCounts.low}</p>
          <p className="text-[10px] text-gray-500">Healthy</p>
        </div>
      </div>
      <div className="flex rounded-full overflow-hidden h-1.5 mt-2">
        {total > 0 && (
          <>
            {riskCounts.low > 0 && (
              <div className="bg-emerald-400" style={{ width: `${(riskCounts.low / total) * 100}%` }} />
            )}
            {riskCounts.moderate > 0 && (
              <div className="bg-amber-400" style={{ width: `${(riskCounts.moderate / total) * 100}%` }} />
            )}
            {riskCounts.high > 0 && (
              <div className="bg-red-400" style={{ width: `${(riskCounts.high / total) * 100}%` }} />
            )}
            {riskCounts.crisis > 0 && (
              <div className="bg-red-600" style={{ width: `${(riskCounts.crisis / total) * 100}%` }} />
            )}
          </>
        )}
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-[9px] text-gray-400">Low risk</span>
        <span className="text-[9px] text-gray-400">Crisis</span>
      </div>
    </div>
  );
}

const TABS = [
  { key: "all", label: "All Alerts" },
  { key: "critical", label: "Critical" },
  { key: "moderate", label: "Moderate" },
];

export default function NotificationPanel({ elevated }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("all");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    setLoading(true);

    const fetcher = elevated ? getWatchlist : getStudents;
    fetcher()
      .then((data) => {
        if (elevated) {
          setStudents(data);
        } else {
          const needsAttention = data.filter(
            (s) => s.risk_level && s.risk_level !== "low"
          );
          setStudents(needsAttention);
        }
      })
      .catch(() => setStudents([]))
      .finally(() => setLoading(false));
  }, [open, elevated]);

  useEffect(() => {
    function handleClick(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const filtered = (() => {
    switch (tab) {
      case "critical":
        return students.filter((s) =>
          ["high", "crisis"].includes(s.risk_level || s.risk?.risk_level)
        );
      case "moderate":
        return students.filter(
          (s) => (s.risk_level || s.risk?.risk_level) === "moderate"
        );
      default:
        return students;
    }
  })();

  const criticalCount = students.filter((s) =>
    ["high", "crisis"].includes(s.risk_level || s.risk?.risk_level)
  ).length;

  const allStudentsForSummary = students.map((s) => ({
    ...s,
    risk_level: s.risk_level || s.risk?.risk_level || "low",
    last_mood: s.last_mood ?? null,
  }));

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 transition-colors"
        title="Notifications"
      >
        <Bell size={18} strokeWidth={1.8} className="text-gray-500" />
        {criticalCount > 0 && !open && (
          <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full bg-red-500 text-[10px] font-bold text-white leading-none">
            {criticalCount > 9 ? "9+" : criticalCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-[380px] bg-white rounded-xl border border-gray-200 shadow-xl z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <AlertTriangle size={14} className="text-amber-500" />
              <h3 className="text-sm font-semibold text-gray-900">
                Student Alerts
              </h3>
              {students.length > 0 && (
                <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-gray-100 text-[11px] font-medium text-gray-600">
                  {students.length}
                </span>
              )}
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded-md hover:bg-gray-100 transition-colors"
            >
              <X size={14} className="text-gray-400" />
            </button>
          </div>

          {allStudentsForSummary.length > 0 && (
            <div className="pt-3">
              <HealthSummaryCard students={allStudentsForSummary} />
            </div>
          )}

          <div className="flex gap-1 px-4 pb-2">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  tab === t.key
                    ? "bg-gray-900 text-white"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="max-h-[340px] overflow-y-auto divide-y divide-gray-50">
            {loading ? (
              <div className="flex items-center justify-center py-10">
                <p className="text-xs text-gray-400">Loading...</p>
              </div>
            ) : filtered.length > 0 ? (
              filtered.map((s) => (
                <StudentNotificationItem
                  key={s.id}
                  student={{
                    ...s,
                    risk_level: s.risk_level || s.risk?.risk_level || "low",
                    concerns: s.concerns || s.risk?.concerns || [],
                  }}
                  onClose={() => setOpen(false)}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-10 px-4">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center mb-2">
                  <Heart size={18} className="text-emerald-500" />
                </div>
                <p className="text-sm font-medium text-gray-500">
                  All students are doing well
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  No alerts in this category
                </p>
              </div>
            )}
          </div>

          {filtered.length > 0 && (
            <div className="border-t border-gray-100 px-4 py-2.5">
              <Link
                to="/dashboard"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-1.5 w-full py-1.5 rounded-lg text-xs font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              >
                View full dashboard
                <ChevronRight size={12} />
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
