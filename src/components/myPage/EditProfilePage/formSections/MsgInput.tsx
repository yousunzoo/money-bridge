import { useFormContext } from "react-hook-form";

function MsgInput() {
  const {
    formState: { errors },
    register,
    watch,
  } = useFormContext();
  const msg = watch("msg");
  return (
    <section className="mb-10">
      <p className="mb-4 text-xl font-bold">프로필 제목을 작성해 주세요.</p>
      <textarea
        className={`edit_input mb-2 resize-none ${errors["msg"] && "warnning"}`}
        placeholder="프로필 제목을 작성해주세요."
        defaultValue={msg}
        {...register("msg", {
          maxLength: 20,
        })}
      />
      <p className="mr-2 text-right text-xs">
        <span className={`${errors["msg"] && "text-status-error"}`}>{msg?.length}</span>/20
      </p>
    </section>
  );
}

export default MsgInput;
