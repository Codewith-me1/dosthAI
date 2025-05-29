"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import UserDetails, { UserDetailsData } from "./UserDetails";
import KidsProfile, { KidsProfileData } from "./KidsProfile";

type Step = "signup" | "details" | "kidsProfile";

interface CompleteRegistrationData {
  signup: {
    name: string;
    email: string;
    password?: string;
    socialProvider?: "google" | "apple";
  };
  userDetails?: UserDetailsData;
  kidsProfile?: KidsProfileData;
}

export default function SignUp() {
  // Step state
  const [currentStep, setCurrentStep] = useState<Step>("signup");

  // Complete registration data
  const [registrationData, setRegistrationData] =
    useState<CompleteRegistrationData>({
      signup: {
        name: "",
        email: "",
        password: "",
      },
    });

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Error state

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear errors when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validate email format
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate password strength
  const isValidPassword = (password: string) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  // Handle signup form submission
  const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset errors
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Validate email
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!isValidPassword(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number";
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Check if there are any errors
    if (Object.values(newErrors).some((error) => error !== "")) {
      setErrors(newErrors);
      return;
    }

    // If validation passes, save signup data and proceed to next step
    setRegistrationData((prev) => ({
      ...prev,
      signup: {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      },
    }));

    //USE BELOW CODE ONLY IF YOU ARE USING FIREBASE AUTH and FIRESTORE TO STORE DATA

    // Here you would typically make an API call to sign in the user
    // createUserWithEmailAndPassword is Used with ta React Libaray with Firebase Auth to Create User

    // const [createUserWithEmailAndPassword, user, loading, error] =
    // useCreateUserWithEmailAndPassword(auth);

    // const handleSubmit = (e: FormEvent) => {
    //     e.preventDefault();
    //     createUserWithEmailAndPassword(formData.email,formData.password);
    //
    //
    //   };
    //saveDB is a Database.ts file should be in the main folder firebase/auth/database.ts below function
    // saveUserData is Used to Make Sure When User CreateUserWithEmailAndPassWord Also sends the Name

    // Also
    // useEffect(() => {
    //     if (user) {
    //       console.log("User Created Successfully:", user);

    //       saveUserData(user.user.uid, {
    //         email: user.user.email,
    // name:formData.name
    //
    //         displayName: user.user.displayName,
    //         createdAt: new Date(),
    //       });
    //       console.log("Saved to Db Also");
    //       router.push("/");
    //     }
    //   }, [user, router]);

    //

    setCurrentStep("details");
  };

  // Handle user details submission
  const handleUserDetailsSubmit = (detailsData: UserDetailsData) => {
    setRegistrationData((prev) => ({
      ...prev,
      userDetails: detailsData,
    }));
    // If user is a parent, proceed to kids profile
    if (detailsData.role === "parent") {
      setCurrentStep("kidsProfile");
    } else {
      // Otherwise, complete registration
      handleCompleteRegistration({
        ...registrationData,
        userDetails: detailsData,
      });
    }
  };

  // Handle kids profile submission
  const handleKidsProfileSubmit = (kidsData: KidsProfileData) => {
    const completeData = {
      ...registrationData,
      kidsProfile: kidsData,
    };
    handleCompleteRegistration(completeData);
  };

  // Handle complete registration
  const handleCompleteRegistration = async (data: CompleteRegistrationData) => {
    // Here you would typically make an API call to register the user
    console.log("Complete registration data:", data);
  };

  // Handle social sign in
  const handleSocialSignIn = async (provider: "google" | "apple") => {
    // Here you would typically handle the social authentication
    // For example with Firebase:
    // const result = await signInWithPopup(auth, provider === 'google' ? googleProvider : appleProvider);

    // After successful social auth, save the data and move to next step
    setRegistrationData((prev) => ({
      ...prev,
      signup: {
        name: "", // This will be filled from the social provider
        email: "", // This will be filled from the social provider
        socialProvider: provider,
      },
    }));

    // Move to user details step
    setCurrentStep("details");
  };

  // Render appropriate step
  if (currentStep === "details") {
    return (
      <UserDetails
        onBack={() => setCurrentStep("signup")}
        onSubmit={handleUserDetailsSubmit}
      />
    );
  }

  if (currentStep === "kidsProfile") {
    return <KidsProfile onBack={() => setCurrentStep("details")} />;
  }

  // Render signup form
  return (
    <div className="min-h-screen flex flex-col md:flex-row  overflow-hidden  ">
      {/* Left Section */}

      <div className="flex  justify-center mt-10 md:hidden ">
        <div className="login-image">
          <Image src="/icons/logo.png" alt="Logo" width={120} height={40} />
        </div>
      </div>
      <div className="w-full bg-[#FBFDFF] md:w-1/2 border border-r-1 border-[#D5D5D5] p-1  flex flex-col justify-between min-h-screen relative hidden md:flex">
        <div className="w-full max-w-md mx-auto mt-10 ">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-6 ">
            <Image
              src="/icons/logo.png"
              alt="Dosth AI"
              width={200}
              height={50}
              className=" hidden md:block"
            />
          </div>

          {/* Heading */}
          <div className="mb-8 mt-10 lg:mt-0 p-2   lg:p-0">
            <h1 className="text-3xl md:text-4xl leading-[3rem]  text-gray-800 mb-2">
              Supporting
            </h1>
            <h2 className="text-3xl md:text-4xl  leading-[3rem] text-gray-800">
              Neurodivergent Community
            </h2>
          </div>
        </div>

        {/* Main Image - Positioned at bottom */}
        <div className="w-[90%] lg:w-[100%] max-w-xl lg:mx-auto relative ">
          <div className=" -rotate-z-10 ">
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
      <div className="w-full md:w-1/2 bg-white p-10 flex items-center justify-center">
        <div className="w-full max-w-lg">
          {" "}
          {/* Increased from max-w-md to max-w-lg */}
          <h2 className="text-4xl font-bold text-[#3A3A3A] text-center mb-10">
            Create your collection today!
          </h2>
          <form onSubmit={handleSignupSubmit} className="space-y-6">
            {" "}
            {/* Increased spacing */}
            {/* Name Input */}
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full text-black px-5 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
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
                placeholder="Choose Password"
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
            {/* Confirm Password Input */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full text-black px-5 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={
                  errors.password
                    ? "absolute right-4 top-1/3 -translate-y-1/2"
                    : "absolute right-4 top-1/2 -translate-y-1/2"
                }
              >
                {showConfirmPassword ? (
                  <Eye className="text-[#595959]" />
                ) : (
                  <EyeOff className="text-[#595959]" />
                )}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#6000fe] text-white py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Let's Go!
            </button>
          </form>
          {/* Sign In Link */}
          <p className="text-center text-[#3A3A3A] mt-8 text-lg">
            Already have an account with us ?{" "}
            <Link href="/pages/signin" className="text-[#2E74FF] font-medium">
              Sign In
            </Link>
          </p>
          <div className="flex bg-[#E0E0E0] w-full h-[1px] mt-4"></div>
          {/* Social Login Options */}
          <div className="mt-8 space-y-4">
            <button
              onClick={() => handleSocialSignIn("google")}
              type="button"
              className="w-full text-black font-medium flex items-center justify-center gap-4 px-5 py-4 border-2 border-gray-300 rounded-4xl hover:bg-gray-50 transition-all duration-200 hover:scale-[0.98] hover:shadow-sm active:scale-[0.97] active:shadow-inner"
            >
              <Image
                src="/icons/google.svg"
                alt="Google"
                width={24}
                height={24}
              />
              <span>Sign in with Google</span>
            </button>
            <button
              onClick={() => handleSocialSignIn("apple")}
              type="button"
              className="w-full flex  items-center text-black font-medium justify-center gap-4 px-5 py-4 border-2 border-gray-300 rounded-4xl hover:bg-gray-50 transition-all duration-200 hover:scale-[0.98] hover:shadow-sm active:scale-[0.97] active:shadow-inner"
            >
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
