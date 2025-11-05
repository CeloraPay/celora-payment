import cn from 'classnames';

import Modal from '../Modal';

import Loading from '../../assets/Loading';

interface CLoadingModalProps {
  isOpen: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  className?: string;
}

const LoadingModal = ({
  isOpen,
  onClose,
  title,
  description,
  className,
}: CLoadingModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className={className}>
      <div className="flex flex-col justify-center items-center w-full gap-4 py-4">
        <div className={cn('transition', !title && !description && 'py-6')}>
          <Loading fill="#fff" />
        </div>
        {(title || description) && (
          <div className="text-center space-y-3 w-full">
            <h3 className="text-white text-[18px] font-medium">{title}</h3>
            <p className="text-textMuted text-[14px] text-center px-4">
              {description}
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default LoadingModal;
