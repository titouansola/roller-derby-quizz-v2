export type MeetingDto = {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  headRefLimitDate: string;
  applicationLimitDate: string;
  location: string;
  description: string;
  useMatchAvailability: boolean;
  published: boolean;
  cancelled: boolean;
  passed: boolean;
};
