export interface PlaceType {
  id: string;
  position: kakao.maps.LatLng;
  title: string;
  address: string;
}

export interface SearchLoacationProps {
  onUpdatePlaces: (places: PlaceType[]) => void;
  searchDefalutValue: string;
}
