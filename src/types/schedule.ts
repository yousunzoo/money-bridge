export interface ConsultationTimeCardProps {
  consultStart: string;
  consultEnd: string;
  consultNotice: string;
}

export interface ManagementCalendarProps {
  reservationList: {
    id: number;
    userName: string;
    day: string;
    time: string;
    type: string;
    process: string;
  }[];
  setIsClickDay: React.Dispatch<React.SetStateAction<string>>;
}

export interface DayScheduleListProps {
  id: number;
  userName: string;
  day: string;
  time: string;
  type: string;
  process: string;
}
