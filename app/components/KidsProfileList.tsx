'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface KidProfile {
    name: string;
    age: string;
}

interface KidsProfileListProps {
    initialProfiles?: KidProfile[];
    onAddNewKid: () => void;
}

export default function KidsProfileList({ initialProfiles = [], onAddNewKid }: KidsProfileListProps) {
    const [profiles] = useState<KidProfile[]>(initialProfiles);
    const router = useRouter();

    const handleNext = () => {
        router.push('/');
    };

    const getInitials = (name: string) => {
        return name.charAt(0).toUpperCase();
    };

    return (
        <div className="min-h-screen flex flex-col items-center p-8 max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-[#6000fe] mb-4">Add your kids profile!</h1>
            <p className="text-lg text-gray-600 mb-8">
                by adding you kids profile you can create and save stories for them in dedicated folder
            </p>

            <div className="w-full space-y-4">
                {profiles.map((profile, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-[#F3F8FF] flex items-center justify-center text-[#6000fe] text-xl font-bold">
                                {getInitials(profile.name)}
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">{profile.name}</h3>
                                <p className="text-gray-500">{profile.age} y/o</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-2 text-blue-600 hover:text-blue-800">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                </svg>
                            </button>
                            <button className="p-2 text-red-600 hover:text-red-800">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M3 6h18" />
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}

                <button
                    onClick={onAddNewKid}
                    className="w-full py-3 px-4 border-2 border-[#6000fe] text-[#6000fe] rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#6000fe] hover:text-white transition-colors"
                >
                    Add another Kid
                    <span className="text-xl">+</span>
                </button>
            </div>

            <div className="mt-auto pt-8">
                <button
                    onClick={handleNext}
                    className="w-full max-w-xs bg-[#6000fe] text-white py-3 px-8 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                    Next
                </button>
            </div>
        </div>
    );
} 