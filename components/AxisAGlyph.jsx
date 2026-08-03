/**
 * The stylized "A" from the Axis Architects wordmark, rebuilt as a theme-adaptive
 * inline SVG so it can stand in for a letter inside a headline.
 *
 * The letterform strokes use `currentColor` (so the glyph inherits the heading's
 * ink colour and inverts correctly in dark mode); the three short hatch strokes
 * keep the brand red (var(--accent)), the same red hatch that crosses the "A"
 * in the logo. Sized in `em` so it scales with the surrounding type.
 */
export default function AxisAGlyph({ className = '', title = 'A' }) {
  return (
    <svg
      viewBox="0 0 84 100"
      role="img"
      aria-label={title}
      className={className}
      style={{
        height: '0.74em',
        width: 'auto',
        display: 'inline-block',
        verticalAlign: '-0.02em',
      }}
    >
      {/* Letter A, two legs + crossbar, uniform geometric stroke */}
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="butt"
        strokeLinejoin="miter"
      >
        <path d="M42 6 L8 94" />
        <path d="M42 6 L76 94" />
        <path d="M23 56 L61 56" />
      </g>
    </svg>
  );
}
