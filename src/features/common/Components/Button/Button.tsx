import { cva, VariantProps } from "cva";

const buttonStyles = cva(
  "focus:shadow-outline mr-0 ml-auto items-end rounded py-1.5 px-4 font-bold text-white focus:outline-none disabled:cursor-not-allowed disabled:bg-neutral-500 dark:text-white",
  {
    variants: {
      intent: {
        primary: "bg-brand-500 hover:bg-brand-700 ",
        secondary: "bg-pink-400 hover:bg-pink-600 ",
        danger: "bg-red-500 hover:bg-red-700 focus:ring-red-500",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {}

const Button = ({ intent, fullWidth, ...props }: ButtonProps) => {
  return <button className={buttonStyles({ intent, fullWidth })} {...props} />;
};

export default Button;
