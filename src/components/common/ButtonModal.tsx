"use client";

import { ButtonModalProps } from "@/types/common";
import { useEffect } from "react";

function ButtonModal({ modalContents, isOpen, setIsOpen, children }: ButtonModalProps) {
  const { content, confirmText, cancelText, confirmFn, cancelFn } = modalContents;

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
      <div className="popup flex flex-col justify-between">
        <button onClick={handleClose} className="absolute right-7">
          닫기
        </button>
        <h3 className={`text-lg break-keep text-center ${children ? "pt-14" : "pt-20"}`}>{content}</h3>
        <div className="text-center">{children}</div>
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
