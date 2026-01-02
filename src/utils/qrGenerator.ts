import QRCode from "qrcode";
import type { QRCode as QRCodeType } from "qrcode";

export const getQRCode = (text: string): QRCodeType => {
  return QRCode.create(text, { errorCorrectionLevel: "H" });
};

export const isFinderPattern = (
  row: number,
  col: number,
  size: number
): boolean => {
  if (
    (row < 7 && col < 7) ||
    (row < 7 && col >= size - 7) ||
    (row >= size - 7 && col < 7)
  )
    return true;
  return false;
};
