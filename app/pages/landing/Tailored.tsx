// components/TailoredNeedsSection.tsx

import Image from "next/image";

const TailoredNeedsSection: React.FC = () => {
  return (
    <section className="bg-[#F3F8FF]   border-y-2 border-[#D5D5D5]   py-12 md:py-16">
      <div className="container mx-auto px-10 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-8">
          Tailored for each individuals unique needs!
        </h2>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6">
          <a
            href="https://play.google.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get it on Google Play"
            className="inline-block transform transition-transform hover:scale-105"
          >
            <Image
              src="/googlestore.png"
              alt="Get it on Google Play"
              width={180}
              height={53}
              className="h-auto"
            />
          </a>
          <a
            href="https://www.apple.com/app-store/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download on the App Store"
            className="inline-block transform transition-transform hover:scale-105"
          >
            <Image
              src="/appstore.png"
              alt="Download on the App Store"
              width={160}
              height={53}
              className="h-auto  rounded-lg"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default TailoredNeedsSection;
