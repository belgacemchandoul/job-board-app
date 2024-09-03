import React from "react";

interface AddButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-fit px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 focus:outline-none text-sm duration-300"
    >
      Add
    </button>
  );
};

export default AddButton;
