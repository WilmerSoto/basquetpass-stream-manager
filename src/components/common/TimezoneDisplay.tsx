import { cn } from "@/lib/utils";
import { convertArtToCot } from "@/utils/streamUtils";
import { AR, CO } from "country-flag-icons/react/3x2";

const TIME_ZONES = [
  { code: "COL", zone: "America/Bogota", Flag: CO },
  { code: "ARG", zone: "America/Argentina/Buenos_Aires", Flag: AR },
] as const;

interface TimezoneDisplayProps {
  date: Date | string | null;
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

  // Cambia si la fecha que se recibe es string (stream) o date (reloj header)
  function getTimeValue(code: "COL" | "ARG", zone: string) {
    if (!date) return "--:--";

    if (typeof date === "string") {
      return code === "COL" ? convertArtToCot(date) : date;
    }

    return formatTime(date, zone);
  }
  const isCard = variant === "card";

  return (
    <div
      className={cn(
        "flex items-center gap-4 font-mono text-sm tabular-nums",
        isCard && "text-muted-foreground text-xs",
      )}
    >
      {TIME_ZONES.map((item) => (
        <div key={item.code} className="flex items-center gap-1">
          <item.Flag className={isCard ? "w-5" : "w-7"} />
          {getTimeValue(item.code, item.zone)}
        </div>
      ))}
    </div>
  );
}
