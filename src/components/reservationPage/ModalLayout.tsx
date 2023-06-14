import { IModalLayoutProps } from "@/types/reservation";

function ModalLayout({ children, handleCloseModal }: IModalLayoutProps) {
  return (
    <div className="fixed left-0 top-0 h-full w-full">
      <div className="modal_background" />
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
