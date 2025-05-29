"use client";

import React, { useState } from "react";
import {
  Plus,
  Sun,
  Moon,
  Heart,
  Users,
  Clock,
  Search,
  Pencil,
} from "lucide-react";
import Routine from "../collection/Routine";
import CreateAssessment from "@/app/components/dashboard/assement/CreateAssessment";
import AddKidModal from "../modals/AddKidModal"; // Make sure the path is correct

interface KidProfileProps {
  name: string;
  age: string;
  role: "BCBA" | "client" | string;
}

const KidProfile: React.FC<KidProfileProps> = ({ name, age, role }) => {
  const [showCreateAssessment, setShowCreateAssessment] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const routines = [
    {
      id: "morning",
      title: "Morning Routine",
      icon: <Sun className="w-5 h-5 text-purple-600" />,
    },
    {
      id: "evening",
      title: "Evening Routine",
      icon: <Moon className="w-5 h-5 text-purple-600" />,
    },
    {
      id: "relaxation",
      title: "Relaxation Routine",
      icon: <Heart className="w-5 h-5 text-purple-600" />,
    },
    {
      id: "social",
      title: "Socials Interactions",
      icon: <Users className="w-5 h-5 text-purple-600" />,
    },
    {
      id: "bedtime",
      title: "Bedtime Routine",
      icon: <Clock className="w-5 h-5 text-purple-600" />,
    },
  ];

  const assessmentTypes = [
    "Motor Imitation",
    "Tacting",
    "Listener Responding",
    "Intraverbal",
  ];

  return (
    <div>
      {showCreateAssessment ? (
        <CreateAssessment
          kidName={name}
          onBack={() => setShowCreateAssessment(false)}
        />
      ) : (
        <>
          <div className="p-3 max-w-6xl mb-0 pb-0">
            {/* Header */}
            <div className="flex p-3 justify-between items-center">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-semibold">
                  {name} <span className="text-gray-500 ml-2">{age}yo</span>
                </h1>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-gray-500 hover:text-[#6100FF] transition-colors"
                >
                  <Pencil className="w-5 h-5" />
                </button>
              </div>

              <div className="flex gap-5">
                <div className="flex px-7 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <input
                    type="text"
                    placeholder="Search"
                    className="text-gray-900 outline-0"
                  />
                  <Search className="text-[#DFCCFF] fill-amber-50" />
                </div>

                <a
                  href="/createStory"
                  className="px-8 py-2 text-white bg-[#6100FF] rounded-lg flex items-center gap-2 hover:bg-white hover:text-[#6100FF] hover:shadow-md transition-colors"
                >
                  Create
                  <Plus className="w-4 h-4" />
                </a>
              </div>
            </div>

            <Routine />

            {(role === "BCBA" || role === "client") && (
              <>
                <h2 className="text-xl text-purple-600 mb-2">
                  Create Cognition Assessments
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  Create cognition assessment supporting cards for all levels
                  and types
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {assessmentTypes.map((type) => (
                    <span
                      key={type}
                      className="px-4 py-2 bg-amber-50 text-amber-800 rounded-full text-sm"
                    >
                      {type}
                    </span>
                  ))}
                </div>

                <button
                  className="px-6 py-2 border-2 border-purple-600 text-purple-700 font-bold rounded-lg hover:bg-purple-50 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-300"
                  onClick={() => setShowCreateAssessment(true)}
                >
                  Create Assessment
                </button>
              </>
            )}
          </div>

          {/* 🔽 Edit Kid Modal */}
          <AddKidModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAdd={(updatedProfile) => {
              console.log("Edited profile:", updatedProfile);
              setIsModalOpen(false);
            }}
            initialData={{
              name,
              age,
              conditions: [],
              preferNotToSay: false,
            }}
          />
        </>
      )}
    </div>
  );
};

export default KidProfile;
