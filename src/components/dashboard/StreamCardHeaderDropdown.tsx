import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bolt, EllipsisVertical, RefreshCw, Trash } from "lucide-react";

export default function StreamCardHeaderDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<EllipsisVertical size={19} className="" />}>
        Open
      </DropdownMenuTrigger>
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
          <DropdownMenuItem variant="destructive">
            <Trash />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
