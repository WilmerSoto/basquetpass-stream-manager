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
import TimezoneClock from "@/components/common/TimezoneClock";
import StatusBadge from "@/components/common/StatusBadge";
import { calculateStreamStatus } from "@/utils/streamUtils";
import { AR, CO } from "country-flag-icons/react/3x2";

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
    <Card className="m-5 border">
      <CardHeader>
        <CardTitle className="flex flex-col gap-2 border-b">
          <div className="flex justify-between">
            <StatusBadge variant="card" type={currentStatus} />
            <div className="flex gap-2">
              <div className="flex items-center justify-center gap-1.5">
                <AR className="size-4" /> XD
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <CO className="size-4" /> XD
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <h1 className="text-lg font-semibold text-white">
              {stream?.title}
            </h1>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
