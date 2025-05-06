"use client";

import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function ChangePasswordPage() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col justify-between bg-white">
      {/* Top Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pt-10 pb-8">
        {/* Back Button and Heading */}
        <div className="w-full max-w-5xl flex items-center mb-8">
          <Link href="/" className="flex items-center text-gray-500 hover:text-gray-800 text-lg">
            <ArrowLeft className="w-6 h-6 mr-2" />
          </Link>
          <span className="text-2xl font-semibold text-gray-800 ml-2">Change Password</span>
        </div>
        {/* Form */}
        <form className="w-full max-w-md mx-auto bg-white rounded-lg p-6 flex flex-col gap-6 shadow-md">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showCurrent ? 'text' : 'password'}
                name="current"
                value={form.current}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A259FF] text-base"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowCurrent((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                tabIndex={-1}
              >
                {showCurrent ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">New Password</label>
            <div className="relative">
              <input
                type={showNew ? 'text' : 'password'}
                name="new"
                value={form.new}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A259FF] text-base"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowNew((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                tabIndex={-1}
              >
                {showNew ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Confirm New Password</label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                name="confirm"
                value={form.confirm}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A259FF] text-base"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                tabIndex={-1}
              >
                {showConfirm ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[#6100FF] text-white py-3 rounded-lg text-lg font-semibold hover:bg-[#A259FF] transition-colors mt-2"
          >
            Change Password
          </button>
        </form>
      </div>

    </div>
  );
} 