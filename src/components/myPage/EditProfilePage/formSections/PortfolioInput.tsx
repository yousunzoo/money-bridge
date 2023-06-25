import { IPortfolioInputProps } from "@/types/editProfile";
import { validateFileSize } from "@/utils/validateFileSize";
import React from "react";

function PortfolioInput({ errors, register, removeFile, portfolio }: IPortfolioInputProps) {
  return (
    <section className="mb-10">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-xl font-bold">포트폴리오 파일 업로드</p>
        <p className={`${errors["portfolio"] && "text-status-error"}`}>파일 크기는 100MB 이하여야 합니다.</p>
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
          <input
            className="hidden"
            type="file"
            accept=".pdf"
            id="portfolio"
            {...(register("portfolio"), { validate: validateFileSize })}
          />
        </div>
      </div>
      <p className={`rounded-md bg-white p-4 shadow-sm ${portfolio ? "text-gray-heavy" : "text-placeholder"}`}>
        {portfolio ? portfolio : "파일을 등록해주세요"}
      </p>
    </section>
  );
}

export default PortfolioInput;
