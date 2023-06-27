import { Dayjs } from "dayjs";
import { Dispatch, SetStateAction } from "react";

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
  setIsDisabled: Dispatch<SetStateAction<boolean>>;
}
export interface ConsultationStatusProps {
  applyCount: number;
  isNewApply: boolean;
  confirmCount: number;
  isNewConfirm: boolean;
  completeCount: number;
  isNewComplete: boolean;
}
export interface ConsultationStatusFunc {
  consultationStatus: ConsultationStatusProps;
  pbId: number;
}

export interface SelectedData {
  reservationId: number;
  isNewReservation: boolean;
  profileImage: string;
  name: string;
  createdAt: string;
  type: string;
}
