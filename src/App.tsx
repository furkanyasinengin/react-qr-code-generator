import { useEffect, useRef } from "react";
import { getQRCode, isFinderPattern } from "./utils/qrGenerator";

const App = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const qrObject = getQRCode("https://github.com");

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
            ? "red"
            : "black";
          ctx.fillRect(
            colIndex * squareSize,
            rowIndex * squareSize,
            squareSize,
            squareSize
          );
        }
      }
    }
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} width={400} height={400}></canvas>
    </div>
  );
};

export default App;
