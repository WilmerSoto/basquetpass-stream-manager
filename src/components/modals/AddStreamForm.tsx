import type { Encoder } from "@/types/Stream";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import { useStreamStore } from "@/store/useStreamStore";
import { StreamStatus } from "@/types/StreamStatus";
import { calculateStreamStatus } from "@/utils/streamUtils";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";
import { AR } from "country-flag-icons/react/3x2";
import StreamScheduleBreakdown from "@/components/common/StreamScheduleBreakdown";

interface StreamForm {
  title: string;
  status: StreamStatus;
  link?: string;
  startTime: string;
  encoders?: Encoder[];
}

export default function AddStreamForm({ onClose }: { onClose?: () => void }) {
  const addStream = useStreamStore((state) => state.addStream);

  const { register, control, handleSubmit } = useForm<StreamForm>({
    defaultValues: {
      title: "",
      status: "pending",
      link: "",
      startTime: "18:00",
      encoders: [{ number: "", url: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "encoders",
  });

  const currentStartTime = useWatch({
    control,
    name: "startTime",
  });

  const onSubmit = (data: StreamForm) => {
    const formattedEncoders: Encoder[] = (data.encoders ?? [])
      .filter((e) => e.url.trim() !== "")
      .map((e) => ({
        number: e.number.trim(),
        url: e.url.trim(),
      }));

    addStream({
      title: data.title,
      startTime: data.startTime,
      status: calculateStreamStatus(data.startTime),
      link: data.link,
      encoders: formattedEncoders,
    });

    onClose?.();
  };

  return (
    <form
      id="form-stream"
      onSubmit={handleSubmit(onSubmit)}
      className="font-mono"
    >
      <FieldGroup>
        <Controller
          name="title"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>
                Titulo del Partido <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                placeholder="Ingresa el nombre del partido"
                autoComplete="off"
                required
              />
            </Field>
          )}
        />
        <div className="bg-card flex flex-col gap-1 p-4">
          <Controller
            name="startTime"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>
                  Hora del Partido <span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  type="time"
                  {...field}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  required
                />
              </Field>
            )}
          />
          <Alert variant={"destructive"}>
            <TriangleAlert />
            <AlertTitle className="flex gap-2">
              Hora ARG
              <AR className="size-5" />
            </AlertTitle>
            <AlertDescription>
              La hora ingresada del partido debe esta en zona horaria Argentina
            </AlertDescription>
          </Alert>
          <StreamScheduleBreakdown startTimeArt={currentStartTime} />
        </div>
        <Controller
          name="link"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Link del Stream</FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                placeholder="https://..."
                autoComplete="off"
              />
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  );
}
