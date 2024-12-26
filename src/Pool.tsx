import { Text, NewsFeed, Section, Socials } from "./Academic";
import Tabs from "./components/Tabs";
import { useEffect, useState } from "react";
import theme from "./theme";
import Balls from "./components/Balls";
import Logo from "./Logo";

export const Hero = ({ className }: { className?: string }) => (
  <div className={className}>
    <div className="flex h-44">
      <div className="w-48 h-48">
        <Balls color={theme.colors.primary} mode={"pool"} />
      </div>
      <Logo className="w-44 ml-4 mt-8" />
    </div>
  </div>
);

const Intro = () => (
  <Text className="md:col-span-2 mt-8">
    I'm an avid amateur pool player. This page is the pool side of me.
  </Text>
);

export default () => {
  return (
    <>
      <Hero className="md:col-span-2" />
      <div className="flex flex-col">
        <Socials className="mt-8" />
        <Tabs />
      </div>
      <div className="flex flex-col md:col-span-3">
        <Intro />
        <div className="flex flex-col">
          <div>
            <Section header={"Posts"}></Section>
            <Text className="mt-8">Sometimes I write about pool.</Text>
          </div>
        </div>
      </div>
    </>
  );
};
