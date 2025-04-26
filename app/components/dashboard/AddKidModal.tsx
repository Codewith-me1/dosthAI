'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';

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
}

interface AddKidModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (profile: Omit<KidProfile, 'id'>) => void;
}

const CONDITIONS: Condition[] = [
  { id: 'asd', label: 'Autism Spectrum Disorder (ASD)' },
  { id: 'adhd', label: 'ADHD' },
  { id: 'dyslexia', label: 'Dyslexia' },
  { id: 'dyscalculia', label: 'Dyscalculia' },
  { id: 'dysgraphia', label: 'Dysgraphia' },
  { id: 'dyspraxia', label: 'Dyspraxia' },
  { id: 'hyperlexia', label: 'Hyperlexia' },
  { id: 'ocd', label: 'Obsessive-Compulsive Disorder (OCD)' },
  { id: 'tourette', label: 'Tourette Syndrome' },
  { id: 'spd', label: 'Sensory Processing Disorder (SPD)' },
];

const AddKidModal: React.FC<AddKidModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [preferNotToSay, setPreferNotToSay] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      name,
      age,
      conditions: selectedConditions,
      preferNotToSay,
    });
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setAge('');
    setSelectedConditions([]);
    setPreferNotToSay(false);
  };

  const toggleCondition = (conditionId: string) => {
    setSelectedConditions(prev =>
      prev.includes(conditionId)
        ? prev.filter(id => id !== conditionId)
        : [...prev, conditionId]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div 
        className="fixed inset-0 backdrop-blur-sm bg-gray-500/30"
        onClick={() => {
          onClose();
          resetForm();
        }}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-lg mx-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-xl transform transition-all">
        <div className="p-6 sm:p-8">
          <button
            onClick={() => {
              onClose();
              resetForm();
            }}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          <h2 className="text-xl sm:text-2xl font-semibold mb-2">Add a profile!</h2>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            by adding you kids profile you can create and save stories for them in dedicated folder
          </p>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-medium mb-3">Profile Details</h3>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-gray-300  rounded-xl mb-3 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#6100FF]/50 focus:border-transparent transition-all"
                  required
                />
                <input
                  type="number"
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#6100FF]/50 focus:border-transparent transition-all"
                  required
                  min="0"
                  max="18"
                />
              </div>

              <div>
                <h3 className="text-base font-semibold mb-2">Condition</h3>
                <p className="text-sm text-gray-600 mb-3">Select condition</p>
                <div className="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto p-1">
                  {CONDITIONS.map((condition) => (
                    <button
                      key={condition.id}
                      type="button"
                      onClick={() => toggleCondition(condition.id)}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${
                        selectedConditions.includes(condition.id)
                          ? 'bg-[#6100FF] text-white shadow-md'
                          : 'bg-[#F3F8FF] text-gray-700 hover:bg-[#E3E8FF]'
                      }`}
                    >
                      {condition.label}
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddKidModal; 