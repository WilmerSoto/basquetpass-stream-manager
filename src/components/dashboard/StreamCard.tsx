import type { Stream } from "@/types/Stream";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatusBadge from "@/components/common/StatusBadge";
import { calculateStreamStatus } from "@/utils/streamUtils";
import TimezoneDisplay from "@/components/common/TimezoneDisplay";
import StreamCardHeaderDropdown from "@/components/dashboard/StreamCardHeaderDropdown";
import { useState } from "react";
import { Link2Off, MonitorCog } from "lucide-react";
import { useModalStore } from "@/store/useModalStore";
import { Button } from "@/components/ui/button";

interface StreamCardProps {
  stream: Stream;
  currentTime: Date;
}

export default function StreamCard({ stream, currentTime }: StreamCardProps) {
  const openFormModal = useModalStore((state) => state.openFormModal);

  const currentStatus = calculateStreamStatus(
    stream.startTime,
    stream?.link,
    currentTime,
  );
  const [refreshKey, setRefreshKey] = useState(0);
  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <Card className="gap-1 border pt-2 pb-0">
      <CardHeader className="flex-none px-3">
        <CardTitle className="flex flex-col gap-0.5 border-b">
          <div className="flex justify-between">
            <StatusBadge variant="card" type={currentStatus} />
            <TimezoneDisplay variant="card" date={stream.startTime} />
          </div>
          <div className="flex w-full min-w-0 items-center justify-between gap-0">
            <h3
              className="line-clamp-1 min-w-0 flex-1 text-center text-sm leading-tight font-semibold"
              title={stream?.title}
            >
              {stream?.title}
            </h3>
            <StreamCardHeaderDropdown
              stream={stream}
              refreshIframe={handleRefresh}
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-black p-0">
        {stream.link ? (
          <iframe
            key={refreshKey}
            src={stream.link}
            className="block aspect-video h-full max-h-full w-full max-w-full border-0"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        ) : (
          <div>
            <div className="bg-accent flex flex-col items-center gap-2 rounded-2xl p-4">
              <Link2Off className="text-primary" />
              <div className="flex flex-col items-center text-center">
                <p className="text-lg font-bold">
                  Esperando URL de Transmisión
                </p>
                <p className="text-muted-foreground text-sm">
                  El partido fue registrado pero no cuenta con link asignado
                </p>
              </div>
              <Button onClick={() => openFormModal(stream)}>
                <MonitorCog />
                Editar
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
