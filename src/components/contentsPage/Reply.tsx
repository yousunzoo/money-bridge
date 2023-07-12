import { deleteReReply, editReReply } from "@/app/apis/services/auth";
import { ILoginedUserInfo } from "@/types/common";
import { getMyId } from "@/utils/pbMyId";
import { showName } from "@/utils/userNameFormat";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import Image from "next/image";
import React, { useState } from "react";
import profile from "/public/assets/images/profile.svg";
import ButtonModal from "@/components/common/ButtonModal";
import useErrorShow from "@/hooks/useErrorShow";

function Reply({
  reply,
  userData,
  id,
  replyHandler,
}: {
  reply: any;
  userData: ILoginedUserInfo;
  id: number;
  replyHandler: (id: number, mutate: any) => void;
}) {
  const [isReEdit, setIsReEdit] = useState(false);
  const [newReComment, setNewReComment] = useState<string>("");
  const { isOpen, setIsOpen, error, errorHandler } = useErrorShow();
  const queryClient = useQueryClient();

  const { mutate: deleterereply } = useMutation(deleteReReply, {
    onSuccess: () => {
      queryClient.refetchQueries(["getContentsId", id]);
    },
    onError: (err: AxiosError) => {
      errorHandler(err);
    },
  });

  const { mutate: editrereply } = useMutation(editReReply, {
    onSuccess: () => {
      queryClient.refetchQueries(["getContentsId", id]);
    },
    onError: (err: AxiosError) => {
      errorHandler(err);
    },
  });

  const editReReplyHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewReComment(e.target.value);
  };

  const replyEditEndHandler = (itemId: number) => {
    if (newReComment.trim() !== "") {
      editrereply({ id: itemId, rereply: newReComment });
    }
    setIsReEdit(false);
    setNewReComment("");
  };

  return (
    <>
      <div className="ml-auto mt-[33px] flex w-[90%] flex-col">
        <div className="flex text-xs">
          <div className="relative mr-2 h-[18px] w-[18px] overflow-hidden rounded-full">
            <Image className="object-cover" src={reply.profile ? reply.profile : profile} alt="프로필" fill />
          </div>
          <div className="name mr-2 font-bold">{showName(reply.name)} 님</div>
          <div className="flex-1">{dayjs(reply.createdAt).format("YYYY-MM-DD HH:mm:ss")}</div>
          {getMyId(userData?.role, userData?.id, reply.authorId, reply.role) && (
            <>
              {isReEdit ? (
                <button className="mr-[8px]" onClick={() => replyEditEndHandler(reply.id)}>
                  완료
                </button>
              ) : (
                <button className="mr-[8px]" onClick={() => setIsReEdit(true)}>
                  수정
                </button>
              )}
              <button onClick={() => replyHandler(reply.id, deleterereply)}>삭제</button>
            </>
          )}
        </div>
        {isReEdit ? (
          <input
            autoFocus
            className="mt-[7px] w-full bg-white p-[14px]"
            defaultValue={reply.content}
            type="text"
            onChange={editReReplyHandler}
            value={newReComment ? newReComment : reply.content}
            onKeyDown={e => {
              if (e.key === "Enter") replyEditEndHandler(reply.id);
            }}
          />
        ) : (
          <div className="content">{reply.content}</div>
        )}
      </div>

      {error && <ButtonModal modalContents={error} isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
}

export default Reply;
