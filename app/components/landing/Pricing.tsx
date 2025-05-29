"use client";

import React, { use, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  planName: string;
  price: string;
  period?: string;
  features: PlanFeature[];
  buttonText: string;
  isRecommended?: boolean;
  buttonType?: "primary" | "secondary";
  borderColor?: string;
  textColor?: string;
  priceColor?: string;
  isSelected?: boolean;
  onSelect?: () => void;
}

const PlanFeatureItem: React.FC<{ text: string }> = ({ text }) => (
  <li className="flex items-start text-sm text-gray-600">
    <span className="text-purple-600 mr-2 mt-1 inline-block align-middle">
      &bull;
    </span>
    {text}
  </li>
);

const PricingCard: React.FC<PricingCardProps> = ({
  planName,
  price,
  period,
  features,
  buttonText,
  isRecommended = false,
  buttonType = "secondary",
  textColor = "text-purple-600",
  isSelected,
  onSelect,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const router = useRouter();
  const handleSignIn = () => {
    router.push("/pages/signup");
  };

  const cardClasses = `
  bg-[#F8FBFF] rounded-xl  p-10 md:p-12 w-full
  flex flex-col border-[#787878] border-1 transition-all duration-300
  ${isSelected ? "border-[#C099FF] border-2 shadow-2xl" : "border-[#787878]"}
`;

  const buttonClasses = `
    w-full font-semibold py-3 px-6 rounded-lg transition-colors duration-300
    focus:outline-none focus:ring-2 border-[#6100FF] focus:ring-offset-2 hover:bg-[#6100FF] hover:text-white
    border-2 text-[#6100FF] focus:ring-[#6100FF] focus:bg-[#6100FF] focus:text-white
  `;

  return (
    <motion.div
      ref={ref}
      onClick={onSelect}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cardClasses}
    >
      <div className="text-center">
        <span className={`text-4xl md:text-5xl ${textColor}`}>{price}</span>
        {period && <span className="text-gray-500 text-sm">/{period}</span>}
      </div>
      <hr className="border-gray-200 my-4 md:my-6" />
      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, index) => (
          <PlanFeatureItem key={index} text={feature.text} />
        ))}
      </ul>
      <button
        onClick={() => {
          handleSignIn();
        }}
        className={buttonClasses}
      >
        {buttonText}
      </button>
    </motion.div>
  );
};

const plansData: PricingCardProps[] = [
  {
    planName: "Free",
    price: "Free",
    features: [
      { text: "Unlimited Profiles", included: true },
      { text: "Stories, Activities, Cards", included: true },
      { text: "Create Routines", included: true },
    ],
    buttonText: "Sign up",
    buttonType: "secondary",
    textColor: "text-purple-600",
  },
  {
    planName: "$ 3.49",
    price: "$3.49",
    period: "month",
    features: [
      { text: "Premium Content", included: true },
      { text: "Unlimited Profiles", included: true },
      { text: "Share", included: true },
      { text: "Stories, Activities, Cards", included: true },
      { text: "Create Routines", included: true },
      { text: "Print/Download", included: true },
      { text: "Cognition Assessment", included: true },
    ],
    buttonText: "Sign up",
    buttonType: "secondary",
    isRecommended: true,
    textColor: "text-purple-700",
  },
  {
    planName: "$ 44.99",
    price: "$44.99",
    period: "year",
    features: [
      { text: "Premium Content", included: true },
      { text: "Unlimited Profiles", included: true },
      { text: "Share", included: true },
      { text: "Stories, Activities, Cards", included: true },
      { text: "Create Routines", included: true },
      { text: "Print/Download", included: true },
      { text: "Cognition Assessment", included: true },
    ],
    buttonText: "Sign up",
    buttonType: "secondary",
    textColor: "text-purple-600",
  },
];

const PricingPlansSection: React.FC = () => {
  const [selectedPlanIndex, setSelectedPlanIndex] = useState<number | null>(
    null
  );

  return (
    <section id="pricing" className="py-12 md:py-20 md:max-w-5xl md:mx-auto">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 text-center mb-10 md:mb-16">
          Our Plans
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6 items-stretch">
          {plansData.map((plan, index) => (
            <PricingCard
              key={index}
              {...plan}
              isSelected={selectedPlanIndex === index}
              onSelect={() => setSelectedPlanIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPlansSection;
