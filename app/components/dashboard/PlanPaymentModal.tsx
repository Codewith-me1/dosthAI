import React from 'react';
import { X, CreditCard, ArrowRight } from 'lucide-react';

interface PlanPaymentModalProps {
  open: boolean;
  onClose: () => void;
  planLabel: string;
  price: string;
  paymentMethod?: string;
  buttonLabel?: string;
}

const PlanPaymentModal: React.FC<PlanPaymentModalProps> = ({ open, onClose, planLabel, price, paymentMethod = 'Visa **** 1234', buttonLabel = 'Upgrade' }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-xs sm:max-w-sm mx-2 relative animate-fadeIn">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >
          <X />
        </button>
        <h2 className="text-xl font-bold mb-4">Payment</h2>
        <div className="text-lg font-semibold text-[#7B2FF2] mb-2">{planLabel}</div>
        <div className="text-3xl font-bold text-gray-900 mb-6">{price}</div>
        <div className="mb-4">
          <div className="text-sm text-gray-700 mb-2">Payment Method</div>
          <div className="flex items-center gap-2 text-base font-medium text-gray-800">
            <CreditCard className="w-5 h-5 text-[#A259FF]" />
            {paymentMethod}
          </div>
        </div>
        <button className="w-full bg-[#7B2FF2] hover:bg-[#6100FF] text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 text-base transition-colors">
          {buttonLabel} <ArrowRight className="w-5 h-5" />
        </button>
        <div className="text-[10px] text-gray-400 text-right mt-2">Powered by VISA</div>
      </div>
    </div>
  );
};

export default PlanPaymentModal; 