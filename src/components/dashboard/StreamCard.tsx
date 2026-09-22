import type { Stream } from "@/types/Stream";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StatusBadge from "@/components/common/StatusBadge";
import { calculateStreamStatus } from "@/utils/streamUtils";
import { AR, CO } from "country-flag-icons/react/3x2";
import TimezoneDisplay from "@/components/common/TimezoneDisplay";
import { Separator } from "@/components/ui/separator";

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
    <Card className="gap-1 border py-2">
      <CardHeader className="px-3">
        <CardTitle className="flex flex-col border-b">
          <div className="flex justify-between">
            <StatusBadge variant="card" type={currentStatus} />
            <TimezoneDisplay variant="card" date={stream.startTime} />
          </div>
          <div className="flex gap-4">
            <h1 className="text-lg font-semibold text-white">
              {stream?.title}
            </h1>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-black p-0">
        <iframe
          src={"https://www.youtube.com/embed/ATuIPAG23P8?si=uMUnss7ajLvbTH_M"}
          className="block aspect-video h-full max-h-full w-full max-w-full border-0"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
