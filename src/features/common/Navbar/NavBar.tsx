import { useState, Fragment } from "react";
import Link from "next/link";
import { usePopper } from "react-popper";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export const NavBar = () => (
  <nav className="bg-emerald-500  dark:bg-neutral-900">
    <div className="container mx-auto flex flex-wrap items-center justify-between p-3">
      <span className="self-center whitespace-nowrap text-2xl font-light tracking-[0.5rem] text-white">
        <Link href="/">Exemplum</Link>
      </span>
      <div>
        <SupportDropDown />
        <span className="border-l-2 border-white" />
        <NavBarIconList />
      </div>
    </div>
  </nav>
);

const NavBarIconList = () => <ColorSchemeToggle />;

const ColorSchemeToggle = () => {
  const getIsDarkTheme = () => {
    if (typeof window === "undefined") return false;

    if (document.documentElement.classList.contains("dark")) {
      return true;
    }
  };

  const [darkTheme, setDarkTheme] = useState(getIsDarkTheme);
  const [visible, setVisibility] = useState(false);
  const [reference, setReference] = useState<HTMLButtonElement | null>(null);
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

  const handleToggleColorScheme = () => {
    if (typeof window === "undefined") return;

    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
      setDarkTheme(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
      setDarkTheme(true);
    }
  };

  return (
    <>
      <button
        type="button"
        ref={setReference}
        onMouseEnter={() => setVisibility(true)}
        onMouseLeave={() => setVisibility(false)}
        onClick={() => handleToggleColorScheme()}
        className="pb-1 pl-2 align-middle text-white"
      >
        {darkTheme ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6 rounded-full  text-yellow-300 hover:bg-gray-200/30"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6 rounded-full text-white hover:bg-gray-200/30"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
            />
          </svg>
        )}
      </button>
      {visible && (
        <div
          ref={setPopper}
          style={styles.popper}
          {...attributes.popper}
          className="text-white"
        >
          Toggle Dark Mode
        </div>
      )}
    </>
  );
};

const SupportDropDown = () => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium uppercase text-white shadow-sm hover:bg-slate-900/5">
          Support
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              <span className="block py-2 px-4 text-sm text-gray-700 dark:text-gray-400">
                Community Support
              </span>
            </Menu.Item>
            <Menu.Item>
              <a
                href="#"
                className="block  px-4 py-2 text-sm font-medium text-emerald-500 hover:bg-gray-400/5 hover:underline"
              >
                Github Discussions
              </a>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
