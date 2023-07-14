import axios from "axios";

interface getLocationNameProps {
  latitude: number;
  longitude: number;
}

const options = {
  headers: {
    Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
  },
};

export const getLocationName = async ({ latitude, longitude }: getLocationNameProps) => {
  console.log(latitude);
  if (latitude === 0) return;
  const url = `${process.env.NEXT_PUBLIC_KAKAO_API_COORD_URL}?x=${longitude}&y=${latitude}`;
  try {
    const response = await axios.get(url, options);
    const res = response.data;
    const resArr = res.documents[1].address_name.split(" ");
    const location = resArr[resArr.length - 1];
    return location;
  } catch (error) {
    throw new Error("서비스 영역이 아닙니다.");
  }
};

export const searchLocation = async (searchWord: string) => {
  const encodedQuery = encodeURIComponent(searchWord);
  const url = `${process.env.NEXT_PUBLIC_KAKAO_API_SEARCH_URL}?query=${encodedQuery}`;
  try {
    const res = await axios.get(url, options);
    const data = res.data;
    return data;
  } catch (error) {
    throw new Error("서비스 영역이 아닙니다.");
  }
};
