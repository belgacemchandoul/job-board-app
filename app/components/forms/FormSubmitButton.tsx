import React from "react";

interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  isLoading = false,
  ...rest
}) => {
  return (
    <button
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none disabled:bg-blue-400"
      disabled={isLoading || rest.disabled}
      {...rest}
    >
      {isLoading ? "Submitting..." : "Submit"}
    </button>
  );
};

export default SubmitButton;
