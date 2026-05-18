import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import type { SelectItem as SelectItems } from "@/types/other.types";
import { ScrollArea } from "../ui/scroll-area";
import InputField from "./input-field";

export default function SelectField({
  name,
  text,
  label,
  onChange,
  items,
  error,
  value,
  isDisabled,
  withAll,
}: {
  name: string;
  text: string;
  onChange: (value: string, name: string) => void;
  items: SelectItems[];
  error?: string | null;
  value?: string | null;
  placeholder?: string;
  label?: string;
  isDisabled?: boolean;
  withAll?: boolean;
}) {
  const [search, setSearch] = useState("");

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Field
      data-invalid={error ? true : undefined}
      className="flex flex-col gap-3">
      {label ?
        <FieldLabel htmlFor={`input-field-${name}`}>{label}</FieldLabel>
      : <></>}
      <div className="flex flex-col gap-1">
        <Select
          onValueChange={(value) => {
            const name =
              items.find((item) => item.id.toString() === value)?.name ?? "";
            onChange(value, name);
          }}
          onOpenChange={(open) => {
            if (!open) setSearch("");
          }}
          name={name}
          value={value ?? ""}>
          <SelectTrigger className="w-full" disabled={isDisabled}>
            <SelectValue placeholder={text} />
          </SelectTrigger>
          <SelectContent
            className="max-h-[40vh]"
            position="popper"
            onCloseAutoFocus={(e) => e.preventDefault()}>
            <InputField
              name="search"
              placeholder="Search"
              type="text"
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearch(e.target.value);
              }}
            />
            <ScrollArea className="h-full">
              {withAll && <SelectItem value="all">All</SelectItem>}
              {filteredItems.map((item) => (
                <SelectItem key={item.id} value={item.id.toString()}>
                  {item.name}
                </SelectItem>
              ))}
            </ScrollArea>
          </SelectContent>
        </Select>
        {error && (
          <FieldDescription className="text-xs">{error}</FieldDescription>
        )}
      </div>
    </Field>
  );
}
