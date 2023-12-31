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
        className="rounded drop-shadow-md hover:drop-shadow-xl w-full h-36 lg:h-48 bg-white dark:shadow-none dark:bg-zinc-700 dark:rounded-lg dark:border-primary bg-contain  bg-left-top dark:drop-shadow-none dark:hover:drop-shadow-none dark:transition-none transition-all ease-in-out duration-100 bg-[length:120%] bg-no-repeat dark:hover:shadow-md dark:hover:scale-105"
        style={{
          backgroundImage: dark
            ? `
            linear-gradient(to right, rgba(35, 35, 35, 1), 84%, rgba(255, 255, 255, 0)),
            url(${logo})`
            : `
            linear-gradient(to right, rgba(255, 255, 255, 1), 84%, rgba(255, 255, 255, 0)),
            url(${logo})`,
        }}
      >
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
