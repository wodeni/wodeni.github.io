import Logo from "./Logo";
import edgeworth from "./assets/edgeworth.svg";
import mathdiagrams from "./assets/mathdiagrams.webp";
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
import { useLocation } from "react-router-dom";

export const NewsFeed = () => {
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
              <DatePill date={time} />
              {msg}
            </div>
          ))}
      </div>
      <div className="invisible md:visible absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white dark:from-zinc-800 to-transparent"></div>
    </div>
  );
};

export const DatePill = ({ date }: { date: Date }) => (
  <div className="w-fit bg-gray-100 text-gray-400 rounded py-px px-1 dark:text-neutral-400 dark:bg-zinc-700">
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
        a === "Wode Ni" || a === "Wode Ni*" ? <strong>{a}</strong> : a
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
  <div>
    {Papers.map((p: Paper) => (
      <div key={p.id} className="my-4">
        <a href={p.pdf}>
          <span className="text-lg font-semibold dark:font-normal cursor-pointer">
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

export const BlogPost = ({
  title,
  link,
  date,
}: {
  title: string;
  link: string;
  date: Date;
}) => (
  <div className="my-4">
    <span className="text-sm">
      <DatePill date={date} />
    </span>
    <a href={link}>
      <span className="text-lg font-semibold dark:font-normal cursor-pointer">
        {title}
      </span>
    </a>
  </div>
);

export const Hero = ({ className }: { className?: string }) => (
  <div className={className}>
    <div className="flex h-44">
      <div className="w-48 h-48">
        <Balls color={theme.colors.primary} mode={"clump"} />
      </div>
      <Logo className="w-44 ml-4 mt-8" />
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
    className={`${className} font-sans font-extralight text-lg my-2 dark:text-neutral-100`}
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
    <div id={id} className="mt-4 md:mt-8">
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
      {children}
    </div>
  );
};
export const Footer = () => (
  <div className="md:col-span-3 mt-auto w-full flex flex-col text-sm justify-center items-center text-gray-500 dark:text-neutral-400 mt-12 md:mt-8">
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
          <Text className="">
            I recently received my{" "}
            <A href={"/assets/nimo-dissertation.pdf"}>Ph.D.</A> from Carnegie
            Mellon University, School of Computer Science, advised by{" "}
            <A href="http://pact.cs.cmu.edu/koedinger.html">Ken Koedinger</A>{" "}
            and <A href="https://www.cs.cmu.edu/~jssunshi/">Josh Sunshine</A>.
            Most of my research is on building interactive systems for
            diagramming and programming. Here are some selected papers. Refer to
            the <A href="http://wodenimoni.com/nimo-markdown-cv/">CV</A> for
            more.
          </Text>
          <Publications />
        </Section>
        <Section header={"Work"}>
          <Text>
            Continuing the thread of building diagramming systems, I'm working
            on interactive diagramming at{" "}
            <A href="https://brilliant.org/drnimo">Brilliant</A>, an education
            tech company known for learning by doing in STEM and YouTube
            sponsorships. Here are some latest projects:
            <BlogPost
              title="When Almost Right is Catastrophically Wrong: Evaluating AI-Generated Learning Games"
              link="https://blog.brilliant.org/when-almost-right-is-catastrophically-wrong-evals-for-ai-learning-games/"
              date={new Date("2025-02-27")}
            />
            <BlogPost
              title="Hand-Crafted, Machine-Made: A Case Study of the Brilliant Math Editor"
              link="https://blog.brilliant.org/hand-crafted-machine-made/"
              date={new Date("2025-01-30")}
            />
          </Text>
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
      <div className="md:ml-auto md:max-w-60 md:row-start-3 md:col-start-3">
        <Section header={"News"}>
          <NewsFeed />
        </Section>
      </div>
    </>
  );
};
