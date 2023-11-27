import Balls from "./Balls";
import Logo from "./Logo";
import styles from "./App.module.css";
import theme from "./theme";
import { MdEmail, MdLocationPin } from "react-icons/md";
import { FaTwitter, FaGithub } from "react-icons/fa";

const Office = () => (
  <a href="https://goo.gl/maps/Zp92ofs6ze3y8hc19" className={styles.SocialIcon}>
    <MdLocationPin width={theme.sizes.icon} fill={theme.colors.icon} />
    {/* <span style={{ fontSize: "12px", lineHeight: 3 }}>TCS 317</span> */}
  </a>
);

const Twitter = () => (
  <a href="https://twitter.com/wodenimoni" className={styles.SocialIcon}>
    <FaTwitter width={theme.sizes.icon} fill={theme.colors.icon} />
  </a>
);
const GitHub = () => (
  <a href="https://github.com/wodeni" className={styles.SocialIcon}>
    <FaGithub width={theme.sizes.icon} fill={theme.colors.icon} />
  </a>
);

const CV = () => (
  <a
    href="http://wodenimoni.com/nimo-markdown-cv/"
    className={styles.SocialIcon}
    style={{
      fontSize: "18px",
      lineHeight: 1.3,
      fontWeight: 400,
      color: theme.colors.icon,
    }}
  >
    CV
  </a>
);

const Email = () => (
  <a href="mailto:nimo@cmu.edu" className={styles.SocialIcon}>
    <MdEmail width={theme.sizes.icon} fill={theme.colors.icon} />
  </a>
);

const Socials = () => (
  <div className={styles.Social}>
    <CV />
    <Twitter />
    <GitHub />
    <Email />
    <Office />
  </div>
);

export default () => (
  <div className={styles.Header}>
    <div className={styles.LogoRow}>
      <div className={styles.balls}>
        <Balls color={theme.colors.primary} />
      </div>
      <Logo className={styles.logo} color={theme.colors.primary} />
    </div>
    <div className={styles.HeaderCol}>
      <Socials />
    </div>
  </div>
);
