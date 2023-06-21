import React from "react";

function Download({ file, title, style }: { file: string; title: string; style: string }) {
  const download = () => {
    const link = document.createElement("a");
    link.href = file;
    link.download = "portfolio.pdf";
    link.click();
  };

  return (
    <div className="mb-[95px]">
      <div className="header mb-[18px] font-bold">{title}</div>
      <div className="flex">
        <div className="mr-1 flex h-12 w-full items-center rounded-md bg-white pl-4 text-placeholder">{file}</div>
        <button onClick={() => download} className={style}>
          다운로드
        </button>
      </div>
    </div>
  );
}

export default Download;
