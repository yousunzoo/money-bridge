import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState = {
  location: "위치 선택",
  coordinate: {
    latitude: 0,
    longitude: 0,
  },
};

export interface LocationProps {
  locations: {
    location: string;
    coordinate: locationValueProps;
  };
  setLocation: (location: string) => void;
  setCoordinate: (coordinate: locationValueProps) => void;
}

export interface locationValueProps {
  latitude: number;
  longitude: number;
}

const locationStore = create(
  persist<LocationProps>(
    set => ({
      locations: initialState,
      setLocation: location => set(state => ({ locations: { ...state.locations, location } })),
      setCoordinate: coordinate => set(state => ({ locations: { ...state.locations, coordinate } })),
    }),
    {
      name: "locations",
    },
  ),
);

export const useLocationStore = () => locationStore(state => state);
