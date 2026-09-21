"use client";
import { CalendarCog, Plus } from "lucide-react";
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
      <DialogContent
        className={"bg-accent max-h-[95vh] min-w-300 overflow-y-auto"}
      >
        <DialogHeader>
          <DialogTitle
            className={
              "flex items-center justify-center gap-2 text-center text-lg font-bold"
            }
          >
            <CalendarCog />
            Añadir Nueva Transmision
          </DialogTitle>
        </DialogHeader>
        <StreamForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
