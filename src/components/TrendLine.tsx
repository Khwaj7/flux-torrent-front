export const TrendLine = ({ color }: { color: string }) => {
  // On génère des points aléatoires pour simuler une tendance
  const points = Array.from({ length: 8 }, (_, i) => 
    `${i * 10},${Math.floor(Math.random() * 20)}`
  ).join(' ');

  return (
    <svg width="60" height="20" className="opacity-60 group-hover:opacity-100 transition-opacity">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
};