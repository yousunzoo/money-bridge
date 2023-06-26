import { IIntroInputProps } from "@/types/editProfile";

function IntroInput({ register, intro }: IIntroInputProps) {
  return (
    <section className="mb-10">
      <p className="mb-4 text-xl font-bold">한 줄 소개를 작성해 주세요.</p>
      <textarea
        className="edit_input mb-2 resize-none"
        placeholder="나를 한 줄로 표현해보세요."
        defaultValue={intro}
        maxLength={100}
        {...register("intro")}
      />
      <p className="mr-2 text-right text-xs">{intro.length}/100</p>
    </section>
  );
}

export default IntroInput;
