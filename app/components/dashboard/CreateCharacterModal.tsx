'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';

interface CreateCharacterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const samplePrompts = [
  "The Reluctant Alex",
  "Virtual School",
  "An Unexpected Friend",
  "The Reluctant Alex",
  "Virtual School",
  "An Unexpected Friend",
];

const CreateCharacterModal: React.FC<CreateCharacterModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState(1);
  const [prompt, setPrompt] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(
    null
  );

  if (!isOpen) return null;

  const handlePromptSubmit = (e: React.FormEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      setStep(2);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    // Check if the key pressed is 'Enter' and the input is not empty
    if (e.key === 'Enter' && prompt.trim()) {
        handlePromptSubmit(e);
    }
  };


  const handleCharacterSelect = (index: number) => {
    setSelectedCharacter(index);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      {/* Backdrop with glass effect */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true" // Added for accessibility
      />

      {/* Modal Container */}
      {/* Adjusted max-width and padding for different breakpoints */}
      {/* Added max-height and overflow for smaller screens */}
      <div className="bg-white rounded-2xl w-full max-w-md md:max-w-2xl lg:max-w-5xl mx-auto relative shadow-xl max-h-[90vh] overflow-y-auto flex flex-col">

        {/* Close button */}
        {/* Adjusted position slightly for smaller screens */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 sm:right-4 sm:top-4 text-gray-500 hover:text-gray-700 z-10 p-1 rounded-full hover:bg-gray-100" // Added padding and hover bg for easier clicking
          aria-label="Close modal" // Added for accessibility
        >
          <X className="w-5 h-5" />
        </button>

        {step === 1 ? (
          // Step 1: Prompt Input
          // Adjusted padding and text sizes
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
              Create New Character
            </h2>
            <p className="text-sm text-gray-600 mb-4 sm:mb-6">
              Describe your character and attributes
            </p>

            {/* Input field */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyPress={handleKeyPress} // Use combined handler
                  placeholder="e.g., 4 year old girl with black hair wearing a saree"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10 text-sm sm:text-base" // Adjusted border and text size
                />
                {prompt && (
                  <button
                    onClick={() => setPrompt('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label="Clear input" // Added for accessibility
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Sample Prompts */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2 sm:mb-3">
                Sample Prompts
              </h3>
              <p className="text-xs text-gray-500 mb-3 sm:mb-4">
                Choose a sample prompt to get started
              </p>
              {/* Adjusted grid columns and gap for responsiveness */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                {samplePrompts.map((samplePrompt, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(samplePrompt)}
                    // Added text-left for better alignment if text wraps
                    className="flex items-center w-full text-left px-3 py-2 rounded-lg border border-gray-200 hover:border-purple-500 hover:bg-purple-50 transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-purple-300"
                  >
                    {/* Added flex-shrink-0 to prevent star from shrinking */}
                    <span className="text-yellow-500 mr-2 flex-shrink-0">⭐</span>
                    <span className="text-sm text-gray-700">{samplePrompt}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Step 2: Character Selection and Preview
          // Main layout changes from column to row on large screens
          <div className="flex flex-col lg:flex-row flex-1"> {/* Added flex-1 to allow content to fill height */}

            {/* Left side - Character Selection */}
            {/* Adjusted padding, text sizes, and grid */}
            <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8 flex flex-col">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-1">
                Create New Character
              </h2>
              <p className='font-light text-sm text-gray-600 mb-4 sm:mb-7' >
                Select the character that best fits your prompt
              </p>

              {/* Prompt Display */}
              <div className="mb-4 sm:mb-6">
                <p className="text-base sm:text-lg font-semibold text-gray-700 mb-2">Prompt</p>
                {/* Removed fixed height, added max-height and scroll */}
                <div className="bg-gray-100 p-3 sm:p-4 rounded-lg max-h-32 overflow-y-auto">
                  <p className="text-sm mb-10 text-gray-900 break-words">{prompt}</p> {/* Added break-words */}
                </div>
              </div>

              <p className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                Choose the best fit
              </p>

              {/* Character Selection Grid */}
              {/* Adjusted grid columns and gap */}
              <div className="flex  gap-3 sm:grid-cols-4 sm:gap-4 mb-6 sm:mb-8">
                {[0, 1, 2, 3].map((index) => (
                  <button
                    key={index}
                    onClick={() => handleCharacterSelect(index)}
                    className={`rounded-lg w-[50px] aspect-square overflow-hidden border-2 transition-all duration-200 ease-in-out focus:outline-none ${
                      selectedCharacter === index
                        ? 'border-purple-500 ring-2 ring-purple-300 ring-offset-1' // Enhanced focus/selected state
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                    aria-label={`Select character option ${index + 1}`} // Added for accessibility
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src="/kids.jpg" // Replace with dynamic images if available
                        alt={`Character option ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </button>
                ))}
              </div>

              {/* Delete Draft Button */}
              {/* Added mt-auto to push to bottom, adjusted margin */}
              <div className="mt-auto pt-4">
                <button
                  onClick={() => {
                    setStep(1);
                    setPrompt(''); // Clear prompt when deleting draft
                    setSelectedCharacter(null);
                  }}
                  className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center p-1 -ml-1 rounded hover:bg-red-50" // Added padding/margin/hover for better interaction
                >
                  <span className="mr-1.5"> {/* Adjusted spacing */}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <title>Delete Icon</title>
                        <path d="M6 2H10V3H6V2Z" fill="currentColor"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M4 5V13C4 13.5523 4.44772 14 5 14H11C11.5523 14 12 13.5523 12 13V5H4ZM6 7H7V12H6V7ZM10 7H9V12H10V7Z" fill="currentColor"/> {/* Added trash can lines for clarity */}
                        <path d="M3 4H13V5H3V4Z" fill="currentColor"/>
                    </svg>
                  </span>
                  Delete Draft
                </button>
              </div>
            </div>

            {/* Right side - Preview Image and Buttons */}
      
            <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-10 bg-gray-50 flex flex-col items-center justify-center lg:justify-between rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none">
              {/* Preview Image */}
              <div className="relative w-full aspect-square max-w-[250px] sm:max-w-xs md:max-w-sm mb-6 sm:mb-8 lg:mt-0 rounded-lg overflow-hidden">
                <Image
                  src={selectedCharacter !== null ? "/kids.jpg" : "/kids.jpg"} 
                  alt={selectedCharacter !== null ? `Character preview ${selectedCharacter + 1}` : "Character preview placeholder"}
                  fill
                  sizes="(max-width: 768px) 70vw, (max-width: 1024px) 40vw, 50vw" 
                  className={`object-cover transition-opacity duration-300 ${selectedCharacter !== null ? 'opacity-100' : 'opacity-50'}`} 
                />
              </div>

              {/* Action Buttons */}
           
              <div className="flex flex-col sm:flex-row w-full justify-center sm:justify-end items-center gap-3 sm:gap-4 md:gap-6 lg:gap-10 max-w-md mt-auto pt-4 lg:pt-0">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg w-full sm:w-auto"
                >
                  Try Again
                </button>
                <button
                  onClick={onClose} 
                  disabled={selectedCharacter === null} // Corrected disable logic
                  className={`px-6 sm:px-8 py-2 rounded-lg text-sm font-medium flex items-center justify-center transition-colors duration-200 w-full sm:w-auto ${ // Make full width on small screens
                    selectedCharacter !== null // Corrected condition check
                      ? 'bg-[#6100ff] text-white font-semibold hover:bg-[#5100d6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6100ff]' // Added focus state
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Save
                  <span className="ml-2 font-semibold">→</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateCharacterModal;