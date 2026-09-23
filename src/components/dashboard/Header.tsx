"use client";

import { Plus, Trash } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import TimezoneClock from "@/components/dashboard/TimezoneClock";
import { useModalStore } from "@/store/useModalStore";
import { useStreamStore } from "@/store/useStreamStore";
import { useCurrentTime } from "@/utils/useCurrentTime";
import { calculateStreamStatus } from "@/utils/streamUtils";
import { useMemo } from "react";
import { StreamStatus } from "@/types/StreamStatus";

const HeaderStatus = [
  { type: "live" },
  { type: "support" },
  { type: "pending" },
] as const;

// TO DO: Añadir lógica de contador para cada Badge
export default function Header() {
  const streams = useStreamStore((state) => state.streams);
  const now = useCurrentTime(15000);
  const counts = useMemo(() => {
    const tally: Record<StreamStatus | "total", number> = {
      total: streams.length,
      live: 0,
      pending: 0,
      support: 0,
    };

    streams.forEach((stream) => {
      const status = calculateStreamStatus(stream.startTime, stream.link, now);
      if (status in tally) {
        tally[status]++;
      }
    });

    return tally;
  }, [streams, now]);

  const openFormModal = useModalStore((state) => state.openFormModal);
  const openDeleteAllModal = useModalStore((state) => state.openDeleteAllModal);
  return (
    <header className="bg-card flex flex-col">
      <div className="flex h-14 w-full items-center justify-between border-b px-4">
        <p className="text-xl font-extrabold">BASQUETPASS STREAM MANAGER</p>
        <div className="flex gap-5">
          <Button variant={"destructive"} onClick={() => openDeleteAllModal()}>
            <Trash data-icon="inline-start" />
            Eliminar Todo
          </Button>
          <Button onClick={() => openFormModal()}>
            <Plus data-icon="inline-start" />
            Agregar Partido
          </Button>
        </div>
      </div>
      {/* Parte inferior Header*/}
      <div className="flex h-14 w-full items-center justify-between border-b px-4">
        <div className="flex items-center gap-4">
          <StatusBadge type="total" count={counts.total} />
          <Separator
            orientation="vertical"
            className={"h-6 w-0.5 bg-gray-600"}
          />
          {HeaderStatus.map((item) => (
            <StatusBadge
              key={item.type}
              type={item.type}
              count={counts[item.type] ?? 0}
            />
          ))}
        </div>
        <TimezoneClock />
      </div>
    </header>
  );
}
