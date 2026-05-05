// Animated SVG: "kenteken naar factuur" — ~8s loop.
// Auto rolt in → bestuurder reikt kenteken aan → kenteken in gleuf → cyan glow → factuur met "Betaald"-stempel rolt eruit → auto rolt door.
// Geleverd via dangerouslySetInnerHTML zodat de oorspronkelijke SMIL-attribuutnamen (kebab-case) bewaard blijven.
const HERO_SVG = `
<svg viewBox="0 0 600 450" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Animatie: van kenteken naar factuur">
  <defs>
    <linearGradient id="snellio-floor" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color="#f4f7fa"/>
      <stop offset="100%" stop-color="#eaeff5"/>
    </linearGradient>
    <radialGradient id="snellio-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#0abbd6" stop-opacity="0.55"/>
      <stop offset="60%" stop-color="#0090b8" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#0090b8" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect x="0" y="320" width="600" height="130" fill="url(#snellio-floor)"/>
  <line x1="0" y1="320" x2="600" y2="320" stroke="#0f2133" stroke-opacity="0.08" stroke-width="2"/>

  <g>
    <rect x="380" y="190" width="190" height="160" rx="10" fill="#fff" stroke="#0f2133" stroke-width="3"/>
    <rect x="380" y="190" width="190" height="22" rx="10" fill="#0f2133"/>
    <rect x="400" y="240" width="78" height="10" rx="3" fill="#0f2133"/>
    <text x="400" y="290" font-family="DM Sans, sans-serif" font-weight="700" font-size="14" fill="#0f2133">SNELLIO</text>
    <rect x="400" y="298" width="40" height="3" fill="#0090b8"/>
  </g>

  <circle cx="439" cy="245" r="60" fill="url(#snellio-glow)" opacity="0">
    <animate attributeName="opacity" values="0;0;0;0.9;0.6;0;0;0" keyTimes="0;0.30;0.36;0.42;0.48;0.55;0.95;1" dur="8s" repeatCount="indefinite"/>
  </circle>

  <g transform="translate(560, 250)">
    <g>
      <animateTransform attributeName="transform" type="translate" values="0,0; 0,0; 0,0; 0,0; 30,0; 30,0; 30,0; 0,0" keyTimes="0;0.40;0.48;0.55;0.65;0.78;0.95;1" dur="8s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;0;0;1;1;1;0" keyTimes="0;0.40;0.48;0.54;0.55;0.78;0.92;1" dur="8s" repeatCount="indefinite"/>
      <rect x="0" y="-40" width="60" height="80" rx="3" fill="#fff" stroke="#0f2133" stroke-width="2"/>
      <rect x="6" y="-32" width="32" height="3" fill="#0f2133"/>
      <rect x="6" y="-24" width="48" height="2" fill="#5f7791"/>
      <rect x="6" y="-18" width="48" height="2" fill="#5f7791"/>
      <rect x="6" y="-12" width="36" height="2" fill="#5f7791"/>
      <rect x="6" y="-4" width="48" height="2" fill="#5f7791"/>
      <rect x="6" y="2" width="40" height="2" fill="#5f7791"/>
      <g transform="translate(8, 14) rotate(-8)">
        <rect x="0" y="0" width="44" height="18" rx="3" fill="#e3f6ee" stroke="#12a87a" stroke-width="1.5"/>
        <text x="5" y="13" font-family="DM Sans, sans-serif" font-weight="800" font-size="10" fill="#12a87a" letter-spacing="0.5">BETAALD</text>
      </g>
    </g>
  </g>

  <g>
    <animateTransform attributeName="transform" type="translate" values="-260,0; -260,0; 0,0; 0,0; 0,0; 0,0; 0,0; 280,0; 280,0" keyTimes="0;0.04;0.22;0.30;0.55;0.78;0.85;0.96;1" dur="8s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"/>
    <g transform="translate(150, 230)">
      <ellipse cx="80" cy="100" rx="80" ry="6" fill="#0f2133" opacity="0.15"/>
      <path d="M 5,80 Q 5,55 30,55 L 50,55 Q 60,30 90,30 L 130,30 Q 150,30 158,55 L 165,55 Q 175,55 175,75 L 175,90 L 5,90 Z" fill="#3a5775" stroke="#0f2133" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M 55,55 L 95,32 L 125,32 L 145,55 Z" fill="#cfdce8" stroke="#0f2133" stroke-width="2" stroke-linejoin="round"/>
      <line x1="100" y1="32" x2="100" y2="55" stroke="#0f2133" stroke-width="2"/>
      <line x1="98" y1="55" x2="98" y2="88" stroke="#0f2133" stroke-width="1.5" opacity="0.4"/>
      <rect x="62" y="68" width="10" height="2.5" rx="1" fill="#0f2133"/>
      <circle cx="170" cy="68" r="3" fill="#ffd86b"/>
      <g>
        <circle cx="78" cy="42" r="7" fill="#0f2133"/>
        <path d="M 70,55 Q 78,46 86,55 L 86,55 Z" fill="#0f2133"/>
        <g>
          <animateTransform attributeName="transform" type="translate" values="0,0; 0,0; 0,0; 35,-8; 35,-8; 0,0; 0,0; 0,0; 0,0" keyTimes="0;0.22;0.28;0.34;0.42;0.50;0.78;0.95;1" dur="8s" repeatCount="indefinite"/>
          <rect x="55" y="48" width="22" height="5" rx="2" fill="#0f2133"/>
          <g>
            <animate attributeName="opacity" values="1;1;1;1;0;0;0;0;0" keyTimes="0;0.22;0.28;0.34;0.40;0.50;0.78;0.95;1" dur="8s" repeatCount="indefinite"/>
            <rect x="40" y="44" width="22" height="11" rx="1.5" fill="#ffd400" stroke="#0f2133" stroke-width="1"/>
            <rect x="40" y="44" width="5" height="11" rx="1.5" fill="#003399"/>
            <text x="46" y="53" font-family="DM Mono, monospace" font-weight="700" font-size="6" fill="#0f2133">NL-01</text>
          </g>
        </g>
      </g>
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0 40 90" to="360 40 90" dur="0.8s" repeatCount="indefinite"/>
        <circle cx="40" cy="90" r="14" fill="#0f2133"/>
        <circle cx="40" cy="90" r="6" fill="#5f7791"/>
        <line x1="40" y1="78" x2="40" y2="102" stroke="#5f7791" stroke-width="1.5"/>
        <line x1="28" y1="90" x2="52" y2="90" stroke="#5f7791" stroke-width="1.5"/>
      </g>
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0 140 90" to="360 140 90" dur="0.8s" repeatCount="indefinite"/>
        <circle cx="140" cy="90" r="14" fill="#0f2133"/>
        <circle cx="140" cy="90" r="6" fill="#5f7791"/>
        <line x1="140" y1="78" x2="140" y2="102" stroke="#5f7791" stroke-width="1.5"/>
        <line x1="128" y1="90" x2="152" y2="90" stroke="#5f7791" stroke-width="1.5"/>
      </g>
    </g>
  </g>

  <g>
    <g>
      <animate attributeName="opacity" values="0;0;0;0;1;1;0;0;0" keyTimes="0;0.34;0.38;0.40;0.41;0.48;0.50;0.95;1" dur="8s" repeatCount="indefinite"/>
      <animateTransform attributeName="transform" type="translate" values="240,275; 240,275; 240,275; 240,275; 240,275; 410,245; 410,245; 410,245; 410,245" keyTimes="0;0.34;0.38;0.40;0.41;0.48;0.50;0.95;1" dur="8s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"/>
      <rect x="0" y="0" width="56" height="22" rx="3" fill="#ffd400" stroke="#0f2133" stroke-width="1.5"/>
      <rect x="0" y="0" width="11" height="22" rx="3" fill="#003399"/>
      <text x="3" y="11" font-family="DM Sans, sans-serif" font-weight="800" font-size="6" fill="#ffe600">★</text>
      <text x="2" y="19" font-family="DM Sans, sans-serif" font-weight="800" font-size="6" fill="#ffe600">NL</text>
      <text x="16" y="16" font-family="DM Mono, monospace" font-weight="700" font-size="11" fill="#0f2133" letter-spacing="0.5">AB-90-CD</text>
    </g>
  </g>
</svg>
`

export default function HeroAnimation() {
  return (
    <div
      className="bg-white border border-[rgba(15,33,51,.08)] rounded-3xl shadow-[0_24px_64px_rgba(15,33,51,.10)] overflow-hidden aspect-[4/3] w-full"
      dangerouslySetInnerHTML={{ __html: HERO_SVG }}
    />
  )
}
