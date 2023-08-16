import create from "zustand";

type MapStore = {
  kakaoMap: kakao.maps.Map | null;
  setKakaoMap: (map: kakao.maps.Map) => void;
};

const useMapStore = create<MapStore>(set => ({
  kakaoMap: null,
  setKakaoMap: map => set({ kakaoMap: map }),
}));

export default useMapStore;
