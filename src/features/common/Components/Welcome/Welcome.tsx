import Image from "next/image";
import Link from "next/link";

export const Welcome = () => (
  <>
    <div>
      <div id="logo-wrapper" className="flex justify-center pt-24">
        <Image
          src="/exemplum-logo.svg"
          alt="Exemplum Logo"
          width="400"
          height="260"
        />
      </div>
      <div className="text-center text-5xl font-light leading-normal text-brand-500">
        Get off to a good start
      </div>
      <div className="text-center text-4xl font-light leading-normal text-brand-500">
        A template for better full stack JS development
      </div>
      <div className="px-36 text-center text-2xl font-light dark:text-white">
        Exemplum is the ideal starting point for full stack developers who want
        to rapidly build amazing applications using a good starting point for
        libraries and tools.
      </div>
      <div className="flex justify-center p-4 pt-12">
        <Link href="https://github.com/ForrestTech/exemplum-js" passHref>
          <button
            type="button"
            className="text-md mr-2 mb-2 rounded-md bg-gradient-to-r from-brand-400 via-brand-500 to-brand-600 px-12 py-2.5 text-center font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-brand-300 dark:focus:ring-brand-800"
          >
            GETTING STARTED
          </button>
        </Link>
        <Link href="https://github.com/ForrestTech/exemplum-js" passHref>
          <button
            type="button"
            className="text-md mr-2 mb-2 rounded-md bg-gradient-to-r from-dark-700 via-dark-800 to-dark-900 px-12 py-2.5 text-center font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-dark-300 dark:focus:ring-dark-800"
          >
            GITHUB
          </button>
        </Link>
      </div>
    </div>
  </>
);
