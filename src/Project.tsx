export default ({
  name,
  desc,
  link,
  logo,
  dark,
}: {
  dark?: boolean;
  name: string;
  desc: string;
  link: string;
  logo?: string;
}) => {
  return (
    <a href={link}>
      <div
        className="rounded drop-shadow-md hover:drop-shadow-xl w-full h-36 lg:h-48 bg-white dark:shadow-none dark:bg-zinc-700 dark:rounded-lg dark:border-primary bg-contain  bg-left-top dark:drop-shadow-none dark:hover:drop-shadow-none dark:transition-none transition-all ease-in-out duration-100 dark:hover:shadow-md dark:hover:scale-105 overflow-hidden
      "
      >
        <svg
          className="absolute absolute z-[-50]"
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
                style={{ stopColor: dark ? "#333" : "#fff", stopOpacity: 0 }}
              />
              {/* <stop
                offset="50%"
                style={{ stopColor: dark ? "#111" : "#fff", stopOpacity: 0.4 }}
              /> */}
              <stop
                offset="100%"
                style={{ stopColor: dark ? "#333" : "#fff", stopOpacity: 0.9 }}
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
        <div className="text-3xl -font-medium w-7/10 px-6 pt-4 lg:py-6 text-primary/70 dark:text-primary">
          {name}
        </div>
        <div className="text-lg font-extralight w-7/10 px-6 py-4 lg:py-6">
          {desc}
        </div>
      </div>
    </a>
  );
};
