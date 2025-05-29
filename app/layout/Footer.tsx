import React from "react";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-8 w-full px-4 sm:px-6 lg:px-8">
      <div className=" mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="mb-6 md:mb-0 md:w-1/2 lg:w-2/5">
            <div className="flex items-center mb-3">
              <div className="h-20 w-40   flex items-center justify-center mr-3">
                <Image
                  src="/icons/logo.png"
                  alt="Dosth AI Logo"
                  width={200}
                  height={80}
                  className=" grayscale"
                />
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              An AI-Assistant that empowers parents, behavioral analysts
              supporting neurodivergent community. Built on AI-models trained
              using Applied Behavioral Analysis (ABA) Methodology.
            </p>
          </div>

          {/* Right side: Contact info */}
          <div className="text-sm md:text-right">
            <p className="mb-1">
              Give us a Call:{" "}
              <a
                href="tel:+15122701038"
                className="hover:text-gray-900 font-medium"
              >
                +1 (512) 270 1038
              </a>
            </p>
            <p>
              Say Hello to us:{" "}
              <a
                href="mailto:contact@dosth.ai"
                className="hover:text-gray-900 font-medium"
              >
                contact@dosth.ai
              </a>
            </p>
          </div>
        </div>

        {/* Bottom section with copyright and links */}
        <div className="border-t border-gray-300 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm">
          <p className="mb-4 sm:mb-0">
            &copy; Copyright {new Date().getFullYear()}, All Rights reserved by
            Dosth AI
          </p>
          <div className="flex space-x-6">
            <a href="/privacy-policy" className="hover:text-gray-900">
              Privacy Policy
            </a>
            <a href="/terms-and-conditions" className="hover:text-gray-900">
              Terms and Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
