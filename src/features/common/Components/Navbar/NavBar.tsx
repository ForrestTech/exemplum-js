import { useState, Fragment, useEffect } from "react";
import clsx from "clsx";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  ChevronDownIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/20/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import { NavMenu } from "../NavMenu/NavMenu";
import Tooltip from "../Tooltip/Tooltip";

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
            <Bars3Icon
              className="inline-block h-6 w-6 cursor-pointer text-white"
              onClick={handleOpenNav}
            />
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
  const getIsDarkTheme = (): boolean => {
    if (typeof window === "undefined") return false;

    if (document.documentElement.classList.contains("dark")) {
      return true;
    }
    return false;
  };

  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    setDarkTheme(getIsDarkTheme());
  }, []);

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
      <Tooltip label="Toggle Dark Mode" className="pb-1 pl-2 align-middle">
        {typeof window !== "undefined" && darkTheme ? (
          <SunIcon
            className="mb-1 ml-2  inline h-6 w-6 rounded-full text-yellow-300 hover:bg-gray-200/30"
            onClick={() => handleToggleColorScheme()}
          />
        ) : (
          <MoonIcon
            className="mb-1 ml-2 inline h-6 w-6 rounded-full text-gray-300 hover:bg-gray-200/30"
            onClick={() => handleToggleColorScheme()}
          />
        )}
      </Tooltip>
    </>
  );
};

const GitHubIcon = () => {
  return (
    <>
      <Tooltip label="Visit Repo" className="pb-1 pl-2 align-middle">
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
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mb-1 ml-2 inline cursor-pointer rounded-full text-white hover:bg-gray-200/30"
          >
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
        </a>
      </Tooltip>
    </>
  );
};

const LoginControl = () => {
  const { data: sessionData } = useSession();

  return (
    <>
      <Tooltip
        label={sessionData ? `Logout ${sessionData.user?.name}` : "Login"}
        onClick={sessionData ? () => signOut() : () => signIn()}
        className="pb-1 pl-2 align-middle"
      >
        {sessionData ? (
          <ArrowRightOnRectangleIcon className="mb-1 ml-2 inline h-6 w-6 cursor-pointer rounded-full text-white hover:bg-gray-200/30" />
        ) : (
          <ArrowLeftOnRectangleIcon className="mb-1 ml-2 inline h-6 w-6 cursor-pointer rounded-full text-white hover:bg-gray-200/30" />
        )}
      </Tooltip>
    </>
  );
};
