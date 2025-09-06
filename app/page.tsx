import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CTA from "@/components/CTA";

// Animation styles
// import "landing-page.css";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium bg-background">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2"></span>
            AI-Powered Learning Platform
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Learn with <span className="text-primary">AI Companions</span> tailored to your needs
          </h1>
          <p className="text-lg text-muted-foreground max-w-[600px]">
            Converso is a sophisticated AI-powered learning platform that enables users to interact with specialized AI companions across various academic subjects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" className="rounded-full">
              <Link href="/dashboard">Explore Companions</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full">
              <Link href="/companions/new">Create Your Own</Link>
            </Button>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="relative w-[350px] h-[350px] md:w-[450px] md:h-[450px]">
            <Image 
              src="/images/cta.svg" 
              alt="AI Learning Companions" 
              fill 
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full bg-secondary/50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
            <p className="text-muted-foreground max-w-[600px] mx-auto">Discover how Converso transforms your learning experience</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon="/icons/science.svg"
              title="Customizable AI Companions"
              description="Create personalized AI companions tailored to your learning needs and preferences."
            />
            <FeatureCard 
              icon="/icons/maths.svg"
              title="Subject-specific Learning"
              description="Access specialized companions across various academic subjects for targeted learning."
            />
            <FeatureCard 
              icon="/icons/mic-on.svg"
              title="Interactive Conversations"
              description="Engage in natural, voice-based conversations that make learning intuitive and fun."
            />
            <FeatureCard 
              icon="/icons/bookmark.svg"
              title="Bookmark System"
              description="Save your favorite companions and learning sessions for quick access later."
            />
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="w-full max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Your Learning Dashboard</h2>
          <p className="text-muted-foreground max-w-[600px] mx-auto">Track your progress and access your companions from one central location</p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl border border-border">
          <Image 
            src="/readme/hero.png" 
            alt="Converso Dashboard" 
            width={1200} 
            height={675} 
            className="w-full h-auto"
          />
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="w-full bg-secondary/50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Built with Modern Technology</h2>
            <p className="text-muted-foreground max-w-[600px] mx-auto">Leveraging cutting-edge tools for the best learning experience</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            <TechItem name="Next.js" />
            <TechItem name="TypeScript" />
            <TechItem name="VAPI" />
            <TechItem name="Tailwind CSS" />
            <TechItem name="Supabase" />
            <TechItem name="Clerk Auth" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="w-full max-w-7xl mx-auto px-4 py-16 md:py-24 flex flex-col items-center text-center">
        <CTA />
      </section> */}

      {/* Statistics Section */}
      <section className="w-full bg-primary/5 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Growing Community</h2>
            <p className="text-muted-foreground max-w-[600px] mx-auto">Join thousands of learners already benefiting from Converso</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard number="10,000+" label="AI Companions Created" icon="/icons/plus.svg" />
            <StatCard number="25,000+" label="Registered Users" icon="/icons/cap.svg" />
            <StatCard number="100,000+" label="Learning Sessions" icon="/icons/clock.svg" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

import { FeatureCard } from "@/components/FeatureCard";
import { Footer } from "@/components/Footer";

const TechItem = ({ name }: { name: string }) => {
  return (
    <div className="bg-background rounded-lg p-4 shadow-sm border border-border flex flex-col items-center justify-center h-24 hover-tech transition-all duration-300">
      <span className="font-medium">{name}</span>
    </div>
  );
};

const StatCard = ({ number, label, icon }: { number: string; label: string; icon: string }) => {
  return (
    <div className="bg-background rounded-lg p-8 shadow-sm border border-border flex flex-col items-center text-center hover-stat transition-all duration-300">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 stat-icon-container">
        <Image src={icon} alt={label} width={32} height={32} className="stat-icon" />
      </div>
      <h3 className="text-4xl font-bold mb-2 stat-number">{number}</h3>
      <p className="text-muted-foreground">{label}</p>
    </div>
  );
};

export default LandingPage
