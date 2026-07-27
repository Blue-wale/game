# 🚗 PLANATMIUM - Premium Car Configurator

An ultra-premium, production-ready car configurator featuring:
- **3D Interactive Showroom** with Three.js & React Three Fiber
- **Real-time Car Configuration** with paint colors, wheels, and options
- **Animated Showroom Lighting** with dynamic spotlights
- **Drag-to-Rotate** camera controls for immersive exploration
- **Responsive Design** with Tailwind CSS
- **Premium UI/UX** inspired by Forza Horizon, Pagani, and Ferrari Tailor Made

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ (https://nodejs.org/)
- npm or yarn

### Installation

1. **Navigate to the folder**
```bash
cd car-configurator
```

2. **Install Dependencies**
```bash
npm install
```

3. **Place your car.glb model in the public folder**
```bash
# Copy your car.glb to the public/ directory
cp /path/to/car.glb public/car.glb
```

4. **Start Development Server**
```bash
npm run dev
```
The app will automatically open at `http://localhost:3000`

## 🎮 How to Use

### Explore the Showroom
- **Drag your mouse** to rotate and explore the 3D car model
- The car will smoothly return to center position when you release
- Use the scroll wheel to zoom in/out

### Configure Your Dream Car
1. Click **"Configure Your Dream"** button on the hero section
2. Open the **Configurator Panel** on the right side
3. Choose from multiple tabs:
   - **Paint**: Select colors and finishes (Metallic, Matte, Pearl, Satin)
   - **Wheels**: Choose wheel styles and colors
   - **Options**: Toggle spoiler and underglow lights
4. See real-time updates on the 3D model

## 📁 Project Structure

```
car-configurator/
├── public/
│   └── car.glb                    # Your 3D car model
├── src/
│   ├── components/
│   │   ├── Scene.jsx              # Main 3D scene with camera controls
│   │   ├── Showroom.jsx           # 3D car model loader & generation
│   │   ├── AnimatedLights.jsx     # Dynamic lighting system
│   │   ├── TopBar.jsx             # Navigation header
│   │   └── ConfiguratorPanel.jsx  # Configuration UI panel
│   ├── store.js                   # Zustand state management
│   ├── App.jsx                    # Main app component
│   ├── main.jsx                   # React entry point
│   └── index.css                  # Global styles with Tailwind
├── index.html                     # HTML entry point
├── package.json                   # Dependencies
├── vite.config.js                 # Vite configuration
├── tailwind.config.js             # Tailwind CSS configuration
├── postcss.config.js              # PostCSS configuration
└── README.md                      # This file
```

## 🎨 Customization

### Adding Your GLB Model
Simply place your `car.glb` file in the `public/` folder. The app will automatically detect and load it. If not found, it falls back to a procedural car model.

### Modifying Colors
Edit paint options in `src/components/ConfiguratorPanel.jsx`:
```jsx
const paintOptions = [
  { name: 'Your Color', color: '#yourHexCode' },
  // ...
]
```

### Adjusting Camera Sensitivity
Modify sensitivity in `src/components/Scene.jsx`:
```jsx
cameraTargetRef.current.x += deltaX * 0.001  // Increase for more sensitivity
```

## 🛠️ Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## ��� Built With

- **React 18** - UI framework
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for Three.js
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Zustand** - State management
- **Vite** - Build tool and dev server

## 🎯 Features in Detail

### Dynamic Lighting System
- 4 animated spotlights with different angles and intensities
- Real-time light pulsing and movement
- Gold and white light accents for premium feel
- Shadow casting for depth

### Real-time Configuration
- Instant material updates
- Color reflections on 3D model
- Toggle-able parts (spoiler, underglow)
- Smooth transitions between options

### Responsive Camera Control
- Drag-to-rotate with mouse
- Smooth easing return to center
- No jank or performance issues
- Works on all screen sizes

### Premium UI Components
- Glass-morphism effects
- Smooth animations and transitions
- Gold accents for luxury feel
- Fully responsive design

## ✅ Getting Started Quick Checklist

- [ ] Clone or download the project
- [ ] Run `npm install`
- [ ] Place `car.glb` in the `public/` folder
- [ ] Run `npm run dev`
- [ ] Open browser to `http://localhost:3000`
- [ ] Drag to rotate, click Configure to customize!

## 🌟 Performance Tips

1. **Optimize your GLB model** - Keep polygon count reasonable (< 100k triangles)
2. **Compress textures** - Use WebP format when possible
3. **Enable hardware acceleration** - Modern browsers do this automatically
4. **Use production build** - `npm run build` for optimized output

## 📝 License

This project is open source and available under the MIT License.

---

**Made with ❤️ for car enthusiasts and designers**
