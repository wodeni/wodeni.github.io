import { useContext, useEffect, useState } from "react";
import Page from "./Page";
import { A, DarkToggle, InternalLink, Post, Section, Text } from "./common";
import DarkModeContext from "./DarkModeContext";
import { Socials } from "./contact";

const postModules = import.meta.glob("./posts/*.md");

export default () => {
  const { darkMode, toggleDark } = useContext(DarkModeContext);

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function loadPosts() {
      const posts = Object.entries(postModules).map(
        async ([path, resolver]) => {
          const { attributes, html } = (await resolver()) as {
            attributes: any;
            html: string;
          };
          return { path, attributes, html } as Post;
        }
      );
      return Promise.all(posts);
    }
    loadPosts().then((posts) => {
      setPosts(posts);
    });
  }, []);

  return (
    <Page>
      <div className="md:col-span-1 justify-left flex flex-col">
        <Socials className="mt-8" toggleDark={toggleDark} />
        <div
          className={`flex items-end md:items-top md:ml-auto mb-0 color-primary font-light md:text-lg font-mono md:mt-4 gap-2 md:flex-col`}
        >
          <InternalLink to="/">
            <span>/Home</span>
          </InternalLink>
        </div>
      </div>
      <div className="max-w-screen-md md:col-span-2">
        <Text className="md:col-span-2 mt-8">
          Writing is tough, but I try to do a bit more every day.
        </Text>
        <Section header={"Posts"}>
          {posts.map((post, index) => (
            // TODO: check link
            <p key={index} className="my-4 text-xl">
              <span className="text-gray-500 dark:text-neutral-400 font-mono text-lg mr-4">
                {post.attributes.date}
              </span>
              <InternalLink
                className="font-bold"
                to={`/posts/${post.path.split("/").pop()!.replace(".md", "")}`}
              >
                {post.attributes.title}
              </InternalLink>
            </p>
          ))}
        </Section>
      </div>
    </Page>
  );
};
