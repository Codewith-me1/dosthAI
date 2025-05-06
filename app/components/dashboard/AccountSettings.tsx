import React from 'react';
import { LogOut, Edit2, Bell, Lock, ChevronRight, CreditCard, User, Star, Coins } from 'lucide-react';
import Link from 'next/link';

const plans = [
  {
    price: '$ 3.49',
    period: '/month',
    features: [
      'Premium Content',
      'Unlimited Profiles',
      'Share',
      'Stories, Activities, Cards',
      'Create Routines',
      'Print/Download',
      'Cognition Assessment',
    ],
    button: 'Upgrade',
    highlight: false,
  },
  {
    price: '$ 44.99',
    period: '/year',
    features: [
      'Premium Content',
      'Unlimited Profiles',
      'Share',
      'Stories, Activities, Cards',
      'Create Routines',
      'Print/Download',
      'Cognition Assessment',
    ],
    button: 'Select',
    highlight: true,
  },
];

const coins = [
  {
    amount: 1000,
    label: 'PATH PLANNER',
    price: '$24.99',
    desc: 'Creates up to 200 images',
    highlight: true,
  },
  {
    amount: 500,
    label: 'JOURNEY MAKER',
    price: '$14.99',
    desc: 'Creates up to 100 images',
    highlight: false,
  },
  {
    amount: 250,
    label: 'FOUNDATIONAL',
    price: '$7.99',
    desc: 'Creates up to 50 images',
    highlight: false,
  },
];

const AccountSettings: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl font-semibold mb-8">Account and Settings</h1>

      {/* Profile Section */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-6">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="flex items-center justify-center bg-[#F3F0FF] text-[#A259FF] rounded-full w-16 h-16 text-3xl font-bold">U</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="font-semibold text-lg truncate">Username</span>
              <span className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs font-semibold"><Coins className="w-4 h-4" /> 50</span>
              <span className="bg-[#F3F0FF] text-[#6100FF] px-2 py-0.5 rounded-full text-xs font-semibold">Free</span>
              <Link href="#" className="text-[#6100FF] text-xs font-medium flex items-center gap-1 ml-2 hover:underline"><Edit2 className="w-4 h-4" /> Edit Profile</Link>
            </div>
            <div className="text-gray-500 text-sm truncate">example@email.com • United States</div>
          </div>
        </div>
        <button className="ml-auto flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-[#6100FF] font-semibold rounded-lg transition-colors"><LogOut className="w-5 h-5" /> Logout</button>
      </div>

      {/* Settings Rows */}
      <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200 mb-8">
        <div className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-[#A259FF]" />
            <span className="font-medium text-gray-800">Password</span>
            <span className="text-xs text-gray-400 ml-2">(updated last Month)</span>
          </div>
          <Link href="/changePassword" className="text-[#6100FF] font-medium text-sm hover:underline">Change Password</Link>
        </div>
        <div className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-[#A259FF]" />
            <span className="font-medium text-gray-800">Notifications</span>
          </div>
          <span className="bg-[#F3F0FF] text-[#6100FF] px-3 py-1 rounded-full font-semibold text-xs shadow">G</span>
        </div>
      </div>

      {/* Plan Section */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-lg">Your Plan</span>
          <Link href="#" className="text-[#6100FF] font-medium text-sm hover:underline">Upgrade</Link>
        </div>
        <p className="text-gray-500 text-sm mb-4">Buy to create more stories and images!</p>
        <div className="flex flex-col md:flex-row gap-6">
          {plans.map((plan, idx) => (
            <div key={idx} className={`flex-1 bg-white rounded-xl border ${plan.highlight ? 'border-[#6100FF]' : 'border-gray-200'} shadow-sm p-6 flex flex-col items-center`}>
              <div className="text-3xl font-bold text-[#6100FF] mb-1">{plan.price}<span className="text-base font-normal text-gray-500">{plan.period}</span></div>
              <ul className="text-gray-700 text-sm mb-4 list-disc list-inside">
                {plan.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
              <button className={`w-full py-2 rounded-lg font-semibold border ${plan.highlight ? 'bg-[#6100FF] text-white border-[#6100FF]' : 'bg-white text-[#6100FF] border-[#6100FF]'} transition-colors`}>{plan.button}</button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200 mb-8">
        <div className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50">
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-[#A259FF]" />
            <span className="font-medium text-gray-800">Visa **** 1234</span>
          </div>
          <Link href="#" className="text-[#6100FF] font-medium text-sm hover:underline">Change Payment Method</Link>
        </div>
      </div>

      {/* Buy Coins Section */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-lg">Buy Coins</span>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          {coins.map((coin, idx) => (
            <div key={idx} className={`flex-1 rounded-xl border ${coin.highlight ? 'bg-yellow-100 border-yellow-300' : 'bg-gray-50 border-gray-200'} shadow-sm p-6 flex flex-col items-center`}>
              <div className="flex items-center gap-2 mb-2">
                <Coins className="w-6 h-6 text-yellow-500" />
                <span className="text-3xl font-bold text-yellow-600">{coin.amount}</span>
              </div>
              <div className="font-semibold text-base mb-1 uppercase tracking-wide text-gray-700">{coin.label}</div>
              <div className="text-gray-500 text-sm mb-2">{coin.desc}</div>
              <div className="text-xl font-bold text-gray-800 mb-2">{coin.price}</div>
              <button className={`w-full py-2 rounded-lg font-semibold border ${coin.highlight ? 'bg-yellow-400 text-white border-yellow-400' : 'bg-white text-yellow-700 border-yellow-400'} transition-colors`}>Buy</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountSettings; 