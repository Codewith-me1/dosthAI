'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Database } from 'lucide-react';

interface HeaderProps {
    username?: string;
    credits?: number;
}

export default function Header({ username = 'Username', credits = 50 }: HeaderProps) {
    return (
        <header className="w-full h-[70px] border-b border-gray-200">
            <div className="max-w-[1920px] h-full mx-auto px-4 md:px-6 flex items-center justify-between">
                {/* Left section - Logo and Navigation */}
                <div className="flex items-center gap-8">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/logo.png"
                            alt="Dosth AI"
                            width={120}
                            height={40}
                            className="w-auto h-8"
                        />
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link 
                            href="/explore" 
                            className="text-[#6000fe] font-medium hover:opacity-80 transition-opacity"
                        >
                            Explore
                        </Link>
                        <Link 
                            href="/collections" 
                            className="text-gray-600 font-medium hover:text-gray-900 transition-colors"
                        >
                            My Collections
                        </Link>
                    </nav>
                </div>

                {/* Right section - Upgrade and User */}
                <div className="flex items-center gap-4">
                    {/* Upgrade Button */}
                    <Link
                        href="/upgrade"
                        className="hidden md:block text-[#2E74FF] font-medium hover:opacity-80 transition-opacity"
                    >
                        Upgrade
                    </Link>

                    {/* Credits */}
                    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-yellow-50 rounded-full">
                        <Database className='text-[#FFC700]'/>
                        <span className="text-md font-bold text-[#FFC700]">{credits}</span>
                        <ChevronDown className="w-4 h-4" />
                    </div>

                    {/* User Menu */}
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                            <span className="text-gray-700 font-medium">{username}</span>
                            <ChevronDown className="w-4 h-4 text-gray-600" />
                        </button>
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-[#6000fe]">
                                {username.charAt(0).toUpperCase()}
                            </span>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
} 