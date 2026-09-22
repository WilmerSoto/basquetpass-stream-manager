"use client";

import { useModalStore } from "@/store/useModalStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useStreamStore } from "@/store/useStreamStore";

export default function DeleteModal() {
  const { isDeleteOpen, streamToDelete, closeDeleteModal } = useModalStore();
  const deleteStream = useStreamStore((state) => state.removeStream);
  return (
    <Dialog open={isDeleteOpen} onOpenChange={closeDeleteModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>¿Desea eliminar el partido?</DialogTitle>
          <DialogDescription>
            ¿Estas seguro de eliminar{" "}
            <span className="font-bold">{streamToDelete?.title}</span>?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose
            render={
              <Button variant="outline" onClick={() => closeDeleteModal()}>
                Cancelar
              </Button>
            }
          />
          <Button
            variant={"destructive"}
            onClick={() => {
              if (streamToDelete) {
                deleteStream(streamToDelete.id);
                closeDeleteModal();
              }
            }}
          >
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
