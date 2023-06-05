import { ReactNode } from "react";
import styles from "./App.module.css";
import theme from "./theme";
export default ({
  name,
  desc,
  link,
  logo,
}: {
  name: string;
  desc: string;
  link: string;
  logo?: string;
}) => {
  const color = theme.colors.primary + "77";
  return (
    <a
      href={link}
      className={styles.ProjectCard}
      data-tilt
      data-tilt-speed="250"
      data-tilt-max="10"
      data-tilt-perspective="500"
    >
      <div
        className={styles.ProjectLogo}
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 1), 80%, rgba(255, 255, 255, 0)), 
            url(${logo})`,
          backgroundPosition: "left",
          backgroundSize: "700px 250px",
        }}
      >
        <div
          className={styles.ProjectName}
          style={{
            color: theme.colors.primary,
            opacity: 0.7,
          }}
        >
          {name}
        </div>
        <div className={styles.ProjectDesc}>{desc}</div>
      </div>
    </a>
  );
};
