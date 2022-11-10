import clsx from "clsx";

interface InputProps {
  className?: string;
  placeholder?: string;
}

const Input = ({ className, placeholder }: InputProps) => {
  return (
    <input
      placeholder={placeholder}
      className={clsx(
        "focus:shadow-outline w-96 appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none",
        className
      )}
      type="text"
    />
  );
};

export default Input;
