import React, { useState } from "react";
interface LocationCopyButtonProps {
  location: string;
}
function LocationCopyButton({ location }: LocationCopyButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [alertTest, setAlertTest] = useState("");

  const handleCopyClick = () => {
    try {
      const inputElement = document.createElement("input");
      inputElement.value = location;
      document.body.appendChild(inputElement);
      inputElement.select();
      document.execCommand("copy");
      document.body.removeChild(inputElement);

      setAlertTest("주소가 클립보드에 복사 되었습니다.");
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 3000);
    } catch (error) {
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 3000);
      setAlertTest("주소 복사 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <button className="self-end mt-1" onClick={handleCopyClick}>
        <p className="text-xs underline text-gray-heavy underline-offset-1">주소 복사</p>
      </button>
      {showModal && (
        <div className="fade b-[50px] fixed bottom-0 left-1/2 right-0 top-[80%] z-10 h-14 w-[300px]  -translate-x-1/2 rounded-md bg-background-secondary py-4 text-center text-sm text-gray-heavy ">
          {alertTest}
        </div>
      )}
    </>
  );
}

export default LocationCopyButton;
