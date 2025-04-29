"use client";

import React, { useState } from "react";
import { Sun, Users, Heart, Clock, Plus, X, Check, Moon } from "lucide-react";

const routineIcons = {
  morning: <Sun className="h-5 w-5 text-[#6100FF]" />,
  evening: <Moon className="h-5 w-5 text-[#6100FF]" />,
  relaxation: <Users className="h-5 w-5 text-[#6100FF]" />,
  social: <Users className="h-5 w-5 text-[#6100FF]" />,
  bedtime: <Clock className="h-5 w-5 text-[#6100FF]" />,
};

const defaultRoutines = [
  { id: 1, name: "Morning Routine", icon: routineIcons.morning },
  { id: 2, name: "Evening Routine", icon: routineIcons.evening },
  { id: 3, name: "Relaxation Routine", icon: routineIcons.relaxation },
  { id: 4, name: "Socials Interactions", icon: routineIcons.social },
  { id: 5, name: "Bedtime Routine", icon: routineIcons.bedtime },
];

const Routine = () => {
  const [routines, setRoutines] = useState(defaultRoutines);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [routineName, setRoutineName] = useState("");
  const [success, setSuccess] = useState(false);

  const handleAddRoutine = () => {
    if (!routineName.trim()) return;
    setRoutines([
      ...routines,
      {
        id: Date.now(),
        name: routineName,
        icon: <Plus className="h-5 w-5 text-[#6100FF]" />,
      },
    ]);
    setRoutineName("");
    setIsModalOpen(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div className="w-full p-3">
        
        <div className="flex flex-wrap gap-4 mb-12">
  {routines.map((routine) => (
    <button
      key={routine.id}
      className="flex items-center justify-between px-6 py-2 rounded-md bg-[#F6F9FC] hover:bg-[#F3F8FF] border border-gray-200 text-left w-[250px] transition"
    >
      <span className="flex items-center gap-2 font-medium text-gray-700">
        {routine.icon}
        {routine.name}
      </span>
      <span className="text-gray-400">
        <svg width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 13l5-4-5-4" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </button>
  ))}
  {/* Add New Button */}
  <button
    onClick={() => setIsModalOpen(true)}
    className="flex items-center justify-between px-6 py-5 rounded-md border border-gray-200 bg-white hover:bg-[#F3F8FF] text-left w-[250px] transition"
  >
    <span className="flex items-center gap-2 font-medium text-[#6100FF]">
      <Plus className="h-5 w-5" /> Add new
    </span>
  </button>
</div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative animate-fadeIn">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
              onClick={() => setIsModalOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
            <h2 className="text-xl font-bold mb-2">Create New Routine</h2>
            <p className="text-gray-600 mb-6">Name your routine to create</p>
            <input
              type="text"
              placeholder="e.g Morning Routine"
              value={routineName}
              onChange={(e) => setRoutineName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6100FF] mb-6"
            />
            <div className="flex justify-end gap-4">
              <button
                className="text-gray-500 font-medium hover:underline"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="text-[#6100FF] font-semibold hover:underline"
                onClick={handleAddRoutine}
              >
                Create Routine
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-6 py-3 rounded-lg shadow-lg animate-fadeIn">
          <Check className="h-5 w-5 text-green-600" />
          Routine Created
        </div>
      )}
    </div>
  );
};

export default Routine; 