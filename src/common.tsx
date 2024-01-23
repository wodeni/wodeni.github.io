import { ReactNode } from "react";
import { HashLink } from "react-router-hash-link";
import { Icon } from "./contact";
import { MdDarkMode } from "react-icons/md";

export const Text = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => (
  <p
    className={`${className} font-sans font-extralight text-lg my-2 dark:text-neutral-100`}
  >
    {children}
  </p>
);

export const Section = ({
  header,
  children,
}: {
  header: string;
  children?: ReactNode;
}) => {
  const id = header.toLowerCase();
  // NOTE: SAFARI BUG: without top-0 and left-0, the rect will be shifted down.
  return (
    <div id={id} className="my-4 md:my-8">
      <span className="group font-bold text-3xl tracking-tight curosr-pointer relative ">
        <svg height={30} className="w-full translate-y-1 absolute top-0 left-0">
          <rect
            x={0}
            y={0}
            width={5}
            height={50}
            className="group-hover:opacity-30 group-hover:scale-x-[400] transition-transform transform fill-primary"
          ></rect>
          <rect
            x={0}
            y={0}
            width={5}
            height={50}
            className="fill-primary"
          ></rect>
        </svg>
        <HashLink
          className="ml-[10px] w-full dark:text-neutral-100"
          smooth
          to={`/#${id}`}
        >
          {header}
        </HashLink>
      </span>
      {children}
    </div>
  );
};
export const A = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => {
  return (
    <a
      className={`underline decoration-primary/50 dark:decoration-primary/70 decoration-2  cursor-pointer hover:decoration-primary hover:decoration-3 ease-in-out duration-100`}
      href={href}
    >
      {children}
    </a>
  );
};

export const DarkToggle = ({ toggleDark }: { toggleDark: () => void }) => (
  <Icon onClick={toggleDark}>
    <MdDarkMode className="fill-icon dark:fill-icon-dark" />
  </Icon>
);

type PostMeta = {
  title: string;
  date: string;
  summary: string;
};

export type Post = {
  path: string;
  attributes: PostMeta;
  html: string;
};
