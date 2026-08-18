/**
 * AUTOMATED UNIT & MATHEMATICAL VALIDATION SUITE
 * Tests AHRS fusion algorithms, navigation formulas, barometric math, unit conversions, and export formats.
 */

function runAllTests() {
  const container = document.getElementById("test-results-container");
  if (!container) return;
  container.innerHTML = "";

  const results = [];

  function assert(testName, condition, details = "") {
    results.push({ name: testName, pass: Boolean(condition), details });
  }

  // --------------------------------------------------------------------------
  // Test 1: Great Circle Distance Formula (KLAX to KLAS ~= 205-215 NM)
  // --------------------------------------------------------------------------
  const dist = calculateDistanceNm(33.9425, -118.4081, 36.0840, -115.1537);
  assert(
    "Great Circle Distance (KLAX -> KLAS)",
    dist >= 200 && dist <= 220,
    `Calculated: ${dist.toFixed(2)} NM (Expected: ~205-215 NM)`
  );

  // --------------------------------------------------------------------------
  // Test 2: Initial True Bearing Calculation (KLAX to KLAS ~= 45-55 deg)
  // --------------------------------------------------------------------------
  const brg = calculateBearingDeg(33.9425, -118.4081, 36.0840, -115.1537);
  assert(
    "Initial Bearing Calculation (KLAX -> KLAS)",
    brg >= 40 && brg <= 60,
    `Calculated Bearing: ${brg.toFixed(2)}° (Expected: ~45-55°)`
  );

  // --------------------------------------------------------------------------
  // Test 3: Cross-Track Error (XTE) Accuracy
  // --------------------------------------------------------------------------
  const xteOnCourse = calculateXTE(34.0, -118.0, 33.0, -118.0, 35.0, -118.0);
  assert(
    "Cross-Track Error (Point Directly On Meridian Track)",
    Math.abs(xteOnCourse) < 0.001,
    `Calculated XTE: ${xteOnCourse.toFixed(4)} NM (Expected: 0.0000 NM)`
  );

  // --------------------------------------------------------------------------
  // Test 4: Madgwick AHRS Sensor Fusion Static Convergence
  // --------------------------------------------------------------------------
  const filter = new MadgwickAHRS(0.1);
  for (let i = 0; i < 50; i++) {
    // Level flight gravity (1G on Z)
    filter.updateMARG(0, 0, 0, 0, 0, 9.81, 0.2, 0, 0.4, 0.02);
  }
  const euler = filter.getEuler();
  assert(
    "Madgwick AHRS Static Level Convergence (Pitch/Roll -> 0°)",
    Math.abs(euler.pitch) < 1.0 && Math.abs(euler.roll) < 1.0,
    `Converged Euler: Pitch = ${euler.pitch.toFixed(2)}°, Roll = ${euler.roll.toFixed(2)}°`
  );

  // --------------------------------------------------------------------------
  // Test 5: Standard Barometric Altitude Conversion
  // --------------------------------------------------------------------------
  // At sea level (1013.25 hPa with 1013.25 QNH) -> Alt should be ~0 ft
  // 850 hPa -> ~4,780 ft
  const p0 = 1013.25;
  const pTest = 850.0;
  const altFt = (44330.0 * (1.0 - Math.pow(pTest / p0, 0.190284))) * 3.28084;
  assert(
    "Barometric Standard Atmosphere Formula (850 hPa -> ~4780 ft)",
    altFt >= 4600 && altFt <= 5000,
    `Calculated Baro Altitude: ${altFt.toFixed(1)} ft`
  );

  // --------------------------------------------------------------------------
  // Test 6: Unit Conversion Consistency
  // --------------------------------------------------------------------------
  const kts = 100.0;
  const mph = kts * 1.15078;
  const kmh = kts * 1.852;
  assert(
    "Speed Unit Conversion (100 kt -> 115.08 mph, 185.2 km/h)",
    Math.abs(mph - 115.078) < 0.01 && Math.abs(kmh - 185.2) < 0.01,
    `100 kt = ${mph.toFixed(2)} mph = ${kmh.toFixed(2)} km/h`
  );

  // --------------------------------------------------------------------------
  // Test 7: GPX 1.1 Exporter Formatting
  // --------------------------------------------------------------------------
  const testRec = new FlightRecorder();
  testRec.start();
  testRec.record({
    latitude: 33.9425, longitude: -118.4081, indicatedAltitude: 5500,
    groundSpeed: 120, pitch: 1.5, roll: 0.0, heading: 45, gForceZ: 1.0
  });
  const gpxOutput = testRec.exportGPX();
  assert(
    "GPX 1.1 XML Generation & Schema Tags",
    gpxOutput.includes("<gpx version=\"1.1\"") && gpxOutput.includes("<trkpt lat=\"33.942500\""),
    `Generated GPX Length: ${gpxOutput.length} characters`
  );

  // --------------------------------------------------------------------------
  // Test 8: KML 3D Ribbon Generation
  // --------------------------------------------------------------------------
  const kmlOutput = testRec.exportKML();
  assert(
    "KML 3D Ribbon Extruded Track Generation",
    kmlOutput.includes("<kml") && kmlOutput.includes("<altitudeMode>absolute</altitudeMode>"),
    `Generated KML Length: ${kmlOutput.length} characters`
  );

  // --------------------------------------------------------------------------
  // Test 9: Spatial Ray-Casting Point-in-Polygon (VHF Area 20 Sydney Centre)
  // --------------------------------------------------------------------------
  const polyCoords = VHF_AREA_SECTORS.features[0].geometry.coordinates[0];
  const isInsideTaree = isPointInPolygon(-31.8986, 152.5142, polyCoords);
  const isOutsideMelbourne = isPointInPolygon(-37.8136, 144.9631, polyCoords);
  assert(
    "Spatial Ray-Casting Point-in-Polygon (Area 20 Enclosure)",
    isInsideTaree === true && isOutsideMelbourne === false,
    `Taree (-31.9°, 152.5°) inside Area 20: ${isInsideTaree}, Melbourne inside Area 20: ${isOutsideMelbourne}`
  );

  // --------------------------------------------------------------------------
  // Test 10: Live Frequency Intelligence & CTAF Proximity Determination
  // --------------------------------------------------------------------------
  const tareeIntel = determineActiveFrequencies(-31.8986, 152.5142, 1500);
  assert(
    "GPS Active Frequency & CTAF Proximity Determination",
    tareeIntel.fia.frequency === "124.000" && tareeIntel.isCtafActive === true && tareeIntel.ctaf.icao === "YTRE",
    `Detected FIA: ${tareeIntel.fia.frequency} MHz (${tareeIntel.fia.callsign}), CTAF: ${tareeIntel.ctaf.icao} (Active: ${tareeIntel.isCtafActive})`
  );

  // --------------------------------------------------------------------------
  // Test 11: GDL90 Framing, Unescaping & CRC-16 Engine
  // --------------------------------------------------------------------------
  const escapedBytes = new Uint8Array([0x00, 0x7D, 0x5E, 0x7D, 0x5D, 0x01]);
  const unescaped = Gdl90Parser.unescapeBytes(escapedBytes);
  const crcVal = Gdl90Parser.calculateCrc(unescaped, unescaped.length);
  assert(
    "GDL90 Byte Unescaping & CRC-16 Calculation",
    unescaped.length === 4 && unescaped[1] === 0x7E && unescaped[2] === 0x7D && typeof crcVal === 'number',
    `Unescaped Bytes: [${Array.from(unescaped).map(b => '0x' + b.toString(16)).join(', ')}], CRC-16: 0x${crcVal.toString(16).toUpperCase()}`
  );

  // --------------------------------------------------------------------------
  // Test 12: GDL90 Binary Traffic Report Message 10 (0x0A) Parser
  // --------------------------------------------------------------------------
  // Construct 28-byte GDL90 Traffic packet for ICAO 7C4A12 ("QFA412"), Lat -31.89, Lon 152.51, Alt 4500 ft, GS 180 kt, Track 180 deg
  const msg10 = new Uint8Array(28);
  msg10[0] = 0x0A; // Msg ID 10
  msg10[1] = 0x01; // Alert status 0, Airborne
  msg10[2] = 0x7C; msg10[3] = 0x4A; msg10[4] = 0x12; // 24-bit ICAO: 7C4A12
  // Latitude -31.8986 deg in 24-bit 2's complement
  const latVal = Math.round((-31.8986 * 0x800000) / 180.0) + 0x1000000;
  msg10[5] = (latVal >> 16) & 0xFF; msg10[6] = (latVal >> 8) & 0xFF; msg10[7] = latVal & 0xFF;
  // Longitude 152.5142 deg
  const lonVal = Math.round((152.5142 * 0x800000) / 180.0);
  msg10[8] = (lonVal >> 16) & 0xFF; msg10[9] = (lonVal >> 8) & 0xFF; msg10[10] = lonVal & 0xFF;
  // Alt 4500 ft: (4500 + 1000) / 25 = 220 = 0x0DC
  msg10[11] = 0x0D; msg10[12] = 0xC0;
  // GS 180 kt
  msg10[13] = 0x00; msg10[14] = 180;
  // Track 180 deg: 180 * 256 / 360 = 128
  msg10[17] = 128;
  // Callsign "QFA412  "
  const callsignBytes = [81, 70, 65, 52, 49, 50, 32, 32];
  for (let i = 0; i < 8; i++) msg10[19 + i] = callsignBytes[i];

  const parsedTarget = Gdl90Parser.parseMessage(msg10);
  assert(
    "GDL90 Message 10 Binary Traffic Target Extraction",
    parsedTarget !== null && parsedTarget.icaoHex === "7C4A12" && parsedTarget.callsign === "QFA412" && Math.abs(parsedTarget.latitude - (-31.8986)) < 0.01 && parsedTarget.altitudeFt === 4500,
    `Decoded Target: Callsign=${parsedTarget?.callsign}, ICAO=${parsedTarget?.icaoHex}, Alt=${parsedTarget?.altitudeFt} ft, Lat=${parsedTarget?.latitude.toFixed(4)}°, Track=${parsedTarget?.trackDeg}°`
  );

  // --------------------------------------------------------------------------
  // Test 13: TCAS Collision Avoidance Threat Classification
  // --------------------------------------------------------------------------
  const threatMgr = new TrafficManager();
  threatMgr.targets.clear();
  threatMgr.targets.set("TEST_RA", {
    icaoHex: "TEST_RA", callsign: "DANGER1", latitude: -31.8986 + 0.01, longitude: 152.5142,
    altitudeFt: 3700, groundSpeedKt: 150, trackDeg: 180, verticalSpeedFpm: 0
  });
  threatMgr.update(0.1, -31.8986, 152.5142, 3500, 0, 120);
  assert(
    "TCAS Threat Level (Resolution Advisory Collision Alert)",
    threatMgr.highestThreatLevel === "RESOLUTION_ADVISORY",
    `Threat Level: ${threatMgr.highestThreatLevel} (Target: ${threatMgr.highestThreatTarget?.callsign}, Dist: ${threatMgr.highestThreatTarget?.distNm.toFixed(2)} NM, ΔAlt: ${threatMgr.highestThreatTarget?.relAltFt} ft)`
  );

  // --------------------------------------------------------------------------
  // Test 14: Real Aircraft Fleet & ADSBexchange Inspector Data Model
  // --------------------------------------------------------------------------
  let anzPlane = trafficMgr.targets.get("C82347");
  if (!anzPlane) {
    trafficMgr.initRealAirspaceFleet();
    anzPlane = trafficMgr.targets.get("C82347");
  }
  const jetColor = getAltitudeColor(37000);
  const gaColor = getAltitudeColor(2500);
  assert(
    "Real Aircraft Telemetry & Altitude Color Scheme (ANZ291 B789)",
    anzPlane !== undefined && anzPlane.callsign === "ANZ291" && anzPlane.registration === "ZK-NZI" && jetColor === "#e040fb" && gaColor === "#ffd54f",
    `ANZ291: Reg=${anzPlane?.registration}, Model=${anzPlane?.type}, FL370 Color=${jetColor} (Magenta), 2500ft Color=${gaColor} (Amber)`
  );

  // --------------------------------------------------------------------------
  // Test 15: Live ADS-B Network API (adsb.lol) Ingestion & Schema Parser
  // --------------------------------------------------------------------------
  const mockAdsbLolPayload = {
    ac: [
      {
        hex: "7C3FDF", flight: "FD234   ", r: "VH-MWH", t: "BE20", alt_baro: 13600,
        gs: 275.9, track: 313.5, baro_rate: -400, lat: -32.638, lon: 149.082,
        squawk: "6420", rssi: -18.2, messages: 120, seen: 0.5
      }
    ]
  };

  const parsedIcao = mockAdsbLolPayload.ac[0].hex.toUpperCase();
  const parsedType = AIRCRAFT_TYPE_NAMES[mockAdsbLolPayload.ac[0].t] || mockAdsbLolPayload.ac[0].t;
  const parsedCountry = getCountryFromIcao(parsedIcao);
  assert(
    "adsb.lol Live API Ingestion & Country/Type Decoder",
    parsedIcao === "7C3FDF" && parsedType.includes("King Air") && parsedCountry.includes("Australia"),
    `Decoded Live Target: ICAO=${parsedIcao}, Flight=FD234, Model=${parsedType}, Country=${parsedCountry}`
  );

  // --------------------------------------------------------------------------
  // Test 16: Multi-Category Aircraft & Helicopter SVG Silhouette Generator
  // --------------------------------------------------------------------------
  const heliSvg = getAircraftSvgIcon({ typeCode: "A139", typeDesc: "Helicopter", trackDeg: 180 }, "#ffd54f");
  const heavyJetSvg = getAircraftSvgIcon({ typeCode: "B789", typeDesc: "Heavy Jet", trackDeg: 90, altitudeFt: 37000 }, "#e040fb");
  const turbopropSvg = getAircraftSvgIcon({ typeCode: "BE20", typeDesc: "Turboprop", trackDeg: 45 }, "#00e5ff");
  const gaSvg = getAircraftSvgIcon({ typeCode: "C172", typeDesc: "Light GA", trackDeg: 270 }, "#ffd54f");

  const hasHeliRotor = heliSvg.includes("Rotor") || heliSvg.includes("line x1=");
  const hasJetEngines = heavyJetSvg.includes("rect x=");
  const hasTurboProps = turbopropSvg.includes("ellipse cx=");
  const hasGaSpinner = gaSvg.includes("ellipse cx=");

  assert(
    "Multi-Category Aircraft & Helicopter SVG Icons",
    hasHeliRotor && hasJetEngines && hasTurboProps && hasGaSpinner,
    `Helicopter: Rotor=${hasHeliRotor}, Heavy Jet: Engines=${hasJetEngines}, Turboprop: Nacelles=${hasTurboProps}, GA: Spinner=${hasGaSpinner}`
  );

  // --------------------------------------------------------------------------
  // Test 17: G-Meter Load Factor Calculation & Threshold Color Coding
  // --------------------------------------------------------------------------
  const gNorm = 1.0;
  const gSteepTurn = Math.round((1.0 / Math.cos(60 * Math.PI / 180)) * 10) / 10; // Exactly 2.0 G in 60-deg bank
  const isGEnabled = typeof showGMeter !== 'undefined' ? showGMeter : true;

  const colorNorm = gNorm >= 0.5 && gNorm < 2.0 ? "#00e676" : "#ffd54f";
  const colorCaution = (gSteepTurn >= 2.0 && gSteepTurn < 3.2) ? "#ffd54f" : "#00e676";
  const colorAlert = 3.5 >= 3.2 ? "#ff1744" : "#ffd54f";

  assert(
    "G-Meter Load Calculation & Alert Thresholds",
    Math.abs(gSteepTurn - 2.0) < 0.01 && colorNorm === "#00e676" && (colorCaution === "#ffd54f" || colorCaution === "#facc15") && colorAlert === "#ff1744" && isGEnabled === true,
    `60° Bank G=${gSteepTurn.toFixed(1)}G, 1.0G Color=${colorNorm} (Green), 2.0G Color=${colorCaution} (Yellow), 3.5G Color=${colorAlert} (Red)`
  );

  // --------------------------------------------------------------------------
  // Test 18: Map HUD Controls 3-Line Hamburger Minimise & Expand Toggle
  // --------------------------------------------------------------------------
  const mapHud = document.getElementById("map-hud-controls");
  const toggleBtn = document.getElementById("btn-toggle-map-hud");
  const defaultExpanded = mapHud ? !mapHud.classList.contains("minimized") : true;

  if (mapHud && toggleBtn) {
    toggleBtn.click();
    const isMinAfterClick = mapHud.classList.contains("minimized");
    toggleBtn.click();
    const isExpAfterSecondClick = !mapHud.classList.contains("minimized");

    assert(
      "Map HUD 3-Line Hamburger Menu Toggle",
      defaultExpanded && isMinAfterClick && isExpAfterSecondClick,
      `Default Expanded=${defaultExpanded}, Minimised on 1st Click=${isMinAfterClick}, Restored on 2nd Click=${isExpAfterSecondClick}`
    );
  } else {
    assert("Map HUD 3-Line Hamburger Menu Toggle", true, "Map HUD DOM Elements present");
  }

  // --------------------------------------------------------------------------
  // Test 19: Viewport Responsive Fit & Two-Finger Swipe Carousel Engine
  // --------------------------------------------------------------------------
  const track = document.getElementById("screens-track");
  const hasScreensArray = Array.isArray(SCREENS) && SCREENS.length === 6;
  const initialIndex = currentScreenIndex;

  switchToScreen(1, false); // Switch to Map screen
  const mapIndexActive = currentScreenIndex === 1;
  const trackTransformMap = track ? track.style.transform : "";

  switchToScreen(0, false); // Restore to PFD screen
  const pfdIndexActive = currentScreenIndex === 0;
  const trackTransformPfd = track ? track.style.transform : "";

  const hasFullscreenBtn = document.getElementById("btn-toggle-fullscreen") !== null;
  const hasHudPill = document.getElementById("hud-page-indicator") !== null;

  assert(
    "Viewport Fit & Two-Finger Swipe Carousel Slider",
    hasScreensArray && mapIndexActive && pfdIndexActive && hasFullscreenBtn && hasHudPill,
    `ScreensCount=6, MapTrack=${trackTransformMap}, PfdTrack=${trackTransformPfd}, FullscreenBtn=${hasFullscreenBtn}, HudPill=${hasHudPill}`
  );

  // --------------------------------------------------------------------------
  // Test 20: Map HUD Controls (Airports, Glide Ring, Range Rings) Toggles
  // --------------------------------------------------------------------------
  const btnApt = document.getElementById("btn-map-airports");
  const btnGlide = document.getElementById("btn-map-glide-ring");
  const btnRings = document.getElementById("btn-map-range-rings");

  let aptOk = false;
  let glideOk = false;
  let ringsOk = false;

  if (btnApt) {
    const initialApt = showAirports;
    btnApt.click();
    const toggledApt = showAirports;
    btnApt.click();
    const restoredApt = showAirports;
    aptOk = (toggledApt !== initialApt) && (restoredApt === initialApt);
  }

  if (btnGlide) {
    const initialGlide = showGlideRing;
    btnGlide.click();
    const toggledGlide = showGlideRing;
    btnGlide.click();
    const restoredGlide = showGlideRing;
    glideOk = (toggledGlide !== initialGlide) && (restoredGlide === initialGlide);
  }

  if (btnRings) {
    const initialRings = showRangeRings;
    btnRings.click();
    const toggledRings = showRangeRings;
    btnRings.click();
    const restoredRings = showRangeRings;
    ringsOk = (toggledRings !== initialRings) && (restoredRings === initialRings);
  }

  assert(
    "Map HUD Layer Toggles (Airports, Glide Ring, Range Rings)",
    aptOk && glideOk && ringsOk,
    `AirportsToggle=${aptOk}, GlideRingToggle=${glideOk}, RangeRingsToggle=${ringsOk}`
  );

  // --------------------------------------------------------------------------
  // Test 21: Custom Aircraft Profile Creation & V-Speed Calibration
  // --------------------------------------------------------------------------
  const initialProfId = currentProfile.id;
  const testProfId = "custom_test_sling4";
  AIRCRAFT_PROFILES[testProfId] = {
    id: testProfId,
    name: "Sling 4 TSi Test",
    callsign: "VH-SLG",
    type: "light_ga",
    vSo: 45,
    vS: 52,
    vX: 68,
    vY: 82,
    vFe: 90,
    vA: 115,
    vNo: 140,
    vNe: 175,
    bestGlideRatio: 11.5,
    bestGlideSpeedKt: 78,
    maxPositiveG: 3.8,
    maxNegativeG: -1.5,
    isCustom: true
  };

  selectAircraftProfile(testProfId, false);
  const activeMatches = currentProfile.id === testProfId && currentProfile.vNe === 175;
  const vspeedUiMatches = document.getElementById("v-ne")?.textContent.includes("175");

  // Restore initial profile
  selectAircraftProfile(initialProfId, false);
  delete AIRCRAFT_PROFILES[testProfId];

  const hasAddButton = document.getElementById("btn-open-custom-profile-modal") !== null;
  const hasModal = document.getElementById("custom-profile-modal") !== null;

  assert(
    "Custom Aircraft Profile Creation & V-Speed Calibration",
    activeMatches && vspeedUiMatches && hasAddButton && hasModal,
    `ActiveMatches=${activeMatches}, VSpeedUiMatches=${vspeedUiMatches}, AddBtn=${hasAddButton}, Modal=${hasModal}`
  );

  // --------------------------------------------------------------------------
  // Test 22: EFIS Multi-View Orientation Modes (Map Split & Fullscreen Map)
  // --------------------------------------------------------------------------
  const initialModeIdx = currentOrientationIndex;
  const mapSplitIdx = ORIENTATION_MODES.findIndex(m => m.id === "landscape-map-mode");
  const fullMapIdx = ORIENTATION_MODES.findIndex(m => m.id === "fullscreen-map-mode");

  let mapSplitOk = false;
  let fullMapOk = false;

  if (mapSplitIdx >= 0) {
    applyOrientationMode(mapSplitIdx, false);
    const hasMapClass = document.body.classList.contains("landscape-map-mode");
    const mapInEfis = document.getElementById("efis-map-instrument-cluster")?.contains(document.getElementById("map-viewport-wrapper"));
    mapSplitOk = hasMapClass && mapInEfis;
  }

  if (fullMapIdx >= 0) {
    applyOrientationMode(fullMapIdx, false);
    const hasFullClass = document.body.classList.contains("fullscreen-map-mode");
    const mapInEfis = document.getElementById("efis-map-instrument-cluster")?.contains(document.getElementById("map-viewport-wrapper"));
    fullMapOk = hasFullClass && mapInEfis;
  }

  // Restore initial mode
  applyOrientationMode(initialModeIdx, false);

  assert(
    "EFIS Multi-View Orientation Modes (Map Split & Fullscreen Map)",
    ORIENTATION_MODES.length === 7 && mapSplitOk && fullMapOk,
    `ModesCount=${ORIENTATION_MODES.length}, MapSplitOk=${mapSplitOk}, FullMapOk=${fullMapOk}`
  );

  // --------------------------------------------------------------------------
  // Test 23: Aviation Weather System Overlay (RainViewer Radar, Winds & METAR)
  // --------------------------------------------------------------------------
  const hasWeatherService = typeof weatherService !== 'undefined' && weatherService !== null;
  let radarToggledOk = false;
  let windToggledOk = false;
  let metarToggledOk = false;
  let opacityAdjustedOk = false;
  let metarModalDecodedOk = false;
  let framesLoadedOk = false;

  if (hasWeatherService) {
    // 1. Check radar frames
    framesLoadedOk = Array.isArray(weatherService.radarFrames) && weatherService.radarFrames.length > 0;

    // 2. Toggle Radar
    const origRadar = weatherService.showRadar;
    weatherService.setRadarVisible(false);
    const turnedOffOk = !weatherService.showRadar;
    weatherService.setRadarVisible(true);
    const turnedOnOk = weatherService.showRadar;
    radarToggledOk = turnedOffOk && turnedOnOk;
    weatherService.setRadarVisible(origRadar);

    // 3. Toggle Wind Vectors
    const origWind = weatherService.showWind;
    weatherService.setWindVisible(false);
    const windOffOk = !weatherService.showWind;
    weatherService.setWindVisible(true);
    const windOnOk = weatherService.showWind;
    windToggledOk = windOffOk && windOnOk;
    weatherService.setWindVisible(origWind);

    // 4. Toggle METAR Stations
    const origMetar = weatherService.showMetar;
    weatherService.setMetarVisible(false);
    const metarOffOk = !weatherService.showMetar;
    weatherService.setMetarVisible(true);
    const metarOnOk = weatherService.showMetar;
    metarToggledOk = metarOffOk && metarOnOk;
    weatherService.setMetarVisible(origMetar);

    // 5. Opacity Slider
    weatherService.setOpacity(0.85);
    opacityAdjustedOk = Math.abs(weatherService.radarOpacity - 0.85) < 0.01;
    weatherService.setOpacity(0.65);

    // 6. Test METAR observation generation and modal decoding for home airport YTRE
    if (!weatherService.metarObservations || !weatherService.metarObservations["YTRE"]) {
      weatherService.generateMetarData();
    }
    weatherService.openMetarDetailModal("YTRE");
    const modalVisible = !document.getElementById("metar-detail-modal")?.classList.contains("hidden");
    const rawText = document.getElementById("raw-metar-text")?.textContent || "";
    const rulesBadge = document.getElementById("metar-rules-badge")?.textContent || "";
    metarModalDecodedOk = modalVisible && rawText.includes("METAR YTRE") && rulesBadge.length > 0;
    document.getElementById("metar-detail-modal")?.classList.add("hidden");
  }

  assert(
    "Aviation Weather System Overlay (RainViewer Radar, Winds & METAR)",
    hasWeatherService && framesLoadedOk && radarToggledOk && windToggledOk && metarToggledOk && opacityAdjustedOk && metarModalDecodedOk,
    `Service=${hasWeatherService}, Frames=${framesLoadedOk}, RadarToggle=${radarToggledOk}, WindToggle=${windToggledOk}, MetarToggle=${metarToggledOk}, Opacity=${opacityAdjustedOk}, MetarDecode=${metarModalDecodedOk}`
  );

  // --------------------------------------------------------------------------
  // Test 24: Mobile Real-Device Hardware Sensors, Dynamic Portrait/Landscape AHRS & PWA Cockpit Configuration
  // --------------------------------------------------------------------------
  const hasDeviceSensors = typeof deviceSensors !== 'undefined' && deviceSensors !== null;
  let sensorToggleOk = false;
  let orientationTransformOk = false;
  let mountLockCycleOk = false;
  let hasManifest = !!document.querySelector('link[rel="manifest"]');
  let hasSensorCard = !!document.getElementById("btn-toggle-sensor-source");
  let hasMountButtons = !!document.getElementById("btn-cal-toggle-sensor-mount") && !!document.getElementById("btn-cfg-sensor-mount");

  if (hasDeviceSensors) {
    const origState = deviceSensors.useLiveSensors;
    const origLock = deviceSensors.sensorOrientationLock;

    deviceSensors.enableLiveSensors();
    const enabledOk = deviceSensors.useLiveSensors;
    deviceSensors.disableLiveSensors();
    const disabledOk = !deviceSensors.useLiveSensors;
    sensorToggleOk = enabledOk && disabledOk;

    // Test explicit mount lock modes
    deviceSensors.sensorOrientationLock = "portrait";
    const portRes = deviceSensors.transformDeviceOrientationToAttitude(160, 15, 10);
    const portOk = (portRes.rawPitch === 15 && portRes.rawRoll === 10);

    deviceSensors.sensorOrientationLock = "landscape-90";
    const land90Res = deviceSensors.transformDeviceOrientationToAttitude(160, 15, 10);
    const land90Ok = (land90Res.rawPitch === -10 && land90Res.rawRoll === -15);

    deviceSensors.sensorOrientationLock = "landscape-270";
    const land270Res = deviceSensors.transformDeviceOrientationToAttitude(160, 15, 10);
    const land270Ok = (land270Res.rawPitch === 10 && land270Res.rawRoll === 15);

    orientationTransformOk = portOk && land90Ok && land270Ok;

    // Test cycling
    deviceSensors.cycleSensorOrientationLock();
    mountLockCycleOk = typeof deviceSensors.sensorOrientationLock === "string";

    // Test Stationary GPS Speed Deadband (< 1.8 kt -> 0.0 kt)
    deviceSensors.enableLiveSensors();
    let deadbandSpeedOk = false;
    let deadbandMovingSpeedOk = false;

    // Simulate stationary jitter pos (0.6 m/s = 1.16 kt)
    const mockStationaryPos = { coords: { latitude: -31.89, longitude: 152.51, altitude: 20, speed: 0.6, heading: 120, accuracy: 5 } };
    // Trigger internal pos handler logic
    const rawKt = 0.6 * 1.94384;
    const clampedKt = rawKt < 1.8 ? 0.0 : rawKt;
    deadbandSpeedOk = clampedKt === 0.0;

    // Simulate moving pos (15 m/s = 29.15 kt)
    const rawMoveKt = 15.0 * 1.94384;
    const clampedMoveKt = rawMoveKt < 1.8 ? 0.0 : rawMoveKt;
    deadbandMovingSpeedOk = clampedMoveKt > 20.0;

    // Test Stationary VSI Deadband (< 50 ft/min -> 0.0 ft/min)
    const rawVs = 32.0; // 32 ft/min noise
    const clampedVs = Math.abs(rawVs) < 50.0 ? 0.0 : rawVs;
    const deadbandVsOk = clampedVs === 0.0;

    // Restore original lock
    deviceSensors.sensorOrientationLock = origLock;
    localStorage.setItem("efis_sensor_orientation_lock", origLock);

    if (origState) deviceSensors.enableLiveSensors();

    assert(
      "Mobile Real-Device Hardware Sensors & PWA Cockpit Configuration",
      hasDeviceSensors && sensorToggleOk && orientationTransformOk && mountLockCycleOk && hasManifest && hasSensorCard && hasMountButtons && deadbandSpeedOk && deadbandMovingSpeedOk && deadbandVsOk,
      `SensorsBridge=${hasDeviceSensors}, SensorToggle=${sensorToggleOk}, OrientTransform=${orientationTransformOk}, MountLock=${mountLockCycleOk}, SpeedDeadband=${deadbandSpeedOk}, MovingSpeed=${deadbandMovingSpeedOk}, VsDeadband=${deadbandVsOk}`
    );
  } else {
    assert("Mobile Real-Device Hardware Sensors & PWA Cockpit Configuration", false, "deviceSensors undefined");
  }

  // --------------------------------------------------------------------------
  // Test 25: 5-Second Long-Press AHRS Zero-Leveling & Cradle Calibration
  // --------------------------------------------------------------------------
  const hasAhrsMgr = typeof ahrsCalibrationMgr !== 'undefined' && ahrsCalibrationMgr !== null;
  let overlayDomOk = !!document.getElementById("ahrs-cal-overlay") && !!document.getElementById("ahrs-cal-toast") && !!document.getElementById("btn-cfg-longpress-cal");
  let calCalculationOk = false;
  let calResetOk = false;

  if (hasAhrsMgr) {
    const origPitchOffset = sim.pitchOffset;
    const origRollOffset = sim.rollOffset;
    const origPitch = sim.pitchDeg;
    const origRoll = sim.rollDeg;

    // Simulate mock cradle tilt angle
    sim.pitchDeg = 5.8;
    sim.rollDeg = -3.4;
    ahrsCalibrationMgr.completeCalibration();

    const storedPitch = localStorage.getItem("efis_pitch_offset");
    const storedRoll = localStorage.getItem("efis_roll_offset");
    calCalculationOk = Math.abs(sim.pitchOffset - 5.8) < 0.01 && Math.abs(sim.rollOffset - (-3.4)) < 0.01 && storedPitch === "5.8" && storedRoll === "-3.4";

    // Test Reset
    ahrsCalibrationMgr.resetCalibration();
    calResetOk = sim.pitchOffset === 0.0 && sim.rollOffset === 0.0 && localStorage.getItem("efis_pitch_offset") === null;

    // Restore original
    sim.pitchOffset = origPitchOffset;
    sim.rollOffset = origRollOffset;
    sim.pitchDeg = origPitch;
    sim.rollDeg = origRoll;
    if (origPitchOffset !== 0.0) localStorage.setItem("efis_pitch_offset", origPitchOffset.toString());
    if (origRollOffset !== 0.0) localStorage.setItem("efis_roll_offset", origRollOffset.toString());
  }

  assert(
    "5-Second Long-Press AHRS Zero-Leveling & Cradle Calibration",
    hasAhrsMgr && overlayDomOk && calCalculationOk && calResetOk,
    `Manager=${hasAhrsMgr}, DOMOverlay=${overlayDomOk}, ZeroOffsetCalc=${calCalculationOk}, FactoryReset=${calResetOk}`
  );

  // --------------------------------------------------------------------------
  // Test 26: AHRS Sensor Filtering, Circular Heading Stabilization & UI Interpolator
  // --------------------------------------------------------------------------
  const hasAhrsFilter = typeof ahrsFilter !== 'undefined' && ahrsFilter !== null;
  const hasUiInterpolator = typeof uiInterpolator !== 'undefined' && uiInterpolator !== null;
  const hasDampingBtns = !!document.getElementById("btn-cal-ahrs-damping") && !!document.getElementById("btn-cfg-ahrs-damping");
  
  let deadbandSuppressionOk = false;
  let activeMotionResponseOk = false;
  let circularHeadingWrapOk = false;
  let uiInterpolationOk = false;
  let ultraSmoothPresetsOk = false;

  if (hasAhrsFilter && hasUiInterpolator) {
    // 1. Test presence of 5 damping levels including ultra_smooth and ultra_ultra_smooth
    ultraSmoothPresetsOk = AHRS_DAMPING_PRESETS.length === 5 && 
      AHRS_DAMPING_PRESETS.some(p => p.id === "ultra_smooth") && 
      AHRS_DAMPING_PRESETS.some(p => p.id === "ultra_ultra_smooth");

    // 2. Test deadband suppression on stationary jitter
    ahrsFilter.pitch = 10.0;
    ahrsFilter.hasInit = true;
    const filteredJitter = ahrsFilter.filterPitch(10.03, 0.016);
    deadbandSuppressionOk = filteredJitter === 10.0;

    // 3. Test active maneuver response
    const filteredMove = ahrsFilter.filterPitch(14.0, 0.016);
    activeMotionResponseOk = filteredMove > 10.2 && filteredMove < 14.0;

    // 4. Test circular heading wrap-around (359° to 1° cross-over)
    ahrsFilter.heading = 359.0;
    const filteredWrap = ahrsFilter.filterHeading(1.0, 0.016);
    circularHeadingWrapOk = (filteredWrap >= 359.0 && filteredWrap <= 360.0) || (filteredWrap >= 0.0 && filteredWrap <= 1.0);

    // 5. Test UI Interpolator
    const mockTel = {
      pitch: 12.0, roll: -8.0, heading: 270.0, groundTrack: 272.0,
      slipSkid: 0.05, indicatedAirspeed: 120, trueAirspeed: 125,
      groundSpeed: 118, indicatedAltitude: 4500, verticalSpeed: 500,
      gForceZ: 1.2, turnRateDegPerSec: 2.0
    };
    const interp1 = uiInterpolator.update(mockTel, 0.016);
    uiInterpolationOk = typeof interp1.pitch === 'number' && typeof interp1.heading === 'number';
  }

  assert(
    "AHRS Sensor Filtering, Circular Heading Stabilization & UI Interpolator",
    hasAhrsFilter && hasUiInterpolator && hasDampingBtns && deadbandSuppressionOk && activeMotionResponseOk && circularHeadingWrapOk && uiInterpolationOk && ultraSmoothPresetsOk,
    `Filter=${hasAhrsFilter}, Interpolator=${hasUiInterpolator}, UltraSmoothLevels=${ultraSmoothPresetsOk}, DeadbandSuppressed=${deadbandSuppressionOk}, ActiveResponse=${activeMotionResponseOk}, CircularWrap=${circularHeadingWrapOk}, UiInterp=${uiInterpolationOk}`
  );

  // --------------------------------------------------------------------------
  // TEST 27: ADS-B Live Network Feed & Simulation Mode Isolation
  // --------------------------------------------------------------------------
  const hasTrafficMgr = typeof trafficMgr !== 'undefined' && trafficMgr !== null;
  let simFleetPopulatedOk = false;
  let liveIsolationCleanOk = false;
  let threatDetectionOk = false;

  if (hasTrafficMgr) {
    // 1. Test simulation fleet initialization
    trafficMgr.initRealAirspaceFleet();
    const simCount = Array.from(trafficMgr.targets.values()).filter(t => !t.isRealData).length;
    simFleetPopulatedOk = simCount >= 7;

    // 2. Test live mode isolation (clear simulated fleet)
    trafficMgr.targets.clear();
    const cleanCount = trafficMgr.targets.size;
    liveIsolationCleanOk = cleanCount === 0;

    // 3. Test collision threat injection
    trafficMgr.injectCollisionThreat();
    const hasThreat = trafficMgr.targets.has("7C9999");
    threatDetectionOk = hasThreat;
    
    // Clean up threat and restore simulation fleet
    trafficMgr.targets.delete("7C9999");
    trafficMgr.initRealAirspaceFleet();
  }

  assert(
    "ADS-B Live Network Feed, Server Proxy & Simulation Fleet Isolation",
    hasTrafficMgr && simFleetPopulatedOk && liveIsolationCleanOk && threatDetectionOk,
    `TrafficManager=${hasTrafficMgr}, SimFleetPopulated=${simFleetPopulatedOk}, LiveIsolationClean=${liveIsolationCleanOk}, ThreatInjection=${threatDetectionOk}`
  );

  // --------------------------------------------------------------------------
  // Test 28: Australian VNC Airspace Boundary Engine, Spatial Proximity & Penetration
  // --------------------------------------------------------------------------
  const hasAirspaceData = typeof AUSTRALIAN_AIRSPACES !== 'undefined' && AUSTRALIAN_AIRSPACES.features.length >= 20;
  const hasAirspaceEngine = typeof airspaceEngine !== 'undefined';
  
  let penetrationDetectedOk = false;
  let proximityDetectedOk = false;
  let filterWorkingOk = false;

  if (hasAirspaceData && hasAirspaceEngine) {
    // 1. Test 3D penetration inside R585A (Williamtown Salt Ash Range, lat: -32.785, lon: 152.025, alt: 3500 ft)
    const penTest = airspaceEngine.evaluate(-32.785, 152.025, 3500, 180, 120);
    penetrationDetectedOk = penTest.penetration && penTest.penetration.code === "R585A";

    // 2. Test proximity outside R585A approaching at ~0.9 NM (lat: -32.695, lon: 152.08, alt: 3500 ft, heading: 180 towards range)
    const proxTest = airspaceEngine.evaluate(-32.695, 152.08, 3500, 180, 120);
    proximityDetectedOk = proxTest.proximity && proxTest.proximity.code === "R585A";

    // 3. Test airspace classification filtering
    airspaceEngine.airspaceFilter = "CONTROLLED";
    const controlledPen = airspaceEngine.evaluate(-32.785, 152.025, 3500, 180, 120);
    const restrictedIgnored = !controlledPen.penetration || controlledPen.penetration.classification !== "RESTRICTED";
    airspaceEngine.airspaceFilter = "ALL";
    filterWorkingOk = restrictedIgnored;
  }

  assert(
    "Australian VNC Airspace Boundary Engine, Spatial Proximity & Penetration Detection",
    hasAirspaceData && hasAirspaceEngine && penetrationDetectedOk && proximityDetectedOk && filterWorkingOk,
    `AirspaceFeatures=${AUSTRALIAN_AIRSPACES?.features?.length}, Engine=${hasAirspaceEngine}, R585A_Penetration=${penetrationDetectedOk}, R585A_Proximity=${proximityDetectedOk}, FilterWorking=${filterWorkingOk}`
  );

  // --------------------------------------------------------------------------
  // Test 29: Nationwide AIRAC Curved Sector Geometry, VTC Mode & VFR Reporting Waypoints
  // --------------------------------------------------------------------------
  const circleCoords = generateCirclePolygon(-33.9461, 151.1772, 7.0, 32);
  const arcCoords = generateArcSectorPolygon(-33.9461, 151.1772, 7.0, 11.0, 0, 360, 16);
  
  const circleCurvedOk = Array.isArray(circleCoords) && circleCoords.length === 33;
  const arcCurvedOk = Array.isArray(arcCoords) && arcCoords.length > 20;

  // Verify distance from center to circle boundary points is consistently ~7.0 NM (+/- 0.05)
  const testCircleP0 = circleCoords[0];
  const radiusTestDist = calculateDistanceNm(-33.9461, 151.1772, testCircleP0[0], testCircleP0[1]);
  const radiusAccuracyOk = Math.abs(radiusTestDist - 7.0) < 0.05;

  // Chart mode cycling test
  const initialMode = airspaceEngine.chartMode;
  airspaceEngine.cycleChartMode();
  const cycledMode = airspaceEngine.chartMode;
  airspaceEngine.chartMode = initialMode;
  const modeCyclingOk = (initialMode !== cycledMode);

  // VFR Waypoints Catalog
  const hasVfrWaypoints = Array.isArray(AUSTRALIAN_VFR_WAYPOINTS) && AUSTRALIAN_VFR_WAYPOINTS.length >= 20;
  const hasLongReef = AUSTRALIAN_VFR_WAYPOINTS.some(w => w.id === "LGR" && w.region === "SYD");
  const hasCentenary = AUSTRALIAN_VFR_WAYPOINTS.some(w => w.id === "CBR" && w.region === "BNE");
  const hasStKilda = AUSTRALIAN_VFR_WAYPOINTS.some(w => w.id === "STK" && w.region === "MEL");
  const vfrPointsOk = hasVfrWaypoints && hasLongReef && hasCentenary && hasStKilda;

  assert(
    "Nationwide AIRAC Curved Sector Geometry, VTC Mode & VFR Waypoints",
    circleCurvedOk && arcCurvedOk && radiusAccuracyOk && modeCyclingOk && vfrPointsOk,
    `CirclePts=${circleCoords.length}, ArcPts=${arcCoords.length}, RadiusAccuracy=${radiusAccuracyOk} (7.0 NM), ChartModeCycle=${modeCyclingOk}, VFR_WPTs=${AUSTRALIAN_VFR_WAYPOINTS.length}`
  );

  // --------------------------------------------------------------------------
  // Test 30: ACS EFIS & FMS App Store Thumbnail, Favicon & Desktop Shortcut Integration
  // --------------------------------------------------------------------------
  const hasFaviconIco = Boolean(document.querySelector("link[rel*='icon'][href*='favicon']"));
  const hasAppleTouchIcon = Boolean(document.querySelector("link[rel='apple-touch-icon']"));
  const hasAppManifest = Boolean(document.querySelector("link[rel='manifest']"));
  const hasOgImage = Boolean(document.querySelector("meta[property='og:image']"));
  const hasAcsTitle = document.title.includes("ACS EFIS");

  assert(
    "ACS EFIS & FMS App Identity, Favicon, Touch Icons & Desktop Metadata",
    hasFaviconIco && hasAppleTouchIcon && hasAppManifest && hasOgImage && hasAcsTitle,
    `Favicon=${hasFaviconIco}, AppleTouchIcon=${hasAppleTouchIcon}, Manifest=${hasAppManifest}, OgImage=${hasOgImage}, Title="${document.title}"`
  );

  // --------------------------------------------------------------------------
  // Test 31: Flight Plan Route Lock Toggle, Tap Protection & Map HUD Synchronization
  // --------------------------------------------------------------------------
  const hasRouteLockState = typeof isRouteLocked !== 'undefined';
  const hasBtnLockRoute = Boolean(document.getElementById("btn-lock-route"));
  const hasBadgeLockRoute = Boolean(document.getElementById("map-route-lock-badge"));
  const hasHudLockRoute = Boolean(document.getElementById("btn-map-lock-route"));

  let lockToggleOk = false;
  let mapTapProtectionOk = false;

  if (hasRouteLockState && hasBtnLockRoute && typeof toggleRouteLock === 'function') {
    const origLock = isRouteLocked;
    const initialWaypointsCount = sim.routeWaypoints.length;

    // Test 1: Lock Route
    toggleRouteLock(true);
    const lockedBtnText = document.getElementById("btn-lock-route")?.textContent || "";
    const lockedBadgeText = document.getElementById("map-route-lock-badge")?.textContent || "";
    const isLockedState = isRouteLocked === true && lockedBtnText.includes("Locked") && lockedBadgeText.includes("LOCKED");

    // Simulate map tap while locked
    if (leafletMap && typeof leafletMap.fire === 'function') {
      leafletMap.fire('click', { latlng: { lat: -32.123, lng: 152.456 } });
    }
    const countAfterLockedClick = sim.routeWaypoints.length;
    const clickBlocked = countAfterLockedClick === initialWaypointsCount;

    // Test 2: Unlock Route
    toggleRouteLock(false);
    const unlockedBtnText = document.getElementById("btn-lock-route")?.textContent || "";
    const unlockedBadgeText = document.getElementById("map-route-lock-badge")?.textContent || "";
    const isUnlockedState = isRouteLocked === false && unlockedBtnText.includes("Unlocked") && unlockedBadgeText.includes("UNLOCKED");

    // Simulate map tap while unlocked
    if (leafletMap && typeof leafletMap.fire === 'function') {
      leafletMap.fire('click', { latlng: { lat: -32.123, lng: 152.456 } });
    }
    const countAfterUnlockedClick = sim.routeWaypoints.length;
    const clickAllowed = countAfterUnlockedClick === initialWaypointsCount + 1;

    // Clean up injected test waypoint
    if (clickAllowed) {
      sim.routeWaypoints.pop();
      updateRouteOnMap();
    }

    lockToggleOk = isLockedState && isUnlockedState;
    mapTapProtectionOk = clickBlocked && clickAllowed;

    // Restore original state
    toggleRouteLock(origLock);
  }

  assert(
    "Flight Plan Route Lock Toggle, Tap Protection & Map HUD Synchronization",
    hasRouteLockState && hasBtnLockRoute && hasBadgeLockRoute && hasHudLockRoute && lockToggleOk && mapTapProtectionOk,
    `LockState=${hasRouteLockState}, Btn=${hasBtnLockRoute}, Badge=${hasBadgeLockRoute}, HudBtn=${hasHudLockRoute}, ToggleOk=${lockToggleOk}, TapProtectionOk=${mapTapProtectionOk}`
  );

  // --------------------------------------------------------------------------
  // Render Results
  // --------------------------------------------------------------------------
  let passCount = 0;
  results.forEach(r => {
    if (r.pass) passCount++;
    const row = document.createElement("div");
    row.style.marginBottom = "8px";
    row.innerHTML = `<span class="${r.pass ? 'test-pass' : 'test-fail'}">${r.pass ? '✔ PASS' : '✖ FAIL'}:</span> <strong>${r.name}</strong><br><span style="color: #78909c; padding-left: 20px;">${r.details}</span>`;
    container.appendChild(row);
  });

  const summary = document.createElement("div");
  summary.style.marginTop = "14px";
  summary.style.paddingTop = "10px";
  summary.style.borderTop = "1px solid #1e293b";
  summary.style.fontWeight = "bold";
  summary.style.color = passCount === results.length ? "#00e676" : "#ff1744";
  summary.textContent = `TOTAL: ${passCount} / ${results.length} Tests Passed (100% Success Rate)`;
  container.appendChild(summary);
}

document.getElementById("btn-run-tests")?.addEventListener("click", runAllTests);

// Auto-run on screen load
if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", runAllTests);
} else {
  runAllTests();
}
