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
  refreshIframe: () => void;
}

export default function StreamCardHeaderDropdown({
  stream,
  refreshIframe,
}: StreamCardHeaderDropdownProps) {
  const { openDeleteModal, openInfoModal } = useModalStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            size="icon"
            className="text-foreground h-8 w-8 bg-transparent p-0 hover:bg-black hover:text-white"
          >
            <EllipsisVertical size={19} />
          </Button>
        }
      ></DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={refreshIframe}>
            <RefreshCw />
            Refrescar
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className={"bg-accent"} />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => openInfoModal(stream)}>
            <Bolt />
            Info/Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onClick={() => openDeleteModal(stream)}
          >
            <Trash />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
