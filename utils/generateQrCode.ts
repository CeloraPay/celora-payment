import { toDataURL } from 'qrcode';

const generateQrCode = async (address: string, amount: string) => {
  const qr = await toDataURL(
    `celo:${address}?value=${amount}&message=celorapay`,
    { type: 'image/webp' },
  );

  return qr;
};

export default generateQrCode;
