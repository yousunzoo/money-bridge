"use client";
import { v4 as uuidv4 } from "uuid";
import ModalLayout from "@/components/reservationPage/ModalLayout";
import { IEditProfileFormProps } from "@/types/my";
import { MouseEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AddIcon from "/public/assets/images/addCircle.svg";
import CareerForm from "./CareerForm";
import Image from "next/image";
import AwardsForm from "./AwardForm";
import SelectSpeciality from "./SelectSpeciality";

function EditProfileForm({ existingProfile }: IEditProfileFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filePreviews, setFilePreviews] = useState({
    profile: existingProfile.profile,
    portfolio: existingProfile.portfolio,
  });
  const [careers, setCareers] = useState(
    existingProfile.careers.map(career => {
      return { ...career, id: uuidv4() };
    }),
  );
  const [awards, setAwards] = useState(
    existingProfile.awards.map(award => {
      return { ...award, id: uuidv4() };
    }),
  );
  const [speciality, setSpeciality] = useState([existingProfile.speciality1, existingProfile.speciality2]);
  const {
    watch,
    getValues,
    handleSubmit,
    setValue,
    register,
    formState: { errors, isValid, dirtyFields },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      intro: existingProfile.intro,
      msg: existingProfile.msg,
      profile: existingProfile.profile,
      portfolio: existingProfile.portfolio,
      company: existingProfile.company,
      branchName: existingProfile.branchName,
      profitFactor: existingProfile.profitFactor,
      maxDrawdown: existingProfile.maxDrawdown,
      cumulativeReturn: existingProfile.cumulativeReturn,
      averageProfit: existingProfile.averageProfit,
      career: existingProfile.career,
    },
  });

  const onSubmit = (data: any) => console.log(data);

  const profileVal = watch("profile");
  const portfolioVal = watch("portfolio");
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const addCareers = () => {
    setCareers([...careers, { id: uuidv4(), content: undefined, start: undefined, end: undefined }]);
  };

  const addAwards = () => {
    setAwards([...awards, { id: uuidv4(), record: undefined, awardYear: undefined }]);
  };

  const removeItems = (type: string, index: number) => {
    const array = type === "career" ? ([...careers] as []) : ([...awards] as []);
    const sortedArr = array.filter(({ id }) => id !== index);

    if (type === "career") {
      setCareers(sortedArr);
      return;
    }
    setAwards(sortedArr);
    return;
  };

  const removeFile = (type: string) => {
    type === "profile" ? setValue("profile", "") : setValue("portfolio", "");
  };

  const handleToggleButtons = (e: MouseEvent<HTMLButtonElement>) => {
    const { textContent } = e.target as HTMLButtonElement;
    if (!textContent) return;
    if (speciality.includes(textContent)) {
      setSpeciality(speciality.filter(item => item !== textContent));
      return;
    }
    if (speciality.length === 2) return;
    setSpeciality([...speciality, textContent]);
  };

  useEffect(() => {
    if (profileVal && !(typeof profileVal === "string")) {
      const file = profileVal[0] as File;
      setFilePreviews({ ...filePreviews, profile: file.name });
    }
    if (portfolioVal && !(typeof portfolioVal === "string")) {
      const file = portfolioVal[0] as File;
      setFilePreviews({ ...filePreviews, portfolio: file.name });
    }
    if (!profileVal) setFilePreviews({ ...filePreviews, profile: "" });
    if (!portfolioVal) setFilePreviews({ ...filePreviews, portfolio: "" });
  }, [profileVal, portfolioVal]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="mb-10">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xl font-bold">프로필 이미지 업로드</p>
            <div>
              <button
                onClick={() => removeFile("profile")}
                type="button"
                className="mr-2 rounded-[8px] bg-primary-normal px-4 py-2 text-xs font-bold text-white shadow-md"
              >
                삭제
              </button>
              <label
                className="cursor-pointer rounded-[8px] bg-white px-5 py-2 text-xs font-bold text-primary-normal shadow-md"
                htmlFor="profile"
              >
                이미지 찾기
              </label>
              <input className="hidden" type="file" accept="image/*" id="profile" {...register("profile")} />
            </div>
          </div>
          <p
            className={`rounded-md bg-white p-4 shadow-sm ${
              filePreviews.profile ? "text-gray-heavy" : "text-placeholder"
            }`}
          >
            {filePreviews.profile ? filePreviews.profile : "이미지를 등록해주세요"}
          </p>
        </section>
        <section className="mb-8">
          <p className="mb-4 text-xl font-bold">증권사를 선택해주세요.</p>
          <label htmlFor="company" className="edit_input">
            {getValues("company")}
            <input className="hidden" name="company" />
          </label>
        </section>
        <section className="mb-10">
          <p className="mb-4 text-xl font-bold">지점을 입력해주세요.</p>
          <div className="flex justify-between">
            <label htmlFor="branchName" className="edit_input flex-1">
              {getValues("branchName")}
              <input className="hidden" name="branchName" />
            </label>
            <button
              type="button"
              className="ml-3 w-[110px] rounded-sm border-1 border-primary-normal bg-white py-4 font-bold text-primary-normal"
            >
              지점 찾기
            </button>
          </div>
        </section>
        <section className="mb-10">
          <p className="mb-4 text-xl font-bold">총 경력을 입력해주세요.</p>
          <div className="flex items-center">
            <input
              className="edit_input flex-1"
              type="number"
              max={100}
              placeholder="햇수를 입력해주세요."
              defaultValue={getValues("career")}
            />
            <span className="ml-4 w-[110px] text-xl font-bold">년</span>
          </div>
        </section>
        <section className="mb-10">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xl font-bold">세부 경력을 입력해주세요.</p>
            <button type="button" onClick={addCareers}>
              <Image src={AddIcon} alt="경력 추가하기" width={36} height={36} />
            </button>
          </div>
          <p className="mb-4 text-xs">재직 중일 시 퇴사에 현재 연도를 입력해주세요.</p>
          <ul className="px-4">
            {careers.map((item, index) => (
              <CareerForm key={item.id} register={register} index={index} removeItems={removeItems} career={item} />
            ))}
          </ul>
        </section>
        <section className="mb-10">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xl font-bold">수상 내역을 입력해주세요.</p>
            <button type="button" onClick={addAwards}>
              <Image src={AddIcon} alt="수상 내역 추가하기" width={36} height={36} />
            </button>
          </div>
          <p className="mb-4 text-xs">*입력을 안하면 공백으로 보여집니다.</p>
          <ul className="px-4">
            {awards.map((item, index) => (
              <AwardsForm key={item.id} register={register} removeItems={removeItems} award={item} index={index} />
            ))}
          </ul>
        </section>
        <section className="mb-10">
          <p className="mb-4 text-xl font-bold">전문분야를 선택해주세요.</p>
          <p className="mb-4 text-xs">2개까지 중복선택이 가능합니다.</p>
          <SelectSpeciality specialityData={speciality} handleToggleButtons={handleToggleButtons} />
        </section>
        <section className="mb-10">
          <p className="mb-4 text-xl font-bold">실적을 입력해주세요.</p>
          <p className="mb-4 text-xs">소수점 2자리 까지의 숫자로만 입력해주세요.</p>
          <ul className="rounded-sm bg-white p-4 shadow-md">
            <li className="mb-3 flex items-center">
              <input
                className="edit_input"
                type="number"
                placeholder="누적 수익률을 입력해주세요."
                name="cumulativeReturn"
                defaultValue={getValues("cumulativeReturn")}
              />
              <span className="ml-4 w-[100px] text-xl font-bold">%</span>
            </li>
            <li className="mb-3 flex items-center">
              <input
                className="edit_input"
                type="number"
                placeholder="최대 자본인하율을 입력해주세요."
                name="maxDrawdown"
                defaultValue={getValues("maxDrawdown")}
              />
              <span className="ml-4 w-[100px] text-xl font-bold">%</span>
            </li>
            <li className="mb-3 flex items-center">
              <input
                className="edit_input"
                type="number"
                placeholder="평균 손익률을 입력해주세요."
                name="averageProfit"
                defaultValue={getValues("averageProfit")}
              />
              <span className="ml-4 w-[100px] text-xl font-bold">%</span>
            </li>
            <li className="mb-3 flex items-center">
              <input
                className="edit_input"
                type="number"
                placeholder="Profit Factor를 입력해주세요."
                name="profitFactor"
                defaultValue={getValues("profitFactor")}
              />
              <span className="ml-4 w-[100px] text-xl font-bold">: 1</span>
            </li>
          </ul>
        </section>
        <section className="mb-10">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xl font-bold">포트폴리오 파일 업로드</p>
            <div>
              <button
                onClick={() => removeFile("portfolio")}
                type="button"
                className="mr-2 rounded-[8px] bg-primary-normal px-4 py-2 text-xs font-bold text-white shadow-md"
              >
                삭제
              </button>
              <label
                className="cursor-pointer rounded-[8px] bg-white px-5 py-2 text-xs font-bold text-primary-normal shadow-md"
                htmlFor="portfolio"
              >
                파일 찾기
              </label>
              <input className="hidden" type="file" id="portfolio" {...register("portfolio")} />
            </div>
          </div>
          <p
            className={`rounded-md bg-white p-4 shadow-sm ${
              filePreviews.portfolio ? "text-gray-heavy" : "text-placeholder"
            }`}
          >
            {filePreviews.portfolio ? filePreviews.portfolio : "파일을 등록해주세요"}
          </p>
        </section>
        <section className="mb-10">
          <p className="mb-4 text-xl font-bold">한 줄 소개를 작성해 주세요.</p>
          <textarea
            className="edit_input mb-2 resize-none"
            placeholder="나를 한 줄로 표현해보세요."
            name="intro"
            defaultValue={getValues("intro")}
            maxLength={100}
          />
          <p className="mr-2 text-right text-xs">{getValues("intro").length}/100</p>
        </section>
        <section className="mb-10">
          <p className="mb-4 text-xl font-bold">프로필 제목을 작성해 주세요.</p>
          <textarea
            className="edit_input mb-2 resize-none"
            placeholder="프로필 제목을 작성해주세요."
            name="msg"
            defaultValue={getValues("msg")}
            maxLength={20}
          />
          <p className="mr-2 text-right text-xs">{getValues("msg").length}/100</p>
        </section>
        <button className="button_fixed">등록 완료</button>
      </form>
      {isOpen && (
        <ModalLayout handleCloseModal={handleCloseModal}>
          <h3 className="text-xl font-bold">지점 찾기</h3>
        </ModalLayout>
      )}
    </>
  );
}

export default EditProfileForm;
