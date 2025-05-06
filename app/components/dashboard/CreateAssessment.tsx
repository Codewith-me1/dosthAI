import React, { useState } from 'react';
import { ArrowLeft, ArrowUp, Info, Search, ChevronDown } from 'lucide-react'; // Added Search and ChevronDown

// --- DUMMY DATA ---
const levels = ['Level 01', 'Level 02', 'Level 03'];
const assessmentTypes = ['Assessment Type', 'Motor Imitation', 'Tacting', 'Listener Responding', 'Intraverbal'];
const cardCounts = ['No of Cards', '1', '2', '3', '4', '5'];
const samplePromptsData = [
  'The Reluctant Alex',
  'Virtual School',
  'An Unexpected End',
  'The Reluctant Alex', // Assuming duplicates are intentional as per your original code
  'Virtual School',
];

// Dummy data for pre-generated card packs
const preGeneratedPacks = [
  {
    level: 'Level 1 - Imitation Skills',
    cards: [
      {
        id: '1a',
        images: ['/demo1.jpg', '/demo2.jpg', '/demo3.jpg', '/demo4.jpg'], // Updated
        title: 'Chair and stool combination',
        tags: ['Level 01', 'Motor Imitation'],
        rating: 5,
        userCount: 23,
        sharedCount: 11,
      },
      {
        id: '1b',
        images: ['/demo1.jpg', '/demo2.jpg', '/demo3.jpg', '/demo4.jpg'], // Updated
        title: '4 different types of playing balls',
        tags: ['Level 01', 'Motor Imitation'],
        rating: 4,
        userCount: 23,
        sharedCount: 11,
      },
      {
        id: '1c',
        images: ['/demo1.jpg', '/demo2.jpg', '/demo3.jpg', '/demo4.jpg'], // Updated
        title: 'Adult and Kids imitating Clapping',
        tags: ['Level 01', 'Motor Imitation'],
        rating: 5,
        userCount: 25,
        sharedCount: 11,
      },
    ],
  },
  {
    level: 'Level 2 - Tacting',
    cards: [
      {
        id: '2a',
        images: ['/demo1.jpg', '/demo2.jpg', '/demo3.jpg', '/demo4.jpg'], // Updated
        title: 'Chair and stool combination',
        tags: ['Level 01', 'Motor Imitation'],
        rating: 5,
        userCount: 23,
        sharedCount: 11,
      },
      {
        id: '2b',
        images: ['/demo1.jpg', '/demo2.jpg', '/demo3.jpg', '/demo4.jpg'], // Updated
        title: '4 different types of playing balls',
        tags: ['Level 01', 'Motor Imitation'],
        rating: 4,
        userCount: 23,
        sharedCount: 11,
      },
      {
        id: '2c',
        // If you specifically wanted this card to be different, based on your input:
        // images: ['/demo1.png', '/demo2.jpg', '/demo3.jpg', '/demo4.jpg'],
        // Otherwise, for consistency with "Change the Image to the /demo1.jpg , demo2.jpg, demo3.jpg, and demo4.jpg":
        images: ['/demo1.jpg', '/demo2.jpg', '/demo3.jpg', '/demo4.jpg'], // Updated
        title: 'Adult and Kids imitating Clapping',
        tags: ['Level 01', 'Motor Imitation'],
        rating: 5,
        userCount: 25,
        sharedCount: 11,
      },
    ],
  },
];

// --- Interfaces ---
interface CreateAssessmentProps {
  kidName: string;
  onBack?: () => void;
}

interface CardPackItemProps {
  images: string[];
  title: string;
  tags: string[];
  rating: number;
  userCount: number;
  sharedCount: number;
}

// --- Components ---

const CustomSelect: React.FC<{
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  primary?: boolean; // To differentiate styling
  className?: string;
}> = ({ value, onChange, options, primary = false, className = "" }) => (
  <div className={`relative ${className}`}>
    <select
      value={value}
      onChange={onChange}
      className={`appearance-none cursor-pointer px-4 py-2.5 pr-8 rounded-full font-semibold focus:outline-none border shadow-sm text-sm sm:text-base
        ${primary
          ? 'bg-[#F3F0FF] text-[#6100FF] border-[#A259FF]'
          : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
        }`}
    >
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
    <ChevronDown className={`w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${primary ? 'text-[#6100FF]' : 'text-gray-500'}`} />
  </div>
);

const CardPackItem: React.FC<CardPackItemProps> = ({ images, title, tags, rating, userCount, sharedCount }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.666rem)]">
    <div className="grid grid-cols-2 gap-0.5">
      {images.slice(0, 4).map((img, idx) => (
        <img key={idx} src={img} alt={`${title} image ${idx + 1}`} className="w-full h-20 object-cover" />
      ))}
    </div>
    <div className="p-3">
      <div className="flex flex-wrap gap-1 mb-1">
        {tags.map(tag => (
          <span key={tag} className="text-xs bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded-full font-medium">{tag}</span>
        ))}
      </div>
      <h4 className="font-semibold text-sm text-gray-800 mb-1 truncate">{title}</h4>
      <div className="flex items-center text-xs text-yellow-500 mb-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} className={`w-3 h-3 fill-current ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 .5l2.939 5.455 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
        ))}
      </div>
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>{userCount} Users</span>
        <span>{sharedCount} Shared</span>
      </div>
    </div>
  </div>
);


const CreateAssessment: React.FC<CreateAssessmentProps> = ({ kidName = "John Doe", onBack }) => { // Default kidName for demo
  const [level, setLevel] = useState(levels[0]);
  const [type, setType] = useState(assessmentTypes[0]);
  const [cardCount, setCardCount] = useState(cardCounts[0]);
  const [prompt, setPrompt] = useState(''); // Default prompt made empty to match image placeholder
  const [selectedSamplePrompt, setSelectedSamplePrompt] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // --- Event Handlers ---
  const handleSamplePromptClick = (sp: string) => {
    setSelectedSamplePrompt(sp);
    setPrompt(`Create a story about ${sp.toLowerCase()}`); // Optional: auto-fill main prompt
  };

  const handleSubmitPrompt = () => {
    if (prompt.trim()) {
      console.log("Submitting prompt:", prompt, { level, type, cardCount });
      // Add your API call or logic here
    }
  };

  return (
    <div className="w-full  mx-auto px-4 sm:px-6 py-6 sm:py-8 min-h-screen">
      {/* Breadcrumb and Heading */}
      <div className="flex items-center gap-2 mb-3">
        <button
          onClick={onBack}
          className="text-gray-500 hover:text-gray-700 p-1 rounded-md transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-xs text-gray-500">{kidName} / Create Assessment Cards</span>
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
        Create Assessment - <span className="text-[#6100FF]">{kidName}</span>
      </h1>

      {/* Preferences Section */}
      <div className="mb-8">
        <span className="block text-[#A259FF] font-semibold text-sm mb-2">Set your preferences</span>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 items-start sm:items-center">
          <CustomSelect value={level} onChange={e => setLevel(e.target.value)} options={levels} primary />
          <CustomSelect value={type} onChange={e => setType(e.target.value)} options={assessmentTypes} />
          <CustomSelect value={cardCount} onChange={e => setCardCount(e.target.value)} options={cardCounts} />
        </div>
      </div>

      {/* Prompt Input Section */}
      <div className="mb-8 p-1"> {/* Added small padding to prevent box shadow clipping */}
        <p className="text-center text-sm text-gray-600 mb-1">Create your first cards, write a simple prompt! For example.</p>
        <p className="text-center font-semibold text-gray-700 text-base mb-4">Create a cards with different chairs</p>
        <div className="w-full max-w-2xl mx-auto flex items-center bg-white border border-gray-300 rounded-xl px-3 py-2.5 shadow-sm focus-within:ring-2 focus-within:ring-[#6100FF] focus-within:border-[#6100FF]">
          <input
            type="text"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-800 text-base sm:text-lg placeholder:text-gray-400"
            placeholder="example: create a story about how to walk my dog"
          />
          <Info className="w-5 h-5 text-gray-400 mx-2 cursor-help" />
          <button
            onClick={handleSubmitPrompt}
            className="p-2 text-gray-500 hover:text-[#6100FF] bg-gray-100 hover:bg-[#F3F0FF] rounded-lg transition-colors"
            aria-label="Submit prompt"
            disabled={!prompt.trim()}
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Sample Prompts Section */}
      <div className="mb-10">
         <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">G</span> {/* Placeholder for the G icon */}
            <div>
                <h3 className="text-base font-semibold text-gray-800">Sample Prompts</h3>
                <p className="text-xs text-gray-500">Choose a sample prompt to create a story</p>
            </div>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {samplePromptsData.map((sp, idx) => (
            <button
              key={idx}
              onClick={() => handleSamplePromptClick(sp)}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-all
                ${selectedSamplePrompt === sp
                  ? 'bg-[#F3F0FF] text-[#6100FF] border-[#6100FF] shadow-md'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 focus:bg-[#F3F0FF] focus:text-[#6100FF] focus:border-[#6100FF]'
                }`}
            >
              <span className="text-base">&#x275B;</span> {sp} <span className="text-base">&#x275C;</span>
            </button>
          ))}
        </div>
      </div>

       {/* Pre-generated Card Packs Section */}
       <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Select form Pre-generated card packs</h2>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          <div className="flex flex-wrap gap-3 items-center">
             <CustomSelect value={levels[0]} onChange={() => {}} options={levels} primary />
             <CustomSelect value={assessmentTypes[0]} onChange={() => {}} options={assessmentTypes.slice(0,2)} /> {/* Using a subset for example */}
          </div>
          <div className="relative w-full sm:w-auto mt-2 sm:mt-0">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              className="w-full sm:w-64 pl-10 pr-4 py-2.5 rounded-full border border-gray-300 focus:ring-1 focus:ring-[#6100FF] focus:border-[#6100FF] outline-none text-sm"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {preGeneratedPacks.map((pack, index) => (
          <div key={index} className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">{pack.level}</h3>
            <div className="flex flex-wrap gap-4">
              {pack.cards
                .filter(card => card.title.toLowerCase().includes(searchTerm.toLowerCase())) // Basic search filter
                .map(card => (
                <CardPackItem key={card.id} {...card} />
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default CreateAssessment;

// --- Storybook or App entry point example ---
// const App = () => {
//   const handleBack = () => {
//     console.log("Back button clicked");
//   };
//   return (
//     <div className="bg-gray-100 p-4">
//       <CreateAssessment kidName="Alex Johnson" onBack={handleBack} />
//     </div>
//   );
// }
// export { App }; // You would render App in your main application file