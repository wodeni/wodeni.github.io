import bib from "@virtual:plain-text/public/bibliography.bib";

import {
  parseBibFile,
  normalizeFieldValue,
  BibEntry,
  BibFilePresenter,
} from "bibtex";

const bibliography = parseBibFile(bib);

type PaperType = "conference" | "journal" | "workshop" | "preprint";
interface PaperMeta {
  type: PaperType;
  icon?: string;
  pdf?: string;
  talk?: string;
  slides?: string;
  coauthors?: string[];
  // map bibtex strings to unicode strings
  authorDisplayNames?: Map<number, string>;
  bibtex?: string;
}
interface Papers {
  [id: string]: PaperMeta;
}
export interface Paper extends PaperMeta {
  title: string;
  authors: string[];
  venue: string;
  id: string;
  series: string;
}

const entries: Papers = {
  "edgeworth-2024": {
    type: "conference",
    pdf: new URL("/assets/las-24-edgeworth.pdf", import.meta.url).href,
    slides: new URL("/assets/las-24-edgeworth-talk.key", import.meta.url).href,
  },
  "minkowski-2024": {
    type: "conference",
    pdf: new URL("/assets/siggraph-24-minkowski.pdf", import.meta.url).href,
    authorDisplayNames: new Map([[0, "Jiří Minarčík"]]),
  },
  "stsearch-2024": {
    type: "conference",
    pdf: "https://dl.acm.org/doi/pdf/10.1145/3656460",
  },
  "recode-ni-2021": {
    type: "conference",
    pdf: new URL("/assets/uist-21-recode.pdf", import.meta.url).href,
    talk: "https://youtu.be/_GQ8E7EMMws",
  },
  "penrose-2020": {
    type: "journal",
    pdf: "https://penrose.cs.cmu.edu/media/Penrose_SIGGRAPH2020a.pdf",
    talk: "https://youtu.be/OyD4LIv2PDc",
  },
  "diagramming-2020": {
    type: "conference",
    pdf: new URL("/assets/chi-20-natural-diagramming.pdf", import.meta.url)
      .href,
    talk: "https://youtu.be/O60RuV2gBMk",
    coauthors: ["Wode Ni", "Dor Ma'ayan"],
  },

  // "penrosellm-2023": {
  //   type: "workshop",
  //   pdf: new URL("/assets/splash-23-llm-diagrams.pdf", import.meta.url).href,
  // },
  // "narrative-2019": {
  //   type: "workshop",
  //   pdf: "https://2019.plateau-workshop.org/assets/papers-2019/9.pdf",
  //   slides: "/assets/plateau-19-presentation.pdf",
  // },
  // "tutorial-2019": {
  //   type: "workshop",
  //   pdf: "https://drops.dagstuhl.de/opus/volltexte/2020/11958/pdf/OASIcs-PLATEAU-2019-4.pdf",
  //   slides: "/assets/plateau-19-presentation.pdf",
  // },
  // "substy-2017": {
  //   type: "workshop",
  //   pdf: new URL("/assets/dsldi.pdf", import.meta.url).href,
  //   slides: new URL("/assets/dsldi-presentation.pdf", import.meta.url).href,
  // },
};

const getVenue = (type: PaperType, entry: BibEntry): string => {
  switch (type) {
    case "workshop":
    case "conference":
      return normalizeFieldValue(entry.getField("booktitle")!) as string;
    case "journal":
      return normalizeFieldValue(entry.getField("journal")!) as string;
    case "preprint":
      throw new Error("cannot get venue for preprint");
  }
};

const unparseEntry = (entry: BibEntry): string => `
@${entry.type} {
${Object.entries(entry.fields)
  .map(([k, v]) => `\t${k} = {${entry.getFieldAsString(k)}}`)
  .join(",\n")}
}
`;

const parseEntry = (id: string, entry: BibEntry, meta: PaperMeta): Paper => {
  const author: any = entry.getField("author");
  const title: any = entry.getField("title");
  const series: any = entry.getField("series");
  if (author && title && series) {
    return {
      title: normalizeFieldValue(title) as string,
      authors: author.authors$.map((author: any): string[] =>
        author.firstNames
          .concat(author.vons)
          .concat(author.lastNames)
          .concat(author.jrs)
          .join(" ")
      ),
      series: (normalizeFieldValue(series) as string).replace(/\s/g, ""),
      venue: getVenue(meta.type, entry),
      id,
      bibtex: unparseEntry(entry),
      ...meta,
    };
  } else {
    throw new Error(`cannot read field from entry ${entry._id}`);
  }
};

const parseBib = (bib: BibFilePresenter): Paper[] =>
  Object.entries(entries).map(([id, meta]) => {
    const entry = bib.getEntry(id);
    if (entry) {
      return parseEntry(id, entry, meta);
    } else {
      throw new Error(`cannot find bib entry ${id}`);
    }
  });

const preprints: Paper[] = [
  {
    title: "Codifying Visual Representations",
    authors: [
      "Wode Ni",
      "Sam Estep",
      "Hwei-Shin Harriman",
      "Jiří Minarčík",
      "Joshua Sunshine",
    ],
    venue: "DIAGRAMS 2024",
    id: "diagrams-24",
    series: "DIAGRAMS'24",
    type: "preprint",
    pdf: new URL("/assets/diagrams-24-penrose.pdf", import.meta.url).href,
    coauthors: ["Wode Ni", "Sam Estep", "Hwei-Shin Harriman"],
  },
  {
    id: "rose-24",
    title: "Rose: Efficient and Extensible Autodiff on the Web",
    authors: ["Sam Estep", "Wode Ni", "Raven Rothkopf", "Joshua Sunshine"],
    venue: "ECOOP 2024",
    series: "ECOOP'24",
    type: "preprint",
    pdf: "https://arxiv.org/pdf/2402.17743.pdf",
  },
];

export default [...preprints, ...parseBib(bibliography)];
