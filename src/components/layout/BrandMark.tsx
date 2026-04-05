type BrandMarkProps = {
  className?: string;
  size?: number;
};

/**
 * DeepTutors Crest — SVG vector recreation
 * Shield with "DT" monogram, book, torch, laurel, and "DISCENDO CRESCIMUS" banner.
 * Color palette: Navy #1B2A4A, Gold #C5A55A, Dark Gold #8B7332, Banner #E8DCC8
 */
export default function BrandMark({ className, size = 44 }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 200 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size * 1.2}
      className={className}
      aria-hidden="true"
    >
      <defs>
        {/* Gold gradient for border/frame */}
        <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D4AF63" />
          <stop offset="35%" stopColor="#C5A55A" />
          <stop offset="60%" stopColor="#E8CC7A" />
          <stop offset="100%" stopColor="#B8943E" />
        </linearGradient>
        {/* Darker gold for details */}
        <linearGradient id="goldDark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B8943E" />
          <stop offset="100%" stopColor="#8B7332" />
        </linearGradient>
        {/* Navy gradient for shield face */}
        <linearGradient id="navyGrad" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#1F3358" />
          <stop offset="100%" stopColor="#142240" />
        </linearGradient>
        {/* Banner fill */}
        <linearGradient id="bannerGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F0E6D4" />
          <stop offset="100%" stopColor="#DDD0BC" />
        </linearGradient>
        {/* Letter gold gradient */}
        <linearGradient id="letterGold" x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#DCBE6E" />
          <stop offset="40%" stopColor="#C5A55A" />
          <stop offset="80%" stopColor="#A48840" />
          <stop offset="100%" stopColor="#8B7332" />
        </linearGradient>
      </defs>

      {/* ── Outer ornamental frame ── */}
      {/* Top scroll */}
      <path
        d="M100 8 C90 8, 78 12, 72 18 C68 14, 58 10, 50 12 C55 16, 58 20, 56 24
           M100 8 C110 8, 122 12, 128 18 C132 14, 142 10, 150 12 C145 16, 142 20, 144 24"
        stroke="url(#goldGrad)" strokeWidth="2" fill="none" strokeLinecap="round"
      />
      {/* Top center flourish */}
      <path
        d="M88 14 Q94 6, 100 10 Q106 6, 112 14"
        stroke="url(#goldGrad)" strokeWidth="1.8" fill="none"
      />
      <circle cx="100" cy="8" r="2" fill="url(#goldGrad)" />

      {/* ── Gold shield border (outer) ── */}
      <path
        d="M42 38 L42 130 Q42 170, 100 192 Q158 170, 158 130 L158 38 Z"
        fill="url(#goldGrad)" stroke="#8B7332" strokeWidth="1.5"
      />

      {/* ── Side ornamental scrolls ── */}
      <path
        d="M42 55 C34 52, 28 58, 30 66 C26 64, 22 70, 26 76 C22 78, 24 86, 30 86
           M42 95 C34 92, 26 96, 28 104 C24 102, 20 108, 24 114"
        stroke="url(#goldGrad)" strokeWidth="1.8" fill="none" strokeLinecap="round"
      />
      <path
        d="M158 55 C166 52, 172 58, 170 66 C174 64, 178 70, 174 76 C178 78, 176 86, 170 86
           M158 95 C166 92, 174 96, 172 104 C176 102, 180 108, 176 114"
        stroke="url(#goldGrad)" strokeWidth="1.8" fill="none" strokeLinecap="round"
      />

      {/* ── Navy shield face (inner) ── */}
      <path
        d="M50 44 L50 128 Q50 164, 100 184 Q150 164, 150 128 L150 44 Z"
        fill="url(#navyGrad)" stroke="#8B7332" strokeWidth="1.2"
      />

      {/* ── Inner gold border line ── */}
      <path
        d="M56 50 L56 126 Q56 158, 100 176 Q144 158, 144 126 L144 50 Z"
        fill="none" stroke="url(#goldGrad)" strokeWidth="0.8" opacity="0.5"
      />

      {/* ── Top laurel wreath (small) ── */}
      <g transform="translate(100, 58)" fill="url(#goldDark)">
        {/* Left branch */}
        <ellipse cx="-12" cy="-4" rx="4" ry="2" transform="rotate(-30, -12, -4)" />
        <ellipse cx="-8" cy="-8" rx="4" ry="2" transform="rotate(-45, -8, -8)" />
        <ellipse cx="-3" cy="-10" rx="3.5" ry="1.8" transform="rotate(-60, -3, -10)" />
        {/* Right branch */}
        <ellipse cx="12" cy="-4" rx="4" ry="2" transform="rotate(30, 12, -4)" />
        <ellipse cx="8" cy="-8" rx="4" ry="2" transform="rotate(45, 8, -8)" />
        <ellipse cx="3" cy="-10" rx="3.5" ry="1.8" transform="rotate(60, 3, -10)" />
        {/* Center stem */}
        <line x1="0" y1="0" x2="-14" y2="0" stroke="url(#goldDark)" strokeWidth="1" />
        <line x1="0" y1="0" x2="14" y2="0" stroke="url(#goldDark)" strokeWidth="1" />
      </g>

      {/* ── "D" Letter (left, larger) ── */}
      <g transform="translate(66, 66)">
        <text
          x="0" y="52"
          fontFamily="'Georgia', 'Times New Roman', serif"
          fontSize="62"
          fontWeight="bold"
          fontStyle="italic"
          fill="url(#letterGold)"
          stroke="#8B7332"
          strokeWidth="0.5"
        >D</text>
      </g>

      {/* ── "T" Letter (right, overlapping) ── */}
      <g transform="translate(95, 70)">
        <text
          x="0" y="48"
          fontFamily="'Georgia', 'Times New Roman', serif"
          fontSize="54"
          fontWeight="bold"
          fontStyle="italic"
          fill="url(#letterGold)"
          stroke="#8B7332"
          strokeWidth="0.5"
        >T</text>
      </g>

      {/* ── Open book ── */}
      <g transform="translate(75, 138)">
        {/* Left page */}
        <path d="M25 0 L8 2 Q4 3, 4 8 L6 18 Q7 20, 12 19 L25 14 Z"
              fill="#E8DCC8" stroke="#8B7332" strokeWidth="0.6" />
        {/* Right page */}
        <path d="M25 0 L42 2 Q46 3, 46 8 L44 18 Q43 20, 38 19 L25 14 Z"
              fill="#F0E6D4" stroke="#8B7332" strokeWidth="0.6" />
        {/* Page lines */}
        <line x1="12" y1="8" x2="23" y2="5" stroke="#B8943E" strokeWidth="0.4" opacity="0.5" />
        <line x1="13" y1="12" x2="23" y2="9" stroke="#B8943E" strokeWidth="0.4" opacity="0.5" />
        <line x1="27" y1="5" x2="38" y2="8" stroke="#B8943E" strokeWidth="0.4" opacity="0.5" />
        <line x1="27" y1="9" x2="37" y2="12" stroke="#B8943E" strokeWidth="0.4" opacity="0.5" />
        {/* Spine */}
        <line x1="25" y1="0" x2="25" y2="14" stroke="#8B7332" strokeWidth="0.8" />
      </g>

      {/* ── Quill pen (left of book) ── */}
      <g transform="translate(72, 128)">
        <path d="M18 24 L8 4 Q6 0, 4 2 Q2 6, 6 8 L14 22"
              fill="url(#goldDark)" stroke="#8B7332" strokeWidth="0.5" />
        <line x1="14" y1="22" x2="16" y2="28" stroke="#8B7332" strokeWidth="0.6" />
      </g>

      {/* ── Torch (right of book) ── */}
      <g transform="translate(118, 122)">
        {/* Handle */}
        <rect x="4" y="12" width="5" height="20" rx="1.5" fill="url(#goldDark)" stroke="#8B7332" strokeWidth="0.5" />
        {/* Cup */}
        <path d="M2 12 L11 12 L10 16 L3 16 Z" fill="url(#goldGrad)" stroke="#8B7332" strokeWidth="0.5" />
        {/* Flame */}
        <path d="M6.5 12 Q4 6, 6.5 0 Q9 6, 6.5 12" fill="#E8715A" opacity="0.9" />
        <path d="M6.5 12 Q5 8, 6.5 3 Q8 8, 6.5 12" fill="#F5B74A" opacity="0.9" />
        <path d="M6.5 10 Q6 7, 6.5 5 Q7 7, 6.5 10" fill="#FFE082" opacity="0.8" />
      </g>

      {/* ── Bottom laurel branches ── */}
      <g transform="translate(100, 192)" fill="url(#goldDark)">
        {/* Left branch */}
        <path d="M-8 2 Q-20 -2, -32 4" stroke="url(#goldDark)" strokeWidth="1" fill="none" />
        <ellipse cx="-16" cy="0" rx="5" ry="2.2" transform="rotate(-15, -16, 0)" />
        <ellipse cx="-24" cy="2" rx="5" ry="2.2" transform="rotate(-5, -24, 2)" />
        <ellipse cx="-30" cy="5" rx="4.5" ry="2" transform="rotate(5, -30, 5)" />
        {/* Right branch */}
        <path d="M8 2 Q20 -2, 32 4" stroke="url(#goldDark)" strokeWidth="1" fill="none" />
        <ellipse cx="16" cy="0" rx="5" ry="2.2" transform="rotate(15, 16, 0)" />
        <ellipse cx="24" cy="2" rx="5" ry="2.2" transform="rotate(5, 24, 2)" />
        <ellipse cx="30" cy="5" rx="4.5" ry="2" transform="rotate(-5, 30, 5)" />
      </g>

      {/* ── Banner ribbon ── */}
      <g transform="translate(100, 206)">
        {/* Left ribbon tail */}
        <path d="M-48 2 L-50 16 L-40 12 L-38 0 Z" fill="url(#bannerGrad)" stroke="#8B7332" strokeWidth="0.8" />
        {/* Right ribbon tail */}
        <path d="M48 2 L50 16 L40 12 L38 0 Z" fill="url(#bannerGrad)" stroke="#8B7332" strokeWidth="0.8" />
        {/* Main banner */}
        <path d="M-38 -4 Q-40 4, -38 8 L38 8 Q40 4, 38 -4 Z"
              fill="url(#bannerGrad)" stroke="#8B7332" strokeWidth="0.8" />
        {/* Banner text */}
        <text
          x="0" y="5"
          textAnchor="middle"
          fontFamily="'Georgia', 'Times New Roman', serif"
          fontSize="7.5"
          fontWeight="bold"
          letterSpacing="2.5"
          fill="#3D2E1E"
        >DISCENDO CRESCIMUS</text>
      </g>

      {/* ── Bottom ornamental dots ── */}
      <g transform="translate(100, 192)">
        {/* Bottom scrollwork */}
        <path d="M-40 -6 Q-46 -2, -42 4 M40 -6 Q46 -2, 42 4"
              stroke="url(#goldGrad)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}
