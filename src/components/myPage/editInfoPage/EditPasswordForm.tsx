import Authentication from "@/components/findPasswordPage/Authentication";
import ResetPassword from "@/components/findPasswordPage/ResetPassword";
import React, { useState } from "react";
import CheckUserEmail from "./CheckUserEmail";

function EditPasswordForm() {
  // queryClient에서 유저 이메일 값 받음
  const email = "yousunzoo@naver.com";
  const [isUserEmail, setIsUserEmail] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const onSubmit = () => {
    setIsAuthenticated(true);
  };

  const moveToAuthentication = () => {
    setIsUserEmail(true);
  };

  return (
    <>
      {isAuthenticated ? (
        <ResetPassword />
      ) : isUserEmail ? (
        <Authentication userEmail={email} onSubmit={onSubmit} />
      ) : (
        <CheckUserEmail email={email} moveToAuthentication={moveToAuthentication} />
      )}
    </>
  );
}

export default EditPasswordForm;
