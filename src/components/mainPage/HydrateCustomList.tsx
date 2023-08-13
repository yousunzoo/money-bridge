// import getQueryClient from "@/app/getQueryClient";
// import { Hydrate, dehydrate } from "@tanstack/react-query";
// import React from "react";
// import { getUserContents } from "@/app/apis/services/user";
// import CustomListSection from "./CustomListSection";

// async function HydrateCustomList() {
//   const queryClient = getQueryClient();
//   await queryClient.prefetchQuery(["boardList"], getUserContents);
//   const dehydratedState = dehydrate(queryClient);
//   console.log(dehydratedState, "이게 ?");

//   return (
//     <Hydrate state={dehydratedState}>
//       <CustomListSection />
//     </Hydrate>
//   );
// }

// export default HydrateCustomList;
