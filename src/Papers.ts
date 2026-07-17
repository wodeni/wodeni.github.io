import bib from "@virtual:plain-text/public/bibliography.bib";

import {
  parseBibFile,
  normalizeFieldValue,
  BibEntry,
  BibFilePresenter,
} from "bibtex";

const bibliography = parseBibFile(bib);

type PaperType = "conference" | "journal" | "workshop" | "preprint" | "thesis";
interface PaperMeta {
  type: PaperType;
  icon?: string;
  pdf?: string;
  talk?: string;
  slides?: string;
  coauthors?: string[];
  // map bibtex strings to unicode strings
  authorDisplayNames?: Map<number, string>;
  seriesDisplayName?: string;
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
  series?: string;
}

const entries: Papers = {
  "ni-thesis-2024": {
    type: "thesis",
    pdf: new URL("/assets/nimo-dissertation.pdf", import.meta.url).href,
    talk: "https://youtu.be/gVZJc7_0T14?si=tyN741CBUqDtCa3r",
  },
  "edgeworth-2024": {
    type: "conference",
    pdf: new URL("/assets/las-24-edgeworth.pdf", import.meta.url).href,
    slides: new URL("/assets/las-24-edgeworth-talk.key", import.meta.url).href,
    // The BibTeX parser treats @ inside a field value as entry syntax.
    seriesDisplayName: "L@S'24",
  },
  "rose-2024": {
    type: "conference",
    pdf: "https://drops.dagstuhl.de/storage/00lipics/lipics-vol313-ecoop2024/LIPIcs.ECOOP.2024.15/LIPIcs.ECOOP.2024.15.pdf",
  },
  "minkowski-2024": {
    type: "conference",
    pdf: new URL("/assets/siggraph-24-minkowski.pdf", import.meta.url).href,
    talk: "https://youtu.be/kNp-eY-kKq0?si=HvHFsq1RaUUQNPpg",
    authorDisplayNames: new Map([[0, "Jiří Minarčík"]]),
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
    case "thesis":
      return "Ph.D. Dissertation";
  }
};

const getSeries = (type: PaperType, entry: BibEntry): string => {
  switch (type) {
    case "workshop":
    case "conference":
    case "journal":
    case "preprint":
      return (normalizeFieldValue(entry.getField("series")) as string).replace(
        /\s/g,
        ""
      );
    case "thesis":
      return normalizeFieldValue(entry.getField("school")) as string;
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
  const series: any = getSeries(meta.type, entry);
  const { seriesDisplayName, ...paperMeta } = meta;
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
      series: seriesDisplayName ?? series,
      venue: getVenue(meta.type, entry),
      id,
      bibtex: unparseEntry(entry),
      ...paperMeta,
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

const preprints: Paper[] = [];

export default [...preprints, ...parseBib(bibliography)];
