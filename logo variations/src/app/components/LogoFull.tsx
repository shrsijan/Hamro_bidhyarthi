export default function LogoFull({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Student Icon */}
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-4"
      >
        <path
          d="M60 30C52 30 48 35 48 40C48 42 49 43 50 44C52 46 54 47 56 48C58 47 60 46 62 46C64 46 66 47 68 48C70 47 72 46 74 44C75 43 76 42 76 40C76 35 72 30 60 30Z"
          fill="#2C3E50"
        />
        <ellipse cx="60" cy="50" rx="18" ry="20" fill="none" stroke="#2C3E50" strokeWidth="2.5" />
        <path
          d="M45 71L45 85C45 87 47 90 60 90C73 90 75 87 75 85L75 71"
          fill="none"
          stroke="#2C3E50"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M45 71C45 71 43 74 40 80C38 84 37 86 37 88"
          stroke="#2C3E50"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M75 71C75 71 77 74 80 80C82 84 83 86 83 88"
          stroke="#2C3E50"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>

      {/* Brand Name */}
      <div className="text-5xl font-bold text-gray-900 tracking-tight">studentFirst</div>

      {/* Tagline */}
      <div className="text-xl text-gray-600 mt-2">Make your school healthy</div>
    </div>
  );
}
