'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';

// Types for our content
interface ContentItem {
    id: number;
    title: string;
    image: string;
    rating: number;
    type: 'story' | 'activity' | 'card';
    likes: number;
    comments: number;
}

// Dummy data
const dummyData: ContentItem[] = [
    {
        id: 1,
        title: "How to walk my dog, lorem ipsum dolor amet nyt",
        image: "/story1.jpg",
        rating: 4.5,
        type: 'story',
        likes: 24,
        comments: 8
    },
    {
        id: 2,
        title: "Teaching good habits to children",
        image: "/story2.jpg",
        rating: 4.8,
        type: 'story',
        likes: 32,
        comments: 12
    },
    {
        id: 3,
        title: "Daily routine activities",
        image: "/story3.jpg",
        rating: 4.2,
        type: 'activity',
        likes: 18,
        comments: 6
    },
    {
        id: 4,
        title: "Learning cards for kids",
        image: "/story4.jpg",
        rating: 4.6,
        type: 'card',
        likes: 45,
        comments: 15
    },
    // Add more dummy items as needed
];

export default function CarouselBoard() {
    const [activeTab, setActiveTab] = useState<'story' | 'activity' | 'card'>('story');
    const [searchQuery, setSearchQuery] = useState('');

    // Filter content based on active tab and search query
    const filteredContent = dummyData.filter(item => {
        const matchesTab = item.type === activeTab;
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    return (
        <div className="w-full max-w-[1920px] mx-auto">
            {/* Header with Search */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                {/* Navigation Tabs */}
                <div className="flex gap-8">
                    <button
                        onClick={() => setActiveTab('story')}
                        className={`text-lg font-medium ${
                            activeTab === 'story' ? 'text-[#6000fe]' : 'text-gray-600'
                        }`}
                    >
                        Stories
                    </button>
                    <button
                        onClick={() => setActiveTab('activity')}
                        className={`text-lg font-medium ${
                            activeTab === 'activity' ? 'text-[#6000fe]' : 'text-gray-600'
                        }`}
                    >
                        Activities
                    </button>
                    <button
                        onClick={() => setActiveTab('card')}
                        className={`text-lg font-medium ${
                            activeTab === 'card' ? 'text-[#6000fe]' : 'text-gray-600'
                        }`}
                    >
                        Cards
                    </button>
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-auto">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full md:w-[300px] pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#6000fe] focus:border-transparent"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredContent.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        {/* Card Image */}
                        <div className="relative aspect-[4/3]">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded text-xs font-medium uppercase">
                                {item.type}
                            </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-4">
                            <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
                                {item.title}
                            </h3>
                            
                            {/* Rating and Interactions */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, index) => (
                                        <svg
                                            key={index}
                                            className={`w-4 h-4 ${
                                                index < Math.floor(item.rating)
                                                    ? 'text-yellow-400'
                                                    : 'text-gray-300'
                                            }`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-500">
                                    <span>♥ {item.likes}</span>
                                    <span>💬 {item.comments}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Create Story Button */}
            <div className="mt-12 text-center">
                <h2 className="text-2xl font-bold mb-2">Lets create a <span className="text-[#6000fe]">story</span></h2>
                <p className="text-gray-600 mb-4">Create your first story, write a simple prompt for example:</p>
                <p className="text-gray-600 mb-6">Create a story about how to walk my dog</p>
                <button className="bg-[#6000fe] text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors inline-flex items-center gap-2">
                    Create
                    <span className="text-xl">→</span>
                </button>
            </div>
        </div>
    );
} 