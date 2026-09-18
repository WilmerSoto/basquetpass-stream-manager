import { getStreamTimeline } from "@/utils/streamUtils";
import { AlarmClock, CalendarX, Play, WifiCog } from "lucide-react";
import { AR, CO } from "country-flag-icons/react/3x2";

interface StreamScheduleBreakdownProps {
  startTimeArt: string;
}
const SCHEDULE_BREAKDOWN = [
  { key: "supportStart", title: "SOPORTE (-2h 10m)", icon: WifiCog },
  { key: "streamStart", title: "INICIO PARTIDO", icon: Play },
  { key: "estimatedEnd", title: "FIN ESTIMADO (2h)", icon: CalendarX },
] as const;

export default function StreamScheduleBreakdown({
  startTimeArt,
}: StreamScheduleBreakdownProps) {
  const timeline = getStreamTimeline(startTimeArt);
  return (
    <div className="flex flex-col gap-2 font-mono">
      <div className="flex items-center gap-2">
        <AlarmClock />
        <h1 className="font-extrabold">CALCULO DINAMICO DE LAS HORAS</h1>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {SCHEDULE_BREAKDOWN.map((config) => {
          const Icon = config.icon;
          const timeData = timeline[config.key];
          return (
            <div
              key={config.key}
              className="flex flex-col gap-2 rounded-lg border p-3 text-center"
            >
              <div className="flex items-center justify-center gap-1.5">
                <Icon className="size-5" />
                <span className="font-semibold">{config.title}</span>
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center justify-center gap-1.5">
                  <CO className="size-5" />
                  <p className="text-sm">{timeData.cot} COT</p>
                </div>
                <div className="flex items-center justify-center gap-1.5">
                  <AR className="size-4" />
                  <p className="text-muted-foreground text-xs">
                    {timeData.art} ART
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
