import { ReactNode } from "react";

export default ({ href, children }: { href: string; children: ReactNode }) => {
  return (
    <a
      className={`underline decoration-primary/50 dark:decoration-primary/70 decoration-2  cursor-pointer hover:decoration-primary hover:decoration-3 ease-in-out duration-100`}
      href={href}
    >
      {children}
    </a>
  );
};
