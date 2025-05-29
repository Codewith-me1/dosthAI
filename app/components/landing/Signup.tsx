"use client";

import { FC, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
const AuthForm: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleGoogleSignIn = async () => {
    // await signInWithGoogle your auth logic
    router.push("/explore");
  };

  const handleSignIn = () => {
    router.push("/explore");
  };

  return (
    <div className="w-full 3xl:max-w-[150rem] mx-auto px-10 mt-10 md:px-20 lg:px-10 xl:px-60  ">
      <div className=" text-center ">
        <h2 className="text-4xl  font-semibold text-gray-900">
          <span className="text-[#A78BFA] font-bold">Create</span> your
          Collection today
        </h2>
      </div>
      <div className="max-w-9xl  w-full grid md:grid-cols-2 gap-10  p-6 md:p-12 ">
        {/* Left Form Section */}

        <div className="flex flex-col  gap-5">
          <input
            type="text"
            placeholder="Your Name"
            className="border border-[#D5D5D5] bg-[#FFFFFF] rounded-md px-4 py-2 outline-none"
          />
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-[#D5D5D5] bg-[#FFFFFF] rounded-md px-4 py-2 outline-none"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Choose Password"
              className="border border-[#D5D5D5] rounded-md bg-[#FFFFFF] px-4 py-2 w-full outline-none pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="border border-gray-300 bg-[#FFFFFF] rounded-md px-4 py-2 w-full outline-none pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <button
            onClick={() => {
              handleSignIn();
            }}
            className="bg-[#6100FF] text-white font-semibold py-2 rounded-md hover:opacity-90 transition-all"
          >
            Let's Go!
          </button>
        </div>

        {/* Right Auth Providers */}
        <div className="flex flex-col gap-4 justify-center items-center">
          <button
            onClick={() => {
              handleSignIn();
            }}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 bg-[#FFFFFF] rounded-3xl hover:bg-gray-50"
          >
            <img src="/icons/google.svg" alt="Google" className="w-5 h-5" />
            Sign in with Google
          </button>
          <button
            onClick={() => {
              handleSignIn();
            }}
            className="w-full  flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-3xl bg-[#FFFFFF] hover:bg-gray-50"
          >
            <img src="/icons/apple.svg" alt="Apple" className="w-5 h-5" />
            Sign in with Apple
          </button>
          <div className="w-full border-t my-4" />
          <div className="flex gap-4 justify-center">
            <img
              src="/landingImg/logos/googlestore.png"
              alt="Google Play"
              className="h-10"
            />
            <img
              src="/landingImg/logos/appstore.png"
              alt="App Store"
              className="h-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
