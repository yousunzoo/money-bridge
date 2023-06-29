export interface SearchLocationProps {
  setIsOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SearchListProps {
  x: number;
  y: number;
  address_name: string;
}

export interface PositionProps {
  coords: {
    latitude: number;
    longitude: number;
  };
}

export interface CoordinateProps {
  latitude: number;
  longitude: number;
}
