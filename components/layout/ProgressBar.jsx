export default function ProgressBar ({ percent, children, },) {
  return (
    <div className="relative pt-1">
      <div
        className="overflow-hidden h-10 mb-4 text-xs flex rounded
        bg-blue-racing">
        <div style={{ minWidth: `${Math.floor(percent,)}%`, }}
          className="px-1 shadow-none flex flex-col text-center
          whitespace-nowrap text-white justify-center bg-blue-ultra">
          {children}
        </div>
      </div>
    </div>
  );
}
