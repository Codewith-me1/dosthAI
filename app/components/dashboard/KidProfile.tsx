'use client';

import React from 'react';
import { Plus, Sun, Moon, Heart, Users, Clock } from 'lucide-react';

interface KidProfileProps {
  name: string;
  age: string;
}

const KidProfile: React.FC<KidProfileProps> = ({ name, age }) => {
  const routines = [
    { id: 'morning', title: 'Morning Routine', icon: <Sun className="w-5 h-5 text-purple-600" /> },
    { id: 'evening', title: 'Evening Routine', icon: <Moon className="w-5 h-5 text-purple-600" /> },
    { id: 'relaxation', title: 'Relaxation Routine', icon: <Heart className="w-5 h-5 text-purple-600" /> },
    { id: 'social', title: 'Socials Interactions', icon: <Users className="w-5 h-5 text-purple-600" /> },
    { id: 'bedtime', title: 'Bedtime Routine', icon: <Clock className="w-5 h-5 text-purple-600" /> },
  ];

  const assessmentTypes = [
    'Motor Imitation',
    'Tacting',
    'Listener Responding',
    'Intraverbal'
  ];

  return (
    <div className="p-3 max-w-4xl mx-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold">
            {name} <span className="text-gray-500 ml-2">{age}yo</span>
          </h1>
        </div>
        <button className="px-8 py-2 bg-gray-200 rounded-lg flex items-center gap-2 hover:bg-gray-300 transition-colors">
          <Plus className="w-4 h-4" />
          Create
        </button>
      </div>

      {/* Routines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {routines.map((routine) => (
          <button
            key={routine.id}
            className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-100 hover:border-purple-200 hover:bg-purple-50 transition-all group"
          >
            {routine.icon}
            <span className="text-gray-700 group-hover:text-purple-600">{routine.title}</span>
            <span className="ml-auto opacity-0 group-hover:opacity-100">
              <Plus className="w-4 h-4 text-purple-600" />
            </span>
          </button>
        ))}
        <button className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-100 hover:border-purple-200 hover:bg-purple-50 transition-all group">
          <Plus className="w-5 h-5 text-purple-600" />
          <span className="text-purple-600">Add new</span>
        </button>
      </div>

      {/* Cognition Assessments Section */}
      <div className="mb-8">
        <h2 className="text-xl text-purple-600 mb-2">Create Cognition Assessments</h2>
        <p className="text-gray-600 text-sm mb-4">
          Create cognition assessment supporting cards for all levels and types
        </p>
        
        {/* Assessment Types */}
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

        <button className="px-6 py-2 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
          Create Assessment
        </button>
      </div>

      {/* Level 1 Section */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Level 1 - Imitation Skills</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {/* Image Grid */}
          <div className="relative group">
            <img
              src="/placeholder-chair.jpg"
              alt="Chair"
              className="w-full aspect-square object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all rounded-lg" />
          </div>
          {/* Add more images as needed */}
        </div>
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <span className="text-yellow-500">★</span>
            <span className="text-sm text-gray-600">23</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">1k</span>
          </div>
          <span className="text-sm text-purple-600 font-medium">Level 01</span>
          <span className="text-sm text-gray-600">Motor Imitation</span>
        </div>
        <p className="text-sm text-gray-600 mt-2">Chair and stool combination</p>
      </div>
    </div>
  );
};

export default KidProfile; 