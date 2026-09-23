import type { Encoder, Stream } from "@/types/Stream";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import { useStreamStore } from "@/store/useStreamStore";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlarmClock,
  DatabasePlus,
  Plus,
  TriangleAlert,
  XIcon,
} from "lucide-react";
import { AR } from "country-flag-icons/react/3x2";
import StreamScheduleBreakdown from "@/components/common/StreamScheduleBreakdown";
import { Button } from "@/components/ui/button";

interface StreamForm {
  title: string;
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

  const { control, handleSubmit } = useForm<StreamForm>({
    defaultValues: initialData ?? {
      title: "",
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
        link: data.link,
        encoders: formattedEncoders,
        vmIp: data.vmIp,
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
      <FieldGroup className="gap-4.5">
        <Controller
          name="title"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="bg-card p-4">
              <FieldLabel>
                Titulo del Partido <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                placeholder="Ingresa el nombre del partido"
                autoComplete="off"
                className="border-primary rounded-md border"
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
              <Field data-invalid={fieldState.invalid} className="w-50">
                <FieldLabel>
                  Hora del Partido <span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  type="time"
                  {...field}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  className="border-primary rounded-md border"
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
          <div className="flex flex-col items-center gap-2 pt-4">
            <div className="flex items-center gap-2">
              <AlarmClock />
              <h1 className="font-extrabold">CALCULO DINÁMICO DE LAS HORAS</h1>
            </div>
            <StreamScheduleBreakdown startTimeArt={currentStartTime} />
          </div>
        </div>
        <Controller
          name="link"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="bg-card p-4">
              <FieldLabel>Link del Stream</FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                placeholder="https://..."
                className="border-primary rounded-md border"
                autoComplete="off"
              />
            </Field>
          )}
        />
        {/*Array dinámico de VMs*/}
        <div className="bg-card">
          <h1 className="flex gap-2 px-4 pt-4 text-xl">
            <DatabasePlus /> Datos de Infraestructura{" "}
          </h1>
          <FieldSet className="border-b-accent gap-4 border-b pb-4">
            <FieldLegend
              variant="label"
              className="bg-card flex w-full items-center justify-between px-4 pt-1.5"
            >
              <h1>Encoder(s)</h1>
              {/* Botón para agregar una nueva fila al array */}
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="border-primary w-48 border"
                onClick={() => append({ number: "", url: "" })}
              >
                <Plus />
                Añadir encoder
              </Button>
            </FieldLegend>
            <FieldDescription className="px-4">
              Info de los encoder(s) a usar. Número y link de configuración
            </FieldDescription>
            <FieldGroup className="gap-4 px-4">
              {/* .map genera una fila horizontal por cada encoder */}
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-start gap-2">
                  {/* Controller 1: Número del Encoder */}
                  <Controller
                    name={`encoders.${index}.number`}
                    control={control}
                    render={({ field: controllerField, fieldState }) => (
                      <div className="border-primary w-32 rounded-md border">
                        <Input
                          {...controllerField}
                          placeholder="# Ej: 100"
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.error && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </div>
                    )}
                  />
                  {/* Controller 2: URL del Encoder */}
                  <Controller
                    name={`encoders.${index}.url`}
                    control={control}
                    render={({ field: controllerField, fieldState }) => (
                      <div className="border-primary flex-1 rounded-md border">
                        <Input
                          {...controllerField}
                          type="url"
                          placeholder="https://..."
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.error && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </div>
                    )}
                  />
                  {/* Botón de eliminar fila */}
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(index)}
                      aria-label={`Quitar encoder ${index + 1}`}
                      className="text-muted-foreground hover:text-destructive shrink-0"
                    >
                      <XIcon className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </FieldGroup>
          </FieldSet>
          <Controller
            name="vmIp"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="bg-card p-4">
                <FieldLabel>Ip de la Maquina Virtual</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="192.168.1.1"
                  className="border-primary rounded-md border"
                  autoComplete="off"
                />
              </Field>
            )}
          />
        </div>
        {/* Botón de Submit */}
        <Button type="submit" className="">
          {initialData ? "Guardar Cambios" : "Añadir Transmisión"}
        </Button>
      </FieldGroup>
    </form>
  );
}
