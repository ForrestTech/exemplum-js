import clsx from "clsx";
import { useState } from "react";
import { usePopper } from "react-popper";

interface ToolTipProps {
  label: string;
  children: React.ReactNode;
  classNames?: string;
  popUpClassNames?: string;
}

const Tooltip = ({
  label,
  children,
  classNames,
  popUpClassNames,
}: React.ComponentProps<"span"> & ToolTipProps) => {
  const [visible, setVisibility] = useState(false);
  const [reference, setReference] = useState<HTMLSpanElement | null>(null);
  const [popper, setPopper] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(reference, popper, {
    placement: "bottom",
    modifiers: [
      {
        name: "offset",
        enabled: true,
        options: {
          offset: [0, 10],
        },
      },
    ],
  });

  return (
    <>
      <span
        ref={setReference}
        onMouseEnter={() => setVisibility(true)}
        onMouseLeave={() => setVisibility(false)}
        className={clsx(classNames)}
      >
        {children}
      </span>
      {visible && (
        <div
          ref={setPopper}
          style={styles.popper}
          {...attributes.popper}
          className={clsx("bg-white p-1 text-black", popUpClassNames)}
        >
          {label}
        </div>
      )}
    </>
  );
};

export default Tooltip;
