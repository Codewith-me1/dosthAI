'use client';

import React, { useEffect, useState } from 'react';
import { Search, Plus, Star } from 'lucide-react';
import Card from './Card';
import { Button } from '../ui/button';
import VideoPopup from './VideoPopup';
import AssessmentCard from './AssessmentCard';

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
  
  // Video popup state
  const [videoOpen, setVideoOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');

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




  // Handler for card click
  const handleCardClick = (item: StoryItem) => {
    // Replace with actual video URL and description as needed
    setVideoUrl('/sampleVideo.mp4');
    setVideoTitle(item.title);
    setVideoDescription('This is a sample description for the video.');
    setVideoOpen(true);
  };

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
              onClick={() => handleCardClick(item)}
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
              onClick={() => handleCardClick(item)}
            />
          ))}
        </div>
      </div>

      {/* Cognition Assessments Section - Only visible for BCBA */}
      {userRole === 'bcba' && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#6100FF] mb-2">Cognition Assessments</h2>
          <div className="flex flex-wrap gap-6 mt-6">
            <AssessmentCard
              title="Level 1 - Imitation Skills"
              images={['/chair1.jpg', '/chair2.jpg', '/chair3.jpg', '/chair4.jpg']}
              level="Level 01"
              type="Motor Imitation"
              description="Chair and stool combination"
              rating={4}
              likes={23}
              views={1}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Collection; 