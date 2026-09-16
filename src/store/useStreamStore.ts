import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Stream } from "@/types/stream";

interface StreamStore {
  streams: Stream[];
  addStream: (stream: Omit<Stream, "id">) => void;
  updateStream: (id: string, updateData: Partial<Omit<Stream, "id">>) => void;
  removeStream: (id: string) => void;
  clearAllStreams: () => void;
  getStreamById: (id: string) => Stream | undefined;
}

export const useStreamStore = create<StreamStore>()(
  persist(
    (set, get) => ({
      streams: [],

      // C - CREATE
      addStream: (newStream) =>
        set((state) => ({
          streams: [
            ...state.streams,
            {
              ...newStream,
              id: crypto.randomUUID(),
              encoders: newStream.encoders ?? [],
            },
          ],
        })),

      // U - UPDATE
      updateStream: (id, updatedData) =>
        set((state) => ({
          streams: state.streams.map((stream) =>
            stream.id === id ? { ...stream, ...updatedData } : stream,
          ),
        })),

      // D - DELETE
      removeStream: (id) =>
        set((state) => ({
          streams: state.streams.filter((stream) => stream.id !== id),
        })),

      // D - DELETE ALL
      clearAllStreams: () => set({ streams: [] }),

      // R - READ (Lectura puntual fuera del renderizado reactivo)
      getStreamById: (id) => get().streams.find((stream) => stream.id === id),
    }),
    {
      name: "basquetpass-streams-v1",
    },
  ),
);
