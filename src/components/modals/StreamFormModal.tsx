import { CalendarCog } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import StreamForm from "@/components/modals/StreamForm";
import { useModalStore } from "@/store/useModalStore";

export default function StreamFormModal() {
  const { isFormOpen, streamToEdit, closeFormModal } = useModalStore();
  return (
    <Dialog open={isFormOpen} onOpenChange={closeFormModal}>
      <DialogContent
        className={
          "bg-accent max-h-[95vh] min-w-300 overflow-y-auto rounded-none"
        }
      >
        <DialogHeader className="">
          <DialogTitle
            className={
              "flex items-center justify-center gap-2 text-center text-lg font-bold"
            }
          >
            <CalendarCog className="text-primary" />
            {Boolean(streamToEdit)
              ? "Editar Transmisión"
              : "Añadir Transmisión"}
          </DialogTitle>
        </DialogHeader>
        <StreamForm onClose={() => closeFormModal()} />
      </DialogContent>
    </Dialog>
  );
}
