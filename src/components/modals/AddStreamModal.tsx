"use client";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import StreamForm from "@/components/modals/StreamForm";
import { useState } from "react";

export default function AddStreamModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button>
            <Plus data-icon="inline-start" />
            Agregar Partido
          </Button>
        }
      />
      <DialogContent className={"min-w-300"}>
        <DialogHeader>
          <DialogTitle className={"text-center text-lg font-bold"}>
            Añadir Nueva Transmision
          </DialogTitle>
        </DialogHeader>
        <StreamForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
