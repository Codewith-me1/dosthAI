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
import CarouselCard from "./pages/landing/carouselCard";
import SocialStoriesSection from "./pages/landing/SocailStories";
import SkillTrainingCardsSection from "./pages/landing/TraningCard";
import ExploreActivitiesSection from "./pages/landing/ExploreActivities";
import PricingPlansSection from "./pages/landing/Pricing";
import SignUpFormComponent from "./pages/landing/Signup";
import AuthForm from "./pages/landing/Signup";
import Footer from "./layout/Footer";
import TailoredNeedsSection from "./pages/landing/Tailored";
export default function Home() {
  return (
    <main className="flex flex-col   bg-[#F8F6FF]  relative overflow-hidden  md:px-0 mx-2 md:mx-0">
      {/* Header/Navigation */}
      <Header />

      {/* Hero Section */}

      <div className="w-full overflow-hidden flex flex-col  md:flex-row items-center justify-between z-10 pt-12 md:pt-16 md:pl-20  mx-auto">
        {/* Left Section */}

        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            <span className="text-[#6100FF]">Personalized AI - Powered</span>
            <br />
            Learning Tool for <br />
            Neurodivergent Individuals
          </h1>

          <div className="flex space-x-4">
            <button className="px-5 py-2 rounded-md bg-white border border-[#6100FF] text-[#6100FF] hover:bg-purple-100 transition">
              Book a Demo
            </button>
            <button className="px-5 py-2 rounded-md bg-[#6100FF] text-white  transition">
              Sign Up
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className=" relative">
          <div
            className="absolute overflow-hidden  left-[80%] w-[200vmin] h-[200vmin] 
             bg-[url('/hero-bg.png')] 
             bg-cover bg-center bg-no-repeat 
             opacity-90 -translate-x-1/2 -translate-y-1/2 rounded-full z-[-1]"
          ></div>
          <div className="relative w-100 h-120   -rotate-z-12  md:w-[30rem] md:h-[40rem]">
            <Image
              src="/heroimage.png"
              alt="Cool Cat with Tablet"
              layout="fill"
              objectFit="cover"
              className="rounded-lg  mt-15"
            />
          </div>

          {/* Floating Card */}
          <div className="absolute bottom-20 md:-left-0 xl:-left-20 w-72 bg-yellow-100 rounded-2xl p-4 shadow-md rotate-[-6deg]">
            <div className="absolute top-[-50px] left-8  rounded-full flex items-center justify-center text-white font-bold text-lg">
              <Image
                src="/kidswithbox.jpg"
                alt="Kids with packages"
                width={100}
                height={60}
                className="rounded-xl flex-shrink-0"
              />
            </div>
            <div className="flex pt-10 items-start space-x-3">
              <div>
                {/* Title */}
                <p className="text-sm font-semibold text-purple-600 leading-snug">
                  Learn how to pack stuff?
                </p>
                {/* Description */}
                <p className="text-sm text-gray-700 mt-1">
                  Lorum ipsum dolar ismet nej <br />
                  ismt. Ipsum dolar
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="w-full justify-between z-10 pt-12 md:pt-16 md:px-20 lg:px-20 xl:px-30  mx-auto mt-32 md:mt-48 flex flex-col md:flex-row items-center gap-12 md:gap-8 px-2">
        {" "}
        <div className="flex-1 flex max-w-3xl space-y-2 flex-col items-start tracking-wide justify-center text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl leading-10 md:leading-12  mb-3">
            <span className="text-[#6100FF] font-bold">Create</span> engaging,
            customized social stories , task visuals, & therapy cards with a{" "}
            <span className="italic font-semibold text-black">
              simple prompt
            </span>
          </h2>
          <p className="text-gray-600 mb-6 tracking-wide leading-8 text-sm sm:text-base max-w-lg mx-auto md:mx-0">
            An AI-Assistant that empowers parents, behavioral analysts
            supporting neurodivergent community, built on AI-models trained
            using Applied Behavioral Analysis (ABA) Methodology
          </p>
          <button className="flex items-center gap-2 px-10 py-2.5 rounded-md border-3 border-[#6100FF] text-[#6100FF] font-semibold bg-white hover:bg-[#f3f0ff] transition mb-2 mx-auto md:mx-0">
            Create Now <span className="text-lg font-bold">+</span>
          </button>
        </div>
        {/* Prompt Card with Floating Prompt */}
        <div className=" flex flex-col items-center mt-5 md:mt-0   sm:max-w-sm">
          <div className="relative w-full   ">
            <Image
              src="/kidswithbox.jpg"
              alt="Prompt Card showing astronaut kids"
              width={380}
              height={220}
              className="rounded-2xl shadow-xl  -rotate-z-20 w-80 md:w-full object-cover"
            />
            {/* Floating Prompt */}
            <div className="absolute -bottom-0 md:left-1/3 md:-translate-x-1/2 w-[90%] md:w-[120%] bg-[#F3F8FF] rounded-xl shadow-lg flex items-center px-2 md:px-5 md:py-2.5 sm:px-4 sm:py-3 gap-2 border border-[#E0E0E0]">
              <span className="flex-1 text-xs sm:text-sm text-[#6100FF]  leading-tight">
                Create a story for 3 year old, about how to pack stuff?
              </span>
              <span className="bg-[#6100FF] text-[#FFF4CC] rounded-full  m-3 p-1 sm:w-7 sm:h-7 flex items-center justify-center font-bold text-lg">
                <ArrowUpToLine className="w-8 h-8 md:w-10 md:h-10" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}

      <CarouselCard />

      <section className="w-full  mx-auto mt-24 mb-16 md:pt-16 md:px-20 lg:px-20 xl:px-30  px-2">
        <div className=" rounded-2xl  p-8 flex flex-col md:flex-row items-center justify-between gap-6 ">
          {" "}
          <div className="flex-1 flex flex-col md:items-start text-center md:text-left">
            <h3 className="text-4xl  md:text-5xl font-bold text-[#3A3A3A] mb-2">
              Request a <span className="text-[#6100FF]">Demo!</span>
            </h3>
            <p className="text-gray-600 text-lg mb-4 max-w-md">
              Get a detailed walk-thru of the features and possibilities for
              BCBA!
            </p>{" "}
          </div>
          <div className="flex items-center justify-center md:mt-4 ">
            <button className="px-20 md:px-60 py-3 rounded-lg bg-[#6100FF] text-white font-semibold shadow hover:bg-[#6100FF] transition mx-auto md:mx-0">
              Request
            </button>
          </div>
        </div>
      </section>

      {/* Section Wise Components  */}
      <SocialStoriesSection />
      <div className=" bg-[#F3F7FB] mx-10">
        <TailoredNeedsSection />
      </div>

      <SkillTrainingCardsSection />
      <ExploreActivitiesSection />
      <PricingPlansSection />
      <AuthForm />
      <Footer />
    </main>
  );
}
