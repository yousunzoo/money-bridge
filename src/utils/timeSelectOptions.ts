import dayjs from "dayjs";

export const timeSelectOptions = ({ consultStart, consultEnd }: { consultStart: string; consultEnd: string }) => {
  const startHour = dayjs(consultStart, "hh").get("hour") || 9;
  const endHour = (dayjs(consultEnd, "hh").get("hour") === 0 ? 24 : dayjs(consultEnd, "hh").get("hour")) || 18;
  const isLastUntilDawn = endHour < startHour;
  const endTime = endHour > startHour ? endHour : 24;
  const options = makeOptions(startHour, endHour);
  if (isLastUntilDawn) {
    const dawnOptions = makeOptions(0, endTime);
    options.am = [...options.am, ...dawnOptions.am];
    options.pm = [...options.pm, ...dawnOptions.pm];
  }
  return options;
};

function makeOptions(start: number, end: number) {
  const am = [];
  const pm = [];
  for (let i = start; i <= end; i++) {
    if (i < 12) {
      am.push(i < 10 ? `0${i}:00` : `${i}:00`);
    } else {
      pm.push(`${i}:00`);
    }
  }
  return { am, pm };
}
