import { IMsgInputProps } from "@/types/editProfile";

function MsgInput({ register, msg }: IMsgInputProps) {
  return (
    <section className="mb-10">
      <p className="mb-4 text-xl font-bold">프로필 제목을 작성해 주세요.</p>
      <textarea
        className="edit_input mb-2 resize-none"
        placeholder="프로필 제목을 작성해주세요."
        defaultValue={msg}
        maxLength={20}
        {...register("msg")}
      />
      <p className="mr-2 text-right text-xs">{msg.length}/20</p>
    </section>
  );
}

export default MsgInput;
