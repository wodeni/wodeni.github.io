import { useLocation } from "react-router-dom";
import A from "./A";

const Computers = () => (
  <A href={"/"}>
    <div>/Computers</div>
  </A>
);

const Pool = () => (
  <A href={"/pool"}>
    <div>/Pool</div>
  </A>
);

export default () => {
  return (
    <div className="mt-4 md:ml-auto color-primary font-mono">
      {useLocation().pathname === "/pool" ? <Computers /> : <Pool />}
    </div>
  );
};
