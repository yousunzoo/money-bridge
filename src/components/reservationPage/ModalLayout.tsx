import { IModalLayoutProps } from "@/types/reservation";

function ModalLayout({ children, handleCloseModal }: IModalLayoutProps) {
  return (
    <div className="fixed left-0 top-0 h-full w-full">
      <div className="modal_background" />
      <section className="rounded-t-3xl fixed bottom-[56px] left-1/2 flex h-[560px] w-[425px] -translate-x-1/2 flex-col justify-between bg-white p-6">
        <button className="absolute right-6" onClick={handleCloseModal}>
          닫기
        </button>
        {children}
      </section>
    </div>
  );
}

export default ModalLayout;
