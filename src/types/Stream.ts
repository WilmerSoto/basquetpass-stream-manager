import type { StreamStatus } from "@/types/StreamStatus";

export interface Encoder {
  number: string;
  url: string;
}

export interface Stream {
  id: string;
  title: string;
  status: StreamStatus;
  link?: string;
  startTime: string;
  encoders?: Encoder[];
  vmIp?: string;
}
