import { PointerEvent, ReactNode, useRef } from "react";

export default ({
  name,
  desc,
  link,
  logo,
  dark,
}: {
  dark?: boolean;
  name: ReactNode;
  desc: ReactNode;
  link: string;
  logo?: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    const card = cardRef.current;
    if (
      !card ||
      event.pointerType === "touch" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    card.style.setProperty("--card-rotate-x", `${(-y * 8).toFixed(2)}deg`);
    card.style.setProperty("--card-rotate-y", `${(x * 10).toFixed(2)}deg`);
    card.style.setProperty("--card-gloss-x", `${(x * 8).toFixed(2)}%`);
    card.style.setProperty("--card-gloss-y", `${(y * 6).toFixed(2)}%`);
  };

  const resetTilt = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.removeProperty("--card-rotate-x");
    card.style.removeProperty("--card-rotate-y");
    card.style.removeProperty("--card-gloss-x");
    card.style.removeProperty("--card-gloss-y");
  };

  return (
    <a
      className="project-card-link group block"
      href={link}
      onBlur={resetTilt}
      onPointerLeave={resetTilt}
      onPointerMove={handlePointerMove}
    >
      <div
        ref={cardRef}
        className="project-card relative h-36 w-full overflow-hidden rounded bg-zinc-50 dark:bg-zinc-700 lg:h-48"
      >
        <svg
          className="pointer-events-none absolute inset-0 z-0"
          width="100%"
          viewBox="0 0 100 100"
        >
          <defs>
            <filter id="grayscale-filter">
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <filter id="color-tint-filter">
              <feColorMatrix
                type="matrix"
                values="0.7725 0 0 0 0 0 0.3490 0 0 0 0 0 0.9569 0 0 0 0 0 1 0"
              />
              <feComponentTransfer>
                <feFuncR type="table" tableValues="0 0.7725" />
                <feFuncG type="table" tableValues="0 0.3490" />
                <feFuncB type="table" tableValues="0 0.9569" />
              </feComponentTransfer>
            </filter>
            <linearGradient
              id="gradient-overlay"
              x1="0%"
              y1="50%"
              x2="100%"
              y2="50%"
            >
              <stop
                offset="0%"
                style={{
                  stopColor: dark ? "#3f3f46" : "#fafafa",
                  stopOpacity: 0.98,
                }}
              />
              <stop
                offset="58%"
                style={{
                  stopColor: dark ? "#3f3f46" : "#fafafa",
                  stopOpacity: 0.94,
                }}
              />
              <stop
                offset="82%"
                style={{
                  stopColor: dark ? "#3f3f46" : "#fafafa",
                  stopOpacity: 0.78,
                }}
              />
              <stop
                offset="100%"
                style={{
                  stopColor: dark ? "#3f3f46" : "#fafafa",
                  stopOpacity: 0.55,
                }}
              />
            </linearGradient>
          </defs>

          <image
            href={logo}
            x={50}
            y={-8}
            width={80}
            filter={dark ? "url(#grayscale-filter) " : ""}
          />
          <rect
            width="100"
            height="100"
            style={{ fill: "url(#gradient-overlay)" }}
          />
        </svg>
        <div
          aria-hidden="true"
          className="project-card-gloss pointer-events-none absolute z-10"
        />
        <div className="relative z-20 text-3xl -font-medium w-7/10 px-6 pt-4 lg:py-6 text-primary/70 dark:text-primary">
          {name}
        </div>
        <div className="relative z-20 text-lg font-extralight w-7/10 px-6 py-4 lg:py-6">
          {desc}
        </div>
      </div>
    </a>
  );
};
