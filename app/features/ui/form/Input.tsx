import { useField } from 'remix-validated-form';

export function Input({
  name,
  label,
  hidden,
}: {
  name: string;
  label?: string;
  hidden?: boolean;
}) {
  const { getInputProps } = useField(name);
  return (
    <div>
      {!!label && <label htmlFor={name}>{label}</label>}
      <input {...getInputProps({ id: name, hidden })} />
    </div>
  );
}
