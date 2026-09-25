import React, { Suspense, lazy } from "react";
import HomeLandingContainer from "./HomeLandingContainer";
import PawConfetti from "../Scrapbook/PawConfetti";

const CardBelowHome = lazy(() => import("./CardBelowHome"));
const LearnMore = lazy(() => import("./LearnMore"));
const PlanningToAdoptAPet = lazy(() => import("./PlanningToAdoptAPet"));
const OurDream = lazy(() => import("./OurDream"));
const YouTubeSection = lazy(() => import("./YouTubeSection"));
const TeamSection = lazy(() => import("./TeamSection"));

const heroDescription = "Your donation can make a world of difference. Help us give these dogs the second chance they deserve.";

const marqueeItems = [
  '🐾 woof woof',
  '✨ rescued with love',
  '🐶 85 dogs in the pack',
  '❤️ tails wag here',
  '🏝 kampot, cambodia',
  '🦴 every donation helps',
];

const Home = (props) => {
  return (
    <div className="sb-page">
      <PawConfetti />
      <HomeLandingContainer description={props.description || heroDescription} />
      <Suspense fallback={null}>
        <CardBelowHome />
        <LearnMore />
      </Suspense>

      {/* Marquee divider */}
      <div className="sb-marquee" aria-hidden="true">
        <div className="sb-marquee-track">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((m, i) => (
            <span key={i} className="sb-marquee-item">{m}</span>
          ))}
        </div>
      </div>

      <Suspense fallback={null}>
        <PlanningToAdoptAPet />
        <OurDream />
        <YouTubeSection />
        <TeamSection />
      </Suspense>
    </div>
  );
};

export default Home;
