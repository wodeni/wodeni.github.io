import Logo from "./Logo";
import penroseLogo from "./assets/penrose.svg";
import Balls from "./Balls";
import styles from "./App.module.css";
import Papers, { Paper } from "./Papers";
import { ReactNode, useState } from "react";
import { HashLink } from "react-router-hash-link";
import news from "./News";
import A from "./A";
import { MdEmail, MdLocationPin } from "react-icons/md";
import {
  FaGithub,
  FaTwitter,
  FaRegFilePdf,
  FaRegPlayCircle,
} from "react-icons/fa";
import { BiSlideshow } from "react-icons/bi";
import { BsBookmarkCheck } from "react-icons/bs";
import Project from "./Project";
import theme from "./theme";

const NewsFeed = () => {
  const today = new Date();
  return (
    <>
      {news
        .filter(
          ({ time }) => time.getUTCFullYear() >= today.getUTCFullYear() - 1
        )
        .map(({ time, msg }, i) => (
          <div className="py-2 text-[#777] text-sm" key={`news-${i}`}>
            <div className="w-fit bg-[#eee] rounded py-px px-1">
              {time.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </div>
            {msg}
          </div>
        ))}
    </>
  );
};
export const Copy = ({
  data,
  children,
}: {
  data: string;
  children: ReactNode;
}) => {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    navigator.clipboard.writeText(data);
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 5000);
  };
  return (
    <div>
      <span
        className={`underline decoration-primary/50 decoration-2  cursor-pointer hover:decoration-primary ease-in-out duration-100`}
        onClick={handleClick}
      >
        {children}
      </span>
      {clicked && <span> (Copied to clipboard)</span>}
    </div>
  );
};

const Publications = () => (
  <div>
    {Papers.map(
      ({
        pdf,
        title,
        venue,
        authors,
        talk,
        coauthors,
        series,
        slides,
        id,
        bibtex,
      }: Paper) => (
        <div key={id} className={styles.PaperEntry}>
          <a href={pdf}>
            <span className={styles.PaperTitle}>{title}</span>
          </a>
          <br />
          <span className={styles.PaperAuthors}>
            {authors
              .map((a) => (coauthors?.includes(a) ? `${a}*` : a))
              .map((a) =>
                a === "Wode Ni" || a === "Wode Ni*" ? <strong>{a}</strong> : a
              )
              .map((a, i) => (
                <li key={`id-author-${i}`}>{a}</li>
              ))}
          </span>
          .
          <br />
          <span className={styles.PaperVenue}>
            {/* {venue} ({series}) */}
            {series}
          </span>
          {"."}
          <div style={{ display: "flex", gap: "5px" }}>
            <div className={styles.PaperAsset}>
              <BsBookmarkCheck />
              <Copy data={bibtex}>bib</Copy>
            </div>
            {pdf && (
              <div className={styles.PaperAsset}>
                <FaRegFilePdf />
                <A href={pdf}>pdf</A>
              </div>
            )}
            {talk && (
              <div className={styles.PaperAsset}>
                <FaRegPlayCircle />
                <A href={talk}>talk</A>
              </div>
            )}
            {slides && (
              <div className={styles.PaperAsset}>
                <BiSlideshow />
                <A href={slides}>slides</A>
              </div>
            )}
          </div>
        </div>
      )
    )}
  </div>
);

const Hero = ({ className }: { className?: string }) => (
  <div className={className}>
    <div className="flex h-44">
      <div className="w-48 h-48">
        <Balls color={theme.colors.primary} />
      </div>
      <Logo className="w-44 ml-4 mt-8" />
    </div>
  </div>
);

const Socials = ({ className }: { className?: string }) => (
  <div
    className={`${className} flex items-start md:items-top ml-auto mb-0 color-primary`}
  >
    <CV />
    <Twitter />
    <GitHub />
    <Email />
    <Office />
  </div>
);

const Icon = ({ url, icon }: { url: string; icon: ReactNode }) => (
  <a
    href={url}
    className="px-1 text-xl flex cursor-pointer hover:opacity-50 ease-in-out duration-200 justify-self-center"
  >
    {icon}
  </a>
);

const Office = () => (
  <Icon
    url="https://goo.gl/maps/Zp92ofs6ze3y8hc19"
    icon={<MdLocationPin width={theme.sizes.icon} fill={theme.colors.icon} />}
  />
);

const Twitter = () => (
  <Icon
    url="https://twitter.com/wodenimoni"
    icon={<FaTwitter width={theme.sizes.icon} fill={theme.colors.icon} />}
  />
);

const GitHub = () => (
  <Icon
    url="https://github.com/wodeni"
    icon={<FaGithub width={theme.sizes.icon} fill={theme.colors.icon} />}
  />
);

const CV = () => (
  <Icon
    url="http://wodenimoni.com/nimo-markdown-cv/"
    icon={<span className="font-extralight leading-5">CV</span>}
  />
);

const Email = () => (
  <Icon
    url="mailto:nimo@cmu.edu"
    icon={<MdEmail width={theme.sizes.icon} fill={theme.colors.icon} />}
  />
);

const Text = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => (
  <p className={`${className} font-sans font-light text-lg my-2`}>{children}</p>
);

const LeftBar = () => (
  <svg
    height={30}
    style={{ position: "absolute", marginTop: 10, zIndex: -1, width: "100%" }}
  >
    <rect
      className={styles.LeftBar}
      x={0}
      y={0}
      width={5}
      height={50}
      fill={theme.colors.primary}
    ></rect>
    <rect x={0} y={0} width={5} height={50} fill={theme.colors.primary}></rect>
  </svg>
);

const Section = ({
  header,
  children,
}: {
  header: string;
  children?: ReactNode;
}) => {
  const id = header.toLowerCase();
  return (
    <div id={id}>
      <span className={styles.Section}>
        <LeftBar />
        <HashLink className={styles.SectionHeader} smooth to={`/#${id}`}>
          {header}
        </HashLink>
      </span>
      {children}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="font-sans grid md:grid-cols-3 m-4 md:m-10">
      <Hero className="md:col-span-2" />
      <Socials className="mt-8" />
      <Text className="md:col-span-2 mt-8">
        I'm Nimo. I build ergonomic digital tools to make difficult things feel
        simple.
      </Text>
      <div className="max-w-screen-md md:col-span-2">
        <Section header={"Research"}>
          <Text>
            I am a Ph.D. candidate at Carnegie Mellon University, School of
            Computer Science, advised by{" "}
            <A href="http://pact.cs.cmu.edu/koedinger.html">Ken Koedinger</A>{" "}
            and <A href="https://www.cs.cmu.edu/~jssunshi/">Josh Sunshine</A>.
          </Text>
          <Publications />
        </Section>
        <Section header={"Tools"}>
          <div className={styles.ProjectContainer}>
            <Project
              name="Edgeworth"
              desc="Diagrammatic problem generation by program mutation."
              link="https://github.com/penrose/penrose/tree/main/packages/edgeworth"
            ></Project>
            <Project
              name="Penrose"
              desc="Create beautiful diagrams just by typing math notation in plain text."
              link="https://penrose.cs.cmu.edu/"
              logo={penroseLogo}
            ></Project>
          </div>
        </Section>
        <Section header={"About"}>
          <Text>
            My name is 倪沃德 (ní wò dé) in Chinese. “Nimo” has been my alias
            since my street dancing days. If you find "Wo-de" hard to pronounce,
            default to “Nimo”.
          </Text>
          <Text>
            I am an avid pool player. I play in local leagues and national
            tournaments.
          </Text>
        </Section>
      </div>
      <div className="md:ml-10 md:max-w-60">
        <Section header={"News"}>
          <NewsFeed />
        </Section>
      </div>
    </div>
  );
};

export default App;
