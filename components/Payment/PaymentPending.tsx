import { ethers, parseUnits, ZeroAddress } from 'ethers';
import React, { useCallback, useState, useEffect } from 'react';

import PAYMENT_ABI from '../../abi/PAYMENT_ABI.json';
import TOKEN_ABI from '../../abi/ERC20_ABI.json';

import Timer from '../Timer';
import Button from '../Button';
import CopyIcon from '../icons/CopyIcon';
import InfoIcon from '../icons/InfoIcon';
import WarningIcon from '../icons/WarningIcon';
import generateQrCode from '../../utils/generateQrCode';
import LoadingModal from '../LoadingModal';

interface Props {
  address: string;
  amount: string;
  token: {
    logo: string;
    symbol: string;
    address: string;
    decimal: number;
  };
  totalDuration: number;
  onTimeout: () => void;
}

const PaymentPending: React.FC<Props> = ({
  address,
  amount,
  token,
  totalDuration,
  onTimeout,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loadingTitle, setLoadingTitle] = useState<string>('');
  const [isCopied, setIsCopied] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(address).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  }, [address]);

  useEffect(() => {
    const generateQr = async () => {
      try {
        const qr = await generateQrCode(address, amount);
        setQrCode(qr);
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generateQr();
  }, [address]);

  const handleCall = async () => {
    try {
      const { ethereum } = window as any;
      if (!ethereum) {
        alert('MetaMask not found');
        return;
      }

      await ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(address, PAYMENT_ABI, signer);
      const value = parseUnits(amount, token.decimal);

      setLoadingTitle('Deposit Confirming...');
      setIsOpen(true);

      if (token.address == ZeroAddress) {
        const tx = await contract.depositNative({ value });
        await tx.wait();
      } else {
        const userAddress = await signer.getAddress();
        const tokenC = new ethers.Contract(token.address, TOKEN_ABI, signer);
        const allowance = await tokenC.allowance(userAddress, address);

        if (allowance < value) {
          const approveTx = await tokenC.approve(address, BigInt(value));
          await approveTx.wait();
        }

        const tx = await contract.depositToken(BigInt(value));
        await tx.wait();
      }

      setIsOpen(false);
    } catch {
      setIsOpen(false);
    }
  };

  const handleOnClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-10 items-center">
      <div className="flex flex-col w-full space-y-5 md:col-span-3">
        <h1 className="text-3xl font-bold text-gray-100 text-center md:text-left">
          Complete Your Payment
        </h1>

        <Timer expireTime={totalDuration} onTimeout={onTimeout} />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-400">Amount</label>
            <p className="text-xl md:text-2xl font-bold text-gray-100 bg-dark-primary p-3 rounded-lg text-center mt-1">
              {amount}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-400">Token</label>
            <p className="text-xl md:text-2xl font-bold text-gray-100 bg-dark-primary p-3 flex justify-center items-center gap-2 rounded-lg text-center mt-1">
              <img src={token.logo} alt="icon" width={25} height={25} />
              {token.symbol.toUpperCase()}
            </p>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-400">
            Payment Address
          </label>
          <div className="flex items-center mt-1 bg-dark-primary rounded-lg p-3">
            <p className="flex-1 text-sm text-gray-200 truncate font-mono">
              {address}
            </p>
            <button
              onClick={handleCopy}
              className="ml-3 text-brand-green hover:text-green-300 transition-colors flex-shrink-0"
            >
              {isCopied ? 'Copied!' : <CopyIcon />}
            </button>
          </div>
        </div>

        <Button className="w-full text-lg" onClick={handleCall}>
          Direct Payment
        </Button>

        <div className="flex items-start p-3 space-x-3 text-sm bg-blue-900/30 text-blue-300 border border-blue-700 rounded-lg">
          <InfoIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p>
            For a faster, error-free transaction, use the "Direct Payment"
            button below.
          </p>
        </div>

        <div className="flex items-start p-3 space-x-3 text-xs bg-yellow-900/30 text-yellow-300 border border-yellow-700 rounded-lg">
          <WarningIcon className="w-8 h-8 md:w-5 md:h-5 flex-shrink-0 mt-0.5" />
          <p>Please ensure you send the correct amount of {token.symbol}.</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center space-y-4 md:col-span-2 order-first md:order-last">
        <div className="w-full max-w-[250px] p-4 bg-dark-primary rounded-lg flex flex-col items-center">
          <img
            src={qrCode}
            alt="Payment QR Code"
            width="200"
            height="200"
            className="rounded-lg border-4 border-dark-tertiary"
          />
          <p className="mt-4 text-sm text-gray-400 text-center">Scan to pay</p>
        </div>
      </div>

      <LoadingModal
        isOpen={isOpen}
        onClose={handleOnClose}
        title={loadingTitle}
      />
    </div>
  );
};

export default PaymentPending;
