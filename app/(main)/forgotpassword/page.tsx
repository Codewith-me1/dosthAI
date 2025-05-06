import React from 'react';
import { ArrowLeft, Mail } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordSent() {
  // Dummy masked email for demo
  const maskedEmail = 'alex***@abc.com';

  return (
    <div className="flex flex-col justify-between bg-white">
      {/* Top Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pt-10 pb-8">
        {/* Back Button */}
        <div className="w-full max-w-7xl flex items-center mb-8">
          <Link href="/" className="flex border border-2  border-purple-500  p-1 mr-2 rounded-md items-center text-gray-500 hover:text-gray-800 text-lg">
            <ArrowLeft className="w-6 h-6 text-purple-500 " />
          </Link>
          <span className="text-2xl font-semibold text-gray-800 ml-2">Forgot Password?</span>
        </div>
        {/* Mail Icon */}
        <div className="flex mt-20 flex-col items-center justify-center w-full">
          <Mail className="w-16 h-16 text-[#A259FF] mb-6" strokeWidth={1.5} />
          <div className="text-center max-w-lg mx-auto">
            <p className="text-gray-700 text-base mb-2">
              We have sent an email to <span className="font-semibold">{maskedEmail}</span> with link to update password.<br />
              After receiving the email, follow the link to update your password
            </p>
            <hr className="my-6 border-gray-200" />
            <p className="text-gray-500 text-sm">
              didn't receive email?{' '}
              <Link href="#" className="text-[#6100FF] font-medium hover:underline">Resend email</Link>
            </p>
          </div>
        </div>
      </div>
    
    </div>
  );
} 