"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import RequestDemoModal from "../components/landing/ContactModal";

interface DemoRequestDetails {
  name: string;
  email: string;
  role: string;
}

const navLinks = [{ name: "Pricing", href: "#pricing" }];

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleFormSubmit = (details: DemoRequestDetails) => {
    console.log("Demo Request Submitted:", details);
    // Add your submission logic here (e.g., API call)
    alert(
      `Thank you, ${details.name}! We will contact you at ${details.email} regarding your role as ${details.role}.`
    );
    handleCloseModal(); // Close modal after submission
  };

  return (
    <>
      <header className="w-full bg-[#F5F8FC] py-3 px-4 md:px-12 flex items-center justify-between shadow-sm sticky top-0 z-[900]">
        <div className="flex items-center gap-3">
          <Image
            src="/icons/logo.png"
            alt="Dosth AI Logo"
            width={40}
            height={40}
            className="rounded-xl"
          />
          <span className="text-xl font-bold text-gray-800">Dosth AI</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 lg:gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-600 font-medium hover:text-[#6100FF] transition"
            >
              {link.name}
            </a>
          ))}
          {/* "Contact Us" button to open the modal */}
          <button
            onClick={handleOpenModal}
            className="text-gray-600 font-medium hover:text-[#6100FF] transition"
            aria-label="Contact Us to request a demo"
          >
            Contact Us
          </button>
        </nav>
        <div className="flex items-center">
          <Link
            href="/pages/signin" // Adjust this path if necessary
            className="px-5 py-2 lg:px-6 rounded-lg bg-[#6100FF] text-white font-semibold shadow hover:bg-[#5200d4] transition text-center text-sm lg:text-base"
          >
            Sign In
          </Link>
          <button className="md:hidden ml-4 p-2 text-gray-600 hover:text-[#6100FF]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </header>

      {/* Render the Modal */}
      <RequestDemoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
      />
    </>
  );
}
