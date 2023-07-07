import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BoardStatus } from "@/constants/enum";
import { usePathname, useRouter } from "next/navigation";
import { ITemp, IContentsSave, IContentsEdit } from "@/types/contents";
import "@/styles/content.css";
import { validateFileSize } from "@/utils/validateFileSize";
import { postTemp, postPBContents, updatePBContents } from "@/app/apis/services/pb";
import { useMutation } from "@tanstack/react-query";
import "@/app/globals.css";
import { AxiosError } from "axios";
import ButtonModal from "@/components/common/ButtonModal";
import useErrorShow from "@/utils/errorShow";
import { ILoginedUserInfo } from "@/types/common";

function Write({ data, id, userData }: { data?: ITemp; id: number; userData?: ILoginedUserInfo; }) {
  const { isOpen, setIsOpen, error, errorHandler } = useErrorShow();
  const router = useRouter();
  const isStatus = data?.status === BoardStatus.ACTIVE || BoardStatus.TEMP;

  const { mutate: postPBcontents } = useMutation(postPBContents, {
    onSuccess: () => {
      router.push(`/detail/content/${userData?.id}`);
    },
    onError: (err: AxiosError) => {
      errorHandler(err);
    },
  });

  const { mutate: updatePBcontents } = useMutation(updatePBContents, {
    onSuccess: () => {
      router.push(`/detail/content/${userData?.id}`);
    },
    onError: (err: AxiosError) => {
      errorHandler(err);
    },
  });

  const { mutate: posttemp } = useMutation(postTemp, {
    onSuccess: () => {
      router.push("/contents/temporary");
    },
    onError: (err: AxiosError) => {
      errorHandler(err);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm({ mode: "onChange" });

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const onThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setThumbnailFile(e.target.files[0]);
    }
  };

  const postSubmit = (formData: IContentsSave) => {
    postPBcontents({ formData: formData, thumbnailFile: thumbnailFile });
  };

  const tempSubmit = (formData: IContentsSave) => {
    posttemp({ formData: formData, thumbnailFile: thumbnailFile });
  };

  const updateSubmit = (formData: IContentsEdit) => {
    if (thumbnailFile === null) {
      formData.deleteThumbnail = true;
      updatePBcontents({ id: id, formData: formData, thumbnailFile: thumbnailFile });
    } else {
      formData.deleteThumbnail = false;
      updatePBcontents({ id: id, formData: formData, thumbnailFile: thumbnailFile });
    }
  };

  return (
    <>
      <form
        className="flex flex-col"
        onSubmit={handleSubmit(isStatus !== BoardStatus.TEMP ? updateSubmit : postSubmit)}
      >
        <label htmlFor="title" className="title">
          제목
        </label>
        <input
          id="title"
          type="text"
          placeholder="제목을 작성해주세요.(20자 이내)"
          className="form_input mb-[24px] h-[56px]"
          aria-invalid={!isDirty ? undefined : errors.title ? "true" : "false"}
          {...register("title", {
            maxLength: {
              value: 20,
              message: "제목은 20자 이내로 작성해주세요.",
            },
          })}
          defaultValue={isStatus ? data?.title : ""}
        />

        <label htmlFor="content" className="title">
          본문(글상세)
        </label>
        <input
          id="content"
          type="text"
          placeholder="본문을 작성해 주세요."
          className="form_input mb-[24px] h-[131px] whitespace-normal"
          {...register("content")}
          defaultValue={isStatus ? data?.content : ""}
        />

        <label htmlFor="tag1" className="title">
          태그1
        </label>
        <input
          id="tag1"
          type="text"
          placeholder="1. 어떤 주제인가요?(7자 이내)"
          className="form_input mb-[10px] h-[56px]"
          aria-invalid={!isDirty ? undefined : errors.tag1 ? "true" : "false"}
          {...register("tag1", {
            maxLength: {
              value: 7,
              message: "태그는 7자 이내로 작성해주세요.",
            },
          })}
          defaultValue={isStatus ? data?.tag1 : ""}
        />

        <label htmlFor="tag2" className="title">
          태그2
        </label>
        <input
          id="tag2"
          type="text"
          placeholder="2. 이 콘텐츠의 키워드는 무엇인가요?(7자 이내)"
          className="form_input mb-[24px] h-[56px]"
          aria-invalid={!isDirty ? undefined : errors.tag2 ? "true" : "false"}
          {...register("tag2", {
            maxLength: {
              value: 7,
              message: "태그는 7자 이내로 작성해주세요.",
            },
          })}
          defaultValue={isStatus ? data?.tag2 : ""}
        />

        <div className="flex items-center">
          <div className="title flex-1">대표 이미지 업로드</div>
          <label htmlFor="thumbnail" className="file_button flex items-center justify-center text-center">
            이미지 찾기
          </label>
          <input
            type="file"
            {...(register("thumbnail"), { validate: validateFileSize })}
            id="thumbnail"
            className="hidden"
            onChange={onThumbnailChange}
            multiple={false}
          />
        </div>
        <div className="form_input mb-[24px] h-[48px] text-placeholder">
          {data?.thumbnail ? data?.thumbnail : thumbnailFile?.name}
        </div>

        <div className="flex items-center justify-center">
          {isStatus !== BoardStatus.TEMP ? (
            <>
              <button
                type="button"
                onClick={() => router.replace(`/contents/${id}`)}
                className="button_outlined mr-10 min-w-[175px] max-w-[350px]"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="button min-w-[175px] max-w-[350px] bg-primary-normal"
              >
                수정 완료
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleSubmit(tempSubmit)}
                disabled={isSubmitting}
                className="button_outlined mr-10 min-w-[175px] max-w-[350px]"
              >
                임시 저장
              </button>
              <button type="submit" disabled={isSubmitting} className="button min-w-[175px] max-w-[350px]">
                작성 완료
              </button>
            </>
          )}
        </div>
      </form>
      {error && <ButtonModal modalContents={error} isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
}

export default Write;
