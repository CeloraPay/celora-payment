import React from 'react';

const PaymentLoading: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center">
    <div className="w-12 h-12 border-4 border-gray-300 border-t-brand-green rounded-full animate-spin" />
    <p className="text-gray-400">Loading payment details...</p>
  </div>
);

export default PaymentLoading;
