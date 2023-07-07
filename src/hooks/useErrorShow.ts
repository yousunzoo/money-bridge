import { IModalContent } from "@/types/common";
import { IResponseErrorData400 } from "@/types/login";
import { AxiosError } from "axios";
import { useState } from "react";

const useErrorShow = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<IModalContent>({
    content: "",
    confirmText: "확인",
    confirmFn: () => setIsOpen(false),
  });

  const errorHandler = (err: AxiosError) => {
    if (err.response?.status === 400) {
      const errorData = err.response?.data as IResponseErrorData400;
      const contents = {
        content: errorData.data.value,
        confirmText: "확인",
        confirmFn: () => {
          setIsOpen(false);
        },
      };
      setIsOpen(true);
      setError(contents);
    } else {
      const contents = {
        content: "일시적인 오류가 발생했습니다.",
        confirmText: "확인",
        confirmFn: () => {
          setIsOpen(false);
        },
      };
      setIsOpen(true);
      setError(contents);
    }
  };

  return { isOpen, setIsOpen, error, errorHandler };
};

export default useErrorShow;
