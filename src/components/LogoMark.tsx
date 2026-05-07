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
        <linearGradient id="lm-bg" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#001489" />
          <stop offset="100%" stopColor="#c8102e" />
        </linearGradient>
        <linearGradient id="lm-ball" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="1" />
          <stop offset="100%" stopColor="#e0e8ff" stopOpacity="0.85" />
        </linearGradient>
      </defs>

      {/* Badge shape — shield with rounded bottom */}
      <path
        d="M22 2 L40 9 V24 C40 34 31.5 40.5 22 42 C12.5 40.5 4 34 4 24 V9 Z"
        fill="url(#lm-bg)"
      />

      {/* Subtle inner highlight */}
      <path
        d="M22 4.5 L38 11 V24 C38 32.5 30.5 38.5 22 40 C13.5 38.5 6 32.5 6 24 V11 Z"
        fill="none"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1"
      />

      {/* Soccer ball — outer circle */}
      <circle cx="22" cy="22" r="10.5" stroke="url(#lm-ball)" strokeWidth="1.4" fill="none" />

      {/* Pentagon patches — top center */}
      <path d="M22 11.5 L25.4 14 L24.1 18 L19.9 18 L18.6 14 Z" fill="white" />

      {/* Pentagon patch — bottom left */}
      <path d="M13.4 20.5 L17 19.2 L19.3 22.5 L17.5 26 L13.8 24.8 Z"
        fill="white" opacity="0.55" />

      {/* Pentagon patch — bottom right */}
      <path d="M30.6 20.5 L27 19.2 L24.7 22.5 L26.5 26 L30.2 24.8 Z"
        fill="white" opacity="0.55" />

      {/* Pentagon patch — bottom center */}
      <path d="M22 32.5 L18.8 30.2 L19.9 26.5 L24.1 26.5 L25.2 30.2 Z"
        fill="white" opacity="0.55" />

      {/* Seam lines connecting patches */}
      <line x1="22" y1="11.5" x2="17" y2="19.2" stroke="white" strokeWidth="0.8" opacity="0.3" />
      <line x1="22" y1="11.5" x2="27" y2="19.2" stroke="white" strokeWidth="0.8" opacity="0.3" />
      <line x1="13.8" y1="24.8" x2="19.9" y2="26.5" stroke="white" strokeWidth="0.8" opacity="0.3" />
      <line x1="30.2" y1="24.8" x2="24.1" y2="26.5" stroke="white" strokeWidth="0.8" opacity="0.3" />

      {/* Gold accent star — top right of shield */}
      <path
        d="M35 7 L35.7 9.2 L38 9.2 L36.2 10.5 L36.9 12.7 L35 11.4 L33.1 12.7 L33.8 10.5 L32 9.2 L34.3 9.2 Z"
        fill="#FFB81C"
        opacity="0.9"
      />
    </svg>
  );
}
