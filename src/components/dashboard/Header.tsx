import { Trash } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import TimezoneClock from "@/components/common/TimezoneClock";
import AddStreamModal from "@/components/modals/AddStreamModal";

const HeaderStatus = [
  { type: "live" },
  { type: "support" },
  { type: "pending" },
] as const;

// TO DO: Añadir logica de contador para cada Badge
export default function Header() {
  return (
    <header className="bg-card flex flex-col">
      <div className="flex h-14 w-full items-center justify-between border-b px-4">
        <p className="font-mono text-xl font-extrabold">
          BASQUETPASS STREAM MANAGER
        </p>
        <div className="flex gap-5">
          <Button variant={"destructive"}>
            <Trash data-icon="inline-start" />
            Eliminar Todo
          </Button>
          <AddStreamModal />
        </div>
      </div>
      {/* Parte inferior Header*/}
      <div className="flex h-14 w-full items-center justify-between border-b px-4">
        <div className="flex items-center gap-4">
          <StatusBadge type="total" />
          <Separator
            orientation="vertical"
            className={"h-6 w-0.5 bg-gray-600"}
          />
          {HeaderStatus.map((item) => (
            <StatusBadge key={item.type} type={item.type} />
          ))}
        </div>
        <TimezoneClock />
      </div>
    </header>
  );
}
