import { useFormContext } from "react-hook-form";

function IntroInput() {
  const {
    watch,
    formState: { errors },
    register,
  } = useFormContext();
  const intro = watch("intro");
  return (
    <section className="mb-10">
      <p className="mb-4 text-xl font-bold">한 줄 소개를 작성해 주세요.</p>
      <textarea
        className={`edit_input mb-2 resize-none ${errors["intro"] && "warnning"}`}
        placeholder="나를 한 줄로 표현해보세요."
        defaultValue={intro}
        {...register("intro", {
          maxLength: 100,
        })}
      />
      <p className="mr-2 text-right text-xs">
        <span className={`${errors["intro"] && "text-status-error"}`}>{intro?.length}</span>/100
      </p>
    </section>
  );
}

export default IntroInput;
