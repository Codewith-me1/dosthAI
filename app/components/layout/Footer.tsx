'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-gray-200">
            <div className="max-w-[1920px] mx-auto px-4 md:px-6 py-6">
            <div className='image'>
                    <Image
                            src="/logo.png"
                            alt="Dosth AI"
                            width={250}
                            height={40}
                            className="w-auto h-8"
                        />
                    </div>
                <div className="flex mt-4 flex-col md:flex-row items-center justify-between gap-4">
                    {/* Logo and Copyright */}
                    
                    <div className="flex items-center gap-2">
                       
                        <span className="text-sm text-gray-500">
                            © Copyright {currentYear}. All Rights Reserved by Dosth AI
                        </span>
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-6">
                        <Link 
                            href="/privacy-policy" 
                            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            Privacy Policy
                        </Link>
                        <Link 
                            href="/terms" 
                            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            Terms and Conditions
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
} 