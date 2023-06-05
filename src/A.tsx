import { ReactNode, useState } from "react";
import styles from "./App.module.css";
import theme from "./theme";

export default ({ href, children }: { href: string; children: ReactNode }) => {
  const [isHover, setIsHover] = useState(false);
  const handleMouseEnter = () => setIsHover(true);
  const handleMouseLeave = () => setIsHover(false);
  return (
    <a
      className={styles.A}
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        textDecorationColor: isHover
          ? theme.colors.primary
          : `${theme.colors.primary}80`,
      }}
    >
      {children}
    </a>
  );
};
