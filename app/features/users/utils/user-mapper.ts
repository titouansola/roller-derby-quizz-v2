import { ConnectedUser, InsertUser, SelectUser } from '~/db/schemas';
import { ApplicationFormData } from '~/features/applications/form/application-form';

export function toConnectedUser(user: SelectUser): ConnectedUser {
  return {
    ...user,
    externalId: user.externalId ?? '',
  };
}

export function fromApplicationToUser(data: ApplicationFormData): InsertUser {
  return {
    email: data.email,
    civilName: data.civilName,
    pronouns: data.pronouns,
    derbyName: data.derbyName,
    derbyCVUrl: data.derbyCVUrl,
    league: data.league,
    emergencyContact: data.emergencyContact,
    medicalInformation: data.medicalInformation,
  };
}
