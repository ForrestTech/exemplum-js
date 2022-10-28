import Image from "next/image";

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
      <div className="text-center text-5xl font-light leading-normal text-emerald-500">
        Get off to a good start
      </div>
      <div className="text-center text-4xl font-light leading-normal text-emerald-500">
        A template for better full stack JS development
      </div>
      <div className="px-36 text-center text-2xl font-light dark:text-white">
        Exemplum is the ideal starting point for full stack developers who want
        to rapidly build amazing applications using a good starting point for
        libraries and tools.
      </div>
      <div className="flex justify-center p-4 pt-12">
        <button
          type="button"
          className="text-md mr-2 mb-2 rounded-md bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 px-12 py-2.5 text-center font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-emerald-300 dark:focus:ring-emerald-800"
        >
          GETTING STARTED
        </button>
        <button
          type="button"
          className="text-md mr-2 mb-2 rounded-md bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 px-12 py-2.5 text-center font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-slate-300 dark:focus:ring-slate-800"
        >
          GITHUB
        </button>
      </div>
    </div>
  </>
);