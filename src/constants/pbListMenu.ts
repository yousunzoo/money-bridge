import { PBSpecialty, PBSpecialtyText } from "./enum";

export const speciality = [
  { id: "ALL", text: "전체보기" },
  { id: PBSpecialty.KOREAN_STOCK, text: PBSpecialtyText.KOREAN_STOCK },
  { id: PBSpecialty.US_STOCK, text: PBSpecialtyText.US_STOCK },
  { id: PBSpecialty.BOND, text: PBSpecialtyText.BOND },
  { id: PBSpecialty.WRAP, text: PBSpecialtyText.WRAP },
  { id: PBSpecialty.FUND, text: PBSpecialtyText.FUND },
  { id: PBSpecialty.DERIVATIVE, text: PBSpecialtyText.DERIVATIVE },
  { id: PBSpecialty.ETF, text: PBSpecialtyText.ETF },
  { id: PBSpecialty.REAL_ESTATE, text: PBSpecialtyText.REAL_ESTATE },
];
