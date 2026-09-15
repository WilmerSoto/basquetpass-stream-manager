import type { StreamStatus } from "@/types/streamStatus";
import { cn } from "cn";
import {
  Activity,
  LucideIcon,
  RotateCwFadingClock,
  ServerCog,
  TvMinimalPlay,
} from "lucide-react";

type GlobalStatus = StreamStatus | "total";

interface StatusBadgeProps {
  type: GlobalStatus;
  count?: number;
  variant?: "header" | "card";
}

interface BadgeStyle {
  label: string;
  bg: string;
  textColor: string;
  icon: LucideIcon;
}

const statusStyles: Record<GlobalStatus, BadgeStyle> = {
  live: {
    label: "En Vivo",
    bg: "bg-emerald-500/20",
    textColor: "text-emerald-400",
    icon: TvMinimalPlay,
  },
  support: {
    label: "En Soporte",
    bg: "bg-yellow-500/30",
    textColor: "text-yellow-500",
    icon: ServerCog,
  },
  pending: {
    label: "Link Pendiente",
    bg: "bg-gray-500/20",
    textColor: "text-gray-400",
    icon: RotateCwFadingClock,
  },
  total: {
    label: "En Total",
    bg: "bg-emerald-500/20",
    textColor: "text-emerald-400",
    icon: Activity,
  },
};

export default function StatusBadge({
  type,
  count,
  variant = "header",
}: StatusBadgeProps) {
  const classConfig = statusStyles[type];
  const IconComponent = classConfig.icon;
  const isCard = variant === "card";

  return (
    <div
      className={`flex items-center gap-2 rounded-md ${classConfig.bg} ${classConfig.textColor}`}
    >
      <IconComponent size={18} />
      <p
        className={cn(
          "text-sm",
          isCard && "font-semibold tracking-wider uppercase",
        )}
      >
        {count !== undefined && `${count} `}
        {classConfig.label}
      </p>
    </div>
  );
}
