import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = 'w-16 h-16' }) => {
  return (
    <svg 
      viewBox="0 0 32 32" 
      fill="currentColor" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM16 29C23.1797 29 29 23.1797 29 16C29 8.8203 23.1797 3 16 3C8.8203 3 3 8.8203 3 16C3 23.1797 8.8203 29 16 29Z"
        className="text-brand-green/30"
      />
      <path 
        d="M21.5 15C21.5 18.0376 19.0376 20.5 16 20.5C12.9624 20.5 10.5 18.0376 10.5 15L16 10.5L21.5 15Z"
        className="text-brand-green/60"
      />
      <path 
        d="M19.5 15C19.5 16.933 17.933 18.5 16 18.5C14.067 18.5 12.5 16.933 12.5 15L16 12.5L19.5 15Z"
        className="text-brand-green"
      />
    </svg>
  );
};

export default Logo;
