"use client";

import { ButtonModalProps } from "@/types/common";
import { useEffect } from "react";

function ButtonModal({ modalContents, isOpen, setIsOpen }: ButtonModalProps) {
  const { content, confirmText, cancelText, confirmFn, cancelFn } = modalContents;

  // 버튼이 몇개인지,
  // 모달 내용은 무엇인지,
  // 각 버튼에는 어떤 내용이 들어가야하는지
  // 각 버튼을 클릭할 때마다 어떤 함수가 실행되어야 하는지
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "initial";
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleCancelButton = () => {
    setIsOpen(false);
    if (cancelFn) cancelFn();
  };
  const handleConfirmButton = () => {
    setIsOpen(false);
    if (confirmFn) confirmFn();
  };

  if (!isOpen) return <></>;
  return (
    <div className="fixed left-0 top-0 z-10 h-full w-full">
      <div className="modal_background" />
      <div className="rounded-xl fixed left-1/2 top-1/2 flex h-80 w-80 -translate-x-1/2 -translate-y-1/2 flex-col justify-between bg-white p-7">
        <button onClick={handleClose} className="absolute right-7">
          닫기
        </button>
        <p className="text-lg break-keep pt-20 text-center">{content}</p>
        <div className="flex w-full gap-4">
          {cancelText && (
            <button onClick={handleCancelButton} className="border-2 h-10 w-1/2 border-black">
              {cancelText}
            </button>
          )}
          <button
            onClick={handleConfirmButton}
            className={`${cancelText ? "w-1/2" : "w-full"} h-10 bg-black text-white`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ButtonModal;
