import Logo from "./Logo";
import edgeworth from "./assets/edgeworth.svg";
import mathdiagrams from "./assets/mathdiagrams.webp";
import schemaGames from "./assets/schema-games.png";
import Balls from "./components/Balls";
import {
  HTMLProps,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { HashLink } from "react-router-hash-link";
import news from "./News";
import A from "./components/A";
import { MdEmail, MdLocationPin, MdDarkMode } from "react-icons/md";
import {
  FaGithub,
  FaTwitter,
  FaRegFilePdf,
  FaRegPlayCircle,
} from "react-icons/fa";
import { BiSlideshow } from "react-icons/bi";
import { BsBookmarkCheck } from "react-icons/bs";
import Papers, { Paper } from "./Papers";
import Project from "./components/Project";
import penroseLogo from "./assets/penrose.svg";
import theme from "./theme";
import Tabs from "./components/Tabs";
import { DarkModeContext } from "./context/DarkModeContext";
import { Link, useLocation } from "react-router-dom";

export const NewsFeed = () => {
  const today = new Date();
  const newsCutoff = new Date(today);
  newsCutoff.setFullYear(today.getFullYear() - 2);
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
    <div className="relative">
      {isScrolled && (
        <div className="pointer-events-none invisible absolute left-0 right-0 top-0 z-30 h-10 bg-gradient-to-b from-zinc-100 to-transparent md:visible dark:from-zinc-800"></div>
      )}
      <div
        ref={scrollableDivRef}
        className="news-scrollbar max-h-[50vh] overflow-y-auto pr-2"
      >
        {news
          .filter(({ time }) => time >= newsCutoff)
          .map(({ time, msg }, i) => (
            <div
              className="py-3 text-gray-500 md:text-sm dark:text-neutral-300"
              key={`news-${i}`}
            >
              <DatePill date={time} />
              {msg}
            </div>
          ))}
      </div>
      <div className="pointer-events-none invisible absolute bottom-0 left-0 right-0 z-30 h-12 bg-gradient-to-t from-zinc-100 to-transparent md:visible dark:from-zinc-800"></div>
    </div>
  );
};

export const DatePill = ({ date }: { date: Date }) => (
  <div className="w-fit rounded bg-zinc-300/50 px-1 py-px font-medium text-zinc-600 shadow-[0_1px_2px_rgba(24,24,27,0.08),inset_0_1px_0_rgba(255,255,255,0.65)] ring-1 ring-inset ring-zinc-900/5 backdrop-blur-md dark:bg-white/10 dark:text-neutral-200 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] dark:ring-white/10">
    {date.toLocaleString("default", {
      month: "long",
      year: "numeric",
    })}
  </div>
);

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

const PubMeta = ({ pdf, talk, slides, bibtex }: Paper) => (
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
);

const PubAuthors = ({ authors, coauthors, authorDisplayNames, id }: Paper) => (
  <span className="text-base font-light">
    {authors
      .map((a, i) => authorDisplayNames?.get(i) ?? a)
      .map((a) => (coauthors?.includes(a) ? `${a}*` : a))
      .map((a) =>
        a === "Wode Ni" || a === "Wode Ni*" ? <strong>{a}</strong> : a,
      )
      .map((a, i) => (
        <span key={`${id}-author-${i}`}>
          <li className={`inline dark:font-thin`}>{a}</li>
          {i !== authors.length - 1 && <span>, </span>}
        </span>
      ))}
    .{" "}
  </span>
);

const PubVenue = ({ venue, series, type }: Paper) => {
  switch (type) {
    case "thesis":
      return (
        <>
          <span className="text-base font-light">{venue}. </span>
          <span className="text-base font-light italic">{series}.</span>
        </>
      );
    default:
      return <span className="text-base font-light italic">{series}.</span>;
  }
};

const Publications = () => (
  <div className="my-6 space-y-4 border-y border-zinc-400/25 py-4 dark:border-white/10 md:my-8 md:py-5">
    {Papers.map((p: Paper) => (
      <div key={p.id}>
        <a href={p.pdf}>
          <span className="cursor-pointer text-lg font-semibold text-zinc-500 dark:font-normal dark:text-neutral-100">
            {p.title}
          </span>
        </a>
        <br />
        <PubAuthors {...p} />
        <PubVenue {...p} />
        <PubMeta {...p} />
      </div>
    ))}
  </div>
);

export const Hero = ({ className }: { className?: string }) => (
  <div className={className}>
    <div className="flex h-44">
      <div className="w-48 h-48">
        <Balls color={theme.colors.primary} mode={"clump"} />
      </div>
      <Link to="/">
        <Logo className="w-44 mt-8" />
      </Link>
    </div>
  </div>
);

const DarkToggle = () => {
  const { toggleDark } = useContext(DarkModeContext);
  return (
    <Icon onClick={toggleDark}>
      <MdDarkMode className="fill-icon dark:fill-icon-dark" />
    </Icon>
  );
};

export const Socials = ({ className }: { className?: string }) => (
  <div
    className={`${className} flex items-start md:items-top md:ml-auto mb-0 color-primary`}
  >
    <CV />
    <Twitter />
    <GitHub />
    <Email />
    <Office />
    <DarkToggle />
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
    url="mailto:sup@wodenimoni.com"
    icon={<MdEmail className="fill-icon dark:fill-icon-dark grow" />}
  />
);

export const Text = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => (
  <p
    className={`${className} my-3 font-sans text-lg font-extralight leading-relaxed dark:text-neutral-100`}
  >
    {children}
  </p>
);

export const Section = ({
  header,
  children,
}: {
  header: string;
  children?: ReactNode;
}) => {
  const location = useLocation();

  const id = header.toLowerCase();
  // NOTE: SAFARI BUG: without top-0 and left-0, the rect will be shifted down.
  return (
    <div id={id} className="mt-8 md:mt-12">
      <HashLink smooth to={`${location.pathname}#${id}`}>
        <span className="group font-bold text-3xl tracking-tight curosr-pointer relative ">
          <svg
            height={30}
            className="w-full translate-y-1 absolute top-0 left-0"
          >
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
          <span className="ml-[10px] w-full dark:text-neutral-100 pointer-events-auto">
            {header}
          </span>
        </span>
      </HashLink>
      <div className="pt-3 md:pt-4">{children}</div>
    </div>
  );
};
export const Footer = () => (
  <div className="mt-16 flex w-full flex-col items-center justify-center text-sm text-gray-500 dark:text-neutral-400 md:col-span-3 md:mt-12">
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

export default () => {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <>
      <Hero className="md:col-span-2" />
      <div className="flex flex-col">
        <Socials className="mt-8" />
        <Tabs />
      </div>
      <Text className="md:col-span-2 mt-8">
        I'm Nimo. I build ergonomic digital tools to make difficult things feel
        simple.
      </Text>
      <div className="max-w-screen-md md:col-span-2">
        <Section header={"Research"}>
          <Text>I'm currently working in stealth.</Text>
          <Text>
            Previously, I received my{" "}
            <A href={"/assets/nimo-dissertation.pdf"}>Ph.D.</A> from Carnegie
            Mellon University, advised by{" "}
            <A href="http://pact.cs.cmu.edu/koedinger.html">Ken Koedinger</A>{" "}
            and <A href="https://www.cs.cmu.edu/~jssunshi/">Josh Sunshine</A>.
            Most of my research is on building interactive systems for
            diagramming and programming. Here are some selected papers.
          </Text>
          <Publications />
          <Text>
            After the Ph.D., I spent time at{" "}
            <A href="https://brilliant.org/drnimo">Brilliant</A>, where I worked
            on interactive diagramming tooling (
            <A href="https://blog.brilliant.org/hand-crafted-machine-made/">
              diagram generation
            </A>{" "}
            and{" "}
            <A href="https://blog.brilliant.org/when-almost-right-is-catastrophically-wrong-evals-for-ai-learning-games/">
              evaluation
            </A>
            ) and{" "}
            <A href="https://blog.brilliant.org/a-world-class-tutor-in-every-home/">
              Koji
            </A>
            , a tutor that perceives and interacts with said diagrams.
          </Text>
        </Section>
        <Section header={"Tools"}>
          <div className="mb-4 mt-3 grid gap-4 md:gap-6 lg:grid-cols-2 lg:gap-8">
            <Project
              name={
                <span className="schema-wordmark">
                  <span className="font-light text-primary/60 dark:text-primary">
                    [
                  </span>
                  <span className="font-bold text-zinc-500 dark:text-white">
                    schema
                  </span>
                  <span className="font-light text-primary/60 dark:text-primary">
                    ]
                  </span>
                </span>
              }
              desc={
                <>
                  Frontier Models with Our Harness Achieve{" "}
                  <strong className="font-bold text-primary">~99%</strong> on
                  ARC‑AGI‑3 Public
                </>
              }
              link="https://schema-harness.github.io/"
              logo={schemaGames}
              dark={darkMode}
            />
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
            I am an avid pool player. See my <A href="/pool">pool</A> page for
            more.
          </Text>
        </Section>
      </div>
      <div className="md:ml-auto md:max-w-60 md:row-start-3 md:col-start-3">
        <Section header={"News"}>
          <NewsFeed />
        </Section>
      </div>
    </>
  );
};
