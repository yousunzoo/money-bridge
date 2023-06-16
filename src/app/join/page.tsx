import { redirect } from "next/navigation";

function Page() {
  redirect("/login");
  return <></>;
}

export default Page;
