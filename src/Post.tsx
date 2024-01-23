import { useContext } from "react";
import DarkModeContext from "./DarkModeContext";
import Page from "./Page";
import { A, Post, Section } from "./common";
import { Socials } from "./contact";

export default ({ post }: { post: Post }) => {
  const { darkMode, toggleDark } = useContext(DarkModeContext);
  return (
    <Page>
      <div className="md:col-span-1 justify-left flex flex-col">
        <Socials className="mt-8" toggleDark={toggleDark} />
        <div
          className={`flex items-end md:items-top md:ml-auto mb-0 color-primary font-light md:text-lg font-mono md:mt-4 gap-2 md:flex-col`}
        >
          <A href="/">
            <span>/Home</span>
          </A>
          <A href="/posts">
            <span>/Posts</span>
          </A>
        </div>
      </div>
      <div className="max-w-screen-md md:col-span-2">
        <Section header={post.attributes.title} />
        <article
          className="prose dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    </Page>
  );
};
