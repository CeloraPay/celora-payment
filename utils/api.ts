import { APP_CONFIG } from '../config/app.config';

export const fetchPaymentInfo = async (address: string) => {
    const res = await fetch(`${APP_CONFIG.API_BASE_URL}/payments/${address}`);

    if (!res.ok) throw new Error(`Payment fetch failed: ${res.status}`);

    const { result } = await res.json();

    return result;
};
