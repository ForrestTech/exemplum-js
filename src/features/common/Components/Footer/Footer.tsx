export const Footer = () => (
  <div className="container mx-auto items-center justify-center pt-24 text-black dark:text-white">
    <hr />
    <div className="grid grid-cols-4 gap-8 pt-12">
      <div className="text-l w-full font-light tracking-[0.5rem]">Exemplum</div>
      <div className="w-full">
        <p className="pb-2 text-black dark:text-white">Community</p>
        <ul className="text-brand-500 underline">
          <li className="pb-2">
            <a
              href="https://discord.gg/exemplum-js"
              target="_blank"
              rel="noreferrer"
            >
              Discord
            </a>
          </li>
          <li>
            <a
              href="https://github.com/ForrestTech/exemplum-js/discussions"
              target="_blank"
              rel="noreferrer"
            >
              GitHub Discussions
            </a>
          </li>
        </ul>
      </div>
      <div className="w-full">
        <p className="pb-2 text-black dark:text-white">Contact</p>
        <ul className="text-brand-500 underline">
          <li className="pb-2">
            <a href="https://t3.gg/discord" target="_blank" rel="noreferrer">
              T3 Discord
            </a>
          </li>
          <li>
            <a href="mailto:richard.a.forrest@gmail.com">Richard Forrest</a>
          </li>
        </ul>
      </div>
      <div className="w-full">
        <p className="pb-2 text-black dark:text-white">Project</p>
        <ul className="text-brand-500 underline">
          <li className="pb-2">
            <a href="/project/about">About</a>
          </li>
          <li>
            <a href="/project/credit">Credits</a>
          </li>
        </ul>
      </div>
    </div>
    <div className="pt-12">
      <p className="text-center text-black dark:text-white">
        Currently v0.1. Released under the{" "}
        <a
          href="https://github.com/ForrestTech/exemplum-js/blob/main/LICENSE"
          target="_blank"
          rel="noreferrer"
          className="pr-2 text-brand-500 underline"
        >
          MIT License.
        </a>
        Copyright © 2021-2022 Forrest Tech.
      </p>
    </div>
  </div>
);
