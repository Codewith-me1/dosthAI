import React, { useState, useEffect } from 'react';

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
  username: string;
  onSave: (newUsername: string) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ open, onClose, username, onSave }) => {
  const [value, setValue] = useState(username);

  useEffect(() => {
    setValue(username);
  }, [username, open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-xs sm:max-w-sm mx-2 relative animate-fadeIn">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-lg font-bold mb-4">Edit Profile</h2>
        <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-2 mb-4 text-base focus:outline-none focus:ring-2 focus:ring-[#7B2FF2]"
        />
        <div className="flex justify-end gap-2 mt-2">
          <button
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-100"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 rounded-lg bg-[#7B2FF2] text-white font-semibold hover:bg-[#6100FF]"
            onClick={() => { onSave(value); onClose(); }}
            disabled={!value.trim()}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal; 