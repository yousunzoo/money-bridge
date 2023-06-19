"use client";
import ButtonModal from "@/components/common/ButtonModal";
import EditInfoForm from "@/components/myPage/editInfoPage/EditInfoForm";
import EditPasswordForm from "@/components/myPage/editInfoPage/EditPasswordForm";
import { ButtonModalProps } from "@/types/common";
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

  const handleSubmit = (data: { [key: string]: string }) => {
    // /auth/myinfo로 patch 요청 보냄, 성공하면 router.back
    setIsOpen(true);
    // 성공하면 케이스별 모달 띄워줌
    const content = (nowPath === "name" ? "이름이" : "비밀번호가") + " 변경되었습니다.";
    setModalContents({
      ...modalContents,
      content,
      confirmFn: () => router.back(),
    });
  };

  const modalProps = {
    modalContents,
    isOpen,
    setIsOpen,
  };
  const category = {
    password: <EditPasswordForm />,
    name: <EditInfoForm type={nowPath} onSubmit={handleSubmit} />,
    phoneNumber: <EditInfoForm type={nowPath} onSubmit={handleSubmit} />,
  };

  useEffect(() => {
    // 컴포넌트 마운트 시 queryClient 인증 확인
    // const isAuthenticated = checkAuthentication();
    // if (!isAuthenticated) {
    //   // 인증이 실패한 경우 로그인 페이지로 리디렉션 또는 접근 거부 페이지 표시
    // router.push("/my/editInfo");
    // }
  }, []);

  return (
    <>
      {category[nowPath]}
      {isOpen && <ButtonModal {...modalProps} />}
    </>
  );
}

export default EditPage;
