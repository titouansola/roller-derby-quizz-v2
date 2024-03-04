import { useField } from "remix-validated-form";

export function Checkbox({
  name,
  label,
  hidden,
}: {
  name: string;
  label: string;
  hidden?: boolean;
}) {
  const { getInputProps } = useField(name);
  return (
    <div>
      <input {...getInputProps({ id: name, hidden, type: "checkbox" })} />
      <label htmlFor={name}>{label}</label>
    </div>
  );
}
