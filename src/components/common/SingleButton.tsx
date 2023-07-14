interface ButtonProps {
  title: string;
  role: string;
  ClickFunc: () => void;
}

function SingleButton({ title, role, ClickFunc }: ButtonProps) {
  return (
    <button
      onClick={ClickFunc}
      className={` ${
        role === "USER" ? "bg-secondary-heavy" : "bg-primary-normal"
      } mt-6 h-14 w-full items-end rounded-md text-base font-bold text-white`}
    >
      {title}
    </button>
  );
}

export default SingleButton;
