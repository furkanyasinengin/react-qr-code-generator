import { useEffect, useRef, useState } from "react";
import { getQRCode, isFinderPattern } from "./utils/qrGenerator";

const App = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [url, setUrl] = useState("https://github.com");
  const [primaryColor, setPrimaryColor] = useState("#000000");
  const [secondaryColor, setSecondaryColor] = useState("#ff0000");

  useEffect(() => {
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
    <div>
      <canvas ref={canvasRef} width={400} height={400}></canvas>
      <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
      <input
        type="color"
        value={primaryColor}
        onChange={(e) => setPrimaryColor(e.target.value)}
      />
      <input
        type="color"
        value={secondaryColor}
        onChange={(e) => setSecondaryColor(e.target.value)}
      />
    </div>
  );
};

export default App;
