import { useState, useEffect } from "react";
import {
  ClipboardCheck,
  Shield,
  BarChart3,
  Users,
  Activity,
  Bell,
  Menu,
  X,
  TrendingUp,
  GraduationCap,
  Mail,
  CheckCircle2,
} from "lucide-react";
import { LogoNav, LogoIcon } from "../components/Logo";

const SCHOOLS = [
  "Lincoln Academy",
  "Riverside High School",
  "Oakwood Preparatory",
  "Greenfield International",
  "Summit Valley School",
  "Brightwood Academy",
  "Heritage School",
  "Maplewood College",
  "Crestview Institute",
  "Pinewood School",
];

const FEATURES = [
  {
    icon: ClipboardCheck,
    title: "Daily Mood Check-ins",
    description:
      "Quick, meaningful mood and energy check-ins that help teachers understand how each student is really doing — every single day.",
  },
  {
    icon: Shield,
    title: "Smart Risk Detection",
    description:
      "Pattern analysis identifies students who may need extra support before a small struggle becomes a bigger problem.",
  },
  {
    icon: BarChart3,
    title: "Wellbeing Dashboard",
    description:
      "Comprehensive analytics give counselors and administrators a clear, real-time picture of school-wide student health.",
  },
  {
    icon: Users,
    title: "Collaborative Care",
    description:
      "Teachers, counselors, and administrators work as a team through shared observations, buddy systems, and intervention tools.",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Teachers check in",
    description:
      "Each day, teachers log a quick mood and energy rating for their students during class time.",
  },
  {
    number: "02",
    title: "Patterns emerge",
    description:
      "The system tracks trends over time and flags students whose wellbeing signals a need for support.",
  },
  {
    number: "03",
    title: "Teams respond",
    description:
      "Counselors and teachers collaborate on observations, conversation starters, and personalized interventions.",
  },
];

// FIX: Added inputId prop so we can target this specific input
function EmailRequestForm({ id, inputId, variant = "light" }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  if (submitted) {
    const isDark = variant === "dark";
    return (
      <div id={id} className="flex items-start gap-3 max-w-md mx-auto text-left scroll-mt-24">
        <CheckCircle2
          size={20}
          className={`shrink-0 mt-0.5 ${isDark ? "text-emerald-400" : "text-emerald-600"}`}
        />
        <div>
          <p className={`text-sm font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
            Email request sent!
          </p>
          <p className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            Someone from our team will reach out to verify your school into our
            network. We typically respond within 1–2 business days.
          </p>
        </div>
      </div>
    );
  }

  const isDark = variant === "dark";

  return (
    <form id={id} onSubmit={handleSubmit} className="max-w-sm mx-auto scroll-mt-24">
      <div
        className={`flex items-center rounded-lg border ${isDark
          ? "border-gray-700 bg-gray-800"
          : "border-gray-200 bg-white shadow-sm"
          }`}
      >
        <Mail
          size={16}
          className={`ml-3.5 shrink-0 ${isDark ? "text-gray-500" : "text-gray-400"}`}
        />
        <input
          id={inputId} // FIX: Assigned the ID here
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(""); }}
          placeholder="Your school email"
          className={`flex-1 h-11 px-3 text-sm bg-transparent outline-none placeholder-gray-400 ${isDark ? "text-white" : "text-gray-900"
            }`}
        />
        <button
          type="submit"
          className={`shrink-0 h-9 px-4 mr-1 text-sm font-semibold rounded-md transition-colors ${isDark
            ? "bg-white text-gray-900 hover:bg-gray-100"
            : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
        >
          Send
        </button>
      </div>
      {error && (
        <p className={`text-xs mt-1.5 ${isDark ? "text-red-400" : "text-red-600"}`}>
          {error}
        </p>
      )}
      <p className={`text-xs mt-2 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
        Let's get your school into our network.
      </p>
    </form>
  );
}

function LandingNav({ onLogin }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // FIX: Created a function to handle scroll + input focus
  const handleGetStartedClick = (e) => {
    e.preventDefault();
    setMobileOpen(false); // Close mobile menu if open

    // Scroll to the hero section
    const heroSection = document.getElementById("get-started");
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: "smooth" });
    }

    // Focus the input, with a tiny delay to allow the scroll to start smoothly
    setTimeout(() => {
      const emailInput = document.getElementById("hero-email-input");
      if (emailInput) {
        // preventScroll: true stops the browser from instantly snapping downward
        emailInput.focus({ preventScroll: true });
      }
    }, 100);
  };

  return (
    <header className="fixed top-0 z-50 w-full">
      <nav
        className={`transition-all duration-200 ${scrolled
          ? "bg-white border-b border-gray-200 shadow-sm"
          : "bg-transparent"
          }`}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-16">
            <a href="#" aria-label="home">
              <LogoNav />
            </a>

            <div className="hidden lg:flex items-center gap-8">
              <a href="#features" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">How It Works</a>
              <a href="#schools" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Schools</a>
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={onLogin}
                className="px-4 py-2 text-sm font-medium text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                Log in
              </button>
              {/* FIX: Changed to button to trigger our custom function */}
              <button
                onClick={handleGetStartedClick}
                className="px-4 py-2 text-sm font-medium text-white rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors shadow-sm"
              >
                Get Started
              </button>
            </div>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {mobileOpen ? (
                <X size={20} className="text-gray-600" />
              ) : (
                <Menu size={20} className="text-gray-600" />
              )}
            </button>
          </div>

          {mobileOpen && (
            <div className="lg:hidden pb-4 border-t border-gray-100 pt-4 space-y-3 bg-white">
              <a href="#features" onClick={() => setMobileOpen(false)} className="block text-sm text-gray-600 hover:text-gray-900 py-1.5">Features</a>
              <a href="#how-it-works" onClick={() => setMobileOpen(false)} className="block text-sm text-gray-600 hover:text-gray-900 py-1.5">How It Works</a>
              <a href="#schools" onClick={() => setMobileOpen(false)} className="block text-sm text-gray-600 hover:text-gray-900 py-1.5">Schools</a>
              <div className="flex gap-2 pt-2">
                <button onClick={onLogin} className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 rounded-lg border border-gray-200">Log in</button>
                {/* FIX: Replaced anchor tag with button on mobile too */}
                <button onClick={handleGetStartedClick} className="flex-1 px-4 py-2 text-sm font-medium text-white rounded-lg bg-gray-900 text-center">Get Started</button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

// ... WellbeingPreview and AlertsPreview functions remain unchanged ...

function WellbeingPreview() {
  const moodData = [3, 2, 4, 3, 5, 4, 4];
  const maxH = 40;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 w-72 space-y-4">
      <div className="flex items-center gap-2">
        <Activity size={16} className="text-gray-400" />
        <span className="text-sm font-semibold text-gray-900">
          Class Wellbeing
        </span>
      </div>

      <div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-bold text-gray-900">3.8</span>
          <span className="text-xs text-gray-400">/5 avg mood</span>
        </div>
        <div className="flex items-center gap-1 mt-0.5">
          <TrendingUp size={12} className="text-emerald-600" />
          <span className="text-xs font-medium text-emerald-700">
            +12% from last week
          </span>
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[10px] text-gray-400">
          <span>This week</span>
          <span>Mon — Sun</span>
        </div>
        <div className="flex items-end gap-1.5 h-10">
          {moodData.map((mood, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{
                height: `${(mood / 5) * maxH}px`,
                backgroundColor:
                  mood <= 2
                    ? "#dc2626"
                    : mood <= 3
                      ? "#d97706"
                      : "#059669",
              }}
            />
          ))}
        </div>
      </div>

      <div className="space-y-2 pt-1 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Check-in rate</span>
          <span className="text-xs font-semibold text-gray-900">87%</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-gray-900 rounded-full" style={{ width: "87%" }} />
        </div>
      </div>

      <div className="flex items-center gap-2 p-2.5 rounded-lg bg-amber-50 border border-amber-200">
        <Bell size={14} className="text-amber-700 shrink-0" />
        <span className="text-xs text-amber-800">
          <strong>3 students</strong> need attention today
        </span>
      </div>
    </div>
  );
}

function AlertsPreview() {
  const students = [
    { name: "Aarav S.", mood: 2, risk: "high", cls: "9B" },
    { name: "Sita G.", mood: 3, risk: "moderate", cls: "10A" },
    { name: "Rohan A.", mood: 2, risk: "high", cls: "9B" },
  ];

  const riskStyle = {
    high: "bg-red-50 text-red-700 border-red-200",
    moderate: "bg-amber-50 text-amber-700 border-amber-200",
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 w-64 space-y-3">
      <div className="flex items-center gap-2">
        <Shield size={16} className="text-gray-400" />
        <span className="text-sm font-semibold text-gray-900">Alerts</span>
        <span className="ml-auto flex items-center justify-center w-5 h-5 rounded-full bg-red-600 text-[10px] font-bold text-white">
          3
        </span>
      </div>

      <div className="space-y-2">
        {students.map((s, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 p-2 rounded-lg border border-gray-100"
          >
            <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-semibold text-gray-600">
              {s.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-900">{s.name}</p>
              <p className="text-[10px] text-gray-400">Class {s.cls}</p>
            </div>
            <div className="flex flex-col items-end gap-0.5">
              <span className="text-[10px] font-medium text-gray-500">
                {s.mood}/5
              </span>
              <span
                className={`text-[9px] font-medium px-1.5 py-0.5 rounded border capitalize ${riskStyle[s.risk]}`}
              >
                {s.risk}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SchoolsMarquee() {
  return (
    <section id="schools" className="scroll-mt-20 py-10 border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <p className="text-sm text-gray-400 font-medium whitespace-nowrap md:border-r md:pr-6 md:border-gray-200">
            Trusted by schools worldwide
          </p>
          <div className="relative flex-1 overflow-hidden w-full">
            <div className="anim-marquee flex whitespace-nowrap gap-12">
              {[...SCHOOLS, ...SCHOOLS].map((name, i) => (
                <span
                  key={i}
                  className="text-sm font-semibold text-gray-300 flex items-center gap-2 shrink-0"
                >
                  <GraduationCap size={16} strokeWidth={1.5} />
                  {name}
                </span>
              ))}
            </div>
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function LandingPage({ onLogin }) {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <LandingNav onLogin={onLogin} />

      <section id="get-started" className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 pt-28 pb-16 lg:pt-36 lg:pb-24">
          <div className="max-w-3xl mx-auto text-center">
            <div
              className="anim-fade-in-up inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 bg-white text-xs font-medium text-gray-600 mb-6 shadow-sm"
              style={{ animationDelay: "0.1s" }}
            >
              <LogoIcon size={16} />
              Where student wellbeing comes first
            </div>

            <h1
              className="anim-fade-in-up text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 text-balance leading-[1.1]"
              style={{ animationDelay: "0.2s" }}
            >
              Every Student Deserves to Be Seen
            </h1>

            <p
              className="anim-fade-in-up mt-6 text-lg text-gray-500 max-w-2xl mx-auto text-pretty leading-relaxed"
              style={{ animationDelay: "0.35s" }}
            >
              studentFirst helps schools track student wellbeing through daily
              check-ins, mood monitoring, and early intervention — so no student
              falls through the cracks.
            </p>

            <div
              className="anim-fade-in-up mt-10"
              style={{ animationDelay: "0.5s" }}
            >
              {/* FIX: Passed inputId to link this specific field to the button */}
              <EmailRequestForm id="hero-form" inputId="hero-email-input" variant="light" />
            </div>
          </div>

          <div
            className="anim-fade-in-up mt-16 lg:mt-20 flex justify-center"
            style={{ animationDelay: "0.65s" }}
          >
            <div className="flex gap-4 items-start">
              <WellbeingPreview />
              <div className="hidden sm:block mt-8">
                <AlertsPreview />
              </div>
            </div>
          </div>
        </div>
      </section>

      <SchoolsMarquee />

      <section id="features" className="scroll-mt-20 py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
              Everything you need to support student wellbeing
            </h2>
            <p className="mt-4 text-gray-500 text-lg">
              A thoughtful toolkit designed for teachers, counselors, and
              administrators who care deeply about their students.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-xl border border-gray-200 bg-white hover:shadow-md transition-shadow duration-200"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 text-gray-600 mb-4">
                  <f.icon size={20} strokeWidth={1.8} />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="scroll-mt-20 py-20 md:py-28 bg-gray-50 border-t border-b border-gray-200"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
              Simple for teachers. Powerful for schools.
            </h2>
            <p className="mt-4 text-gray-500 text-lg">
              Getting started takes minutes — and the impact lasts a lifetime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((step) => (
              <div key={step.number}>
                <div className="text-4xl font-black text-gray-200 mb-3">
                  {step.number}
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: "95%", label: "At-risk students identified early" },
              { value: "3x", label: "Faster response to student needs" },
              { value: "50+", label: "Partner schools" },
              { value: "10k+", label: "Students supported" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <p className="mt-1.5 text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="rounded-2xl bg-gray-900 p-10 md:p-16 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Ready to put your students first?
            </h2>
            <p className="mt-4 text-gray-400 text-lg max-w-xl mx-auto">
              Join educators who trust studentFirst to keep their students
              safe, supported, and thriving.
            </p>
            <div className="mt-8">
              {/* FIX: Passed a different inputId to prevent conflicts with the top form */}
              <EmailRequestForm id="get-started-bottom" inputId="bottom-email-input" variant="dark" />
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-200 py-10 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-400">
              <LogoIcon size={24} />
              <span className="text-sm font-bold text-gray-900">
                studentFirst
              </span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#features" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">How It Works</a>
              <a href="#schools" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Schools</a>
            </div>
            <p className="text-xs text-gray-400">
              &copy; {new Date().getFullYear()} studentFirst. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}