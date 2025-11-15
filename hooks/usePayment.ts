import { useState, useEffect, useCallback } from 'react';
import { fetchPaymentInfo } from '../utils/api';

export type PaymentStatus = 'pending' | 'success' | 'failed';

export const usePayment = (address: string, onNotFound: () => void) => {
    const [status, setStatus] = useState<PaymentStatus>('pending');
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const load = async () => {
            try {
                const result = await fetchPaymentInfo(address);
                if (result.isTransfer) {
                    setStatus('success');
                } else if (result.expiredTime && Date.now() > result.expiredTime) {
                    setStatus('failed');
                }
                setData(result);
            } catch {
                onNotFound();
            } finally {
                setIsLoading(false);
            }
        };
        load();
    }, [address, onNotFound]);

    useEffect(() => {
        if (status !== 'pending') return;
        const interval = setInterval(async () => {
            try {
                const result = await fetchPaymentInfo(address);
                if (result.isTransfer) {
                    setStatus('success');
                    clearInterval(interval);
                } else if (result.expiredTime && Date.now() > result.expiredTime) {
                    setStatus('failed');
                    clearInterval(interval);
                }
            } catch {
                clearInterval(interval);
            }
        }, 3000);
        return () => clearInterval(interval);
    }, [address, status]);

    const resetPayment = useCallback(() => setStatus('pending'), []);

    return { status, setStatus, isLoading, data, resetPayment };
};
