'use client';

import React from 'react';
import { Plus } from 'lucide-react';

const AllView = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold">All Activities</h1>
          <p className="text-gray-600">Create and manage all your activities in one place</p>
        </div>
        <button className="px-4 py-2 bg-gray-200 rounded-lg flex items-center gap-2 hover:bg-gray-300 transition-colors">
          <Plus className="w-4 h-4" />
          Create
        </button>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Evening Routine Card */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
          <div className="h-48 bg-gradient-to-r from-orange-50 to-yellow-50 flex items-center justify-center">
            <img src="/placeholder-evening.jpg" alt="Evening Routine" className="h-32 w-32 object-contain" />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2">Evening Routine</h3>
            <p className="text-gray-600 text-sm mb-4">Wind down with calming evening activities</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-purple-600">8 Activities</span>
              <button className="text-sm text-blue-600 hover:text-blue-700">View Details →</button>
            </div>
          </div>
        </div>

        {/* Learning Activities Card */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
          <div className="h-48 bg-gradient-to-r from-green-50 to-teal-50 flex items-center justify-center">
            <img src="/placeholder-learning.jpg" alt="Learning Activities" className="h-32 w-32 object-contain" />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2">Learning Activities</h3>
            <p className="text-gray-600 text-sm mb-4">Educational activities for development</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-purple-600">15 Activities</span>
              <button className="text-sm text-blue-600 hover:text-blue-700">View Details →</button>
            </div>
          </div>
        </div>

        {/* Add New Card */}
        <button className="group bg-white rounded-xl border-2 border-dashed border-gray-200 hover:border-purple-200 p-6 flex flex-col items-center justify-center gap-4 transition-all">
          <div className="h-12 w-12 rounded-full bg-purple-50 flex items-center justify-center group-hover:bg-purple-100 transition-colors">
            <Plus className="h-6 w-6 text-purple-600" />
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-lg mb-1">Create New Activity</h3>
            <p className="text-gray-600 text-sm">Add a new activity or routine</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default AllView; 