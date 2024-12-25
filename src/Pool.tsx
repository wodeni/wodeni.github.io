import { Text, Hero, NewsFeed, Section, Socials } from "./Academic";
import Tabs from "./components/Tabs";
import { useEffect, useState } from "react";

const Intro = () => (
  <Text className="md:col-span-2 mt-8">
    I'm an avid amateur pool player. This page is the pool side of me.
  </Text>
);

export default () => {
  return (
    <div className="flex flex-col md:col-span-3">
      <Intro />
      <div className="flex flex-col">
        <div>
          <Section header={"Posts"}></Section>
          <Text className="mt-8">Sometimes I write about pool.</Text>
        </div>
      </div>
    </div>
  );
};
