import type { Encoder, Stream } from "@/types/Stream";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import { useStreamStore } from "@/store/useStreamStore";
import { StreamStatus } from "@/types/StreamStatus";
import { calculateStreamStatus } from "@/utils/streamUtils";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert, XIcon } from "lucide-react";
import { AR } from "country-flag-icons/react/3x2";
import StreamScheduleBreakdown from "@/components/common/StreamScheduleBreakdown";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";

interface StreamForm {
  title: string;
  status: StreamStatus;
  link?: string;
  startTime: string;
  encoders?: Encoder[];
  vmIp?: string;
}

interface StreamFormsProps {
  onClose?: () => void;
  initialData?: Stream;
}

export default function StreamForm({ onClose, initialData }: StreamFormsProps) {
  const addStream = useStreamStore((state) => state.addStream);
  const updateStream = useStreamStore((state) => state.updateStream);

  const { register, control, handleSubmit } = useForm<StreamForm>({
    defaultValues: initialData ?? {
      title: "",
      status: "pending",
      link: "",
      startTime: "18:00",
      encoders: [{ number: "", url: "" }],
      vmIp: "",
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
    if (initialData) {
      updateStream(initialData.id, data);
    } else {
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
    }

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
        {/*Array dinamico de VMs*/}
        <FieldSet className="bg-card gap-4">
          <FieldLegend variant="label">Encoder(s)</FieldLegend>
          <FieldDescription>
            Info de los encoder(s) a usar. Numero y link de configuración
          </FieldDescription>
          <FieldGroup className="gap-4">
            {fields.map((field, index) => (
              <Controller
                key={field.id}
                name={`encoders.${index}.number`}
                control={control}
                render={({ field: controllerField, fieldState }) => (
                  <Field
                    orientation={"horizontal"}
                    data-invalid={fieldState.invalid}
                  >
                    <FieldContent>
                      <InputGroup>
                        <InputGroupInput
                          {...controllerField}
                          id={`form-array-encoder-${index}`}
                          aria-invalid={fieldState.invalid}
                          placeholder="100"
                          type="text"
                          autoComplete="off"
                        />
                        {fields.length > 1 && (
                          <InputGroupAddon align={"inline-end"}>
                            <InputGroupButton
                              type="button"
                              variant={"ghost"}
                              size={"icon-xs"}
                              onClick={() => remove(index)}
                              aria-label={`Quitar encoder ${index + 1}`}
                            >
                              <XIcon />
                            </InputGroupButton>
                          </InputGroupAddon>
                        )}
                      </InputGroup>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                  </Field>
                )}
              />
            ))}
            <Button
              type="button"
              variant={"outline"}
              size={"sm"}
              onClick={() => append({ number: "", url: "" })}
            >
              Añadir encoder
            </Button>
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
    </form>
  );
}
