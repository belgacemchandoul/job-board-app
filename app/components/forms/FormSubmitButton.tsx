interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  isSubmitted?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  isLoading = false,
  isSubmitted = false,
  ...rest
}) => {
  const status = () => {
    if (isLoading && !isSubmitted) {
      return "Submitting...";
    } else if (isSubmitted && !isLoading && !rest.disabled) {
      return "Data submitted successfully!";
    } else return "Submit";
  };

  return (
    <button
      className="duration-300 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none disabled:bg-blue-400"
      disabled={isLoading || rest.disabled}
      {...rest}
      type="submit"
    >
      {status()}
    </button>
  );
};

export default SubmitButton;
