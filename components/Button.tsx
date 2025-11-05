import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'px-6 py-3 font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-primary inline-flex items-center justify-center gap-2';
  
  const variantClasses = {
    primary: 'bg-brand-green text-dark-primary hover:bg-green-400 focus:ring-brand-green',
    secondary: 'bg-dark-tertiary text-gray-200 hover:bg-gray-600 border border-gray-600 focus:ring-gray-500',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
