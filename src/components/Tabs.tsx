import { Link, Navigate, useLocation } from "react-router-dom";
import A from "./A";

const StyledLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => (
  <Link
    to={to}
    className={`underline decoration-primary/50 dark:decoration-primary/70 decoration-2  cursor-pointer hover:decoration-primary hover:decoration-3 ease-in-out duration-100`}
  >
    {children}
  </Link>
);

const Computers = () => (
  <StyledLink to={"/"}>
    <div>/Computers</div>
  </StyledLink>
);

const Pool = () => (
  <StyledLink to={"/pool"}>
    <div>/Pool</div>
  </StyledLink>
);

export default () => {
  return (
    <div className="mt-4 md:ml-auto color-primary font-mono">
      {useLocation().pathname === "/pool" ? <Computers /> : <Pool />}
    </div>
  );
};
