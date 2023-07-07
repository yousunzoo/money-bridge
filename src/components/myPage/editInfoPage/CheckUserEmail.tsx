import ButtonModal from "@/components/common/ButtonModal";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { usePasswordAuthentication } from "@/hooks/usePasswordAuthentication";
import { useSetModalContent } from "@/hooks/useSetModalContent";

function CheckUserEmail({ email, moveToAuthentication }: { email: string; moveToAuthentication: () => void }) {
  const { isOpen, modalContent, modalSubContent, setIsOpen, setModalContent, setModalSubContent } =
    useSetModalContent();
  const authentication = usePasswordAuthentication(setIsOpen, setModalContent, setModalSubContent);
  const { userInfo } = useGetUserInfo();
  const handleClick = () => {
    authentication({ email: email, name: userInfo?.name, role: userInfo!.role });
    moveToAuthentication();
  };
  return (
    <section>
      <h3 className="mb-20 text-xl font-bold">가입할 때 등록한 이메일을 확인해주세요</h3>
      <p className="form_input mb-1 py-3">{email}</p>
      <p className="mb-32 px-2 text-xs text-gray-normal">*이메일은 수정이 불가합니다.</p>
      <button onClick={handleClick} className="button">
        인증코드 받기
      </button>
      {isOpen && (
        <ButtonModal modalContents={modalContent} isOpen={isOpen} setIsOpen={setIsOpen}>
          <p>{modalSubContent}</p>
        </ButtonModal>
      )}
    </section>
  );
}

export default CheckUserEmail;
