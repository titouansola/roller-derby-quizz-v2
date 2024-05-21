import { Input } from '~/features/ui/form/Input';

export function ProfileFormFieldset() {
  return (
    <>
      <Input name="civilName" label="account.civil_name" />
      <Input name="pronouns" label="account.pronouns" />
      <Input name="derbyName" label="account.derby_name" />
      <Input name="league" label="account.league" />
      <Input name="derbyCVUrl" label="account.derby_cv" type="url" />
      <Input name="emergencyContact" label="account.emergency_contact" />
      <Input name="medicalInformation" label="account.medical_information" />
    </>
  );
}
