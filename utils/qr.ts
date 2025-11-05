export const generateQrCodeUrl = (data: string) =>
    `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${data}&bgcolor=1F2937&color=F9FAFB&qzone=1`;
