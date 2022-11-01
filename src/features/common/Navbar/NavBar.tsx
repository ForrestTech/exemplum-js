import { useState, Fragment } from "react";
import clsx from "clsx";
import Link from "next/link";
import { usePopper } from "react-popper";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import { NavMenu } from "../NavMenu/NavMenu";

export const NavBar = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const handleOpenNav = () => {
    if (sideNavOpen) {
      setSideNavOpen(false);
    } else {
      setSideNavOpen(true);
    }
  };

  const handleCloseNav = () => {
    setSideNavOpen(false);
  };

  return (
    <>
      <nav className="bg-emerald-500  dark:bg-neutral-900">
        <div className="container mx-auto flex flex-wrap items-center justify-between p-3">
          <span className="self-center whitespace-nowrap text-2xl font-light tracking-[0.5rem] text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="inline-block h-6 w-6 cursor-pointer text-white"
              onClick={handleOpenNav}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <span className="pl-8">
              <Link href="/" className="p-4">
                Exemplum
              </Link>
            </span>
          </span>
          <div>
            <SupportDropDown />
            <span className="border-l-2 border-white" />
            <NavBarIconList />
            <LoginControl />
          </div>
        </div>
      </nav>
      <SlideOutNav sideNavOpen={sideNavOpen} closeSideNav={handleCloseNav} />
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

interface SlideOutNavProps {
  sideNavOpen: boolean;
  closeSideNav: () => void;
}

const SlideOutNav = ({ sideNavOpen, closeSideNav }: SlideOutNavProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      closeSideNav();
    }
  };
  return (
    <>
      <Transition
        show={sideNavOpen}
        enter-class="opacity-0"
        enter-active-class="ease-out transition-medium"
        enter-to-class="opacity-100"
        leave-class="opacity-100"
        leave-active-class="ease-out transition-medium"
        leave-to-class="opacity-0"
      >
        <div
          id="nav-menu-overlay"
          onKeyDown={(e) => handleKeyPress(e)}
          className="fixed inset-0 z-10 transition-opacity"
        >
          <div
            onClick={() => closeSideNav()}
            className="absolute inset-0 bg-black opacity-50"
            tabIndex={0}
          ></div>
        </div>
      </Transition>
      <aside
        className={clsx(
          "fixed top-0 left-0 z-30 h-full w-64 transform overflow-auto bg-white transition-all duration-300 ease-in-out",
          sideNavOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <NavMenu />
      </aside>
    </>
  );
};

const NavBarIconList = () => (
  <>
    <ColorSchemeToggle />
    <GitHubIcon />
  </>
);

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
        {typeof window !== "undefined" && darkTheme ? (
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
          className="bg-white p-1 text-black"
        >
          Toggle Dark Mode
        </div>
      )}
    </>
  );
};

const GitHubIcon = () => {
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

  return (
    <>
      <button
        type="button"
        ref={setReference}
        onMouseEnter={() => setVisibility(true)}
        onMouseLeave={() => setVisibility(false)}
        className="pb-1 pl-2 align-middle"
      >
        <a
          href="https://github.com/ForrestTech/exemplum-js"
          target="_blank"
          rel="noreferrer"
        >
          <svg
            width="22px"
            height="22px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="mb-1 ml-2 inline cursor-pointer rounded-full text-white hover:bg-gray-200/30"
          >
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
        </a>
      </button>
      {visible && (
        <div
          ref={setPopper}
          style={styles.popper}
          {...attributes.popper}
          className="bg-white p-1 text-black"
        >
          Visit Repo
        </div>
      )}
    </>
  );
};

const LoginControl = () => {
  const { data: sessionData } = useSession();

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

  return (
    <>
      <button
        type="button"
        ref={setReference}
        onMouseEnter={() => setVisibility(true)}
        onMouseLeave={() => setVisibility(false)}
        onClick={sessionData ? () => signOut() : () => signIn()}
        className="pb-1 pl-2 align-middle"
      >
        {sessionData ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6 cursor-pointer rounded-full text-white hover:bg-gray-200/30"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6 cursor-pointer rounded-full text-white hover:bg-gray-200/30"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
        )}
      </button>
      {visible && (
        <div
          ref={setPopper}
          style={styles.popper}
          {...attributes.popper}
          className="bg-white p-1 text-black"
        >
          {sessionData ? `Logout ${sessionData.user?.name}` : "Login"}
        </div>
      )}
    </>
  );
};
