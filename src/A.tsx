import { ReactNode } from "react";

export default ({ href, children }: { href: string; children: ReactNode }) => {
  return (
    <a
      className={`underline decoration-primary/50 decoration-2  cursor-pointer hover:decoration-primary ease-in-out duration-100`}
      href={href}
    >
      {children}
    </a>
  );
};
