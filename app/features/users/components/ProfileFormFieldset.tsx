import { Input } from '~/features/ui/form/Input';

export function ProfileFormFieldset({
  required = false,
}: {
  required?: boolean;
}) {
  return (
    <>
      <Input name="civilName" label="account.civil_name" required={required} />
      <Input name="pronouns" label="account.pronouns" required={required} />
      <Input name="derbyName" label="account.derby_name" required={required} />
      <Input name="league" label="account.league" required={required} />
      <Input name="derbyCVUrl" label="account.derby_cv" type="url" />
      <Input
        name="emergencyContact"
        label="account.emergency_contact"
        required={required}
      />
      <Input
        name="medicalInformation"
        label="account.medical_information"
        required={required}
      />
    </>
  );
}
