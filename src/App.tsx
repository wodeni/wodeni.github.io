import Logo from "./Logo";
import penroseLogo from "./assets/penrose.svg";
import edgeworth from "./assets/edgeworth.svg";
import mathdiagrams from "./assets/mathdiagrams.webp";
import Balls from "./Balls";
import Papers, { Paper } from "./Papers";
import { HTMLProps, ReactNode, useEffect, useRef, useState } from "react";
import { HashLink } from "react-router-hash-link";
import news from "./News";
import A from "./A";
import { MdEmail, MdLocationPin, MdDarkMode } from "react-icons/md";
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
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollableDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollableDivRef.current !== null) {
        const isAtTop = scrollableDivRef.current.scrollTop === 0;
        setIsScrolled(!isAtTop);
      }
    };
    if (scrollableDivRef.current !== null) {
      const div = scrollableDivRef.current;
      div.addEventListener("scroll", handleScroll);
      // Cleanup function
      return () => {
        div.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <div className="my-2 relative">
      {isScrolled && (
        <div className="invisible md:visible absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-white dark:from-zinc-800 to-transparent"></div>
      )}
      <div ref={scrollableDivRef} className="overflow-auto max-h-[50vh]">
        {news
          // .filter(
          //   ({ time }) => time.getUTCFullYear() >= today.getUTCFullYear() - 1
          // )
          .map(({ time, msg }, i) => (
            <div
              className="py-2 text-gray-500 md:text-sm dark:text-neutral-300 "
              key={`news-${i}`}
            >
              <div className="w-fit bg-gray-100 text-gray-400 rounded py-px px-1 dark:text-neutral-400 dark:bg-zinc-700">
                {time.toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </div>
              {msg}
            </div>
          ))}
      </div>
      <div className="invisible md:visible absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white dark:from-zinc-800 to-transparent"></div>
    </div>
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
        className={`underline decoration-primary/50 dark:decoration-primary/70 decoration-2  cursor-pointer hover:decoration-primary hover:decoration-3 ease-in-out duration-100`}
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
        <div key={id} className="my-4">
          <a href={pdf}>
            <span className="text-lg font-semibold dark:font-normal cursor-pointer">
              {title}
            </span>
          </a>
          <br />
          <span className="text-base font-light">
            {authors
              .map((a) => (coauthors?.includes(a) ? `${a}*` : a))
              .map((a) =>
                a === "Wode Ni" || a === "Wode Ni*" ? <strong>{a}</strong> : a
              )
              .map((a, i) => (
                <span key={`${id}-author-${i}`}>
                  <li className={`inline dark:font-thin`}>{a}</li>
                  {i !== authors.length - 1 && <span>, </span>}
                </span>
              ))}
          </span>
          . <span className="text-base font-light italic">{series}</span>
          {"."}
          <div className="flex gap-2">
            {bibtex && (
              <div className="flex items-center gap-0.5">
                <BsBookmarkCheck />
                <Copy data={bibtex}>bib</Copy>
              </div>
            )}
            {pdf && (
              <div className="flex items-center gap-0.5">
                <FaRegFilePdf />
                <A href={pdf}>pdf</A>
              </div>
            )}
            {talk && (
              <div className="flex items-center gap-0.5">
                <FaRegPlayCircle />
                <A href={talk}>talk</A>
              </div>
            )}
            {slides && (
              <div className="flex items-center gap-0.5">
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

const DarkToggle = ({ toggleDark }: { toggleDark: () => void }) => (
  <Icon onClick={toggleDark}>
    <MdDarkMode className="fill-icon dark:fill-icon-dark" />
  </Icon>
);

const Socials = ({
  className,
  toggleDark,
}: {
  className?: string;
  toggleDark: () => void;
}) => (
  <div
    className={`${className} flex items-start md:items-top md:ml-auto mb-0 color-primary`}
  >
    <CV />
    <Twitter />
    <GitHub />
    <Email />
    <Office />
    <DarkToggle toggleDark={toggleDark} />
  </div>
);

const Icon = ({ children, ...props }: HTMLProps<HTMLDivElement>) => (
  <div
    className="mx-1 w-6 h-6 text-xl flex cursor-pointer justify-center hover:opacity-50 ease-in-out duration-200"
    {...props}
  >
    {children}
  </div>
);

const IconLink = ({ url, icon }: { url: string; icon: ReactNode }) => (
  <Icon>
    <a href={url}>{icon}</a>
  </Icon>
);

const Office = () => (
  <IconLink
    url="https://goo.gl/maps/Zp92ofs6ze3y8hc19"
    icon={<MdLocationPin className="fill-icon dark:fill-icon-dark " />}
  />
);

const Twitter = () => (
  <IconLink
    url="https://twitter.com/wodenimoni"
    icon={<FaTwitter className="fill-icon dark:fill-icon-dark" />}
  />
);

const GitHub = () => (
  <IconLink
    url="https://github.com/wodeni"
    icon={<FaGithub className="fill-icon dark:fill-icon-dark" />}
  />
);

const CV = () => (
  <IconLink
    url="http://wodenimoni.com/nimo-markdown-cv/"
    icon={
      <span className="font-extralight leading-5 text-icon top-[-4px] left-[-3px] relative">
        CV
      </span>
    }
  />
);

const Email = () => (
  <IconLink
    url="mailto:nimo@cmu.edu"
    icon={<MdEmail className="fill-icon dark:fill-icon-dark grow" />}
  />
);

const Text = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => (
  <p
    className={`${className} font-sans font-extralight text-lg my-2 dark:text-neutral-100`}
  >
    {children}
  </p>
);

const Section = ({
  header,
  children,
}: {
  header: string;
  children?: ReactNode;
}) => {
  const id = header.toLowerCase();
  // NOTE: SAFARI BUG: without top-0 and left-0, the rect will be shifted down.
  return (
    <div id={id} className="my-4 md:my-8">
      <span className="group font-bold text-3xl tracking-tight curosr-pointer relative ">
        <svg height={30} className="w-full translate-y-1 absolute top-0 left-0">
          <rect
            x={0}
            y={0}
            width={5}
            height={50}
            className="group-hover:opacity-30 group-hover:scale-x-400 transition-transform transform fill-primary"
          ></rect>
          <rect
            x={0}
            y={0}
            width={5}
            height={50}
            className="fill-primary"
          ></rect>
        </svg>
        <HashLink
          className="ml-[10px] w-full dark:text-neutral-100"
          smooth
          to={`/#${id}`}
        >
          {header}
        </HashLink>
      </span>
      {children}
    </div>
  );
};
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

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const toggleDark = () => {
    setDarkMode(!darkMode);
  };

  function updateTheme() {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setDarkMode(true);
    } else {
      // Otherwise, remove it
      setDarkMode(false);
    }
  }

  useEffect(() => {
    // Add an event listener to react to changes in the system's color scheme
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", updateTheme);
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div
      className={
        "font-sans md:grid md:grid-cols-3 p-4 md:p-10 max-w-screen-xl dark:text-neutral-100"
      }
    >
      <Hero className="md:col-span-2" />
      <Socials className="mt-8" toggleDark={toggleDark} />
      <Text className="md:col-span-2 mt-8">
        I'm Nimo. I build ergonomic digital tools to make difficult things feel
        simple.
      </Text>
      <div className="max-w-screen-md md:col-span-2">
        <Section header={"Research"}>
          <Text className="">
            I am a Ph.D. candidate at Carnegie Mellon University, School of
            Computer Science, advised by{" "}
            <A href="http://pact.cs.cmu.edu/koedinger.html">Ken Koedinger</A>{" "}
            and <A href="https://www.cs.cmu.edu/~jssunshi/">Josh Sunshine</A>.
            Here are some selected papers. Refer to the{" "}
            <A href="http://wodenimoni.com/nimo-markdown-cv/">CV</A> for more.
          </Text>
          <Publications />
        </Section>
        <Section header={"Tools"}>
          <div className="grid lg:grid-cols-2 gap-2 md:gap-4 lg:gap-8 my-4">
            <Project
              name="Penrose"
              desc="Create beautiful diagrams just by typing math notation in plain text."
              link="https://penrose.cs.cmu.edu/"
              logo={penroseLogo}
              dark={darkMode}
            ></Project>
            <Project
              name="Edgeworth"
              desc="Diagrammatic problem generation by program mutation."
              link="https://penrose.github.io/penrose/edgeworth/develop/"
              logo={edgeworth}
              dark={darkMode}
            ></Project>
            <Project
              name="Math Diagrams"
              desc="A growing collection of open-source math visualizations."
              link="https://mathdiagrams.com/"
              dark={darkMode}
              logo={mathdiagrams}
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
      <Footer />
    </div>
  );
};

export default App;
