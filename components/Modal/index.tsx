'use client';

import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import cn from 'classnames';

import Close from '../../assets/Close';

type ModalProps = {
  width?: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  className?: string;
  title?: string | React.ReactNode;
  icon?: React.ReactNode;
  iconClick?: () => void;
};

const Modal = ({
  title,
  children,
  isOpen,
  width,
  icon,
  onClose,
  iconClick,
  className,
}: ModalProps) => {
  const backdropRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={backdropRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-[2px]"
          onClick={(e) => {
            if (e.target === backdropRef.current) {
              onClose();
            }
          }}
        >
          <motion.div
            initial={{ scale: 0.75, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.75, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ width: width ?? '482px' }}
            className={cn(
              'mobile:w-[calc(100%-32px)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 !z-[9999] rounded-[10px] shadow-2xl bg-[#1A1B21] border border-[#2B2C2F]',
              className,
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col w-full h-full px-6 py-4 gap-4">
              {title && (
                <header className="flex justify-between items-center select-none py-4">
                  <div className="flex items-center space-x-2">
                    {icon && (
                      <div className="w-[40px] h-[40px] border border-border2 rounded-[13px] flex justify-center items-center">
                        {icon}
                      </div>
                    )}
                    <p className="text-lg font-medium text-white">{title}</p>
                  </div>
                  <div
                    onClick={iconClick ?? onClose}
                    className="cursor-pointer"
                  >
                    <Close fill="#c9c9c9" />
                  </div>
                </header>
              )}
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

Modal.displayName = 'Modal';

export default Modal;
