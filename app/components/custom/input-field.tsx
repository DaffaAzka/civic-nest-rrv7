import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

export default function InputField({
  name,
  type = "text",
  label,
  placeholder,
  value,
  error,
  onChange,
}: {
  name: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  label?: string;
  value?: string;
  description?: string;
  error?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <Field data-invalid={error ? true : undefined}>
      {label ?
        <FieldLabel htmlFor={`input-field-${name}`}>{label}</FieldLabel>
      : <></>}
      <Input
        id={`input-field-${name}`}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {error ?
        <FieldDescription className="text-xs">{error}</FieldDescription>
      : <></>}
    </Field>
  );
}
