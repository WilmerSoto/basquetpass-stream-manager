import StreamScheduleBreakdown from "@/components/common/StreamScheduleBreakdown";
import { useModalStore } from "@/store/useModalStore";
import { Button } from "@/components/ui/button";
import { AlarmClockCheck, Check, Copy, Database, LinkIcon } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { calculateStreamStatus } from "@/utils/streamUtils";
import StatusBadge from "@/components/common/StatusBadge";

export default function StreamDetails() {
  const { streamForInfo } = useModalStore();

  const currentStatus = streamForInfo
    ? calculateStreamStatus(
        streamForInfo.startTime,
        streamForInfo?.link,
        new Date(),
      )
    : null;

  const [copied, setCopied] = useState(false);
  const handleCopy = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="flex flex-col gap-4 font-mono text-base">
      <div className="bg-card flex flex-col gap-2 p-4">
        <h1 className="flex items-center gap-2 font-bold">
          <AlarmClockCheck />
          Desglose Cronológico
          {currentStatus && <StatusBadge variant="card" type={currentStatus} />}
        </h1>
        <StreamScheduleBreakdown
          startTimeArt={streamForInfo?.startTime ?? ""}
        />
      </div>
      <div className="bg-card flex flex-col gap-2 p-4">
        <h1 className="flex items-center gap-2 font-bold">
          <LinkIcon /> Link de la Transmisión
        </h1>
        <Link
          href={streamForInfo?.link ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-accent hover:bg-accent/50 block w-fit truncate border px-3 py-1.5 text-sm hover:underline"
        >
          {streamForInfo?.link ?? ""}
        </Link>
      </div>
      {/* Sección de IP y VM*/}
      <div className="bg-card flex flex-col gap-2 p-4">
        <h1 className="flex items-center gap-2 text-xl font-bold">
          <Database /> Datos de Infraestructura
        </h1>
        <div className="flex flex-col gap-2 px-8">
          <div className="flex flex-col gap-1">
            <h2>Dirección IP de VM:</h2>
            <div className="flex gap-2">
              <div className="bg-accent w-fit border px-3 py-1.5 text-sm font-bold">
                {streamForInfo?.vmIp ?? ""}
              </div>
              <Button
                variant="default"
                size="sm"
                onClick={() => handleCopy(streamForInfo?.link ?? "")}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copiar</span>
                  </>
                )}
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h2>Información de los Encoders:</h2>
            {streamForInfo?.encoders?.map((stream, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="bg-accent w-fit border px-3 py-1.5 text-sm font-bold">
                  {stream.number ?? ""}
                </div>
                <Link
                  href={stream.url ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent hover:bg-accent/50 block w-fit flex-1 truncate border px-3 py-1.5 text-sm hover:underline"
                >
                  {stream.url ?? ""}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
