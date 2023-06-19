"use client";
import EditNameForm from "@/components/myPage/editInfoPage/EditNameForm";
import EditPasswordForm from "@/components/myPage/editInfoPage/EditPasswordForm";
import EditPhoneNumberForm from "@/components/myPage/editInfoPage/EditPhoneNumberForm";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function EditPage({ params }: { params: { slug: string } }) {
  const nowPath = params.slug;
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);

  const handleSubmit = (data: { [key: string]: string }) => {
    console.log(data);
    // /auth/myinfo로 patch 요청 보냄, 성공하면 router.back
    // router.back();
    // 실패하면 케이스별 모달 띄워줌
  };

  const category = {
    password: <EditPasswordForm />,
    name: <EditNameForm />,
    phoneNumber: <EditPhoneNumberForm onSubmit={handleSubmit} />,
  };

  useEffect(() => {
    // 컴포넌트 마운트 시 인증 확인
    // 비밀번호 체크완료되면 쿠키/세션 스토리지에 isAuthenticated true 설정
    // const isAuthenticated = checkAuthentication();
    // if (!isAuthenticated) {
    //   // 인증이 실패한 경우 로그인 페이지로 리디렉션 또는 접근 거부 페이지 표시
    // router.push("/my/editInfo");
    // }
  }, []);

  return <>{category[nowPath]}</>;
}

export default EditPage;
