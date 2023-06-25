export interface ConsultationTimeCardProps {
  consultStart: string | undefined;
  consultEnd: string | undefined;
  consultNotice: string | undefined;
}

export interface ManagementCalendarProps {
  reservationList: DayScheduleListProps[] | undefined;
  setIsClickDay: React.Dispatch<React.SetStateAction<string>>;
  setClickDate: React.Dispatch<React.SetStateAction<ScheduleDate>>;
}
interface ScheduleDate {
  year: number;
  month: number;
}

export interface DayScheduleListProps {
  id: number;
  userName: string;
  day: string;
  time: string;
  type: string;
  process: string;
}
