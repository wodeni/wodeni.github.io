import Header from "./Header";
import styles from "./App.module.css";
import { Divider, NewsFeed, Section } from "./Academic";
import A from "./A";
import Tabs from "./Tabs";

const Intro = () => (
  <p className={styles.text}>
    I'm an avid amateur pool player. This page is the pool side of me.
  </p>
);

export default () => (
  <div className={styles.App}>
    <div className={styles.Main}>
      <Header />
      <Tabs />
      <Intro />
      <Section header={"Posts"}>
        <p className={styles.text}>Sometimes I write about pool.</p>
      </Section>
    </div>
    <div className={styles.RightPanel}>
      <Divider />
      <Section header={"Travel"}></Section>
    </div>
  </div>
);
