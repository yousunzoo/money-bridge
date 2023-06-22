"use client";
import { editMyInfo } from "@/app/apis/services/auth";
import ButtonModal from "@/components/common/ButtonModal";
import EditInfoForm from "@/components/myPage/editInfoPage/EditInfoForm";
import EditPasswordForm from "@/components/myPage/editInfoPage/EditPasswordForm";
import { ButtonModalProps } from "@/types/common";
import { IUserEditableInfo } from "@/types/my";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function EditPage({ params }: { params: { slug: string } }) {
  const nowPath = params.slug as "password" | "name" | "phoneNumber";
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [modalContents, setModalContents] = useState<ButtonModalProps["modalContents"]>({
    content: "",
    confirmText: "확인",
  });
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(["getMyInfo"]);

  const { mutate } = useMutation(editMyInfo, {
    onSuccess: () => {
      setIsOpen(true);
      const content = (nowPath === "name" ? "이름이" : "비밀번호가") + " 변경되었습니다.";
      setModalContents({
        ...modalContents,
        content,
        confirmFn: () => router.back(),
      });
      queryClient.refetchQueries(["getMyInfo"]);
    },
    onError: () => {
      setIsOpen(true);
      setModalContents({
        content: "알 수 없는 에러가 발생했습니다. 다시 시도해주세요.",
        confirmText: "확인",
      });
    },
  });

  useEffect(() => {
    if (!data) {
      router.push("/my/editInfo");
      return;
    }
  }, []);
  const { email } = data as IUserEditableInfo;
  const handleSubmit = (data: { [key: string]: string }) => {
    mutate(data);
  };

  const modalProps = {
    modalContents,
    isOpen,
    setIsOpen,
  };
  const category = {
    password: <EditPasswordForm email={email} />,
    name: <EditInfoForm type={nowPath} onSubmit={handleSubmit} />,
    phoneNumber: <EditInfoForm type={nowPath} onSubmit={handleSubmit} />,
  };

  return (
    <>
      {category[nowPath]}
      {isOpen && <ButtonModal {...modalProps} />}
    </>
  );
}

export default EditPage;
