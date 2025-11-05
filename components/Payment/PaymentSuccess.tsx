import React from 'react';
import Button from '../Button';
import CheckCircleIcon from '../icons/CheckCircleIcon';

interface Props {
  redirectUrl: string;
}

const PaymentSuccess: React.FC<Props> = ({ redirectUrl }) => (
  <div className="flex flex-col items-center space-y-6 text-center">
    <CheckCircleIcon className="w-24 h-24 text-brand-green" />

    <h1 className="text-3xl font-bold text-gray-100">Payment Successful!</h1>
    <p className="text-gray-400">Your transaction has been confirmed.</p>

    <Button
      className="w-full max-w-xs text-lg"
      onClick={() => (window.location.href = redirectUrl)}
    >
      Go to Store
    </Button>
  </div>
);

export default PaymentSuccess;
