"use client";
import React, { useState } from "react";
import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";
import Footer from "@/app/components/layout/Footer";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const maskedEmail = email
    ? email.replace(/(.{3}).*(@.*)/, "$1***$2")
    : "alex***@abc.com";

  return (
    <div className="flex min-h-screen flex-col  bg-white ">
      <div className="flex-1 flex flex-col items-center justify-center px-4 pt-10 pb-8">
        <div className="w-full max-w-7xl flex items-center mb-8">
          <Link
            href="/"
            className="flex  border-2 border-purple-500 p-1 mr-2 rounded-md items-center text-gray-500 hover:text-gray-800 text-lg"
          >
            <ArrowLeft className="w-6 h-6 text-purple-500 " />
          </Link>
          <span className="text-2xl font-semibold text-gray-800 ml-2">
            Forgot Password?
          </span>
        </div>
        {step === 1 ? (
          <form
            className="w-full max-w-md flex flex-col items-center gap-6 mt-20"
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setStep(2);
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A259FF] text-base"
              required
            />
            <button
              type="submit"
              className="w-full bg-[#6100FF] text-white py-2 rounded-md text-base font-semibold hover:bg-[#A259FF] transition-colors flex items-center justify-center gap-2"
            >
              Find Me <span className="ml-1">→</span>
            </button>
          </form>
        ) : (
          <div className="flex mt-20 flex-col items-center justify-center w-full">
            <Mail className="w-16 h-16 text-[#A259FF] mb-6" strokeWidth={1.5} />
            <div className="text-center max-w-lg mx-auto">
              <p className="text-gray-700 text-base mb-2">
                We have sent an email to{" "}
                <span className="font-semibold">{maskedEmail}</span> with link
                to update password.
                <br />
                After receiving the email, follow the link to update your
                password
              </p>
              <hr className="my-6 border-gray-200" />
              <p className="text-gray-500 text-sm">
                didn't receive email?{" "}
                <Link
                  href="#"
                  className="text-[#6100FF] font-medium hover:underline"
                >
                  Resend email
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
