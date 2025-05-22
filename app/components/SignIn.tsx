"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleClick = () => {
    router.push("/explore");
  };
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle sign in form submission
  const handleSignInSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      email: "",
      password: "",
    };

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (Object.values(newErrors).some((error) => error !== "")) {
      setErrors(newErrors);
      return;
    }

    console.log("Sign in data:", formData);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left Section */}
      <div className="flex justify-center mt-10 md:hidden">
        <div className="login-image">
          <Image src="/logo.png" alt="Logo" width={120} height={40} />
        </div>
      </div>
      <div className="w-full md:w-1/2 bg-white p-1 flex flex-col justify-between min-h-screen relative hidden md:flex">
        <div className="w-full max-w-md mx-auto mt-10">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-6">
            <Image
              src="/logo.png"
              alt="Dosth AI"
              width={200}
              height={50}
              className="hidden md:block"
            />
          </div>

          {/* Heading */}
          <div className="mb-8  mt-10 lg:mt-0 p-2 lg:p-0">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Supporting
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Neurodivergent Community
            </h2>
          </div>
        </div>

        {/* Main Image */}
        <div className="w-[90%] lg:w-[70%]  max-w-xl lg:mx-auto relative ">
          <div className="-rotate-z-10">
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
      <div className="w-full md:w-1/2 md:p-10 bg-gray-50 p-10 flex items-center justify-center">
        <div className="w-full max-w-lg">
          <h2 className="text-4xl  font-bold text-[#3A3A3A] text-center mb-10">
            Welcome Back!
          </h2>

          <form onSubmit={handleSignInSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full text-black px-5 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full text-black px-5 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={
                  errors.password
                    ? "absolute right-4 top-1/3 -translate-y-1/2"
                    : "absolute right-4 top-1/2 -translate-y-1/2"
                }
              >
                {showPassword ? (
                  <Eye className="text-[#595959]" />
                ) : (
                  <EyeOff className="text-[#595959]" />
                )}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link
                href="/forgotpassword"
                className="text-[#2E74FF] font-medium hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              onClick={() => {
                handleClick();
              }}
              className=" w-full bg-[#6000fe]      text-white  py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Sign In
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-[#3A3A3A] mt-8 text-lg">
            Don't have an account?{" "}
            <Link href="/pages/signup" className="text-[#2E74FF] font-medium">
              Sign Up
            </Link>
          </p>
          <div className="flex bg-[#E0E0E0] w-full h-[1px] mt-4"></div>

          {/* Social Login Options */}
          <div className="mt-8 space-y-4">
            <button className="w-full text-black font-medium flex items-center justify-center gap-4 px-5 py-4 border border-gray-300 rounded-3xl hover:bg-gray-50 transition-all duration-200 hover:scale-[0.98] hover:shadow-sm active:scale-[0.97] active:shadow-inner">
              <Image
                src="/icons/google.svg"
                alt="Google"
                width={24}
                height={24}
              />
              <span>Sign in with Google</span>
            </button>
            <button className="w-full flex items-center text-black font-medium justify-center gap-4 px-5 py-4 border border-gray-300 rounded-3xl hover:bg-gray-50 transition-all duration-200 hover:scale-[0.98] hover:shadow-sm active:scale-[0.97] active:shadow-inner">
              <Image
                src="/icons/apple.svg"
                alt="Apple"
                width={24}
                height={24}
              />
              <span>Sign in with Apple</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
