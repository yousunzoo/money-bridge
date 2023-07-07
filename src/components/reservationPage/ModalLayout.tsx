import { IModalLayoutProps } from "@/types/reservation";
import { useEffect } from "react";

function ModalLayout({ children, handleCloseModal }: IModalLayoutProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 z-20 h-full w-full">
      <div className="modal_background" onClick={handleCloseModal} />
      <section className="modal flex flex-col">
        <button className="absolute right-6" onClick={handleCloseModal}>
          닫기
        </button>
        {children}
      </section>
    </div>
  );
}

export default ModalLayout;
