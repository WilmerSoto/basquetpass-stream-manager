"use client";

import { AR, CO } from "country-flag-icons/react/3x2";
import { useEffect, useState } from "react";

const TIME_ZONES = [
  { code: "COL", zone: "America/Bogota", Flag: CO },
  { code: "ARG", zone: "America/Argentina/Buenos_Aires", Flag: AR },
] as const;

export default function TimezoneClock() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date, timeZone: string) => {
    return new Intl.DateTimeFormat("es-CO", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  };

  if (!time) {
    return (
      <div className="flex items-center gap-4 font-mono text-sm tabular-nums">
        {TIME_ZONES.map((item) => (
          <div key={item.code} className="flex items-center gap-1">
            <item.Flag className="w-7" />
            --:--
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 font-mono text-sm tabular-nums">
      {TIME_ZONES.map((item) => (
        <div key={item.code} className="flex items-center gap-1">
          <item.Flag className="w-7" />
          {formatTime(time, item.zone)}
        </div>
      ))}
    </div>
  );
}
