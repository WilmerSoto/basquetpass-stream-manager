import { Plus, Trash } from "lucide-react";
import StatusBadge from "./StatusBadge";

const HeaderStatus = [
  { type: "total" },
  { type: "live" },
  { type: "support" },
  { type: "pending" },
] as const;

export default function Header() {
  return (
    <header className="bg-card flex flex-col">
      <div className="flex h-14 w-full items-center justify-between border-b px-4">
        <p className="font-mono text-xl font-extrabold">
          BASQUETPASS STREAM MANAGER
        </p>
        <div className="flex gap-5">
          <button className="bg-destructive flex h-10 items-center gap-2 rounded-md border px-3 font-mono hover:bg-red-950">
            <Trash size={18} />
            <p className="text-sm">Limpiar Todo</p>
          </button>
          <button className="bg-primary flex h-10 items-center gap-2 rounded-md border px-3 font-mono hover:bg-violet-950">
            <Plus size={18} />
            <p className="text-sm">Agregar Partido</p>
          </button>
        </div>
      </div>
      <div className="flex h-14 w-full items-center justify-between border-b px-4">
        {HeaderStatus.map((item) => (
          <StatusBadge key={item.type} type={item.type} />
        ))}
      </div>
    </header>
  );
}
