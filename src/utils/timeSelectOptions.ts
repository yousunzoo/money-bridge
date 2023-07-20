import dayjs from "dayjs";

export const timeSelectOptions = ({ consultStart, consultEnd }: { consultStart: string; consultEnd: string }) => {
  const startHour = dayjs(consultStart, "hh").get("hour");
  const endHour = dayjs(consultEnd, "hh").get("hour") === 0 ? 24 : dayjs(consultEnd, "hh").get("hour");
  const isLastUntilDawn = startHour > endHour;
  const endDawnTime = isLastUntilDawn ? endHour : 24;
  const endNightTime = isLastUntilDawn ? 24 : endHour;
  const options = makeOptions(startHour, endNightTime);

  if (isLastUntilDawn) {
    const dawnOptions = makeOptions(0, endDawnTime);
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
