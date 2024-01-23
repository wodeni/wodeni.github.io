import { HTMLProps, ReactNode } from "react";
import { FaTwitter, FaGithub } from "react-icons/fa";
import { MdLocationPin, MdEmail } from "react-icons/md";
import { DarkToggle } from "./common";

export const Icon = ({ children, ...props }: HTMLProps<HTMLDivElement>) => (
  <div
    className="mx-1 w-6 h-6 text-xl flex cursor-pointer justify-center hover:opacity-50 ease-in-out duration-200"
    {...props}
  >
    {children}
  </div>
);

export const IconLink = ({ url, icon }: { url: string; icon: ReactNode }) => (
  <Icon>
    <a href={url}>{icon}</a>
  </Icon>
);

export const Office = () => (
  <IconLink
    url="https://goo.gl/maps/Zp92ofs6ze3y8hc19"
    icon={<MdLocationPin className="fill-icon dark:fill-icon-dark " />}
  />
);

export const Twitter = () => (
  <IconLink
    url="https://twitter.com/wodenimoni"
    icon={<FaTwitter className="fill-icon dark:fill-icon-dark" />}
  />
);

export const GitHub = () => (
  <IconLink
    url="https://github.com/wodeni"
    icon={<FaGithub className="fill-icon dark:fill-icon-dark" />}
  />
);

export const CV = () => (
  <IconLink
    url="http://wodenimoni.com/nimo-markdown-cv/"
    icon={
      <span className="font-extralight leading-5 text-icon top-[-4px] left-[-3px] relative">
        CV
      </span>
    }
  />
);

export const Email = () => (
  <IconLink
    url="mailto:nimo@cmu.edu"
    icon={<MdEmail className="fill-icon dark:fill-icon-dark grow" />}
  />
);

export const Socials = ({
  className,
  toggleDark,
}: {
  className?: string;
  toggleDark: () => void;
}) => (
  <div
    className={`${className} flex items-start md:items-top md:ml-auto mb-0 color-primary`}
  >
    <CV />
    <Twitter />
    <GitHub />
    <Email />
    <Office />
    <DarkToggle toggleDark={toggleDark} />
  </div>
);
