import { CoordinateProps } from "@/types/location";
import { instance } from "../axios";
import { useQuery } from "@tanstack/react-query";
import { PbListSectionPorps } from "@/types/main";

export const useLoungeBoard = () => {
  const queryKey = "/lounge/board";
  const queryFn = () =>
    instance.get(queryKey).then(res => {
      return res.data;
    });

  return useQuery([queryKey], queryFn);
};

export const getSuggestionPB = async ({ latitude, longitude }: CoordinateProps): Promise<PbListSectionPorps[]> => {
  try {
    const res = await instance.get("/main/pb", {
      params: {
        latitude,
        longitude,
      },
    });
    return res.data.data.list;
  } catch (error) {
    throw error;
  }
};

export const getContents = async () => {
  try {
    const res = await instance.get("/main/board");
    return res.data.data.list;
  } catch (error) {
    throw error;
  }
};
