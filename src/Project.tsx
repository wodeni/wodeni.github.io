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
        className="rounded drop-shadow-md hover:drop-shadow-xl w-full h-36 lg:h-48 bg-right bg-white dark:shadow-none dark:bg-zinc-700 dark:rounded-lg dark:border-primary"
        style={{
          backgroundImage: dark
            ? ``
            : `
            linear-gradient(to right, rgba(255, 255, 255, 1), 80%, rgba(255, 255, 255, 0)),
            url(${logo})`,
          backgroundPosition: "left",
          backgroundSize: "250% 200%",
          backgroundPositionX: "20%",
        }}
      >
        <div className="text-3xl font-medium w-7/10 px-6 pt-4 lg:py-6 text-primary/70 dark:text-primary">
          {name}
        </div>
        <div className="text-lg font-extralight w-7/10 px-6 py-4 lg:py-6">
          {desc}
        </div>
      </div>
    </a>
  );
};
