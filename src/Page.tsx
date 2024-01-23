import { ReactNode } from "react";
import Balls from "./Balls";
import Logo from "./Logo";
import theme from "./theme";
import { Email, GitHub, Twitter } from "./contact";

export default ({
  children,
  logoOnly = false,
}: {
  children: ReactNode;
  logoOnly?: boolean;
}) => {
  const Hero = ({ className }: { className?: string }) => (
    <div className={className}>
      {logoOnly ? (
        <div className="h-44">
          <Logo className="w-44 mt-8" />
        </div>
      ) : (
        <div className="flex h-44">
          <div className="w-48 h-48">
            <Balls color={theme.colors.primary} />
          </div>
          <Logo className="w-44 ml-4 mt-8" />
        </div>
      )}
    </div>
  );
  const Footer = () => (
    <div className="md:col-span-3 mt-8 w-full flex flex-col text-sm justify-center items-center text-gray-500 dark:text-neutral-400">
      <span className="mb-2">
        © {new Date().getUTCFullYear()} Wode "Nimo" Ni.
        {/* Last updated on{" "}
      {new Date(document.lastModified).toLocaleString("default", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })}
      . */}
      </span>
      <div className={`flex items-start color-primary text-sm`}>
        <Twitter />
        <GitHub />
        <Email />
      </div>
    </div>
  );
  return (
    <div
      className={
        "font-sans md:grid md:grid-cols-3 p-4 md:p-10 max-w-screen-xl dark:text-neutral-100"
      }
    >
      <Hero className="md:col-span-2" />
      {children}
      <Footer />
    </div>
  );
};
