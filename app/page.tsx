import Image from "next/image";
import Header from "./layout/Header"; // Assuming this is your navigation header
import {
  ArrowRight,
  ArrowUpToLine,
  ChevronRight,
  Sun,
  Sunset,
  Upload,
} from "lucide-react";
import CarouselCard from "./components/landing/carouselCard";
import SocialStoriesSection from "./components/landing/SocailStories";
import SkillTrainingCardsSection from "./components/landing/TraningCard";
import ExploreActivitiesSection from "./components/landing/ExploreActivities";
import PricingPlansSection from "./components/landing/Pricing";
import SignUpFormComponent from "./components/landing/Signup";
import AuthForm from "./components/landing/Signup";
import Footer from "./layout/Footer";
import TailoredNeedsSection from "./components/landing/Tailored";
import HeroSection from "./components/landing/HeroSection";
import PromptSection from "./components/landing/PromptSection";
import DemoSection from "./components/landing/DemoSection";
export default function Home() {
  return (
    <main className="flex flex-col   bg-white  relative overflow-hidden  md:px-0 mx-2 md:mx-0">
      {/* Header/Navigation */}
      <Header />

      {/* Hero Section */}

      <HeroSection />

      {/* Prompt Section */}
      <PromptSection />
      {/* Features Section */}

      <CarouselCard />

      <DemoSection />

      {/* Section Wise Components  */}
      <SocialStoriesSection />
      <div className=" bg-[#F3F7FB] mx-10">
        <TailoredNeedsSection />
      </div>

      <ExploreActivitiesSection />

      <SkillTrainingCardsSection />
      <PricingPlansSection />
      <AuthForm />
      <Footer />
    </main>
  );
}
