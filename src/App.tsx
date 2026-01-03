import { useEffect, useRef, useState, type ChangeEvent } from "react";
import {
  downloadCanvasAsPng,
  getQRCode,
  isFinderPattern,
  isLogoArea,
} from "./utils/qrGenerator";

const App = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [url, setUrl] = useState<string>("https://github.com/furkanyasinengin");
  const [primaryColor, setPrimaryColor] = useState<string>("#000000");
  const [secondaryColor, setSecondaryColor] = useState<string>("#000000");
  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff");
  const [logo, setLogo] = useState<string | null>(null);

  const RESOLUTION: number = 2000;

  useEffect(() => {
    if (!url) return;
    const qrObject = getQRCode(url);

    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const size = qrObject.modules.size;

    ctx.clearRect(0, 0, RESOLUTION, RESOLUTION);
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, RESOLUTION, RESOLUTION);

    const squareSize = (RESOLUTION - RESOLUTION * 0.05 * 2) / size;

    for (let rowIndex = 0; rowIndex < size; rowIndex++) {
      for (let colIndex = 0; colIndex < size; colIndex++) {
        const isPainted = qrObject.modules.data[rowIndex * size + colIndex];
        if (logo) {
          if (isLogoArea(rowIndex, colIndex, size)) {
            continue;
          }
        }
        if (isPainted) {
          ctx.fillStyle = isFinderPattern(rowIndex, colIndex, size)
            ? secondaryColor
            : primaryColor;
          ctx.fillRect(
            RESOLUTION * 0.05 + colIndex * squareSize,
            RESOLUTION * 0.05 + rowIndex * squareSize,
            squareSize,
            squareSize
          );
        }
      }
    }
    if (logo) {
      const image = new Image();
      image.src = logo;
      image.onload = () => {
        const maxLogoSize = RESOLUTION * 0.2;
        const imageAspectRatio = image.width / image.height;
        let drawWidth = maxLogoSize;
        let drawHeight = maxLogoSize;

        if (imageAspectRatio > 1) {
          drawHeight = maxLogoSize / imageAspectRatio;
        } else {
          drawWidth = maxLogoSize * imageAspectRatio;
        }
        const xPos = (RESOLUTION - drawWidth) / 2;
        const yPos = (RESOLUTION - drawHeight) / 2;

        ctx.drawImage(image, xPos, yPos, drawWidth, drawHeight);
      };
    }
  }, [url, primaryColor, secondaryColor, logo, backgroundColor]);

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex gap-2 bg-gray-100 justify-center items-center">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <canvas
          className={`w-full max-w-[400px] h-auto border-2 border-gray-700/75 rounded p-1.5 mb-4`}
          ref={canvasRef}
          width={RESOLUTION}
          height={RESOLUTION}
        />
        <div className="flex flex-col gap-0.5 items-center">
          <input
            className="w-full border p-2 rounded font-mono focus:ring-2"
            type="text"
            value={url}
            placeholder="Write Someting..."
            onChange={(e) => setUrl(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <label className="w-32 text-right font-mono text-xl">
              Data Color:
            </label>
            <input
              className="w-12 h-12 p-1 border-0 rounded overflow-hidden cursor-pointer shadow-sm"
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="w-32 text-right font-mono text-xl">
              Eye Color:
            </label>
            <input
              className="w-12 h-12 p-1 border-0 rounded overflow-hidden cursor-pointer shadow-sm"
              type="color"
              value={secondaryColor}
              onChange={(e) => setSecondaryColor(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="w-32 text-right font-mono text-xl">
              Backgorund:
            </label>
            <input
              className="w-12 h-12 p-1 border-0 rounded overflow-hidden cursor-pointer shadow-sm"
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
            />
          </div>
          <div className="w-3/4 flex">
            <label
              className={`${
                logo
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-gray-600 hover:bg-gray-700"
              } w-full text-white py-2 px-4 mt-3 rounded shadow transition cursor-pointer text-center font-mono`}
              htmlFor="fileInput"
            >
              {logo ? "Remove Logo" : "Upload Logo"}
            </label>
            <input
              className="hidden"
              onClick={(e) => {
                const input = e.target as HTMLInputElement;
                if (logo) {
                  setLogo(null);
                  input.value = "";
                  e.preventDefault();
                }
              }}
              onChange={handleLogoUpload}
              type="file"
              id="fileInput"
              accept="image/png, image/jpeg, image/svg+xml"
            />
          </div>

          <button
            onClick={() => {
              if (canvasRef.current) {
                downloadCanvasAsPng(canvasRef.current);
              }
            }}
            className="w-3/4 text-white py-2 px-4 mt-3 rounded shadow transition cursor-pointer text-center font-mono bg-emerald-500 hover:bg-emerald-700"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
