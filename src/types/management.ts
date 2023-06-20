import { Dayjs } from "dayjs";
import { SetStateAction } from "react";

export interface CalendarModalProps {
  calendarOpenHandler: () => void;
  isDisabled: boolean;
  setIsDisabled: React.Dispatch<SetStateAction<boolean>>;
  handleCalendarSelect: (e: Dayjs) => void;
  dateSelectClick: () => void;
}

export interface CounselingModalProps {
  visitOpenHandler: () => void;
  type: string;
  isOpenVisit: boolean;
  selectTypeHandler: (clickType: string) => void;
}

export interface ScheduleSectionProps {
  candidateTime1: string;
  candidateTime2: string;
  isSelectSchedule: boolean;
  selectTimeHandler: (clickSchedule: string) => void;
}

export interface ConsultTimeProps {
  consultStart: string;
  consultEnd: string;
  notice: string;
}

export interface TimeModalProps {
  timeOpenHandler: () => void;
  consultTime: ConsultTimeProps;
  selectedDate: string;
  handleTimeSelect: (time: string) => void;
  timeSelectClick: () => void;
  isDisabled: boolean;
}
