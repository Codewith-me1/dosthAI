import React, { useState, FormEvent, MouseEvent } from "react";
import { X } from "lucide-react"; // Using lucide-react for the close icon

interface RequestDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (details: { name: string; email: string; role: string }) => void;
  // Optional: To set initial values if needed
  initialName?: string;
  initialEmail?: string;
  initialRole?: string;
}

const RequestDemoModal: React.FC<RequestDemoModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialName = "",
  initialEmail = "",
  initialRole = "",
}) => {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [role, setRole] = useState(initialRole);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Basic client-side validation
    if (!name.trim() || !email.trim() || !role.trim()) {
      alert("Please fill in all fields."); // Replace with a more user-friendly notification if desired
      return;
    }
    onSubmit({ name, email, role });
    // Typically, the parent component would handle closing the modal
    // and clearing fields upon successful submission.
  };

  // Close modal on backdrop click
  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center g-black/30 backdrop-blur-sm bg-opacity-60 p-4 transition-opacity duration-300 ease-in-out"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="requestDemoModalTitle"
    >
      <div
        className="bg-white rounded-xl shadow-2xl p-6 pt-8 sm:p-8 sm:pt-10 w-full max-w-lg relative transform transition-all duration-300 ease-in-out scale-100 opacity-100"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal content
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <h2
          id="requestDemoModalTitle"
          className="text-[28px] sm:text-[32px] font-bold text-gray-900 mb-1"
        >
          Request a Demo
        </h2>
        <p className="text-[15px] text-gray-600 mb-6 sm:mb-7 leading-relaxed">
          drop your details, and w’ll get in touch with you to book a slot
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <p className="text-base font-semibold text-gray-900 mb-4">
            Your Details
          </p>

          <div className="space-y-4">
            <div>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400 text-gray-800 text-sm sm:text-base transition-shadow"
              />
            </div>

            <div>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" // Basic HTML5 email validation
                title="Please enter a valid email address."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400 text-gray-800 text-sm sm:text-base transition-shadow"
              />
            </div>

            <div>
              <input
                type="text"
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Your Role"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400 text-gray-800 text-sm sm:text-base transition-shadow"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-7 sm:mt-8 bg-[#6200EE] hover:bg-[#5600E0] text-white font-semibold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6200EE] focus:ring-offset-2 transition-colors text-base"
          >
            Request a Demo
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestDemoModal;

/*
// --- Example Usage (e.g., in a page component like pages/index.tsx or app/page.tsx) ---

// Make sure to mark the parent component as a client component if using Next.js App Router
// by adding 'use client'; at the top of the file.

// import { useState } from 'react'; // Already imported if in the same file as RequestDemoModal for testing

const MyPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleFormSubmit = (details: { name: string; email: string; role: string }) => {
    console.log('Demo Request Details:', details);
    // Here you would typically make an API call to submit the details
    // For example:
    // fetch('/api/request-demo', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(details),
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log('Success:', data);
    //   alert(`Thank you, ${details.name}! We'll be in touch.`);
    //   handleCloseModal(); // Close modal on success
    // })
    // .catch((error) => {
    //   console.error('Error:', error);
    //   alert('There was an error submitting your request. Please try again.');
    // });

    // For this example, we'll just log and show an alert
    alert(`Thank you, ${details.name}! We will contact you at ${details.email} regarding your role as ${details.role}.`);
    handleCloseModal(); // Close modal after submission
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-10">
      <button
        onClick={handleOpenModal}
        className="px-8 py-3 bg-purple-600 text-white text-lg font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-md"
      >
        Request a Demo
      </button>

      <RequestDemoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        // You can pass initial values if needed:
        // initialName="John Doe"
      />
    </div>
  );
};

// To use MyPage, you would export it and render it in your application.
// For example, if this is your main page in Next.js App router (app/page.tsx):
// export default MyPage;
*/
