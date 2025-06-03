import React, { useState } from "react";
import { ArrowLeft, X, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import SaveModal from "../modals/SaveModal"; // Ensure this path is correct

interface Profile {
  id: string | number;
  initial: string;
  name: string;
  age: string;
  avatarColor?: string;
  avatarTextColor?: string;
}

const CardImagesPopup: React.FC<{
  open: boolean;
  images: string[];
  title: string;
  onClose: () => void;
}> = ({ open, images, title, onClose }) => {
  const [current, setCurrent] = useState(0);
  const [isSavedInMyStuff, setIsSavedInMyStuff] = useState(false);
  const [savingForProfileId, setSavingForProfileId] = useState<
    string | number | null
  >(null);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  if (!open) {
    return null;
  }

  const imagesPerSlide = 3;
  const chunkedImages: string[][] = [];
  if (images && images.length > 0) {
    for (let i = 0; i < images.length; i += imagesPerSlide) {
      chunkedImages.push(images.slice(i, i + imagesPerSlide));
    }
  }

  const totalSlides = chunkedImages.length > 0 ? chunkedImages.length : 1;

  const goLeft = () => {
    if (totalSlides <= 1) return;
    setCurrent((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };
  const goRight = () => {
    if (totalSlides <= 1) return;
    setCurrent((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const handleSaveForProfile = (profileId: string | number) => {
    console.log("Saving story for profile ID:", profileId);
    setSavingForProfileId(profileId);
  };

  const openSaveModal = () => {
    setIsSaveModalOpen(true);
  };

  const closeSaveModal = () => {
    setIsSaveModalOpen(false);
  };

  const handleSaveInMyStuffChange = (isChecked: boolean) => {
    setIsSavedInMyStuff(isChecked);
    console.log("Save in my stuff:", isChecked);
  };

  const mockProfilesData: Profile[] = [
    {
      id: "1",
      initial: "A",
      name: "Anu Raj",
      age: "5 y/o",
      avatarColor: "bg-purple-100",
      avatarTextColor: "text-purple-600",
    },
    {
      id: "2",
      initial: "A",
      name: "Alex Johns",
      age: "6 y/o",
      avatarColor: "bg-purple-100",
      avatarTextColor: "text-purple-600",
    },
    {
      id: "3",
      initial: "J",
      name: "Jhon Doe",
      age: "4 y/o",
      avatarColor: "bg-violet-100",
      avatarTextColor: "text-violet-600",
    },
  ];

  const currentImagesToDisplay =
    chunkedImages.length > 0 && chunkedImages[current]
      ? chunkedImages[current]
      : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-8xl mx-auto bg-transparent flex flex-col items-center">
        {/* Header */}
        <div className="w-full flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300 p-1 rounded-full hover:bg-white/10"
              aria-label="Close popup"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <span className="text-white text-lg font-semibold truncate max-w-xs sm:max-w-md md:max-w-lg">
              {title}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 text-2xl p-1 rounded-full hover:bg-white/10"
            aria-label="Close popup"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Slide Controls & Cards */}
        <div className="flex items-center justify-center mx-auto w-full gap-2 sm:gap-6 mb-6">
          <button
            onClick={goLeft}
            className="p-2 text-white hover:bg-white/10 rounded-full disabled:opacity-50"
            disabled={totalSlides <= 1}
            aria-label="Previous slide"
          >
            <ChevronLeft size={32} />
          </button>
          <div className="flex gap-2 sm:gap-4 w-full max-w-sm sm:max-w-md md:max-8xl lg:max-w-8xl justify-center flex-wrap min-h-[16rem] items-center">
            {currentImagesToDisplay.length > 0 ? (
              currentImagesToDisplay.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Slide ${current + 1} - Image ${idx + 1}`}
                  className="lg:w-[20rem] lg:h-[15rem] sm:w-[8rem] sm:h-[15rem] object-cover rounded-2xl border-4 border-yellow-400 shadow-md"
                />
              ))
            ) : (
              <div className="text-white text-center">
                No images to display.
              </div>
            )}
          </div>
          <button
            onClick={goRight}
            className="p-2 text-white hover:bg-white/10 rounded-full disabled:opacity-50"
            disabled={totalSlides <= 1}
            aria-label="Next slide"
          >
            <ChevronRight size={32} />
          </button>
        </div>

        {/* Save Button */}
        <div className="w-full flex justify-center md:justify-end">
          <button
            onClick={openSaveModal}
            className="flex items-center gap-2 px-5 py-2 sm:px-6 sm:py-2.5 border-2 border-white text-white rounded-lg font-semibold shadow hover:bg-white/20 transition-colors"
          >
            Save <Heart className="w-5 h-5 text-white fill-white" />
          </button>
        </div>
      </div>
      <SaveModal
        isOpen={isSaveModalOpen}
        onClose={closeSaveModal}
        profiles={mockProfilesData}
        onSaveForProfile={handleSaveForProfile}
        isSavedInMyStuff={isSavedInMyStuff}
        onSaveInMyStuffChange={handleSaveInMyStuffChange}
        selectedProfileId={savingForProfileId}
      />
    </div>
  );
};

// This is Second Main Create assessment Component
// Choosed to keep the cardsImagesPopup as a separate component to avoid circular dependencies and in same file to keep it readable manage the state if you want to use it in other components

import {
  ArrowUp,
  Info,
  Search,
  ChevronDown,
  HeartIcon,
  Eye,
} from "lucide-react"; // Added Search and ChevronDown
import { useRouter } from "next/navigation";

// --- DUMMY DATA ---
const levels = ["Level 01", "Level 02", "Level 03"];
const assessmentTypes = [
  "Assessment Type",
  "Motor Imitation",
  "Tacting",
  "Listener Responding",
  "Intraverbal",
];
const cardCounts = ["No of Cards", "1", "2", "3", "4", "5"];
const samplePromptsData = [
  "The Reluctant Alex",
  "Virtual School",
  "An Unexpected End",
  "The Reluctant Alex",
  "Virtual School",
];

const preGeneratedPacks = [
  {
    level: "Level 1 - Imitation Skills",
    cards: [
      {
        id: "1a",
        images: ["/demo1.jpg", "/demo2.jpg", "/demo3.jpg", "/demo4.jpg"], // Updated
        title: "Chair and stool combination",
        tags: ["Level 01", "Motor Imitation"],
        rating: 5,
        userCount: 23,
        sharedCount: 11,
      },
      {
        id: "1b",
        images: ["/demo1.jpg", "/demo2.jpg", "/demo3.jpg", "/demo4.jpg"], // Updated
        title: "4 different types of playing balls",
        tags: ["Level 01", "Motor Imitation"],
        rating: 4,
        userCount: 23,
        sharedCount: 11,
      },
      {
        id: "1c",
        images: ["/demo1.jpg", "/demo2.jpg", "/demo3.jpg", "/demo4.jpg"], // Updated
        title: "Adult and Kids imitating Clapping",
        tags: ["Level 01", "Motor Imitation"],
        rating: 5,
        userCount: 25,
        sharedCount: 11,
      },
    ],
  },
  {
    level: "Level 2 - Tacting",
    cards: [
      {
        id: "2a",
        images: ["/demo1.jpg", "/demo2.jpg", "/demo3.jpg", "/demo4.jpg"], // Updated
        title: "Chair and stool combination",
        tags: ["Level 01", "Motor Imitation"],
        rating: 5,
        userCount: 23,
        sharedCount: 11,
      },
      {
        id: "2b",
        images: ["/demo1.jpg", "/demo2.jpg", "/demo3.jpg", "/demo4.jpg"], // Updated
        title: "4 different types of playing balls",
        tags: ["Level 01", "Motor Imitation"],
        rating: 4,
        userCount: 23,
        sharedCount: 11,
      },
      {
        id: "2c",
        images: ["/demo1.jpg", "/demo2.jpg", "/demo3.jpg", "/demo4.jpg"], // Updated
        title: "Adult and Kids imitating Clapping",
        tags: ["Level 01", "Motor Imitation"],
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

interface Profile {
  id: string | number;
  initial: string;
  name: string;
  age: string;
  avatarColor?: string;
  avatarTextColor?: string;
}

// --- Components ---

const CustomSelect: React.FC<{
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  primary?: boolean;
  className?: string;
}> = ({ value, onChange, options, primary = false, className = "" }) => (
  <div className={`relative ${className}`}>
    <select
      value={value}
      onChange={onChange}
      className={`appearance-none cursor-pointer px-4 py-2 pr-8 rounded-full  focus:outline-none border shadow-sm text-sm sm:text-base
        ${
          primary
            ? "bg-[#DFCCFF] text-[#6100FF] border-[#A259FF]"
            : "bg-[#F3F8FF] text-gray-700 border-[#A8A8A8] hover:bg-gray-200"
        }`}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    <ChevronDown
      className={`w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${
        primary ? "text-[#6100FF]" : "text-gray-500"
      }`}
    />
  </div>
);

// --- CardPackItem ---
const CardPackItem: React.FC<
  CardPackItemProps & { onImageClick?: () => void }
> = ({ images, title, tags, rating, userCount, sharedCount, onImageClick }) => (
  <div
    className="rounded-lg overflow-hidden w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.666rem)] cursor-pointer"
    onClick={onImageClick}
  >
    <div className="grid grid-cols-2 gap-0.5">
      {images.slice(0, 4).map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`${title} image ${idx + 1}`}
          className="w-full h-20 object-cover"
        />
      ))}
    </div>
    <div className="flex m-2  justify-end text-xs text-gray-500 gap-5">
      <div className="conten flex items-center">
        <HeartIcon className="text-yellow-500 w-4 fill-yellow-500" />
        <span>{userCount} </span>
      </div>
      <div className="conten flex items-center">
        <Eye className="text-yellow-500" />
        <span>{sharedCount} </span>
      </div>
    </div>
    <div className="p-3">
      <div className="flex flex-wrap gap-1 mb-1">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-[#FFF4CC] text-purple-600 px-2 py-1 rounded-full font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
      <h4 className=" text-sm text-gray-800 mb-1 truncate">{title}</h4>
      <div className="flex items-center text-xs text-yellow-500 mb-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={`w-3 h-3 fill-current ${
              i < rating ? "text-yellow-400" : "text-gray-300"
            }`}
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 .5l2.939 5.455 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
      </div>
    </div>
  </div>
);

// --- Main Component ---
const CreateAssessment: React.FC<CreateAssessmentProps> = ({
  kidName = "John Doe",
  onBack,
}) => {
  const [level, setLevel] = useState(levels[0]);
  const [type, setType] = useState(assessmentTypes[0]);
  const [cardCount, setCardCount] = useState(cardCounts[0]);
  const [prompt, setPrompt] = useState("");
  const [selectedSamplePrompt, setSelectedSamplePrompt] = useState<
    string | null
  >(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [popupImages, setPopupImages] = useState<string[] | null>(null);
  const [popupTitle, setPopupTitle] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState(levels[0]);
  const [selectedAssessment, setSelectedAssessment] = useState(
    assessmentTypes[0]
  );
  const [popupOpen, setPopupOpen] = useState(false);
  const router = useRouter();

  // --- Event Handlers ---
  const handleSamplePromptClick = (sp: string) => {
    setSelectedSamplePrompt(sp);
    setPrompt(`Create a story about ${sp.toLowerCase()}`);
  };

  const handleSubmitPrompt = () => {
    if (prompt.trim()) {
      const params = new URLSearchParams({
        prompt,
        cardCount,
        assessmentType: type,
        level,
      });
      router.push(`/createCards?${params.toString()}`);
    }
  };

  const handleCardImageClick = (images: string[], title: string) => {
    setPopupImages(images);
    setPopupTitle(title);
    setPopupOpen(true);
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
        <span className="text-xs text-gray-500">
          {kidName} / Create Assessment Cards
        </span>
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
        Create Assessment - <span className="text-[#6100FF]">{kidName}</span>
      </h1>

      {/* Preferences Section */}
      <div className="mb-8">
        <span className="block text-[#A259FF] font-semibold text-sm mb-2">
          Set your preferences
        </span>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 items-start sm:items-center">
          <CustomSelect
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            options={levels}
            primary
          />
          <CustomSelect
            value={type}
            onChange={(e) => setType(e.target.value)}
            options={assessmentTypes}
          />
          <CustomSelect
            value={cardCount}
            onChange={(e) => setCardCount(e.target.value)}
            options={cardCounts}
          />
        </div>
      </div>

      {/* Prompt Input Section */}
      <div className="mb-8 p-1">
        {" "}
        {/* Added small padding to prevent box shadow clipping */}
        <p className="text-center text-sm text-gray-600 mb-1">
          Create your first cards, write a simple prompt! For example.
        </p>
        <p className="text-center font-semibold text-gray-700 text-base mb-4">
          Create a cards with different chairs
        </p>
        <div className="w-full max-w-2xl h-40 mx-auto flex-start flex items-center bg-white border border-gray-300 rounded-xl px-3 py-2.5 shadow-sm focus-within:ring-2 focus-within:ring-[#6100FF] focus-within:border-[#6100FF]">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
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
      <div className="border-1 border-[#D5D5D5] my-5"></div>
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <div>
            <h3 className="text-base font-semibold text-gray-800">
              Sample Prompts
            </h3>
            <p className="text-xs text-gray-500">
              Choose a sample prompt to create a story
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {samplePromptsData.map((sp, idx) => (
            <button
              key={idx}
              onClick={() => handleSamplePromptClick(sp)}
              className={`px-3 py-1.5 sm:px-4 sm:py-2  rounded-lg border text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-all
                ${
                  selectedSamplePrompt === sp
                    ? "bg-[#F3F0FF] text-[#6100FF] border-[#6100FF] shadow-md"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 focus:bg-[#F3F0FF] focus:text-[#6100FF] focus:border-[#6100FF]"
                }`}
            >
              <span className="text-base text-[#FFC700]">&#x275B;</span> {sp}{" "}
              <span className="text-base text-[#FFC700]">&#x275C;</span>
            </button>
          ))}
        </div>
      </div>

      {/* Pre-generated Card Packs Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Select form Pre-generated card packs
        </h2>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          <div className="flex flex-wrap gap-3 items-center">
            <CustomSelect
              value={selectedLevel}
              onChange={(e) => {
                setSelectedLevel(e.target.value);
              }}
              options={levels}
              primary
            />
            <CustomSelect
              value={selectedAssessment}
              onChange={(e) => {
                setSelectedAssessment(e.target.value);
              }}
              options={assessmentTypes.slice(0, 5)}
            />{" "}
            {/* Using a subset for example */}
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
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              {pack.level}
            </h3>
            <div className="flex flex-wrap gap-4">
              {pack.cards
                .filter((card) =>
                  card.title.toLowerCase().includes(searchTerm.toLowerCase())
                ) // Basic search filter
                .map((card) => (
                  <CardPackItem
                    key={card.id}
                    {...card}
                    onImageClick={() =>
                      handleCardImageClick(card.images, card.title)
                    }
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
      {/* Popup Modal */}
      <CardImagesPopup
        open={popupOpen}
        images={popupImages || []}
        title={popupTitle}
        onClose={() => setPopupOpen(false)}
      />
    </div>
  );
};

export default CreateAssessment;
