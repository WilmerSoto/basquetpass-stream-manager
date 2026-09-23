import StreamDetails from "@/components/modals/StreamDetails";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModalStore } from "@/store/useModalStore";
import { Info } from "lucide-react";

export default function StreamDetailsModal() {
  const { isInfoOpen, streamForInfo, closeInfoModal } = useModalStore();

  return (
    <Dialog open={isInfoOpen} onOpenChange={closeInfoModal}>
      <DialogContent
        className={
          "bg-accent max-h-[95vh] min-w-300 overflow-y-auto rounded-none"
        }
      >
        <DialogHeader>
          <DialogTitle
            className={
              "flex items-center justify-center gap-2 text-center text-xl font-bold"
            }
          >
            <Info className="text-primary" />
            Detalles Técnicos - {streamForInfo?.title}
          </DialogTitle>
        </DialogHeader>
        <StreamDetails />
      </DialogContent>
    </Dialog>
  );
}
