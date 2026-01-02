import { useEffect, useRef, useState } from "react";
import { getQRCode, isFinderPattern } from "./utils/qrGenerator";

const App = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [url, setUrl] = useState("https://github.com");
  const [primaryColor, setPrimaryColor] = useState("#000000");
  const [secondaryColor, setSecondaryColor] = useState("#ff0000");

  useEffect(() => {
    if (!url) return;
    const qrObject = getQRCode(url);

    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const size = qrObject.modules.size;

    ctx.clearRect(0, 0, 400, 400);
    const squareSize = 400 / size;

    for (let rowIndex = 0; rowIndex < size; rowIndex++) {
      for (let colIndex = 0; colIndex < size; colIndex++) {
        const isPainted = qrObject.modules.data[rowIndex * size + colIndex];
        if (isPainted) {
          ctx.fillStyle = isFinderPattern(rowIndex, colIndex, size)
            ? secondaryColor
            : primaryColor;
          ctx.fillRect(
            colIndex * squareSize,
            rowIndex * squareSize,
            squareSize,
            squareSize
          );
        }
      }
    }
  }, [url, primaryColor, secondaryColor]);

  return (
    <div className="min-h-screen flex gap-2 bg-gray-100 justify-center items-center">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <canvas
          className="w-full h-auto border-2 border-gray-700/75 rounded p-1.5 mb-4"
          ref={canvasRef}
          width={400}
          height={400}
        />
        <div className="flex flex-col gap-4 items-center">
          <input
            className="w-full border p-2 rounded font-mono focus:ring-2"
            type="text"
            value={url}
            placeholder="Write Someting..."
            onChange={(e) => setUrl(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-x-3 items-center">
            <label className="font-mono text-xl">Data Color:</label>
            <input
              className="w-12 h-12 p-1 border-0 rounded overflow-hidden cursor-pointer shadow-sm"
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
            />
            <label className="font-mono text-xl">Eye Color:</label>
            <input
              className="w-12 h-12 p-1 border-0 rounded overflow-hidden cursor-pointer shadow-sm"
              type="color"
              value={secondaryColor}
              onChange={(e) => setSecondaryColor(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
