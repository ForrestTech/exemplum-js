interface ToggleProps {
  id: string;
  isOn: boolean;
  onToggle: (isOn: boolean) => void;
  label?: string;
  toolTip?: string;
}

const Toggle = ({ id, isOn, onToggle, label, toolTip }: ToggleProps) => {
  return (
    <label
      htmlFor={id}
      className="relative ml-2 inline-flex cursor-pointer items-center"
      title={toolTip}
    >
      <input
        type="checkbox"
        onChange={(event) => {
          onToggle(event.target.checked);
        }}
        checked={isOn}
        id={id}
        className="peer sr-only"
      ></input>
      <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-brand-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-300 dark:border-gray-600 dark:bg-gray-400 dark:peer-focus:ring-brand-800"></div>
      {label && <span className="ml-2 dark:text-white">{label}</span>}
    </label>
  );
};

export default Toggle;
