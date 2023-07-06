import Image from "next/image";
import React, { useState } from "react";
import dayjs from "dayjs";
import profile from "/public/assets/images/profile.svg";
import "@/styles/content.css";
import { getMyId } from "@/utils/pbMyId";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useDelete from "@/hooks/useDelete";
import { postReply, postReReply, deleteReply, editReply } from "@/app/apis/services/auth";
import ButtonModal from "@/components/common/ButtonModal";
import { showName } from "@/utils/userNameFormat";
import { ILoginedUserInfo, IModalContent } from "@/types/common";
import { IContentsInfo, IReReply, IReply } from "@/types/contents";
import Reply from "@/components/contentsPage/Reply";
import useErrorHandler from "@/hooks/useErrorHandler";

function Comments({ commentData, userData }: { commentData: IContentsInfo; userData: ILoginedUserInfo }) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isReply, setIsReply] = useState<boolean>(false);
  const [reID, setReID] = useState<number>(0);
  const [editID, setEditID] = useState<number>(0);
  const [editText, setEditText] = useState<string>("");
  const [newComment, setNewComment] = useState<string>("");
  const [newReComment, setNewReComment] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [error, setError] = useState<IModalContent>({
    content: "",
    confirmText: "확인",
    confirmFn: () => setIsOpen(false),
  });
  const queryClient = useQueryClient();

  const { mutate: postreply } = useMutation(postReply, {
    onSuccess: () => {
      queryClient.refetchQueries(["getContentsId"]);
    },
    onError: (err: any) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useErrorHandler(err, setIsOpen, setError);
    },
  });

  const { mutate: postrereply } = useMutation(postReReply, {
    onSuccess: () => {
      queryClient.refetchQueries(["getContentsId"]);
    },
    onError: (err: any) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useErrorHandler(err, setIsOpen, setError);
    },
  });

  const { mutate: deletereply } = useMutation(deleteReply, {
    onSuccess: () => {
      queryClient.refetchQueries(["getContentsId"]);
    },
    onError: (err: any) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useErrorHandler(err, setIsOpen, setError);
    },
  });

  const { mutate: editreply } = useMutation(editReply, {
    onSuccess: () => {
      queryClient.refetchQueries(["getContentsId"]);
    },
    onError: (err: any) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useErrorHandler(err, setIsOpen, setError);
    },
  });

  const editHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };

  const editItemClickHandler = (itemId: number) => {
    setIsEdit(true);
    setEditID(itemId);
  };

  const editEndHandler = (itemId: number) => {
    if (editText.trim() !== "") {
      editreply({ id: itemId, reply: editText });
    }
    setIsEdit(false);
    setEditID(0);
    setEditText("");
  };

  const replyPostHandler = (id: number) => {
    setIsReply(true);
    setReID(id);
  };

  const replyEndHandler = () => {
    setIsReply(false);
    setReID(0);
  };

  const addComment = () => {
    if (newComment.trim() !== "") {
      postreply({ id: commentData.id, reply: newComment });
      setNewComment("");
    }
  };

  const addReComment = (reId: number) => {
    if (newReComment.trim() !== "") {
      postrereply({ id: reId, rereply: newReComment });
      setNewReComment("");
      setIsReply(false);
      setReID(0);
    }
  };

  const { isDeleteOpen, setIsDeleteOpen, deleteHandler, deleteContents } = useDelete();

  return (
    <>
      <div className="flex">
        <div className="mb-[16px] flex-1 text-base font-bold">댓글 {commentData?.reply.length}개</div>
        <button
          onClick={() => addComment()}
          className="flex h-[30px] w-[72px] items-center justify-center rounded-md border-[2px] bg-white text-secondary-heavy"
        >
          등록
        </button>
      </div>
      <input
        className="mb-[12px] h-[80px] w-full border-[2px] bg-white p-2"
        placeholder="댓글을 남겨보세요"
        type="text"
        value={newComment}
        onChange={e => setNewComment(e.target.value)}
      />

      {commentData?.reply.map((item: IReply) => (
        <div className="mt-[33px]" key={item.id}>
          <div className="flex text-xs">
            <Image className="image" src={item.profile ? item.profile : profile} alt="프로필" width={18} height={18} />
            <div className="name">{showName(item.name)} 님</div>
            <div className="flex-1">{dayjs(item.createdAt).format("YYYY-MM-DD HH:mm:ss")}</div>

            {getMyId(userData?.role, userData?.id, item.authorId) && (
              <>
                {isEdit && editID === item.id ? (
                  <button
                    className="mr-[8px]"
                    onClick={() => {
                      editEndHandler(item.id);
                    }}
                  >
                    완료
                  </button>
                ) : (
                  <button
                    className="mr-[8px]"
                    onClick={() => {
                      editItemClickHandler(item.id);
                    }}
                  >
                    수정
                  </button>
                )}
                <button className="mr-[8px]" onClick={() => deleteHandler(item.id, deletereply)}>
                  삭제
                </button>
              </>
            )}
            {isReply ? (
              <button className="mr-[8px]" onClick={() => replyEndHandler()}>
                취소
              </button>
            ) : (
              <button className="mr-[8px]" onClick={() => replyPostHandler(item.id)}>
                답글
              </button>
            )}
          </div>

          {isEdit && editID === item.id ? (
            <input
              autoFocus
              className="mt-[7px] w-full bg-white p-[14px]"
              defaultValue={item.content}
              type="text"
              onChange={editHandler}
              value={editText ? editText : item.content}
            />
          ) : (
            <div className="content">{item.content}</div>
          )}

          {isReply && reID === item.id && (
            <>
              <input
                autoFocus
                className="mb-[12px] mt-2 h-[50px] w-full border-[2px] bg-white p-2"
                placeholder="답글을 남겨보세요"
                type="text"
                value={newReComment}
                onChange={e => setNewReComment(e.target.value)}
              />
              <button
                className="flex h-[30px] w-[52px] items-center justify-center rounded-md border-[2px] bg-white text-secondary-heavy"
                onClick={() => addReComment(item.id)}
              >
                등록
              </button>
            </>
          )}

          {item.reReply?.map((reply: IReReply) => (
            <Reply
              key={reply.uniqueValue}
              reply={reply}
              userData={userData}
              isDeleteOpen={isDeleteOpen}
              setIsDeleteOpen={setIsDeleteOpen}
              deleteHandler={deleteHandler}
              deleteContents={deleteContents}
            />
          ))}
        </div>
      ))}
      {isDeleteOpen && <ButtonModal modalContents={deleteContents} isOpen={isDeleteOpen} setIsOpen={setIsDeleteOpen} />}
      {error && <ButtonModal modalContents={error} isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
}

export default Comments;
