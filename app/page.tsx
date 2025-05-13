import Image from "next/image";
import Header from "./layout/Header";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-[#F8F6FF] relative overflow-hidden px-4 md:px-0">
      {/* Hero Section */}
    <Header/>

      <div className="w-full flex flex-col md:flex-row items-center justify-between z-10 pt-16 md:pt-0 md:pl-20 max-w-7xl mx-auto">
        {/* Left Section */}
        <div className="flex-1 flex flex-col justify-center max-w-xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-[#7B2FF2] mb-2">
            Personalized Ai-Powered<br className="hidden sm:block" /> Learning
          </h1>
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">
            Tool for Neurodivergent<br className="sm:hidden" /> Individuals
          </h2>
          <div className="flex gap-4 mb-8">
            <button className="px-6 py-2 rounded-lg border-2 border-[#7B2FF2] text-[#7B2FF2] font-semibold bg-white hover:bg-[#f3f0ff] transition">Book a Demo</button>
            <button className="px-6 py-2 rounded-lg bg-[#7B2FF2] text-white font-semibold shadow hover:bg-[#6100FF] transition">Sign Up</button>
          </div>
          {/* Floating Card */}
          <div className="relative mt-4">
            <div className="absolute -top-8 left-0 w-44 h-28 bg-[#FFF4CC] rounded-2xl shadow-lg flex flex-col justify-between p-3 z-20 rotate-[-8deg]">
              <div className="flex items-center gap-2">
                <Image src="/demo1.jpg" alt="card" width={36} height={36} className="rounded-lg object-cover" />
                <span className="text-xs font-bold text-[#7B2FF2]">Learn how to pack stuff?</span>
              </div>
              <p className="text-xs text-gray-700 mt-1">Lorum ipsum dolar ismet nej ismt.lpsum dolar</p>
            </div>
          </div>
        </div>
        {/* Right Section - Illustration */}
        <div className="flex-1 flex items-center justify-center relative w-full md:w-auto mt-16 md:mt-0 z-0">
          <div className="relative w-full max-w-lg">
            <div className="absolute -top-10 -right-10 w-[120%] h-[120%] bg-[#F3F0FF] rounded-full z-0" style={{ filter: 'blur(30px)' }} />
            <Image
              src="/catimage.png"
              alt="Cool Cat Illustration"
              width={600}
              height={600}
              className="rounded-3xl shadow-2xl relative z-10 object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* Prompt Card Section */}
      <section className="w-full max-w-5xl mx-auto mt-16 flex flex-col md:flex-row items-center gap-8 px-2">
        {/* Left Text */}
        <div className="flex-1 flex flex-col items-start justify-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            <span className="text-[#7B2FF2]">Create</span> engaging, customized social stories , task visuals, & therapy cards with a <span className="italic font-semibold text-black">simple prompt</span>
          </h2>
          <p className="text-gray-600 mb-4 text-sm sm:text-base max-w-md">
            An AI-Assistant that empowers parents, behavioral analysts supporting neurodivergent community, built on AI-models trained using Applied Behavioral Analysis (ABA) Methodology
          </p>
          <button className="flex items-center gap-2 px-5 py-2 rounded-lg border-2 border-[#7B2FF2] text-[#7B2FF2] font-semibold bg-white hover:bg-[#f3f0ff] transition mb-2">
            Create Now <span className="text-lg">+</span>
          </button>
        </div>
        {/* Prompt Card with Floating Prompt */}
        <div className="flex-1 flex flex-col items-center relative w-full max-w-xs">
          <div className="relative w-full">
            <Image src="/demo1.jpg" alt="Prompt Card" width={320} height={220} className="rounded-2xl shadow-xl w-full object-cover" />
            {/* Floating Prompt */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[90%] bg-white rounded-xl shadow-lg flex items-center px-4 py-2 gap-2 border border-[#E0E0E0]">
              <span className="bg-[#7B2FF2] text-white rounded-full w-6 h-6 flex items-center justify-center font-bold">G</span>
              <span className="text-xs sm:text-sm text-[#7B2FF2] font-semibold">Create a story for 3 year old, about how to pack stuff?</span>
              <span className="bg-[#FFF4CC] text-[#7B2FF2] rounded-full w-6 h-6 flex items-center justify-center font-bold text-lg">↗</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-5xl mx-auto mt-24 grid grid-cols-1 md:grid-cols-2 gap-8 px-2">
        {/* Routines Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-4 border border-[#E0E0E0]">
          <h3 className="text-xl font-bold mb-1">Create <span className="text-[#7B2FF2]">Routines</span></h3>
          <p className="text-gray-600 text-sm mb-2">set <span className="text-[#7B2FF2]">Routines</span>, for your kids to help them categories</p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="bg-[#FFF4CC] px-3 py-1 rounded-lg text-[#7B2FF2] text-xs font-semibold">Morning Routine</span>
              <div className="flex gap-1">
                <div className="w-8 h-8 bg-[#F8F6FF] rounded-lg border border-[#E0E0E0]" />
                <div className="w-8 h-8 bg-[#F8F6FF] rounded-lg border border-[#E0E0E0]" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-[#FFF4CC] px-3 py-1 rounded-lg text-[#7B2FF2] text-xs font-semibold">Evening Routine</span>
              <div className="flex gap-1">
                <div className="w-8 h-8 bg-[#F8F6FF] rounded-lg border border-[#E0E0E0]" />
                <div className="w-8 h-8 bg-[#F8F6FF] rounded-lg border border-[#E0E0E0]" />
              </div>
            </div>
            <button className="flex items-center gap-1 text-[#7B2FF2] text-xs font-semibold mt-2"><span className="text-lg">+</span> Add new</button>
          </div>
        </div>
        {/* Multiple Profiles Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-4 border border-[#E0E0E0]">
          <h3 className="text-xl font-bold mb-1">Create <span className="text-[#7B2FF2]">Multiple Profiles</span></h3>
          <p className="text-gray-600 text-sm mb-2">BCBA can add kids and manage them in one place</p>
          <div className="flex flex-wrap gap-2 items-center">
            <span className="bg-[#F3F0FF] text-[#7B2FF2] rounded-full px-3 py-1 font-semibold text-xs">+ Alex</span>
            <span className="bg-[#FFF4CC] text-[#7B2FF2] rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">A</span>
            <span className="text-3xl text-[#7B2FF2] font-bold">+</span>
          </div>
        </div>
      </section>

      {/* Request a Demo Section */}
      <section className="w-full max-w-5xl mx-auto mt-24 mb-16 px-2">
        <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col md:flex-row items-center gap-6 border border-[#E0E0E0]">
          <div className="flex-1 flex flex-col items-start">
            <h3 className="text-2xl font-bold mb-2">Request a <span className="text-[#7B2FF2]">Demo!</span></h3>
            <p className="text-gray-600 text-sm mb-4">Get a detailed walk-thru of the features and possibilities for BCBA!</p>
            <button className="px-8 py-2 rounded-lg bg-[#7B2FF2] text-white font-semibold shadow hover:bg-[#6100FF] transition">Request</button>
          </div>
          <div className="flex items-center justify-center">
            <span className="bg-[#7B2FF2] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg text-shadow-lg">G</span>
          </div>
        </div>
      </section>

      {/* Explore Section */}
      <section className="w-full max-w-5xl mx-auto mt-16 mb-24 px-2 flex flex-col gap-20">
        {/* Social Stories */}
        <div className="flex flex-col md:flex-row gap-8 items-center relative">
          <div className="flex-1 flex flex-col items-start">
            <h3 className="text-2xl font-bold mb-2">Explore <span className="text-[#7B2FF2]">Social Stories</span></h3>
            <p className="text-gray-600 mb-4 max-w-md">Personalized social stories, help individuals prepare for new experiences & situations</p>
            <button className="px-5 py-2 rounded-lg bg-[#FFC700] text-black font-semibold shadow hover:bg-yellow-400 transition mb-2">Explore Community Stories</button>
          </div>
          <div className="flex-1 flex flex-col items-center relative w-full max-w-xs">
            <div className="relative w-full flex flex-col items-end">
              <Image src="/demo2.jpg" alt="Social Story" width={260} height={180} className="rounded-2xl shadow-xl w-full object-cover" />
              {/* Floating label */}
              <span className="absolute top-2 right-0 bg-[#C7AFFF] text-[#7B2FF2] px-4 py-2 rounded-xl font-bold text-lg shadow-lg">Plan a trip for us!</span>
              {/* Floating G icon */}
              <span className="absolute -top-6 left-2 bg-[#333] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg shadow-lg border-4 border-white">G</span>
            </div>
            {/* Card row */}
            <div className="flex gap-2 mt-4">
              <Image src="/demo1.jpg" alt="Story Card 1" width={60} height={60} className="rounded-lg object-cover" />
              <Image src="/demo3.jpg" alt="Story Card 2" width={60} height={60} className="rounded-lg object-cover" />
              <Image src="/demo4.jpg" alt="Story Card 3" width={60} height={60} className="rounded-lg object-cover" />
              <Image src="/demo2.jpg" alt="Story Card 4" width={60} height={60} className="rounded-lg object-cover" />
              <Image src="/demo1.jpg" alt="Story Card 5" width={60} height={60} className="rounded-lg object-cover" />
            </div>
          </div>
        </div>
        {/* Tailored Needs Banner */}
        <div className="w-full bg-[#F8F6FF] rounded-2xl flex flex-col md:flex-row items-center justify-between px-6 py-6 shadow relative">
          <span className="text-[#7B2FF2] font-semibold text-lg">Tailored to each individual's unique needs!</span>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Image src="/appstore.png" alt="App Store" width={120} height={36} className="object-contain" />
            <Image src="/googleplay.png" alt="Google Play" width={120} height={36} className="object-contain" />
          </div>
          {/* Floating G icon */}
          <span className="absolute -top-6 left-6 bg-[#333] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg shadow-lg border-4 border-white">G</span>
        </div>
        {/* Activities */}
        <div className="flex flex-col md:flex-row gap-8 items-center relative">
          <div className="flex-1 flex flex-col items-start">
            <h3 className="text-2xl font-bold mb-2">Explore <span className="text-[#7B2FF2]">Activities</span></h3>
            <p className="text-gray-600 mb-4 max-w-md">Provides task visuals that offer <span className="text-[#7B2FF2] font-semibold">step by step</span> guide for daily activities</p>
            <button className="px-5 py-2 rounded-lg bg-[#FFC700] text-black font-semibold shadow hover:bg-yellow-400 transition mb-2">Explore Community Activities</button>
          </div>
          <div className="flex-1 flex flex-col items-center relative w-full max-w-xs">
            <div className="relative w-full flex flex-col items-end">
              <div className="flex gap-2">
                <Image src="/demo3.jpg" alt="Activity 1" width={90} height={120} className="rounded-xl object-cover" />
                <Image src="/demo4.jpg" alt="Activity 2" width={90} height={120} className="rounded-xl object-cover" />
              </div>
              <div className="flex gap-2 mt-2">
                <Image src="/demo2.jpg" alt="Activity 3" width={90} height={120} className="rounded-xl object-cover" />
                <Image src="/demo1.jpg" alt="Activity 4" width={90} height={120} className="rounded-xl object-cover" />
              </div>
              {/* Floating label */}
              <span className="absolute top-8 left-0 bg-[#C7AFFF] text-[#7B2FF2] px-4 py-2 rounded-xl font-bold text-lg shadow-lg">Step 1</span>
              {/* Floating G icon */}
              <span className="absolute -top-6 right-2 bg-[#333] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg shadow-lg border-4 border-white">G</span>
            </div>
          </div>
        </div>
        {/* Skill Training Cards */}
        <div className="flex flex-col md:flex-row gap-8 items-center relative">
          <div className="flex-1 flex flex-col items-start">
            <h3 className="text-2xl font-bold mb-2">Explore <span className="text-[#7B2FF2]">Skill Training Cards</span></h3>
            <p className="text-gray-600 mb-4 max-w-md">Create therapy cards to provide, clear and actionable prompts to teach skills like emotion regulation, problem-solving and positive behaviors</p>
            <button className="px-5 py-2 rounded-lg bg-[#FFC700] text-black font-semibold shadow hover:bg-yellow-400 transition mb-2">Explore Community Cards</button>
          </div>
          <div className="flex-1 flex flex-col items-center relative w-full max-w-xs">
            <div className="relative w-full flex flex-col items-end">
              <Image src="/demo4.jpg" alt="Skill Card" width={120} height={160} className="rounded-xl object-cover mb-2" />
              <div className="absolute bottom-4 right-0 bg-[#FFF4CC] border-2 border-[#FFC700] rounded-xl p-3 w-48 shadow-lg flex flex-col gap-2">
                <span className="text-[#7B2FF2] font-bold text-sm">Create therapy cards to provide, clear and actionable prompts to teach skills like emotion regulation, problem-solving</span>
                <span className="bg-[#FFC700] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg self-end">→</span>
              </div>
              {/* Floating G icon */}
              <span className="absolute -top-6 left-2 bg-[#333] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg shadow-lg border-4 border-white">G</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}