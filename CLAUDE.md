# CLAUDE.md — ACS EFIS & FMS Project Rules & Instructions

## Project Overview
ACS EFIS & FMS is an experimental, offline-capable Electronic Flight Instrument System (EFIS) and Flight Management System (FMS) Progressive Web App (PWA) designed for in-cockpit mobile use. It features dual high-DPI HTML5 Canvas PFD (Primary Flight Display with certified airspeed tape, artificial horizon, turn coordinator, and altimeter) and HSI (Horizontal Situation Indicator), an interactive Leaflet moving map with Australian airspace boundaries, live ADS-B traffic with TCAS collision threat alerting, blackbox flight telemetry recording (CSV/GPX/KML), and a hardware-first sensor fusion pipeline (GPS, gyro, accelerometer, barometer) with stationary jitter zero-clamping.

## Core Commands
- **Run Local Server & ADS-B Proxy:**
  `powershell -ExecutionPolicy Bypass -File server.ps1` (runs on `http://localhost:8080`)
- **Alternative Run (Node.js):**
  `npx serve -l 8080` or `npx http-server -p 8080`
- **Alternative Run (Python):**
  `python -m http.server 8080`
- **Run Unit Tests (Automated Browser):**
  Open `http://localhost:8080/index.html` and swipe to Screen 6 ("AUTOMATED TEST SUITE").
- **Compile & Syntax Check (Chrome CDP / Node):**
  `node -c app.js` or `node -c test-suite.js`
- **Git Push / Status:**
  `git status` | `git add -A` | `git commit -m "..."` | `git push origin main`

## Architecture & Code Conventions
- **Zero-Dependency Vanilla JS:** Written in standard ES6+. Avoid adding heavy client-side frameworks (React, Vue, Vite, Webpack) that introduce bundle latency, build steps, or garbage collection jitter to the 60 FPS Canvas rendering loop.
- **Dual Telemetry Pipeline:**
  - `DeviceSensorBridge`: Directly samples hardware APIs (`geolocation`, `deviceorientation`, `devicemotion`, `Barometer`).
  - `UiTelemetryInterpolator`: Decouples hardware sensor rates (1–60 Hz) from the 60 FPS animation loop using shortest-arc angular LERP and analytical damping.
- **Aviation Units Standard:**
  - Speed: Knots (`KT`)
  - Altitude: Feet (`FT`)
  - Vertical Speed: Feet per Minute (`FPM`)
  - Distance: Nautical Miles (`NM`)
  - Pressure: Hectopascals / Millibars (`hPa`)
  - Angles / Bearings: Degrees (`0°–359°`)
- **Angle & Shortest-Arc Math:**
  Always use shortest-arc modulo arithmetic for headings and tracks to prevent 359° ↔ 1° flip glitches:
  `const diff = (target - current + 540) % 360 - 180;`
- **Canvas Rendering Hygiene:**
  - Always balance `ctx.save()` and `ctx.restore()`.
  - Handle retina display scaling via `const dpr = window.devicePixelRatio || 1; ctx.scale(dpr, dpr);`.
  - Avoid object allocations or string formatting inside high-frequency draw loops (`renderPfdMaster`, `renderHsiMaster`).
- **Stationary Sensor Clamping Guardrails:**
  - Ground speed $< 1.8\text{ kt}$ must strictly clamp to `0.0 kt`.
  - Vertical speed $< 50\text{ ft/min}$ must strictly clamp to `0 ft/min`.
  - Total accelerometer $G \approx 1.0\text{ G} \pm 0.06\text{ G}$ must clamp to `1.0 G`.
  - Stationary heading ($< 2.5\text{ kt}$) must use magnetic compass (`webkitCompassHeading`); moving ($\ge 2.5\text{ kt}$) blends GPS Track Over Ground.

## Operational Constraints & Guardrails
- **Safety Disclaimers:** Never remove or weaken the FAA/CASA/EASA non-operational, experimental hobbyist disclaimer in `index.html` or `readme.md`.
- **Test Integrity:** Never alter assertions in `test-suite.js` to bypass failing tests; fix the underlying math or logic in `app.js`. All 31 tests must pass (100% pass rate).
- **CORS & ADS-B Proxy:** Client-side aviation endpoints often block CORS; route traffic fetches via `/api/adsb` on the local server daemon, falling back gracefully to direct endpoints or simulation fleet.
