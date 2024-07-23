import { SvgIconProps } from "@mui/material/SvgIcon";

type Button = {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactElement<SvgIconProps>;
};

const Button = ({ text, onClick, children }: Button) => {
  return (
    <button
      className="flex gap-2 items-center bg-[#003366] w-fit hover:bg-[#002244] duration-300 text-white py-2 px-4 rounded-2xl font-light"
      onClick={onClick}
    >
      {text}
      {children}
    </button>
  );
};
export default Button;
