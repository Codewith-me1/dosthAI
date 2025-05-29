"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

interface Condition {
  id: string;
  label: string;
}

export interface KidProfile {
  id: string;
  name: string;
  age: string;
  conditions: string[];
  preferNotToSay: boolean;
  role?: string;
}

interface AddKidModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (profile: Omit<KidProfile, "id">) => void;
  initialData?: Omit<KidProfile, "id"> | null;
}

const CONDITIONS: Condition[] = [
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

const AddKidModal: React.FC<AddKidModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  initialData,
}) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [preferNotToSay, setPreferNotToSay] = useState(false);

  useEffect(() => {
    if (isOpen && initialData) {
      setName(initialData.name ?? "");
      setAge(initialData.age ?? "");
      setSelectedConditions(initialData.conditions ?? []);
      setPreferNotToSay(initialData.preferNotToSay ?? false);
    }

    if (isOpen && !initialData) {
      resetForm();
    }
  }, [isOpen, initialData]);

  const resetForm = () => {
    setName("");
    setAge("");
    setSelectedConditions([]);
    setPreferNotToSay(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      name,
      age,
      conditions: selectedConditions,
      preferNotToSay,
    });
    resetForm();
    onClose();
  };

  const toggleCondition = (id: string) => {
    setSelectedConditions((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="fixed inset-0 bg-gray-500/30 backdrop-blur-sm"
        onClick={() => {
          onClose();
          resetForm();
        }}
      />

      <div className="relative w-full max-w-lg mx-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-xl z-10">
        <div className="p-6 sm:p-8">
          <button
            type="button"
            onClick={() => {
              onClose();
              resetForm();
            }}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>

          <h2 className="text-xl sm:text-2xl font-semibold mb-2">
            Add a profile!
          </h2>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            By adding your kid's profile, you can create and save stories for
            them in a dedicated folder.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-base font-medium mb-3">Profile Details</h3>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl mb-3 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#6100FF]/50 focus:border-transparent"
                required
              />
              <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#6100FF]/50 focus:border-transparent"
                required
                min="0"
                max="18"
              />
            </div>

            <div>
              <h3 className="text-base font-semibold mb-2">Condition</h3>
              <p className="text-sm text-gray-600 mb-3">Select condition(s)</p>
              <div className="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto p-1">
                {CONDITIONS.map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => toggleCondition(id)}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${
                      selectedConditions.includes(id)
                        ? "bg-[#6100FF] text-white shadow-md"
                        : "bg-[#F3F8FF] text-gray-700 hover:bg-[#E3E8FF]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-center gap-2 select-none cursor-pointer">
              <input
                type="checkbox"
                checked={preferNotToSay}
                onChange={(e) => setPreferNotToSay(e.target.checked)}
                className="rounded border-gray-300 text-[#6100FF] focus:ring-[#6100FF]"
              />
              <span className="text-sm text-gray-600">Prefer not to say</span>
            </label>

            <button
              type="submit"
              className="w-full bg-[#6100FF] text-white py-3 rounded-xl hover:bg-[#5000D5] transition-all duration-200 shadow-md hover:shadow-lg text-sm sm:text-base font-medium"
            >
              Add Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddKidModal;
