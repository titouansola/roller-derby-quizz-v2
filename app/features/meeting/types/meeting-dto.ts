import { ApplicationListDto } from './application-dto';

export type MeetingDto = {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  applications: ApplicationListDto[];
};
