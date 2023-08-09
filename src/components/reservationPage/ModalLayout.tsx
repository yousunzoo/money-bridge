import { IModalLayoutProps } from "@/types/reservation";
import { useEffect } from "react";
import close from "/public/assets/images/close.svg";
import Image from "next/image";

function ModalLayout({ children, handleCloseModal }: IModalLayoutProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 z-30 w-full h-full">
      <div className="modal_background" onClick={handleCloseModal} />
      <section className="flex flex-col modal">
        <button className="absolute right-6" onClick={handleCloseModal}>
          <Image src={close} alt="question" width={40} height={40} className="p-2 ml-2" />
        </button>
        {children}
      </section>
    </div>
  );
}

export default ModalLayout;
