import React from "react";
import { X, Heart, ChevronRight, Check } from "lucide-react"; // Using Check for the checkbox

interface Profile {
  id: string | number;
  initial: string;
  name: string;
  age: string;
  avatarColor?: string; // e.g., 'bg-purple-100 text-purple-700'
  avatarTextColor?: string; // e.g., 'text-purple-700'
}

interface SaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  profiles: Profile[];
  /**
   * Called when the 'Save' button for a profile is clicked.
   * Passes the ID of the profile to be saved for.
   */
  onSaveForProfile: (profileId: string | number) => void;
  /**
   * Called when the 'Save in my stuff' checkbox state changes.
   */
  onSaveInMyStuffChange: (isChecked: boolean) => void;
  /**
   * Current checked state of the 'Save in my stuff' checkbox.
   */
  isSavedInMyStuff: boolean;
  /**
   * Optional: ID of the profile currently selected as the save target.
   * This can be used to visually indicate the active selection on the "Save" button.
   */
  selectedProfileId?: string | number | null;
}

const SaveModal: React.FC<SaveModalProps> = ({
  isOpen,
  onClose,
  profiles,
  onSaveForProfile,
  onSaveInMyStuffChange,
  isSavedInMyStuff,
  selectedProfileId,
}) => {
  if (!isOpen) {
    return null;
  }

  const defaultAvatarColors = [
    { bg: "bg-purple-100", text: "text-purple-600" }, // Light purple as in 'Anu Raj'
    { bg: "bg-violet-100", text: "text-violet-600" }, // Slightly different purple for 'Jhon Doe'
    { bg: "bg-pink-100", text: "text-pink-600" },
    { bg: "bg-blue-100", text: "text-blue-600" },
  ];

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 transition-opacity duration-300"
      onClick={onClose} // Optional: close modal on overlay click
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-[360px] transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Header */}
        <div className="flex justify-between items-center pt-5 px-5 pb-3">
          <h2 className="text-xl font-semibold text-gray-900">Save for</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors rounded-full p-1 -mr-1"
            aria-label="Close modal"
          >
            <X size={22} />
          </button>
        </div>

        {/* Sub-header */}
        <div className="px-5 pb-4">
          <p className="text-sm text-gray-500">Select a profile to save for</p>
        </div>

        {/* Profiles List */}
        <div className="px-2 space-y-1 max-h-[250px] overflow-y-auto thin-scrollbar">
          {profiles.map((profile, index) => {
            const avatarStyle =
              profile.avatarColor && profile.avatarTextColor
                ? {
                    backgroundColor: profile.avatarColor,
                    color: profile.avatarTextColor,
                  }
                : {
                    backgroundColor: defaultAvatarColors[
                      index % defaultAvatarColors.length
                    ].bg.replace("bg-", ""), // for inline style
                    color: defaultAvatarColors[
                      index % defaultAvatarColors.length
                    ].text.replace("text-", ""), // for inline style
                  };
            const avatarClasses =
              profile.avatarColor && profile.avatarTextColor
                ? `${profile.avatarColor} ${profile.avatarTextColor}`
                : `${
                    defaultAvatarColors[index % defaultAvatarColors.length].bg
                  } ${
                    defaultAvatarColors[index % defaultAvatarColors.length].text
                  }`;

            const isSelected = selectedProfileId === profile.id;

            return (
              <div
                key={profile.id}
                className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-gray-50 cursor-pointer group"
                onClick={() => onSaveForProfile(profile.id)} // Allow clicking the whole row to save
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xl font-medium shrink-0 ${avatarClasses}`}
                  >
                    {profile.initial}
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium text-gray-800 text-sm">
                      {profile.name}
                    </p>
                    <p className="text-xs text-gray-500">{profile.age}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent row click if button is distinct
                      onSaveForProfile(profile.id);
                    }}
                    className={`flex items-center space-x-1 py-1.5 px-3 rounded-full text-xs font-medium transition-all
                                      ${
                                        isSelected
                                          ? "bg-purple-500 text-white cursor-default ring-2 ring-purple-300"
                                          : "text-purple-600 hover:bg-purple-50 group-hover:bg-purple-50 active:bg-purple-100 border border-purple-200 group-hover:border-purple-300"
                                      }`}
                  >
                    <Heart
                      size={14}
                      className={isSelected ? "fill-current" : ""}
                    />
                    <span>Save</span>
                  </button>
                  <ChevronRight
                    size={18}
                    className="text-gray-400 group-hover:text-gray-500"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div className="px-5 pt-3 pb-1">
          <hr className="border-gray-200" />
        </div>

        {/* Save in my stuff */}
        <div className="p-5">
          <label
            htmlFor="saveInMyStuff"
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <input
              type="checkbox"
              id="saveInMyStuff"
              checked={isSavedInMyStuff}
              onChange={(e) => onSaveInMyStuffChange(e.target.checked)}
              className="sr-only peer" // Hide default checkbox
            />
            <div
              className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-all duration-150
                            ${
                              isSavedInMyStuff
                                ? "bg-purple-600 border-purple-600"
                                : "border-gray-400 group-hover:border-purple-500"
                            }`}
            >
              {isSavedInMyStuff && (
                <Check size={14} className="text-white" strokeWidth={3} />
              )}
            </div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
              Save in my stuff
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SaveModal;

/*
// Example Usage:
// Make sure to import useState from 'react' if using this example.

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [savedToMyStuff, setSavedToMyStuff] = useState(true);
  const [savingForProfileId, setSavingForProfileId] = useState<string | number | null>('1'); // Example: Anu Raj is pre-selected

  const mockProfilesData: Profile[] = [
    { id: '1', initial: 'A', name: 'Anu Raj', age: '5 y/o', avatarColor: 'bg-purple-100', avatarTextColor: 'text-purple-600' },
    { id: '2', initial: 'A', name: 'Alex Johns', age: '6 y/o', avatarColor: 'bg-purple-100', avatarTextColor: 'text-purple-600' },
    { id: '3', initial: 'J', name: 'Jhon Doe', age: '4 y/o', avatarColor: 'bg-violet-100', avatarTextColor: 'text-violet-600' },
    { id: '4', initial: 'S', name: 'Samira K', age: '7 y/o', avatarColor: 'bg-pink-100', avatarTextColor: 'text-pink-600' },
  ];

  const handleSaveProfile = (profileId: string | number) => {
    console.log('Saving for profile ID:', profileId);
    setSavingForProfileId(profileId);
    // setIsModalOpen(false); // Optionally close modal after selection
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-10">
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Open Save Modal
      </button>
      <SaveModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        profiles={mockProfilesData}
        onSaveForProfile={handleSaveProfile}
        isSavedInMyStuff={savedToMyStuff}
        onSaveInMyStuffChange={setSavedToMyStuff}
        selectedProfileId={savingForProfileId}
      />
    </div>
  );
};
*/
