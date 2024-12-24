import A from "./A";

interface News {
  time: Date;
  msg: JSX.Element | string;
}

const news: News[] = [
  {
    time: new Date("2024-09-27"),
    msg: (
      <>
        I guess I'm Dr.Nimo now. Watch my{" "}
        <A href="https://youtu.be/gVZJc7_0T14?si=tyN741CBUqDtCa3r">
          thesis defense talk
        </A>
        .
      </>
    ),
  },
  {
    time: new Date("2024-09-26"),
    msg: (
      <>
        Finished the{" "}
        <A
          href={new URL("/assets/nimo-dissertation.pdf", import.meta.url).href}
        >
          dissertation
        </A>{" "}
        document and will{" "}
        <A
          href={
            new URL("/assets/nimo-defense-poster.pdf", import.meta.url).href
          }
        >
          defend
        </A>{" "}
        in a few weeks!
      </>
    ),
  },
  {
    time: new Date("2024-07-19"),
    msg: (
      <>
        The{" "}
        <A href={new URL("/assets/las-24-edgeworth.pdf", import.meta.url).href}>
          Edgeworth paper
        </A>{" "}
        was nominated for the Best Paper Award at L@S'24!
      </>
    ),
  },
  {
    time: new Date("2024-07-18"),
    msg: (
      <>
        Attending <A href="">L@S'24</A> for the first time in Atlanta. Check out
        the{" "}
        <A
          href={
            new URL("/assets/las-24-edgeworth-talk.key", import.meta.url).href
          }
        >
          slides{" "}
        </A>
        of my talk!
      </>
    ),
  },
  {
    time: new Date("2024-06-24"),
    msg: (
      <>
        Always meant to submit something to{" "}
        <A href="https://diagrams-2024.diagrams-conference.org/">
          a conference with DIAGRAM in its name
        </A>
        . Well, done{" "}
        <A
          href={
            new URL("/assets/diagrams-24-penrose.pdf", import.meta.url).href
          }
        >
          that
        </A>
        .
      </>
    ),
  },
  {
    time: new Date("2024-06-24"),
    msg: (
      <>
        The <A href="https://rosejs.dev/">Rose</A> paper was accepted at ECOOP
        2024!
      </>
    ),
  },
  {
    time: new Date("2024-05-10"),
    msg: (
      <>
        Excited to welcome summer interns{" "}
        <A href="https://github.com/kyleleesea">Kyle</A> and{" "}
        <A href="https://griffinteller.com/">Griffin</A> to the Penrose team!
      </>
    ),
  },
  {
    time: new Date("2024-04-10"),
    msg: (
      <>
        <i>
          "Edgeworth: Efficient and Scalable Authoring of Visual Thinking
          Activities"
        </i>{" "}
        was accepted at Learning @ Scale 2024!
      </>
    ),
  },
  {
    time: new Date("2024-04-10"),
    msg: (
      <>
        <i>
          "Minkowski Penalties: Robust Differentiable Constraint Enforcement for
          Vector Graphics"
        </i>{" "}
        was accepted at SIGGRAPH 2024!
      </>
    ),
  },
  {
    time: new Date("2024-02-28"),
    msg: (
      <>
        Paper accepted at PLDI 2024:{" "}
        <i>Syntactic Code Search with Sequence-to-Tree Matching</i>!
      </>
    ),
  },
  {
    time: new Date("2024-01-02"),
    msg: "New year, new round of rewriting this site. Used Tailwind this time and we have dark mode now!",
  },
  {
    time: new Date("2023-12-08"),
    msg: (
      <>
        Invited to attend an{" "}
        <A href="https://aimath.org/pastworkshops/cyberinfrastructure.html">
          AIM workshop
        </A>{" "}
        on{" "}
        <A href="https://code4math.org/">Digital Ecosystems for Mathematics</A>{" "}
        and started <A href="https://mathdiagrams.com">mathdiagrams.com</A>!
      </>
    ),
  },
  {
    time: new Date("2023-07-14"),
    msg: (
      <>
        Released <A href="https://penrose.cs.cmu.edu/blog/v3">Penrose 3.0</A>!
      </>
    ),
  },
  {
    time: new Date("2023-06-01"),
    msg: (
      <>
        <A href="https://www.cmu.edu/scs/s3d/reuse/">REUSE</A> students{" "}
        <A href="https://www.linkedin.com/in/rijul-jain-585a62191">
          Rijul Jain
        </A>{" "}
        and <A href="https://ravenrothkopf.github.io/">Raven Rothkopf</A> joined
        Penrose this summer. Welcome!
      </>
    ),
  },
  {
    time: new Date("2022-08-30"),
    msg: "Spent the summer as an intern in Machine Intelligence at Apple. Stay tuned for more updates on our work!",
  },
  {
    time: new Date("2022-04-30"),
    msg: (
      <>
        I proposed (
        <A
          href={
            new URL("/assets/thesis-proposal-talk.pdf", import.meta.url).href
          }
        >
          talk
        </A>
        , (
        <A href={new URL("/assets/thesis-proposal.pdf", import.meta.url).href}>
          text
        </A>
        )) my dissertation. Officially a PhD candidate now!
      </>
    ),
  },
  {
    time: new Date("2021-07-01"),
    msg: (
      <>
        My work at Microsoft,{" "}
        <i>
          "reCode: A Lightweight Find-and-Replace Interaction in the IDE for
          Transforming Code by Example,"
        </i>{" "}
        was conditionally accepted by{" "}
        <A href="https://uist.acm.org/uist2021/">UIST 2021</A>!
      </>
    ),
  },
  {
    time: new Date("2020-05-01"),
    msg: (
      <>
        I'll join <A href="https://microsoft.github.io/prose/">PROSE</A> @
        Microsoft Research as a Research Intern this summer!
      </>
    ),
  },
  {
    time: new Date("2020-04-01"),
    msg: (
      <>
        The first conference paper on{" "}
        <A href="https://penrose.cs.cm">Penrose</A>,{" "}
        <i>"Penrose: From Mathematical Notation to Beautiful Diagrams,"</i> was
        accepted by <A href="https://s2020.siggraph.org/">SIGGRAPH 2020</A>!
      </>
    ),
  },
  {
    time: new Date("2020-03-01"),
    msg: (
      <>
        The CHI paper won a <b>Best Paper Honourable Mention award</b> 🏆!
      </>
    ),
  },
  {
    time: new Date("2020-01-01"),
    msg: (
      <>
        Our paper{" "}
        <i>
          "How Domain Experts Create Conceptual Diagrams and Implications for
          Tool Design"
        </i>{" "}
        was accepted by <A href="http://chi2020.acm.org/">CHI 2020</A> 🏖️!
      </>
    ),
  },
  {
    time: new Date("2019-10-01"),
    msg: (
      <>
        I presented our papers at{" "}
        <A href="http://plateau-workshop.org/">PLATEAU 2019</A> with Max and
        Anael!
      </>
    ),
  },
  {
    time: new Date("2019-05-01"),
    msg: (
      <>
        I finished 7th at the 2019{" "}
        <A href="https://en.wikipedia.org/wiki/ACUI_Collegiate_Pocket_Billiards_National_Championship">
          ACUI Collegiate Nine-ball National Championship
        </A>{" "}
        🎱!
      </>
    ),
  },
  {
    time: new Date("2019-05-01"),
    msg: (
      <>
        Anael Kuperwajs,{" "}
        <A href="https://www.linkedin.com/in/courtney-e-miller/">
          Courtney Miller
        </A>
        , <A href="https://a9.io/">Max Krieger</A> will join us as{" "}
        <A href="https://www.cmu.edu/scs/isr/reuse/">REUSE</A> students this
        summer. Welcome!
      </>
    ),
  },
  {
    time: new Date("2018-04-01"),
    msg: <>I will join CMU as a Ph.D. student!</>,
  },
  {
    time: new Date("2018-01-01"),
    msg: <>I will be one of the TAs for COMS 4115 again in Spring 2018.</>,
  },
  {
    time: new Date("2017-10-01"),
    msg: (
      <>
        Gave a talk at{" "}
        <A href="https://2017.splashcon.org/event/dsldi-2017-substance-and-style-domain-specific-languages-for-mathematical-diagrams">
          DSLDI 2017
        </A>{" "}
        in Vancouver, Canada.
      </>
    ),
  },
  {
    time: new Date("2017-05-01"),
    msg: (
      <>
        Joined <A href="http://isri.cmu.edu/education/reu-se/">REU-SE</A>, a
        summer research program, at Carnegie Mellon University.
      </>
    ),
  },
];

export default news;
