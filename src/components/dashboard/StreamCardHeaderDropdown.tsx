import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModalStore } from "@/store/useModalStore";
import type { Stream } from "@/types/Stream";
import { Bolt, EllipsisVertical, RefreshCw, Trash } from "lucide-react";

interface StreamCardHeaderDropdownProps {
  stream: Stream;
}

export default function StreamCardHeaderDropdown({
  stream,
}: StreamCardHeaderDropdownProps) {
  const { openDeleteModal } = useModalStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant={"outline"}
            size="icon"
            className="h-8 w-8 p-0 transition-colors hover:bg-white hover:text-white"
          >
            <EllipsisVertical size={19} />
          </Button>
        }
      ></DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <RefreshCw />
            Refrescar
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className={"bg-accent"} />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Bolt />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onClick={() => openDeleteModal(stream)}
          >
            <Trash data-icon="inline-start" />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
