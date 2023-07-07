"use client";
import { ButtonModalProps } from "@/types/common";
import { useEffect } from "react";

function ButtonModal({ modalContents, isOpen, setIsOpen, children }: ButtonModalProps) {
  const { content, confirmText, cancelText, confirmFn, cancelFn } = modalContents;

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "initial";

    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [isOpen]);

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
    <div className="fixed top-0 left-0 z-30 w-full h-full">
      <div className="modal_background" />
      <div className="flex flex-col justify-between popup">
        <div className="text-center">
          <h3 className={`text-lg mb-2 break-keep text-center ${children ? "pt-14" : "pt-20"}`}>{content}</h3>
          {children}
        </div>
        <div className="flex w-full gap-4">
          {cancelText && (
            <button onClick={handleCancelButton} className="font-bold cancel-button">
              {cancelText}
            </button>
          )}
          <button onClick={handleConfirmButton} className={`${cancelText ? "w-1/2" : "w-full"} popup-button font-bold`}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ButtonModal;
