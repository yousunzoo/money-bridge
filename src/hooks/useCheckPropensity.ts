import { checkPropensity } from "@/app/apis/services/user";
import { useAnalysisStore } from "@/store/analysisStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useCheckPropensity = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { resetAnswers } = useAnalysisStore();
  const { mutate: registerPropensity } = useMutation(checkPropensity, {
    onSuccess: () => {
      router.replace("/analysis/complete");
      queryClient.refetchQueries(["myPropensity"]);
      queryClient.refetchQueries(["loginedUserInfo"]);
      resetAnswers();
    },
  });
  return registerPropensity;
};
