import { deleteReReply, editReReply } from "@/app/apis/services/auth";
import { ILoginedUserInfo } from "@/types/common";
import { getMyId } from "@/utils/pbMyId";
import { showName } from "@/utils/userNameFormat";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";
import profile from "/public/assets/images/profile.svg";
import ButtonModal from "@/components/common/ButtonModal";

function Reply({
  reply,
  userData,
  isDeleteOpen,
  setIsDeleteOpen,
  deleteHandler,
  deleteContents,
}: {
  reply: any;
  userData: ILoginedUserInfo;
  isDeleteOpen: boolean;
  setIsDeleteOpen: Dispatch<SetStateAction<boolean>>;
  deleteHandler: (id: number, mutate: any) => void;
  deleteContents: {
    content: string;
    confirmText: string;
    confirmFn: () => void;
  };
}) {
  const [isReEdit, setIsReEdit] = useState<boolean>(false);
  const [newReComment, setNewReComment] = useState<string>("");
  const queryClient = useQueryClient();

  const { mutate: deleterereply } = useMutation(deleteReReply, {
    onSuccess: () => {
      queryClient.refetchQueries(["getContentsId"]);
    },
    onError: (err: AxiosError) => {},
  });

  const { mutate: editrereply } = useMutation(editReReply, {
    onSuccess: () => {
      queryClient.refetchQueries(["getContentsId"]);
    },
    onError: (err: AxiosError) => {},
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
          <Image className="image" src={reply.profile ? reply.profile : profile} alt="프로필" width={18} height={18} />
          <div className="name">{showName(reply.name)} 님</div>
          <div className="flex-1">{dayjs(reply.createdAt).format("YYYY-MM-DD HH:mm:ss")}</div>
          {getMyId(userData?.role, userData?.id, reply.authorId) && (
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
              <button onClick={() => deleteHandler(reply.id, deleterereply)}>삭제</button>
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
          />
        ) : (
          <div className="content">{reply.content}</div>
        )}
      </div>
      {isDeleteOpen && <ButtonModal modalContents={deleteContents} isOpen={isDeleteOpen} setIsOpen={setIsDeleteOpen} />}
    </>
  );
}

export default Reply;
