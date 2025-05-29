"use client";

import { useState } from "react";
import Image from "next/image";
import KidsProfileList from "./KidsProfileList";

interface KidsProfileProps {
  onBack: () => void;
}

export interface KidsProfileData {
  name: string;
  age: string;
  conditions: string[];
  preferNotToSay: boolean;
}

export default function KidsProfile({ onBack }: KidsProfileProps) {
  const [showProfileForm, setShowProfileForm] = useState(true);
  const [profiles, setProfiles] = useState<{ name: string; age: string }[]>([]);
  const [formData, setFormData] = useState<KidsProfileData>({
    name: "",
    age: "",
    conditions: [],
    preferNotToSay: false,
  });

  const conditions = [
    { id: "asd", label: "Autism Spectrum Disorder (ASD)" },
    { id: "adhd", label: "ADHD" },
    { id: "dyslexia", label: "Dyslexia" },
    { id: "dyscalculia", label: "Dyscalculia" },
    { id: "dysgraphia", label: "Dysgraphia" },
    { id: "dyspraxia", label: "Dyspraxia" },
    { id: "hyperlexia", label: "Hyperlexia" },
    { id: "ocd", label: "Obsessive-Compulsive Disorder (OCD)" },
    { id: "tourette", label: "Tourette Syndrome" },
    { id: "spd", label: "Sensory Processing Disorder (SPD)" },
  ];

  const handleConditionToggle = (conditionId: string) => {
    if (formData.preferNotToSay) return;

    setFormData((prev) => {
      const newConditions = prev.conditions.includes(conditionId)
        ? prev.conditions.filter((id) => id !== conditionId)
        : [...prev.conditions, conditionId];

      return {
        ...prev,
        conditions: newConditions,
      };
    });
  };

  const handlePreferNotToSay = () => {
    setFormData((prev) => ({
      ...prev,
      conditions: [],
      preferNotToSay: !prev.preferNotToSay,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfiles((prev) => [
      ...prev,
      { name: formData.name, age: formData.age },
    ]);
    setFormData({
      name: "",
      age: "",
      conditions: [],
      preferNotToSay: false,
    });
    setShowProfileForm(false);
  };

  if (!showProfileForm) {
    return (
      <KidsProfileList
        initialProfiles={profiles}
        onAddNewKid={() => setShowProfileForm(true)}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="w-full md:w-1/2 bg-[#FBFDFF] border-r-2 border-[#D5D5D5] p-8 flex flex-col justify-between min-h-screen relative">
        <div className="w-full max-w-md mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-6">
            <Image
              src="/icons/logo.png"
              alt="Dosth AI"
              width={120}
              height={70}
              className="rounded-xl"
            />
          </div>

          {/* Heading */}
          <div className="mb-8 mt-10 leading-[10rem] ">
            <h1 className="text-3xl md:text-4xl leading-[2rem] tracking-wide text-gray-700 mb-2">
              Add your kids profile
            </h1>
            <h2 className="text-3xl md:text-4xl leading-[3rem] tracking-wide   text-gray-700">
              and start creating stories for them
            </h2>
          </div>

          {/* Profile Preview */}
          <div className="relative">
            <Image
              className="mt-30"
              src="/kidsprofile.png"
              alt="kids"
              width={600}
              height={600}
            />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 bg-white p-8 flex items-center justify-center">
        <div className="w-full max-w-xl">
          <h2 className="text-4xl  text-[#C099FF] mb-4">
            Add your kids profile!
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            by adding you kids profile you can create and save stories for them
            in dedicated folder
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Profile Details */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-700">
                Profile Details
              </h3>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Name"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6000fe]"
              />
              <input
                type="number"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
                placeholder="Age"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6000fe]"
              />
            </div>

            {/* Conditions Selection */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-700">
                Condition(s)
              </h3>
              <p className="text-gray-600">Select condition that apply</p>
              <div className="flex flex-wrap gap-2">
                {conditions.map((condition) => (
                  <button
                    key={condition.id}
                    type="button"
                    onClick={() => handleConditionToggle(condition.id)}
                    disabled={formData.preferNotToSay}
                    className={` py-2  px-2  rounded-full text-sm font-medium transition-all
                                            ${
                                              formData.conditions.includes(
                                                condition.id
                                              )
                                                ? "bg-[#6000fe] text-white"
                                                : "text-[#787878] bg-[#F3F8FF] border-gray-200 border hover:border-[#6000fe]"
                                            }
                                            ${
                                              formData.preferNotToSay
                                                ? "opacity-50 cursor-not-allowed"
                                                : "cursor-pointer"
                                            }
                                        `}
                  >
                    {condition.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Prefer not to say option */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.preferNotToSay}
                onChange={handlePreferNotToSay}
                className="w-5 h-5 rounded border-gray-300 text-[#6000fe] focus:ring-[#6000fe]"
              />
              <span className="text-gray-700">Prefer not to say</span>
            </label>

            {/* Navigation Buttons */}
            <div className="flex gap-4 justify-between">
              <button
                type="button"
                onClick={onBack}
                className="text-[#2E74FF] font-medium hover:underline"
              >
                Skip
              </button>
              <button
                type="submit"
                className="w-[60%] bg-[#6000fe] text-white py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Add Profile +
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
