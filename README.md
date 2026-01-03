# Custom QR Code Generator

A modern, high-performance React application designed to generate fully customizable QR codes. Unlike standart generators, this project renders QR raw matrix data directly onto the **HTML5 Canvas API**, allowing for pixel-perfect manipulation, smart logo integration, and high-resolution exports.

## Key Features

- **Advanced Color Customization:**

  - **Data Modules:** Change the color of the QR dots.
  - **Finder Patterns (Eyes):** Customize the corner "eye" colors independently from the data.
  - **Background:** Support for custom background colors with full-bleed rendering.

- **Smart Logo Integration:**

  - Upload brand logos to the center of the QR code.
  - **Auto-Clear Algorithm:** The application mathematically calculates the logo's coordinate area and prevents drawing data modules behind it ("Quiet Zone"), ensuring the QR code remains scannable and aesthetically clean.

- **High-Resolution Export:**

  - Implements a "Virtual Resolution" strategy.
  - Renders at **2000x2000px** internally for crisp, high-quality PNG downloads, regardless of the screen display size.

- **Standard Compliance:**
  - Utilizes **Error Correction Level H** (High) to maintain data integrity even with logo overlays (up to 30% damage recovery).
    \*Includes proper margin/padding calculations for optimal reader recognition.

## Tech Stack

- **Core:** React 19, TypeScript
- **Styling:** Tailwind CSS (v4)
- **Build Tool:** Vite
- **Graphics:** HTML5 Canvas API (2D Context)
- **Logic:** `qrcode` (used solely for raw matrix calculation, rendering is custom-built).

## How It Works

1. **Matrix Generation:** The app generates a raw grid of 0s and 1s based on the input URL.
2. **Canvas Rendering:** A custom rendering engine iterates through the matrix. It calculates coordinates dynamically based on a virtual 2000px canvas.
3. **Collision Detection:** Before drawing a module, the engine checks if the coordinate intersects with the defined logo area or finder patterns to apply the correct styles.
4. **Export:** The canvas data is converted to a Blob/DataURL for client-side downloading.
