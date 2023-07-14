import A from "./A";

interface News {
  time: Date;
  msg: JSX.Element | string;
}

const news: News[] = [
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
        I <A href="/assets/thesis-proposal-talk.pdf">proposed</A> my
        dissertation. Officially a PhD candidate now!
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
];

export default news;

// <!-- - **May 2020** I'll join [PROSE](https://microsoft.github.io/prose/) @ Microsoft Research as a Research Intern this summer! -->
// <!-- - **Apr 2020** The first conference paper on [Penrose](https://github.com/penrose/penrose), _"Penrose: From Mathematical Notation to Beautiful Diagrams,"_ was accepted by [SIGGRAPH 2020](https://s2020.siggraph.org/)! -->
// <!-- - **Mar 2020** The CHI paper won a Best Paper Honourable Mention award🏆! -->
// <!-- - **Jan 2020** Our paper _"How Domain Experts Create Conceptual Diagrams and Implications for Tool Design"_ was ~~conditionally~~ accepted by [CHI 2020](http://chi2020.acm.org/)🏖️! -->
// <!-- - **Oct 2019** I presented our papers at [PLATEAU 2019](http://plateau-workshop.org/) with Max and Anael! -->
// <!-- - **May 2019** I finished 7th at the 2019 [ACUI Collegiate Nine-ball National Championship](https://en.wikipedia.org/wiki/ACUI_Collegiate_Pocket_Billiards_National_Championship):8ball:! -->
// <!-- - **May 2019** Anael Kuperwajs, [Courtney Miller](https://www.linkedin.com/in/courtney-e-miller/), [Max Krieger](https://a9.io/) will join us as [REUSE](https://www.cmu.edu/scs/isr/reuse/) students this summer. Welcome! -->
// <!-- - **April 2018** I will join CMU as a Ph.D. student! -->
// <!-- - **January 2018** I will be one of the TAs for COMS 4115 again in Spring 2018. -->
// <!-- - **October 2017** Gave a talk at [DSLDI 2017](https://2017.splashcon.org/event/dsldi-2017-substance-and-style-domain-specific-languages-for-mathematical-diagrams) in Vancouver, Canada. -->
// <!-- - __May 2017__  Joined [REU-SE](http://isri.cmu.edu/education/reu-se/), a summer research program, at Carnegie Mellon University. -->
