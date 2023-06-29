import dayjs from "dayjs";

export const timeSelectOptions = ({ consultStart, consultEnd }: { consultStart: string; consultEnd: string }) => {
  const startHour = dayjs(consultStart, "hh").get("hour") || 9;
  const endHour = (dayjs(consultEnd, "hh").get("hour") === 0 ? 24 : dayjs(consultEnd, "hh").get("hour")) || 18;
  const am = [];
  const pm = [];
  for (let i = startHour; i <= endHour; i++) {
    if (i < 12) {
      am.push(i < 10 ? `0${i}:00` : `${i}:00`);
    } else {
      pm.push(`${i}:00`);
    }
  }
  return { am, pm };
};
