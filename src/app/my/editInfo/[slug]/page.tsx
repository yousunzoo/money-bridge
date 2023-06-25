"use client";
import { editMyInfo, getLoginedUserInfo, getMyInfo } from "@/app/apis/services/auth";
import ButtonModal from "@/components/common/ButtonModal";
import TopNav from "@/components/common/TopNav";
import EditInfoForm from "@/components/myPage/editInfoPage/EditInfoForm";
import EditPasswordForm from "@/components/myPage/editInfoPage/EditPasswordForm";
import { ButtonModalProps } from "@/types/common";
import { INowLoginedUserInfo } from "@/types/reservation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function EditPage({ params }: { params: { slug: string } }) {
  const queryClient = useQueryClient();
  const nowPath = params.slug as "password" | "name" | "phoneNumber";
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [modalContents, setModalContents] = useState<ButtonModalProps["modalContents"]>({
    content: "",
    confirmText: "확인",
  });
  const { data, isLoading } = useQuery<INowLoginedUserInfo, AxiosError>(["myInfo"], getMyInfo);

  const { mutate } = useMutation(editMyInfo, {
    onSuccess: () => {
      setIsOpen(true);
      const content =
        (nowPath === "name" ? "이름이" : nowPath === "phoneNumber" ? "전화번호가" : "비밀번호가") + " 변경되었습니다.";
      setModalContents({
        ...modalContents,
        content,
        confirmFn: () => router.back(),
      });
      queryClient.refetchQueries(["loginedUserInfo"]);
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

  const handleSubmit = (data: { [key: string]: string }) => {
    mutate(data);
  };

  const modalProps = {
    modalContents,
    isOpen,
    setIsOpen,
  };

  const category = {
    password: <EditPasswordForm email={data ? data?.email : ""} />,
    name: <EditInfoForm type={nowPath} onSubmit={handleSubmit} />,
    phoneNumber: <EditInfoForm type={nowPath} onSubmit={handleSubmit} />,
  };

  return (
    <>
      <TopNav title="개인 정보 설정" hasBack={true} />
      {!isLoading && category[nowPath]}
      {isOpen && <ButtonModal {...modalProps} />}
    </>
  );
}

export default EditPage;
