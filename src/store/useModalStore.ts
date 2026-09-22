import { create } from "zustand";
import type { Stream } from "@/types/Stream";

interface StreamToDelete {
  id: string;
  title: string;
}

interface ModalState {
  // Modal de Formulario (Añadir / Editar)
  isFormOpen: boolean;
  streamToEdit: Stream | null;
  openFormModal: (stream?: Stream) => void;
  closeFormModal: () => void;

  // Modal de Eliminar un solo Stream
  isDeleteOpen: boolean;
  streamToDelete: StreamToDelete | null;
  openDeleteModal: (stream: StreamToDelete) => void;
  closeDeleteModal: () => void;

  // Modal de Eliminar Todo
  isDeleteAllOpen: boolean;
  openDeleteAllModal: () => void;
  closeDeleteAllModal: () => void;

  // Modal de Info / Detalle
  isInfoOpen: boolean;
  streamForInfo: Stream | null;
  openInfoModal: (stream: Stream) => void;
  closeInfoModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  // Formulario (Añadir / Editar)
  isFormOpen: false,
  streamToEdit: null,
  openFormModal: (stream) =>
    set({
      isFormOpen: true,
      streamToEdit: stream || null, // Si viene stream es Edit, si no es Add
    }),
  closeFormModal: () =>
    set({
      isFormOpen: false,
      streamToEdit: null,
    }),

  // Eliminar Individual
  isDeleteOpen: false,
  streamToDelete: null,
  openDeleteModal: (stream) =>
    set({
      isDeleteOpen: true,
      streamToDelete: stream,
    }),
  closeDeleteModal: () =>
    set({
      isDeleteOpen: false,
      streamToDelete: null,
    }),

  // Eliminar Todo
  isDeleteAllOpen: false,
  openDeleteAllModal: () => set({ isDeleteAllOpen: true }),
  closeDeleteAllModal: () => set({ isDeleteAllOpen: false }),

  // Detalle / Info
  isInfoOpen: false,
  streamForInfo: null,
  openInfoModal: (stream) =>
    set({
      isInfoOpen: true,
      streamForInfo: stream,
    }),
  closeInfoModal: () =>
    set({
      isInfoOpen: false,
      streamForInfo: null,
    }),
}));
