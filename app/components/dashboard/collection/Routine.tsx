"use client";

import React, { useState } from "react";
import {
  Sun,
  Users,
  Heart,
  Clock,
  Plus,
  X,
  Check,
  Moon,
  Pencil,
  Trash2,
} from "lucide-react";

interface Routine {
  id: number;
  name: string;
}

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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newRoutineName, setNewRoutineName] = useState("");

  // State for Edit Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentRoutine, setCurrentRoutine] = useState<Routine>(); // Stores the routine object being edited
  const [editedRoutineName, setEditedRoutineName] = useState("");

  // State for success messages
  const [successMessage, setSuccessMessage] = useState("");

  // --- Handlers for Add Modal ---
  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
    setNewRoutineName("");
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setNewRoutineName("");
  };

  const handleAddRoutine = () => {
    if (!newRoutineName.trim()) return;
    setRoutines([
      ...routines,
      {
        id: Date.now(),
        name: newRoutineName,
        icon: <Plus className="h-5 w-5 text-[#6100FF]" />,
      },
    ]);
    setNewRoutineName("");
    setIsAddModalOpen(false);
    setSuccessMessage("Routine Created");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // --- Handlers for Edit Modal ---
  const handleOpenEditModal = (routine: Routine) => {
    setCurrentRoutine(routine);
    setEditedRoutineName(routine.name);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentRoutine(undefined);
    setEditedRoutineName("");
  };

  const handleUpdateRoutine = () => {
    if (!editedRoutineName.trim() || !currentRoutine) return;
    setRoutines(
      routines.map((r) =>
        r.id === currentRoutine.id ? { ...r, name: editedRoutineName } : r
      )
    );
    handleCloseEditModal();
    setSuccessMessage("Routine Edited");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleDeleteRoutine = () => {
    if (!currentRoutine) return;
    setRoutines(routines.filter((r) => r.id !== currentRoutine.id));
    handleCloseEditModal();
    setSuccessMessage("Routine Deleted");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="w-full p-3">
      <div className="flex flex-wrap gap-4 mb-12">
        {routines.map((routine) => (
          <div key={routine.id} className="relative group ">
            <button className="flex items-center justify-between px-6 py-2 rounded-md bg-[#F6F9FC] hover:bg-[#F3F8FF] border border-gray-200 text-left w-[250px] transition">
              <span className="flex items-center gap-2 font-medium text-gray-700">
                {routine.icon}
                {routine.name}
              </span>
              {/* Original SVG arrow removed to make space for edit icon, can be re-added if needed */}
            </button>
            <button
              onClick={() => handleOpenEditModal(routine)}
              className="absolute top-1/2 right-2 -translate-y-1/2 p-1.5 rounded-full text-black hover:text-[#6100FF] opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out hover:bg-gray-100"
              aria-label="Edit routine"
            >
              <Pencil className="h-4 w-4" />
            </button>
          </div>
        ))}
        {/* Add New Button */}
        <button
          onClick={handleOpenAddModal}
          className="flex items-center justify-between px-6 py-2 rounded-md border border-gray-200 bg-white hover:bg-[#F3F8FF] text-left w-[250px] transition"
        >
          <span className="flex items-center gap-2 font-medium text-[#6100FF]">
            <Plus className="h-5 w-5" /> Add new
          </span>
        </button>
      </div>

      {/* Add New Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative animate-fadeIn">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
              onClick={handleCloseAddModal}
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
            <h2 className="text-xl font-bold mb-2">Create New Routine</h2>
            <p className="text-gray-600 mb-6">Name your routine to create</p>
            <input
              type="text"
              placeholder="e.g Morning Routine"
              value={newRoutineName}
              onChange={(e) => setNewRoutineName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6100FF] mb-6"
            />
            <div className="flex justify-end gap-4">
              <button
                className="text-gray-500 font-medium hover:underline"
                onClick={handleCloseAddModal}
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

      {/* Edit Modal (styled based on the provided image) */}
      {isEditModalOpen && currentRoutine && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 relative animate-fadeIn">
            {" "}
            {/* Max-w-sm as per image proportions */}
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Edit Routine
              </h2>
              <button
                className="text-gray-400 hover:text-gray-600"
                onClick={handleCloseEditModal}
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mb-5">
              Change name or delete routine
            </p>
            <label
              htmlFor="editRoutineName"
              className="text-xs font-medium text-gray-700 mb-1 block"
            >
              Name
            </label>
            <input
              id="editRoutineName"
              type="text"
              value={editedRoutineName}
              onChange={(e) => setEditedRoutineName(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-md border border-[#B38FF8] focus:outline-none focus:ring-2 focus:ring-[#6100FF]/80 focus:border-[#6100FF] mb-6"
              // Using a lighter purple for border, similar to image: border-[#B38FF8] or focus:border-[#6100FF]
            />
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={handleDeleteRoutine}
                className="flex items-center gap-1.5 text-red-600 hover:text-red-700 font-medium hover:underline text-xs"
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete Routine
              </button>
              <div className="flex gap-2">
                <button
                  className="text-gray-700 font-medium hover:bg-gray-100 px-4 py-2 rounded-md text-xs"
                  onClick={handleCloseEditModal}
                >
                  Cancel
                </button>
                <button
                  className="text-[#5924C5] font-semibold hover:bg-purple-50 px-4 py-2 rounded-md text-xs" // Blue/Purple text as in image
                  onClick={handleUpdateRoutine}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Message Toast */}
      {successMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-6 py-3 rounded-lg shadow-lg animate-fadeIn">
          <Check className="h-5 w-5 text-green-600" />
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default Routine;

/*
  Make sure you have the CSS for fadeIn animation if it's not already in your global styles:
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.2s ease-out;
  }
*/
