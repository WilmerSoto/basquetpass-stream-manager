import type { Stream } from "@/types/Stream";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatusBadge from "@/components/common/StatusBadge";
import { calculateStreamStatus } from "@/utils/streamUtils";
import TimezoneDisplay from "@/components/common/TimezoneDisplay";
import StreamCardHeaderDropdown from "@/components/dashboard/StreamCardHeaderDropdown";

interface StreamCardProps {
  stream: Stream;
  currentTime: Date;
  onDeleteRequest: (id: string, title: string) => void;
  onEditRequest: (id: string, stream: Stream) => void;
}

export default function StreamCard({
  stream,
  currentTime,
  onDeleteRequest,
  onEditRequest,
}: StreamCardProps) {
  const currentStatus = calculateStreamStatus(
    stream.startTime,
    stream?.link,
    currentTime,
  );

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
            <StreamCardHeaderDropdown />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-black p-0">
        <iframe
          src={"https://www.youtube.com/embed/zNb2ywbybYA?si=kjJURqU2S-WNSa8T"}
          className="block aspect-video h-full max-h-full w-full max-w-full border-0"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </CardContent>
    </Card>
  );
}
