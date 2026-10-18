# ACS EFIS & FMS — Project Transfer & Architecture Handover

> **Target Platform:** Claude (Claude Code / Anthropic Projects / Cursor)  
> **Repository:** `https://github.com/Lloyd-widdowson/ACS-EFIS.git`  
> **Source Directory:** `web-efis-suite`  
> **Generated:** October 2026  
> **Status:** Production-Ready Experimental EFIS Suite (31/31 Unit Tests Passing)

---

## 1. System Architecture & Stack

### Core Tech Stack
| Component | Implementation | Rationale |
|---|---|---|
| **Runtime / Language** | Vanilla ECMAScript (ES6+) | Zero compilation latency, zero build step overhead, 60 FPS mobile performance. |
| **Rendering Engine** | Dual HTML5 Canvas 2D (`canvas-pfd-master`, `canvas-hsi-master`) | High-DPI retina rendering (`window.devicePixelRatio`), sub-millisecond drawing times. |
| **Mapping Engine** | Leaflet.js v1.9.4 (CDN with cached fallback) | Lightweight vector & raster flight chart overlay, custom SVG markers, rotation support. |
| **Styling & Layout** | Pure CSS3 (CSS Grid, Flexbox, Safe-Area insets, Media Queries) | Responsive cockpit cradle layouts: portrait split, landscape split, full PFD, full Map. |
| **Server / Proxy** | PowerShell TCP Daemon (`server.ps1`) | Zero-dependency local static file host + CORS reverse proxy with in-memory caching for ADS-B. |
| **Offline Runtime** | Progressive Web App (PWA) + Service Worker (`sw.js`) | Standalone homescreen installation on iOS Safari and Android Chrome without app stores. |
| **Local Storage** | Web Storage API (`localStorage`) | Persistent pilot settings: aircraft profiles, home base, QNH, sensor offsets, damping presets. |
| **Audio Alerting** | Web Audio API (`AudioContext`, OscillatorNode) | Stall warning horn synthesiser, divert chimes, and TCAS alerting tones. |

### External Services & APIs (Zero API Keys Required)
- **Live ADS-B Traffic:** `api.adsb.lol/v2/lat/{lat}/lon/{lon}/dist/{dist}` (proxied via `server.ps1` at `/api/adsb`).
- **Live Weather Radar:** RainViewer Free Open API (radar tile layers and infrared satellite frames).
- **Map Backdrops:** OpenStreetMap Carto Dark Matter / CARTO Voyager tiles.
- **Hardware Telemetry:** W3C Geolocation API, DeviceOrientation API, DeviceMotionEvent API, Generic Sensor Barometer API.

---

## 2. Workflow & Lifecycle

### Initialization Sequence (`bootEfisSuite()`)
1. **Canvas Viewport Fit (`resizeCanvases`):** Scales high-resolution backing stores for `canvas-pfd-master` and `canvas-hsi-master` using `devicePixelRatio`.
2. **Gesture & Calibration (`initHoldGestureDetector`):** Binds a 5-second long-press on the Artificial Horizon for instant pitch/roll zero-leveling in cockpit cradles.
3. **Flight Map Initialization (`initLeafletFlightMap`):** Instantiates Leaflet map centered on home base (`YTRE` Taree by default), registers moving aircraft SVG icon, dynamic glide ring, range rings, and Australian airspace boundaries.
4. **Configuration & Profiles (`initCustomProfileModal`):** Loads saved V-speeds ($V_{SO}, V_S, V_X, V_Y, V_{FE}, V_A, V_{NO}, V_{NE}$) and glide ratios.
5. **Layout & Gestures (`applyOrientationMode`, `initTwoFingerSwipeNavigation`):** Sets one of 7 display modes and binds two-finger carousel swipes across 6 screens (PFD, Map, Blackbox, Calibration, Settings, Tests).
6. **Hardware Pipeline (`DeviceSensorBridge.enableLiveSensors`):** Connects to device GPS, gyroscope, accelerometer, and barometer.
7. **Main Animation Loop (`requestAnimationFrame(mainLoop)`):** Runs locked at 60 FPS with frame-rate independent physics.

### 60 FPS Telemetry & Rendering Pipeline
In every animation frame (`mainLoop`):
1. **Telemetry Sampling:** `deviceSensors.getTelemetry(dt)` ingests physical sensor updates or virtual simulation.
2. **Decoupling & LERP:** `uiInterpolator.update(tel, dt)` interpolates scalar values with damping and computes shortest-arc angular LERP for heading/track to eliminate 1 Hz GPS stutter.
3. **PFD Rendering (`renderPfdMaster`):**
   - Blue/Brown Artificial Horizon with 2.5°/5°/10° pitch ladder and roll scale.
   - Sky pointer triangle and compact slip/skid brick.
   - Green flight path marker (climb angle & drift track).
   - Yellow Boeing/Garmin delta aircraft reference symbol.
   - Comprehensive left Airspeed Tape: White flap arc ($V_{SO}\text{-}V_{FE}$), Green normal arc ($V_S\text{-}V_{NO}$), Yellow caution arc ($V_{NO}\text{-}V_{NE}$), Red barber pole ($V_{NE}+$); 6-second magenta trend vector; bold digital pointer box with `KT` badge; base dual readout for `GS` and `TAS`.
   - Right Altimeter Tape: 100-ft divisions, 20-ft rolling ticks, 1,000-ft chevrons, target altitude bug, digital readout window, and VSI tape.
   - Bottom compact Turn Coordinator card (`116x68` px) with miniature airplane silhouette and 3D metallic ball inclinometer tube.
   - G-meter readout box with color-coded safety limits.
4. **HSI Rendering (`renderHsiMaster`):** Rotating 360° compass card, Course Deviation Indicator (CDI), destination waypoint pointer, heading bug, and ground track diamond.
5. **Safety Systems:** TCAS threat assessment (Traffic Advisories & Resolution Advisories) and Australian airspace spatial raycasting.

---

## 3. Current Operational State

### Tested & Validated Features (100% Pass Rate across 31 Test Suites)
- [x] **Primary Flight Display (PFD):** Pitch, roll, flight path marker, slip brick, turn coordinator with ball.
- [x] **Enhanced Airspeed Tape:** Full aviation certified color bands, 6-second trend projection, digital pointer box, GS/TAS window.
- [x] **Hardware-First Sensor Pipeline:** Physical GPS + Gyro + Accelerometer + Barometer default; simulation defaults permanently removed.
- [x] **Stationary Noise Clamping (Deadband):**
  - Speed $< 1.8\text{ kt} \implies 0.0\text{ kt}$ (eliminates GPS wandering).
  - $|\text{VSI}| < 50\text{ ft/min} \implies 0\text{ ft/min}$.
  - Stationary Accelerometer $\approx 1.0\text{ G} \pm 0.06\text{ G} \implies 1.0\text{ G}$.
  - Stationary Heading: Locks to magnetic compass (`webkitCompassHeading`); moving ($\ge 2.5\text{ kt}$) blends GPS track.
- [x] **Cockpit Mount Orientation Transform:** Real-time axis transformation for `PORTRAIT (0°)`, `LANDSCAPE (90° CCW)`, `LANDSCAPE (270° CW)`, and `AUTO (Screen Sync)`.
- [x] **AHRS Sensor Filtering & Damping:** 5 presets (`RESPONSIVE`, `BALANCED`, `DAMPED`, `ULTRA-SMOOTH`, `ULTRA-ULTRA SMOOTH`) with time-constant low-pass filter ($\alpha = 1 - e^{-\Delta t / \tau}$).
- [x] **Live ADS-B Traffic Manager:** Ingestion via local proxy or direct API, TCAS collision threat detection, altitude color bands, realistic SVG aircraft silhouettes.
- [x] **Australian Airspace Boundary Engine:** 74 Class C/D/R/D CTR sectors, AIRAC curved arc geometry, real-time spatial penetration and proximity warnings.
- [x] **Blackbox Flight Data Recorder:** In-memory circular buffer recording telemetry; one-click export to CSV, GPX 1.1, and KML (3D ribbon extrusion).
- [x] **PWA & Offline Capability:** `manifest.json`, high-resolution iOS and Android touch icons, `sw.js` cache manifest.

### Active Considerations & Edge Cases
1. **iOS Safari Sensor Permission:** Safari on iOS 13+ requires explicit user interaction to trigger `DeviceOrientationEvent.requestPermission()`. Handled seamlessly when switching screens or tapping the sensor toggle button.
2. **Indoor GPS Loss:** In hangar or indoors, GPS speed is clamped to `0 kt` and altitude may show `--- ft` until lock is established.
3. **Map Tile Offline Caching:** Base map tiles from OpenStreetMap/CARTO require an active internet connection unless pre-cached into IndexedDB or Service Worker storage.

---

## 4. Environment & Configuration

### Prerequisites
- Any modern web browser (Google Chrome, Safari, Firefox, Microsoft Edge) on desktop or mobile.
- PowerShell 5.1+ / 7+ (on Windows) OR any static HTTP server (Node, Python, Caddy, Nginx) on Linux/macOS.

### Port Configuration
- `8080`: Primary EFIS Web Application & ADS-B Proxy (`server.ps1`).
- `8088`: Dedicated Standalone ADS-B Proxy (`adsb_proxy.ps1`, optional alternative).

### Local Execution Commands
```powershell
# Option 1: Native Windows PowerShell Daemon (Recommended)
powershell -ExecutionPolicy Bypass -File server.ps1

# Option 2: Node.js (Alternative on macOS/Linux)
npx serve -l 8080 web-efis-suite

# Option 3: Python 3 (Alternative)
python -m http.server 8080 --directory web-efis-suite
```

### Running the Test Suite
1. Launch server: `powershell -ExecutionPolicy Bypass -File server.ps1`.
2. Open `http://localhost:8080/index.html` in browser.
3. Swipe or click to **Screen 6 ("AUTOMATED TEST SUITE")** to inspect live results.
4. Or run headless validation via CDP:
   ```powershell
   powershell -ExecutionPolicy Bypass -File scratch/check_console.ps1
   ```

---

## 5. Working Notes & Decision Log

1. **Why Pure Vanilla JS Instead of React / Angular / Vue?**  
   *Decision:* The EFIS rendering pipeline requires continuous 60 FPS Canvas 2D repaints with zero garbage collection spikes. Virtual DOM diffing adds memory pressure and jitter on budget mobile devices mounted in cockpits. Vanilla JS gives absolute control over byte-level rendering, event listeners, and low-latency canvas context execution.

2. **Why Analytical Time-Constant Filtering over Simple Alpha Smoothing?**  
   *Decision:* Mobile device browsers throttle `deviceorientation` events depending on CPU load and screen refresh rate (ranging from 30 Hz to 120 Hz). Fixed-alpha smoothing ($\text{Angle} = \text{Old} \times 0.85 + \text{New} \times 0.15$) causes inconsistent sluggishness at low FPS and jitter at high FPS. The analytical time-constant formula ($\alpha = 1 - e^{-\Delta t / \tau}$) ensures mathematically identical damping regardless of frame rate.

3. **Why Dual Orientation Handlers (CSS Mode + Sensor Axis Matrix)?**  
   *Decision:* Pilots often lock their phone's operating system screen orientation to portrait to prevent accidental flipping during turbulence, yet mount the phone horizontally in a landscape cradle. Having an independent layout switcher and sensor axis transformation matrix allows the AHRS to know the exact physical mount angle regardless of what the OS screen orientation reports.

4. **Why Embedded PowerShell Reverse Proxy for ADS-B?**  
   *Decision:* Browser security models enforce strict CORS and Mixed Content policies (`https://` cannot fetch insecure local `http://192.168.x.x:4000` Stratux endpoints). The built-in `server.ps1` proxy acts as a transparent, high-speed bridge with in-memory caching that shields the front-end from CORS blocks.

---

## 6. Next Immediate Tasks

1. **Task 1: Offline Map Tile Pre-Caching (IndexedDB Storage):**  
   Implement a tile downloader that allows pilots to download bounding-box map tiles along a planned route for offline in-flight navigation without mobile data.
2. **Task 2: GDL90 UDP/WebSocket Bridge:**  
   Add a listener for Stratux / Sentry / FlightAware GDL90 binary packets over local Wi-Fi to display external certified dual-band ADS-B traffic and WAAS GPS data.
3. **Task 3: Web Speech API Synthetic Voice Alerts:**  
   Incorporate spoken terrain and traffic callouts (e.g., *"Traffic, 2 o'clock, 2 miles, 500 feet below"* and *"Sink Rate, Pull Up"*).
4. **Task 4: WebGL 3D Synthetic Vision Elevation Mesh:**  
   Elevate the Garmin SVT wireframe by binding low-resolution digital elevation model (DEM) terrain heightmaps via a lightweight WebGL shader.
