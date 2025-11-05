import React from 'react';
import Button from '../Button';
import XCircleIcon from '../icons/XCircleIcon';

const PaymentFailed: React.FC = () => (
  <div className="flex flex-col items-center space-y-6 text-center">
    <XCircleIcon className="w-24 h-24 text-red-500" />

    <h1 className="text-3xl font-bold text-gray-100">Payment Failed</h1>
    <p className="text-gray-400">We couldn’t confirm your payment.</p>
  </div>
);

export default PaymentFailed;
