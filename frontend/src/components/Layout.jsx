import { useState, useRef, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  ClipboardCheck,
  Eye,
  LayoutDashboard,
  LogOut,
  Shield,
  ArrowLeftRight,
  Users,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import NotificationPanel from "./NotificationPanel";
import { LogoIcon, LogoNav } from "./Logo";

const NAV = {
  teacher: [
    { to: "/checkin", label: "Check In", icon: ClipboardCheck },
    { to: "/observe", label: "Observation", icon: Eye },
    { to: "/dashboard", label: "My Class", icon: LayoutDashboard },
    { to: "/buddy-tasks", label: "Buddy Tasks", icon: Users },
  ],
  counselor: [
    { to: "/checkin", label: "Check In", icon: ClipboardCheck },
    { to: "/observe", label: "Observation", icon: Eye },
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/buddy-tasks", label: "Buddy Tasks", icon: Users },
  ],
  admin: [
    { to: "/admin", label: "Admin Panel", icon: Shield },
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  ],
};

const PAGE_TITLES = {
  "/checkin": "Check In",
  "/observe": "Observation",
  "/dashboard": "Dashboard",
  "/buddy-tasks": "Buddy Tasks",
  "/admin": "Admin Panel",
};

const ROLE_LABEL = { teacher: "Teacher", counselor: "Counselor", admin: "Admin" };

function getInitials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function Layout({ role, userName, userEmail, onSignOut, onSwitchAccount }) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const popoverRef = useRef(null);
  const links = NAV[role] || [];
  const location = useLocation();
  const { elevated } = useAuth();

  const currentTitle =
    PAGE_TITLES[location.pathname] ||
    (location.pathname.startsWith("/students/") ? "Student Profile" : "");

  useEffect(() => {
    function handleClick(e) {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setPopoverOpen(false);
      }
    }
    if (popoverOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [popoverOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen">
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`${
          sidebarCollapsed ? "w-[68px]" : "w-56"
        } bg-white border-r border-gray-200 flex flex-col transition-all duration-200 hidden md:flex`}
      >
        <div className={`flex items-center justify-between ${sidebarCollapsed ? "px-3" : "px-4"} pt-5 pb-3`}>
          {!sidebarCollapsed ? (
            <div className="flex items-center gap-2 text-gray-800">
              <LogoIcon size={28} />
              <h1 className="text-base font-bold text-gray-900 tracking-tight">
                studentFirst
              </h1>
            </div>
          ) : (
            <div className="text-gray-800">
              <LogoIcon size={28} />
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed((v) => !v)}
            className="p-1.5 rounded-md hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
            title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {sidebarCollapsed ? (
              <ChevronRight size={16} strokeWidth={1.8} />
            ) : (
              <ChevronLeft size={16} strokeWidth={1.8} />
            )}
          </button>
        </div>

        <nav className={`flex-1 ${sidebarCollapsed ? "px-2" : "px-2.5"} space-y-0.5`}>
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              title={sidebarCollapsed ? label : undefined}
              className={({ isActive }) =>
                `flex items-center gap-2.5 ${
                  sidebarCollapsed ? "justify-center px-2" : "px-3"
                } py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-gray-900 text-white shadow-sm"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                }`
              }
            >
              <Icon size={18} strokeWidth={1.8} className="shrink-0" />
              {!sidebarCollapsed && label}
            </NavLink>
          ))}
        </nav>

        <div className="relative border-t border-gray-100 px-2.5 py-2.5" ref={popoverRef}>
          <button
            onClick={() => setPopoverOpen((v) => !v)}
            className={`flex items-center gap-2.5 w-full px-2 py-2 rounded-lg hover:bg-gray-50 transition-colors ${
              sidebarCollapsed ? "justify-center" : ""
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
              <span className="text-[11px] font-semibold text-white leading-none">
                {getInitials(userName)}
              </span>
            </div>
            {!sidebarCollapsed && (
              <div className="min-w-0 text-left">
                <p className="text-sm font-medium text-gray-900 truncate">{userName}</p>
                <p className="text-[11px] text-gray-400 leading-tight">{ROLE_LABEL[role]}</p>
              </div>
            )}
          </button>

          {popoverOpen && (
            <div className="absolute bottom-full left-2.5 right-2.5 mb-2 bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden z-50 min-w-[220px]">
              <div className="px-4 py-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
                    <span className="text-sm font-semibold text-white">{getInitials(userName)}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{userName}</p>
                    <p className="text-xs text-gray-400 truncate">{userEmail}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-medium rounded-full bg-gray-100 text-gray-600 capitalize">
                      {ROLE_LABEL[role]}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-1.5">
                <button
                  onClick={() => { setPopoverOpen(false); onSwitchAccount(); }}
                  className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeftRight size={15} strokeWidth={1.8} className="text-gray-400" />
                  Switch account
                </button>
                <button
                  onClick={() => { setPopoverOpen(false); onSignOut(); }}
                  className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={15} strokeWidth={1.8} />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-56 bg-white border-r border-gray-200 flex flex-col z-50 transition-transform duration-200 md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-4 pt-5 pb-3">
          <div className="flex items-center gap-2 text-gray-800">
            <LogoIcon size={28} />
            <h1 className="text-base font-bold text-gray-900 tracking-tight">
              studentFirst
            </h1>
          </div>
        </div>
        <nav className="flex-1 px-2.5 space-y-0.5">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-gray-900 text-white shadow-sm"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                }`
              }
            >
              <Icon size={18} strokeWidth={1.8} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors md:hidden"
              >
                <Menu size={18} strokeWidth={1.8} className="text-gray-500" />
              </button>
              <h2 className="text-sm font-semibold text-gray-900">
                {currentTitle}
              </h2>
            </div>
            <div className="flex items-center gap-1">
              <NotificationPanel elevated={elevated} />
            </div>
          </div>
        </header>

        <main className="flex-1 bg-gray-50 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
