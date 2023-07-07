import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState = {
  location: "",
  coordinate: {
    latitude: 37.4953666908089,
    longitude: 127.03306536185,
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
