import type { StreamStatus } from "@/types/StreamStatus";

const SUPPORT_WINDOW_MINUTES = 130;
export interface TimelineStep {
  art: string;
  cot: string;
}
export interface StreamTimeline {
  supportStart: TimelineStep;
  streamStart: TimelineStep;
  estimatedEnd: TimelineStep;
}

export function calculateStreamStatus(startTime: string): StreamStatus {
  const now = new Date();

  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Argentina/Buenos_Aires",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const todayInArt = formatter.format(now);

  const streamTime = new Date(`${todayInArt}T${startTime}:00-03:00`);
  const diffInMinutes = (streamTime.getTime() - now.getTime()) / (1000 * 60);

  if (diffInMinutes <= 0) return "live";
  if (diffInMinutes <= SUPPORT_WINDOW_MINUTES) return "support";

  return "pending";
}

export function addMinutesToTime(
  timeStr: string,
  minutesToAdd: number,
): string {
  if (!timeStr) return "--:--";

  const [hours, minutes] = timeStr.split(":").map(Number);

  const date = new Date();
  date.setHours(hours, minutes, 0, 0);

  date.setMinutes(date.getMinutes() + minutesToAdd);

  const formattedHours = String(date.getHours()).padStart(2, "0");
  const formattedMinutes = String(date.getMinutes()).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
}

export function convertArtToCot(artTimeStr: string): string {
  if (!artTimeStr) return "--:--";

  const [hours, minutes] = artTimeStr.split(":").map(Number);

  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  date.setHours(date.getHours() - 2);

  const formattedHours = String(date.getHours()).padStart(2, "0");
  const formattedMinutes = String(date.getMinutes()).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
}

export function getStreamTimeline(artStartTime: string): StreamTimeline {
  const supportArt = addMinutesToTime(artStartTime, -130); // -2h 10m
  const streamArt = artStartTime || "--:--";
  const endArt = addMinutesToTime(artStartTime, 120); // +2h

  return {
    supportStart: {
      art: supportArt,
      cot: convertArtToCot(supportArt),
    },
    streamStart: {
      art: streamArt,
      cot: convertArtToCot(streamArt),
    },
    estimatedEnd: {
      art: endArt,
      cot: convertArtToCot(endArt),
    },
  };
}
