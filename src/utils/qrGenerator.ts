import QRCode from "qrcode";
import type { QRCode as QRCodeType } from "qrcode";

export const getQRCode = (text: string): QRCodeType => {
  return QRCode.create(text, { errorCorrectionLevel: "H" });
};
