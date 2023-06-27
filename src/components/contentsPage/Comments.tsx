import Image from "next/image";
import React, { useState } from "react";
import dayjs from "dayjs";
import profile from "/public/assets/images/profile.svg";
import "@/styles/content.css";
import { getMyId } from "@/utils/pbMyId";
import { postReply } from "@/app/apis/services/auth";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

function Comments({ commentData, userData }: { commentData: any; userData: any }) {
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState("");
  const [newComment, setNewComment] = useState("");
  const queryClient = useQueryClient();

  const { mutate } = useMutation(postReply, {
    onSuccess: data => {
      queryClient.refetchQueries(["getContentsId"]);
    },
    onError: (err: AxiosError) => {
      console.log(err);
    },
  });

  const editHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };

  const showName = (name: string) => {
    return name.length > 2 ? name[0] + "*" + name.slice(2) : name;
  };

  const addComment = () => {
    if (newComment.trim() !== "") {
      mutate({ id: commentData.id, replyInDTO: newComment });
      setNewComment("");
    }
  };

  return (
    <>
      <div className="flex">
        <div className="mb-[16px] flex-1 text-base font-bold">댓글 {commentData?.reply.length}개</div>
        <button
          onClick={addComment}
          className="h-[30px] w-[72px] rounded-md border-[2px] bg-white text-secondary-heavy"
        >
          등록
        </button>
      </div>
      <input
        className="mb-[12px] h-[80px] w-full bg-white"
        placeholder="댓글을 남겨보세요"
        type="text"
        value={newComment}
        onChange={e => setNewComment(e.target.value)}
      />
      {commentData?.reply.map((item: any) => (
        <div className="mt-[33px]" key={item.authorId}>
          <div className="flex text-xs">
            <Image className="image" src={item.profile ? item.profile : profile} alt="프로필" width={18} height={18} />
            <div className="name">{showName(item.name)} 님</div>
            <div className="flex-1">{dayjs(item.createdAt).format("YYYY-MM-DD HH:mm:ss")}</div>

            {getMyId(userData?.role, userData?.id, item.authorId) && (
  <>
    {isEdit ? (
      <button className="mr-[8px]" onClick={() => setIsEdit(false)}>
        완료
      </button>
    ) : (
      <button className="mr-[8px]" onClick={() => setIsEdit(true)}>
        수정
      </button>
    )}
    <button>삭제</button>
  </>
)}

          </div>

          {isEdit ? (
            <input
              className="mt-[7px] w-full bg-white p-[14px]"
              defaultValue={item.content}
              type="text"
              onChange={editHandler}
              value={editText ? editText : item.content}
            />
          ) : (
            <div className="content">{item.content}</div>
          )}

          {item.reReply?.map((reply: any) => (
            <div className="ml-auto mt-[33px] flex w-[90%] flex-col" key={reply.authorId}>
              <div className="flex text-xs">
                <Image
                  className="image"
                  src={item.profile ? item.profile : profile}
                  alt="프로필"
                  width={18}
                  height={18}
                />
                <div className="name">{showName(reply.name)} 님</div>
                <div className="flex-1">{dayjs(reply.createdAt).format("YYYY-MM-DD HH:mm:ss")}</div>
                {getMyId(userData?.role, userData?.id, reply.authorId) && (
  <>
    {isEdit ? (
      <button className="mr-[8px]" onClick={() => setIsEdit(false)}>
        완료
      </button>
    ) : (
      <button className="mr-[8px]" onClick={() => setIsEdit(true)}>
        수정
      </button>
    )}
    <button>삭제</button>
  </>
)}

              </div>
              {isEdit ? (
                <input
                  className="mt-[7px] w-full bg-white p-[14px]"
                  defaultValue={item.content}
                  type="text"
                  onChange={editHandler}
                  value={editText ? editText : item.content}
                />
              ) : (
                <div className="content">{item.content}</div>
              )}
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

export default Comments;
