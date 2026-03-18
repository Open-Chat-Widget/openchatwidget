export const HELPFUL_CHAT_LOGO_DATA_URI =
  "data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Cg clip-path='url(%23clip0_10_20)'%3E %3Cmask id='mask0_10_20' style='mask-type:luminance' maskUnits='userSpaceOnUse' x='-20' y='0' width='240' height='200'%3E %3Cpath d='M220 0H-20V200H220V0Z' fill='white'/%3E %3Cpath d='M-20 76C0 64 20 88 40 76C60 64 80 88 100 76C120 64 140 88 160 76C180 64 200 88 220 76V102C200 114 180 90 160 102C140 114 120 90 100 102C80 114 60 90 40 102C20 114 0 90 -20 102V76Z' fill='black'/%3E %3C/mask%3E %3Cg mask='url(%23mask0_10_20)'%3E %3Cpath d='M100 156C143.078 156 178 125.555 178 88C178 50.4446 143.078 20 100 20C56.9218 20 22 50.4446 22 88C22 125.555 56.9218 156 100 156Z' fill='%2300E46A'/%3E %3Cpath d='M76 146L64 184L106 152L76 146Z' fill='%2300E46A'/%3E %3C/g%3E %3C/g%3E %3Cdefs%3E %3CclipPath id='clip0_10_20'%3E %3Crect width='200' height='200' fill='white'/%3E %3C/clipPath%3E %3C/defs%3E %3C/svg%3E";

const OPENCHAT_THEME_SCOPE = "[data-openchatwidget-root]";

export function buildOpenChatWidgetThemeCss(
  scopeSelector = OPENCHAT_THEME_SCOPE,
) {
  return `
@import url("https://fonts.googleapis.com/css2?family=Sora:wght@600;700&family=Space+Grotesk:wght@400;500;700&display=swap");

${scopeSelector},
${scopeSelector} *,
${scopeSelector} *::before,
${scopeSelector} *::after {
  box-sizing: border-box;
}

${scopeSelector} {
  color: #1b1d22;
  font-size: 16px;
  line-height: 1.4;
  font-family: "Space Grotesk", "Avenir Next", "Segoe UI", sans-serif;
  text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

${scopeSelector} button,
${scopeSelector} input,
${scopeSelector} select,
${scopeSelector} textarea {
  font: inherit;
}

@keyframes helpfulChatDotPulse {
  0%, 100% {
    opacity: 0.2;
    transform: translateY(0);
  }
  50% {
    opacity: 1;
    transform: translateY(-2px);
  }
}

@keyframes helpfulChatEmptyFadeIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes helpfulChatReasoningShimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
`;
}
