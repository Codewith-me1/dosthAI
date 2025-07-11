import React, { useState } from "react";
import {
  LogOut,
  Edit2,
  Bell,
  Lock,
  ChevronRight,
  CreditCard,
  User,
  Star,
  Coins,
  Pen,
  Database,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import PaymentModal from "../modals/PaymentModal";
import PlanPaymentModal from "../modals/PlanPaymentModal";
import EditProfileModal from "../modals/EditProfileModal";

const plans = [
  {
    price: "$ 3.49",
    period: "/month",
    features: [
      "Premium Content",
      "Unlimited Profiles",
      "Share",
      "Stories, Activities, Cards",
      "Create Routines",
      "Print/Download",
      "Cognition Assessment",
    ],
    button: "Upgrade",
    highlight: false,
  },
  {
    price: "$ 44.99",
    period: "/year",
    features: [
      "Premium Content",
      "Unlimited Profiles",
      "Share",
      "Stories, Activities, Cards",
      "Create Routines",
      "Print/Download",
      "Cognition Assessment",
    ],
    button: "Select",
    highlight: true,
  },
];

const coins = [
  {
    amount: 1000,
    label: "PATH PLANNER",
    price: "$24.99",
    desc: "Creates up to 200 images",
    highlight: true,
  },
  {
    amount: 500,
    label: "JOURNEY MAKER",
    price: "$14.99",
    desc: "Creates up to 100 images",
    highlight: false,
  },
  {
    amount: 250,
    label: "FOUNDATIONAL",
    price: "$7.99",
    desc: "Creates up to 50 images",
    highlight: false,
  },
];

const demoPaymentMethods = [
  { label: "Visa **** 1234", icon: "visa" },
  { label: "Mastercard **** 5678", icon: "mastercard" },
  { label: "Amex **** 9012", icon: "amex" },
];

interface ChangePaymentMethodModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (label: string) => void;
  selected: string;
}

function ChangePaymentMethodModal({
  open,
  onClose,
  onSelect,
  selected,
}: ChangePaymentMethodModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-xs sm:max-w-sm mx-2 relative animate-fadeIn">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-lg font-bold mb-4">Select Payment Method</h2>
        <div className="space-y-3">
          {demoPaymentMethods.map((pm) => (
            <button
              key={pm.label}
              onClick={() => {
                onSelect(pm.label);
                onClose();
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border transition-colors ${
                selected === pm.label
                  ? "border-[#7B2FF2] bg-[#F3F0FF]"
                  : "border-gray-200 bg-white hover:border-[#7B2FF2]"
              } text-base`}
            >
              <span className="font-medium">{pm.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const AccountSettings: React.FC = () => {
  const [paymentOpen, setPaymentOpen] = React.useState(false);
  const [selectedCoin, setSelectedCoin] = React.useState<any>(null);
  const [planPaymentOpen, setPlanPaymentOpen] = React.useState(false);
  const [selectedPlan, setSelectedPlan] = React.useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState("Visa **** 1234");
  const [showChangePayment, setShowChangePayment] = useState(false);
  const [username, setUsername] = useState("Username");
  const [editProfileOpen, setEditProfileOpen] = useState(false);

  return (
    <div className="">
      <h1 className="text-2xl px-[10rem] sm:text-3xl  mt-8">
        Account and Settings
      </h1>

      <div className="w-full max-w-[90rem] mx-auto px-4 py-5 ">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-6">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="flex items-center justify-center bg-[#FFF4CC] text-[#C099FF] rounded-full w-25 h-25 text-3xl font-bold">
              U
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className=" text-xl truncate">{username}</span>
                <span className="flex items-center   gap-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-semibold">
                  <Database className="w-6 text-[#FFC700]" />
                  20
                  <ChevronDown className="w-5 h-5 text-gray-800" />
                </span>
                <span className="bg-[#F3F0FF] text-[#6100FF] px-3 py-2 rounded-full text-xs font-semibold">
                  Free
                </span>
                <Link
                  href="#"
                  className="text-[#2E74FF] text-xs font-medium flex items-center gap-1 ml-2 hover:underline "
                  onClick={(e) => {
                    e.preventDefault();
                    setEditProfileOpen(true);
                  }}
                >
                  <Pen className="w-4 h-4 " /> Edit Profile
                </Link>
              </div>
              <div className="text-gray-500 text-sm truncate">
                example@email.com • United States
              </div>
            </div>
          </div>
          <button className="ml-auto flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-[#FF4C4C]  rounded-lg transition-colors">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        {/* Heading */}

        {/* Profile Section */}

        {/* Settings Rows */}
        <div className="bg-white rounded-lg  divide-gray-200 mb-8">
          <div className="flex items-center border-y-2 border-gray-200 justify-between px-6 py-4 cursor-pointer hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-[#A259FF]" />
              <span className="font-medium text-gray-800">Password</span>
              <span className="text-xs text-gray-400 ml-2">
                (updated last Month)
              </span>
            </div>
            <Link
              href="/pages/changePassword"
              className="text-[#2E74FF] font-medium text-sm hover:underline"
            >
              Change Password
            </Link>
          </div>
          <div className="flex items-center justify-between border-b-2 border-gray-200 px-6 py-4 cursor-pointer hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-[#A259FF]" />
              <span className="font-medium text-gray-800">Notifications</span>
            </div>
          </div>
        </div>

        {/* Plan Section */}
        <div className="mb-10">
          <span className=" text-2xl">Your Plan</span>

          <p className="text-gray-500 text-sm mb-4">
            Buy to create more stories and images!
          </p>
          <div className="flex p-2 border-t-2 mt-2  border-gray-200 items-center justify-between mb-2">
            <span className="text-gray-500 text-md">
              You are on a free plan
            </span>

            <Link
              href="#"
              className="text-[#2E74FF] font-medium text-sm hover:underline"
            >
              Upgrade
            </Link>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className={`flex-1 h-[20rem] bg-[#F8FBFF] rounded-xl  border ${
                  plan.highlight ? "border-[#6100FF]" : "border-gray-200"
                } shadow-sm  p-5 flex flex-col items-center`}
              >
                <div className="text-3xl  text-[#6100FF]  mb-1">
                  {plan.price}

                  <span className="text-base font-normal text-gray-500">
                    {plan.period}
                  </span>
                </div>
                <div className="border-b-1 mb-2 w-[85%] border-[#A8A8A8]"></div>

                <ul className="text-gray-700 text-sm mb-4 list-disc list-inside">
                  {plan.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
                <button
                  className={`w-full py-2 rounded-lg font-semibold border ${
                    plan.highlight
                      ? "bg-[#6100FF] text-white border-[#6100FF]"
                      : "bg-white text-[#6100FF] border-[#6100FF]"
                  } transition-colors`}
                  onClick={() => {
                    setSelectedPlan(plan);
                    setPlanPaymentOpen(true);
                  }}
                >
                  {plan.button}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200 mb-8">
          <div className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-[#A259FF]" />
              <span className="font-medium text-gray-800">{paymentMethod}</span>
            </div>
            <Link
              href="#"
              className="text-[#6100FF] font-medium text-sm hover:underline"
              onClick={(e) => {
                e.preventDefault();
                setShowChangePayment(true);
              }}
            >
              Change Payment Method
            </Link>
          </div>
        </div>

        {/* Buy Coins Section */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <Database className="w-6 h-6 text-[#C099FF]  " />
            <span className="font-semibold text-lg">Buy Coins</span>
          </div>
          <div className="flex flex-col   md:flex-row gap-6">
            {coins.map((coin, idx) => (
              <div
                key={idx}
                className={`flex-1 h-[27rem]   rounded-xl border ${
                  coin.highlight
                    ? "bg-[#FFE999] border-yellow-300"
                    : "bg-gray-50 border-gray-200"
                } shadow-sm px-6 py-10 flex flex-col`}
              >
                <div className="flex mr-30">
                  <Database className="w-8 h-8 text-yellow-500" />
                </div>
                <span className="text-[6rem] md:text-[5rem] font-bold text-[#FFC700]">
                  {coin.amount}
                </span>
                <div className="font-bold text-base mb-1 uppercase tracking-wide text-[#6100FF]">
                  {coin.label}
                </div>
                <div className="border-b-2  w-full border-[#FFC700] "></div>

                <div className="text-xl mt-2 font-bold text-gray-800 mb-2">
                  {coin.price}
                </div>

                <div className="text-gray-500 text-sm mb-2">{coin.desc}</div>

                <button
                  className={`w-[70%] mx-auto mt-5 py-2 rounded-lg font-semibold border ${
                    coin.highlight
                      ? " text-[#6100FF] border-2 border-[#6100FF]"
                      : " text-[#6100FF] border-2 border-[#6100FF]"
                  } transition-colors`}
                  onClick={() => {
                    setSelectedCoin(coin);
                    setPaymentOpen(true);
                  }}
                >
                  Buy
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <PaymentModal
        open={paymentOpen}
        onClose={() => setPaymentOpen(false)}
        label={selectedCoin?.label || ""}
        amount={selectedCoin?.amount || 0}
        price={selectedCoin?.price || ""}
        paymentMethod={paymentMethod}
      />
      <PlanPaymentModal
        open={planPaymentOpen}
        onClose={() => setPlanPaymentOpen(false)}
        planLabel={
          selectedPlan
            ? `Upgrade to ${selectedPlan.price}${selectedPlan.period}`
            : ""
        }
        price={selectedPlan?.price || ""}
        paymentMethod={paymentMethod}
        buttonLabel={selectedPlan?.button || "Upgrade"}
      />
      <ChangePaymentMethodModal
        open={showChangePayment}
        onClose={() => setShowChangePayment(false)}
        onSelect={setPaymentMethod}
        selected={paymentMethod}
      />
      <EditProfileModal
        open={editProfileOpen}
        onClose={() => setEditProfileOpen(false)}
        username={username}
        onSave={setUsername}
      />
    </div>
  );
};

export default AccountSettings;
