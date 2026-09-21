export interface Encoder {
  number: string;
  url: string;
}

export interface Stream {
  id: string;
  title: string;
  link?: string;
  startTime: string;
  encoders?: Encoder[];
  vmIp?: string;
}
