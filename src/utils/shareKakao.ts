const shareKakao = (url: string, title: string, description: string, imageUrl: string) => {
  if (window.Kakao) {
    const kakao = window.Kakao;
    if (!kakao.isInitialized()) {
      kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
    }

    kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: title,
        description: description,
        imageUrl: imageUrl,
        imageWidth: 200,
        imageHeight: 100,
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      buttons: [
        {
          title: "보러 가기",
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      ],
    });
  }
};

export default shareKakao;
