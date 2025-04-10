'use client';

import { useState } from 'react';
import Image from 'next/image';
import KidsProfile, { KidsProfileData } from './KidsProfile';

interface UserDetailsProps {
    onBack: () => void;
    onSubmit: (data: UserDetailsData) => void;
}

export interface UserDetailsData {
    role: string;
    ageRange: string;
    country: string;
    kidsProfile?: KidsProfileData;
}

export default function UserDetails({ onBack, onSubmit }: UserDetailsProps) {
    const [currentStep, setCurrentStep] = useState<'details' | 'kidsProfile'>('details');
    const [userDetailsData, setUserDetailsData] = useState<UserDetailsData>({
        role: '',
        ageRange: '',
        country: ''
    });

    const roles = [
        { id: 'parent', label: 'Parent' },
        { id: 'therapist', label: 'Therapist' },
        { id: 'speechPathologist', label: 'Speech Pathologist' },
        { id: 'specialEdTeacher', label: 'Special Ed Teacher' },
        { id: 'kid', label: 'Kid' }
    ];

    const ageRanges = [
        { id: 'lessThan25', label: 'Less than 25' },
        { id: '25-35', label: '25-35' },
        { id: '35-45', label: '35-45' },
        { id: '45-55', label: '45-55' },
        { id: '55Plus', label: '55+' }
    ];

    const handleDetailsSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setUserDetailsData(userDetailsData);
        setCurrentStep('kidsProfile');
    };

    const handleKidsProfileSubmit = (kidsData: KidsProfileData) => {
        // Combine user details with kids profile data
        onSubmit({
            ...userDetailsData,
            kidsProfile: kidsData
        });
    };

    if (currentStep === 'kidsProfile') {
        return (
            <KidsProfile
                onBack={() => setCurrentStep('details')}
                onSubmit={handleKidsProfileSubmit}
            />
        );
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row overflow-x-hidden ">
            {/* Left Section */}
            <div className="w-full md:w-1/2 bg-white p-8 flex flex-col justify-between min-h-screen relative hidden md:flex">
                <div className="w-full max-w-md mx-auto mt-10">
                    {/* Logo */}
                    <div className="flex items-center gap-2 mb-6">
                        <Image
                            src="/logo.png"
                            alt="Dosth AI"
                            width={200}
                            height={40}
                            className="rounded-xl"
                        />
                    </div>

                    {/* Heading */}
                    <div className="mb-8 w-full">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Supporting</h1>
                        <h2 className="text-3xl w-full md:text-4xl font-bold text-gray-800">Neurodivergent Community</h2>
                    </div>
                </div>

                {/* Main Image */}
                <div className="w-full max-w-xl mx-auto relative overflow-hidden">
  <div className=" -rotate-z-10 mt-10">
    <Image
      src="/catimage.png"
      alt="Cool Cat"
      width={600}
      height={600}
      className="select-none"
      priority
    />
  </div>
</div>

            </div>

            {/* Right Section */}
            <div className="w-full mt-[-30px] md:w-1/2 bg-gray-50 p-8 flex items-center justify-center">
                <div className="w-full max-w-lg">
                    <h2 className="text-4xl font-bold text-[#6000fe] mb-4">Welcome!</h2>
                    <p className="text-lg text-gray-600 mb-8">Let us know more about your use, for your customized needs</p>

                    <form onSubmit={handleDetailsSubmit} className="space-y-8">
                        {/* Role Selection */}
                        <div className="space-y-4">
                            <label className="block text-lg font-medium text-gray-700">You are a:</label>
                            <div className="grid grid-cols-2 gap-2">
                                {roles.map((role) => (
                                    <label
                                        key={role.id}
                                        className={`flex items-center p-3 rounded-lg  cursor-pointer transition-all
                                            ${userDetailsData.role === role.id 
                                                ? 'border-[#6000fe] ' 
                                                : 'border-gray-200 hover:border-[#6000fe]'}`}
                                    >
                                        <input
                                            type="radio"
                                            name="role"
                                            value={role.id}
                                            checked={userDetailsData.role === role.id}
                                            onChange={(e) => setUserDetailsData({...userDetailsData, role: e.target.value})}
                                            className="hidden"
                                        />
                                        <div className="flex items-center gap-2">
                                            <div className={`w-4 h-4 rounded-full border  flex items-center justify-center
                                                ${userDetailsData.role === role.id ? 'border-[#6000fe]' : 'border-[#6000fe]'}`}>
                                                {userDetailsData.role === role.id && (
                                                    <div className="w-2 h-2 rounded-full bg-[#6000fe]" />
                                                )}
                                            </div>
                                            <span className="text-gray-700">{role.label}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Age Range Selection */}
                        <div className="space-y-4">
                            <label className="block text-lg font-medium text-gray-700">Select an age range:</label>
                            <div className="grid grid-cols-2 gap-2">
                                {ageRanges.map((age) => (
                                    <label
                                        key={age.id}
                                        className={`flex items-center p-3 rounded-lg cursor-pointer transition-all
                                            ${userDetailsData.ageRange === age.id 
                                                ? 'border-[#6000fe] ' 
                                                : 'border-gray-200 hover:border-[#6000fe]'}`}
                                    >
                                        <input
                                            type="radio"
                                            name="ageRange"
                                            value={age.id}
                                            checked={userDetailsData.ageRange === age.id}
                                            onChange={(e) => setUserDetailsData({...userDetailsData, ageRange: e.target.value})}
                                            className="hidden"
                                        />
                                        <div className="flex items-center gap-2">
                                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center
                                                ${userDetailsData.ageRange === age.id ? 'border-[#6000fe]' : 'border-[#6000fe]'}`}>
                                                {userDetailsData.ageRange === age.id && (
                                                    <div className="w-2 h-2 rounded-full bg-[#6000fe]" />
                                                )}
                                            </div>
                                            <span className="text-gray-700">{age.label}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Country Selection */}
                        <div className="space-y-4">
                            <label className="block text-lg font-medium text-gray-700">Country</label>
                            <select
                                value={userDetailsData.country}
                                onChange={(e) => setUserDetailsData({...userDetailsData, country: e.target.value})}
                                className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6000fe]"
                            >
                                <option value="">Select Country</option>
                                <option value="US">United States</option>
                                <option value="UK">United Kingdom</option>
                                <option value="CA">Canada</option>
                                <option value="AU">Australia</option>
                               
                            </select>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex gap-4 justify-end">
                          
                            <button
                                type="submit"
                                className="w-1/2 bg-[#6000fe] text-white py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                            >
                                Next
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}