const Input = (props: React.ComponentProps<"input">) => {
  return (
    <input
      className="focus:shadow-outline w-96 appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
      type="text"
      {...props}
    />
  );
};

export default Input;
