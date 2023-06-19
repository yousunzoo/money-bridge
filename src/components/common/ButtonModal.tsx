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
        <div className="text-center">
          <h3 className={`text-lg mb-2 break-keep text-center ${children ? "pt-14" : "pt-20"}`}>{content}</h3>
          {children}
        </div>
        <div className="flex w-full gap-4">
          {cancelText && (
            <button onClick={handleCancelButton} className="cancel-button">
              {cancelText}
            </button>
          )}
          <button onClick={handleConfirmButton} className={`${cancelText ? "w-1/2" : "w-full"} popup-button`}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ButtonModal;
