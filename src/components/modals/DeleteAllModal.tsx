import { useModalStore } from "@/store/useModalStore";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useStreamStore } from "@/store/useStreamStore";

export default function DeleteAllModal() {
  const { isDeleteAllOpen, closeDeleteAllModal } = useModalStore();
  const deleteAllStreams = useStreamStore((state) => state.clearAllStreams);

  return (
    <AlertDialog open={isDeleteAllOpen} onOpenChange={closeDeleteAllModal}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estas seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Deseas eliminar todas las transmisiones de la grilla?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            variant={"destructive"}
            onClick={() => {
              deleteAllStreams();
              closeDeleteAllModal();
            }}
          >
            Eliminar todo
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
