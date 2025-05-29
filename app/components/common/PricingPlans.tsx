"use client";

import React from "react";
import { X } from "lucide-react";

interface PlanFeature {
  text: string;
}

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  features: PlanFeature[];
  buttonText: string;
}

interface PricingPlansProps {
  isOpen: boolean;
  onClose: () => void;
}

const plans: PricingPlan[] = [
  {
    name: "Free",
    price: "Free",
    period: "",
    features: [
      { text: "Unlimited Profiles" },
      { text: "Stories, Activities, Cards" },
      { text: "Create Routines" },
    ],
    buttonText: "Select",
  },
  {
    name: "Monthly",
    price: "$ 3.49",
    period: "/month",
    features: [
      { text: "Premium Content" },
      { text: "Unlimited Profiles" },
      { text: "Share" },
      { text: "Stories, Activities, Cards" },
      { text: "Create Routines" },
      { text: "Print/Download" },
      { text: "Cognition Assessment" },
    ],
    buttonText: "Select",
  },
  {
    name: "Yearly",
    price: "$ 44.99",
    period: "/year",
    features: [
      { text: "Premium Content" },
      { text: "Unlimited Profiles" },
      { text: "Share" },
      { text: "Stories, Activities, Cards" },
      { text: "Create Routines" },
      { text: "Print/Download" },
      { text: "Cognition Assessment" },
    ],
    buttonText: "Select",
  },
];

const PricingPlans: React.FC<PricingPlansProps> = ({ isOpen, onClose }) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/30 backdrop-blur-md flex items-center  justify-center z-50">
      <div className="relative w-full h-full max-h-[50rem] overflow-y-auto">
        <div className="min-h-screen sm:min-h-fit flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl p-4 sm:p-6 relative">
            <button
              onClick={onClose}
              className="fixed sm:absolute right-4 top-4 z-50 bg-white rounded-full p-1 shadow-md text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-6 sm:mb-8 mt-8 sm:mt-0">
              <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                Choose a plan
              </h2>
              <p className="text-gray-600 text-sm sm:text-base px-2">
                Choose a plan to access all premium content created by certified
                BCBAs
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4">
              {plans.map((plan, index) => (
                <div
                  key={plan.name}
                  className={`border flex flex-col justify-between rounded-lg p-6 ${
                    index === 0 ? "border-purple-500" : "border-gray-200"
                  } hover:shadow-lg transition-shadow duration-300`}
                >
                  <div className="plansDetails">
                    <div className="text-center mb-6">
                      <h3
                        className={`text-2xl font-bold ${
                          index === 0 ? "text-purple-600" : ""
                        }`}
                      >
                        {plan.price}
                        <span className="text-sm text-gray-500">
                          {plan.period}
                        </span>
                      </h3>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-gray-700">
                          <span className="mr-2">•</span>
                          {feature.text}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    className={`w-full py-2 px-4 rounded-md transition-colors hover:text-white duration-300 bg-white text-purple-600 border-2 border-purple-600 hover:bg-purple-600 `}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
