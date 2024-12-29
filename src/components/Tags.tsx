const Tags = ({ tags, className }: { className?: string; tags: string[] }) => (
  <div className="flex flex-wrap gap-2">
    {tags.map((tag: string) => (
      <span
        key={tag}
        className={`${
          className ?? ""
        } text-s bg-primary bg-opacity-70 text-neutral-100 px-1.5 py-.5 rounded`}
      >
        #{tag}
      </span>
    ))}
  </div>
);
export default Tags;
