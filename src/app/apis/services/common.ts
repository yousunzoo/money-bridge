import { instance } from "../axios";
import { useQuery } from "@tanstack/react-query";

export const useLoungeBoard = () => {
  const queryKey = "/lounge/board";
  const queryFn = () =>
    instance.get(queryKey).then(res => {
      return res.data;
    });

  return useQuery([queryKey], queryFn);
};