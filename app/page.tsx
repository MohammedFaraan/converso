import CompanionCard from "@/components/CompanionCard";
import CompanionList from "@/components/CompanionList";
import CTA from "@/components/CTA";
import { recentSessions } from "@/constants";
import React from "react";

const Page = () => {
  return (
    <main className="main">
      <h1>Popular Companions</h1>
      <section className="home-section">
        <CompanionCard
          id="123"
          title="Neura the Brainy Explorer"
          topic="Neural Network of the Brain"
          subject="Science"
          duration={45}
          color="#E5D0FF"
        />
        <CompanionCard
          id="653"
          title="Neura the Brainy Explorer"
          topic="Neural Network of the Brain"
          subject="Maths"
          duration={45}
          color="#FFDA6E"
        />
        <CompanionCard
          id="245"
          title="Neura the Brainy Explorer"
          topic="Neural Network of the Brain"
          subject="Language"
          duration={45}
          color="#BDE7FF"
        />
      </section>

      <section className="home-section">
        <CompanionList 
        title="Recent Companions"
        companions={recentSessions}
        classNames="w-2/3 max-lg:w-full"
        />
        <CTA />
      </section>
    </main>
  );
};

export default Page;
