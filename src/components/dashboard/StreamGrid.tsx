"use client";

import StreamCard from "@/components/dashboard/StreamCard";
import { useStreamStore } from "@/store/useStreamStore";
import { useEffect, useState } from "react";
import { MonitorOff, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/store/useModalStore";

function getGridClass(count: number) {
  if (count <= 1) return "grid-cols-1 grid-rows-1";
  if (count === 2) return "grid-cols-2 grid-rows-1";
  if (count === 3) return "grid-cols-3 grid-rows-1";
  if (count === 4) return "grid-cols-2 grid-rows-2"; // 2x2
  if (count <= 6) return "grid-cols-3 grid-rows-2"; // 3x2
  return "grid-cols-3 grid-rows-3"; // 3x3
}

export default function StreamGrid() {
  const getAllStreams = useStreamStore((state) => state.streams);
  const openFormModal = useModalStore((state) => state.openFormModal);

  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(timer);
  }, []);

  if (getAllStreams.length === 0) {
    return (
      <div className="flex h-[90vh] items-center justify-center">
        <div className="border-primary bg-accent flex w-200 flex-col items-center justify-center gap-4 rounded-lg border p-8">
          <MonitorOff className="text-primary" size={45} />
          <h1 className="text-3xl font-bold">
            No hay transmisiones por mostrar
          </h1>
          <p className="text-muted-foreground text-md text-center font-light">
            El Grid de Streams esta a la espera de nuevas transmisiones. Puedes
            añadir un nuevo partido con el boton de abajo.
          </p>
          <Button onClick={() => openFormModal()}>
            <Plus data-icon="inline-start" />
            Agregar Partido
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`m-3 grid h-[97vh] gap-2 ${getGridClass(getAllStreams.length)}`}
    >
      {getAllStreams.map((stream) => (
        <StreamCard key={stream.id} stream={stream} currentTime={now} />
      ))}
    </div>
  );
}
