import { FC } from "react";

interface ButtonProps {
  title: string;
  type: "danger" | "normal" | "regular";
  onClick?: () => void;
}

const AppButton: FC<ButtonProps> = ({ title, type, onClick }) => {
  let color = "";
  switch (type) {
    case "danger":
      color = "bg-red-600";
      break;
    case "normal":
      color = "bg-gray-700";
      break;
    case "regular":
      color = "bg-blue-500";
      break;
  }
  return (
    <button
      onClick={onClick}
      className={color + " text-white rounded p-2 w-16"}
    >
      {title}
    </button>
  );
};

export default AppButton;
