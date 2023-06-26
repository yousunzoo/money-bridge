import { speciality } from "@/constants/pbListMenu";
export interface IConvertedEditFormData {
  [key: string]: string | number | File | [] | null;
}

export const convertEditFormData = (
  data: { [key: string]: unknown },
  userSpeciality: string[],
  files: { [key: string]: File | null },
) => {
  const filteredData = Object.keys(data)
    .filter(key => !key.includes("careers") && !key.includes("award"))
    .reduce((obj: { [key: string]: unknown }, key) => {
      obj[key] = data[key];
      return obj;
    }, {});

  const deletePortfolio = data.portfolio ? false : true;
  const deleteProfile = data.profile ? false : true;
  const careersArr = [];
  const awardsArr = [];
  for (const key in data) {
    if (key.includes("start")) {
      const index = key.split("careers-")[1].split("-start")[0];
      const content = data[`careers-${index}-career`];
      const end = data[`careers-${index}-end`];
      const start = data[key];
      careersArr.push({ content, start, end });
    }
    if (key.includes("awardYear")) {
      const index = key.split("award-")[1].split("-awardYear")[0];
      const record = data[`award-${index}-record`];
      const awardYear = data[key];
      awardsArr.push({ record, awardYear });
    }
  }

  const convertedData = {
    company: filteredData.company,
    branchName: filteredData.branchName,
    career: filteredData.career,
    awards: awardsArr,
    careers: careersArr,
    cumulativeReturn: filteredData.cumulativeReturn,
    maxDrawdown: filteredData.maxDrawdown,
    profitFactor: filteredData.profitFactor,
    averageProfit: filteredData.averageProfit,
    intro: filteredData.intro,
    msg: filteredData.msg,
    speciality1: userSpeciality[0],
    speciality2: userSpeciality[1],
    deletePortfolio,
    deleteProfile,
  };

  const formData = new FormData();

  if (files.profile) {
    formData.append("profileFile", files.profile);
  }
  if (files.portfolio) {
    formData.append("portfolioFile", files.portfolio);
  }

  formData.append("updateDTO", new Blob([JSON.stringify(convertedData)], { type: "application/json" }));
  return formData;
};
