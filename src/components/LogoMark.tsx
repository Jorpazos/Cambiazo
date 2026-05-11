export default function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="cup-bg" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#001489" />
          <stop offset="100%" stopColor="#0a2472" />
        </linearGradient>
        <linearGradient id="cup-gold" x1="14" y1="5" x2="30" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFE566" />
          <stop offset="100%" stopColor="#FFB81C" />
        </linearGradient>
      </defs>

      {/* Background circle */}
      <circle cx="22" cy="22" r="21" fill="url(#cup-bg)" />
      <circle cx="22" cy="22" r="21" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />

      {/* Globe at top of trophy */}
      <circle cx="22" cy="9" r="4.5" fill="url(#cup-gold)" />
      <ellipse cx="22" cy="9" rx="2.2" ry="4.5" stroke="rgba(0,0,0,0.13)" strokeWidth="0.8" fill="none" />
      <line x1="17.5" y1="9" x2="26.5" y2="9" stroke="rgba(0,0,0,0.13)" strokeWidth="0.8" />

      {/* Trophy cup body */}
      <path
        d="M13 13 L31 13 L29 26 Q25.5 32.5 22 33 Q18.5 32.5 15 26 Z"
        fill="url(#cup-gold)"
      />
      {/* Inner shadow on cup */}
      <path
        d="M15.5 14.5 L28.5 14.5 L27 24.5 Q24.5 29.5 22 30.5 Q19.5 29.5 17 24.5 Z"
        fill="rgba(0,0,0,0.07)"
      />

      {/* Left handle */}
      <path
        d="M13 16 Q6.5 16 6.5 22 Q6.5 27.5 13 27.5"
        stroke="url(#cup-gold)"
        strokeWidth="2.8"
        strokeLinecap="round"
        fill="none"
      />
      {/* Right handle */}
      <path
        d="M31 16 Q37.5 16 37.5 22 Q37.5 27.5 31 27.5"
        stroke="url(#cup-gold)"
        strokeWidth="2.8"
        strokeLinecap="round"
        fill="none"
      />

      {/* Stem */}
      <rect x="20" y="33" width="4" height="4" rx="0.5" fill="#FFB81C" />
      {/* Base */}
      <rect x="14" y="37" width="16" height="4" rx="2" fill="url(#cup-gold)" />

      {/* Shine highlight */}
      <path
        d="M16.5 16.5 Q18.5 14.8 21 14.8"
        stroke="rgba(255,255,255,0.45)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
