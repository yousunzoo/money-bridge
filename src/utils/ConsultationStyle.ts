import { ConsultationStyle } from "@/constants/enum";

export const styleCase = (style: string|undefined): { style: ConsultationStyle; image: string } => {
  switch (style) {
    case "METICULOUS":
      return { style: ConsultationStyle.METICULOUS, image: "/assets/images/counselingStyle/METICULOUS.svg" };
    case "FAST":
      return { style: ConsultationStyle.FAST, image: "/assets/images/counselingStyle/FAST.svg" };
    case "KIND":
      return { style: ConsultationStyle.KIND, image: "/assets/images/counselingStyle/KIND.svg" };
    case "PROFESSIONAL":
      return {
        style: ConsultationStyle.PROFESSIONAL,
        image: "/assets/images/counselingStyle/PROFESSIONAL.svg",
      };
    case "HONEST":
      return { style: ConsultationStyle.HONEST, image: "/assets/images/counselingStyle/HONEST.svg" };
    case "PRAGMATIC":
      return { style: ConsultationStyle.PRAGMATIC, image: "/assets/images/counselingStyle/PRAGMATIC.svg" };
    case "DIRECTIONAL":
      return { style: ConsultationStyle.DIRECTIONAL, image: "/assets/images/counselingStyle/DIRECTIONAL.svg" };
    default:
      return { style: ConsultationStyle.null, image: "" };
  }
};
