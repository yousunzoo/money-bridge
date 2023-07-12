import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BoardStatus } from "@/constants/enum";
import { useRouter } from "next/navigation";
import { ITemp, IContentsSave, IContentsEdit } from "@/types/contents";
import "@/styles/content.css";
import { validateFileSize } from "@/utils/validateFileSize";
import { postTemp, postPBContents, updatePBContents } from "@/app/apis/services/pb";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import ButtonModal from "@/components/common/ButtonModal";
import useErrorShow from "@/hooks/useErrorShow";
import dynamic from "next/dynamic";
const ContentEditor = dynamic(() => import("./ContentEditor"));

function Write({ data, id }: { data?: ITemp; id: number }) {
  const { isOpen, setIsOpen, error, errorHandler } = useErrorShow();
  const router = useRouter();
  const isStatus = data?.status === BoardStatus.ACTIVE || BoardStatus.TEMP;
  const [content, setContent] = useState(data?.content || "");
  const { mutate: postPBcontents } = useMutation(postPBContents, {
    onSuccess: data => {
      router.push(`/contents/${data.data}`);
    },
    onError: (err: AxiosError) => {
      errorHandler(err);
    },
  });

  const { mutate: updatePBcontents } = useMutation(updatePBContents, {
    onSuccess: () => {
      router.push(`/contents/${id}`);
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
    formState: { isSubmitting, isDirty, errors, isValid },
  } = useForm({ mode: "onChange" });
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailText, setThumbnailText] = useState(data?.thumbnail || "");
  const [title, setTitle] = useState(isStatus ? data?.title : "");
  const [tag1, setTag1] = useState(isStatus ? data?.tag1 : "");
  const [tag2, setTag2] = useState(isStatus ? data?.tag2 : "");
  const [inputValues, setInputValues] = useState({
    title: "",
    tag1: "",
    tag2: "",
  });

  const isFormValid = isValid && content;

  const onThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setThumbnailFile(e.target.files[0]);
      setThumbnailText(e.target.files[0].name);
    }
  };

  const postSubmit = (formData: IContentsSave) => {
    const SumFormData = { ...formData };
    SumFormData.content = content;
    postPBcontents({ formData: SumFormData, thumbnailFile: thumbnailFile });
  };

  const tempSubmit = (formData: IContentsSave) => {
    const SumFormData = { ...formData };
    SumFormData.content = content;
    posttemp({ formData: SumFormData, thumbnailFile: thumbnailFile });
  };

  const updateSubmit = (formData: IContentsEdit) => {
    const SumFormData = { ...formData };
    SumFormData.content = content;
    if (thumbnailFile === null) {
      SumFormData.deleteThumbnail = true;
      updatePBcontents({ id: id, formData: SumFormData, thumbnailFile: thumbnailFile });
    } else {
      SumFormData.deleteThumbnail = false;
      updatePBcontents({ id: id, formData: SumFormData, thumbnailFile: thumbnailFile });
    }
  };

  const deleteThumbnail = () => {
    setThumbnailFile(null);
    setThumbnailText("");
  };

  return (
    <>
      <form
        className="flex flex-col"
        onSubmit={handleSubmit(isStatus !== BoardStatus.TEMP ? updateSubmit : postSubmit)}
      >
        <label htmlFor="title" className="label">
          제목
        </label>
        <input
          id="title"
          type="text"
          placeholder="제목을 작성해주세요.(40자 이내)"
          className="form_input mb-[24px] h-[56px]"
          aria-invalid={!isDirty ? undefined : errors.title ? "true" : "false"}
          {...register("title", {
            maxLength: {
              value: 40,
              message: "제목은 40자 이내로 작성해주세요.",
            },
          })}
          value={title}
          onChange={e => {
            setTitle(e.target.value);
            setInputValues({ ...inputValues, title: e.target.value });
          }}
        />

        <label htmlFor="content" className="label">
          본문(글상세)
        </label>
        <ContentEditor initialState={content} setContent={setContent} />
        <label htmlFor="tag1" className="label">
          태그1
        </label>
        <input
          id="tag1"
          type="text"
          placeholder="1. 어떤 주제인가요?(7자 이내)"
          className="form_input mb-[10px] h-[56px]"
          aria-invalid={!isDirty ? undefined : errors.tag1 ? "true" : "false"}
          {...register("tag1", {
            required: true,
            maxLength: {
              value: 7,
              message: "태그는 7자 이내로 작성해주세요.",
            },
          })}
          value={tag1}
          onChange={e => {
            setTag1(e.target.value);
            setInputValues({ ...inputValues, tag1: e.target.value });
          }}
        />

        <label htmlFor="tag2" className="label">
          태그2
        </label>
        <input
          id="tag2"
          type="text"
          placeholder="2. 이 콘텐츠의 키워드는 무엇인가요?(7자 이내)"
          className="form_input mb-[24px] h-[56px]"
          aria-invalid={!isDirty ? undefined : errors.tag2 ? "true" : "false"}
          {...register("tag2", {
            required: true,
            maxLength: {
              value: 7,
              message: "태그는 7자 이내로 작성해주세요.",
            },
          })}
          value={tag2}
          onChange={e => {
            setTag2(e.target.value);
            setInputValues({ ...inputValues, tag2: e.target.value });
          }}
        />

        <div className="flex items-center justify-between">
          <div className="label flex-1">대표 이미지 업로드</div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={deleteThumbnail}
              className="file_button flex items-center justify-center bg-primary-light text-center text-white"
            >
              삭제
            </button>
            <label htmlFor="thumbnail" className="file_button flex items-center justify-center text-center">
              이미지 찾기
            </label>
            <input
              type="file"
              {...register("thumbnail", {
                validate: validateFileSize,
              })}
              id="thumbnail"
              className="hidden"
              onChange={onThumbnailChange}
              multiple={false}
            />
          </div>
        </div>
        <p className="form_input mb-[24px] min-h-[48px] break-all text-placeholder">
          {thumbnailText || "이미지를 선택해주세요"}
        </p>

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
                disabled={!isFormValid || isSubmitting}
                className={`button min-w-[175px] max-w-[350px] ${
                  !isFormValid ? "cursor-not-allowed bg-button-inactive" : "bg-primary-normal"
                }`}
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
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`button min-w-[175px] max-w-[350px] ${
                  !isFormValid ? "cursor-not-allowed bg-button-inactive" : "bg-primary-normal"
                }`}
              >
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
