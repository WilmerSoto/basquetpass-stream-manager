import { AR, CO } from "country-flag-icons/react/3x2";

const TIME_ZONES = [
  { code: "COL", zone: "America/Bogota", Flag: CO },
  { code: "ARG", zone: "America/Argentina/Buenos_Aires", Flag: AR },
] as const;

interface TimezoneDisplayProps {
  date: Date | null;
  variant?: "header" | "card";
}

export default function TimezoneDisplay({
  date,
  variant = "header",
}: TimezoneDisplayProps) {
  function formatTime(targetDate: Date, timeZone: string) {
    return new Intl.DateTimeFormat("es-CO", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(targetDate);
  }

  const isCard = variant === "card";

  const containerStyles = isCard
    ? "flex items-center gap-3 font-mono text-xs tabular-nums text-muted-foreground"
    : "flex items-center gap-4 font-mono text-sm tabular-nums";

  const flagStyles = isCard ? "w-5" : "w-7";

  return (
    <div className={containerStyles}>
      {TIME_ZONES.map((item) => (
        <div key={item.code} className="flex items-center gap-1">
          <item.Flag className={flagStyles} />
          {date ? formatTime(date, item.zone) : "--:--"}
        </div>
      ))}
    </div>
  );
}
