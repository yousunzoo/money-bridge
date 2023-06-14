// import API_KEY from "@/app/layout";

//   interface Window {
//     Kakao: any;
//   }

// const shareKakao = (url: string, title: string, description: string, imageUrl: string) => {
//   if (Window.Kakao) {
//     const kakao = Window.Kakao;
//     if (!kakao.isInitialized()) {
//       kakao.init(API_KEY);
//     }

//     kakao.Share.sendDefault({
//       objectType: "feed",
//       content: {
//         title: title,
//         description: description,
//         imageUrl: imageUrl,
//         imageWidth: 200,
//         imageHeight: 100,
//         link: {
//           mobileWebUrl: url,
//           webUrl: url,
//         },
//       },
//       buttons: [
//         {
//           title: "보러 가기",
//           link: {
//             mobileWebUrl: url,
//             webUrl: url,
//           },
//         },
//       ],
//     });
//   }
// };

// export default shareKakao;
