import React, { ReactNode } from "react";
import ModalBackground from "../common/Modal/ModalBackground";
import { IModalLayoutProps } from "@/types/reservation";

function ModalLayout({ children, handleCloseModal }: IModalLayoutProps) {
  return (
    <div className="fixed left-0 top-0 h-full w-full">
      <ModalBackground />
      <section className="fixed bottom-0 left-1/2 flex h-[560px] w-[425px] -translate-x-1/2 flex-col justify-between rounded-t-3xl bg-white p-6">
        <button className="absolute right-6" onClick={handleCloseModal}>
          닫기
        </button>
        {children}
      </section>
    </div>
  );
}

export default ModalLayout;
