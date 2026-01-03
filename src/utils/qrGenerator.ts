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

export const isLogoArea = (row: number, col: number, size: number): boolean => {
  const logoRatio = 0.2;
  const logoSize = size * logoRatio;
  const padding = 1.5;
  const start = (size - logoSize) / 2 - padding;
  const end = size - start;
  if (row >= start && row <= end && col >= start && col <= end) return true;

  return false;
};

export const downloadCanvasAsPng = (canvas: HTMLCanvasElement) => {
  const data = canvas.toDataURL("image/png");
  const downloadElement = document.createElement("a");
  downloadElement.href = data;
  downloadElement.download = "qr-code.png";
  downloadElement.click();
  downloadElement.remove();
};
