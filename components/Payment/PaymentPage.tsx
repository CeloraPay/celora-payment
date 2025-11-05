import React from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '../Card';
import PaymentLoading from './PaymentLoading';
import PaymentPending from './PaymentPending';
import PaymentSuccess from './PaymentSuccess';
import PaymentFailed from './PaymentFailed';
import { usePayment } from '../../hooks/usePayment';

interface Props {
  address: string;
}

const PaymentPage: React.FC<Props> = ({ address }) => {
  const navigate = useNavigate();
  const { status, setStatus, isLoading, data, resetPayment } = usePayment(
    address,
    () => navigate('/'),
  );

  if (isLoading) return <PaymentLoading />;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md md:max-w-4xl p-6 md:p-8">
        {status === 'pending' && (
          <PaymentPending
            address={address}
            amount={data?.initialAmount}
            token={data?.token}
            totalDuration={data?.expiredTime}
            onTimeout={() => setStatus('failed')}
          />
        )}
        {status === 'success' && (
          <PaymentSuccess redirectUrl={data?.redirectUrl} />
        )}
        {status === 'failed' && <PaymentFailed />}
      </Card>
    </div>
  );
};

export default PaymentPage;
