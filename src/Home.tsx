import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import { BiSlideshow } from "react-icons/bi";
import { BsBookmarkCheck } from "react-icons/bs";
import { FaRegFilePdf, FaRegPlayCircle } from "react-icons/fa";
import DarkModeContext from "./DarkModeContext";
import news from "./News";
import Page from "./Page";
import Papers, { Paper } from "./Papers";
import Project from "./Project";
import edgeworth from "./assets/edgeworth.svg";
import mathdiagrams from "./assets/mathdiagrams.webp";
import penroseLogo from "./assets/penrose.svg";
import { A, Section, Text } from "./common";
import { Socials } from "./contact";

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
                  <li className={`inline`}>{a}</li>
                  {i !== authors.length - 1 && <span>, </span>}
                </span>
              ))}
          </span>
          .{/* <br /> */}{" "}
          <span className="text-base font-light italic">
            {/* {venue} ({series}) */}
            {series}
          </span>
          {"."}
          <div className="flex gap-2">
            <div className="flex items-center gap-0.5">
              <BsBookmarkCheck />
              <Copy data={bibtex}>bib</Copy>
            </div>
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

const Links = () => {
  return (
    <div
      className={`flex items-end md:items-top md:ml-auto mb-0 color-primary font-light md:text-lg font-mono md:mt-4 gap-2 md:flex-col`}
    >
      <A href={`${import.meta.env.BASE_URL}/posts`}>
        <span>/Posts</span>
      </A>
      {/* <A href="/pool">
        <span>/Pool</span>
      </A> */}
    </div>
  );
};

const Home: React.FC = () => {
  const { darkMode, toggleDark } = useContext(DarkModeContext);

  return (
    <Page>
      <div className="md:col-span-1 justify-left flex flex-col">
        <Socials className="mt-8" toggleDark={toggleDark} />
        <Links />
      </div>
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
    </Page>
  );
};

export default Home;
