export function SquircleMask() {
  return (
    <svg
      style={{ position: 'absolute', width: 0, height: 0 }}
      aria-hidden="true"
    >
      <defs>
        <clipPath id="squircle" clipPathUnits="objectBoundingBox">
          <path d="M 0,0.5 C 0,0.1725 0.1725,0 0.5,0 0.8275,0 1,0.1725 1,0.5 1,0.8275 0.8275,1 0.5,1 0.1725,1 0,0.8275 0,0.5" />
        </clipPath>
      </defs>
    </svg>
  );
}
