"use client";
import { v4 as uuidv4 } from "uuid";
import { IEditProfileFormProps } from "@/types/my";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ICompanyInput } from "@/types/join";
import ProfileInput from "./formSections/ProfileInput";
import CompanyInput from "./formSections/CompanyInput";
import CareerInput from "./formSections/CareerInput";
import CareersInput from "./formSections/CareersInput";
import AwardsInput from "./formSections/AwardsInput";
import SpecialityInput from "./formSections/SpecialityInput";
import FigureInput from "./formSections/FigureInput";
import PortfolioInput from "./formSections/PortfolioInput";
import IntroInput from "./formSections/IntroInput";
import MsgInput from "./formSections/MsgInput";

function EditProfileForm({ existingProfile }: IEditProfileFormProps) {
  const [company, setCompany] = useState({ id: existingProfile.companyId, name: existingProfile.company });
  const [location, setLocation] = useState<{ id: number; name: string }>({ id: 0, name: existingProfile.branchName });
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
  const [speciality, setSpeciality] = useState(
    [existingProfile.speciality1, existingProfile.speciality2].filter(item => item !== null),
  );

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

  const handleChangeCompany = (item: ICompanyInput) => {
    setValue("company", item.name);
    setCompany({ ...item });
  };

  const addCareers = () => {
    setCareers([...careers, { id: uuidv4(), content: undefined, start: undefined, end: undefined }]);
  };

  const addAwards = () => {
    setAwards([...awards, { id: uuidv4(), record: undefined, awardYear: undefined }]);
  };

  const removeItems = (type: string, nowId: string) => {
    const array = type === "career" ? ([...careers] as []) : ([...awards] as []);
    const sortedArr = array.filter(({ id }) => id !== nowId);

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

  const handleToggleButtons = (id: string) => {
    if (speciality.includes(id)) {
      setSpeciality(speciality.filter(item => item !== id));
      return;
    }
    if (speciality.length === 2) return;
    setSpeciality([...speciality, id]);
  };

  useEffect(() => {
    if (profileVal && !(typeof profileVal === "string")) {
      const file = profileVal[0] as File;
      setFilePreviews({ ...filePreviews, profile: file.name });
      return;
    }
    if (portfolioVal && !(typeof portfolioVal === "string")) {
      const file = portfolioVal[0] as File;
      setFilePreviews({ ...filePreviews, portfolio: file.name });
      return;
    }
    if (!profileVal) {
      setFilePreviews({ ...filePreviews, profile: "" });
      return;
    }
    if (!portfolioVal) setFilePreviews({ ...filePreviews, portfolio: "" });
  }, [profileVal, portfolioVal]);

  useEffect(() => {
    const branch = location?.name ? location.name : "";
    setValue("branchName", branch);
  }, [company, location]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ProfileInput register={register} removeFile={removeFile} profile={filePreviews.profile} />
        <CompanyInput
          getValues={getValues}
          handleChangeCompany={handleChangeCompany}
          companyId={company.id}
          setLocation={setLocation}
        />
        <CareerInput register={register} defaultValue={getValues("career")} />
        <CareersInput register={register} removeItems={removeItems} careers={careers} addCareers={addCareers} />
        <AwardsInput register={register} removeItems={removeItems} awards={awards} addAwards={addAwards} />
        <SpecialityInput speciality={speciality} handleToggleButtons={handleToggleButtons} />
        <FigureInput register={register} getValues={getValues} />
        <PortfolioInput register={register} removeFile={removeFile} portfolio={filePreviews.portfolio} />
        <IntroInput register={register} intro={getValues("intro")} />
        <MsgInput register={register} msg={getValues("msg")} />
        <button className="button_fixed">등록 완료</button>
      </form>
    </>
  );
}

export default EditProfileForm;
