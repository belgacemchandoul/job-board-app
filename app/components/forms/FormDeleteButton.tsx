import React from "react";

interface DeleteButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-fit px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none text-sm duration-300"
    >
      Delete
    </button>
  );
};

export default DeleteButton;
