import dynamic from "next/dynamic";

const BeatLoader = dynamic(() => import("react-spinners").then(lib => lib.BeatLoader), {
  ssr: false,
});

type Props = {
  color?: string;
};

export default function BeatSpinner({ color = "black" }: Props) {
  return <BeatLoader color={color} />;
}
