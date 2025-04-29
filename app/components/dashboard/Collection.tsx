'use client';

import React, { useState } from 'react';
import { Search, Plus, Star } from 'lucide-react';
import Card from './Card';
import { Button } from '../ui/button';

interface StoryItem {
  id: string;
  title: string;
  imageUrl: string;
  rating: number;
  views: number;
  type: 'story' | 'activity';
}

type UserRole = 'student' | 'bcba';

const Collection = () => {
  const [userRole, setUserRole] = useState<UserRole>('student');
  
  const items: StoryItem[] = [
    {
      id: '1',
      title: 'How to walk my dog lorem ipsum dolor amet?',
      imageUrl: '/dummyimage.jpg',
      rating: 4.5,
      views: 1.2,
      type: 'story'
    },
    {
      id: '2',
      title: 'How to walk my dog lorem ipsum dolor amet?',
      imageUrl: '/dummyimage.jpg',
      rating: 4.8,
      views: 2.1,
      type: 'story'
    },
    {
      id: '3',
      title: 'How to walk my dog lorem ipsum dolor amet?',
      imageUrl: '/dummyimage.jpg',
      rating: 4.3,
      views: 1.5,
      type: 'story'
    },
    {
      id: '4',
      title: 'How to walk my dog lorem ipsum dolor amet?',
      imageUrl: '/dummyimage.jpg',
      rating: 4.7,
      views: 1.8,
      type: 'activity'
    },
    {
      id: '5',
      title: 'How to walk my dog lorem ipsum dolor amet?',
      imageUrl: '/dummyimage.jpg',
      rating: 4.6,
      views: 1.3,
      type: 'activity'
    }
  ];

  const assessmentTypes = [
    'Motor Imitation',
    'Tacting',
    'Listener Responding',
    'Intraverbal'
  ];

  return (
    <div className="w-full max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
       
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <input
              type="text"
              placeholder="Search"
              className="w-full sm:w-[280px] pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6100FF] focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          <Button className="w-full sm:w-auto bg-[#6100FF] hover:bg-[#5000D5] text-white">
            <Plus className="h-4 w-4 mr-2" />
            Create
          </Button>
        </div>
      </div>

      {/* Stories Section */}
      <div className="mb-8">
        <h2 className="text-sm font-medium text-gray-900 mb-4">Stories</h2>
        <div className="flex gap-4 sm:gap-6">
          {items.filter(item => item.type === 'story').map((item) => (
            <Card
              key={item.id}
              id={item.id}
              title={item.title}
              image={item.imageUrl}
              rating={item.rating}
              category={item.type}
              type={item.type}
            />
          ))}
        </div>
      </div>

      {/* Activities Section */}
      <div className="mb-8">
        <h2 className="text-sm font-medium text-gray-900 mb-4">Activities</h2>
        <div className="flex gap-4 sm:gap-6">
          {items.filter(item => item.type === 'activity').map((item) => (
            <Card
              key={item.id}
              id={item.id}
              title={item.title}
              image={item.imageUrl}
              rating={item.rating}
              category={item.type}
              type={item.type}
            />
          ))}
        </div>
      </div>

      {/* Cognition Assessments Section - Only visible for BCBA */}
      {userRole === 'bcba' && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#6100FF] mb-2">Create Cognition Assessments</h2>
          <p className="text-gray-600 text-sm mb-4">
            Create cognition assessment supporting cards for all levels and types
          </p>
          
          {/* Assessment Types */}
          <div className="flex flex-wrap gap-2 mb-6">
            {assessmentTypes.map((type) => (
              <span
                key={type}
                className="px-4 py-2 bg-amber-50 text-amber-800 rounded-full text-sm"
              >
                {type}
              </span>
            ))}
          </div>

          <Button className="px-6 py-2 border-2 border-[#6100FF] text-[#6100FF] bg-transparent hover:bg-purple-50">
            Create Assessment
          </Button>

          {/* Level 1 Section */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Level 1 - Imitation Skills</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {/* Image Card */}
              <div className="relative group">
                <img
                  src="/placeholder-chair.jpg"
                  alt="Chair"
                  className="w-full aspect-square object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all rounded-lg" />
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm text-gray-600">23</span>
              </div>
              <span className="text-sm text-[#6100FF] font-medium">Level 01</span>
              <span className="text-sm text-gray-600">Motor Imitation</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">Chair and stool combination</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Collection; 