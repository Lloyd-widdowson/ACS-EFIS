/**
 * AVIATION EFIS, GARMIN SYNTHETIC VISION (SVT) & MAP BACKDROP SUITE
 * With Turn Coordinator & Inclinometer Ball, Garmin Slip Brick, Flight Path Marker, 3D Terrain & Bugs
 */

// ============================================================================
// 1. AUSTRALIAN AIRPORTS DATABASE & BASE CONFIGURATION
// ============================================================================
const AUSTRALIAN_AIRPORTS = [
  {
    icao: "YTRE", iata: "TRO", name: "Taree Airport (Mid North Coast NSW)",
    lat: -31.8986, lon: 152.5142, elevationFt: 37, towerFreq: "118.100 (CTAF)", atisFreq: "128.525 (AWIS)",
    runways: "04/22 (4,934 ft Asphalt), 12/30 (3,491 ft Grass)", surface: "Asphalt / Grass", type: "Regional Hub / GA Base"
  },
  {
    icao: "YPMQ", iata: "PQQ", name: "Port Macquarie Airport",
    lat: -31.4358, lon: 152.8631, elevationFt: 15, towerFreq: "118.100 (CTAF)", atisFreq: "127.050 (AWIS)",
    runways: "03/21 (5,250 ft Asphalt)", surface: "Asphalt", type: "Regional Airport"
  },
  {
    icao: "YKMP", iata: "KPS", name: "Kempsey Airport",
    lat: -31.0747, lon: 152.7703, elevationFt: 56, towerFreq: "126.700 (CTAF)", atisFreq: "128.450 (AWIS)",
    runways: "04/22 (5,413 ft Asphalt)", surface: "Asphalt", type: "General Aviation"
  },
  {
    icao: "YCFS", iata: "CFS", name: "Coffs Harbour Airport",
    lat: -30.3206, lon: 153.1167, elevationFt: 18, towerFreq: "118.200 (TWR)", atisFreq: "128.450 (ATIS)",
    runways: "03/21 (6,801 ft Asphalt)", surface: "Asphalt", type: "Controlled Airport"
  },
  {
    icao: "YWLM", iata: "NTL", name: "Newcastle Airport / RAAF Williamtown",
    lat: -32.7950, lon: 151.8344, elevationFt: 31, towerFreq: "118.300 (TWR)", atisFreq: "134.450 (ATIS)",
    runways: "12/30 (8,000 ft Asphalt)", surface: "Asphalt / Concrete", type: "Military & Regional"
  },
  {
    icao: "YMAY", iata: "MTL", name: "Maitland Airport (Royal Newcastle Aero Club)",
    lat: -32.7033, lon: 151.4883, elevationFt: 85, towerFreq: "122.700 (CTAF)", atisFreq: "128.600 (AWIS)",
    runways: "05/23 (3,937 ft Asphalt), 08/26 (2,625 ft Grass)", surface: "Asphalt / Grass", type: "Aero Club & GA"
  },
  {
    icao: "YCNL", iata: "CES", name: "Cessnock Airport (Hunter Valley)",
    lat: -32.7881, lon: 151.3417, elevationFt: 210, towerFreq: "126.700 (CTAF)", atisFreq: "128.750 (AWIS)",
    runways: "17/35 (3,445 ft Asphalt)", surface: "Asphalt", type: "General Aviation"
  },
  {
    icao: "YGLI", iata: "FOT", name: "Forster (Wallis Island Airstrip)",
    lat: -32.2039, lon: 152.4833, elevationFt: 10, towerFreq: "126.700 (CTAF)", atisFreq: "126.700",
    runways: "14/32 (2,800 ft Grass)", surface: "Grass / Unsealed", type: "Airstrip"
  },
  {
    icao: "YSTW", iata: "TMW", name: "Tamworth Regional Airport",
    lat: -31.0839, lon: 150.8469, elevationFt: 1334, towerFreq: "119.400 (TWR)", atisFreq: "123.800 (ATIS)",
    runways: "12L/30R (7,218 ft Asphalt)", surface: "Asphalt", type: "Flight Training Hub"
  },
  {
    icao: "YARM", iata: "ARM", name: "Armidale Airport",
    lat: -30.5281, lon: 151.6172, elevationFt: 3556, towerFreq: "126.700 (CTAF)", atisFreq: "128.350 (AWIS)",
    runways: "05/23 (4,685 ft Asphalt)", surface: "Asphalt", type: "High Elevation GA"
  },
  {
    icao: "YSBK", iata: "BWU", name: "Bankstown Airport (Sydney Metro GA Hub)",
    lat: -33.9244, lon: 150.9883, elevationFt: 29, towerFreq: "132.800 (TWR)", atisFreq: "120.900 (ATIS)",
    runways: "11C/29C (3,609 ft), 11L/29R (3,609 ft), 11R/29L (3,609 ft)", surface: "Asphalt", type: "Major GA Hub"
  },
  {
    icao: "YSSY", iata: "SYD", name: "Sydney Kingsford Smith International",
    lat: -33.9461, lon: 151.1772, elevationFt: 21, towerFreq: "120.500 (TWR)", atisFreq: "126.250 (ATIS)",
    runways: "16R/34L (13,000 ft), 07/25 (8,300 ft)", surface: "Asphalt / Concrete", type: "Major International"
  },
  {
    icao: "YSCN", iata: "CDU", name: "Camden Airport (Sydney Outer GA)",
    lat: -34.0392, lon: 150.6878, elevationFt: 230, towerFreq: "120.100 (TWR)", atisFreq: "125.100 (ATIS)",
    runways: "06/24 (4,790 ft Asphalt), 10/28 (2,400 ft Grass)", surface: "Asphalt / Grass", type: "General Aviation"
  },
  {
    icao: "YWOL", iata: "WOL", name: "Shellharbour Airport (Wollongong / Illawarra)",
    lat: -34.5606, lon: 150.7894, elevationFt: 31, towerFreq: "127.300 (CTAF)", atisFreq: "126.800 (AWIS)",
    runways: "16/34 (5,968 ft Asphalt), 08/26 (4,393 ft)", surface: "Asphalt", type: "Regional & Museum"
  },
  {
    icao: "YBNA", iata: "BNK", name: "Ballina Byron Gateway Airport",
    lat: -28.8336, lon: 153.5606, elevationFt: 7, towerFreq: "124.200 (CTAF)", atisFreq: "128.550 (AWIS)",
    runways: "06/24 (6,234 ft Asphalt)", surface: "Asphalt", type: "Regional Coastal"
  },
  {
    icao: "YBCG", iata: "OOL", name: "Gold Coast Airport (Coolangatta)",
    lat: -28.1644, lon: 153.5053, elevationFt: 21, towerFreq: "118.700 (TWR)", atisFreq: "128.000 (ATIS)",
    runways: "14/32 (8,176 ft Asphalt)", surface: "Asphalt", type: "Major Regional Intl"
  },
  {
    icao: "YBAF", iata: "ARC", name: "Archerfield Airport (Brisbane GA Hub)",
    lat: -27.5703, lon: 153.0078, elevationFt: 63, towerFreq: "118.100 (TWR)", atisFreq: "120.900 (ATIS)",
    runways: "10L/28R (4,869 ft), 04L/22R (3,609 ft)", surface: "Asphalt / Grass", type: "Major GA Hub"
  },
  {
    icao: "YBBN", iata: "BNE", name: "Brisbane International Airport",
    lat: -27.3842, lon: 153.1175, elevationFt: 13, towerFreq: "120.500 (TWR)", atisFreq: "125.500 (ATIS)",
    runways: "01R/19L (11,483 ft), 01L/19R (10,827 ft)", surface: "Asphalt", type: "Major International"
  },
  {
    icao: "YBSU", iata: "MCY", name: "Sunshine Coast Airport (Maroochydore)",
    lat: -26.6033, lon: 153.0911, elevationFt: 15, towerFreq: "124.400 (TWR)", atisFreq: "128.600 (ATIS)",
    runways: "13/31 (8,038 ft Asphalt)", surface: "Asphalt", type: "Regional Airport"
  },
  {
    icao: "YSCB", iata: "CBR", name: "Canberra International Airport",
    lat: -35.3069, lon: 149.1950, elevationFt: 1886, towerFreq: "118.700 (TWR)", atisFreq: "123.800 (ATIS)",
    runways: "17/35 (10,771 ft), 12/30 (5,512 ft)", surface: "Asphalt", type: "Capital Airport"
  },
  {
    icao: "YMMB", iata: "MBW", name: "Moorabbin Airport (Melbourne GA Hub)",
    lat: -37.9758, lon: 145.1022, elevationFt: 50, towerFreq: "118.100 (TWR)", atisFreq: "120.900 (ATIS)",
    runways: "17L/35R (4,377 ft), 13L/31R (3,786 ft)", surface: "Asphalt", type: "Major GA Hub"
  },
  {
    icao: "YMML", iata: "MEL", name: "Melbourne Tullamarine Airport",
    lat: -37.6733, lon: 144.8433, elevationFt: 434, towerFreq: "120.500 (TWR)", atisFreq: "132.700 (ATIS)",
    runways: "16/34 (11,998 ft), 09/27 (7,500 ft)", surface: "Asphalt", type: "Major International"
  },
  {
    icao: "YPAD", iata: "ADL", name: "Adelaide International Airport",
    lat: -34.9450, lon: 138.5306, elevationFt: 20, towerFreq: "120.500 (TWR)", atisFreq: "134.500 (ATIS)",
    runways: "05/23 (10,171 ft), 12/30 (5,420 ft)", surface: "Asphalt", type: "Major International"
  },
  {
    icao: "YPPH", iata: "PER", name: "Perth International Airport",
    lat: -31.9403, lon: 115.9669, elevationFt: 67, towerFreq: "120.500 (TWR)", atisFreq: "123.800 (ATIS)",
    runways: "03/21 (11,299 ft), 06/24 (7,096 ft)", surface: "Asphalt", type: "Major International"
  },
  {
    icao: "YPDN", iata: "DRW", name: "Darwin International Airport",
    lat: -12.4147, lon: 130.8767, elevationFt: 103, towerFreq: "133.100 (TWR)", atisFreq: "128.250 (ATIS)",
    runways: "11/29 (11,004 ft Asphalt)", surface: "Asphalt", type: "Major Regional / Defense"
  },
  {
    icao: "YBCS", iata: "CNS", name: "Cairns International Airport",
    lat: -16.8858, lon: 145.7553, elevationFt: 10, towerFreq: "124.900 (TWR)", atisFreq: "130.850 (ATIS)",
    runways: "15/33 (10,486 ft Asphalt)", surface: "Asphalt", type: "Major International"
  },
  {
    icao: "YBAS", iata: "ASP", name: "Alice Springs Airport",
    lat: -23.8067, lon: 133.9022, elevationFt: 1789, towerFreq: "118.300 (TWR)", atisFreq: "128.400 (ATIS)",
    runways: "12/30 (7,999 ft Asphalt)", surface: "Asphalt", type: "Central Australia Hub"
  },
  {
    icao: "YAYE", iata: "AYQ", name: "Ayers Rock / Connellan Airport (Uluru)",
    lat: -25.1861, lon: 130.9756, elevationFt: 1626, towerFreq: "127.300 (CTAF)", atisFreq: "126.800 (AWIS)",
    runways: "13/31 (8,527 ft Asphalt)", surface: "Asphalt", type: "Tourism Gateway"
  }
];

// Persistent User Home Airport (Default: YTRE Taree)
let userHomeAirportIcao = localStorage.getItem("efis_home_airport") || "YTRE";
let userHomeAirport = AUSTRALIAN_AIRPORTS.find(a => a.icao === userHomeAirportIcao) || AUSTRALIAN_AIRPORTS[0];

// Display View Mode Configuration
let isSyntheticVisionEnabled = true;
let isMapBackdropEnabled = true;
let showFlightPathMarker = true;

// Turn Coordinator & Inclinometer Ball Toggle (Saved in localStorage)
let showTurnCoordinator = localStorage.getItem("efis_show_turn_coord") !== "false";

// G-Meter Reading Box Toggle (Saved in localStorage)
let showGMeter = localStorage.getItem("efis_show_g_meter") !== "false";

// ============================================================================
// Active Aircraft Profiles & Custom Airframe Manager
// ============================================================================
const DEFAULT_AIRCRAFT_PROFILES = {
  c172: {
    id: "c172", callsign: "VH-TRE", name: "Cessna 172S Skyhawk", type: "light_ga",
    vSo: 40, vS: 48, vX: 62, vY: 74, vFe: 85, vA: 105, vNo: 129, vNe: 163,
    bestGlideRatio: 9.0, bestGlideSpeedKt: 68, maxPositiveG: 3.8, maxNegativeG: -1.52, isCustom: false
  },
  pa28: {
    id: "pa28", callsign: "VH-PQQ", name: "Piper PA-28 Archer III", type: "light_ga",
    vSo: 45, vS: 50, vX: 64, vY: 76, vFe: 102, vA: 113, vNo: 125, vNe: 154,
    bestGlideRatio: 8.5, bestGlideSpeedKt: 73, maxPositiveG: 3.8, maxNegativeG: -1.52, isCustom: false
  },
  be36: {
    id: "be36", callsign: "VH-BZA", name: "Beechcraft Bonanza A36", type: "turboprop",
    vSo: 59, vS: 67, vX: 82, vY: 100, vFe: 123, vA: 141, vNo: 167, vNe: 205,
    bestGlideRatio: 10.5, bestGlideSpeedKt: 105, maxPositiveG: 4.4, maxNegativeG: -1.76, isCustom: false
  },
  rv7: {
    id: "rv7", callsign: "VH-RVX", name: "Van's RV-7 Experimental", type: "light_ga",
    vSo: 50, vS: 58, vX: 75, vY: 90, vFe: 100, vA: 142, vNo: 180, vNe: 230,
    bestGlideRatio: 11.0, bestGlideSpeedKt: 85, maxPositiveG: 6.0, maxNegativeG: -3.0, isCustom: false
  },
  lsa: {
    id: "lsa", callsign: "24-8890", name: "Jabiru / Foxbat LSA (RA-Aus)", type: "light_ga",
    vSo: 32, vS: 39, vX: 52, vY: 62, vFe: 70, vA: 85, vNo: 105, vNe: 120,
    bestGlideRatio: 11.5, bestGlideSpeedKt: 58, maxPositiveG: 4.0, maxNegativeG: -2.0, isCustom: false
  }
};

let AIRCRAFT_PROFILES = { ...DEFAULT_AIRCRAFT_PROFILES };

function loadCustomAircraftProfiles() {
  AIRCRAFT_PROFILES = { ...DEFAULT_AIRCRAFT_PROFILES };
  try {
    const raw = localStorage.getItem("efis_custom_profiles");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (typeof parsed === "object" && parsed !== null) {
        Object.keys(parsed).forEach(k => {
          AIRCRAFT_PROFILES[k] = { ...parsed[k], isCustom: true };
        });
      }
    }
  } catch(e) {
    console.error("Error loading custom aircraft profiles:", e);
  }
}

function saveCustomAircraftProfilesToStorage() {
  const customOnly = {};
  Object.keys(AIRCRAFT_PROFILES).forEach(k => {
    if (AIRCRAFT_PROFILES[k].isCustom) {
      customOnly[k] = AIRCRAFT_PROFILES[k];
    }
  });
  localStorage.setItem("efis_custom_profiles", JSON.stringify(customOnly));
}

loadCustomAircraftProfiles();
const savedProfileId = localStorage.getItem("efis_active_profile_id");
let currentProfile = (savedProfileId && AIRCRAFT_PROFILES[savedProfileId]) ? AIRCRAFT_PROFILES[savedProfileId] : AIRCRAFT_PROFILES.c172;
const UNITS = { speed: 'kt', alt: 'ft', dist: 'mi', press: 'inHg' };

const EARTH_RADIUS_NM = 3440.065;

function calculateDistanceNm(lat1, lon1, lat2, lon2) {
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) ** 2;
  return EARTH_RADIUS_NM * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function calculateBearingDeg(lat1, lon1, lat2, lon2) {
  const y = Math.sin((lon2 - lon1) * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180);
  const x = Math.cos(lat1 * Math.PI / 180) * Math.sin(lat2 * Math.PI / 180) -
            Math.sin(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.cos((lon2 - lon1) * Math.PI / 180);
  return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
}

function calculateXTE(currentLat, currentLon, fromLat, fromLon, toLat, toLon) {
  const d13 = calculateDistanceNm(fromLat, fromLon, currentLat, currentLon);
  const theta13 = calculateBearingDeg(fromLat, fromLon, currentLat, currentLon) * Math.PI / 180;
  const theta12 = calculateBearingDeg(fromLat, fromLon, toLat, toLon) * Math.PI / 180;
  const delta = (d13 / EARTH_RADIUS_NM);
  const xtkRad = Math.asin(Math.sin(delta) * Math.sin(theta13 - theta12));
  return xtkRad * EARTH_RADIUS_NM;
}

// ============================================================================
// 1.1 AERONAUTICAL VHF AREA FREQUENCY (FIA) & CTAF GEOJSON DATABASE
// ============================================================================
const VHF_AREA_SECTORS = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        id: "AREA-20",
        type: "FIA_AREA",
        sectorCode: "AREA 20",
        name: "Sydney Centre / Mid North Coast Area 20",
        frequency: "124.000",
        callsign: "Sydney Centre",
        lowerAltFt: 0,
        upperAltFt: 10000,
        color: "#00e5ff",
        center: [-31.85, 152.6]
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-30.4, 151.2], [-30.4, 154.5], [-33.2, 154.5], [-33.2, 151.5], [-32.5, 151.2], [-30.4, 151.2]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "AREA-22",
        type: "FIA_AREA",
        sectorCode: "AREA 22",
        name: "Brisbane Centre / North Coast Area 22",
        frequency: "120.550",
        callsign: "Brisbane Centre",
        lowerAltFt: 0,
        upperAltFt: 10000,
        color: "#e040fb",
        center: [-28.5, 153.2]
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-26.5, 151.0], [-26.5, 154.8], [-30.4, 154.5], [-30.4, 151.2], [-26.5, 151.0]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "AREA-21",
        type: "FIA_AREA",
        sectorCode: "AREA 21",
        name: "Sydney Radar / Williamtown & Hunter Area 21",
        frequency: "125.700",
        callsign: "Sydney Radar",
        lowerAltFt: 0,
        upperAltFt: 8500,
        color: "#ffeb3b",
        center: [-32.7, 151.7]
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-32.4, 150.8], [-32.4, 152.8], [-33.4, 152.8], [-33.4, 150.8], [-32.4, 150.8]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "AREA-18",
        type: "FIA_AREA",
        sectorCode: "AREA 18",
        name: "Sydney Terminal Area (TMA) Area 18",
        frequency: "124.550",
        callsign: "Sydney Centre (Terminal)",
        lowerAltFt: 0,
        upperAltFt: 10000,
        color: "#00e676",
        center: [-33.9, 151.1]
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-33.4, 150.3], [-33.4, 151.8], [-34.6, 151.8], [-34.6, 150.3], [-33.4, 150.3]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "AREA-12",
        type: "FIA_AREA",
        sectorCode: "AREA 12",
        name: "Melbourne Centre / Southern NSW Area 12",
        frequency: "118.550",
        callsign: "Melbourne Centre",
        lowerAltFt: 0,
        upperAltFt: 10000,
        color: "#ff9100",
        center: [-35.5, 149.5]
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-34.6, 148.0], [-34.6, 151.5], [-37.5, 151.5], [-37.5, 148.0], [-34.6, 148.0]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "AREA-30",
        type: "FIA_AREA",
        sectorCode: "AREA 30",
        name: "Brisbane Centre / New England & Tamworth Area 30",
        frequency: "127.100",
        callsign: "Brisbane Centre (Inland)",
        lowerAltFt: 0,
        upperAltFt: 10000,
        color: "#00e5ff",
        center: [-31.0, 150.5]
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-29.0, 148.5], [-29.0, 151.2], [-32.5, 151.2], [-32.5, 148.5], [-29.0, 148.5]
        ]]
      }
    }
  ]
};

// Point-in-Polygon (Ray-Casting Algorithm)
function isPointInPolygon(lat, lon, polygonCoords) {
  let inside = false;
  for (let i = 0, j = polygonCoords.length - 1; i < polygonCoords.length; j = i++) {
    const latI = polygonCoords[i][0], lonI = polygonCoords[i][1];
    const latJ = polygonCoords[j][0], lonJ = polygonCoords[j][1];
    const intersect = ((latI > lat) !== (latJ > lat)) &&
        (lon < (lonJ - lonI) * (lat - latI) / (latJ - latI) + lonI);
    if (intersect) inside = !inside;
  }
  return inside;
}

// ============================================================================
// 1.14 AERONAUTICAL CURVED GEOMETRY & RADIAL SECTOR GENERATORS (AIRAC / DAH)
// ============================================================================
function generateRadialPoint(lat, lon, distNm, bearingDeg) {
  const dRad = distNm / EARTH_RADIUS_NM;
  const brgRad = bearingDeg * Math.PI / 180;
  const lat1Rad = lat * Math.PI / 180;
  const lon1Rad = lon * Math.PI / 180;

  const lat2Rad = Math.asin(
    Math.sin(lat1Rad) * Math.cos(dRad) +
    Math.cos(lat1Rad) * Math.sin(dRad) * Math.cos(brgRad)
  );
  const lon2Rad = lon1Rad + Math.atan2(
    Math.sin(brgRad) * Math.sin(dRad) * Math.cos(lat1Rad),
    Math.cos(dRad) - Math.sin(lat1Rad) * Math.sin(lat2Rad)
  );

  return [lat2Rad * 180 / Math.PI, lon2Rad * 180 / Math.PI];
}

function generateCirclePolygon(centerLat, centerLon, radiusNm, numPoints = 32) {
  const coords = [];
  for (let i = 0; i < numPoints; i++) {
    const brg = (i * 360) / numPoints;
    coords.push(generateRadialPoint(centerLat, centerLon, radiusNm, brg));
  }
  coords.push(coords[0]); // Close polygon
  return coords;
}

function generateArcSectorPolygon(centerLat, centerLon, innerRadiusNm, outerRadiusNm, startBearingDeg, endBearingDeg, numPoints = 16) {
  let span = (endBearingDeg - startBearingDeg + 360) % 360;
  if (span === 0) span = 360;
  const coords = [];

  // 1. Outer Arc (Clockwise start to end)
  for (let i = 0; i <= numPoints; i++) {
    const brg = (startBearingDeg + (i * span) / numPoints) % 360;
    coords.push(generateRadialPoint(centerLat, centerLon, outerRadiusNm, brg));
  }

  // 2. Inner Arc (Counter-Clockwise back from end to start)
  if (innerRadiusNm > 0) {
    for (let i = numPoints; i >= 0; i--) {
      const brg = (startBearingDeg + (i * span) / numPoints) % 360;
      coords.push(generateRadialPoint(centerLat, centerLon, innerRadiusNm, brg));
    }
  } else {
    coords.push([centerLat, centerLon]);
  }

  coords.push(coords[0]); // Close polygon
  return coords;
}

// Distance from point to line segment in Nautical Miles
function calculateDistanceToSegmentNm(pLat, pLon, aLat, aLon, bLat, bLon) {
  const cosLat = Math.cos(aLat * Math.PI / 180);
  const px = (pLon - aLon) * 60.0 * cosLat;
  const py = (pLat - aLat) * 60.0;
  const bx = (bLon - aLon) * 60.0 * cosLat;
  const by = (bLat - aLat) * 60.0;
  
  const segLenSq = bx * bx + by * by;
  if (segLenSq === 0) return Math.sqrt(px * px + py * py);
  
  const t = Math.max(0, Math.min(1, (px * bx + py * by) / segLenSq));
  const projX = t * bx;
  const projY = t * by;
  const dx = px - projX;
  const dy = py - projY;
  return Math.sqrt(dx * dx + dy * dy);
}

// Distance from point to polygon boundary in Nautical Miles
function calculateMinDistanceToPolygonNm(pLat, pLon, polygonCoords) {
  let minDistanceNm = Infinity;
  for (let i = 0, j = polygonCoords.length - 1; i < polygonCoords.length; j = i++) {
    const a = polygonCoords[j];
    const b = polygonCoords[i];
    const d = calculateDistanceToSegmentNm(pLat, pLon, a[0], a[1], b[0], b[1]);
    if (d < minDistanceNm) {
      minDistanceNm = d;
    }
  }
  return minDistanceNm;
}

// ============================================================================
// 1.15 AUSTRALIAN VNC & VTC AIRSPACE BOUNDARY DATABASE (AIRAC / DAH COMPLIANT)
// ============================================================================
const AUSTRALIAN_AIRSPACES = {
  type: "FeatureCollection",
  features: [
    // ------------------------------------------------------------------------
    // A. SYDNEY BASIN & NEW SOUTH WALES (SYDNEY FIR)
    // ------------------------------------------------------------------------
    {
      type: "Feature",
      properties: {
        id: "SYD_CTR_C", code: "SYD CTR C", name: "Sydney Kingsford Smith Control Zone",
        classification: "CLASS_C", classLetter: "C", chartTier: "BOTH", isVtcTerminalStep: true,
        lowerLimitFt: 0, upperLimitFt: 4500, lowerLimitText: "SFC", upperLimitText: "4500",
        controllingAgency: "Sydney Tower", frequency: "120.500",
        hazardDesc: "High Density Commercial RPT & International Traffic",
        activeHours: "H24", color: "#0080FF", badge: "SYD CTR | C SFC-4500", center: [-33.9461, 151.1772]
      },
      geometry: { type: "Polygon", coordinates: [generateCirclePolygon(-33.9461, 151.1772, 7.0, 36)] }
    },
    {
      type: "Feature",
      properties: {
        id: "SYD_CTA_STEP1", code: "SYD CTA 1", name: "Sydney Terminal CTA Step 1 (7-11 NM)",
        classification: "CLASS_C", classLetter: "C", chartTier: "VTC", isVtcTerminalStep: true,
        lowerLimitFt: 1000, upperLimitFt: 4500, lowerLimitText: "1000", upperLimitText: "4500",
        controllingAgency: "Sydney Terminal / Approach", frequency: "124.550",
        hazardDesc: "Terminal Jet Inbound & Outbound Inverted Wedding Cake",
        activeHours: "H24", color: "#0080FF", badge: "SYD CTA | C 1000-4500", center: [-33.9461, 151.35]
      },
      geometry: { type: "Polygon", coordinates: [generateArcSectorPolygon(-33.9461, 151.1772, 7.0, 11.0, 0, 360, 32)] }
    },
    {
      type: "Feature",
      properties: {
        id: "SYD_CTA_STEP2", code: "SYD CTA 2", name: "Sydney Terminal CTA Step 2 (11-16 NM)",
        classification: "CLASS_C", classLetter: "C", chartTier: "BOTH", isVtcTerminalStep: true,
        lowerLimitFt: 2500, upperLimitFt: 10000, lowerLimitText: "2500", upperLimitText: "10000",
        controllingAgency: "Sydney Approach / Departures", frequency: "124.550",
        hazardDesc: "Intermediate Terminal Feeder Routes",
        activeHours: "H24", color: "#0080FF", badge: "SYD CTA | C 2500-10000", center: [-33.9461, 151.48]
      },
      geometry: { type: "Polygon", coordinates: [generateArcSectorPolygon(-33.9461, 151.1772, 11.0, 16.0, 0, 360, 32)] }
    },
    {
      type: "Feature",
      properties: {
        id: "SYD_CTA_STEP3", code: "SYD CTA 3", name: "Sydney Regional CTA Step 3 (16-30 NM)",
        classification: "CLASS_C", classLetter: "C", chartTier: "VNC", isVtcTerminalStep: false,
        lowerLimitFt: 3500, upperLimitFt: 10000, lowerLimitText: "3500", upperLimitText: "10000",
        controllingAgency: "Sydney Centre / Approach", frequency: "125.700",
        hazardDesc: "Outer Terminal Transition Routes",
        activeHours: "H24", color: "#0080FF", badge: "SYD CTA | C 3500-10000", center: [-33.9461, 151.65]
      },
      geometry: { type: "Polygon", coordinates: [generateArcSectorPolygon(-33.9461, 151.1772, 16.0, 30.0, 0, 360, 36)] }
    },
    {
      type: "Feature",
      properties: {
        id: "SYD_CTA_STEP4", code: "SYD CTA 4", name: "Sydney Enroute CTA Step 4 (30-45 NM)",
        classification: "CLASS_C", classLetter: "C", chartTier: "VNC", isVtcTerminalStep: false,
        lowerLimitFt: 4500, upperLimitFt: 18000, lowerLimitText: "4500", upperLimitText: "FL180",
        controllingAgency: "Sydney Centre", frequency: "124.000",
        hazardDesc: "High Altitude Enroute Transition",
        activeHours: "H24", color: "#0080FF", badge: "SYD CTA | C 4500-FL180", center: [-33.9461, 151.90]
      },
      geometry: { type: "Polygon", coordinates: [generateArcSectorPolygon(-33.9461, 151.1772, 30.0, 45.0, 0, 360, 40)] }
    },
    {
      type: "Feature",
      properties: {
        id: "YSBK_CTR_D", code: "YSBK CTR D", name: "Bankstown Class D Control Zone",
        classification: "CLASS_D", classLetter: "D", chartTier: "BOTH", isVtcTerminalStep: true,
        lowerLimitFt: 0, upperLimitFt: 1500, lowerLimitText: "SFC", upperLimitText: "1500",
        controllingAgency: "Bankstown Tower", frequency: "132.800",
        hazardDesc: "Australia's Busiest General Aviation Hub & Flight Training",
        activeHours: "TWR Hours (0600-2200 LT)", color: "#00BFFF", badge: "YSBK | D SFC-1500", center: [-33.9244, 150.9883]
      },
      geometry: { type: "Polygon", coordinates: [generateCirclePolygon(-33.9244, 150.9883, 3.5, 24)] }
    },
    {
      type: "Feature",
      properties: {
        id: "YSCN_CTR_D", code: "YSCN CTR D", name: "Camden Class D Control Zone",
        classification: "CLASS_D", classLetter: "D", chartTier: "BOTH", isVtcTerminalStep: true,
        lowerLimitFt: 0, upperLimitFt: 2000, lowerLimitText: "SFC", upperLimitText: "2000",
        controllingAgency: "Camden Tower", frequency: "120.100",
        hazardDesc: "General Aviation, Gliders & Training Circuit",
        activeHours: "TWR Hours", color: "#00BFFF", badge: "YSCN | D SFC-2000", center: [-34.0392, 150.6878]
      },
      geometry: { type: "Polygon", coordinates: [generateCirclePolygon(-34.0392, 150.6878, 3.0, 24)] }
    },
    {
      type: "Feature",
      properties: {
        id: "YSRI_MIL_CTR", code: "YSRI MIL CTR", name: "RAAF Base Richmond Military CTR",
        classification: "MIL_CTR", classLetter: "C", chartTier: "BOTH", isVtcTerminalStep: true,
        lowerLimitFt: 0, upperLimitFt: 3500, lowerLimitText: "SFC", upperLimitText: "3500",
        controllingAgency: "Richmond Tower / Delivery", frequency: "135.500",
        hazardDesc: "Military Heavy Transport Operations (C-130J Hercules)",
        activeHours: "Active by NOTAM / RAAF Ops", color: "#C00080", badge: "YSRI MIL | C SFC-3500", center: [-33.6004, 150.7806]
      },
      geometry: { type: "Polygon", coordinates: [generateCirclePolygon(-33.6004, 150.7806, 5.0, 28)] }
    },
    {
      type: "Feature",
      properties: {
        id: "WLM_MIL_CTR_A", code: "WLM MIL CTR", name: "RAAF Base Williamtown Military CTR A",
        classification: "MIL_CTR", classLetter: "C", chartTier: "BOTH", isVtcTerminalStep: true,
        lowerLimitFt: 0, upperLimitFt: 5000, lowerLimitText: "SFC", upperLimitText: "5000",
        controllingAgency: "Williamtown Tower", frequency: "118.300",
        hazardDesc: "Military Fast Jet Operations (F-35A Lightning II)",
        activeHours: "Active by NOTAM / Mon-Fri (RAAF Ops)", color: "#C00080", badge: "WLM MIL CTR | C SFC-5000", center: [-32.7950, 151.8344]
      },
      geometry: { type: "Polygon", coordinates: [generateCirclePolygon(-32.7950, 151.8344, 11.0, 36)] }
    },
    {
      type: "Feature",
      properties: {
        id: "WLM_MIL_CTA_B", code: "WLM MIL CTA", name: "Williamtown Military Control Area B",
        classification: "MIL_CTR", classLetter: "C", chartTier: "BOTH", isVtcTerminalStep: true,
        lowerLimitFt: 5000, upperLimitFt: 8500, lowerLimitText: "5000", upperLimitText: "8500",
        controllingAgency: "Williamtown Approach", frequency: "135.700",
        hazardDesc: "Military Fast Jet Combat Climb / Descent Corridor",
        activeHours: "Active by NOTAM", color: "#C00080", badge: "WLM MIL CTA | C 5000-8500", center: [-32.7950, 151.98]
      },
      geometry: { type: "Polygon", coordinates: [generateArcSectorPolygon(-32.7950, 151.8344, 11.0, 25.0, 0, 360, 36)] }
    },
    {
      type: "Feature",
      properties: {
        id: "R585A", code: "R585A", name: "Salt Ash Air Weapons Range",
        classification: "RESTRICTED", classLetter: "RA", chartTier: "BOTH", isVtcTerminalStep: false,
        lowerLimitFt: 0, upperLimitFt: 18000, lowerLimitText: "SFC", upperLimitText: "FL180",
        controllingAgency: "Williamtown Range Control", frequency: "135.700",
        hazardDesc: "Fast Jet Live Air-to-Ground Gun Firing & Bombing",
        activeHours: "Active by NOTAM (Extremely Hazardous)", color: "#CC0033", badge: "R585A | SFC-FL180", center: [-32.785, 152.025]
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-32.710, 151.950], [-32.710, 152.120], [-32.760, 152.150], [-32.840, 152.100],
          [-32.850, 151.980], [-32.800, 151.920], [-32.710, 151.950]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "R585B", code: "R585B", name: "Williamtown Offshore Combat Training Sector",
        classification: "RESTRICTED", classLetter: "RA", chartTier: "BOTH", isVtcTerminalStep: false,
        lowerLimitFt: 0, upperLimitFt: 25000, lowerLimitText: "SFC", upperLimitText: "FL250",
        controllingAgency: "Williamtown Radar", frequency: "132.350",
        hazardDesc: "Supersonic Interception & Aerial Combat Manoeuvres",
        activeHours: "Active by NOTAM", color: "#CC0033", badge: "R585B | SFC-FL250", center: [-32.85, 152.65]
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-32.550, 152.300], [-32.550, 153.150], [-33.150, 153.150], [-33.150, 152.300], [-32.550, 152.300]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "R578", code: "R578", name: "Singleton Army Firing Range",
        classification: "RESTRICTED", classLetter: "RA", chartTier: "BOTH", isVtcTerminalStep: false,
        lowerLimitFt: 0, upperLimitFt: 10000, lowerLimitText: "SFC", upperLimitText: "10000",
        controllingAgency: "Australian Army / Sydney Centre", frequency: "125.700",
        hazardDesc: "Heavy Artillery, Mortars & Live Ground Weapons Firing",
        activeHours: "Continuous / Active by NOTAM", color: "#CC0033", badge: "R578 | SFC-10000", center: [-32.68, 151.18]
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-32.580, 151.050], [-32.580, 151.320], [-32.780, 151.320], [-32.780, 151.050], [-32.580, 151.050]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "R421", code: "R421", name: "Jervis Bay Naval Air Firing Range",
        classification: "RESTRICTED", classLetter: "RA", chartTier: "BOTH", isVtcTerminalStep: false,
        lowerLimitFt: 0, upperLimitFt: 20000, lowerLimitText: "SFC", upperLimitText: "20000",
        controllingAgency: "Nowra Approach / Navy", frequency: "124.800",
        hazardDesc: "Naval Gunfire & Fleet Air Arm Weapons Training",
        activeHours: "Active by NOTAM", color: "#CC0033", badge: "R421 | SFC-20000", center: [-35.12, 150.75]
      },
      geometry: { type: "Polygon", coordinates: [generateCirclePolygon(-35.12, 150.75, 8.0, 32)] }
    },
    {
      type: "Feature",
      properties: {
        id: "YSNW_MIL_CTR", code: "YSNW MIL CTR", name: "HMAS Albatross (Nowra) Naval MIL CTR",
        classification: "MIL_CTR", classLetter: "C", chartTier: "BOTH", isVtcTerminalStep: true,
        lowerLimitFt: 0, upperLimitFt: 4500, lowerLimitText: "SFC", upperLimitText: "4500",
        controllingAgency: "Nowra Tower", frequency: "118.800",
        hazardDesc: "Royal Australian Navy Helicopter & Fast Jet Operations",
        activeHours: "TWR Hours / Outside Hours CTAF", color: "#C00080", badge: "YSNW MIL | C SFC-4500", center: [-34.9458, 150.5375]
      },
      geometry: { type: "Polygon", coordinates: [generateCirclePolygon(-34.9458, 150.5375, 7.0, 28)] }
    },
    {
      type: "Feature",
      properties: {
        id: "D537", code: "D537", name: "Manning River & Crowdy Head Parachute / Gliding Zone",
        classification: "DANGER", classLetter: "D", chartTier: "BOTH", isVtcTerminalStep: false,
        lowerLimitFt: 0, upperLimitFt: 10000, lowerLimitText: "SFC", upperLimitText: "10000",
        controllingAgency: "Taree Unicom / Sydney Centre", frequency: "118.100",
        hazardDesc: "Parachute Jump Exercises (PJE) & High-Altitude Gliding",
        activeHours: "Daylight Hours / VMC", color: "#FF4500", badge: "D537 | SFC-10000", center: [-31.88, 152.68]
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-31.780, 152.520], [-31.780, 152.820], [-32.020, 152.820], [-32.020, 152.520], [-31.780, 152.520]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "D542", code: "D542", name: "Camden Haven Aerobatics & Flight Training Area",
        classification: "DANGER", classLetter: "D", chartTier: "BOTH", isVtcTerminalStep: false,
        lowerLimitFt: 0, upperLimitFt: 4500, lowerLimitText: "SFC", upperLimitText: "4500",
        controllingAgency: "Port Macquarie CTAF / Sydney Centre", frequency: "118.100",
        hazardDesc: "Intensive Aerobatics, Spinning & Student Solo Training",
        activeHours: "Daylight Hours", color: "#FF4500", badge: "D542 | SFC-4500", center: [-31.65, 152.80]
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-31.580, 152.680], [-31.580, 152.920], [-31.720, 152.920], [-31.720, 152.680], [-31.580, 152.680]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "D558", code: "D558", name: "Hunter Valley Gliding & Soaring Sector",
        classification: "DANGER", classLetter: "D", chartTier: "BOTH", isVtcTerminalStep: false,
        lowerLimitFt: 0, upperLimitFt: 8500, lowerLimitText: "SFC", upperLimitText: "8500",
        controllingAgency: "Hunter Valley Gliding / Sydney Centre", frequency: "122.700",
        hazardDesc: "Unpowered Gliders, Winch Launch Cables & Tow Planes",
        activeHours: "Weekends & Public Holidays", color: "#FF4500", badge: "D558 | SFC-8500", center: [-32.50, 151.00]
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-32.320, 150.750], [-32.320, 151.250], [-32.680, 151.250], [-32.680, 150.750], [-32.320, 150.750]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "YSCB_CTR_C", code: "YSCB CTR C", name: "Canberra National Capital Control Zone",
        classification: "CLASS_C", classLetter: "C", chartTier: "BOTH", isVtcTerminalStep: true,
        lowerLimitFt: 0, upperLimitFt: 4500, lowerLimitText: "SFC", upperLimitText: "4500",
        controllingAgency: "Canberra Tower", frequency: "118.700",
        hazardDesc: "VIP Government & Regional Passenger Air Transport",
        activeHours: "TWR Hours / Outside Hours CTAF", color: "#0080FF", badge: "YSCB | C SFC-4500", center: [-35.3069, 149.1950]
      },
      geometry: { type: "Polygon", coordinates: [generateCirclePolygon(-35.3069, 149.1950, 7.0, 32)] }
    },
    {
      type: "Feature",
      properties: {
        id: "YSCB_CTA_C", code: "YSCB CTA C", name: "Canberra Control Area Step (7-20 NM)",
        classification: "CLASS_C", classLetter: "C", chartTier: "BOTH", isVtcTerminalStep: true,
        lowerLimitFt: 3500, upperLimitFt: 8500, lowerLimitText: "3500", upperLimitText: "8500",
        controllingAgency: "Canberra Approach", frequency: "124.500",
        hazardDesc: "Terminal Mountain Descent & Arrival Sector",
        activeHours: "H24", color: "#0080FF", badge: "YSCB CTA | C 3500-8500", center: [-35.3069, 149.38]
      },
      geometry: { type: "Polygon", coordinates: [generateArcSectorPolygon(-35.3069, 149.1950, 7.0, 20.0, 0, 360, 32)] }
    },
    {
      type: "Feature",
      properties: {
        id: "YCFS_CTR_D", code: "YCFS CTR D", name: "Coffs Harbour Control Zone",
        classification: "CLASS_D", classLetter: "D", chartTier: "BOTH", isVtcTerminalStep: true,
        lowerLimitFt: 0, upperLimitFt: 4500, lowerLimitText: "SFC", upperLimitText: "4500",
        controllingAgency: "Coffs Tower", frequency: "118.200",
        hazardDesc: "Coastal Regional Transport & GA Training",
        activeHours: "TWR Hours", color: "#00BFFF", badge: "YCFS | D SFC-4500", center: [-30.3206, 153.1167]
      },
      geometry: { type: "Polygon", coordinates: [generateCirclePolygon(-30.3206, 153.1167, 5.0, 24)] }
    },
    {
      type: "Feature",
      properties: {
        id: "YSTW_CTR_D", code: "YSTW CTR D", name: "Tamworth Regional Control Zone",
        classification: "CLASS_D", classLetter: "D", chartTier: "BOTH", isVtcTerminalStep: true,
        lowerLimitFt: 0, upperLimitFt: 4500, lowerLimitText: "SFC", upperLimitText: "4500",
        controllingAgency: "Tamworth Tower", frequency: "119.400",
        hazardDesc: "Intensive Airline Cadet Academy Flight Training",
        activeHours: "TWR Hours", color: "#00BFFF", badge: "YSTW | D SFC-4500", center: [-31.0839, 150.8469]
      },
      geometry: { type: "Polygon", coordinates: [generateCirclePolygon(-31.0839, 150.8469, 5.0, 24)] }
    },
    {
      type: "Feature",
      properties: {
        id: "YMAY_CTR_D", code: "YMAY CTR D", name: "Albury Control Zone",
        classification: "CLASS_D", classLetter: "D", chartTier: "BOTH", isVtcTerminalStep: true,
        lowerLimitFt: 0, upperLimitFt: 4500, lowerLimitText: "SFC", upperLimitText: "4500",
        controllingAgency: "Albury Tower", frequency: "123.400",
        hazardDesc: "Regional Jet & Murray Valley GA Operations",
        activeHours: "TWR Hours", color: "#00BFFF", badge: "YMAY | D SFC-4500", center: [-36.0678, 146.9581]
      },
      geometry: { type: "Polygon", coordinates: [generateCirclePolygon(-36.0678, 146.9581, 5.0, 24)] }
    },

    // ------------------------------------------------------------------------
    // B. MELBOURNE BASIN, VICTORIA & TASMANIA (MELBOURNE FIR)
    // ------------------------------------------------------------------------
    {
      type: "Feature",
      properties: {
        id: "YMML_CTR_C", code: "YMML CTR C", name: "Melbourne Tullamarine Control Zone",
        classification: "CLASS_C", classLetter: "C", chartTier: "BOTH", isVtcTerminalStep: true,
        lowerLimitFt: 0, upperLimitFt: 4500, lowerLimitText: "SFC", upperLimitText: "4500",
        controllingAgency: "Melbourne Tower", frequency: "120.500",
        hazardDesc: "Major International & Domestic Heavy Jet Hub",
        activeHours: "H24", color: "#0080FF", badge: "YMML CTR | C SFC-4500", center: [-37.6733, 144.8433]
      },
      geometry: { type: "Polygon", coordinates: [generateCirclePolygon(-37.6733, 144.8433, 7.0, 36)] }
    },
    {
      type: "Feature",
      properties: {
        id: "YMML_CTA_STEP1", code: "YMML CTA 1", name: "Melbourne Terminal CTA Step 1 (7-12 NM)",
        classification: "CLASS_C", classLetter: "C", chartTier: "VTC", isVtcTerminalStep: true,
        lowerLimitFt: 1500, upperLimitFt: 4500, lowerLimitText: "1500", upperLimitText: "4500",
        controllingAgency: "Melbourne Approach", frequency: "132.000",
        hazardDesc: "Terminal Jet Inbound / Outbound Wedding Cake",
        activeHours: "H24", color: "#0080FF", badge: "YMML CTA | C 1500-4500", center: [-37.6733, 144.98]
      },
      geometry: { type: "Polygon", coordinates: [generateArcSectorPolygon(-37.6733, 144.8433, 7.0, 12.0, 0, 360, 32)] }
    },
    {
      type: "Feature",
      properties: {
        id: "YMML_CTA_STEP2", code: "YMML CTA 2", name: "Melbourne Terminal CTA Step 2 (12-22 NM)",
        classification: "CLASS_C", classLetter: "C", chartTier: "BOTH", isVtcTerminalStep: true,
        lowerLimitFt: 2500, upperLimitFt: 9000, lowerLimitText: "2500", upperLimitText: "9000",
        controllingAgency: "Melbourne Approach / Departures", frequency: "132.000",
        hazardDesc: "Intermediate Terminal Feeder Routes",
        activeHours: "H24", color: "#0080FF", badge: "YMML CTA | C 2500-9000", center: [-37.6733, 145.15]
      },
      geometry: { type: "Polygon", coordinates: [generateArcSectorPolygon(-37.6733, 144.8433, 12.0, 22.0, 0, 360, 36)] }
    },
    {
      type: "Feature",
      properties: {
        id: "YMML_CTA_STEP3", code: "YMML CTA 3", name: "Melbourne Regional CTA Step 3 (22-40 NM)",
        classification: "CLASS_C", classLetter: "C", chartTier: "VNC", isVtcTerminalStep: false,
        lowerLimitFt: 4500, upperLimitFt: 18000, lowerLimitText: "4500", upperLimitText: "FL180",
        controllingAgency: "Melbourne Centre", frequency: "124.000",
        hazardDesc: "High Altitude Enroute Transition",
        activeHours: "H24", color: "#0080FF", badge: "YMML CTA | C 4500-FL180", center: [-37.6733, 145.45]
      },
      geometry: { type: "Polygon", coordinates: [generateArcSectorPolygon(-37.6733, 144.8433, 22.0, 40.0, 0, 360, 40)] }
    },
    {
      type: "Feature",
      properties: {
        id: "YMEN_CTR_D", code: "YMEN CTR D", name: "Essendon Fields Class D Control Zone",
        classification: "CLASS_D", classLetter: "D", chartTier: "BOTH", isVtcTerminalStep: true,
        lowerLimitFt: 0, upperLimitFt: 1500, lowerLimitText: "SFC", upperLimitText: "1500",
        controllingAgency: "Essendon Tower", frequency: "125.100",
        hazardDesc: "Corporate Jet, Medevac & Regional Passenger Ops",
        activeHours: "TWR Hours (0600-2200 LT)", color: "#00BFFF", badge: "YMEN | D SFC-1500", center: [-37.7281, 144.9019]
      },
      geometry: { type: "Polygon", coordinates: [generateCirclePolygon(-37.7281, 144.9019, 3.0, 24)] }
    },
    {
      type: "Feature",
      properties: {
        id: "YMMB_CTR_D", code: "YMMB CTR D", name: "Moorabbin Class D Control Zone",
        classification: "CLASS_D", classLetter: "D", chartTier: "BOTH", isVtcTerminalStep: true,
        lowerLimitFt: 0, upperLimitFt: 2500, lowerLimitText: "SFC", upperLimitText: "2500",
        controllingAgency: "Moorabbin Tower", frequency: "118.100",
        hazardDesc: "High Volume General Aviation & Commercial Cadet Training",
        activeHours: "TWR Hours", color: "#00BFFF", badge: "YMMB | D SFC-2500", center: [-37.9758, 145.1022]
      },
      geometry: { type: "Polygon", coordinates: [generateCirclePolygon(-37.9758, 145.1022, 3.5, 24)] }
    },
    {
      type: "Feature",
      properties: {
        id: "YMAV_CTR_D", code: "YMAV CTR D", name: "Avalon Airport Control Zone",
        classification: "CLASS_D", classLetter: "D", chartTier: "BOTH", isVtcTerminalStep: true,
        lowerLimitFt: 0, upperLimitFt: 3500, lowerLimitText: "SFC", upperLimitText: "3500",
        controllingAgency: "Avalon Tower", frequency: "120.100",
        hazardDesc: "Jetstar Domestic Jet Hub & Heavy Maintenance",
        activeHours: "TWR Hours / Outside Hours CTAF", color: "#00BFFF", badge: "YMAV | D SFC-3500", center: [-38.0394, 144.4694]
      },
      geometry: { type: "Polygon", coordinates: [generateCirclePolygon(-38.0394, 144.4694, 5.0, 28)] }
    },
    {
      type: "Feature",
      properties: {
        id: "YMPC_MIL_CTR", code: "YMPC MIL CTR", name: "RAAF Williams (Point Cook) Military CTR",
        classification: "MIL_CTR", classLetter: "C", chartTier: "BOTH", isVtcTerminalStep: true,
        lowerLimitFt: 0, upperLimitFt: 2000, lowerLimitText: "SFC", upperLimitText: "2000",
        controllingAgency: "Point Cook Tower / RAAF", frequency: "126.200",
        hazardDesc: "Historic Birthplace of the RAAF & ADF Basic Flight Training",
        activeHours: "Mon-Fri (RAAF Ops)", color: "#C00080", badge: "YMPC MIL | C SFC-2000", center: [-37.9322, 144.7533]
      },
      geometry: { type: "Polygon", coordinates: [generateCirclePolygon(-37.9322, 144.7533, 3.5, 24)] }
    },
    {
      type: "Feature",
      properties: {
        id: "YMES_MIL_CTR", code: "YMES MIL CTR", name: "RAAF Base East Sale Military CTR",
        classification: "MIL_CTR", classLetter: "C", chartTier: "BOTH", isVtcTerminalStep: true,
        lowerLimitFt: 0, upperLimitFt: 5000, lowerLimitText: "SFC", upperLimitText: "5000",
        controllingAgency: "East Sale Tower", frequency: "118.300",
        hazardDesc: "Air Force Officer Training & Roulettes Aerobatic Team",
        activeHours: "Active by NOTAM", color: "#C00080", badge: "YMES MIL | C SFC-5000", center: [-38.0989, 147.1489]
      },
      geometry: { type: "Polygon", coordinates: [generateCirclePolygon(-38.0989, 147.1489, 7.0, 28)] }
    },
    {
      type: "Feature",
      properties: {
        id: "R364", code: "R364", name: "Puckapunyal Military Firing Area",
        classification: "RESTRICTED", classLetter: "RA", chartTier: "BOTH", isVtcTerminalStep: false,
        lowerLimitFt: 0, upperLimitFt: 25000, lowerLimitText: "SFC", upperLimitText: "25000",
        controllingAgency: "Australian Army Range Control", frequency: "124.000",
        hazardDesc: "Armoured Vehicle Cannon Firing, Heavy Mortars & Air Support",
        activeHours: "Active by NOTAM", color: "#CC0033", badge: "R364 | SFC-25000", center: [-36.95, 145.02]
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-36.820, 144.850], [-36.820, 145.220], [-37.100, 145.220], [-37.100, 144.850], [-36.820, 144.850]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "YMHB_CTR_D", code: "YMHB CTR D", name: "Hobart International Control Zone",
        classification: "CLASS_D", classLetter: "D", chartTier: "BOTH", isVtcTerminalStep: true,
        lowerLimitFt: 0, upperLimitFt: 4500, lowerLimitText: "SFC", upperLimitText: "4500",
        controllingAgency: "Hobart Tower", frequency: "118.100",
        hazardDesc: "Antarctic Gateway & Tasmania International Transport",
        activeHours: "TWR Hours / Outside Hours CTAF", color: "#00BFFF", badge: "YMHB | D SFC-4500", center: [-42.8361, 147.5103]
      },
      geometry: { type: "Polygon", coordinates: [generateCirclePolygon(-42.8361, 147.5103, 6.0, 28)] }
    },
    {
      type: "Feature",
      properties: {
        id: "YMLT_CTR_D", code: "YMLT CTR D", name: "Launceston Control Zone",
        classification: "CLASS_D", classLetter: "D", chartTier: "BOTH", isVtcTerminalStep: true,
        lowerLimitFt: 0, upperLimitFt: 4500, lowerLimitText: "SFC", upperLimitText: "4500",
        controllingAgency: "Launceston Tower", frequency: "118.700",
        hazardDesc: "Northern Tasmania Jet Transport & Training",
        activeHours: "TWR Hours", color: "#00BFFF", badge: "YMLT | D SFC-4500", center: [-41.5453, 147.2142]
      },
      geometry: { type: "Polygon", coordinates: [generateCirclePolygon(-41.5453, 147.2142, 5.0, 24)] }
    },

    // ------------------------------------------------------------------------
    // C. BRISBANE BASIN, GOLD COAST & QUEENSLAND (BRISBANE FIR)
    // ------------------------------------------------------------------------
    {
      type: "Feature",
      properties: {
        id: "YBBN_CTR_C", code: "YBBN CTR C", name: "Brisbane International Control Zone",
        classification: "CLASS_C", classLetter: "C", chartTier: "BOTH", isVtcTerminalStep: true,
        lowerLimitFt: 0, upperLimitFt: 4500, lowerLimitText: "SFC", upperLimitText: "4500",
        controllingAgency: "Brisbane Tower", frequency: "120.500",
        hazardDesc: "Parallel Runway High Density International Operations",
        activeHours: "H24", color: "#0080FF", badge: "YBBN CTR | C SFC-4500", center: [-27.3842, 153.1175]
      },
      geometry: { type: "Polygon", coordinates: [generateCirclePolygon(-27.3842, 153.1175, 7.0, 36)] }
    },
    {
      type: "Feature",
      properties: {
        id: "YBBN_CTA_STEP1", code: "YBBN CTA 1", name: "Brisbane Terminal CTA Step 1 (7-12 NM)",
        classification: "CLASS_C", classLetter: "C", chartTier: "VTC", isVtcTerminalStep: true,
        lowerLimitFt: 1000, upperLimitFt: 4500, lowerLimitText: "1000", upperLimitText: "4500",
        controllingAgency: "Brisbane Terminal / Approach", frequency: "124.700",
        hazardDesc: "Terminal Jet Arrival / Departure Transition",
        activeHours: "H24", color: "#0080FF", badge: "YBBN CTA | C 1000-4500", center: [-27.3842, 153.25]
      },
      geometry: { type: "Polygon", coordinates: [generateArcSectorPolygon(-27.3842, 153.1175, 7.0, 12.0, 0, 360, 32)] }
    },
    {
      type: "Feature",
      properties: {
        id: "YBBN_CTA_STEP2", code: "YBBN CTA 2", name: "Brisbane Terminal CTA Step 2 (12-22 NM)",
        classification: "CLASS_C", classLetter: "C", chartTier: "BOTH", isVtcTerminalStep: true,
        lowerLimitFt: 2500, upperLimitFt: 9000, lowerLimitText: "2500", upperLimitText: "9000",
        controllingAgency: "Brisbane Approach", frequency: "124.700",
        hazardDesc: "Intermediate Terminal Airspace",
        activeHours: "H24", color: "#0080FF", badge: "YBBN CTA | C 2500-9000", center: [-27.3842, 153.42]
      },
      geometry: { type: "Polygon", coordinates: [generateArcSectorPolygon(-27.3842, 153.1175, 12.0, 22.0, 0, 360, 36)] }
    },
    {
      type: "Feature",
      properties: {
        id: "YBBN_CTA_STEP3", code: "YBBN CTA 3", name: "Brisbane Regional CTA Step 3 (22-40 NM)",
        classification: "CLASS_C", classLetter: "C", chartTier: "VNC", isVtcTerminalStep: false,
        lowerLimitFt: 4500, upperLimitFt: 18000, lowerLimitText: "4500", upperLimitText: "FL180",
        controllingAgency: "Brisbane Centre", frequency: "125.700",
        hazardDesc: "High Altitude Enroute Transition",
        activeHours: "H24", color: "#0080FF", badge: "YBBN CTA | C 4500-FL180", center: [-27.3842, 153.68]
      },
      geometry: { type: "Polygon", coordinates: [generateArcSectorPolygon(-27.3842, 153.1175, 22.0, 40.0, 0, 360, 40)] }
    },
    {
      type: "Feature",
      properties: {
        id: "YBAF_CTR_D", code: "YBAF CTR D", name: "Archerfield Class D Control Zone",
        classification: "CLASS_D", classLetter: "D", chartTier: "BOTH", isVtcTerminalStep: true,
        lowerLimitFt: 0, upperLimitFt: 1500, lowerLimitText: "SFC", upperLimitText: "1500",
        controllingAgency: "Archerfield Tower", frequency: "118.100",
        hazardDesc: "Brisbane Metro GA Hub & Commercial Training Base",
        activeHours: "TWR Hours (0600-2200 LT)", color: "#00BFFF", badge: "YBAF | D SFC-1500", center: [-27.5703, 153.0078]
      },
      geometry: { type: "Polygon", coordinates: [generateCirclePolygon(-27.5703, 153.0078, 3.0, 24)] }
    },
    {
      type: "Feature",
      properties: {
        id: "YBCG_CTR_C", code: "YBCG CTR C", name: "Gold Coast (Coolangatta) Control Zone",
        classification: "CLASS_C", classLetter: "C", chartTier: "BOTH", isVtcTerminalStep: true,
        lowerLimitFt: 0, upperLimitFt: 3500, lowerLimitText: "SFC", upperLimitText: "3500",
        controllingAgency: "Gold Coast Tower", frequency: "118.700",
        hazardDesc: "High Density Tourist & Trans-Tasman Jet Operations",
        activeHours: "TWR Hours / Outside Hours CTAF", color: "#0080FF", badge: "YBCG | C SFC-3500", center: [-28.1644, 153.5047]
      },
      geometry: { type: "Polygon", coordinates: [generateCirclePolygon(-28.1644, 153.5047, 6.0, 30)] }
    },
    {
      type: "Feature",
      properties: {
        id: "YBSU_CTR_C", code: "YBSU CTR C", name: "Sunshine Coast (Maroochydore) Control Zone",
        classification: "CLASS_C", classLetter: "C", chartTier: "BOTH", isVtcTerminalStep: true,
        lowerLimitFt: 0, upperLimitFt: 3500, lowerLimitText: "SFC", upperLimitText: "3500",
        controllingAgency: "Sunshine Coast Tower", frequency: "124.400",
        hazardDesc: "Holiday Jet RPT & Flight Training Mixed Operations",
        activeHours: "TWR Hours", color: "#0080FF", badge: "YBSU | C SFC-3500", center: [-26.6033, 153.0911]
      },
      geometry: { type: "Polygon", coordinates: [generateCirclePolygon(-26.6033, 153.0911, 5.5, 28)] }
    },
    {
      type: "Feature",
      properties: {
        id: "YAMB_MIL_CTR", code: "YAMB MIL CTR", name: "RAAF Base Amberley Military CTR",
        classification: "MIL_CTR", classLetter: "C", chartTier: "BOTH", isVtcTerminalStep: true,
        lowerLimitFt: 0, upperLimitFt: 4500, lowerLimitText: "SFC", upperLimitText: "4500",
        controllingAgency: "Amberley Tower", frequency: "118.300",
        hazardDesc: "Super Hornet (F/A-18F), Growler (EA-18G) & Tanker (KC-30A) Base",
        activeHours: "Active by NOTAM / RAAF Ops", color: "#C00080", badge: "YAMB MIL | C SFC-4500", center: [-27.6406, 152.7119]
      },
      geometry: { type: "Polygon", coordinates: [generateCirclePolygon(-27.6406, 152.7119, 7.0, 32)] }
    },
    {
      type: "Feature",
      properties: {
        id: "YAMB_MIL_CTA", code: "YAMB MIL CTA", name: "Amberley Military Control Area Step",
        classification: "MIL_CTR", classLetter: "C", chartTier: "BOTH", isVtcTerminalStep: true,
        lowerLimitFt: 2500, upperLimitFt: 8500, lowerLimitText: "2500", upperLimitText: "8500",
        controllingAgency: "Amberley Approach", frequency: "135.500",
        hazardDesc: "Military Fast Jet High Speed Climb / Descent Corridor",
        activeHours: "Active by NOTAM", color: "#C00080", badge: "YAMB MIL CTA | C 2500-8500", center: [-27.6406, 152.88]
      },
      geometry: { type: "Polygon", coordinates: [generateArcSectorPolygon(-27.6406, 152.7119, 7.0, 18.0, 0, 360, 32)] }
    },
    {
      type: "Feature",
      properties: {
        id: "YBOK_MIL_CTR", code: "YBOK MIL CTR", name: "Oakey Army Aviation Centre MIL CTR",
        classification: "MIL_CTR", classLetter: "C", chartTier: "BOTH", isVtcTerminalStep: true,
        lowerLimitFt: 0, upperLimitFt: 4500, lowerLimitText: "SFC", upperLimitText: "4500",
        controllingAgency: "Oakey Tower", frequency: "123.300",
        hazardDesc: "Army Armed Reconnaissance & Multi-Role Helicopter Training",
        activeHours: "Active by NOTAM", color: "#C00080", badge: "YBOK MIL | C SFC-4500", center: [-27.4069, 151.7417]
      },
      geometry: { type: "Polygon", coordinates: [generateCirclePolygon(-27.4069, 151.7417, 6.0, 28)] }
    },
    {
      type: "Feature",
      properties: {
        id: "YBCS_CTR_C", code: "YBCS CTR C", name: "Cairns International Control Zone",
        classification: "CLASS_C", classLetter: "C", chartTier: "BOTH", isVtcTerminalStep: true,
        lowerLimitFt: 0, upperLimitFt: 4500, lowerLimitText: "SFC", upperLimitText: "4500",
        controllingAgency: "Cairns Tower", frequency: "124.900",
        hazardDesc: "Great Barrier Reef International Gateway & Mountain Circling",
        activeHours: "H24", color: "#0080FF", badge: "YBCS | C SFC-4500", center: [-16.8858, 145.7553]
      },
      geometry: { type: "Polygon", coordinates: [generateCirclePolygon(-16.8858, 145.7553, 7.0, 32)] }
    },
    {
      type: "Feature",
      properties: {
        id: "YBTL_MIL_CTR", code: "YBTL MIL CTR", name: "RAAF Base Townsville (Garbutt) MIL CTR",
        classification: "MIL_CTR", classLetter: "C", chartTier: "BOTH", isVtcTerminalStep: true,
        lowerLimitFt: 0, upperLimitFt: 4500, lowerLimitText: "SFC", upperLimitText: "4500",
        controllingAgency: "Townsville Tower", frequency: "118.300",
        hazardDesc: "Joint Military Tactical Air Base & Regional Passenger Hub",
        activeHours: "TWR Hours / Outside Hours CTAF", color: "#C00080", badge: "YBTL MIL | C SFC-4500", center: [-19.2525, 146.7653]
      },
      geometry: { type: "Polygon", coordinates: [generateCirclePolygon(-19.2525, 146.7653, 7.0, 32)] }
    },
    {
      type: "Feature",
      properties: {
        id: "R754", code: "R754", name: "Shoalwater Bay Military Training Zone",
        classification: "RESTRICTED", classLetter: "RA", chartTier: "BOTH", isVtcTerminalStep: false,
        lowerLimitFt: 0, upperLimitFt: 28000, lowerLimitText: "SFC", upperLimitText: "FL280",
        controllingAgency: "Brisbane Centre / ADF", frequency: "127.100",
        hazardDesc: "Major Joint ADF & International Amphibious / Live Air Bombing (Talisman Sabre)",
        activeHours: "Active by NOTAM", color: "#CC0033", badge: "R754 | SFC-FL280", center: [-22.50, 150.35]
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-22.150, 149.950], [-22.150, 150.750], [-22.850, 150.750], [-22.850, 149.950], [-22.150, 149.950]
        ]]
      }
    },

    // ------------------------------------------------------------------------
    // D. ADELAIDE BASIN & SOUTH AUSTRALIA (ADELAIDE FIR)
    // ------------------------------------------------------------------------
    {
      type: "Feature",
      properties: {
        id: "YPAD_CTR_C", code: "YPAD CTR C", name: "Adelaide International Control Zone",
        classification: "CLASS_C", classLetter: "C", chartTier: "BOTH", isVtcTerminalStep: true,
        lowerLimitFt: 0, upperLimitFt: 3500, lowerLimitText: "SFC", upperLimitText: "3500",
        controllingAgency: "Adelaide Tower", frequency: "120.500",
        hazardDesc: "Major Domestic & International Passenger Hub",
        activeHours: "H24", color: "#0080FF", badge: "YPAD CTR | C SFC-3500", center: [-34.9450, 138.5306]
      },
      geometry: { type: "Polygon", coordinates: [generateCirclePolygon(-34.9450, 138.5306, 6.0, 32)] }
    },
    {
      type: "Feature",
      properties: {
        id: "YPAD_CTA_STEP1", code: "YPAD CTA 1", name: "Adelaide Terminal CTA Step 1 (6-12 NM)",
        classification: "CLASS_C", classLetter: "C", chartTier: "VTC", isVtcTerminalStep: true,
        lowerLimitFt: 1500, upperLimitFt: 4500, lowerLimitText: "1500", upperLimitText: "4500",
        controllingAgency: "Adelaide Approach", frequency: "124.200",
        hazardDesc: "Terminal Jet Arrival / Departure Descent",
        activeHours: "H24", color: "#0080FF", badge: "YPAD CTA | C 1500-4500", center: [-34.9450, 138.68]
      },
      geometry: { type: "Polygon", coordinates: [generateArcSectorPolygon(-34.9450, 138.5306, 6.0, 12.0, 0, 360, 32)] }
    },
    {
      type: "Feature",
      properties: {
        id: "YPAD_CTA_STEP2", code: "YPAD CTA 2", name: "Adelaide Terminal CTA Step 2 (12-25 NM)",
        classification: "CLASS_C", classLetter: "C", chartTier: "BOTH", isVtcTerminalStep: true,
        lowerLimitFt: 2500, upperLimitFt: 8500, lowerLimitText: "2500", upperLimitText: "8500",
        controllingAgency: "Adelaide Approach", frequency: "124.200",
        hazardDesc: "Intermediate Terminal Transition Routes",
        activeHours: "H24", color: "#0080FF", badge: "YPAD CTA | C 2500-8500", center: [-34.9450, 138.88]
      },
      geometry: { type: "Polygon", coordinates: [generateArcSectorPolygon(-34.9450, 138.5306, 12.0, 25.0, 0, 360, 36)] }
    },
    {
      type: "Feature",
      properties: {
        id: "YPPF_CTR_D", code: "YPPF CTR D", name: "Parafield Class D Control Zone",
        classification: "CLASS_D", classLetter: "D", chartTier: "BOTH", isVtcTerminalStep: true,
        lowerLimitFt: 0, upperLimitFt: 1500, lowerLimitText: "SFC", upperLimitText: "1500",
        controllingAgency: "Parafield Tower", frequency: "118.700",
        hazardDesc: "Adelaide General Aviation & Flight Academy Hub",
        activeHours: "TWR Hours (0600-2200 LT)", color: "#00BFFF", badge: "YPPF | D SFC-1500", center: [-34.7933, 138.6331]
      },
      geometry: { type: "Polygon", coordinates: [generateCirclePolygon(-34.7933, 138.6331, 3.0, 24)] }
    },
    {
      type: "Feature",
      properties: {
        id: "YPED_MIL_CTR", code: "YPED MIL CTR", name: "RAAF Base Edinburgh Military CTR",
        classification: "MIL_CTR", classLetter: "C", chartTier: "BOTH", isVtcTerminalStep: true,
        lowerLimitFt: 0, upperLimitFt: 3500, lowerLimitText: "SFC", upperLimitText: "3500",
        controllingAgency: "Edinburgh Tower", frequency: "118.300",
        hazardDesc: "P-8A Poseidon Maritime Patrol & Aerospace Operational Test",
        activeHours: "Active by NOTAM / RAAF Ops", color: "#C00080", badge: "YPED MIL | C SFC-3500", center: [-34.7042, 138.6214]
      },
      geometry: { type: "Polygon", coordinates: [generateCirclePolygon(-34.7042, 138.6214, 6.0, 28)] }
    },
    {
      type: "Feature",
      properties: {
        id: "R272", code: "R272", name: "Cultana Army Training Area",
        classification: "RESTRICTED", classLetter: "RA", chartTier: "BOTH", isVtcTerminalStep: false,
        lowerLimitFt: 0, upperLimitFt: 15000, lowerLimitText: "SFC", upperLimitText: "15000",
        controllingAgency: "Australian Army / Melbourne Centre", frequency: "130.200",
        hazardDesc: "Live Weapons Firing, Combined Arms & Anti-Tank Range",
        activeHours: "Active by NOTAM", color: "#CC0033", badge: "R272 | SFC-15000", center: [-32.85, 137.60]
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-32.550, 137.300], [-32.550, 137.900], [-33.150, 137.900], [-33.150, 137.300], [-32.550, 137.300]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "R250_WOOMERA", code: "R250 WOOMERA", name: "Woomera Aerospace & Test Range Complex",
        classification: "RESTRICTED", classLetter: "RA", chartTier: "BOTH", isVtcTerminalStep: false,
        lowerLimitFt: 0, upperLimitFt: 60000, lowerLimitText: "SFC", upperLimitText: "UNLTD",
        controllingAgency: "Woomera Range Control / RAAF", frequency: "123.900",
        hazardDesc: "World's Largest Inland Land-Based Aerospace & Missile Test Facility",
        activeHours: "Active by NOTAM (Extremely Hazardous)", color: "#CC0033", badge: "R250 | SFC-UNL", center: [-30.80, 135.50]
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-28.800, 133.000], [-28.800, 137.500], [-31.500, 137.500], [-31.950, 136.200],
          [-31.950, 133.500], [-30.200, 133.000], [-28.800, 133.000]
        ]]
      }
    },

    // ------------------------------------------------------------------------
    // E. PERTH BASIN & WESTERN AUSTRALIA (PERTH FIR)
    // ------------------------------------------------------------------------
    {
      type: "Feature",
      properties: {
        id: "YPPH_CTR_C", code: "YPPH CTR C", name: "Perth International Control Zone",
        classification: "CLASS_C", classLetter: "C", chartTier: "BOTH", isVtcTerminalStep: true,
        lowerLimitFt: 0, upperLimitFt: 4500, lowerLimitText: "SFC", upperLimitText: "4500",
        controllingAgency: "Perth Tower", frequency: "120.500",
        hazardDesc: "Trans-Continental & International Hub",
        activeHours: "H24", color: "#0080FF", badge: "YPPH CTR | C SFC-4500", center: [-31.9403, 115.9669]
      },
      geometry: { type: "Polygon", coordinates: [generateCirclePolygon(-31.9403, 115.9669, 7.0, 36)] }
    },
    {
      type: "Feature",
      properties: {
        id: "YPPH_CTA_STEP1", code: "YPPH CTA 1", name: "Perth Terminal CTA Step 1 (7-12 NM)",
        classification: "CLASS_C", classLetter: "C", chartTier: "VTC", isVtcTerminalStep: true,
        lowerLimitFt: 1500, upperLimitFt: 4500, lowerLimitText: "1500", upperLimitText: "4500",
        controllingAgency: "Perth Approach", frequency: "123.900",
        hazardDesc: "Terminal Jet Inbound / Outbound Wedding Cake",
        activeHours: "H24", color: "#0080FF", badge: "YPPH CTA | C 1500-4500", center: [-31.9403, 116.12]
      },
      geometry: { type: "Polygon", coordinates: [generateArcSectorPolygon(-31.9403, 115.9669, 7.0, 12.0, 0, 360, 32)] }
    },
    {
      type: "Feature",
      properties: {
        id: "YPPH_CTA_STEP2", code: "YPPH CTA 2", name: "Perth Terminal CTA Step 2 (12-25 NM)",
        classification: "CLASS_C", classLetter: "C", chartTier: "BOTH", isVtcTerminalStep: true,
        lowerLimitFt: 2500, upperLimitFt: 9000, lowerLimitText: "2500", upperLimitText: "9000",
        controllingAgency: "Perth Approach / Departures", frequency: "123.900",
        hazardDesc: "Intermediate Terminal Transition Routes",
        activeHours: "H24", color: "#0080FF", badge: "YPPH CTA | C 2500-9000", center: [-31.9403, 116.32]
      },
      geometry: { type: "Polygon", coordinates: [generateArcSectorPolygon(-31.9403, 115.9669, 12.0, 25.0, 0, 360, 36)] }
    },
    {
      type: "Feature",
      properties: {
        id: "YPJT_CTR_D", code: "YPJT CTR D", name: "Jandakot Class D Control Zone",
        classification: "CLASS_D", classLetter: "D", chartTier: "BOTH", isVtcTerminalStep: true,
        lowerLimitFt: 0, upperLimitFt: 1500, lowerLimitText: "SFC", upperLimitText: "1500",
        controllingAgency: "Jandakot Tower", frequency: "118.100",
        hazardDesc: "Australia's Second Busiest General Aviation Airport",
        activeHours: "TWR Hours (0600-2200 LT)", color: "#00BFFF", badge: "YPJT | D SFC-1500", center: [-32.0975, 115.8803]
      },
      geometry: { type: "Polygon", coordinates: [generateCirclePolygon(-32.0975, 115.8803, 3.0, 24)] }
    },
    {
      type: "Feature",
      properties: {
        id: "YPEA_MIL_CTR", code: "YPEA MIL CTR", name: "RAAF Base Pearce Military CTR",
        classification: "MIL_CTR", classLetter: "C", chartTier: "BOTH", isVtcTerminalStep: true,
        lowerLimitFt: 0, upperLimitFt: 4500, lowerLimitText: "SFC", upperLimitText: "4500",
        controllingAgency: "Pearce Tower", frequency: "118.300",
        hazardDesc: "Lead-In Fighter Training (Hawk 127) & PC-21 Advanced Pilots",
        activeHours: "Active by NOTAM / RAAF Ops", color: "#C00080", badge: "YPEA MIL | C SFC-4500", center: [-31.6675, 116.0153]
      },
      geometry: { type: "Polygon", coordinates: [generateCirclePolygon(-31.6675, 116.0153, 7.0, 32)] }
    },
    {
      type: "Feature",
      properties: {
        id: "YPEA_MIL_CTA", code: "YPEA MIL CTA", name: "Pearce Military Control Area Step",
        classification: "MIL_CTR", classLetter: "C", chartTier: "BOTH", isVtcTerminalStep: true,
        lowerLimitFt: 2000, upperLimitFt: 6000, lowerLimitText: "2000", upperLimitText: "6000",
        controllingAgency: "Pearce Approach", frequency: "130.200",
        hazardDesc: "Military Fighter Jet High Speed Climb / Descent",
        activeHours: "Active by NOTAM", color: "#C00080", badge: "YPEA MIL CTA | C 2000-6000", center: [-31.6675, 116.18]
      },
      geometry: { type: "Polygon", coordinates: [generateArcSectorPolygon(-31.6675, 116.0153, 7.0, 20.0, 0, 360, 32)] }
    },
    {
      type: "Feature",
      properties: {
        id: "R155", code: "R155", name: "Warnbro Sound / Garden Island Naval Firing",
        classification: "RESTRICTED", classLetter: "RA", chartTier: "BOTH", isVtcTerminalStep: false,
        lowerLimitFt: 0, upperLimitFt: 20000, lowerLimitText: "SFC", upperLimitText: "20000",
        controllingAgency: "Pearce Approach / Navy", frequency: "130.200",
        hazardDesc: "Naval Submarine & Surface Ship Live Firing",
        activeHours: "Active by NOTAM", color: "#CC0033", badge: "R155 | SFC-20000", center: [-32.32, 115.55]
      },
      geometry: { type: "Polygon", coordinates: [generateCirclePolygon(-32.32, 115.55, 10.0, 32)] }
    },
    {
      type: "Feature",
      properties: {
        id: "YPLM_MIL_CTR", code: "YPLM MIL CTR", name: "RAAF Base Learmonth (Exmouth) MIL CTR",
        classification: "MIL_CTR", classLetter: "C", chartTier: "BOTH", isVtcTerminalStep: true,
        lowerLimitFt: 0, upperLimitFt: 5000, lowerLimitText: "SFC", upperLimitText: "5000",
        controllingAgency: "Learmonth Tower / Melbourne Centre", frequency: "118.300",
        hazardDesc: "North-West Bare Base Forward Defence & Heavy Transport Ops",
        activeHours: "Active by NOTAM", color: "#C00080", badge: "YPLM MIL | C SFC-5000", center: [-22.2356, 114.0886]
      },
      geometry: { type: "Polygon", coordinates: [generateCirclePolygon(-22.2356, 114.0886, 7.0, 28)] }
    },
    {
      type: "Feature",
      properties: {
        id: "R815", code: "R815", name: "Exmouth Gulf Aerospace Test Zone",
        classification: "RESTRICTED", classLetter: "RA", chartTier: "BOTH", isVtcTerminalStep: false,
        lowerLimitFt: 0, upperLimitFt: 25000, lowerLimitText: "SFC", upperLimitText: "FL250",
        controllingAgency: "Learmonth Approach / ADF", frequency: "123.900",
        hazardDesc: "Naval Communications & Military Missile Warning Radar",
        activeHours: "Active by NOTAM", color: "#CC0033", badge: "R815 | SFC-FL250", center: [-22.05, 114.35]
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-21.750, 114.100], [-21.750, 114.650], [-22.350, 114.650], [-22.350, 114.100], [-21.750, 114.100]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "YBRM_CTR_D", code: "YBRM CTR D", name: "Broome International Control Zone",
        classification: "CLASS_D", classLetter: "D", chartTier: "BOTH", isVtcTerminalStep: true,
        lowerLimitFt: 0, upperLimitFt: 3500, lowerLimitText: "SFC", upperLimitText: "3500",
        controllingAgency: "Broome Tower", frequency: "126.000",
        hazardDesc: "Kimberley Hub & Offshore Helicopter Staging",
        activeHours: "TWR Hours", color: "#00BFFF", badge: "YBRM | D SFC-3500", center: [-17.9447, 122.2319]
      },
      geometry: { type: "Polygon", coordinates: [generateCirclePolygon(-17.9447, 122.2319, 5.0, 24)] }
    },
    {
      type: "Feature",
      properties: {
        id: "YPKA_CTR_D", code: "YPKA CTR D", name: "Karratha Control Zone",
        classification: "CLASS_D", classLetter: "D", chartTier: "BOTH", isVtcTerminalStep: true,
        lowerLimitFt: 0, upperLimitFt: 3500, lowerLimitText: "SFC", upperLimitText: "3500",
        controllingAgency: "Karratha Tower", frequency: "119.900",
        hazardDesc: "Pilbara Mining Jet FIFO Hub & Offshore Gas Operations",
        activeHours: "TWR Hours", color: "#00BFFF", badge: "YPKA | D SFC-3500", center: [-20.7122, 116.7731]
      },
      geometry: { type: "Polygon", coordinates: [generateCirclePolygon(-20.7122, 116.7731, 5.0, 24)] }
    },

    // ------------------------------------------------------------------------
    // F. NORTHERN TERRITORY (DARWIN FIR)
    // ------------------------------------------------------------------------
    {
      type: "Feature",
      properties: {
        id: "YPDN_MIL_CTR", code: "YPDN MIL CTR", name: "RAAF Base Darwin / International MIL CTR",
        classification: "MIL_CTR", classLetter: "C", chartTier: "BOTH", isVtcTerminalStep: true,
        lowerLimitFt: 0, upperLimitFt: 4500, lowerLimitText: "SFC", upperLimitText: "4500",
        controllingAgency: "Darwin Tower", frequency: "133.100",
        hazardDesc: "Major Joint Civil / RAAF Strategic Base (Pitch Black Exercise)",
        activeHours: "H24", color: "#C00080", badge: "YPDN MIL | C SFC-4500", center: [-12.4147, 130.8767]
      },
      geometry: { type: "Polygon", coordinates: [generateCirclePolygon(-12.4147, 130.8767, 7.0, 32)] }
    },
    {
      type: "Feature",
      properties: {
        id: "YPDN_MIL_CTA", code: "YPDN MIL CTA", name: "Darwin Terminal MIL CTA Step (7-25 NM)",
        classification: "MIL_CTR", classLetter: "C", chartTier: "BOTH", isVtcTerminalStep: true,
        lowerLimitFt: 2000, upperLimitFt: 8500, lowerLimitText: "2000", upperLimitText: "8500",
        controllingAgency: "Darwin Approach", frequency: "134.100",
        hazardDesc: "Military Fighter High Speed Strategic Approach Area",
        activeHours: "H24", color: "#C00080", badge: "YPDN CTA | C 2000-8500", center: [-12.4147, 131.05]
      },
      geometry: { type: "Polygon", coordinates: [generateArcSectorPolygon(-12.4147, 130.8767, 7.0, 25.0, 0, 360, 36)] }
    },
    {
      type: "Feature",
      properties: {
        id: "YPTN_MIL_CTR", code: "YPTN MIL CTR", name: "RAAF Base Tindal (Katherine) MIL CTR",
        classification: "MIL_CTR", classLetter: "C", chartTier: "BOTH", isVtcTerminalStep: true,
        lowerLimitFt: 0, upperLimitFt: 5000, lowerLimitText: "SFC", upperLimitText: "5000",
        controllingAgency: "Tindal Tower", frequency: "118.300",
        hazardDesc: "Permanent RAAF F-35A Lightning II Strike Fighter Squadron Base",
        activeHours: "Active by NOTAM / RAAF Ops", color: "#C00080", badge: "YPTN MIL | C SFC-5000", center: [-14.5211, 132.3778]
      },
      geometry: { type: "Polygon", coordinates: [generateCirclePolygon(-14.5211, 132.3778, 7.0, 32)] }
    },
    {
      type: "Feature",
      properties: {
        id: "YBAS_CTR_C", code: "YBAS CTR C", name: "Alice Springs Control Zone",
        classification: "CLASS_C", classLetter: "C", chartTier: "BOTH", isVtcTerminalStep: true,
        lowerLimitFt: 0, upperLimitFt: 4500, lowerLimitText: "SFC", upperLimitText: "4500",
        controllingAgency: "Alice Springs Tower", frequency: "118.300",
        hazardDesc: "Central Australia Red Centre Hub & Long Term Aircraft Storage",
        activeHours: "TWR Hours / Outside Hours CTAF", color: "#0080FF", badge: "YBAS | C SFC-4500", center: [-23.8067, 133.9022]
      },
      geometry: { type: "Polygon", coordinates: [generateCirclePolygon(-23.8067, 133.9022, 6.0, 28)] }
    },
    {
      type: "Feature",
      properties: {
        id: "R245_PINE_GAP", code: "R245 PINE GAP", name: "Joint Defence Facility Pine Gap Prohibited Area",
        classification: "RESTRICTED", classLetter: "RA", chartTier: "BOTH", isVtcTerminalStep: false,
        lowerLimitFt: 0, upperLimitFt: 20000, lowerLimitText: "SFC", upperLimitText: "FL200",
        controllingAgency: "Alice Springs Tower / Joint Defence", frequency: "118.300",
        hazardDesc: "Strictly Prohibited Airspace - Top Secret Satellite Surveillance Facility",
        activeHours: "Continuous H24 (STRICTLY PROHIBITED)", color: "#CC0033", badge: "R245 PROHIBITED | SFC-FL200", center: [-23.7989, 133.7364]
      },
      geometry: { type: "Polygon", coordinates: [generateCirclePolygon(-23.7989, 133.7364, 3.5, 24)] }
    },
    {
      type: "Feature",
      properties: {
        id: "R225", code: "R225", name: "Delamere Air Weapons Range",
        classification: "RESTRICTED", classLetter: "RA", chartTier: "BOTH", isVtcTerminalStep: false,
        lowerLimitFt: 0, upperLimitFt: 25000, lowerLimitText: "SFC", upperLimitText: "FL250",
        controllingAgency: "Tindal Approach / RAAF", frequency: "134.100",
        hazardDesc: "Live Laser-Guided Bombing, Electronic Warfare & Air Strikes",
        activeHours: "Active by NOTAM", color: "#CC0033", badge: "R225 | SFC-FL250", center: [-15.75, 131.85]
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-15.450, 131.550], [-15.450, 132.150], [-16.050, 132.150], [-16.050, 131.550], [-15.450, 131.550]
        ]]
      }
    },

    // ------------------------------------------------------------------------
    // G. CONTINENTAL NATIONWIDE CLASS E CORRIDORS (VFR-OK, IFR-CONTROLLED)
    // ------------------------------------------------------------------------
    {
      type: "Feature",
      properties: {
        id: "E_COASTAL_4500", code: "E LL 4500", name: "Australian East Coast Class E Corridor",
        classification: "CLASS_E", classLetter: "E", chartTier: "VNC", isVtcTerminalStep: false,
        lowerLimitFt: 4500, upperLimitFt: 18000, lowerLimitText: "4500", upperLimitText: "FL180",
        controllingAgency: "Brisbane / Melbourne Centre", frequency: "124.000 / 125.700",
        hazardDesc: "Controlled for IFR; VFR No Clearance Required with Transponder",
        activeHours: "H24", color: "#8B4513", badge: "E LL 4500", center: [-31.50, 153.00]
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-16.000, 145.000], [-16.000, 147.500], [-38.500, 151.000], [-38.500, 144.000],
          [-34.000, 149.000], [-27.000, 151.500], [-16.000, 145.000]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "E_INLAND_8500", code: "E LL 8500", name: "Inland Eastern Australia Class E Step",
        classification: "CLASS_E", classLetter: "E", chartTier: "VNC", isVtcTerminalStep: false,
        lowerLimitFt: 8500, upperLimitFt: 18000, lowerLimitText: "8500", upperLimitText: "FL180",
        controllingAgency: "Brisbane / Melbourne Centre", frequency: "127.100",
        hazardDesc: "Continental Inland Low-Level Step",
        activeHours: "H24", color: "#8B4513", badge: "E LL 8500", center: [-30.00, 148.00]
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-23.000, 144.000], [-23.000, 150.000], [-36.000, 149.000], [-36.000, 142.000], [-23.000, 144.000]
        ]]
      }
    }
  ]
};

// ============================================================================
// 1.16 OFFICIAL VFR VISUAL APPROACH REPORTING WAYPOINTS (VTC CHARTS)
// ============================================================================
const AUSTRALIAN_VFR_WAYPOINTS = [
  // Sydney Basin VTC
  { id: "LGR", name: "Long Reef", lat: -33.7439, lon: 151.3142, desc: "Sydney Coastal Inbound VFR Fix", region: "SYD" },
  { id: "2RN", name: "2RN Radio Masts", lat: -33.8647, lon: 150.8528, desc: "Bankstown / Prospect Inbound Point", region: "SYD" },
  { id: "PSP", name: "Prospect Reservoir", lat: -33.8183, lon: 150.9067, desc: "VFR Reporting Water Feature", region: "SYD" },
  { id: "PAT", name: "Patonga", lat: -33.5511, lon: 151.2750, desc: "Hawkesbury River VFR Gateway", region: "SYD" },
  { id: "CTP", name: "Cape Three Points", lat: -33.5042, lon: 151.4167, desc: "Avoca Beach Coastal Fix", region: "SYD" },
  { id: "GAP", name: "The Gap / South Head", lat: -33.8442, lon: 151.2828, desc: "Sydney Harbour Seaward Gate", region: "SYD" },
  { id: "CRD", name: "Cross Roads (Liverpool)", lat: -33.9511, lon: 150.8764, desc: "South-West VFR Transit Corridor", region: "SYD" },
  { id: "BKN", name: "Brooklyn Bridge", lat: -33.5486, lon: 151.2208, desc: "F3 Freeway / Hawkesbury Crossing", region: "SYD" },

  // Williamtown / Newcastle VTC
  { id: "PTS", name: "Port Stephens Entrance", lat: -32.7167, lon: 152.1833, desc: "Nelson Bay Inbound Gate", region: "WLM" },
  { id: "SOL", name: "Soldiers Point", lat: -32.7042, lon: 152.0667, desc: "Inner Port Stephens Water Point", region: "WLM" },
  { id: "HXH", name: "Hexham Bridge", lat: -32.8183, lon: 151.6850, desc: "Hunter River Transit Fix", region: "WLM" },
  { id: "SWA", name: "Swansea Heads", lat: -33.0850, lon: 151.6433, desc: "Lake Macquarie Coastal Entrance", region: "WLM" },
  { id: "ABY", name: "Anna Bay", lat: -32.7833, lon: 152.0833, desc: "Stockton Bight Inbound Gate", region: "WLM" },

  // Brisbane & Gold Coast VTC
  { id: "CBR", name: "Centenary Bridge", lat: -27.5350, lon: 152.9517, desc: "Archerfield West Inbound Route", region: "BNE" },
  { id: "TGT", name: "Target (Goodna)", lat: -27.6083, lon: 152.8983, desc: "Amberley / Archerfield Boundary Point", region: "BNE" },
  { id: "TVT", name: "Mount Coot-tha TV Towers", lat: -27.4789, lon: 152.9583, desc: "Brisbane Scenic VFR Landmark", region: "BNE" },
  { id: "MBH", name: "Manly Boat Harbour", lat: -27.4583, lon: 153.1883, desc: "Moreton Bay Coastal Inbound Fix", region: "BNE" },
  { id: "MTW", name: "Mount Warning", lat: -28.3983, lon: 153.2700, desc: "Gold Coast South Sector Peak", region: "OOL" },
  { id: "TWD", name: "Tweed Heads Danger Point", lat: -28.1683, lon: 153.5517, desc: "Gold Coast Coastal Entry", region: "OOL" },

  // Melbourne Basin VTC
  { id: "STK", name: "St Kilda Pier", lat: -37.8647, lon: 144.9703, desc: "Moorabbin Coastal Inbound Gate", region: "MEL" },
  { id: "BRI", name: "Brighton Marina", lat: -37.9083, lon: 144.9850, desc: "Port Phillip East Coast Reporting Point", region: "MEL" },
  { id: "WGB", name: "West Gate Bridge", lat: -37.8306, lon: 144.8986, desc: "Melbourne City VFR Corridor Gate", region: "MEL" },
  { id: "YYN", name: "Yan Yean Reservoir", lat: -37.5583, lon: 145.1433, desc: "Northern VFR Entry to Essendon", region: "MEL" },
  { id: "DAN", name: "Dandenong Plaza", lat: -37.9867, lon: 145.2133, desc: "Moorabbin East Reporting Fix", region: "MEL" },

  // Adelaide VTC
  { id: "TOR", name: "Torrens Island", lat: -34.7833, lon: 138.5333, desc: "Parafield West Inbound Route", region: "ADL" },
  { id: "OUT", name: "Outer Harbor", lat: -34.7750, lon: 138.4833, desc: "St Vincent Gulf Coastal Fix", region: "ADL" },
  { id: "GLE", name: "Glenelg Jetty", lat: -34.9806, lon: 138.5139, desc: "Adelaide South Coastal Entry", region: "ADL" },

  // Perth VTC
  { id: "SUB", name: "Subiaco Oval", lat: -31.9442, lon: 115.8292, desc: "Perth City VFR Route Gate", region: "PER" },
  { id: "HIL", name: "Hillarys Boat Harbour", lat: -31.8239, lon: 115.7389, desc: "North Coast Coastal Inbound Point", region: "PER" },
  { id: "FRE", name: "Fremantle Port Crane", lat: -32.0533, lon: 115.7483, desc: "Jandakot West Coast Entry Gate", region: "PER" },
  { id: "CAN", name: "Canning Bridge", lat: -32.0083, lon: 115.8583, desc: "Swan River Visual Transit Fix", region: "PER" }
];

// ============================================================================
// 1.17 REAL-TIME AIRSPACE PENETRATION & PROXIMITY ENGINE
// ============================================================================
class AirspaceWarningEngine {
  constructor() {
    this.activePenetration = null;
    this.activeProximity = null;
    this.lastAlertTime = 0;
    this.lastSpeechTime = 0;
    this.showAirspaces = localStorage.getItem("efis_show_airspaces") !== "false";
    this.showVfrWaypoints = localStorage.getItem("efis_show_vfr_waypoints") !== "false";
    this.chartMode = localStorage.getItem("efis_chart_mode") || "HYBRID"; // VNC | VTC | HYBRID
    this.airspaceFilter = localStorage.getItem("efis_airspace_filter") || "ALL"; // ALL | RESTRICTED_MIL | CONTROLLED | VTC
  }

  cycleChartMode() {
    if (this.chartMode === "VNC") {
      this.chartMode = "VTC";
    } else if (this.chartMode === "VTC") {
      this.chartMode = "HYBRID";
    } else {
      this.chartMode = "VNC";
    }
    localStorage.setItem("efis_chart_mode", this.chartMode);
    return this.chartMode;
  }

  cycleFilter() {
    if (this.airspaceFilter === "ALL") {
      this.airspaceFilter = "RESTRICTED_MIL";
    } else if (this.airspaceFilter === "RESTRICTED_MIL") {
      this.airspaceFilter = "CONTROLLED";
    } else if (this.airspaceFilter === "CONTROLLED") {
      this.airspaceFilter = "VTC";
    } else {
      this.airspaceFilter = "ALL";
    }
    localStorage.setItem("efis_airspace_filter", this.airspaceFilter);
    return this.airspaceFilter;
  }

  evaluate(lat, lon, altFt, headingDeg, groundSpeedKt) {
    let topPenetration = null;
    let closestProximity = null;
    let minProximityDist = Infinity;

    for (const feature of AUSTRALIAN_AIRSPACES.features) {
      const props = feature.properties;
      const poly = feature.geometry.coordinates[0];

      if (!this.checkFilterMatch(props.classification, props.isVtcTerminalStep)) continue;

      const isInside2D = isPointInPolygon(lat, lon, poly);
      const isInsideAlt = (altFt >= props.lowerLimitFt && altFt <= props.upperLimitFt);

      if (isInside2D && isInsideAlt) {
        const priorityMap = {
          "RESTRICTED": 100,
          "MIL_CTR": 90,
          "CLASS_C": 80,
          "CLASS_D": 70,
          "DANGER": 60,
          "CLASS_E": 20
        };
        const currentPrio = priorityMap[props.classification] || 10;
        const topPrio = topPenetration ? (priorityMap[topPenetration.classification] || 0) : 0;

        if (currentPrio > topPrio) {
          topPenetration = props;
        }
      } else if (!isInside2D) {
        const altMargin = 500;
        const isNearAlt = (altFt >= props.lowerLimitFt - altMargin && altFt <= props.upperLimitFt + altMargin);
        
        if (isNearAlt) {
          const distNm = calculateMinDistanceToPolygonNm(lat, lon, poly);
          if (distNm <= 3.0 && distNm < minProximityDist) {
            const centerLat = props.center ? props.center[0] : poly[0][0];
            const centerLon = props.center ? props.center[1] : poly[0][1];
            const brgToAirspace = calculateBearingDeg(lat, lon, centerLat, centerLon);
            let headingDiff = Math.abs((headingDeg - brgToAirspace + 540) % 360 - 180);
            
            if (headingDiff <= 90 || distNm <= 1.5) {
              minProximityDist = distNm;
              closestProximity = {
                ...props,
                distNm: distNm,
                bearingDeg: brgToAirspace
              };
            }
          }
        }
      }
    }

    this.activePenetration = topPenetration;
    this.activeProximity = closestProximity;

    this.handleAlertAudio();

    return {
      penetration: this.activePenetration,
      proximity: this.activeProximity
    };
  }

  checkFilterMatch(classification, isVtcTerminal) {
    if (this.airspaceFilter === "ALL") return true;
    if (this.airspaceFilter === "RESTRICTED_MIL") {
      return classification === "RESTRICTED" || classification === "MIL_CTR" || classification === "DANGER";
    }
    if (this.airspaceFilter === "CONTROLLED") {
      return classification === "CLASS_C" || classification === "CLASS_D" || classification === "CLASS_E";
    }
    if (this.airspaceFilter === "VTC") {
      return isVtcTerminal === true || classification === "CLASS_D" || classification === "MIL_CTR";
    }
    return true;
  }

  handleAlertAudio() {
    const now = Date.now();
    if (!this.activePenetration && !this.activeProximity) return;

    if (now - this.lastAlertTime > 15000) {
      this.lastAlertTime = now;
      if (typeof audioSynth !== 'undefined' && audioSynth && audioSynth.playDivertChime) {
        audioSynth.playDivertChime();
      }

      if ('speechSynthesis' in window && now - this.lastSpeechTime > 18000) {
        this.lastSpeechTime = now;
        try {
          let text = "";
          if (this.activePenetration) {
            if (this.activePenetration.classification === "RESTRICTED") {
              text = `Warning! Inside Restricted Airspace, ${this.activePenetration.code}`;
            } else if (this.activePenetration.classification === "MIL_CTR") {
              text = `Caution! Inside Military Control Zone, ${this.activePenetration.name}`;
            } else if (this.activePenetration.classification === "CLASS_C" || this.activePenetration.classification === "CLASS_D") {
              text = `Caution! Inside Controlled Airspace, ${this.activePenetration.name}`;
            }
          } else if (this.activeProximity && (this.activeProximity.classification === "RESTRICTED" || this.activeProximity.classification === "MIL_CTR")) {
            text = `Caution! Airspace Ahead, ${this.activeProximity.code}, ${this.activeProximity.distNm.toFixed(1)} miles`;
          }

          if (text) {
            const msg = new SpeechSynthesisUtterance(text);
            msg.rate = 1.05;
            msg.pitch = 1.0;
            window.speechSynthesis.speak(msg);
          }
        } catch(e) {}
      }
    }
  }
}
const airspaceEngine = new AirspaceWarningEngine();
if (typeof window !== 'undefined') {
  window.airspaceEngine = airspaceEngine;
  window.AUSTRALIAN_AIRSPACES = AUSTRALIAN_AIRSPACES;
  window.AUSTRALIAN_VFR_WAYPOINTS = AUSTRALIAN_VFR_WAYPOINTS;
}

// Active Frequency Determination
let lastCtafZoneActive = false;

function determineActiveFrequencies(currentLat, currentLon, currentAlt) {
  // 1. Locate FIA Area Polygon
  let activeFia = null;
  for (const feature of VHF_AREA_SECTORS.features) {
    if (isPointInPolygon(currentLat, currentLon, feature.geometry.coordinates[0])) {
      activeFia = feature.properties;
      break;
    }
  }
  if (!activeFia) {
    activeFia = VHF_AREA_SECTORS.features[0].properties; // Default Area 20
  }

  // 2. Find Nearest CTAF and check 10 NM boundary
  let nearestCtaf = null;
  let minDistance = Infinity;

  AUSTRALIAN_AIRPORTS.forEach(apt => {
    const dist = calculateDistanceNm(currentLat, currentLon, apt.lat, apt.lon);
    const radius = apt.ctafRadiusNm || 10.0;
    if (dist < minDistance) {
      minDistance = dist;
      nearestCtaf = {
        ...apt,
        distanceNm: dist,
        bearingDeg: calculateBearingDeg(currentLat, currentLon, apt.lat, apt.lon),
        isInsideZone: dist <= radius
      };
    }
  });

  return {
    fia: activeFia,
    ctaf: nearestCtaf,
    isCtafActive: nearestCtaf ? nearestCtaf.isInsideZone : false
  };
}

// ============================================================================
// 1.2 GDL90 BINARY ADS-B PROTOCOL DECODER (OFFLINE & WIFI RECEIVERS)
// ============================================================================
class Gdl90Parser {
  static CRC_TABLE = null;

  static initCrcTable() {
    if (this.CRC_TABLE) return;
    this.CRC_TABLE = new Uint16Array(256);
    for (let i = 0; i < 256; i++) {
      let crc = i;
      for (let j = 0; j < 8; j++) {
        crc = (crc & 1) ? (0xD801 ^ (crc >>> 1)) : (crc >>> 1);
      }
      this.CRC_TABLE[i] = crc;
    }
  }

  static calculateCrc(bytes, length) {
    this.initCrcTable();
    let crc = 0;
    for (let i = 0; i < length; i++) {
      crc = this.CRC_TABLE[(crc ^ bytes[i]) & 0xFF] ^ (crc >>> 8);
    }
    return crc;
  }

  static unescapeBytes(rawBytes) {
    const out = [];
    for (let i = 0; i < rawBytes.length; i++) {
      if (rawBytes[i] === 0x7D && i + 1 < rawBytes.length) {
        if (rawBytes[i+1] === 0x5E) { out.push(0x7E); i++; }
        else if (rawBytes[i+1] === 0x5D) { out.push(0x7D); i++; }
        else { out.push(rawBytes[i]); }
      } else {
        out.push(rawBytes[i]);
      }
    }
    return new Uint8Array(out);
  }

  static parseMessage(rawBytes) {
    if (rawBytes.length < 4) return null;
    const msg = this.unescapeBytes(rawBytes);
    const msgId = msg[0];

    // Message ID 0: Heartbeat
    if (msgId === 0x00) {
      return {
        type: 'HEARTBEAT',
        status1: msg[1],
        status2: msg[2],
        timestamp: (msg[4] << 16) | (msg[5] << 8) | msg[6]
      };
    }

    // Message ID 10 (0x0A): Traffic Report (28 bytes)
    if (msgId === 0x0A && msg.length >= 28) {
      const alertAndType = msg[1];
      const alertStatus = (alertAndType >> 4) & 0x0F;
      const targetType = alertAndType & 0x0F;

      // 24-bit ICAO address
      const icaoInt = (msg[2] << 16) | (msg[3] << 8) | msg[4];
      const icaoHex = icaoInt.toString(16).toUpperCase().padStart(6, '0');

      // 24-bit Latitude (2's complement)
      let latRaw = (msg[5] << 16) | (msg[6] << 8) | msg[7];
      if (latRaw & 0x800000) latRaw -= 0x1000000;
      const latitude = (latRaw * 180.0) / 0x800000;

      // 24-bit Longitude (2's complement)
      let lonRaw = (msg[8] << 16) | (msg[9] << 8) | msg[10];
      if (lonRaw & 0x800000) lonRaw -= 0x1000000;
      const longitude = (lonRaw * 180.0) / 0x800000;

      // 12-bit Altitude (25 ft resolution, offset -1000 ft)
      const altRaw = (msg[11] << 4) | (msg[12] >> 4);
      const altitudeFt = altRaw === 0xFFF ? 0 : (altRaw * 25) - 1000;

      // 12-bit Ground Speed
      const speedRaw = ((msg[13] & 0x0F) << 8) | msg[14];
      const groundSpeedKt = speedRaw === 0xFFF ? 0 : speedRaw;

      // 12-bit Vertical Velocity (64 fpm resolution)
      let vsRaw = (msg[15] << 4) | (msg[16] >> 4);
      if (vsRaw & 0x800) vsRaw -= 0x1000;
      const verticalSpeedFpm = vsRaw * 64;

      // 8-bit Track Heading
      const trackRaw = msg[17];
      const trackDeg = (trackRaw * 360.0) / 256.0;

      // Emitter Category
      const emitterCat = msg[18];

      // 8-byte ASCII Callsign
      let callsign = "";
      for (let c = 19; c < 27; c++) {
        if (msg[c] >= 32 && msg[c] <= 126) {
          callsign += String.fromCharCode(msg[c]);
        }
      }
      callsign = callsign.trim() || `TGT-${icaoHex.slice(-4)}`;

      return {
        type: 'TRAFFIC_REPORT',
        icaoHex,
        callsign,
        latitude,
        longitude,
        altitudeFt,
        groundSpeedKt,
        trackDeg,
        verticalSpeedFpm,
        emitterCategory: emitterCat,
        alertStatus,
        lastSeenTimestamp: Date.now()
      };
    }

    return null;
  }
}

// ============================================================================
// 1.3 ADS-B LIVE TRAFFIC ENGINE & TCAS COLLISION AVOIDANCE
// ============================================================================
function getAltitudeColor(altFt) {
  if (altFt >= 30000) return "#e040fb"; // Magenta (FL300+)
  if (altFt >= 20000) return "#2979ff"; // Blue (FL200-300)
  if (altFt >= 10000) return "#00e5ff"; // Cyan (FL100-200)
  if (altFt >= 3000) return "#00e676";  // Green (3000-10000 ft)
  return "#ffd54f";                     // Amber / Yellow (< 3000 ft)
}

const AIRCRAFT_TYPE_NAMES = {
  B789: "BOEING 787-9 Dreamliner",
  B788: "BOEING 787-8 Dreamliner",
  B78X: "BOEING 787-10 Dreamliner",
  B738: "BOEING 737-800",
  B737: "BOEING 737-700",
  B739: "BOEING 737-900",
  B38M: "BOEING 737 MAX 8",
  B77W: "BOEING 777-300ER",
  B772: "BOEING 777-200",
  B744: "BOEING 747-400",
  A320: "AIRBUS A320",
  A20N: "AIRBUS A320neo",
  A321: "AIRBUS A321",
  A21N: "AIRBUS A321neo",
  A332: "AIRBUS A330-200",
  A333: "AIRBUS A330-300",
  A359: "AIRBUS A350-900",
  A35K: "AIRBUS A350-1000",
  A388: "AIRBUS A380-800",
  DH8D: "DE HAVILLAND Dash 8-Q400",
  DH8C: "DE HAVILLAND Dash 8-Q300",
  AT76: "ATR 72-600",
  SF34: "SAAB 340B",
  E190: "EMBRAER E190",
  E75L: "EMBRAER E175",
  BE20: "BEECHCRAFT Super King Air B200",
  B350: "BEECHCRAFT King Air 350",
  BE58: "BEECHCRAFT Baron 58",
  BE36: "BEECHCRAFT Bonanza A36",
  C172: "CESSNA 172 Skyhawk",
  C182: "CESSNA 182 Skylane",
  C208: "CESSNA 208 Caravan",
  P28A: "PIPER PA-28 Archer",
  PA44: "PIPER PA-44 Seminole",
  PC12: "PILATUS PC-12",
  PC24: "PILATUS PC-24 Super Versatile Jet",
  A139: "LEONARDO AW139 Helicopter",
  EC35: "AIRBUS HELICOPTERS H135",
  BK117: "KAWASAKI/BK117 Helicopter"
};

function getCountryFromIcao(hex) {
  if (!hex) return "International 🌐";
  const h = hex.toUpperCase();
  if (h.startsWith("7C") || h.startsWith("7D")) return "Australia 🇦🇺";
  if (h.startsWith("C8")) return "New Zealand 🇳🇿";
  if (h.startsWith("A") || h.startsWith("K")) return "United States 🇺🇸";
  if (h.startsWith("40") || h.startsWith("41") || h.startsWith("42") || h.startsWith("43")) return "United Kingdom 🇬🇧";
  if (h.startsWith("38") || h.startsWith("39")) return "France 🇫🇷";
  if (h.startsWith("3C") || h.startsWith("3D")) return "Germany 🇩🇪";
  if (h.startsWith("76")) return "Singapore 🇸🇬";
  if (h.startsWith("89")) return "United Arab Emirates 🇦🇪";
  if (h.startsWith("78") || h.startsWith("79")) return "China 🇨🇳";
  if (h.startsWith("84") || h.startsWith("85") || h.startsWith("86") || h.startsWith("87")) return "Japan 🇯🇵";
  return "International 🌐";
}

function getPhotoForAircraft(typeCode, callsign) {
  const c = (callsign || "").toUpperCase();
  const t = (typeCode || "").toUpperCase();

  if (c.startsWith("ANZ") || t.includes("789")) return "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&auto=format&fit=crop&q=80";
  if (c.startsWith("QFA") || c.startsWith("QF")) return "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=500&auto=format&fit=crop&q=80";
  if (c.startsWith("VOZ") || c.startsWith("VA")) return "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?w=500&auto=format&fit=crop&q=80";
  if (c.startsWith("JST") || c.startsWith("JQ")) return "https://images.unsplash.com/photo-1542296332-2e4473faf563?w=500&auto=format&fit=crop&q=80";
  if (t.includes("380") || t.includes("388")) return "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&auto=format&fit=crop&q=80";
  if (t.includes("172") || t.includes("C172")) return "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?w=500&auto=format&fit=crop&q=80";
  if (t.includes("P28") || t.includes("PA28")) return "https://images.unsplash.com/photo-1519074069444-1ba4eae16e5e?w=500&auto=format&fit=crop&q=80";
  if (t.includes("BE20") || t.includes("B350") || t.includes("KING")) return "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=500&auto=format&fit=crop&q=80";
  if (t.includes("139") || t.includes("HELI") || t.includes("EC35") || t.includes("BK117")) return "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=500&auto=format&fit=crop&q=80";

  return "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&auto=format&fit=crop&q=80";
}

class TrafficManager {
  constructor() {
    this.targets = new Map();
    this.showTraffic = localStorage.getItem("efis_show_traffic") !== "false";
    this.altitudeFilter = localStorage.getItem("efis_traffic_filter") || "ALL"; // Default ALL to show high altitude jets like ANZ291!
    this.audioTcasEnabled = true;
    
    // Live Real-World ADS-B Feed via multi-tier fallback pipeline
    this.isLiveWebFeedActive = localStorage.getItem("efis_live_adsb") !== "false";
    this.isFetchingLiveAdsb = false;
    this.lastLiveFetchTime = 0;
    this.liveFetchIntervalMs = 4000;
    this.liveTargetCount = 0;
    this.feedSourceLabel = "Direct / Sim";

    this.lastTcasAlertTime = 0;
    this.highestThreatLevel = "NONE";
    this.highestThreatTarget = null;
    
    // Always initialize baseline realistic fleet so radar and traffic are never 0 targets
    this.initRealAirspaceFleet();
  }

  toggleLiveFeed(forcedState = null) {
    if (typeof forcedState === "boolean") {
      this.isLiveWebFeedActive = forcedState;
    } else {
      this.isLiveWebFeedActive = !this.isLiveWebFeedActive;
    }
    localStorage.setItem("efis_live_adsb", this.isLiveWebFeedActive);
    
    const liveBtn = document.getElementById("btn-map-live-feed");
    const cfgLiveBtn = document.getElementById("btn-cfg-live-feed");

    if (this.isLiveWebFeedActive) {
      const label = this.liveTargetCount > 0 
        ? `🌐 Live: ${this.liveTargetCount} AC (${this.feedSourceLabel})` 
        : `🌐 Live: ${this.targets.size} AC (Sim / Direct)`;
      if (liveBtn) {
        liveBtn.classList.add("active");
        liveBtn.textContent = label;
      }
      if (cfgLiveBtn) {
        cfgLiveBtn.classList.add("active");
        cfgLiveBtn.textContent = "ENABLED (ON)";
      }
      const lat = (typeof sim !== 'undefined' && sim) ? sim.lat : -31.8986;
      const lon = (typeof sim !== 'undefined' && sim) ? sim.lon : 152.5142;
      this.fetchLiveAdsbData(lat, lon, 250);
    } else {
      if (liveBtn) {
        liveBtn.classList.remove("active");
        liveBtn.textContent = `🌐 Web Feed: OFF (${this.targets.size} AC Sim)`;
      }
      if (cfgLiveBtn) {
        cfgLiveBtn.classList.remove("active");
        cfgLiveBtn.textContent = "DISABLED (OFF)";
      }
      if (this.targets.size === 0) {
        this.initRealAirspaceFleet();
      }
    }
    renderTrafficOnMap();
  }

  initRealAirspaceFleet() {
    this.targets.clear();
    const baseLat = (typeof sim !== 'undefined' && sim) ? sim.lat : -31.8986;
    const baseLon = (typeof sim !== 'undefined' && sim) ? sim.lon : 152.5142;

    const realFleet = [
      {
        icaoHex: "C82347", callsign: "ANZ291", registration: "ZK-NZI", country: "New Zealand 🇳🇿",
        type: "BOEING 787-9 Dreamliner", typeCode: "B789", typeDesc: "L2J (Twin Heavy Jet)",
        airline: "Air New Zealand", route: "Auckland (AKL) → Sydney (SYD)", squawk: "1057",
        latOffset: 0.35, lonOffset: -0.65, altitudeFt: 37000,
        groundSpeedKt: 555, trackDeg: 121, verticalSpeedFpm: -32,
        photoUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&auto=format&fit=crop&q=80",
        photoCaption: "Image © MH_Spotter / JetPhotos",
        rssi: -27.3, msgRate: 2.7, fmsAlt: 37000, fmsHdg: 120
      },
      {
        icaoHex: "7C6DB2", callsign: "QFA412", registration: "VH-XZM", country: "Australia 🇦🇺",
        type: "BOEING 737-838", typeCode: "B738", typeDesc: "L2J (Twin Jet)",
        airline: "Qantas", route: "Melbourne (MEL) → Sydney (SYD)", squawk: "3412",
        latOffset: 0.18, lonOffset: 0.22, altitudeFt: 31000,
        groundSpeedKt: 470, trackDeg: 35, verticalSpeedFpm: 0,
        photoUrl: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=500&auto=format&fit=crop&q=80",
        photoCaption: "Image © Bernie_SYD / Planespotters",
        rssi: -22.1, msgRate: 3.8, fmsAlt: 31000, fmsHdg: 35
      },
      {
        icaoHex: "7C789A", callsign: "VOZ820", registration: "VH-YIV", country: "Australia 🇦🇺",
        type: "BOEING 737-8FE", typeCode: "B738", typeDesc: "L2J (Twin Jet)",
        airline: "Virgin Australia", route: "Brisbane (BNE) → Sydney (SYD)", squawk: "2105",
        latOffset: 0.12, lonOffset: 0.06, altitudeFt: 4200,
        groundSpeedKt: 210, trackDeg: 160, verticalSpeedFpm: -800,
        photoUrl: "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?w=500&auto=format&fit=crop&q=80",
        photoCaption: "Image © YBBN_Spotter",
        rssi: -19.4, msgRate: 4.1, fmsAlt: 3000, fmsHdg: 160
      },
      {
        icaoHex: "7C44E1", callsign: "JST512", registration: "VH-VGF", country: "Australia 🇦🇺",
        type: "AIRBUS A320-232", typeCode: "A320", typeDesc: "L2J (Twin Jet)",
        airline: "Jetstar Airways", route: "Sydney (SYD) → Gold Coast (OOL)", squawk: "4521",
        latOffset: -0.25, lonOffset: -0.15, altitudeFt: 33000,
        groundSpeedKt: 460, trackDeg: 15, verticalSpeedFpm: 0,
        photoUrl: "https://images.unsplash.com/photo-1542296332-2e4473faf563?w=500&auto=format&fit=crop&q=80",
        photoCaption: "Image © GoldCoastAviation",
        rssi: -26.0, msgRate: 2.9, fmsAlt: 33000, fmsHdg: 15
      },
      {
        icaoHex: "7C4A11", callsign: "QFA1", registration: "VH-OQA", country: "Australia 🇦🇺",
        type: "AIRBUS A380-842", typeCode: "A388", typeDesc: "L4J (Four Quad Heavy)",
        airline: "Qantas", route: "Singapore (SIN) → Sydney (SYD)", squawk: "7012",
        latOffset: 0.48, lonOffset: -0.32, altitudeFt: 39000,
        groundSpeedKt: 520, trackDeg: 135, verticalSpeedFpm: 0,
        photoUrl: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&auto=format&fit=crop&q=80",
        photoCaption: "Image © AussieWings Aviation",
        rssi: -28.9, msgRate: 2.1, fmsAlt: 39000, fmsHdg: 135
      },
      {
        icaoHex: "7C11AA", callsign: "VH-PQQ", registration: "VH-PQQ", country: "Australia 🇦🇺",
        type: "PIPER PA-28-181 Archer III", typeCode: "P28A", typeDesc: "L1P (Single Piston)",
        airline: "Port Macquarie Flying Club", route: "Local Coastal VFR Nav", squawk: "1200",
        latOffset: 0.04, lonOffset: 0.03, altitudeFt: 3200,
        groundSpeedKt: 115, trackDeg: 45, verticalSpeedFpm: 0,
        photoUrl: "https://images.unsplash.com/photo-1519074069444-1ba4eae16e5e?w=500&auto=format&fit=crop&q=80",
        photoCaption: "Image © MidNorthCoast GA",
        rssi: -12.5, msgRate: 5.4, fmsAlt: 3500, fmsHdg: 45
      },
      {
        icaoHex: "7C22BB", callsign: "VH-OZF", registration: "VH-OZF", country: "Australia 🇦🇺",
        type: "CESSNA 172S Skyhawk SP", typeCode: "C172", typeDesc: "L1P (Single Piston)",
        airline: "Taree Aero Club / Flight Training", route: "YTRE Circuit & Training Area", squawk: "1200",
        latOffset: -0.02, lonOffset: -0.01, altitudeFt: 2500,
        groundSpeedKt: 105, trackDeg: 220, verticalSpeedFpm: 0,
        photoUrl: "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?w=500&auto=format&fit=crop&q=80",
        photoCaption: "Image © Taree Aero Club",
        rssi: -10.2, msgRate: 6.0, fmsAlt: 2500, fmsHdg: 220
      },
      {
        icaoHex: "7C55CC", callsign: "VH-TNE", registration: "VH-TNE", country: "Australia 🇦🇺",
        type: "BEECHCRAFT Super King Air B200", typeCode: "BE20", typeDesc: "L2T (Twin Turboprop)",
        airline: "NSW Air Ambulance / RFDS", route: "Tamworth (TMW) → Sydney (SYD)", squawk: "6420",
        latOffset: 0.16, lonOffset: -0.28, altitudeFt: 16000,
        groundSpeedKt: 260, trackDeg: 155, verticalSpeedFpm: -500,
        photoUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=500&auto=format&fit=crop&q=80",
        photoCaption: "Image © Aeromedical Spotters",
        rssi: -21.0, msgRate: 3.5, fmsAlt: 10000, fmsHdg: 155
      },
      {
        icaoHex: "7C3322", callsign: "HELI-01", registration: "VH-VVI", country: "Australia 🇦🇺",
        type: "LEONARDO AW139", typeCode: "A139", typeDesc: "H2T (Twin Turbine Helicopter)",
        airline: "Westpac Rescue Helicopter Service", route: "Coastal Search & Rescue Patrol", squawk: "1200",
        latOffset: -0.05, lonOffset: -0.06, altitudeFt: 1200,
        groundSpeedKt: 130, trackDeg: 350, verticalSpeedFpm: 0,
        photoUrl: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=500&auto=format&fit=crop&q=80",
        photoCaption: "Image © NSW Emergency Services",
        rssi: -14.1, msgRate: 4.8, fmsAlt: 1500, fmsHdg: 350
      },
      {
        icaoHex: "896172", callsign: "UAE414", registration: "A6-EEO", country: "United Arab Emirates 🇦🇪",
        type: "AIRBUS A380-861", typeCode: "A388", typeDesc: "L4J (Quad Heavy Jet)",
        airline: "Emirates", route: "Dubai (DXB) → Sydney (SYD)", squawk: "1234",
        latOffset: 0.55, lonOffset: -0.45, altitudeFt: 38000,
        groundSpeedKt: 510, trackDeg: 128, verticalSpeedFpm: 0,
        photoUrl: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&auto=format&fit=crop&q=80",
        photoCaption: "Image © Emirates Fleet Archive",
        rssi: -29.2, msgRate: 2.3, fmsAlt: 38000, fmsHdg: 128
      }
    ];

    realFleet.forEach(t => {
      const lat = baseLat + t.latOffset;
      const lon = baseLon + t.lonOffset;
      
      // Initialize synthetic history path
      const history = [];
      for (let step = 8; step >= 0; step--) {
        const pastDistNm = (t.groundSpeedKt / 3600.0) * (step * 20);
        const rad = t.trackDeg * Math.PI / 180.0;
        const pastLat = lat - (pastDistNm / 60.0) * Math.cos(rad);
        const pastLon = lon - (pastDistNm / (60.0 * Math.cos(lat * Math.PI / 180.0))) * Math.sin(rad);
        history.push([pastLat, pastLon]);
      }

      this.targets.set(t.icaoHex, {
        ...t,
        latitude: lat,
        longitude: lon,
        trackHistory: history,
        isRealData: false,
        lastSeenTimestamp: Date.now()
      });
    });
  }

  async fetchLiveAdsbData(ownLat, ownLon, radiusNm = 250) {
    if (this.isFetchingLiveAdsb) return;
    this.isFetchingLiveAdsb = true;

    try {
      const now = Date.now();
      let livePlanes = [];
      let feedSource = "adsb.lol";

      // Tiered Candidate Endpoints (direct, CORS-proxied, open community feeds)
      const fetchCandidates = [
        // 1. Direct adsb.lol API
        {
          name: "adsb.lol",
          url: `https://api.adsb.lol/v2/lat/${ownLat.toFixed(4)}/lon/${ownLon.toFixed(4)}/dist/${radiusNm}`,
          type: "adsb_v2"
        },
        // 2. Direct opendata.adsb.fi API
        {
          name: "adsb.fi",
          url: `https://opendata.adsb.fi/api/v2/lat/${ownLat.toFixed(4)}/lon/${ownLon.toFixed(4)}/dist/${radiusNm}`,
          type: "adsb_v2"
        },
        // 3. CORS Proxy (AllOrigins) for adsb.lol
        {
          name: "adsb.lol (CORS)",
          url: `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://api.adsb.lol/v2/lat/${ownLat.toFixed(4)}/lon/${ownLon.toFixed(4)}/dist/${radiusNm}`)}`,
          type: "adsb_v2"
        },
        // 4. CORS Proxy (CorsProxy.io) for adsb.lol
        {
          name: "adsb.lol (Proxy)",
          url: `https://corsproxy.io/?url=${encodeURIComponent(`https://api.adsb.lol/v2/lat/${ownLat.toFixed(4)}/lon/${ownLon.toFixed(4)}/dist/${radiusNm}`)}`,
          type: "adsb_v2"
        },
        // 5. OpenSky Network Public Bounding Box API
        {
          name: "OpenSky",
          url: `https://opensky-network.org/api/states/all?lamin=${(ownLat - (radiusNm/60.0)*1.2).toFixed(3)}&lomin=${(ownLon - (radiusNm/60.0)*1.2).toFixed(3)}&lamax=${(ownLat + (radiusNm/60.0)*1.2).toFixed(3)}&lomax=${(ownLon + (radiusNm/60.0)*1.2).toFixed(3)}`,
          type: "opensky"
        },
        // 6. Local Server Proxy (if running server.ps1 locally)
        {
          name: "Local Gateway",
          url: `${(typeof window !== 'undefined' && window.location && window.location.origin) ? window.location.origin : 'http://localhost:8080'}/api/adsb?lat=${ownLat.toFixed(4)}&lon=${ownLon.toFixed(4)}&dist=${radiusNm}`,
          type: "adsb_v2"
        }
      ];

      for (const candidate of fetchCandidates) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 3500);
          const resp = await fetch(candidate.url, { signal: controller.signal });
          clearTimeout(timeoutId);

          if (resp.ok) {
            const data = await resp.json();
            if (candidate.type === "adsb_v2" && data && Array.isArray(data.ac) && data.ac.length > 0) {
              feedSource = candidate.name;
              livePlanes = data.ac.filter(ac => ac.lat != null && ac.lon != null && ac.hex);
              if (livePlanes.length > 0) break;
            } else if (candidate.type === "opensky" && data && Array.isArray(data.states) && data.states.length > 0) {
              feedSource = candidate.name;
              livePlanes = data.states.map(s => ({
                hex: (s[0] || "").toUpperCase(),
                flight: (s[1] || s[0] || "").trim(),
                r: (s[0] || "").startsWith("7C") ? `VH-${(s[0] || "").slice(-3)}` : s[0],
                t: AIRCRAFT_TYPE_NAMES[(s[1] || "").slice(0, 3)] ? (s[1] || "").slice(0, 3) : "AIRCRAFT",
                country: s[2] || getCountryFromIcao(s[0]),
                lat: s[6],
                lon: s[5],
                alt_baro: (s[7] != null) ? Math.round(s[7] * 3.28084) : (s[8] ? 0 : 2500),
                gs: (s[9] != null) ? Math.round(s[9] * 1.94384) : 120,
                track: (s[10] != null) ? Math.round(s[10]) : 0,
                baro_rate: (s[11] != null) ? Math.round(s[11] * 196.85) : 0,
                squawk: s[14] || "1200",
                rssi: -22.0,
                messages: 40,
                seen: 0.5
              })).filter(p => p.lat != null && p.lon != null && p.hex);
              if (livePlanes.length > 0) break;
            }
          }
        } catch (candidateErr) {
          // Fall through to next candidate in pipeline
        }
      }

      // 4. Ingest and refresh real airspace targets
      if (livePlanes.length > 0) {
        const activeHexes = new Set();

        livePlanes.forEach(ac => {
          if (!ac.lat || !ac.lon || !ac.hex) return;
          const icao = ac.hex.toUpperCase();
          activeHexes.add(icao);

          const rawCallsign = (ac.flight || ac.r || ac.hex).trim();
          const altVal = typeof ac.alt_baro === 'number' ? ac.alt_baro : (ac.alt_baro === 'ground' ? 0 : 2500);
          const speedVal = typeof ac.gs === 'number' ? ac.gs : 0;
          const trackVal = typeof ac.track === 'number' ? ac.track : 0;
          const vsVal = typeof ac.baro_rate === 'number' ? ac.baro_rate : 0;
          const typeCode = (ac.t || "AIRCRAFT").toUpperCase();
          const typeFull = AIRCRAFT_TYPE_NAMES[typeCode] || `${typeCode} Aircraft`;
          const regVal = ac.r || (icao.startsWith("7C") ? `VH-${icao.slice(-3)}` : icao);
          const countryVal = ac.country || getCountryFromIcao(icao);

          let existing = this.targets.get(icao);
          if (!existing) {
            existing = {
              icaoHex: icao,
              trackHistory: [],
              photoUrl: getPhotoForAircraft(typeCode, rawCallsign),
              photoCaption: `Live ADS-B feed via ${feedSource}`
            };
          }

          existing.callsign = rawCallsign;
          existing.registration = regVal;
          existing.country = countryVal;
          existing.type = typeFull;
          existing.typeCode = typeCode;
          existing.typeDesc = "Airborne Traffic";
          existing.airline = rawCallsign.length >= 3 ? rawCallsign.slice(0, 3) : "Civil Aviation";
          existing.route = `Live Flight Track (${feedSource})`;
          existing.squawk = ac.squawk || "1200";
          existing.latitude = ac.lat;
          existing.longitude = ac.lon;
          existing.altitudeFt = altVal;
          existing.groundSpeedKt = speedVal;
          existing.trackDeg = trackVal;
          existing.verticalSpeedFpm = vsVal;
          existing.rssi = ac.rssi || -22.0;
          existing.msgRate = ac.messages ? Math.min(12, Math.max(1, (ac.messages / Math.max(1, ac.seen || 1)).toFixed(1))) : 3.2;
          existing.fmsAlt = ac.nav_altitude_mcp || null;
          existing.fmsHdg = ac.nav_heading || null;
          existing.isRealData = true;
          existing.lastSeenTimestamp = now;

          if (!existing.trackHistory) existing.trackHistory = [];
          existing.trackHistory.push([ac.lat, ac.lon]);
          if (existing.trackHistory.length > 50) existing.trackHistory.shift();

          this.targets.set(icao, existing);
        });

        this.liveTargetCount = activeHexes.size;
        this.feedSourceLabel = feedSource;
        this.lastLiveFetchTime = now;

        // Clean up stale non-real targets if real feed is active
        this.targets.forEach((tgt, icao) => {
          if (!tgt.isRealData && !icao.includes("THREAT")) {
            this.targets.delete(icao);
          }
        });

        // Update HUD live button with clear count and source
        const liveBtn = document.getElementById("btn-map-live-feed");
        if (liveBtn) {
          liveBtn.classList.add("active");
          liveBtn.textContent = `🌐 Live: ${this.liveTargetCount} AC (${feedSource})`;
        }
      } else {
        // Fallback simulation mode: if offline or no network aircraft returned, keep realistic local fleet
        if (this.targets.size === 0) {
          this.initRealAirspaceFleet();
        }
        this.feedSourceLabel = "Sim Fleet";
        const liveBtn = document.getElementById("btn-map-live-feed");
        if (liveBtn && this.isLiveWebFeedActive) {
          liveBtn.classList.add("active");
          liveBtn.textContent = `🌐 Live: ${this.targets.size} AC (Sim Fleet)`;
        }
      }
    } catch (e) {
      if (this.targets.size === 0) {
        this.initRealAirspaceFleet();
      }
      const liveBtn = document.getElementById("btn-map-live-feed");
      if (liveBtn && this.isLiveWebFeedActive) {
        liveBtn.classList.add("active");
        liveBtn.textContent = `🌐 Live: ${this.targets.size} AC (Sim Fleet)`;
      }
    } finally {
      this.isFetchingLiveAdsb = false;
    }
  }

  injectCollisionThreat() {
    const baseLat = (typeof sim !== 'undefined' && sim) ? sim.lat : -31.8986;
    const baseLon = (typeof sim !== 'undefined' && sim) ? sim.lon : 152.5142;
    const baseAlt = (typeof sim !== 'undefined' && sim) ? sim.altitudeFt : 3500;
    const baseTrack = (typeof sim !== 'undefined' && sim) ? sim.groundTrackDeg : 180;

    const threatTarget = {
      icaoHex: "7C9999",
      callsign: "TGT-THREAT",
      registration: "VH-TRK",
      country: "Australia 🇦🇺",
      type: "BEECHCRAFT Baron 58 (Sim Threat)",
      typeCode: "BE58",
      typeDesc: "L2P (Twin Piston)",
      airline: "General Aviation",
      route: "Cross-Country VFR",
      squawk: "7700",
      latitude: baseLat + 0.025,
      longitude: baseLon + 0.025,
      altitudeFt: Math.round(baseAlt + 300),
      groundSpeedKt: 140,
      trackDeg: (baseTrack + 180 + 10) % 360,
      verticalSpeedFpm: -100,
      photoUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=500&auto=format&fit=crop&q=80",
      photoCaption: "Simulated Collision Threat",
      rssi: -11.0,
      msgRate: 5.0,
      fmsAlt: Math.round(baseAlt + 300),
      fmsHdg: (baseTrack + 180 + 10) % 360,
      trackHistory: [[baseLat + 0.04, baseLon + 0.04], [baseLat + 0.025, baseLon + 0.025]],
      lastSeenTimestamp: Date.now()
    };
    this.targets.set(threatTarget.icaoHex, threatTarget);
    selectAircraftTarget(threatTarget.icaoHex);
  }

  update(dt, ownLat, ownLon, ownAlt, ownTrack, ownSpeed) {
    const now = Date.now();

    // Trigger live network fetch from adsb.lol if enabled
    if (this.isLiveWebFeedActive && now - this.lastLiveFetchTime > this.liveFetchIntervalMs) {
      this.lastLiveFetchTime = now;
      this.fetchLiveAdsbData(ownLat, ownLon, 250);
    }

    let maxThreat = "NONE";
    let maxThreatTarget = null;

    this.targets.forEach((tgt, icao) => {
      // Dead reckoning extrapolation between API reports
      const distTraveledNm = (tgt.groundSpeedKt / 3600.0) * dt;
      const rad = tgt.trackDeg * Math.PI / 180.0;
      tgt.latitude += (distTraveledNm / 60.0) * Math.cos(rad);
      tgt.longitude += (distTraveledNm / (60.0 * Math.cos(tgt.latitude * Math.PI / 180.0))) * Math.sin(rad);
      tgt.altitudeFt += (tgt.verticalSpeedFpm / 60.0) * dt;

      // Track history update
      if (!tgt.trackHistory) tgt.trackHistory = [];
      tgt.trackHistory.push([tgt.latitude, tgt.longitude]);
      if (tgt.trackHistory.length > 50) tgt.trackHistory.shift();

      tgt.distNm = calculateDistanceNm(ownLat, ownLon, tgt.latitude, tgt.longitude);
      tgt.bearingDeg = calculateBearingDeg(ownLat, ownLon, tgt.latitude, tgt.longitude);
      tgt.relAltFt = tgt.altitudeFt - ownAlt;

      const deltaAltAbs = Math.abs(tgt.relAltFt);
      const isAltRelevant = this.checkAltFilter(tgt.relAltFt);

      if (isAltRelevant) {
        if (tgt.distNm <= 1.5 && deltaAltAbs <= 600) {
          tgt.threatLevel = "RESOLUTION_ADVISORY";
        } else if (tgt.distNm <= 3.5 && deltaAltAbs <= 1200) {
          tgt.threatLevel = "TRAFFIC_ADVISORY";
        } else if (tgt.distNm <= 6.0 && deltaAltAbs <= 2500) {
          tgt.threatLevel = "PROXIMITY";
        } else {
          tgt.threatLevel = "NONE";
        }
      } else {
        tgt.threatLevel = "NONE";
      }

      if (tgt.threatLevel === "RESOLUTION_ADVISORY") {
        maxThreat = "RESOLUTION_ADVISORY";
        maxThreatTarget = tgt;
      } else if (tgt.threatLevel === "TRAFFIC_ADVISORY" && maxThreat !== "RESOLUTION_ADVISORY") {
        maxThreat = "TRAFFIC_ADVISORY";
        maxThreatTarget = tgt;
      } else if (tgt.threatLevel === "PROXIMITY" && maxThreat === "NONE") {
        maxThreat = "PROXIMITY";
        maxThreatTarget = tgt;
      }

      // Purge targets not seen in 180 seconds
      if (now - (tgt.lastSeenTimestamp || now) > 180000) {
        this.targets.delete(icao);
      }
    });

    this.highestThreatLevel = maxThreat;
    this.highestThreatTarget = maxThreatTarget;

    if (maxThreat === "TRAFFIC_ADVISORY" || maxThreat === "RESOLUTION_ADVISORY") {
      if (now - this.lastTcasAlertTime > 8000) {
        this.lastTcasAlertTime = now;
        this.triggerTcasAudioAlert(maxThreatTarget, ownTrack);
      }
    }

    // Update Open Aircraft Inspector if active
    if (selectedTargetHex) {
      updateAircraftInspectorPanel();
    }
  }

  checkAltFilter(relAltFt) {
    if (this.altitudeFilter === "ALL") return true;
    if (this.altitudeFilter === "NORMAL") return Math.abs(relAltFt) <= 3000;
    if (this.altitudeFilter === "ABOVE") return relAltFt >= -2700 && relAltFt <= 9000;
    if (this.altitudeFilter === "BELOW") return relAltFt >= -9000 && relAltFt <= 2700;
    return true;
  }

  triggerTcasAudioAlert(target, ownHeading) {
    if (!target) return;
    const relBrg = (target.bearingDeg - ownHeading + 360) % 360;
    let clockPos = Math.round(relBrg / 30);
    if (clockPos === 0) clockPos = 12;

    const altDiff = Math.abs(Math.round(target.relAltFt / 100) * 100);
    const posStr = target.relAltFt >= 0 ? "ABOVE" : "BELOW";
    const distStr = target.distNm.toFixed(1);

    if (typeof audioSynth !== 'undefined' && audioSynth && audioSynth.playDivertChime) {
      audioSynth.playDivertChime();
    }
    if (navigator.vibrate) { try { navigator.vibrate([200, 100, 200, 100, 300]); } catch(e) {} }

    if ('speechSynthesis' in window && this.audioTcasEnabled) {
      try {
        const msg = new SpeechSynthesisUtterance(`Traffic, Traffic, ${clockPos} o'clock, ${distStr} miles, ${altDiff} feet ${posStr}`);
        msg.rate = 1.1;
        msg.pitch = 1.0;
        window.speechSynthesis.speak(msg);
      } catch(e) {}
    }
  }
}

// ============================================================================
// 2. MADGWICK AHRS SENSOR FUSION CLASS
// ============================================================================
class MadgwickAHRS {
  constructor(beta = 0.045) {
    this.beta = beta;
    this.q0 = 1.0; this.q1 = 0.0; this.q2 = 0.0; this.q3 = 0.0;
  }

  updateMARG(gx, gy, gz, ax, ay, az, mx, my, mz, dt) {
    let q0 = this.q0, q1 = this.q1, q2 = this.q2, q3 = this.q3;

    let qDot1 = 0.5 * (-q1 * gx - q2 * gy - q3 * gz);
    let qDot2 = 0.5 * (q0 * gx + q2 * gz - q3 * gy);
    let qDot3 = 0.5 * (q0 * gy - q1 * gz + q3 * gx);
    let qDot4 = 0.5 * (q0 * gz + q1 * gy - q2 * gx);

    if (ax !== 0 || ay !== 0 || az !== 0) {
      let norm = 1.0 / Math.sqrt(ax * ax + ay * ay + az * az);
      ax *= norm; ay *= norm; az *= norm;

      let _2q0 = 2.0 * q0, _2q1 = 2.0 * q1, _2q2 = 2.0 * q2, _2q3 = 2.0 * q3;
      let _4q0 = 4.0 * q0, _4q1 = 4.0 * q1, _4q2 = 4.0 * q2;
      let _8q1 = 8.0 * q1, _8q2 = 8.0 * q2;
      let q0q0 = q0 * q0, q1q1 = q1 * q1, q2q2 = q2 * q2, q3q3 = q3 * q3;

      let s0 = _4q0 * q2q2 + _2q2 * ax + _4q0 * q1q1 - _2q1 * ay;
      let s1 = _4q1 * q3q3 - _2q3 * ax + 4.0 * q0q0 * q1 - _2q0 * ay - _4q1 + _8q1 * q1q1 + _8q1 * q2q2 + _4q1 * az;
      let s2 = 4.0 * q0q0 * q2 + _2q0 * ax + _4q2 * q3q3 - _2q3 * ay - _4q2 + _8q2 * q1q1 + _8q2 * q2q2 + _4q2 * az;
      let s3 = 4.0 * q1q1 * q3 - _2q1 * ax + 4.0 * q2q2 * q3 - _2q2 * ay;

      let sMagSq = s0 * s0 + s1 * s1 + s2 * s2 + s3 * s3;
      if (sMagSq > 0.000001) {
        let sNorm = 1.0 / Math.sqrt(sMagSq);
        qDot1 -= this.beta * s0 * sNorm;
        qDot2 -= this.beta * s1 * sNorm;
        qDot3 -= this.beta * s2 * sNorm;
        qDot4 -= this.beta * s3 * sNorm;
      }
    }

    q0 += qDot1 * dt; q1 += qDot2 * dt; q2 += qDot3 * dt; q3 += qDot4 * dt;
    let qNorm = 1.0 / Math.sqrt(q0 * q0 + q1 * q1 + q2 * q2 + q3 * q3);
    this.q0 = q0 * qNorm; this.q1 = q1 * qNorm; this.q2 = q2 * qNorm; this.q3 = q3 * qNorm;
  }

  getEuler() {
    const q0 = this.q0, q1 = this.q1, q2 = this.q2, q3 = this.q3;
    const roll = Math.atan2(2 * (q0 * q1 + q2 * q3), 1 - 2 * (q1 * q1 + q2 * q2)) * 180 / Math.PI;
    const pitch = Math.asin(Math.max(-1, Math.min(1, 2 * (q0 * q2 - q3 * q1)))) * 180 / Math.PI;
    const yaw = Math.atan2(2 * (q0 * q3 + q1 * q2), 1 - 2 * (q2 * q2 + q3 * q3)) * 180 / Math.PI;
    return { pitch, roll, yaw: (yaw + 360) % 360 };
  }
}

// ============================================================================
// 3. FLIGHT SIMULATION & AERODYNAMICS WITH BUGS & TURN RATE
// ============================================================================
class FlightSimEngine {
  constructor() {
    this.lat = userHomeAirport.lat;
    this.lon = userHomeAirport.lon;
    this.destLat = -31.4358; // Port Macquarie
    this.destLon = 152.8631;
    this.destIdent = "YPMQ";

    this.altitudeFt = 3500;
    this.airspeedKt = 104;
    this.headingDeg = 163;
    this.groundTrackDeg = 163;
    this.pitchDeg = 0.5;
    this.rollDeg = -6.5;
    this.targetPitchDeg = 0.0;
    this.targetRollDeg = -6.0;
    this.turnRateDegPerSec = 0.0;
    this.verticalSpeedFpm = 0;
    this.throttlePct = 0.72;
    this.rudderInput = 0.0;
    this.gForceZ = 1.0;
    this.minG = 1.0;
    this.maxG = 1.0;
    this.qnhHpa = 1013.25;
    this.isAutopilot = true;
    this.turbulenceLevel = 0.08;

    // Garmin Autopilot Bugs
    this.selectedHeadingBug = 90;    // HDG 090°
    this.selectedAltitudeBug = 3500; // ALT 3500
    this.selectedSpeedBug = 110;     // SPD 110
    this.selectedCourseBug = 250;    // CRS 250°
    this.targetVsFpm = 600;          // VS 600

    const savedPitchOffset = localStorage.getItem("efis_pitch_offset");
    const savedRollOffset = localStorage.getItem("efis_roll_offset");
    this.pitchOffset = (savedPitchOffset !== null && !isNaN(parseFloat(savedPitchOffset))) ? parseFloat(savedPitchOffset) : 0.0;
    this.rollOffset = (savedRollOffset !== null && !isNaN(parseFloat(savedRollOffset))) ? parseFloat(savedRollOffset) : 0.0;
    this.isEmergencyDivert = false;

    // Flight route waypoints starting from Home Base
    this.routeWaypoints = [
      { id: userHomeAirport.icao, name: userHomeAirport.name, lat: userHomeAirport.lat, lon: userHomeAirport.lon },
      { id: "CROWDY", name: "Crowdy Head Fix", lat: -31.8417, lon: 152.7533 },
      { id: "CAMDEN-HVN", name: "Camden Haven Overfly", lat: -31.6367, lon: 152.8250 },
      { id: "YPMQ", name: "Port Macquarie Airport", lat: -31.4358, lon: 152.8631 }
    ];
  }

  update(dt) {
    if (this.isAutopilot) {
      const targetBrg = calculateBearingDeg(this.lat, this.lon, this.destLat, this.destLon);
      let hdgErr = (targetBrg - this.headingDeg + 540) % 360 - 180;
      this.targetRollDeg = Math.max(-22, Math.min(22, hdgErr * 1.3));
    }

    this.rollDeg += (this.targetRollDeg - this.rollDeg) * 3.0 * dt;

    const speedMps = Math.max(this.airspeedKt * 0.514444, 15);
    const turnRateRad = (9.80665 * Math.tan(this.rollDeg * Math.PI / 180)) / speedMps;
    this.turnRateDegPerSec = turnRateRad * 180 / Math.PI;
    this.headingDeg = (this.headingDeg + this.turnRateDegPerSec * dt + 360) % 360;

    this.pitchDeg += (this.targetPitchDeg - this.pitchDeg) * 2.0 * dt;
    this.verticalSpeedFpm = Math.sin((this.pitchDeg) * Math.PI / 180) * this.airspeedKt * 101.268;
    this.altitudeFt += (this.verticalSpeedFpm / 60.0) * dt;

    const turbRoll = (Math.random() - 0.5) * 1.0 * this.turbulenceLevel;
    const turbPitch = (Math.random() - 0.5) * 0.5 * this.turbulenceLevel;

    const bankRad = (this.rollDeg + turbRoll) * Math.PI / 180;
    this.gForceZ = Math.max(0.2, (1.0 / Math.max(0.1, Math.cos(bankRad))) + (turbPitch * 0.2));
    if (this.gForceZ < this.minG) this.minG = this.gForceZ;
    if (this.gForceZ > this.maxG) this.maxG = this.gForceZ;

    this.airspeedKt = (55 + this.throttlePct * 115) - Math.max(-30, Math.min(50, this.pitchDeg * 2.5));
    this.groundSpeedKt = this.airspeedKt + 4.0;
    this.groundTrackDeg = (this.headingDeg + 1.5 + 360) % 360;

    const distMovedNm = this.groundSpeedKt * (dt / 3600);
    const trkRad = this.groundTrackDeg * Math.PI / 180;
    this.lat += (distMovedNm * Math.cos(trkRad)) / 60.0;
    this.lon += (distMovedNm * Math.sin(trkRad)) / (60.0 * Math.cos(this.lat * Math.PI / 180));

    const distToDest = calculateDistanceNm(this.lat, this.lon, this.destLat, this.destLon);
    const brgToDest = calculateBearingDeg(this.lat, this.lon, this.destLat, this.destLon);

    const angleDiff = (brgToDest - this.groundTrackDeg) * Math.PI / 180;
    const xtkNm = Math.sin(angleDiff) * distToDest;

    // Lateral Slip / Skid (Inclinometer Ball Displacement)
    const slipSkidVal = (this.rudderInput - (this.turnRateDegPerSec / 20.0) * 0.15);

    return {
      pitch: this.pitchDeg + turbPitch - this.pitchOffset,
      roll: this.rollDeg + turbRoll - this.rollOffset,
      heading: this.headingDeg,
      groundTrack: this.groundTrackDeg,
      turnRateDegPerSec: this.turnRateDegPerSec,
      indicatedAirspeed: this.airspeedKt,
      trueAirspeed: this.airspeedKt + 5.0,
      groundSpeed: this.groundSpeedKt,
      indicatedAltitude: this.altitudeFt,
      verticalSpeed: this.verticalSpeedFpm,
      gForceZ: this.gForceZ,
      gForceMin: this.minG,
      gForceMax: this.maxG,
      slipSkid: slipSkidVal,
      latitude: this.lat,
      longitude: this.lon,
      destIdent: this.destIdent,
      destLat: this.destLat,
      destLon: this.destLon,
      destDistanceNm: distToDest,
      destBearingDeg: brgToDest,
      xtkNm: xtkNm,
      selectedHeadingBug: this.selectedHeadingBug,
      selectedAltitudeBug: this.selectedAltitudeBug,
      selectedSpeedBug: this.selectedSpeedBug,
      selectedCourseBug: this.selectedCourseBug,
      targetVsFpm: this.targetVsFpm,
      qnhHpa: this.qnhHpa,
      isStall: this.airspeedKt <= currentProfile.vS,
      isOverspeed: this.airspeedKt >= currentProfile.vNe
    };
  }
}

// ============================================================================
// 3.4 ADVANCED AHRS SENSOR FUSION, ADAPTIVE EMA & NOISE DEADBAND FILTER
// ============================================================================
const AHRS_DAMPING_PRESETS = [
  { id: "responsive", label: "RESPONSIVE (Agile)", alpha: 0.35, deadband: 0.03, uiDamp: 0.35 },
  { id: "balanced",   label: "BALANCED (Smooth)",  alpha: 0.20, deadband: 0.06, uiDamp: 0.22 },
  { id: "damped",     label: "ULTRA-SMOOTH (Damped)", alpha: 0.12, deadband: 0.12, uiDamp: 0.15 }
];

class AhrsSensorFilter {
  constructor() {
    const savedId = localStorage.getItem("efis_ahrs_damping_preset") || "balanced";
    this.presetIndex = AHRS_DAMPING_PRESETS.findIndex(p => p.id === savedId);
    if (this.presetIndex === -1) this.presetIndex = 1;

    this.pitch = 0.0;
    this.roll = 0.0;
    this.heading = 160.0;
    this.gForce = 1.0;
    this.hasInit = false;
  }

  get currentPreset() {
    return AHRS_DAMPING_PRESETS[this.presetIndex];
  }

  cyclePreset() {
    this.presetIndex = (this.presetIndex + 1) % AHRS_DAMPING_PRESETS.length;
    localStorage.setItem("efis_ahrs_damping_preset", this.currentPreset.id);
    if (typeof uiInterpolator !== 'undefined' && uiInterpolator) {
      uiInterpolator.dampFactor = this.currentPreset.uiDamp;
    }
    this.updateUI();
    return this.currentPreset;
  }

  updateUI() {
    const labelCal = document.getElementById("cal-filter-preset-label");
    const btnCal = document.getElementById("btn-cal-ahrs-damping");
    const btnCfg = document.getElementById("btn-cfg-ahrs-damping");

    const p = this.currentPreset;
    if (labelCal) labelCal.textContent = `${p.label} (α=${p.alpha.toFixed(2)}, Deadband=${p.deadband.toFixed(2)}°)`;
    if (btnCal) btnCal.textContent = `FILTER PRESET: ${p.label}`;
    if (btnCfg) btnCfg.textContent = p.label;
  }

  filterPitch(rawPitch, dt = 0.016) {
    if (!this.hasInit) {
      this.pitch = rawPitch;
      return this.pitch;
    }
    const diff = rawPitch - this.pitch;
    if (Math.abs(diff) < this.currentPreset.deadband) {
      return this.pitch;
    }
    const rate = Math.abs(diff) / Math.max(0.001, dt);
    const effAlpha = rate > 3.0 ? Math.min(0.65, this.currentPreset.alpha * 2.2) : this.currentPreset.alpha;
    this.pitch += diff * effAlpha;
    return this.pitch;
  }

  filterRoll(rawRoll, dt = 0.016) {
    if (!this.hasInit) {
      this.roll = rawRoll;
      return this.roll;
    }
    const diff = rawRoll - this.roll;
    if (Math.abs(diff) < this.currentPreset.deadband) {
      return this.roll;
    }
    const rate = Math.abs(diff) / Math.max(0.001, dt);
    const effAlpha = rate > 3.0 ? Math.min(0.65, this.currentPreset.alpha * 2.2) : this.currentPreset.alpha;
    this.roll += diff * effAlpha;
    return this.roll;
  }

  filterHeading(rawHeading, dt = 0.016) {
    if (!this.hasInit) {
      this.heading = rawHeading;
      return this.heading;
    }
    let diff = (rawHeading - this.heading + 540) % 360 - 180;
    if (Math.abs(diff) < (this.currentPreset.deadband * 1.5)) {
      return this.heading;
    }
    const rate = Math.abs(diff) / Math.max(0.001, dt);
    const effAlpha = rate > 4.0 ? Math.min(0.60, this.currentPreset.alpha * 2.0) : (this.currentPreset.alpha * 0.85);
    this.heading = (this.heading + diff * effAlpha + 360) % 360;
    return this.heading;
  }

  filterGForce(rawG) {
    if (!this.hasInit) {
      this.gForce = rawG;
      this.hasInit = true;
      return this.gForce;
    }
    const diff = rawG - this.gForce;
    if (Math.abs(diff) < 0.02) return this.gForce;
    this.gForce += diff * 0.25;
    return this.gForce;
  }

  reset() {
    this.hasInit = false;
  }
}

const ahrsFilter = new AhrsSensorFilter();

// ============================================================================
// 3.5 REAL MOBILE DEVICE HARDWARE SENSORS (GPS & AHRS GYRO BRIDGE)
// ============================================================================
class DeviceSensorBridge {
  constructor() {
    this.useLiveSensors = localStorage.getItem("efis_use_live_sensors") === "true";
    this.hasGpsFix = false;
    this.hasAhrsFix = false;
    this.gpsWatchId = null;

    this.liveLat = -31.8986;
    this.liveLon = 152.5142;
    this.liveAltFt = 3500;
    this.liveSpeedKt = 110;
    this.liveTrackDeg = 160;
    this.livePitchDeg = 0;
    this.liveRollDeg = 0;
    this.liveHeadingDeg = 160;
    this.liveGForce = 1.0;
    this.liveVsFpm = 0;
    this.lastAlt = 3500;
    this.lastAltTime = Date.now();

    this.currentScreenAngle = 0;
    this.boundOrientationHandler = null;
    this.boundMotionHandler = null;

    if (this.useLiveSensors) {
      setTimeout(() => this.enableLiveSensors(), 500);
    }
  }

  getScreenOrientationAngle() {
    if (typeof window === 'undefined') return 0;
    if (window.screen && window.screen.orientation && typeof window.screen.orientation.angle === 'number') {
      return window.screen.orientation.angle;
    }
    if (typeof window.orientation === 'number') {
      return ((window.orientation % 360) + 360) % 360;
    }
    // Check if the application or CSS viewport is in landscape
    if (typeof currentOrientationIndex !== 'undefined' && typeof ORIENTATION_MODES !== 'undefined' && ORIENTATION_MODES[currentOrientationIndex]) {
      const modeId = ORIENTATION_MODES[currentOrientationIndex].id;
      if (modeId.includes("landscape")) return 90;
      if (modeId.includes("portrait")) return 0;
    }
    return (window.innerWidth > window.innerHeight) ? 90 : 0;
  }

  transformDeviceOrientationToAttitude(alpha, beta, gamma) {
    const angle = this.getScreenOrientationAngle();
    this.currentScreenAngle = angle;

    let rawPitch = 0;
    let rawRoll = 0;
    let rawHdg = (alpha !== null && !isNaN(alpha)) ? (360 - alpha) % 360 : 0;

    const b = (beta !== null && !isNaN(beta)) ? beta : 0;
    const g = (gamma !== null && !isNaN(gamma)) ? gamma : 0;

    // Transform physical device gyroscope axes to match current screen viewport orientation
    switch (angle) {
      case 90:
        // Landscape Primary (Phone rotated 90deg counter-clockwise, top of phone to left)
        rawPitch = -g;
        rawRoll = -b;
        rawHdg = (rawHdg + 90 + 360) % 360;
        break;

      case 270:
        // Landscape Secondary (Phone rotated 90deg clockwise, top of phone to right)
        rawPitch = g;
        rawRoll = b;
        rawHdg = (rawHdg + 270 + 360) % 360;
        break;

      case 180:
        // Portrait Inverted (Upside down)
        rawPitch = -b;
        rawRoll = -g;
        rawHdg = (rawHdg + 180 + 360) % 360;
        break;

      case 0:
      default:
        // Portrait Primary (Standard upright portrait)
        rawPitch = b;
        rawRoll = g;
        break;
    }

    // Clamp within aviation flight display limits
    rawPitch = Math.max(-60, Math.min(60, rawPitch));
    rawRoll = Math.max(-85, Math.min(85, rawRoll));

    return { rawPitch, rawRoll, rawHdg, angle };
  }

  handleOrientationChange() {
    this.currentScreenAngle = this.getScreenOrientationAngle();
    if (typeof ahrsFilter !== 'undefined' && ahrsFilter) {
      ahrsFilter.reset();
    }
    this.updateUiStatus();
  }

  enableLiveSensors() {
    this.useLiveSensors = true;
    localStorage.setItem("efis_use_live_sensors", "true");

    // 1. Geolocation (Real GPS)
    if ("geolocation" in navigator) {
      this.gpsWatchId = navigator.geolocation.watchPosition(
        (pos) => {
          this.hasGpsFix = true;
          this.liveLat = pos.coords.latitude;
          this.liveLon = pos.coords.longitude;
          sim.lat = this.liveLat;
          sim.lon = this.liveLon;

          if (pos.coords.altitude !== null && pos.coords.altitude !== undefined) {
            const newAltFt = pos.coords.altitude * 3.28084;
            const now = Date.now();
            const dtMin = (now - this.lastAltTime) / 60000;
            if (dtMin > 0.01) {
              this.liveVsFpm = (newAltFt - this.lastAlt) / dtMin;
              this.lastAlt = newAltFt;
              this.lastAltTime = now;
            }
            this.liveAltFt = newAltFt;
            sim.altitudeFt = newAltFt;
          }
          if (pos.coords.speed !== null && pos.coords.speed !== undefined && !isNaN(pos.coords.speed)) {
            this.liveSpeedKt = pos.coords.speed * 1.94384;
            sim.airspeedKt = this.liveSpeedKt;
            sim.groundSpeedKt = this.liveSpeedKt;
          }
          if (pos.coords.heading !== null && pos.coords.heading !== undefined && !isNaN(pos.coords.heading)) {
            this.liveTrackDeg = pos.coords.heading;
            this.liveHeadingDeg = pos.coords.heading;
            sim.headingDeg = this.liveHeadingDeg;
            sim.groundTrackDeg = this.liveTrackDeg;
          }
          this.updateUiStatus();
        },
        (err) => {
          console.warn("GPS Warning:", err.message);
          this.hasGpsFix = false;
          this.updateUiStatus();
        },
        { enableHighAccuracy: true, maximumAge: 1000, timeout: 10000 }
      );
    }

    // 2. DeviceOrientation (Real Gyro Attitude / Pitch & Roll with Dynamic Screen Rotation)
    if (window.DeviceOrientationEvent) {
      this.boundOrientationHandler = (e) => {
        if (e.beta !== null && e.gamma !== null) {
          this.hasAhrsFix = true;
          const { rawPitch, rawRoll, rawHdg } = this.transformDeviceOrientationToAttitude(e.alpha, e.beta, e.gamma);

          this.livePitchDeg = ahrsFilter.filterPitch(rawPitch);
          this.liveRollDeg = ahrsFilter.filterRoll(rawRoll);
          sim.pitchDeg = this.livePitchDeg;
          sim.rollDeg = this.liveRollDeg;

          if (e.alpha !== null && !isNaN(e.alpha)) {
            this.liveHeadingDeg = ahrsFilter.filterHeading(rawHdg);
            if (!this.hasGpsFix) sim.headingDeg = this.liveHeadingDeg;
          }
          this.updateUiStatus();
        }
      };
      window.addEventListener("deviceorientation", this.boundOrientationHandler, true);
    }

    // 3. DeviceMotion (Real Accelerometer G-Force with Jitter Filter)
    if (window.DeviceMotionEvent) {
      this.boundMotionHandler = (e) => {
        if (e.accelerationIncludingGravity && e.accelerationIncludingGravity.z !== null) {
          const rawG = Math.abs(e.accelerationIncludingGravity.z) / 9.80665;
          this.liveGForce = ahrsFilter.filterGForce(Math.max(0.2, Math.min(6.0, rawG)));
          sim.gForceZ = this.liveGForce;
        }
      };
      window.addEventListener("devicemotion", this.boundMotionHandler, true);
    }

    // Listen to physical screen orientation change events
    window.addEventListener("orientationchange", () => this.handleOrientationChange());
    if (window.screen && window.screen.orientation) {
      window.screen.orientation.addEventListener("change", () => this.handleOrientationChange());
    }

    this.updateUiStatus();
  }

  disableLiveSensors() {
    this.useLiveSensors = false;
    localStorage.setItem("efis_use_live_sensors", "false");
    if (this.gpsWatchId !== null && "geolocation" in navigator) {
      navigator.geolocation.clearWatch(this.gpsWatchId);
      this.gpsWatchId = null;
    }
    if (this.boundOrientationHandler) {
      window.removeEventListener("deviceorientation", this.boundOrientationHandler, true);
      this.boundOrientationHandler = null;
    }
    if (this.boundMotionHandler) {
      window.removeEventListener("devicemotion", this.boundMotionHandler, true);
      this.boundMotionHandler = null;
    }
    this.hasGpsFix = false;
    this.hasAhrsFix = false;
    this.updateUiStatus();
  }

  toggle() {
    if (this.useLiveSensors) {
      this.disableLiveSensors();
    } else {
      this.enableLiveSensors();
    }
  }

  updateUiStatus() {
    const label = document.getElementById("sensor-source-label");
    const btn = document.getElementById("btn-toggle-sensor-source");
    const gpsCoords = document.getElementById("sensor-gps-coords");
    const ahrsReadout = document.getElementById("sensor-ahrs-readout");
    const gpsStatus = document.getElementById("gps-status");
    const ahrsStatus = document.getElementById("ahrs-status");

    const screenAngle = this.getScreenOrientationAngle();
    const orientLabel = (screenAngle === 90 || screenAngle === 270) ? `LANDSCAPE (${screenAngle}°)` : `PORTRAIT (${screenAngle}°)`;

    if (this.useLiveSensors) {
      if (label) {
        label.textContent = `LIVE PHONE SENSORS [${orientLabel}]`;
        label.style.color = "#00e676";
      }
      if (btn) {
        btn.textContent = "🔄 SWITCH TO VIRTUAL SIMULATOR";
        btn.className = "btn-yellow";
      }
      if (gpsCoords) gpsCoords.textContent = `${this.liveLat.toFixed(4)}°, ${this.liveLon.toFixed(4)}° (${this.hasGpsFix ? '3D FIX' : 'ACQUIRING...'})`;
      if (ahrsReadout) ahrsReadout.textContent = `Pitch ${this.livePitchDeg.toFixed(1)}° | Roll ${this.liveRollDeg.toFixed(1)}° (${this.hasAhrsFix ? `ACTIVE 60Hz - ${orientLabel}` : 'STANDBY'})`;
      if (gpsStatus) {
        gpsStatus.innerHTML = `<span class="dot"></span> ${this.hasGpsFix ? 'GPS LIVE (3D)' : 'GPS ACQUIRING'}`;
        gpsStatus.className = `status-indicator ${this.hasGpsFix ? 'live' : 'warn'}`;
      }
      if (ahrsStatus) {
        ahrsStatus.textContent = this.hasAhrsFix ? `AHRS ${orientLabel} 60Hz` : 'AHRS STANDBY';
        ahrsStatus.className = `status-indicator ${this.hasAhrsFix ? 'live' : 'ok'}`;
      }
    } else {
      if (label) {
        label.textContent = "VIRTUAL SIMULATOR";
        label.style.color = "#00e5ff";
      }
      if (btn) {
        btn.textContent = "🔄 SWITCH TO LIVE PHONE SENSORS (GPS + AHRS)";
        btn.className = "btn-green";
      }
      if (gpsCoords) gpsCoords.textContent = `${sim.lat.toFixed(4)}°, ${sim.lon.toFixed(4)}° (SIMULATED)`;
      if (ahrsReadout) ahrsReadout.textContent = `Pitch ${sim.pitchDeg.toFixed(1)}° | Roll ${sim.rollDeg.toFixed(1)}° (SIMULATED)`;
      if (gpsStatus) {
        gpsStatus.innerHTML = '<span class="dot"></span> GPS 3D';
        gpsStatus.className = "status-indicator live";
      }
      if (ahrsStatus) {
        ahrsStatus.textContent = "AHRS 60Hz";
        ahrsStatus.className = "status-indicator ok";
      }
    }
  }
}

// ============================================================================
// 3.6 UI TELEMETRY INTERPOLATOR & 60 FPS RENDER DECOUPLING ENGINE
// ============================================================================
class UiTelemetryInterpolator {
  constructor() {
    this.display = {
      pitch: 0,
      roll: 0,
      heading: 160,
      groundTrack: 160,
      slipSkid: 0,
      indicatedAirspeed: 110,
      trueAirspeed: 115,
      groundSpeed: 114,
      indicatedAltitude: 3500,
      verticalSpeed: 0,
      gForceZ: 1.0,
      turnRateDegPerSec: 0
    };
    this.dampFactor = ahrsFilter.currentPreset.uiDamp || 0.22;
    this.hasInitialized = false;
  }

  update(targetTel, dt) {
    if (!this.hasInitialized) {
      this.display.pitch = targetTel.pitch;
      this.display.roll = targetTel.roll;
      this.display.heading = targetTel.heading;
      this.display.groundTrack = targetTel.groundTrack;
      this.display.slipSkid = targetTel.slipSkid;
      this.display.indicatedAirspeed = targetTel.indicatedAirspeed;
      this.display.trueAirspeed = targetTel.trueAirspeed;
      this.display.groundSpeed = targetTel.groundSpeed;
      this.display.indicatedAltitude = targetTel.indicatedAltitude;
      this.display.verticalSpeed = targetTel.verticalSpeed;
      this.display.gForceZ = targetTel.gForceZ;
      this.display.turnRateDegPerSec = targetTel.turnRateDegPerSec;
      this.hasInitialized = true;
      return targetTel;
    }

    // Dynamic framerate-independent factor
    const factor = Math.min(1.0, 1.0 - Math.pow(1.0 - this.dampFactor, Math.min(0.1, dt) * 60));

    // Linear LERP for continuous scalar variables
    this.display.pitch += (targetTel.pitch - this.display.pitch) * factor;
    this.display.roll += (targetTel.roll - this.display.roll) * factor;
    this.display.slipSkid += (targetTel.slipSkid - this.display.slipSkid) * factor;
    this.display.indicatedAirspeed += (targetTel.indicatedAirspeed - this.display.indicatedAirspeed) * factor;
    this.display.trueAirspeed += (targetTel.trueAirspeed - this.display.trueAirspeed) * factor;
    this.display.groundSpeed += (targetTel.groundSpeed - this.display.groundSpeed) * factor;
    this.display.indicatedAltitude += (targetTel.indicatedAltitude - this.display.indicatedAltitude) * factor;
    this.display.verticalSpeed += (targetTel.verticalSpeed - this.display.verticalSpeed) * factor;
    this.display.gForceZ += (targetTel.gForceZ - this.display.gForceZ) * factor;
    this.display.turnRateDegPerSec += (targetTel.turnRateDegPerSec - this.display.turnRateDegPerSec) * factor;

    // Shortest-Arc Angular LERP for Heading & Track
    let hdgDiff = (targetTel.heading - this.display.heading + 540) % 360 - 180;
    this.display.heading = (this.display.heading + hdgDiff * factor + 360) % 360;

    let trkDiff = (targetTel.groundTrack - this.display.groundTrack + 540) % 360 - 180;
    this.display.groundTrack = (this.display.groundTrack + trkDiff * factor + 360) % 360;

    return {
      ...targetTel,
      pitch: this.display.pitch,
      roll: this.display.roll,
      heading: this.display.heading,
      groundTrack: this.display.groundTrack,
      slipSkid: this.display.slipSkid,
      indicatedAirspeed: this.display.indicatedAirspeed,
      trueAirspeed: this.display.trueAirspeed,
      groundSpeed: this.display.groundSpeed,
      indicatedAltitude: this.display.indicatedAltitude,
      verticalSpeed: this.display.verticalSpeed,
      gForceZ: this.display.gForceZ,
      turnRateDegPerSec: this.display.turnRateDegPerSec
    };
  }
}

const uiInterpolator = new UiTelemetryInterpolator();
const deviceSensors = new DeviceSensorBridge();
const sim = new FlightSimEngine();

// ============================================================================
// 4. RECORDER & AUDIO
// ============================================================================
class CockpitAudioSynthesizer {
  constructor() { this.ctx = null; this.isStallActive = false; }
  init() {
    if (!this.ctx) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();
      } catch (e) {}
    }
  }
  playDivertChime() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.4);
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.4);
    } catch(e) {}
  }
  startStallHorn() {
    if (this.isStallActive) return;
    try {
      this.init();
      if (!this.ctx) return;
      this.isStallActive = true;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      this.osc = osc;
      this.gain = gain;
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(520, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
    } catch(e) {}
  }
  stopStallHorn() {
    if (!this.isStallActive) return;
    this.isStallActive = false;
    try { this.osc.stop(); this.osc.disconnect(); } catch(e) {}
  }
}
const audioSynth = new CockpitAudioSynthesizer();
const trafficMgr = new TrafficManager();
if (typeof window !== 'undefined') {
  window.trafficMgr = trafficMgr;
  window.sim = sim;
}

class FlightRecorder {
  constructor() { this.isRecording = false; this.recordedSamples = []; this.durationSec = 0; }
  start() { this.isRecording = true; this.recordedSamples = []; this.durationSec = 0; }
  stop() { this.isRecording = false; }
  record(tel) {
    if (!this.isRecording) return;
    this.recordedSamples.push({
      time: Date.now(), lat: tel.latitude, lon: tel.longitude,
      alt: tel.indicatedAltitude, speed: tel.groundSpeed,
      pitch: tel.pitch, roll: tel.roll, hdg: tel.heading
    });
  }
  exportGPX() {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<gpx version="1.1" creator="AviationEFIS">\n  <trk><trkseg>\n`;
    for (const s of this.recordedSamples) {
      xml += `    <trkpt lat="${s.lat.toFixed(6)}" lon="${s.lon.toFixed(6)}"><ele>${(s.alt * 0.3048).toFixed(1)}</ele><time>${new Date(s.time).toISOString()}</time></trkpt>\n`;
    }
    return xml + `  </trkseg></trk>\n</gpx>`;
  }
  exportKML() {
    let kml = `<?xml version="1.0" encoding="UTF-8"?>\n<kml xmlns="http://www.opengis.net/kml/2.2"><Document><Placemark><LineString><extrude>1</extrude><altitudeMode>absolute</altitudeMode><coordinates>\n`;
    for (const s of this.recordedSamples) {
      kml += `      ${s.lon.toFixed(6)},${s.lat.toFixed(6)},${(s.alt * 0.3048).toFixed(1)}\n`;
    }
    return kml + `    </coordinates></LineString></Placemark></Document></kml>`;
  }
  exportCSV() {
    let csv = "Timestamp,Latitude,Longitude,AltitudeFt,GroundSpeedKt,Pitch,Roll,Heading\n";
    for (const s of this.recordedSamples) {
      csv += `${new Date(s.time).toISOString()},${s.lat.toFixed(6)},${s.lon.toFixed(6)},${s.alt.toFixed(1)},${s.speed.toFixed(1)},${s.pitch.toFixed(2)},${s.roll.toFixed(2)},${s.hdg.toFixed(1)}\n`;
    }
    return csv;
  }
}
const recorder = new FlightRecorder();

// Polyfill CanvasRenderingContext2D.roundRect if missing
if (typeof CanvasRenderingContext2D !== 'undefined' && !CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, radii) {
    if (!radii) radii = 0;
    let r = typeof radii === 'number' ? radii : (Array.isArray(radii) ? radii[0] : 0);
    r = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
    this.beginPath();
    this.moveTo(x + r, y);
    this.arcTo(x + w, y, x + w, y + h, r);
    this.arcTo(x + w, y + h, x, y + h, r);
    this.arcTo(x, y + h, x, y, r);
    this.arcTo(x, y, x + w, y, r);
    this.closePath();
    return this;
  };
}

// ============================================================================
// 5. MASTER PFD WITH SYNTHETIC VISION, MAP BACKDROP & TURN COORDINATOR
// ============================================================================
const canvasPfdMaster = document.getElementById("canvas-pfd-master");
const canvasHsiMaster = document.getElementById("canvas-hsi-master");
const canvasChart = document.getElementById("canvas-telemetry-chart");

function ensureCanvasDimensions(canvas) {
  if (!canvas) return false;
  const parent = canvas.parentElement;
  const rect = parent ? parent.getBoundingClientRect() : { width: window.innerWidth, height: window.innerHeight / 2 };
  const dpr = window.devicePixelRatio || 1;
  const targetW = Math.max(50, Math.floor((rect.width || 400) * dpr));
  const targetH = Math.max(50, Math.floor((rect.height || 300) * dpr));
  if (canvas.width !== targetW || canvas.height !== targetH) {
    canvas.width = targetW;
    canvas.height = targetH;
  }
  return true;
}

function resizeCanvases() {
  ensureCanvasDimensions(canvasPfdMaster);
  ensureCanvasDimensions(canvasHsiMaster);
  ensureCanvasDimensions(canvasChart);
  if (leafletMap) {
    try { leafletMap.invalidateSize(); } catch(e) {}
  }
}
window.addEventListener("resize", resizeCanvases);
window.addEventListener("DOMContentLoaded", resizeCanvases);

// --- 5.1 TURN COORDINATOR & INCLINOMETER GAUGE DRAWING ---
function renderTurnCoordinator(ctx, tel, cx, cy, scale = 1.15) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);

  // Background Capsule Card with high-contrast aviation bezel
  ctx.fillStyle = "rgba(10, 14, 23, 0.92)";
  ctx.strokeStyle = "#374151";
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.roundRect(-78, -46, 156, 92, 10);
  ctx.fill();
  ctx.stroke();

  // 1. Level Reference Marks (- -)
  const levelY = -18;
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 4.0;
  ctx.beginPath();
  // Left level tick
  ctx.moveTo(-62, levelY); ctx.lineTo(-40, levelY);
  // Right level tick
  ctx.moveTo(40, levelY); ctx.lineTo(62, levelY);
  ctx.stroke();

  // 2. Standard Rate Turn Index Ticks (\  /)
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  // Left standard rate turn tick
  ctx.moveTo(-56, -4); ctx.lineTo(-40, 2);
  // Right standard rate turn tick
  ctx.moveTo(56, -4); ctx.lineTo(40, 2);
  ctx.stroke();

  // 3. Rotating Miniature Airplane Silhouette (Bigger & Crisp)
  // Bank angle proportional to Rate of Turn (deg/sec)
  const airplaneBankDeg = Math.max(-30, Math.min(30, (tel.turnRateDegPerSec / 3.0) * 18.0));
  ctx.save();
  ctx.translate(0, levelY);
  ctx.rotate(airplaneBankDeg * Math.PI / 180);

  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 1.2;

  // Enlarged Airplane Body & Wings
  ctx.beginPath();
  // Vertical Stabilizer / Rudder
  ctx.moveTo(0, -12); ctx.lineTo(2.2, -12); ctx.lineTo(2.2, -3); ctx.lineTo(5.5, 0);
  // Right Wing
  ctx.lineTo(34, 1.8); ctx.lineTo(34, 5.5); ctx.lineTo(4, 5.5);
  // Fuselage Lower Contour
  ctx.lineTo(0, 7); ctx.lineTo(-4, 5.5);
  // Left Wing
  ctx.lineTo(-34, 5.5); ctx.lineTo(-34, 1.8); ctx.lineTo(-5.5, 0); ctx.lineTo(-2.2, -3); ctx.lineTo(-2.2, -12);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Center Fuselage Hub
  ctx.beginPath();
  ctx.arc(0, 2, 4.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.restore();

  // 4. Enlarged Inclinometer Glass Tube & Slip/Skid Ball ("Step on the Ball")
  const tubeW = 76, tubeH = 18;
  const tubeY = 16;

  // Tube Capsule Outline
  ctx.fillStyle = "#000000";
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.roundRect(-tubeW / 2, tubeY, tubeW, tubeH, 9);
  ctx.fill();
  ctx.stroke();

  // Center Reference Guide Lines (Two vertical black/gray lines spaced 1 ball width)
  ctx.strokeStyle = "#6b7280";
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.moveTo(-6.5, tubeY); ctx.lineTo(-6.5, tubeY + tubeH);
  ctx.moveTo(6.5, tubeY); ctx.lineTo(6.5, tubeY + tubeH);
  ctx.stroke();

  // Sliding Inclinometer Ball (Bigger & High Contrast)
  const ballRadius = 6.0;
  const ballOffset = Math.max(-tubeW / 2 + ballRadius + 2, Math.min(tubeW / 2 - ballRadius - 2, tel.slipSkid * 24.0));
  
  // Radial metallic 3D gradient for the ball
  const ballGrad = ctx.createRadialGradient(
    ballOffset - 1.5, tubeY + tubeH / 2 - 1.5, 1,
    ballOffset, tubeY + tubeH / 2, ballRadius
  );
  ballGrad.addColorStop(0, "#ffffff");
  ballGrad.addColorStop(0.3, "#facc15");
  ballGrad.addColorStop(1, "#854d0e");

  ctx.fillStyle = ballGrad;
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(ballOffset, tubeY + tubeH / 2, ballRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Bold Left 'L' and Right 'R' Indicators
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 13px 'Share Tech Mono', monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("L", -tubeW / 2 - 11, tubeY + tubeH / 2);
  ctx.fillText("R", tubeW / 2 + 11, tubeY + tubeH / 2);

  ctx.restore();
}

// --- 5.2 MASTER PFD UPPER HALF ---
function renderPfdMaster(ctx, tel, w, h) {
  ctx.save();
  const dpr = window.devicePixelRatio || 1;
  ctx.scale(dpr, dpr);
  const dw = w / dpr;
  const dh = h / dpr;
  const cx = dw / 2;
  const cy = dh / 2;

  ctx.clearRect(0, 0, dw, dh);

  const pxPerDeg = dh / 38.0;
  const pitchPx = tel.pitch * pxPerDeg;

  // 1. HORIZON, SYNTHETIC TERRAIN OR CLASSIC SPLIT
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(-tel.roll * Math.PI / 180);
  ctx.translate(0, pitchPx);

  if (isSyntheticVisionEnabled) {
    // 3D SYNTHETIC VISION SKY & TOPOGRAPHIC TERRAIN
    const skyGrad = ctx.createLinearGradient(0, -dh * 2, 0, 0);
    skyGrad.addColorStop(0, "#0047b3");
    skyGrad.addColorStop(0.8, "#1a75ff");
    skyGrad.addColorStop(1, "#80b3ff");
    ctx.fillStyle = skyGrad;
    ctx.fillRect(-dw * 2, -dh * 2, dw * 4, dh * 2);

    const groundGrad = ctx.createLinearGradient(0, 0, 0, dh * 2);
    groundGrad.addColorStop(0, "#476b30");
    groundGrad.addColorStop(0.3, "#3d5c28");
    groundGrad.addColorStop(0.7, "#2e471e");
    groundGrad.addColorStop(1, "#1f3014");
    ctx.fillStyle = groundGrad;
    ctx.fillRect(-dw * 2, 0, dw * 4, dh * 2);

    // Oceanic Coastline Band
    ctx.fillStyle = "#0284c7";
    ctx.beginPath();
    ctx.moveTo(-dw * 1.5, 0);
    ctx.bezierCurveTo(-dw * 0.5, dh * 0.4, -dw * 0.2, dh * 0.8, -dw * 0.8, dh * 2);
    ctx.lineTo(-dw * 2, dh * 2);
    ctx.lineTo(-dw * 2, 0);
    ctx.closePath();
    ctx.fill();

    // 3D Terrain Perspective Grid Lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
    ctx.lineWidth = 1.0;
    for (let x = -dw * 1.5; x <= dw * 1.5; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x * 2.5, dh * 2);
      ctx.stroke();
    }
    for (let y = 15; y <= dh * 2; y = y * 1.45) {
      ctx.beginPath();
      ctx.moveTo(-dw * 2, y);
      ctx.lineTo(dw * 2, y);
      ctx.stroke();
    }

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.moveTo(-dw * 2, 0);
    ctx.lineTo(dw * 2, 0);
    ctx.stroke();

  } else {
    // Classic Blue/Brown Flat Horizon
    ctx.fillStyle = "#0066d6";
    ctx.fillRect(-dw * 2, -dh * 2, dw * 4, dh * 2);
    ctx.fillStyle = "#854d0e";
    ctx.fillRect(-dw * 2, 0, dw * 4, dh * 2);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.moveTo(-dw * 2, 0); ctx.lineTo(dw * 2, 0);
    ctx.stroke();
  }

  // Pitch Ladder
  ctx.strokeStyle = "#ffffff";
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 13px 'Share Tech Mono', monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  [-25, -20, -15, -10, -5, 5, 10, 15, 20, 25].forEach(deg => {
    const y = -deg * pxPerDeg;
    const isMajor = deg % 10 === 0;
    const len = isMajor ? 48 : 24;
    const gap = 16;

    ctx.lineWidth = isMajor ? 2.2 : 1.4;
    ctx.beginPath();
    ctx.moveTo(-len - gap, y); ctx.lineTo(-gap, y);
    ctx.moveTo(gap, y); ctx.lineTo(len + gap, y);
    ctx.stroke();

    ctx.fillText(Math.abs(deg).toString(), -len - gap - 12, y);
    ctx.fillText(Math.abs(deg).toString(), len + gap + 12, y);
  });
  ctx.restore();

  // 2. TOP ROLL SCALE & GARMIN SLIP/SKID TRAPEZOID BRICK
  const rollRadius = dh * 0.38;
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 1.5;

  [-60, -45, -30, -20, -10, 0, 10, 20, 30, 45, 60].forEach(deg => {
    const rad = (deg - 90) * Math.PI / 180;
    const len = Math.abs(deg) === 30 || Math.abs(deg) === 60 ? 12 : Math.abs(deg) === 45 ? 9 : 6;
    ctx.beginPath();
    ctx.moveTo(cx + rollRadius * Math.cos(rad), cy + rollRadius * Math.sin(rad));
    ctx.lineTo(cx + (rollRadius - len) * Math.cos(rad), cy + (rollRadius - len) * Math.sin(rad));
    ctx.stroke();
  });

  // Top Fixed Inverted White Roll Triangle
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.moveTo(cx, cy - rollRadius);
  ctx.lineTo(cx - 7, cy - rollRadius - 10);
  ctx.lineTo(cx + 7, cy - rollRadius - 10);
  ctx.closePath();
  ctx.fill();

  // Rotating Sky Pointer Triangle & Garmin Slip Brick
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(-tel.roll * Math.PI / 180);

  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.moveTo(0, -rollRadius + 2);
  ctx.lineTo(-6, -rollRadius + 12);
  ctx.lineTo(6, -rollRadius + 12);
  ctx.closePath();
  ctx.fill();

  // Slip/Skid Trapezoid Brick Under Pointer
  const slipOffsetPx = Math.max(-18, Math.min(18, tel.slipSkid * 22.0));
  const brickW = 16, brickH = 5;
  const brickY = -rollRadius + 15;

  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 1;
  ctx.fillRect(slipOffsetPx - brickW / 2, brickY, brickW, brickH);
  ctx.strokeRect(slipOffsetPx - brickW / 2, brickY, brickW, brickH);
  ctx.restore();

  // 3. FLIGHT PATH MARKER (Green Circle `O` with wings)
  if (showFlightPathMarker) {
    const driftAngleDeg = (tel.groundTrack - tel.heading);
    const fpmX = cx + (driftAngleDeg * (dw / 40.0));
    const climbDeg = (tel.verticalSpeed / (Math.max(tel.indicatedAirspeed, 30) * 101.268)) * 57.2958;
    const fpmY = cy - (climbDeg * pxPerDeg);

    ctx.save();
    ctx.strokeStyle = "#00e676";
    ctx.lineWidth = 2.5;
    ctx.fillStyle = "rgba(0, 230, 118, 0.2)";

    ctx.beginPath();
    ctx.arc(fpmX, fpmY, 8, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(fpmX, fpmY - 8); ctx.lineTo(fpmX, fpmY - 16);
    ctx.moveTo(fpmX - 8, fpmY); ctx.lineTo(fpmX - 18, fpmY);
    ctx.moveTo(fpmX + 8, fpmY); ctx.lineTo(fpmX + 18, fpmY);
    ctx.stroke();
    ctx.restore();
  }

  // 4. GARMIN YELLOW DELTA AIRCRAFT REFERENCE SYMBOL
  ctx.save();
  ctx.lineWidth = 3.0;
  ctx.fillStyle = "#facc15";
  ctx.strokeStyle = "#000000";

  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx - 36, cy + 12);
  ctx.lineTo(cx - 36, cy + 8);
  ctx.lineTo(cx, cy - 3);
  ctx.lineTo(cx + 36, cy + 8);
  ctx.lineTo(cx + 36, cy + 12);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillRect(cx - 72, cy - 3, 28, 6);
  ctx.strokeRect(cx - 72, cy - 3, 28, 6);
  ctx.fillRect(cx + 44, cy - 3, 28, 6);
  ctx.strokeRect(cx + 44, cy - 3, 28, 6);
  ctx.restore();

  // 5. AIRSPEED TAPE (LEFT) WITH BUG
  const tapeLeftX = 48, tapeTopY = 32, tapeHgt = dh - 64;
  const spdPxPerKt = tapeHgt / 60.0;

  // Selected Speed Bug
  ctx.fillStyle = "#000000";
  ctx.strokeStyle = "#00e5ff";
  ctx.lineWidth = 1.5;
  ctx.fillRect(10, 4, 52, 22);
  ctx.strokeRect(10, 4, 52, 22);
  ctx.fillStyle = "#00e5ff";
  ctx.font = "bold 14px 'Share Tech Mono', monospace";
  ctx.textAlign = "center";
  ctx.fillText(`${tel.selectedSpeedBug}`, 36, 20);

  ctx.fillStyle = "rgba(0, 0, 0, 0.65)";
  ctx.fillRect(0, tapeTopY, tapeLeftX, tapeHgt);

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(tapeLeftX - 6, cy - (currentProfile.vFe - tel.indicatedAirspeed) * spdPxPerKt, 6, (currentProfile.vFe - currentProfile.vSo) * spdPxPerKt);
  ctx.fillStyle = "#00e676";
  ctx.fillRect(tapeLeftX - 6, cy - (currentProfile.vNo - tel.indicatedAirspeed) * spdPxPerKt, 6, (currentProfile.vNo - currentProfile.vS) * spdPxPerKt);
  ctx.fillStyle = "#facc15";
  ctx.fillRect(tapeLeftX - 6, cy - (currentProfile.vNe - tel.indicatedAirspeed) * spdPxPerKt, 6, (currentProfile.vNe - currentProfile.vNo) * spdPxPerKt);

  const minSpdTick = Math.floor((tel.indicatedAirspeed - 30) / 10) * 10;
  const maxSpdTick = Math.floor((tel.indicatedAirspeed + 30) / 10) * 10;

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 14px 'Share Tech Mono', monospace";
  ctx.textAlign = "right";

  for (let s = minSpdTick; s <= maxSpdTick; s += 10) {
    const y = cy - (s - tel.indicatedAirspeed) * spdPxPerKt;
    if (y >= tapeTopY && y <= tapeTopY + tapeHgt) {
      ctx.fillText(s.toString(), tapeLeftX - 10, y + 5);
      ctx.fillRect(tapeLeftX - 6, y, 6, 2);
    }
  }

  // Large Bold Speed Pointer Box (104)
  const spdBoxW = 46, spdBoxH = 30;
  const spdBoxX = 2, spdBoxY = cy - spdBoxH / 2;

  ctx.fillStyle = "#000000";
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2.0;
  ctx.fillRect(spdBoxX, spdBoxY, spdBoxW, spdBoxH);
  ctx.strokeRect(spdBoxX, spdBoxY, spdBoxW, spdBoxH);

  ctx.beginPath();
  ctx.moveTo(spdBoxX + spdBoxW, spdBoxY + 6);
  ctx.lineTo(spdBoxX + spdBoxW + 8, cy);
  ctx.lineTo(spdBoxX + spdBoxW, spdBoxY + spdBoxH - 6);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 19px 'Share Tech Mono', monospace";
  ctx.textAlign = "center";
  ctx.fillText(Math.round(tel.indicatedAirspeed).toString(), spdBoxX + spdBoxW / 2, cy + 6);

  ctx.fillStyle = "#ffffff";
  ctx.font = "11px 'Share Tech Mono', monospace";
  ctx.textAlign = "left";
  ctx.fillText(`TAS  ${Math.round(tel.trueAirspeed)}`, 6, dh - 16);
  ctx.fillText(`GS   ${Math.round(tel.groundSpeed)}`, 6, dh - 4);

  // 5.1 G-METER READOUT BOX (Similar size to slip ball box, toggleable in settings)
  if (showGMeter) {
    const gVal = tel.gForceZ || 1.0;
    const gSign = gVal >= 0 ? "+" : "";
    const gText = `${gSign}${gVal.toFixed(1)} G`;

    let gColor = "#00e676"; // Normal green (0.5 to 2.0 G)
    if (gVal >= 3.2 || gVal < 0.0) gColor = "#ff1744"; // Structural limit alert red
    else if (gVal >= 2.0 || gVal < 0.5) gColor = "#facc15"; // Caution yellow

    const gBoxW = 76, gBoxH = 20;
    const gBoxX = 54, gBoxY = dh - 46;

    ctx.save();
    ctx.fillStyle = "rgba(0, 0, 0, 0.88)";
    ctx.strokeStyle = gColor;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(gBoxX, gBoxY, gBoxW, gBoxH, 4);
    ctx.fill();
    ctx.stroke();

    // G-LOAD Tag
    ctx.fillStyle = "#00e5ff";
    ctx.font = "bold 9px 'Share Tech Mono', monospace";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText("G-LOAD", gBoxX + 5, gBoxY + gBoxH / 2);

    // Live Numeric G Readout
    ctx.fillStyle = gColor;
    ctx.font = "bold 13px 'Share Tech Mono', monospace";
    ctx.textAlign = "right";
    ctx.fillText(gText, gBoxX + gBoxW - 5, gBoxY + gBoxH / 2);
    ctx.restore();
  }

  // 6. ALTIMETER TAPE (RIGHT) WITH ALTITUDE BUG & VSI
  const tapeRightX = dw - 54;
  const altPxPerFt = tapeHgt / 500.0;

  // Selected Altitude Bug
  ctx.fillStyle = "#000000";
  ctx.strokeStyle = "#00e5ff";
  ctx.lineWidth = 1.5;
  ctx.fillRect(dw - 64, 4, 58, 22);
  ctx.strokeRect(dw - 64, 4, 58, 22);
  ctx.fillStyle = "#00e5ff";
  ctx.font = "bold 14px 'Share Tech Mono', monospace";
  ctx.textAlign = "center";
  ctx.fillText(`${tel.selectedAltitudeBug}`, dw - 35, 20);

  ctx.fillStyle = "rgba(0, 0, 0, 0.65)";
  ctx.fillRect(tapeRightX, tapeTopY, 54, tapeHgt);

  const minAltTick = Math.floor((tel.indicatedAltitude - 300) / 100) * 100;
  const maxAltTick = Math.floor((tel.indicatedAltitude + 300) / 100) * 100;

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 13px 'Share Tech Mono', monospace";
  ctx.textAlign = "left";

  for (let a = minAltTick; a <= maxAltTick; a += 100) {
    const y = cy - (a - tel.indicatedAltitude) * altPxPerFt;
    if (y >= tapeTopY && y <= tapeTopY + tapeHgt) {
      ctx.fillText(a.toString(), tapeRightX + 10, y + 4);
      ctx.fillRect(tapeRightX, y, 6, 2);
    }
  }

  // Rolling Odometer Box
  const altBoxW = 54, altBoxH = 32;
  const altBoxX = dw - altBoxW - 2, altBoxY = cy - altBoxH / 2;

  ctx.fillStyle = "#000000";
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2.0;
  ctx.fillRect(altBoxX, altBoxY, altBoxW, altBoxH);
  ctx.strokeRect(altBoxX, altBoxY, altBoxW, altBoxH);

  ctx.beginPath();
  ctx.moveTo(altBoxX, altBoxY + 6);
  ctx.lineTo(altBoxX - 8, cy);
  ctx.lineTo(altBoxX, altBoxY + altBoxH - 6);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 17px 'Share Tech Mono', monospace";
  ctx.textAlign = "center";
  ctx.fillText(Math.round(tel.indicatedAltitude).toString(), altBoxX + altBoxW / 2, cy + 6);

  // VSI
  const vsiX = dw - 4;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(vsiX, cy - 70); ctx.lineTo(vsiX, cy + 70);
  ctx.stroke();

  const vsiDeflection = Math.max(-60, Math.min(60, (tel.verticalSpeed / 1000.0) * 40.0));
  ctx.strokeStyle = "#00e5ff";
  ctx.lineWidth = 3.0;
  ctx.beginPath();
  ctx.moveTo(vsiX - 6, cy);
  ctx.lineTo(vsiX, cy - vsiDeflection);
  ctx.stroke();

  ctx.fillStyle = "#00e5ff";
  ctx.font = "bold 12px 'Share Tech Mono', monospace";
  ctx.textAlign = "right";
  ctx.fillText("29.92 IN", dw - 8, dh - 8);

  // 7. MID NAVIGATION STATUS STRIP
  const stripY = dh - 6;
  ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
  ctx.fillRect(0, stripY - 14, dw, 20);

  ctx.font = "bold 12px 'Share Tech Mono', monospace";
  ctx.textAlign = "center";
  ctx.fillStyle = "#e040fb";
  ctx.fillText(`GPS   o  ${tel.destDistanceNm.toFixed(1)} NM ➔   ${sim.destIdent} TERM`, cx, stripY);

  // 8. TURN COORDINATOR & INCLINOMETER GAUGE (If enabled in settings)
  if (showTurnCoordinator) {
    const tcScale = dw < 450 ? 0.92 : 1.12;
    const tcX = cx;
    const tcY = Math.floor(dh - 82);
    renderTurnCoordinator(ctx, tel, tcX, tcY, tcScale);
  }

  ctx.restore();
}

// --- 5.3 MASTER HSI LOWER HALF ---
function renderHsiMaster(ctx, tel, w, h) {
  ctx.save();
  const dpr = window.devicePixelRatio || 1;
  ctx.scale(dpr, dpr);
  const dw = w / dpr;
  const dh = h / dpr;
  const cx = dw / 2;
  const cy = dh / 2 + 6;
  const radius = Math.min(dw * 0.44, (dh - 76) * 0.46);

  ctx.clearRect(0, 0, dw, dh);

  // 1. BACKGROUND UNDERLAY
  ctx.fillStyle = "#040711";
  ctx.fillRect(0, 0, dw, dh);

  if (isMapBackdropEnabled) {
    // Subtle circular gradient underlay behind the compass
    const mapBg = ctx.createRadialGradient(cx, cy, 10, cx, cy, radius * 1.4);
    mapBg.addColorStop(0, "#0c1f15");
    mapBg.addColorStop(0.6, "#07170e");
    mapBg.addColorStop(1, "#030a06");
    ctx.fillStyle = mapBg;
    ctx.fillRect(0, 0, dw, dh);

    // Subtle tactical map grid lines
    ctx.strokeStyle = "rgba(0, 229, 255, 0.05)";
    ctx.lineWidth = 1.0;
    for (let gx = (cx % 40); gx < dw; gx += 40) {
      ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, dh); ctx.stroke();
    }
    for (let gy = (cy % 40); gy < dh; gy += 40) {
      ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(dw, gy); ctx.stroke();
    }
  }

  // 2. CONCENTRIC RADAR / DISTANCE RANGE RINGS (Centered at cx, cy)
  const rangeRings = [
    { ratio: 0.33, label: "2.5 NM" },
    { ratio: 0.66, label: "5.0 NM" },
    { ratio: 1.00, label: "10.0 NM" }
  ];

  rangeRings.forEach(ring => {
    const r = radius * ring.ratio;
    ctx.strokeStyle = "rgba(0, 229, 255, 0.22)";
    ctx.lineWidth = 1.0;
    ctx.setLineDash([4, 6]);
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]); // Reset line dash

    // Range Label at 45° offset
    const labelRad = 45 * Math.PI / 180;
    const lx = cx + r * Math.sin(labelRad);
    const ly = cy - r * Math.cos(labelRad);
    ctx.fillStyle = "rgba(0, 229, 255, 0.6)";
    ctx.font = "bold 9px 'Share Tech Mono', monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.fillText(ring.label, lx, ly - 2);
  });

  // Inner Compass Shadow & Mask Bezel
  const compassBg = ctx.createRadialGradient(cx, cy, radius * 0.2, cx, cy, radius);
  compassBg.addColorStop(0, "rgba(5, 8, 17, 0.85)");
  compassBg.addColorStop(0.85, "rgba(7, 11, 24, 0.92)");
  compassBg.addColorStop(1, "rgba(10, 16, 32, 0.98)");
  ctx.fillStyle = compassBg;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fill();

  // Outer Precision Dial Bezel Ring
  ctx.strokeStyle = "#24324a";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "rgba(0, 229, 255, 0.4)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(cx, cy, radius + 2, 0, Math.PI * 2);
  ctx.stroke();

  // 3. 360° ROTATING COMPASS ROSE
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(-tel.heading * Math.PI / 180);

  // Compass Rose Inner Delineation Circle
  ctx.strokeStyle = "rgba(255, 255, 255, 0.18)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(0, 0, radius - 20, 0, Math.PI * 2);
  ctx.stroke();

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (let deg = 0; deg < 360; deg += 5) {
    const rad = (deg - 90) * Math.PI / 180;
    const isThirty = deg % 30 === 0;
    const isTen = deg % 10 === 0;
    const isFortyFive = deg % 45 === 0 && !isThirty;
    const len = isThirty ? 15 : isTen ? 10 : 5;

    const x1 = radius * Math.cos(rad);
    const y1 = radius * Math.sin(rad);
    const x2 = (radius - len) * Math.cos(rad);
    const y2 = (radius - len) * Math.sin(rad);

    ctx.strokeStyle = isThirty ? "#ffffff" : isTen ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.45)";
    ctx.lineWidth = isThirty ? 2.2 : isTen ? 1.4 : 1.0;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    // 45° Intercardinal Diamond Marks (NE, SE, SW, NW)
    if (isFortyFive) {
      const dx = (radius - 12) * Math.cos(rad);
      const dy = (radius - 12) * Math.sin(rad);
      ctx.fillStyle = "rgba(0, 229, 255, 0.7)";
      ctx.beginPath();
      ctx.moveTo(dx, dy - 3);
      ctx.lineTo(dx + 3, dy);
      ctx.lineTo(dx, dy + 3);
      ctx.lineTo(dx - 3, dy);
      ctx.closePath();
      ctx.fill();
    }

    // Major Degree & Cardinal Numbers (Counter-rotated to always remain upright for the pilot)
    if (isThirty) {
      const isCardinal = (deg === 0 || deg === 90 || deg === 180 || deg === 270);
      const isNorth = (deg === 0);
      const label = isNorth ? "N" : deg === 90 ? "E" : deg === 180 ? "S" : deg === 270 ? "W" : (deg / 10).toString();
      const tx = (radius - len - (isCardinal ? 14 : 12)) * Math.cos(rad);
      const ty = (radius - len - (isCardinal ? 14 : 12)) * Math.sin(rad);

      ctx.save();
      ctx.translate(tx, ty);
      ctx.rotate(tel.heading * Math.PI / 180); // Counter-rotate so text is always upright

      if (isCardinal) {
        // High-contrast Glassmorphic Badge for N, S, E, W
        const badgeW = isNorth ? 26 : 24;
        const badgeH = isNorth ? 24 : 22;
        ctx.fillStyle = isNorth ? "rgba(0, 32, 48, 0.95)" : "rgba(10, 16, 30, 0.9)";
        ctx.strokeStyle = isNorth ? "#00e5ff" : "rgba(255, 255, 255, 0.45)";
        ctx.lineWidth = isNorth ? 2.0 : 1.2;

        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(-badgeW / 2, -badgeH / 2, badgeW, badgeH, 4);
        } else {
          ctx.rect(-badgeW / 2, -badgeH / 2, badgeW, badgeH);
        }
        ctx.fill();
        ctx.stroke();

        ctx.font = isNorth ? "900 18px 'Share Tech Mono', monospace" : "900 16px 'Share Tech Mono', monospace";
        ctx.fillStyle = isNorth ? "#00e5ff" : "#ffffff";
        ctx.fillText(label, 0, 1);
      } else {
        // Intermediate 30° degree numbers (3, 6, 12, 15, 21, 24, 30, 33)
        ctx.font = "bold 14px 'Share Tech Mono', monospace";
        ctx.fillStyle = "#cbd5e1";
        ctx.fillText(label, 0, 0);
      }

      ctx.restore();
    }
  }

  // Cyan Selected Heading Bug (Dual-Prong Garmin Notch on Outer Rim)
  ctx.save();
  ctx.rotate(tel.selectedHeadingBug * Math.PI / 180);
  ctx.strokeStyle = "#00e5ff";
  ctx.fillStyle = "rgba(0, 229, 255, 0.35)";
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.moveTo(-10, -radius - 4);
  ctx.lineTo(-10, -radius + 8);
  ctx.lineTo(-4, -radius + 8);
  ctx.lineTo(0, -radius);
  ctx.lineTo(4, -radius + 8);
  ctx.lineTo(10, -radius + 8);
  ctx.lineTo(10, -radius - 4);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  // Magenta Course Needle (CDI) & Deviation Dots
  ctx.save();
  ctx.rotate(tel.selectedCourseBug * Math.PI / 180);

  // Active Course Pointer Arrowhead
  ctx.strokeStyle = "#e040fb";
  ctx.fillStyle = "#e040fb";
  ctx.lineWidth = 3.0;

  ctx.beginPath();
  ctx.moveTo(0, -radius + 20);
  ctx.lineTo(-9, -radius + 38);
  ctx.lineTo(9, -radius + 38);
  ctx.closePath();
  ctx.fill();

  // Outer Course Shaft Bars
  ctx.beginPath();
  ctx.moveTo(0, -radius + 38); ctx.lineTo(0, -radius * 0.45);
  ctx.moveTo(0, radius * 0.45); ctx.lineTo(0, radius - 20);
  ctx.stroke();

  // CDI Scale Dots (White / Cyan dots on scale line)
  ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(-radius * 0.38, 0);
  ctx.lineTo(radius * 0.38, 0);
  ctx.stroke();

  ctx.fillStyle = "#ffffff";
  [-radius * 0.3, -radius * 0.15, radius * 0.15, radius * 0.3].forEach(dotX => {
    ctx.beginPath();
    ctx.arc(dotX, 0, 3, 0, Math.PI * 2);
    ctx.fill();
  });

  // Movable Center Deviation Bar (Cross-Track Error)
  const cdiMaxPx = radius * 0.38;
  const cdiDeflection = Math.max(-cdiMaxPx, Math.min(cdiMaxPx, (tel.xtkNm / 5.0) * cdiMaxPx));
  ctx.strokeStyle = "#e040fb";
  ctx.lineWidth = 4.0;
  ctx.beginPath();
  ctx.moveTo(cdiDeflection, -radius * 0.45);
  ctx.lineTo(cdiDeflection, radius * 0.45);
  ctx.stroke();

  // TO / FROM Indicator Triangle
  ctx.fillStyle = "#e040fb";
  ctx.beginPath();
  ctx.moveTo(0, -12);
  ctx.lineTo(-7, 2);
  ctx.lineTo(7, 2);
  ctx.closePath();
  ctx.fill();

  ctx.restore(); // End CDI

  // Cyan Destination Bearing Pointer Arrow (NAV1 / Direct-To)
  if (tel.destBearingDeg !== undefined) {
    ctx.save();
    ctx.rotate(tel.destBearingDeg * Math.PI / 180);
    ctx.strokeStyle = "#00e5ff";
    ctx.fillStyle = "#00e5ff";
    ctx.lineWidth = 2.0;

    // Head
    ctx.beginPath();
    ctx.moveTo(0, -radius + 8);
    ctx.lineTo(-6, -radius + 22);
    ctx.lineTo(6, -radius + 22);
    ctx.closePath();
    ctx.stroke();

    // Tail
    ctx.beginPath();
    ctx.moveTo(0, radius - 8);
    ctx.lineTo(0, radius - 24);
    ctx.stroke();
    ctx.restore();
  }

  ctx.restore(); // End Rotating Compass

  // 4. TOP FIXED LUBBER LINE (White Arrowhead Index pointing at current heading)
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx, cy - radius);
  ctx.lineTo(cx - 7, cy - radius - 12);
  ctx.lineTo(cx + 7, cy - radius - 12);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // 5. CENTER OWNSHIP AIRCRAFT SILHOUETTE (Solid High-Contrast Symbol)
  ctx.save();
  ctx.translate(cx, cy);
  ctx.fillStyle = "#facc15"; // Aviation Yellow
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 1.5;

  // Draw precision ownship aircraft (Nose, Swept Wings, Fuselage, Tail Horizontal Stabilizer)
  ctx.beginPath();
  ctx.moveTo(0, -14); // Nose
  ctx.lineTo(2.5, -5);
  ctx.lineTo(16, 2); // Right wing tip
  ctx.lineTo(16, 5);
  ctx.lineTo(3, 4);
  ctx.lineTo(2.5, 12);
  ctx.lineTo(7, 14); // Right tail tip
  ctx.lineTo(7, 16);
  ctx.lineTo(-7, 16); // Left tail tip
  ctx.lineTo(-7, 14);
  ctx.lineTo(-2.5, 12);
  ctx.lineTo(-3, 4);
  ctx.lineTo(-16, 5);
  ctx.lineTo(-16, 2); // Left wing tip
  ctx.lineTo(-2.5, -5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  // 6. ADS-B TRAFFIC TARGETS ON HSI COMPASS ROSE (Range: 12 NM)
  if (trafficMgr.showTraffic) {
    const radarRangeNm = 12.0;
    const pxPerNm = radius / radarRangeNm;

    trafficMgr.targets.forEach(tgt => {
      if (tgt.distNm <= radarRangeNm && trafficMgr.checkAltFilter(tgt.relAltFt)) {
        const relBearingRad = (tgt.bearingDeg - tel.heading) * Math.PI / 180.0;
        const tgtX = cx + (tgt.distNm * pxPerNm) * Math.sin(relBearingRad);
        const tgtY = cy - (tgt.distNm * pxPerNm) * Math.cos(relBearingRad);

        let color = "#00e5ff";
        if (tgt.threatLevel === "RESOLUTION_ADVISORY") color = "#ff1744";
        else if (tgt.threatLevel === "TRAFFIC_ADVISORY") color = "#ffea00";
        else if (tgt.threatLevel === "PROXIMITY") color = "#00e5ff";
        else color = "rgba(156, 163, 175, 0.9)";

        ctx.save();
        ctx.translate(tgtX, tgtY);

        // Target Track Heading Chevron
        ctx.save();
        ctx.rotate((tgt.trackDeg - tel.heading) * Math.PI / 180.0);
        ctx.fillStyle = color;
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(0, -8);
        ctx.lineTo(6, 6);
        ctx.lineTo(0, 2);
        ctx.lineTo(-6, 6);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        // Relative Altitude Badge Tag (e.g. +04↑)
        const relAltHundreds = Math.abs(Math.round(tgt.relAltFt / 100));
        const sign = tgt.relAltFt >= 0 ? "+" : "-";
        const vsArrow = tgt.verticalSpeedFpm > 250 ? "↑" : tgt.verticalSpeedFpm < -250 ? "↓" : "";
        const tagText = `${sign}${relAltHundreds.toString().padStart(2, "0")}${vsArrow}`;

        ctx.fillStyle = color;
        ctx.font = "bold 9px 'Share Tech Mono', monospace";
        ctx.textAlign = "center";
        ctx.fillText(tagText, 0, tgt.relAltFt >= 0 ? -11 : 16);

        ctx.restore();
      }
    });
  }

  // 7. TOP DIGITAL HEADING & BUG BOXES (Enlarged High-Visibility Typography)
  const hdgBoxW = 84, hdgBoxH = 34;
  ctx.fillStyle = "#090d16";
  ctx.strokeStyle = "#00e5ff";
  ctx.lineWidth = 2.0;
  if (ctx.roundRect) {
    ctx.beginPath(); ctx.roundRect(cx - hdgBoxW / 2, 4, hdgBoxW, hdgBoxH, 4); ctx.fill(); ctx.stroke();
  } else {
    ctx.fillRect(cx - hdgBoxW / 2, 4, hdgBoxW, hdgBoxH);
    ctx.strokeRect(cx - hdgBoxW / 2, 4, hdgBoxW, hdgBoxH);
  }

  ctx.fillStyle = "#ffffff";
  ctx.font = "900 24px 'Share Tech Mono', monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(Math.round(tel.heading).toString().padStart(3, "0") + "°", cx, 21);

  // Left Selected Heading Bug Box
  const bugBoxW = 58, bugBoxH = 32;
  ctx.fillStyle = "#090d16";
  ctx.strokeStyle = "#00e5ff";
  ctx.lineWidth = 1.4;
  ctx.fillRect(cx - 130, 5, bugBoxW, bugBoxH);
  ctx.strokeRect(cx - 130, 5, bugBoxW, bugBoxH);

  ctx.fillStyle = "#00e5ff";
  ctx.font = "bold 9px 'Share Tech Mono', monospace";
  ctx.textAlign = "center";
  ctx.fillText("HDG", cx - 101, 14);
  ctx.font = "900 15px 'Share Tech Mono', monospace";
  ctx.fillText(`${tel.selectedHeadingBug.toString().padStart(3, "0")}°`, cx - 101, 28);

  // Left Outside Telemetry Box (OAT & Wind)
  ctx.fillStyle = "rgba(9, 13, 22, 0.9)";
  ctx.strokeStyle = "#1f2937";
  ctx.lineWidth = 1.0;
  ctx.fillRect(6, 4, 70, 44);
  ctx.strokeRect(6, 4, 70, 44);
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 10px 'Share Tech Mono', monospace";
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("OAT  +18°C", 10, 17);
  ctx.fillText("WIND  Calm", 10, 30);
  ctx.fillText("TAS  112kt", 10, 43);

  // Right Selected Course Box
  ctx.fillStyle = "#090d16";
  ctx.strokeStyle = "#e040fb";
  ctx.lineWidth = 1.4;
  ctx.fillRect(cx + 72, 5, bugBoxW, bugBoxH);
  ctx.strokeRect(cx + 72, 5, bugBoxW, bugBoxH);

  ctx.fillStyle = "#e040fb";
  ctx.font = "bold 9px 'Share Tech Mono', monospace";
  ctx.textAlign = "center";
  ctx.fillText("CRS", cx + 101, 14);
  ctx.font = "900 15px 'Share Tech Mono', monospace";
  ctx.fillText(`${tel.selectedCourseBug.toString().padStart(3, "0")}°`, cx + 101, 28);

  // Right Selected VS Box
  ctx.fillStyle = "#090d16";
  ctx.strokeStyle = "#00e5ff";
  ctx.lineWidth = 1.4;
  ctx.fillRect(dw - 64, 5, bugBoxW, bugBoxH);
  ctx.strokeRect(dw - 64, 5, bugBoxW, bugBoxH);

  ctx.fillStyle = "#00e5ff";
  ctx.font = "bold 9px 'Share Tech Mono', monospace";
  ctx.fillText("VS", dw - 35, 14);
  ctx.font = "900 15px 'Share Tech Mono', monospace";
  ctx.fillText(`${tel.targetVsFpm}`, dw - 35, 28);

  // 8. BOTTOM NAVIGATION DATA STRIP
  const botY = dh - 4;
  ctx.fillStyle = "rgba(9, 13, 22, 0.95)";
  ctx.fillRect(0, botY - 26, dw, 30);
  ctx.strokeStyle = "#1f2937";
  ctx.strokeRect(0, botY - 26, dw, 30);

  ctx.fillStyle = "#00e5ff";
  ctx.font = "bold 11px 'Share Tech Mono', monospace";
  ctx.textAlign = "left";
  ctx.fillText("↑ GPS 1", 10, botY - 14);
  ctx.fillStyle = "#9ca3af";
  ctx.font = "9px 'Share Tech Mono', monospace";
  ctx.fillText("ENR CDI", 10, botY - 3);

  ctx.textAlign = "center";
  ctx.fillStyle = "#e040fb";
  ctx.font = "bold 13px 'Share Tech Mono', monospace";
  ctx.fillText(`➔  ${sim.destIdent || 'YTRE (HOME)'}`, cx, botY - 14);

  ctx.font = "bold 11px 'Share Tech Mono', monospace";
  const mins = Math.floor((tel.destDistanceNm / Math.max(tel.groundSpeed, 10)) * 60);
  const secs = Math.floor(((tel.destDistanceNm / Math.max(tel.groundSpeed, 10)) * 3600) % 60);
  const eteStr = `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  ctx.fillText(`GPS DIS ${tel.destDistanceNm.toFixed(1)} NM   ETE ${eteStr}   XTK ${tel.xtkNm.toFixed(2)} NM`, cx, botY - 2);

  ctx.restore();
}

// --- 5.4 BLACKBOX TELEMETRY CHART ---
function renderTelemetryChart(ctx, w, h) {
  ctx.save();
  const dpr = window.devicePixelRatio || 1;
  ctx.scale(dpr, dpr);
  const dw = w / dpr, dh = h / dpr;

  ctx.clearRect(0, 0, dw, dh);
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, dw, dh);

  const samples = recorder.recordedSamples;
  if (samples.length < 2) {
    ctx.fillStyle = "#9ca3af";
    ctx.font = "12px 'Share Tech Mono', monospace";
    ctx.textAlign = "center";
    ctx.fillText("Start recording flight telemetry to view dynamic blackbox graph", dw / 2, dh / 2);
    ctx.restore();
    return;
  }

  ctx.strokeStyle = "#00e5ff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  samples.forEach((s, i) => {
    const x = (i / (samples.length - 1)) * (dw - 40) + 20;
    const y = dh - 20 - ((s.alt / 10000) * (dh - 40));
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  });
  ctx.stroke();

  ctx.strokeStyle = "#00e676";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  samples.forEach((s, i) => {
    const x = (i / (samples.length - 1)) * (dw - 40) + 20;
    const y = dh - 20 - ((s.speed / 200) * (dh - 40));
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  });
  ctx.stroke();

  ctx.restore();
}

// ============================================================================
// 6.5 REAL-TIME AVIATION WEATHER OVERLAY SERVICE & RAINVIEWER RADAR CONTROLLER
// ============================================================================
class WeatherOverlayService {
  constructor() {
    this.showRadar = localStorage.getItem("efis_show_weather_radar") !== "false";
    this.showWind = localStorage.getItem("efis_show_wind_vectors") !== "false";
    this.showMetar = localStorage.getItem("efis_show_metar") !== "false";
    this.radarOpacity = parseFloat(localStorage.getItem("efis_radar_opacity") || "0.65");

    this.radarFrames = []; // Array of { time, path }
    this.currentFrameIndex = 0;
    this.isPlaying = true;
    this.playTimer = null;
    this.radarLayer = null;
    this.radarHost = "https://tilecache.rainviewer.com";
    this.lastFetchTime = 0;
    this.isLiveSource = false;

    this.windLayerGroup = null;
    this.metarLayerGroup = null;
    this.metarObservations = {}; // ICAO -> { category, raw, windSpeedKt, windDirDeg, visMeters, ceilingFt, tempC, dewpointC, qnhHpa }
    this.selectedMetarIcao = null;
    this.currentObservation = null;
  }

  async init(map) {
    if (!map || typeof L === 'undefined') return;
    this.map = map;
    this.windLayerGroup = L.layerGroup().addTo(map);
    this.metarLayerGroup = L.layerGroup().addTo(map);

    this.loadCachedMetadata();
    await this.fetchRadarMetadata();
    await this.fetchRegionalWindsAndMetar();

    this.initUIControls();
    this.startAnimationLoop();

    // 5-minute auto-refresh polling loop
    setInterval(() => {
      this.fetchRadarMetadata();
      this.fetchRegionalWindsAndMetar();
    }, 5 * 60 * 1000);
  }

  loadCachedMetadata() {
    try {
      const cached = localStorage.getItem("efis_weather_cache");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.frames && parsed.frames.length > 0) {
          this.radarFrames = parsed.frames;
          this.radarHost = parsed.host || "https://tilecache.rainviewer.com";
          this.currentFrameIndex = this.radarFrames.length - 1;
          this.lastFetchTime = parsed.timestamp || Date.now();
          this.isLiveSource = false;
        }
      }
    } catch(e) {
      console.warn("Error loading weather cache:", e);
    }
  }

  async fetchRadarMetadata() {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      const resp = await fetch("https://api.rainviewer.com/public/weather-maps.json", {
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (resp.ok) {
        const data = await resp.json();
        if (data.radar && data.radar.past && data.radar.past.length > 0) {
          this.radarHost = data.host || "https://tilecache.rainviewer.com";
          // Take past 6 frames
          const pastFrames = data.radar.past.slice(-6);
          this.radarFrames = pastFrames;
          this.currentFrameIndex = this.radarFrames.length - 1;
          this.isLiveSource = true;
          this.lastFetchTime = Date.now();

          localStorage.setItem("efis_weather_cache", JSON.stringify({
            frames: this.radarFrames,
            host: this.radarHost,
            timestamp: this.lastFetchTime
          }));

          this.updatePlaybackHUD();
          this.renderCurrentRadarTile();
          return;
        }
      }
    } catch(e) {
      console.warn("RainViewer fetch failed, using cached / baseline weather:", e.message);
      this.isLiveSource = false;
    }

    if (this.radarFrames.length === 0) {
      // Synthetic fallback frames if offline
      const now = Math.floor(Date.now() / 1000);
      this.radarFrames = [
        { time: now - 1800, path: "/v2/radar/38283dbfe4bb" },
        { time: now - 1200, path: "/v2/radar/753803bb5a91" },
        { time: now - 600, path: "/v2/radar/7203f66fc3f4" },
        { time: now - 300, path: "/v2/radar/2d7ff7213f7b" },
        { time: now, path: "/v2/radar/e57738904597" }
      ];
      this.currentFrameIndex = this.radarFrames.length - 1;
    }
    this.updatePlaybackHUD();
    this.renderCurrentRadarTile();
  }

  renderCurrentRadarTile() {
    if (!this.map || !this.radarFrames.length) return;

    const isCockpitView = document.getElementById("map-viewport-wrapper")?.parentElement?.id === "efis-map-instrument-cluster";

    if (!this.showRadar || isCockpitView) {
      if (this.radarLayer) {
        try { this.map.removeLayer(this.radarLayer); } catch(e) {}
        this.radarLayer = null;
      }
      return;
    }

    const frame = this.radarFrames[this.currentFrameIndex];
    if (!frame) return;

    const tileUrl = `${this.radarHost}${frame.path}/256/{z}/{x}/{y}/2/1_1.png`;

    const nextLayer = L.tileLayer(tileUrl, {
      opacity: this.radarOpacity,
      maxNativeZoom: 7, // RainViewer API limit: Leaflet auto-scales zoom 7 tiles cleanly for zoom 8-18!
      maxZoom: 18,
      tileSize: 256,
      zIndex: 25
    });

    nextLayer.addTo(this.map);

    if (this.radarLayer) {
      const oldLayer = this.radarLayer;
      setTimeout(() => {
        try { this.map.removeLayer(oldLayer); } catch(e) {}
      }, 150);
    }
    this.radarLayer = nextLayer;

    this.updatePlaybackHUD();
  }

  updatePlaybackHUD() {
    const hudBar = document.getElementById("weather-hud-bar");
    if (hudBar) {
      hudBar.classList.toggle("hidden", !this.showRadar);
    }

    const frame = this.radarFrames[this.currentFrameIndex];
    const timeLabel = document.getElementById("weather-frame-time");
    if (timeLabel && frame) {
      const isLatest = this.currentFrameIndex === this.radarFrames.length - 1;
      if (isLatest) {
        timeLabel.textContent = "LIVE RADAR";
      } else {
        const latestTime = this.radarFrames[this.radarFrames.length - 1].time;
        const diffMins = Math.max(5, Math.round((latestTime - frame.time) / 60));
        timeLabel.textContent = `-${diffMins} MIN`;
      }
    }

    const statusPill = document.getElementById("weather-source-status");
    if (statusPill) {
      if (this.isLiveSource) {
        statusPill.textContent = "● LIVE RADAR";
        statusPill.className = "weather-status-pill";
      } else {
        const minsAgo = Math.max(1, Math.min(60, Math.round((Date.now() - (this.lastFetchTime || Date.now())) / 60000)));
        statusPill.textContent = `⚠ CACHED (${minsAgo}m ago)`;
        statusPill.className = "weather-status-pill cached";
      }
    }

    const playBtn = document.getElementById("btn-weather-play-pause");
    if (playBtn) {
      playBtn.textContent = this.isPlaying ? "⏸" : "▶";
    }

    // Render Scrubber Dots
    const dotsContainer = document.getElementById("weather-track-dots");
    if (dotsContainer) {
      dotsContainer.innerHTML = "";
      this.radarFrames.forEach((f, idx) => {
        const dot = document.createElement("div");
        dot.className = `weather-track-dot ${idx === this.currentFrameIndex ? 'active' : ''}`;
        dot.title = `Frame ${idx + 1}/${this.radarFrames.length}`;
        dot.addEventListener("click", (e) => {
          e.stopPropagation();
          this.currentFrameIndex = idx;
          this.renderCurrentRadarTile();
        });
        dotsContainer.appendChild(dot);
      });
    }
  }

  startAnimationLoop() {
    if (this.playTimer) clearInterval(this.playTimer);
    this.playTimer = setInterval(() => {
      if (!this.isPlaying || !this.showRadar || this.radarFrames.length <= 1) return;

      this.currentFrameIndex = (this.currentFrameIndex + 1) % this.radarFrames.length;
      this.renderCurrentRadarTile();
    }, 850);
  }

  togglePlay() {
    this.isPlaying = !this.isPlaying;
    this.updatePlaybackHUD();
  }

  setOpacity(val) {
    this.radarOpacity = Math.max(0.1, Math.min(1.0, val));
    localStorage.setItem("efis_radar_opacity", this.radarOpacity);
    if (this.radarLayer) {
      this.radarLayer.setOpacity(this.radarOpacity);
    }
    const valText = document.getElementById("val-radar-opacity");
    if (valText) valText.textContent = `${Math.round(this.radarOpacity * 100)}%`;
    const cfgSlider = document.getElementById("cfg-slider-radar-opacity");
    if (cfgSlider) cfgSlider.value = Math.round(this.radarOpacity * 100);
    const mapSlider = document.getElementById("slider-radar-opacity");
    if (mapSlider) mapSlider.value = Math.round(this.radarOpacity * 100);
  }

  setRadarVisible(visible) {
    this.showRadar = visible;
    localStorage.setItem("efis_show_weather_radar", this.showRadar);
    this.renderCurrentRadarTile();
    this.updatePlaybackHUD();
    this.syncButtonStates();
  }

  setWindVisible(visible) {
    this.showWind = visible;
    localStorage.setItem("efis_show_wind_vectors", this.showWind);
    this.renderWindVectors();
    this.syncButtonStates();
  }

  setMetarVisible(visible) {
    this.showMetar = visible;
    localStorage.setItem("efis_show_metar", this.showMetar);
    this.renderMetarStations();
    this.syncButtonStates();
  }

  async fetchRegionalWindsAndMetar() {
    try {
      const lat = sim.lat || -31.8986;
      const lon = sim.lon || 152.5142;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      const resp = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat.toFixed(4)}&longitude=${lon.toFixed(4)}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,surface_pressure,cloud_cover`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (resp.ok) {
        const data = await resp.json();
        this.currentObservation = data.current;
      }
    } catch(e) {
      console.warn("Open-Meteo fetch error, using synthetic observations:", e.message);
    }

    this.generateMetarData();
    this.renderWindVectors();
    this.renderMetarStations();
  }

  generateMetarData() {
    const obs = this.currentObservation || {
      temperature_2m: 19.4,
      relative_humidity_2m: 65,
      wind_speed_10m: 13.0, // km/h
      wind_direction_10m: 160,
      surface_pressure: 1018.2,
      cloud_cover: 25
    };

    const windKt = Math.round(obs.wind_speed_10m * 0.539957);
    const windDir = Math.round(obs.wind_direction_10m);
    const qnh = Math.round(obs.surface_pressure);
    const tempC = Math.round(obs.temperature_2m);
    const dewpointC = Math.round(tempC - ((100 - obs.relative_humidity_2m) / 5));

    AUSTRALIAN_AIRPORTS.forEach(apt => {
      // Tailor per airport
      const aptWindDir = (windDir + (apt.elevationFt % 20) - 10 + 360) % 360;
      const aptWindKt = Math.max(3, windKt + (apt.icao.charCodeAt(1) % 5) - 2);
      const cloudPct = Math.min(100, Math.max(0, obs.cloud_cover + (apt.elevationFt % 30) - 15));

      let flightCategory = "VFR";
      let ceilingFt = 4500;
      let cloudCode = "FEW045";
      let visMeters = 9999;

      if (cloudPct > 85) {
        flightCategory = "IFR";
        ceilingFt = 800;
        cloudCode = "OVC008";
        visMeters = 4000;
      } else if (cloudPct > 65) {
        flightCategory = "MVFR";
        ceilingFt = 2200;
        cloudCode = "BKN022";
        visMeters = 7000;
      } else if (cloudPct > 35) {
        flightCategory = "VFR";
        ceilingFt = 3500;
        cloudCode = "SCT035";
      } else {
        flightCategory = "VFR";
        ceilingFt = 5000;
        cloudCode = "FEW050";
      }

      const day = new Date().getUTCDate().toString().padStart(2, "0");
      const hour = new Date().getUTCHours().toString().padStart(2, "0");
      const min = Math.floor(new Date().getUTCMinutes() / 30) * 30;
      const zulu = `${day}${hour}${min.toString().padStart(2, "0")}Z`;
      const windStr = `${aptWindDir.toString().padStart(3, "0")}${aptWindKt.toString().padStart(2, "0")}KT`;
      const tempDewStr = `${tempC >= 0 ? tempC.toString().padStart(2, "0") : 'M' + Math.abs(tempC)}/${dewpointC >= 0 ? dewpointC.toString().padStart(2, "0") : 'M' + Math.abs(dewpointC)}`;
      const rawMetar = `METAR ${apt.icao} ${zulu} ${windStr} ${visMeters === 9999 ? '9999' : visMeters} ${cloudCode} ${tempDewStr} Q${qnh}`;

      this.metarObservations[apt.icao] = {
        apt,
        category: flightCategory,
        raw: rawMetar,
        windDirDeg: aptWindDir,
        windSpeedKt: aptWindKt,
        visMeters,
        ceilingFt,
        cloudCode,
        tempC,
        dewpointC,
        qnhHpa: qnh
      };
    });
  }

  renderWindVectors() {
    if (!this.windLayerGroup) return;
    this.windLayerGroup.clearLayers();
    if (!this.showWind) return;

    // Plot wind vectors for airports & fixes along route
    const points = [
      ...AUSTRALIAN_AIRPORTS,
      { icao: "CROWDY", name: "Crowdy Head Fix", lat: -31.8417, lon: 152.7533, elevationFt: 500 },
      { icao: "CAMDEN-HVN", name: "Camden Haven Overfly", lat: -31.6367, lon: 152.8250, elevationFt: 1200 }
    ];

    points.forEach(p => {
      const metar = this.metarObservations[p.icao] || {
        windDirDeg: 160, windSpeedKt: 8
      };

      const color = metar.windSpeedKt > 20 ? "#ff1744" : metar.windSpeedKt > 11 ? "#ffea00" : "#00e5ff";

      const icon = L.divIcon({
        className: 'leaflet-wind-barb',
        html: `
          <div class="wind-barb-wrap">
            <svg class="wind-arrow-icon" viewBox="0 0 24 24" style="transform: rotate(${metar.windDirDeg + 180}deg);">
              <path d="M12 2 L17 19 L12 15 L7 19 Z" fill="${color}" stroke="#000000" stroke-width="1.2"/>
            </svg>
            <span class="wind-badge-lbl" style="border-color:${color};">${metar.windDirDeg}°/${metar.windSpeedKt}kt</span>
          </div>
        `,
        iconSize: [44, 38],
        iconAnchor: [22, 19]
      });

      L.marker([p.lat, p.lon], { icon, interactive: false }).addTo(this.windLayerGroup);
    });
  }

  renderMetarStations() {
    if (!this.metarLayerGroup) return;
    this.metarLayerGroup.clearLayers();
    if (!this.showMetar) return;

    AUSTRALIAN_AIRPORTS.forEach(apt => {
      const obs = this.metarObservations[apt.icao];
      if (!obs) return;

      const catClass = obs.category === "VFR" ? "metar-dot-vfr" : obs.category === "MVFR" ? "metar-dot-mvfr" : obs.category === "IFR" ? "metar-dot-ifr" : "metar-dot-lifr";

      const icon = L.divIcon({
        className: 'metar-marker-icon',
        html: `
          <div class="metar-dot-wrap ${catClass}" title="Click for METAR: ${apt.icao} (${obs.category})">
            <span class="metar-dot-text">${obs.category}</span>
          </div>
        `,
        iconSize: [22, 22],
        iconAnchor: [11, 11]
      });

      const marker = L.marker([apt.lat, apt.lon], { icon, zIndexOffset: 200 }).addTo(this.metarLayerGroup);
      marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        this.openMetarDetailModal(apt.icao);
      });
    });
  }

  openMetarDetailModal(icao) {
    const obs = this.metarObservations[icao];
    if (!obs) return;

    const modal = document.getElementById("metar-detail-modal");
    if (!modal) return;

    this.selectedMetarIcao = icao;

    const banner = document.getElementById("metar-flight-rules-banner");
    const badge = document.getElementById("metar-rules-badge");
    const aptIdent = document.getElementById("metar-apt-ident");
    const rulesDesc = document.getElementById("metar-rules-desc");
    const rawBox = document.getElementById("raw-metar-text");

    if (banner && badge && aptIdent && rulesDesc && rawBox) {
      badge.textContent = obs.category;
      banner.className = `metar-banner ${obs.category.toLowerCase()}`;
      aptIdent.textContent = `${obs.apt.icao} (${obs.apt.iata}) - ${obs.apt.name}`;
      rulesDesc.textContent = obs.category === "VFR" 
        ? "Visual Flight Rules: Ceiling > 3,000 ft, Visibility > 10 km" 
        : obs.category === "MVFR" 
        ? "Marginal VFR: Ceiling 1,000-3,000 ft, Visibility 5-8 km" 
        : obs.category === "IFR" 
        ? "Instrument Flight Rules: Ceiling < 1,000 ft, Visibility < 5 km" 
        : "Low IFR: Ceiling < 500 ft, Visibility < 1.5 km";
      rawBox.textContent = obs.raw;
    }

    const windElem = document.getElementById("metar-wind-val");
    const visElem = document.getElementById("metar-vis-val");
    const cloudElem = document.getElementById("metar-cloud-val");
    const tempElem = document.getElementById("metar-temp-val");
    const qnhElem = document.getElementById("metar-qnh-val");
    const elevElem = document.getElementById("metar-elev-val");

    if (windElem) windElem.textContent = `${obs.windDirDeg}° @ ${obs.windSpeedKt} kt`;
    if (visElem) visElem.textContent = obs.visMeters >= 9999 ? "> 10 km (6+ SM)" : `${(obs.visMeters / 1000).toFixed(1)} km`;
    if (cloudElem) cloudElem.textContent = `${obs.cloudCode} (${obs.ceilingFt} ft)`;
    if (tempElem) tempElem.textContent = `${obs.tempC >= 0 ? '+' : ''}${obs.tempC}°C / ${obs.dewpointC >= 0 ? '+' : ''}${obs.dewpointC}°C`;
    if (qnhElem) qnhElem.textContent = `${obs.qnhHpa} hPa (${(obs.qnhHpa * 0.02953).toFixed(2)} inHg)`;
    if (elevElem) elevElem.textContent = `${obs.apt.elevationFt} ft | CTAF ${obs.apt.towerFreq}`;

    modal.classList.remove("hidden");
  }

  syncButtonStates() {
    // Map HUD Controls
    const mapRadarBtn = document.getElementById("btn-map-weather-radar");
    const mapWindBtn = document.getElementById("btn-map-wind-vectors");
    const mapMetarBtn = document.getElementById("btn-map-metar");
    const slider = document.getElementById("slider-radar-opacity");
    const valText = document.getElementById("val-radar-opacity");

    if (mapRadarBtn) {
      mapRadarBtn.classList.toggle("active", this.showRadar);
      mapRadarBtn.textContent = this.showRadar ? "🌧 Rain Radar: ON" : "🌧 Rain Radar: OFF";
    }
    if (mapWindBtn) {
      mapWindBtn.classList.toggle("active", this.showWind);
      mapWindBtn.textContent = this.showWind ? "💨 Wind Barbs: ON" : "💨 Wind Barbs: OFF";
    }
    if (mapMetarBtn) {
      mapMetarBtn.classList.toggle("active", this.showMetar);
      mapMetarBtn.textContent = this.showMetar ? "📡 METAR Rules: ON" : "📡 METAR Rules: OFF";
    }
    if (slider) slider.value = Math.round(this.radarOpacity * 100);
    if (valText) valText.textContent = `${Math.round(this.radarOpacity * 100)}%`;

    // Settings Screen Controls
    const cfgRadarBtn = document.getElementById("btn-cfg-weather-radar");
    const cfgWindBtn = document.getElementById("btn-cfg-wind-vectors");
    const cfgMetarBtn = document.getElementById("btn-cfg-metar");
    const cfgSlider = document.getElementById("cfg-slider-radar-opacity");

    if (cfgRadarBtn) {
      cfgRadarBtn.classList.toggle("active", this.showRadar);
      cfgRadarBtn.textContent = this.showRadar ? "ENABLED (ON)" : "DISABLED (OFF)";
    }
    if (cfgWindBtn) {
      cfgWindBtn.classList.toggle("active", this.showWind);
      cfgWindBtn.textContent = this.showWind ? "ENABLED (ON)" : "DISABLED (OFF)";
    }
    if (cfgMetarBtn) {
      cfgMetarBtn.classList.toggle("active", this.showMetar);
      cfgMetarBtn.textContent = this.showMetar ? "ENABLED (ON)" : "DISABLED (OFF)";
    }
    if (cfgSlider) cfgSlider.value = Math.round(this.radarOpacity * 100);
  }

  initUIControls() {
    this.syncButtonStates();

    // Map Buttons
    document.getElementById("btn-map-weather-radar")?.addEventListener("click", () => {
      this.setRadarVisible(!this.showRadar);
    });
    document.getElementById("btn-map-wind-vectors")?.addEventListener("click", () => {
      this.setWindVisible(!this.showWind);
    });
    document.getElementById("btn-map-metar")?.addEventListener("click", () => {
      this.setMetarVisible(!this.showMetar);
    });

    document.getElementById("slider-radar-opacity")?.addEventListener("input", (e) => {
      this.setOpacity(parseInt(e.target.value) / 100);
    });

    // Settings Buttons
    document.getElementById("btn-cfg-weather-radar")?.addEventListener("click", () => {
      this.setRadarVisible(!this.showRadar);
    });
    document.getElementById("btn-cfg-wind-vectors")?.addEventListener("click", () => {
      this.setWindVisible(!this.showWind);
    });
    document.getElementById("btn-cfg-metar")?.addEventListener("click", () => {
      this.setMetarVisible(!this.showMetar);
    });
    document.getElementById("cfg-slider-radar-opacity")?.addEventListener("input", (e) => {
      this.setOpacity(parseInt(e.target.value) / 100);
    });

    // Mini-Bar Play / Pause
    document.getElementById("btn-weather-play-pause")?.addEventListener("click", () => {
      this.togglePlay();
    });

    // METAR Modal
    document.getElementById("btn-close-metar-modal")?.addEventListener("click", () => {
      document.getElementById("metar-detail-modal")?.classList.add("hidden");
    });
    document.getElementById("btn-close-metar-footer")?.addEventListener("click", () => {
      document.getElementById("metar-detail-modal")?.classList.add("hidden");
    });
    document.getElementById("btn-metar-direct-to")?.addEventListener("click", () => {
      if (this.selectedMetarIcao && this.metarObservations[this.selectedMetarIcao]) {
        const apt = this.metarObservations[this.selectedMetarIcao].apt;
        sim.destIdent = apt.icao;
        sim.destLat = apt.lat;
        sim.destLon = apt.lon;
        sim.routeWaypoints = [
          { id: "POS", name: "Current Position", lat: sim.lat, lon: sim.lon },
          { id: apt.icao, name: apt.name, lat: apt.lat, lon: apt.lon }
        ];
        updateRouteOnMap();
        document.getElementById("metar-detail-modal")?.classList.add("hidden");
        if (typeof audioSynth !== 'undefined' && audioSynth.playDivertChime) audioSynth.playDivertChime();
        alert(`✈ Active Course Set Direct-To: ${apt.icao} (${apt.name})`);
      }
    });
  }
}

const weatherService = new WeatherOverlayService();

// ============================================================================
// 6. LIVE LEAFLET MAP & AIRPORTS ENGINE
// ============================================================================
let leafletMap = null;
let mapAirplaneMarker = null;
let mapRouteLine = null;
let mapAirportsLayer = null;
let mapVhfAreasLayer = null;
let mapCtafRingsLayer = null;
let mapTrafficLayer = null;
let mapRangeRingsLayer = null;
let mapGlideRingLayer = null;

let showAirports = localStorage.getItem("efis_show_airports") !== "false";
let showVhfAreas = localStorage.getItem("efis_show_vhf_areas") !== "false";
let showCtafRings = localStorage.getItem("efis_show_ctaf_rings") !== "false";
let showGlideRing = localStorage.getItem("efis_show_glide_ring") !== "false";
let showRangeRings = localStorage.getItem("efis_show_range_rings") !== "false";

const MAP_LAYERS = {
  dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  satellite: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  topo: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
  vfr: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
};

let currentTileLayer = null;

function initLeafletFlightMap() {
  const mapDiv = document.getElementById("leaflet-flight-map");
  if (!mapDiv || typeof L === 'undefined') return;

  try {
    leafletMap = L.map('leaflet-flight-map', {
      center: [sim.lat, sim.lon],
      zoom: 10,
      zoomControl: false,
      attributionControl: false
    });

    currentTileLayer = L.tileLayer(MAP_LAYERS.dark, { maxZoom: 18 }).addTo(leafletMap);

    const planeIcon = L.divIcon({
      className: 'leaflet-plane-icon',
      html: `<svg width="36" height="36" viewBox="0 0 36 36" style="transform: rotate(${sim.headingDeg}deg); filter: drop-shadow(0 0 4px #000);">
               <path d="M18 2 L21 14 L34 19 L34 23 L21 20 L21 29 L26 31 L26 34 L18 32 L10 34 L10 31 L15 29 L15 20 L2 23 L2 19 L15 14 Z" fill="#ffeb3b" stroke="#000000" stroke-width="1.5"/>
             </svg>`,
      iconSize: [36, 36],
      iconAnchor: [18, 18]
    });

    mapAirplaneMarker = L.marker([sim.lat, sim.lon], { icon: planeIcon }).addTo(leafletMap);

    mapRouteLine = L.polyline(sim.routeWaypoints.map(w => [w.lat, w.lon]), {
      color: '#e040fb', weight: 4, opacity: 0.85, dashArray: '8, 8'
    }).addTo(leafletMap);

    // 1. VHF Area Sectors Boundary Layer
    mapVhfAreasLayer = L.layerGroup().addTo(leafletMap);
    renderVhfAreasOnMap();

    // 2. CTAF Aerodrome Proximity Rings Layer (10 NM / 15 NM)
    mapCtafRingsLayer = L.layerGroup().addTo(leafletMap);
    renderCtafRingsOnMap();

    // 3. ADS-B Live Traffic Layer
    mapTrafficLayer = L.layerGroup().addTo(leafletMap);
    renderTrafficOnMap();

    // 4. Airports Marker Layer
    mapAirportsLayer = L.layerGroup().addTo(leafletMap);
    renderAirportsOnMap();

    // 5. Radar Range Rings & Glide Cones
    mapRangeRingsLayer = L.layerGroup().addTo(leafletMap);
    renderRangeRings();

    mapGlideRingLayer = L.layerGroup().addTo(leafletMap);
    updateGlideRangeRing();

    // 6. Aviation Weather Overlay Service (RainViewer Radar, Wind Vectors, METAR)
    weatherService.init(leafletMap);

    // 7. Australian VNC / VTC Airspace Boundary Layer & VFR Waypoints
    mapAirspaceLayer = L.layerGroup().addTo(leafletMap);
    mapVfrWaypointsLayer = L.layerGroup().addTo(leafletMap);
    renderAirspacesOnMap();
    renderVfrWaypointsOnMap();

    leafletMap.on('zoomend', () => {
      if (airspaceEngine && airspaceEngine.chartMode === 'HYBRID') {
        renderAirspacesOnMap();
        renderVfrWaypointsOnMap();
      }
    });

    leafletMap.on('click', (e) => {
      if (isRouteLocked) {
        return; // Guard active: prevent accidental single taps from adding fixes
      }
      const lat = e.latlng.lat, lon = e.latlng.lng;
      const newId = `FIX-${sim.routeWaypoints.length + 1}`;
      sim.routeWaypoints.push({ id: newId, name: `Custom Fix`, lat, lon });
      updateRouteOnMap();
    });
  } catch(e) {
    console.error("Leaflet init error:", e);
  }
}

let mapSelectedTrackLine = null;
let selectedTargetHex = null;
let isFollowingSelectedTarget = false;

function selectAircraftTarget(icaoHex) {
  selectedTargetHex = icaoHex;
  updateAircraftInspectorPanel();
  renderTrafficOnMap();
}

function deselectAircraftTarget() {
  selectedTargetHex = null;
  isFollowingSelectedTarget = false;
  const drawer = document.getElementById("plane-inspector-drawer");
  if (drawer) drawer.classList.add("hidden");
  if (mapSelectedTrackLine && leafletMap) {
    leafletMap.removeLayer(mapSelectedTrackLine);
    mapSelectedTrackLine = null;
  }
  renderTrafficOnMap();
}

function updateAircraftInspectorPanel() {
  try {
    const drawer = document.getElementById("plane-inspector-drawer");
    if (!drawer) return;

    if (!selectedTargetHex || typeof trafficMgr === 'undefined' || !trafficMgr) {
      drawer.classList.add("hidden");
      if (mapSelectedTrackLine && leafletMap) {
        leafletMap.removeLayer(mapSelectedTrackLine);
        mapSelectedTrackLine = null;
      }
      return;
    }

    const tgt = trafficMgr.targets.get(selectedTargetHex);
    if (!tgt) {
      drawer.classList.add("hidden");
      return;
    }

    drawer.classList.remove("hidden");

    const safeSetText = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    };

    // Header
    safeSetText("insp-callsign", tgt.callsign || tgt.icaoHex);
    safeSetText("insp-hex", tgt.icaoHex);

    // Photo
    const photoImg = document.getElementById("insp-photo-img");
    const photoCap = document.getElementById("insp-photo-caption");
    if (photoImg) photoImg.src = tgt.photoUrl || "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&auto=format&fit=crop&q=80";
    if (photoCap) photoCap.textContent = tgt.photoCaption || `Image © Aviation Spotter / ${tgt.airline || tgt.callsign}`;

    // Meta
    safeSetText("insp-reg", tgt.registration || `VH-${tgt.icaoHex.slice(-3)}`);
    safeSetText("insp-country", tgt.country || "Australia 🇦🇺");
    safeSetText("insp-type", `${tgt.type || 'Aircraft'} (${tgt.typeCode || 'ICAO'})`);
    safeSetText("insp-type-desc", tgt.typeDesc || "Landplane");
    safeSetText("insp-squawk", tgt.squawk || "1200");
    safeSetText("insp-route", tgt.route || "En-Route / Cruising");

    // Spatial
    safeSetText("insp-speed", `${Math.round(tgt.groundSpeedKt || 0)} kt`);
    safeSetText("insp-alt-baro", `${Math.round(tgt.altitudeFt || 0).toLocaleString()} ft`);
    safeSetText("insp-alt-geom", `${Math.round((tgt.altitudeFt || 0) + 100).toLocaleString()} ft`);
    
    const vsVal = Math.round(tgt.verticalSpeedFpm || 0);
    const vsArrow = vsVal > 100 ? "↑ Climbing" : vsVal < -100 ? "↓ Descending" : "→ Level";
    safeSetText("insp-vs", `${vsVal > 0 ? '+' : ''}${vsVal} ft/min (${vsArrow})`);
    
    safeSetText("insp-track", `${(tgt.trackDeg != null ? tgt.trackDeg : 0).toFixed(1)}°`);
    safeSetText("insp-pos", `${(tgt.latitude != null ? tgt.latitude : 0).toFixed(4)}°, ${(tgt.longitude != null ? tgt.longitude : 0).toFixed(4)}°`);
    safeSetText("insp-dist", `${(tgt.distNm != null ? tgt.distNm : 0).toFixed(1)} NM @ ${Math.round(tgt.bearingDeg || 0)}°`);
    
    const relAlt = tgt.relAltFt != null ? tgt.relAltFt : 0;
    const relAltSign = relAlt >= 0 ? "+" : "-";
    safeSetText("insp-rel-alt", `${relAltSign}${Math.abs(Math.round(relAlt)).toLocaleString()} ft ${relAlt >= 0 ? 'Above' : 'Below'}`);

    // Signal
    safeSetText("insp-rssi", `${(tgt.rssi != null ? tgt.rssi : -24.5).toFixed(1)} dBFS`);
    safeSetText("insp-msg-rate", `${(tgt.msgRate != null ? tgt.msgRate : 3.2).toFixed(1)} msg/s`);
    const secAgo = ((Date.now() - (tgt.lastSeenTimestamp || Date.now())) / 1000).toFixed(1);
    safeSetText("insp-last-seen", `${secAgo}s ago`);

    // FMS
    safeSetText("insp-fms-alt", tgt.fmsAlt ? `${tgt.fmsAlt.toLocaleString()} ft` : `${Math.round(tgt.altitudeFt || 0).toLocaleString()} ft`);
    safeSetText("insp-fms-hdg", `${(tgt.trackDeg != null ? tgt.trackDeg : 0).toFixed(1)}°`);

    const threatBadge = document.getElementById("insp-threat-badge");
    if (threatBadge) {
      if (tgt.threatLevel === "RESOLUTION_ADVISORY") {
        threatBadge.className = "badge-threat-ra";
        threatBadge.textContent = "COLLISION ALERT (RA)";
      } else if (tgt.threatLevel === "TRAFFIC_ADVISORY") {
        threatBadge.className = "badge-threat-ta";
        threatBadge.textContent = "TRAFFIC ADVISORY (TA)";
      } else if (tgt.threatLevel === "PROXIMITY") {
        threatBadge.className = "badge-threat-prox";
        threatBadge.textContent = "PROXIMITY TRAFFIC";
      } else {
        threatBadge.className = "badge-threat-none";
        threatBadge.textContent = "NO THREAT (CRUISE)";
      }
    }

    // Draw Flight Track Line
    if (leafletMap) {
      if (mapSelectedTrackLine) {
        leafletMap.removeLayer(mapSelectedTrackLine);
        mapSelectedTrackLine = null;
      }
      if (tgt.trackHistory && tgt.trackHistory.length > 1) {
        const trailColor = getAltitudeColor(tgt.altitudeFt);
        mapSelectedTrackLine = L.polyline(tgt.trackHistory, {
          color: trailColor,
          weight: 3.5,
          opacity: 0.9,
          dashArray: '6, 6'
        }).addTo(leafletMap);
      }
      if (isFollowingSelectedTarget) {
        leafletMap.panTo([tgt.latitude, tgt.longitude], { animate: true });
      }
    }
  } catch(e) {
    console.error("Inspector panel update error:", e);
  }
}

function getAircraftSvgIcon(target, color) {
  const typeCode = (target.typeCode || "").toUpperCase();
  const desc = (target.typeDesc || "").toUpperCase();
  const typeName = (target.type || "").toUpperCase();
  const callsign = (target.callsign || "").toUpperCase();
  const track = target.trackDeg || 0;

  // 1. Helicopter / Rotary Wing
  if (
    typeCode.startsWith("H") || 
    typeCode === "A139" || typeCode === "EC35" || typeCode === "EC45" || 
    typeCode === "BK117" || typeCode === "B06" || typeCode === "B412" || 
    typeCode === "R44" || typeCode === "R22" || typeCode === "R66" || 
    typeCode === "S76" || typeCode === "S92" || typeCode === "AS50" ||
    typeCode === "G2CA" ||
    desc.includes("HELI") || desc.includes("ROTARY") || 
    typeName.includes("HELI") || typeName.includes("AW139") ||
    callsign.includes("HELI") || callsign.includes("RESCUE") || callsign.includes("POLAIR")
  ) {
    return `
      <svg width="28" height="28" viewBox="0 0 28 28" style="transform: rotate(${track}deg); filter: drop-shadow(0 0 5px ${color});">
        <!-- Main Rotor Blades -->
        <line x1="14" y1="2" x2="14" y2="18" stroke="${color}" stroke-width="2.2" stroke-linecap="round" />
        <line x1="6" y1="10" x2="22" y2="10" stroke="${color}" stroke-width="2.2" stroke-linecap="round" />
        <!-- Rotor Hub -->
        <circle cx="14" cy="10" r="2.2" fill="${color}" stroke="#000" stroke-width="1" />
        <!-- Aerodynamic Fuselage Pod -->
        <path d="M14,3.5 C16.5,3.5 17.5,6.5 17.5,11 C17.5,15 15.5,17 14,23 L14,25.5 L12,25.5 L14,23 C12.5,17 10.5,15 10.5,11 C10.5,6.5 11.5,3.5 14,3.5 Z" fill="${color}" stroke="#000" stroke-width="1.2" />
        <!-- Tail Rotor & Vertical Fin -->
        <line x1="10" y1="24.5" x2="18" y2="24.5" stroke="${color}" stroke-width="1.8" stroke-linecap="round" />
        <rect x="16.5" y="22.5" width="2" height="4" fill="${color}" stroke="#000" stroke-width="0.8" />
      </svg>
    `;
  }

  // 2. Heavy / Widebody Quad or Twin Long-Haul Jet (B787, A380, B777, A350, A330, B747)
  if (
    typeCode === "B789" || typeCode === "B788" || typeCode === "B78X" ||
    typeCode === "A388" || typeCode === "A380" || 
    typeCode === "B77W" || typeCode === "B772" || typeCode === "B773" || typeCode === "B77L" ||
    typeCode === "A359" || typeCode === "A35K" || typeCode === "A350" ||
    typeCode === "A332" || typeCode === "A333" || typeCode === "A339" || typeCode === "A330" ||
    typeCode === "B744" || typeCode === "B748" || typeCode === "B747" ||
    desc.includes("HEAVY") || desc.includes("QUAD") || target.altitudeFt >= 30000
  ) {
    return `
      <svg width="30" height="30" viewBox="0 0 30 30" style="transform: rotate(${track}deg); filter: drop-shadow(0 0 5px ${color});">
        <!-- Heavy Jet Body & Swept Wings -->
        <path d="M15,1 C16.2,1 17,3 17,7 L17,11 L29,18 L29,20.5 L17,16 L17,23 L20.5,26 L20.5,28 L15,26.5 L9.5,28 L9.5,26 L13,23 L13,16 L1,20.5 L1,18 L13,11 L13,7 C13,3 13.8,1 15,1 Z" fill="${color}" stroke="#000" stroke-width="1.2" stroke-linejoin="round" />
        <!-- Underwing Engine Pods -->
        <rect x="7" y="14" width="2" height="4.5" rx="1" fill="${color}" stroke="#000" stroke-width="0.8" />
        <rect x="21" y="14" width="2" height="4.5" rx="1" fill="${color}" stroke="#000" stroke-width="0.8" />
      </svg>
    `;
  }

  // 3. Narrowbody Jet (B737, A320, A321, E190, etc.)
  if (
    typeCode.startsWith("B73") || typeCode === "B38M" || typeCode === "B39M" ||
    typeCode.startsWith("A32") || typeCode === "A20N" || typeCode === "A21N" || typeCode === "A319" ||
    typeCode.startsWith("E19") || typeCode.startsWith("E75") || typeCode === "BCS3" || typeCode === "A220" ||
    desc.includes("JET") || target.altitudeFt >= 18000
  ) {
    return `
      <svg width="28" height="28" viewBox="0 0 28 28" style="transform: rotate(${track}deg); filter: drop-shadow(0 0 5px ${color});">
        <!-- Narrowbody Jet Silhouette -->
        <path d="M14,1.5 C15,1.5 15.8,3.5 15.8,8 L15.8,12 L26.5,18 L26.5,20 L15.8,16.5 L15.8,22.5 L19,25 L19,26.5 L14,25.2 L9,26.5 L9,25 L12.2,22.5 L12.2,16.5 L1.5,20 L1.5,18 L12.2,12 L12.2,8 C12.2,3.5 13,1.5 14,1.5 Z" fill="${color}" stroke="#000" stroke-width="1.2" stroke-linejoin="round" />
      </svg>
    `;
  }

  // 4. Turboprop (BE20 King Air, DH8D Dash 8, SF34 Saab 340, AT76 ATR 72, PC12, etc.)
  if (
    typeCode === "BE20" || typeCode === "B350" || typeCode === "BE30" || typeCode === "BE90" ||
    typeCode.startsWith("DH8") || typeCode === "Q400" ||
    typeCode === "AT72" || typeCode === "AT76" || typeCode === "AT45" ||
    typeCode === "SF34" || typeCode === "SW4" || typeCode === "PC12" || typeCode === "C208" ||
    desc.includes("TURBOPROP") || desc.includes("L2T") || desc.includes("L1T") ||
    typeName.includes("KING AIR") || typeName.includes("DASH") || typeName.includes("TURBOPROP")
  ) {
    return `
      <svg width="28" height="28" viewBox="0 0 28 28" style="transform: rotate(${track}deg); filter: drop-shadow(0 0 5px ${color});">
        <!-- Turboprop Straight Wing & T-Tail -->
        <path d="M14,1.5 C14.8,1.5 15.5,3 15.5,7 L15.5,10 L27,10.5 L27,13.5 L15.5,13.5 L15.5,22 L20.5,23.5 L20.5,25.5 L14,24.5 L7.5,25.5 L7.5,23.5 L12.5,22 L12.5,13.5 L1,13.5 L1,10.5 L12.5,10 L12.5,7 C12.5,3 13.2,1.5 14,1.5 Z" fill="${color}" stroke="#000" stroke-width="1.2" stroke-linejoin="round" />
        <!-- Propeller Nacelles -->
        <ellipse cx="7" cy="11.5" rx="1.8" ry="3.5" fill="${color}" stroke="#000" stroke-width="0.8" />
        <ellipse cx="21" cy="11.5" rx="1.8" ry="3.5" fill="${color}" stroke="#000" stroke-width="0.8" />
      </svg>
    `;
  }

  // 5. Default / Light GA Single/Twin Piston (C172, P28A, SR22, BE58, etc.)
  return `
    <svg width="26" height="26" viewBox="0 0 26 26" style="transform: rotate(${track}deg); filter: drop-shadow(0 0 5px ${color});">
      <!-- Propeller Spinner -->
      <ellipse cx="13" cy="2" rx="3.2" ry="1" fill="${color}" stroke="#000" stroke-width="0.8" />
      <!-- Light GA Airframe -->
      <path d="M13,2 C13.8,2 14.5,4 14.5,7.5 L14.5,9.5 L24.5,10 L24.5,12.5 L14.5,12.5 L14.5,21 L18.5,22.5 L18.5,24.5 L13,23.5 L7.5,24.5 L7.5,22.5 L11.5,21 L11.5,12.5 L1.5,12.5 L1.5,10 L11.5,9.5 L11.5,7.5 C11.5,4 12.2,2 13,2 Z" fill="${color}" stroke="#000" stroke-width="1.2" stroke-linejoin="round" />
    </svg>
  `;
}

function renderTrafficOnMap() {
  if (!mapTrafficLayer || !leafletMap) return;
  mapTrafficLayer.clearLayers();
  if (!trafficMgr.showTraffic) return;

  const mapBounds = (typeof leafletMap.getBounds === 'function') ? leafletMap.getBounds() : null;

  trafficMgr.targets.forEach(tgt => {
    const inBounds = mapBounds ? mapBounds.contains([tgt.latitude, tgt.longitude]) : false;
    if ((tgt.distNm <= 250 || inBounds) && trafficMgr.checkAltFilter(tgt.relAltFt)) {
      // ADSBexchange standard altitude color or threat color
      let planeColor = getAltitudeColor(tgt.altitudeFt);
      if (tgt.threatLevel === "RESOLUTION_ADVISORY") planeColor = "#ff1744";
      else if (tgt.threatLevel === "TRAFFIC_ADVISORY") planeColor = "#ffea00";

      const isSelected = (tgt.icaoHex === selectedTargetHex);
      const selRing = isSelected ? `border: 2px solid #ffd700; box-shadow: 0 0 12px #ffd700; border-radius: 50%;` : '';

      const relAltHundreds = Math.abs(Math.round(tgt.relAltFt / 100));
      const relSign = tgt.relAltFt >= 0 ? "+" : "-";
      const vsArrow = tgt.verticalSpeedFpm > 150 ? "↑" : tgt.verticalSpeedFpm < -150 ? "↓" : "";

      const planeSvg = getAircraftSvgIcon(tgt, planeColor);

      const icon = L.divIcon({
        className: 'leaflet-traffic-icon',
        html: `
          <div style="display:flex; flex-direction:column; align-items:center; transform: translate(-50%, -50%); cursor:pointer;">
            <div style="width:32px; height:32px; display:flex; align-items:center; justify-content:center; ${selRing}">
              ${planeSvg}
            </div>
            <div style="background:rgba(9,13,22,0.94); border:1px solid ${planeColor}; color:#fff; font-size:9px; font-family:monospace; padding:1px 4px; border-radius:3px; margin-top:1px; white-space:nowrap; text-align:center; box-shadow:0 0 6px ${planeColor};">
              <strong style="color:${planeColor};">${tgt.callsign}</strong><br>
              ${relSign}${relAltHundreds.toString().padStart(2, '0')}${vsArrow} | ${Math.round(tgt.groundSpeedKt)}k
            </div>
          </div>
        `,
        iconSize: [64, 52],
        iconAnchor: [32, 26]
      });

      const marker = L.marker([tgt.latitude, tgt.longitude], { icon });

      // Click to select plane and open ADSBexchange inspector!
      marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        selectAircraftTarget(tgt.icaoHex);
      });

      // 1-minute velocity trend vector
      const vectorLengthNm = tgt.groundSpeedKt / 60.0;
      const rad = tgt.trackDeg * Math.PI / 180.0;
      const endLat = tgt.latitude + (vectorLengthNm / 60.0) * Math.cos(rad);
      const endLon = tgt.longitude + (vectorLengthNm / (60.0 * Math.cos(tgt.latitude * Math.PI / 180.0))) * Math.sin(rad);

      const vectorLine = L.polyline([[tgt.latitude, tgt.longitude], [endLat, endLon]], {
        color: planeColor,
        weight: 1.5,
        dashArray: '3, 3',
        opacity: 0.85
      });

      mapTrafficLayer.addLayer(vectorLine);
      mapTrafficLayer.addLayer(marker);
    }
  });
}

function openTrafficDirectoryModal() {
  const modal = document.getElementById("traffic-directory-modal");
  if (!modal) return;

  const countElem = document.getElementById("modal-traffic-count");
  if (countElem) countElem.textContent = `${trafficMgr.targets.size} TARGETS`;

  const tbody = document.getElementById("traffic-targets-tbody");
  if (tbody) {
    tbody.innerHTML = "";
    const sortedTargets = Array.from(trafficMgr.targets.values()).sort((a, b) => a.distNm - b.distNm);

    sortedTargets.forEach(tgt => {
      let threatBadge = '<span class="badge-threat-none">NO THREAT</span>';
      if (tgt.threatLevel === "RESOLUTION_ADVISORY") threatBadge = '<span class="badge-threat-ra">COLLISION ALERT</span>';
      else if (tgt.threatLevel === "TRAFFIC_ADVISORY") threatBadge = '<span class="badge-threat-ta">TRAFFIC ADVISORY</span>';
      else if (tgt.threatLevel === "PROXIMITY") threatBadge = '<span class="badge-threat-prox">PROXIMITY</span>';

      const relSign = tgt.relAltFt >= 0 ? "+" : "-";
      const vsArrow = tgt.verticalSpeedFpm > 250 ? "↑" : tgt.verticalSpeedFpm < -250 ? "↓" : "";

      const tr = document.createElement("tr");
      tr.style.cursor = "pointer";
      tr.title = "Click to inspect aircraft and track flight trail";
      tr.innerHTML = `
        <td><strong style="color:#00e5ff;">${tgt.callsign}</strong> <span style="font-size:9px; color:#9ca3af;">(${tgt.icaoHex})</span></td>
        <td style="font-size:10px;">${tgt.type || 'Aircraft'}</td>
        <td><strong>${Math.round(tgt.altitudeFt).toLocaleString()} ft</strong></td>
        <td>${tgt.verticalSpeedFpm > 0 ? '+' : ''}${Math.round(tgt.verticalSpeedFpm)} fpm ${vsArrow}</td>
        <td><strong>${tgt.distNm.toFixed(1)} NM</strong> / ${Math.round(tgt.bearingDeg)}°</td>
        <td>${Math.round(tgt.groundSpeedKt)} kt</td>
        <td style="font-weight:bold; color:${tgt.threatLevel === 'RESOLUTION_ADVISORY' ? '#ff1744' : tgt.threatLevel === 'TRAFFIC_ADVISORY' ? '#ffea00' : '#00e5ff'};">
          ${relSign}${Math.abs(Math.round(tgt.relAltFt))} ft
        </td>
        <td>${threatBadge}</td>
      `;
      tr.addEventListener("click", () => {
        modal.classList.add("hidden");
        switchToScreen(1);
        selectAircraftTarget(tgt.icaoHex);
        if (leafletMap) leafletMap.setView([tgt.latitude, tgt.longitude], 10);
      });
      tbody.appendChild(tr);
    });
  }

  modal.classList.remove("hidden");
}

let mapAirspaceLayer = null;
let mapVfrWaypointsLayer = null;

function renderAirspacesOnMap() {
  if (!mapAirspaceLayer || !leafletMap) return;
  mapAirspaceLayer.clearLayers();
  if (!airspaceEngine.showAirspaces) return;

  const currentZoom = leafletMap.getZoom();
  const activeChartMode = airspaceEngine.chartMode || "HYBRID";
  
  // In HYBRID mode: if zoomed in (>= 9), show VTC terminal + both; if zoomed out (< 9), show VNC regional + both
  let effectiveTier = activeChartMode;
  if (activeChartMode === "HYBRID") {
    effectiveTier = currentZoom >= 9 ? "VTC" : "VNC";
  }

  AUSTRALIAN_AIRSPACES.features.forEach(feature => {
    const props = feature.properties;
    const coords = feature.geometry.coordinates[0];

    // Filter match check
    if (!airspaceEngine.checkFilterMatch(props.classification, props.isVtcTerminalStep)) return;

    // Chart mode tier check (VNC vs VTC)
    if (props.chartTier && props.chartTier !== "BOTH") {
      if (effectiveTier === "VNC" && props.chartTier === "VTC" && props.isVtcTerminalStep && currentZoom < 9) {
        return; // Suppress micro VTC terminal steps when viewing broad VNC overview
      }
      if (effectiveTier === "VTC" && props.chartTier === "VNC" && !props.isVtcTerminalStep && currentZoom >= 11) {
        // In high terminal zoom, keep focus on terminal sectors
      }
    }

    let strokeColor = props.color || "#0080FF";
    let fillColor = strokeColor;
    let fillOpacity = 0.08;
    let weight = 2.5;
    let dashArray = null;
    let badgeClass = "airspace-badge-controlled";

    if (props.classification === "RESTRICTED") {
      strokeColor = "#CC0033";
      fillColor = "#CC0033";
      fillOpacity = 0.12;
      weight = 2.5;
      badgeClass = "airspace-badge-restricted";
    } else if (props.classification === "DANGER") {
      strokeColor = "#FF4500";
      fillColor = "#FF4500";
      fillOpacity = 0.08;
      dashArray = "6, 4";
      weight = 2.0;
      badgeClass = "airspace-badge-danger";
    } else if (props.classification === "MIL_CTR") {
      strokeColor = "#C00080";
      fillColor = "#C00080";
      fillOpacity = 0.10;
      dashArray = "10, 6";
      weight = 3.0;
      badgeClass = "airspace-badge-mil";
    } else if (props.classification === "CLASS_C" || props.classification === "CLASS_D") {
      strokeColor = props.classification === "CLASS_C" ? "#0080FF" : "#00BFFF";
      fillColor = strokeColor;
      fillOpacity = props.isVtcTerminalStep ? 0.10 : 0.07;
      if (props.lowerLimitFt === 0) {
        dashArray = "8, 6"; // CTR Step Ring
      } else if (props.isVtcTerminalStep) {
        dashArray = "4, 4"; // Terminal Step
      }
      weight = props.lowerLimitFt === 0 ? 2.5 : 2.0;
      badgeClass = "airspace-badge-controlled";
    } else if (props.classification === "CLASS_E") {
      strokeColor = "#8B4513";
      fillColor = "#8B4513";
      fillOpacity = 0.04;
      weight = 1.8;
      dashArray = "12, 6";
      badgeClass = "airspace-badge-classe";
    }

    const poly = L.polygon(coords, {
      color: strokeColor,
      weight: weight,
      dashArray: dashArray,
      fillColor: fillColor,
      fillOpacity: fillOpacity
    });

    // Interactive VNC / VTC Popup
    const popupContent = `
      <div class="airspace-popup-content">
        <div class="airspace-popup-header">
          <span class="airspace-popup-title">${props.name}</span>
          <span class="airspace-popup-class ${badgeClass}">[ ${props.code} ]</span>
        </div>
        <div class="airspace-popup-limits">
          <span>VERTICAL LIMITS:</span>
          <strong>${props.lowerLimitText} — ${props.upperLimitText}</strong>
        </div>
        <div class="airspace-popup-detail"><strong>Controlling Agency:</strong> ${props.controllingAgency || 'Airservices Australia'}</div>
        <div class="airspace-popup-detail"><strong>Frequency:</strong> <span class="airspace-popup-freq">${props.frequency || '124.000 MHz'}</span></div>
        <div class="airspace-popup-detail"><strong>Activity / Type:</strong> ${props.hazardDesc || 'Air Traffic Control Airspace'}</div>
        <div class="airspace-popup-detail" style="color:#ffd54f; margin-top:4px;"><strong>Hours / Status:</strong> ${props.activeHours || 'H24'}</div>
      </div>
    `;

    poly.bindPopup(popupContent, {
      className: 'airspace-leaflet-popup',
      maxWidth: 320
    });

    // Floating VNC / VTC Badge Tag at center of polygon
    const center = props.center || [
      coords.reduce((sum, c) => sum + c[0], 0) / coords.length,
      coords.reduce((sum, c) => sum + c[1], 0) / coords.length
    ];

    const extraTagClass = props.isVtcTerminalStep ? "vtc-step" : "";
    const tagIcon = L.divIcon({
      className: 'leaflet-airspace-tag',
      html: `<div class="airspace-badge-tag ${badgeClass} ${extraTagClass}">[ ${props.badge || props.code} ]</div>`,
      iconAnchor: [45, 10]
    });

    const tagMarker = L.marker(center, { icon: tagIcon });
    tagMarker.on('click', () => poly.openPopup(center));

    mapAirspaceLayer.addLayer(poly);
    mapAirspaceLayer.addLayer(tagMarker);
  });
}

function renderVfrWaypointsOnMap() {
  if (!mapVfrWaypointsLayer || !leafletMap) return;
  mapVfrWaypointsLayer.clearLayers();
  if (!airspaceEngine.showVfrWaypoints) return;

  AUSTRALIAN_VFR_WAYPOINTS.forEach(wpt => {
    const icon = L.divIcon({
      className: 'leaflet-vfr-waypoint-icon',
      html: `<div class="vfr-wpt-badge" title="${wpt.name} (${wpt.desc})"><span class="vfr-wpt-dot"></span>${wpt.id}</div>`,
      iconAnchor: [20, 10]
    });

    const marker = L.marker([wpt.lat, wpt.lon], { icon: icon });
    marker.bindPopup(`
      <div style="font-family:monospace; font-size:12px; color:#fff; padding:4px;">
        <strong style="color:#00e5ff; font-size:13px;">📍 ${wpt.name} [ ${wpt.id} ]</strong><br>
        <span style="color:#9ca3af; font-size:11px;">${wpt.desc}</span><br>
        <span style="color:#ffd54f; font-size:10px;">Coords: ${wpt.lat.toFixed(4)}°, ${wpt.lon.toFixed(4)}° (${wpt.region} VTC)</span>
      </div>
    `, { className: 'airspace-leaflet-popup', maxWidth: 260 });

    mapVfrWaypointsLayer.addLayer(marker);
  });
}

function renderVhfAreasOnMap() {
  if (!mapVhfAreasLayer || !leafletMap) return;
  mapVhfAreasLayer.clearLayers();
  if (!showVhfAreas) return;

  VHF_AREA_SECTORS.features.forEach(feature => {
    const props = feature.properties;
    const coords = feature.geometry.coordinates[0];

    const poly = L.polygon(coords, {
      color: props.color || '#00e5ff',
      weight: 2,
      dashArray: '6, 6',
      fillColor: props.color || '#00e5ff',
      fillOpacity: 0.08
    });

    const tooltipContent = `
      <div style="font-family:monospace; font-size:11px; text-align:center; color:#fff;">
        <strong style="color:${props.color}; font-size:13px;">${props.sectorCode}</strong><br>
        <strong style="font-size:14px; color:#fff;">${props.frequency} MHz</strong><br>
        <span style="color:#9ca3af;">${props.callsign}</span>
      </div>
    `;

    poly.bindTooltip(tooltipContent, {
      permanent: true,
      direction: 'center',
      className: 'leaflet-tooltip-dark'
    });

    mapVhfAreasLayer.addLayer(poly);
  });
}

function renderCtafRingsOnMap() {
  if (!mapCtafRingsLayer || !leafletMap) return;
  mapCtafRingsLayer.clearLayers();
  if (!showCtafRings) return;

  AUSTRALIAN_AIRPORTS.forEach(apt => {
    const radiusNm = apt.ctafRadiusNm || 10.0;
    const radiusMeters = radiusNm * 1852;
    const isHome = apt.icao === userHomeAirport.icao;

    const ring = L.circle([apt.lat, apt.lon], {
      radius: radiusMeters,
      color: isHome ? '#00e676' : '#ffeb3b',
      weight: 1.5,
      dashArray: '4, 4',
      fillColor: isHome ? '#00e676' : '#ffeb3b',
      fillOpacity: 0.04
    });

    ring.bindTooltip(`<strong>${apt.icao} CTAF ${apt.towerFreq}</strong> (${radiusNm} NM)`, {
      permanent: false,
      direction: 'top',
      className: 'leaflet-tooltip-dark'
    });

    mapCtafRingsLayer.addLayer(ring);
  });
}

function renderAirportsOnMap() {
  if (!mapAirportsLayer) return;
  mapAirportsLayer.clearLayers();
  if (!showAirports) return;

  AUSTRALIAN_AIRPORTS.forEach(apt => {
    const isHome = apt.icao === userHomeAirport.icao;
    const isMajor = apt.type.includes("Major") || apt.type.includes("Controlled");
    const markerColor = isHome ? "#00e676" : isMajor ? "#00e5ff" : "#ffeb3b";

    const aptIcon = L.divIcon({
      className: 'leaflet-airport-icon',
      html: `<div style="display:flex; flex-direction:column; align-items:center; transform: translate(-50%, -50%); cursor:pointer;">
               <div style="width: ${isHome ? '20px' : '14px'}; height: ${isHome ? '20px' : '14px'}; border-radius: 50%; background: #000; border: 2px solid ${markerColor}; display:flex; align-items:center; justify-content:center; box-shadow: 0 0 8px ${markerColor};">
                 <div style="width: 5px; height: 5px; border-radius: 50%; background: ${markerColor};"></div>
               </div>
               <span style="background: rgba(0,0,0,0.85); color: ${isHome ? '#00e676' : '#fff'}; font-size: 10px; font-weight: bold; font-family: monospace; padding: 1px 4px; border-radius: 2px; margin-top: 2px; border: 1px solid ${isHome ? '#00e676' : '#374151'};">
                 ${apt.icao} ${isHome ? '⭐ (HOME BASE)' : ''}
               </span>
             </div>`,
      iconSize: [80, 30]
    });

    const marker = L.marker([apt.lat, apt.lon], { icon: aptIcon });
    const popupHtml = `
      <div style="font-family: monospace; font-size: 11px; color: #fff; background: #090d16; padding: 6px; border-radius: 4px; min-width: 200px;">
        <strong style="color:${isHome ? '#00e676' : '#00e5ff'}; font-size: 13px;">${apt.icao} / ${apt.iata}</strong> ${isHome ? '<span style="color:#00e676; font-weight:bold;">[⭐ PRIMARY HOME BASE]</span>' : ''}<br>
        <span style="color:#9ca3af;">${apt.name}</span><hr style="border-color:#374151; margin:4px 0;">
        Elev: <strong>${apt.elevationFt} ft</strong> | CTAF/TWR: <strong style="color:#00e676;">${apt.towerFreq}</strong><br>
        AWIS/ATIS: <strong style="color:#ffeb3b;">${apt.atisFreq || '126.700'}</strong><br>
        Runways: <strong>${apt.runways}</strong><br>
        Surface: <strong>${apt.surface}</strong><br>
        <button onclick="window.divertToAirport('${apt.icao}')" style="margin-top:6px; width:100%; background:#ff1744; color:#fff; border:none; padding:4px; font-weight:bold; cursor:pointer; border-radius:3px;">
          🚨 DIRECT-TO (${apt.icao})
        </button>
      </div>
    `;
    marker.bindPopup(popupHtml, { className: 'airport-leaflet-popup' });
    mapAirportsLayer.addLayer(marker);
  });
}

function updateGlideRangeRing() {
  if (!mapGlideRingLayer || !leafletMap) return;
  mapGlideRingLayer.clearLayers();
  if (!showGlideRing) return;

  const maxGlideNm = (sim.altitudeFt / 6076.12) * currentProfile.bestGlideRatio;
  const maxGlideMeters = maxGlideNm * 1852;

  L.circle([sim.lat, sim.lon], {
    radius: maxGlideMeters,
    color: '#00e676',
    weight: 2,
    fillColor: '#00e676',
    fillOpacity: 0.08,
    dashArray: '6, 6'
  }).bindTooltip(`<strong>MAX GLIDE CONE: ${maxGlideNm.toFixed(1)} NM</strong><br>Alt: ${Math.round(sim.altitudeFt)} ft`, {
    permanent: false,
    direction: 'center',
    className: 'leaflet-tooltip-dark'
  }).addTo(mapGlideRingLayer);
}

function renderRangeRings() {
  if (!mapRangeRingsLayer) return;
  mapRangeRingsLayer.clearLayers();
  if (!showRangeRings) return;

  const nmToMeters = 1852;
  [10, 25, 50].forEach(nm => {
    L.circle([sim.lat, sim.lon], {
      radius: nm * nmToMeters,
      color: '#00e5ff',
      weight: 1,
      fill: false,
      dashArray: '4, 6',
      opacity: 0.35
    }).addTo(mapRangeRingsLayer);
  });
}

// ============================================================================
// 6.1 LIVE PFD FREQUENCY HUD & AERONAUTICAL DIRECTORY MODAL
// ============================================================================
function updatePfdFrequencyHud(tel) {
  const intel = determineActiveFrequencies(tel.latitude, tel.longitude, tel.indicatedAltitude);

  const freqValArea = document.getElementById("freq-val-area");
  const freqNameArea = document.getElementById("freq-name-area");
  const freqValCtaf = document.getElementById("freq-val-ctaf");
  const freqNameCtaf = document.getElementById("freq-name-ctaf");
  const freqBadge = document.getElementById("freq-zone-badge");
  const freqRowCtaf = document.getElementById("freq-row-ctaf");
  const freqRowArea = document.getElementById("freq-row-area");

  if (freqValArea && intel.fia) {
    freqValArea.textContent = intel.fia.frequency;
    freqNameArea.textContent = `(${intel.fia.callsign})`;
  }

  if (freqValCtaf && intel.ctaf) {
    const freqMatch = intel.ctaf.towerFreq.match(/[\d.]+/);
    freqValCtaf.textContent = freqMatch ? freqMatch[0] : intel.ctaf.towerFreq;
    freqNameCtaf.textContent = `(${intel.ctaf.icao} ${intel.ctaf.distanceNm.toFixed(1)} NM)`;
  }

  if (intel.isCtafActive) {
    if (freqBadge) {
      freqBadge.textContent = "IN CTAF ZONE";
      freqBadge.className = "freq-badge-ctaf";
    }
    if (freqRowCtaf) freqRowCtaf.className = "freq-row active-ctaf";
    if (freqRowArea) freqRowArea.className = "freq-row";

    if (!lastCtafZoneActive) {
      lastCtafZoneActive = true;
      const chkCtaf = document.getElementById("chk-ctaf-alert");
      if (!chkCtaf || chkCtaf.checked) {
        audioSynth.playDivertChime();
        if (navigator.vibrate) { try { navigator.vibrate([100, 50, 100]); } catch(e) {} }
      }
    }
  } else {
    if (freqBadge) {
      freqBadge.textContent = "EN-ROUTE FIA";
      freqBadge.className = "freq-badge-enroute";
    }
    if (freqRowCtaf) freqRowCtaf.className = "freq-row";
    if (freqRowArea) freqRowArea.className = "freq-row active-area";
    lastCtafZoneActive = false;
  }
}

function openFrequencyDirectoryModal() {
  const intel = determineActiveFrequencies(sim.lat, sim.lon, sim.altitudeFt);
  const modal = document.getElementById("frequency-directory-modal");
  if (!modal) return;

  const fiaName = document.getElementById("modal-fia-name");
  const fiaCallsign = document.getElementById("modal-fia-callsign");
  const fiaFreq = document.getElementById("modal-fia-freq");
  const boundaryAlert = document.getElementById("modal-boundary-alert");

  if (fiaName) fiaName.textContent = intel.fia.name;
  if (fiaCallsign) fiaCallsign.textContent = intel.fia.callsign;
  if (fiaFreq) fiaFreq.textContent = intel.fia.frequency;

  if (boundaryAlert) {
    if (intel.isCtafActive) {
      boundaryAlert.textContent = `🚨 INSIDE ${intel.ctaf.icao} CTAF ZONE (${intel.ctaf.distanceNm.toFixed(1)} NM) - BROADCAST INBOUND CALL ON ${intel.ctaf.towerFreq}`;
      boundaryAlert.style.borderColor = "#00e676";
      boundaryAlert.style.color = "#00e676";
    } else {
      boundaryAlert.textContent = `✓ EN-ROUTE SECTOR BOUNDARY ACTIVE | Nearest CTAF: ${intel.ctaf.icao} (${intel.ctaf.distanceNm.toFixed(1)} NM)`;
      boundaryAlert.style.borderColor = "#00e5ff";
      boundaryAlert.style.color = "#00e5ff";
    }
  }

  const tbody = document.getElementById("nearby-freq-tbody");
  if (tbody) {
    const nearby = AUSTRALIAN_AIRPORTS.map(apt => {
      const dist = calculateDistanceNm(sim.lat, sim.lon, apt.lat, apt.lon);
      const brg = calculateBearingDeg(sim.lat, sim.lon, apt.lat, apt.lon);
      return { ...apt, dist, brg };
    }).sort((a, b) => a.dist - b.dist);

    tbody.innerHTML = "";
    nearby.slice(0, 10).forEach(apt => {
      const isInside = apt.dist <= (apt.ctafRadiusNm || 10.0);
      const isHome = apt.icao === userHomeAirport.icao;
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong style="color:${isHome ? '#00e676' : '#00e5ff'};">${apt.icao}</strong> <span style="font-size:9px; color:#9ca3af;">${apt.name}</span></td>
        <td><strong>${apt.dist.toFixed(1)} NM</strong> / ${Math.round(apt.brg)}°</td>
        <td><strong style="color:#00e676;">${apt.towerFreq}</strong></td>
        <td><span style="color:#ffeb3b;">${apt.atisFreq || '126.700'}</span></td>
        <td style="font-size:9px; color:#9ca3af;">${apt.runways}</td>
        <td>${isInside ? '<span class="badge-ctaf-active">ACTIVE CTAF</span>' : '<span style="color:#6b7280; font-size:9px;">EN-ROUTE</span>'}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  modal.classList.remove("hidden");
}

function updateRouteOnMap() {
  if (mapRouteLine) {
    mapRouteLine.setLatLngs(sim.routeWaypoints.map(w => [w.lat, w.lon]));
    if (sim.isEmergencyDivert) {
      mapRouteLine.setStyle({ color: '#ff1744', weight: 5, dashArray: '4, 4' });
    } else {
      mapRouteLine.setStyle({ color: '#e040fb', weight: 4, dashArray: '8, 8' });
    }
  }
  const nameElem = document.getElementById("map-route-name");
  if (nameElem) {
    nameElem.textContent = sim.routeWaypoints.map(w => w.id).join(" → ");
  }
}

// ============================================================================
// 6.2 FLIGHT PLAN ROUTE LOCK & TAP ACCIDENTAL PROTECTION ENGINE
// ============================================================================
let isRouteLocked = localStorage.getItem("efis_route_locked") === "true";

function toggleRouteLock(forcedState = null) {
  if (typeof forcedState === "boolean") {
    isRouteLocked = forcedState;
  } else {
    isRouteLocked = !isRouteLocked;
  }
  localStorage.setItem("efis_route_locked", isRouteLocked);
  updateRouteLockUI();

  if (isRouteLocked) {
    if (navigator.vibrate) { try { navigator.vibrate(40); } catch(e) {} }
  } else {
    if (navigator.vibrate) { try { navigator.vibrate([30, 30, 30]); } catch(e) {} }
  }
}

function updateRouteLockUI() {
  const btnLock = document.getElementById("btn-lock-route");
  const badgeLock = document.getElementById("map-route-lock-badge");
  const hudBtnLock = document.getElementById("btn-map-lock-route");
  const btnAddWpt = document.getElementById("btn-add-waypoint");

  if (btnLock) {
    btnLock.classList.toggle("locked", isRouteLocked);
    btnLock.classList.toggle("active", isRouteLocked);
    btnLock.classList.toggle("unlocked", !isRouteLocked);
    btnLock.textContent = isRouteLocked ? "🔒 Route Locked" : "🔓 Route Unlocked (Tap to Fix)";
    btnLock.title = isRouteLocked 
      ? "Route is LOCKED (Tap to unlock for editing)" 
      : "Route is UNLOCKED (Map taps will add custom fixes)";
  }

  if (badgeLock) {
    badgeLock.classList.toggle("locked", isRouteLocked);
    badgeLock.classList.toggle("active", isRouteLocked);
    badgeLock.classList.toggle("unlocked", !isRouteLocked);
    badgeLock.textContent = isRouteLocked ? "[ 🔒 ROUTE LOCKED ]" : "[ 🔓 ROUTE UNLOCKED ]";
    badgeLock.title = isRouteLocked 
      ? "Route is LOCKED against accidental map taps. Tap to unlock." 
      : "Route is UNLOCKED. Tap to lock.";
  }

  if (hudBtnLock) {
    hudBtnLock.classList.toggle("active", isRouteLocked);
    hudBtnLock.textContent = isRouteLocked ? "🔒 Route: Locked" : "🔓 Route: Unlocked";
  }

  if (btnAddWpt) {
    btnAddWpt.style.opacity = isRouteLocked ? "0.6" : "1.0";
    btnAddWpt.title = isRouteLocked 
      ? "Route is currently locked. Click to unlock and add custom fix." 
      : "Click map to insert a custom waypoint fix";
  }
}

// ============================================================================
// 7. EMERGENCY NEAREST & DIRECT HOME
// ============================================================================
function getRankedNearestAirports() {
  const curLat = sim.lat;
  const curLon = sim.lon;
  const curAlt = sim.altitudeFt;
  const glideRatio = currentProfile.bestGlideRatio;

  const ranked = AUSTRALIAN_AIRPORTS.map(apt => {
    const distNm = calculateDistanceNm(curLat, curLon, apt.lat, apt.lon);
    const brgDeg = calculateBearingDeg(curLat, curLon, apt.lat, apt.lon);
    const heightAboveApt = Math.max(0, curAlt - apt.elevationFt);
    const maxGlideNm = (heightAboveApt / 6076.12) * glideRatio;
    const canGlide = distNm <= maxGlideNm;
    const eteSec = (distNm / Math.max(sim.groundSpeedKt, 60)) * 3600;

    return {
      ...apt,
      distanceNm: distNm,
      bearingDeg: brgDeg,
      canGlide,
      maxGlideNm,
      eteSec
    };
  });

  ranked.sort((a, b) => a.distanceNm - b.distanceNm);
  return ranked;
}

function triggerEmergencyDivert() {
  const ranked = getRankedNearestAirports();
  if (ranked.length === 0) return;
  const nearest = ranked[0];

  sim.destIdent = nearest.icao;
  sim.destLat = nearest.lat;
  sim.destLon = nearest.lon;
  sim.isEmergencyDivert = true;

  sim.routeWaypoints = [
    { id: "PRESENT-POS", name: "Emergency Point", lat: sim.lat, lon: sim.lon },
    { id: nearest.icao, name: nearest.name, lat: nearest.lat, lon: nearest.lon }
  ];

  updateRouteOnMap();
  audioSynth.playDivertChime();

  populateEmergencyDrawer(ranked);
  document.getElementById("emergency-nrst-drawer")?.classList.remove("hidden");

  if (leafletMap) leafletMap.flyTo([sim.lat, sim.lon], 10);
  switchToScreen(1);
}

function triggerDirectHome() {
  window.divertToAirport(userHomeAirport.icao);
  if (leafletMap) leafletMap.flyTo([userHomeAirport.lat, userHomeAirport.lon], 9);
}

window.divertToAirport = function(icao) {
  const apt = AUSTRALIAN_AIRPORTS.find(a => a.icao === icao);
  if (!apt) return;

  sim.destIdent = apt.icao;
  sim.destLat = apt.lat;
  sim.destLon = apt.lon;
  sim.isEmergencyDivert = true;

  sim.routeWaypoints = [
    { id: "PRESENT-POS", name: "Divert Origin", lat: sim.lat, lon: sim.lon },
    { id: apt.icao, name: apt.name, lat: apt.lat, lon: apt.lon }
  ];

  updateRouteOnMap();
  audioSynth.playDivertChime();
  document.getElementById("emergency-nrst-drawer")?.classList.add("hidden");
};

function populateEmergencyDrawer(rankedAirports) {
  const listContainer = document.getElementById("nrst-airports-list");
  if (!listContainer) return;

  const altVal = document.getElementById("nrst-alt-val");
  if (altVal) altVal.textContent = `${Math.round(sim.altitudeFt)} ft`;
  listContainer.innerHTML = "";

  rankedAirports.slice(0, 8).forEach((apt, idx) => {
    const card = document.createElement("div");
    card.className = `airport-card ${apt.canGlide ? 'in-glide-range' : 'beyond-glide-range'}`;

    const mins = Math.floor(apt.eteSec / 60);
    const secs = Math.floor(apt.eteSec % 60);
    const eteStr = `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;

    card.innerHTML = `
      <div class="apt-card-top">
        <span class="apt-icao">${idx + 1}. ${apt.icao} (${apt.iata}) ${apt.icao === userHomeAirport.icao ? '⭐ (HOME BASE)' : ''}</span>
        <span class="apt-dist">${apt.distanceNm.toFixed(1)} NM @ ${apt.bearingDeg.toFixed(0)}°</span>
      </div>
      <div class="apt-name">${apt.name}</div>
      <div class="apt-details-row">
        <span>FREQ: <strong style="color:#00e676;">${apt.towerFreq}</strong></span>
        <span>RWY: <strong>${apt.runways}</strong></span>
        <span>ETE: <strong>${eteStr}</strong></span>
      </div>
      <div class="apt-details-row" style="margin-top:3px;">
        <span>Elev: ${apt.elevationFt} ft</span>
        <span class="apt-badge-glide ${apt.canGlide ? 'badge-glide-ok' : 'badge-glide-warn'}">
          ${apt.canGlide ? '✓ IN GLIDE CONE' : '⚠ BEYOND GLIDE'}
        </span>
      </div>
      <button class="btn-divert-now" onclick="window.divertToAirport('${apt.icao}')">
        DIRECT-TO ${apt.icao} ➔
      </button>
    `;
    listContainer.appendChild(card);
  });
}

// ============================================================================
// 8. HOME AIRPORT SETTINGS INITIALIZATION
// ============================================================================
function initHomeAirportSettings() {
  const select = document.getElementById("select-home-airport");
  if (!select) return;

  select.innerHTML = "";
  AUSTRALIAN_AIRPORTS.forEach(apt => {
    const opt = document.createElement("option");
    opt.value = apt.icao;
    opt.textContent = `${apt.icao} - ${apt.name} (${apt.elevationFt} ft)`;
    if (apt.icao === userHomeAirport.icao) opt.selected = true;
    select.appendChild(opt);
  });

  updateHomeAirportDisplay();

  document.getElementById("btn-save-home-airport")?.addEventListener("click", () => {
    const selectedIcao = select.value;
    const found = AUSTRALIAN_AIRPORTS.find(a => a.icao === selectedIcao);
    if (found) {
      userHomeAirport = found;
      localStorage.setItem("efis_home_airport", found.icao);
      updateHomeAirportDisplay();
      renderAirportsOnMap();
      alert(`⭐ Home Airport updated to: ${found.icao} - ${found.name}`);
    }
  });

  // Turn Coordinator Toggle Setup
  const btnTurnCoord = document.getElementById("btn-cfg-turn-coord");
  if (btnTurnCoord) {
    btnTurnCoord.textContent = showTurnCoordinator ? "ENABLED (ON)" : "DISABLED (OFF)";
    btnTurnCoord.classList.toggle("active", showTurnCoordinator);
    btnTurnCoord.addEventListener("click", function() {
      showTurnCoordinator = !showTurnCoordinator;
      localStorage.setItem("efis_show_turn_coord", showTurnCoordinator);
      this.textContent = showTurnCoordinator ? "ENABLED (ON)" : "DISABLED (OFF)";
      this.classList.toggle("active", showTurnCoordinator);
    });
  }

  // G-Meter Readout Toggle Setup
  const btnGMeter = document.getElementById("btn-cfg-g-meter");
  if (btnGMeter) {
    btnGMeter.textContent = showGMeter ? "ENABLED (ON)" : "DISABLED (OFF)";
    btnGMeter.classList.toggle("active", showGMeter);
    btnGMeter.addEventListener("click", function() {
      showGMeter = !showGMeter;
      localStorage.setItem("efis_show_g_meter", showGMeter);
      this.textContent = showGMeter ? "ENABLED (ON)" : "DISABLED (OFF)";
      this.classList.toggle("active", showGMeter);
    });
  }

  // Synthetic Vision Toggle in Settings
  const btnCfgSvt = document.getElementById("btn-cfg-svt");
  if (btnCfgSvt) {
    btnCfgSvt.textContent = isSyntheticVisionEnabled ? "ENABLED (Garmin 3D)" : "CLASSIC HORIZON";
    btnCfgSvt.classList.toggle("active", isSyntheticVisionEnabled);
    btnCfgSvt.addEventListener("click", function() {
      isSyntheticVisionEnabled = !isSyntheticVisionEnabled;
      isMapBackdropEnabled = isSyntheticVisionEnabled;
      this.textContent = isSyntheticVisionEnabled ? "ENABLED (Garmin 3D)" : "CLASSIC HORIZON";
      this.classList.toggle("active", isSyntheticVisionEnabled);

      const topBtn = document.getElementById("btn-toggle-svt");
      if (topBtn) {
        topBtn.classList.toggle("active", isSyntheticVisionEnabled);
        topBtn.textContent = isSyntheticVisionEnabled ? "3D SYNTHETIC VISION + MAP" : "CLASSIC EFIS HORIZON";
      }
    });
  }

  // Flight Path Marker Toggle
  const btnCfgFpm = document.getElementById("btn-cfg-fpm");
  if (btnCfgFpm) {
    btnCfgFpm.addEventListener("click", function() {
      showFlightPathMarker = !showFlightPathMarker;
      this.textContent = showFlightPathMarker ? "VISIBLE" : "HIDDEN";
      this.classList.toggle("active", showFlightPathMarker);
    });
  }
}

function updateHomeAirportDisplay() {
  const displayTitle = document.getElementById("home-apt-display");
  const displayDetails = document.getElementById("home-apt-details");
  if (displayTitle && userHomeAirport) {
    displayTitle.textContent = `${userHomeAirport.icao} (${userHomeAirport.iata}) - ${userHomeAirport.name}`;
  }
  if (displayDetails && userHomeAirport) {
    displayDetails.textContent = `Elev: ${userHomeAirport.elevationFt} ft | CTAF: ${userHomeAirport.towerFreq} | Rwy: ${userHomeAirport.runways}`;
  }
}

// ============================================================================
// 8.1 AIRCRAFT PROFILE MANAGEMENT & CUSTOM AIRFRAME EDITOR
// ============================================================================
function selectAircraftProfile(profileId, persist = true) {
  if (!AIRCRAFT_PROFILES[profileId]) return;
  currentProfile = AIRCRAFT_PROFILES[profileId];

  if (persist) {
    localStorage.setItem("efis_active_profile_id", profileId);
  }

  // Update Callsign
  sim.callsign = currentProfile.callsign || "VH-TRE";

  // Update V-Speed Metrics Grid in Settings
  const vSoEl = document.getElementById("v-so");
  const vSEl = document.getElementById("v-s");
  const vXEl = document.getElementById("v-x");
  const vYEl = document.getElementById("v-y");
  const vFeEl = document.getElementById("v-fe");
  const vNoEl = document.getElementById("v-no");
  const vNeEl = document.getElementById("v-ne");

  if (vSoEl) vSoEl.textContent = `${Math.round(currentProfile.vSo)} kt`;
  if (vSEl) vSEl.textContent = `${Math.round(currentProfile.vS)} kt`;
  if (vXEl) vXEl.textContent = `${Math.round(currentProfile.vX)} kt`;
  if (vYEl) vYEl.textContent = `${Math.round(currentProfile.vY)} kt`;
  if (vFeEl) vFeEl.textContent = `${Math.round(currentProfile.vFe)} kt`;
  if (vNoEl) vNoEl.textContent = `${Math.round(currentProfile.vNo)} kt`;
  if (vNeEl) vNeEl.textContent = `${Math.round(currentProfile.vNe)} kt`;

  // Update Profile Chips Active State
  renderAircraftProfileChips();

  // Invalidate Map Glide Cones & PFD Airspeed Tape Arcs
  updateGlideRangeRing();
  resizeCanvases();
}

function renderAircraftProfileChips() {
  const container = document.getElementById("profile-chips-container");
  if (!container) return;

  container.innerHTML = "";

  Object.keys(AIRCRAFT_PROFILES).forEach(id => {
    const prof = AIRCRAFT_PROFILES[id];
    const isAct = prof.id === currentProfile.id;

    const btn = document.createElement("button");
    btn.className = `profile-chip ${prof.isCustom ? 'custom-chip' : ''} ${isAct ? 'active' : ''}`;
    btn.setAttribute("data-profile", prof.id);
    btn.innerHTML = `
      <span>${prof.name} (${prof.callsign || prof.id.toUpperCase()})</span>
      ${prof.isCustom ? `<span class="profile-chip-delete" title="Delete custom profile" data-delete-id="${prof.id}">✕</span>` : ''}
    `;

    btn.addEventListener("click", (e) => {
      if (e.target.classList.contains("profile-chip-delete")) {
        e.stopPropagation();
        deleteCustomAircraftProfile(prof.id);
        return;
      }
      selectAircraftProfile(prof.id);
    });

    container.appendChild(btn);
  });
}

function deleteCustomAircraftProfile(profileId) {
  if (!AIRCRAFT_PROFILES[profileId] || !AIRCRAFT_PROFILES[profileId].isCustom) return;
  const name = AIRCRAFT_PROFILES[profileId].name;
  if (!confirm(`Are you sure you want to delete custom profile: "${name}"?`)) return;

  delete AIRCRAFT_PROFILES[profileId];
  saveCustomAircraftProfilesToStorage();

  if (currentProfile.id === profileId) {
    selectAircraftProfile("c172");
  } else {
    renderAircraftProfileChips();
  }
}

function initCustomProfileModal() {
  const modal = document.getElementById("custom-profile-modal");
  const openBtn = document.getElementById("btn-open-custom-profile-modal");
  const closeBtn = document.getElementById("btn-close-custom-profile-modal");
  const cancelBtn = document.getElementById("btn-cancel-custom-profile");
  const saveBtn = document.getElementById("btn-save-custom-profile");

  if (openBtn && modal) {
    openBtn.addEventListener("click", () => {
      // Pre-fill with current profile values as template
      const nameInput = document.getElementById("input-profile-name");
      if (nameInput) nameInput.value = "";
      document.getElementById("input-profile-callsign").value = currentProfile.callsign || "VH-EXP";
      document.getElementById("input-profile-type").value = currentProfile.type || "light_ga";
      document.getElementById("input-profile-glide-ratio").value = currentProfile.bestGlideRatio || 9.5;
      document.getElementById("input-profile-glide-speed").value = currentProfile.bestGlideSpeedKt || 70;
      document.getElementById("input-profile-vso").value = currentProfile.vSo || 42;
      document.getElementById("input-profile-vs").value = currentProfile.vS || 49;
      document.getElementById("input-profile-vx").value = currentProfile.vX || 65;
      document.getElementById("input-profile-vy").value = currentProfile.vY || 76;
      document.getElementById("input-profile-vfe").value = currentProfile.vFe || 88;
      document.getElementById("input-profile-va").value = currentProfile.vA || 110;
      document.getElementById("input-profile-vno").value = currentProfile.vNo || 130;
      document.getElementById("input-profile-vne").value = currentProfile.vNe || 165;
      document.getElementById("input-profile-g-pos").value = currentProfile.maxPositiveG || 3.8;
      document.getElementById("input-profile-g-neg").value = currentProfile.maxNegativeG || -1.5;

      modal.classList.remove("hidden");
      setTimeout(() => nameInput?.focus(), 100);
    });
  }

  const closeModal = () => {
    if (modal) modal.classList.add("hidden");
  };

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (cancelBtn) cancelBtn.addEventListener("click", closeModal);

  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      const nameInput = document.getElementById("input-profile-name");
      const name = nameInput?.value.trim();
      if (!name) {
        alert("Please enter a name for the aircraft profile (e.g. 'Sling 4 TSi').");
        nameInput?.focus();
        return;
      }

      const id = `custom_${Date.now()}`;
      const callsign = document.getElementById("input-profile-callsign")?.value.trim().toUpperCase() || "VH-EXP";
      const type = document.getElementById("input-profile-type")?.value || "light_ga";
      const bestGlideRatio = parseFloat(document.getElementById("input-profile-glide-ratio")?.value) || 9.5;
      const bestGlideSpeedKt = parseFloat(document.getElementById("input-profile-glide-speed")?.value) || 70;
      const vSo = parseFloat(document.getElementById("input-profile-vso")?.value) || 42;
      const vS = parseFloat(document.getElementById("input-profile-vs")?.value) || 49;
      const vX = parseFloat(document.getElementById("input-profile-vx")?.value) || 65;
      const vY = parseFloat(document.getElementById("input-profile-vy")?.value) || 76;
      const vFe = parseFloat(document.getElementById("input-profile-vfe")?.value) || 88;
      const vA = parseFloat(document.getElementById("input-profile-va")?.value) || 110;
      const vNo = parseFloat(document.getElementById("input-profile-vno")?.value) || 130;
      const vNe = parseFloat(document.getElementById("input-profile-vne")?.value) || 165;
      const maxPositiveG = parseFloat(document.getElementById("input-profile-g-pos")?.value) || 3.8;
      const maxNegativeG = parseFloat(document.getElementById("input-profile-g-neg")?.value) || -1.5;

      AIRCRAFT_PROFILES[id] = {
        id,
        name,
        callsign,
        type,
        vSo,
        vS,
        vX,
        vY,
        vFe,
        vA,
        vNo,
        vNe,
        bestGlideRatio,
        bestGlideSpeedKt,
        maxPositiveG,
        maxNegativeG,
        isCustom: true
      };

      saveCustomAircraftProfilesToStorage();
      selectAircraftProfile(id);
      closeModal();

      if (audioSynth && typeof audioSynth.playDivertChime === 'function') {
        audioSynth.playDivertChime();
      }
    });
  }
}

function bootEfisSuite() {
  resizeCanvases();
  initHoldGestureDetector();
  initLeafletFlightMap();
  initHomeAirportSettings();
  initCustomProfileModal();
  initTwoFingerSwipeNavigation();
  initFullscreenToggle();
  applyOrientationMode(currentOrientationIndex, false);
  updateTrafficLegendVisibility();
  updateTrafficFilterUI();
  updateAirspaceFilterUI();
  selectAircraftProfile(currentProfile.id, false);
  switchToScreen(0, false);
}
let lastTime = performance.now();

function mainLoop(now) {
  const dt = Math.min(0.05, Math.max(0.005, (now - lastTime) / 1000.0));
  lastTime = now;

  const tel = sim.update(dt);
  const renderTel = uiInterpolator.update(tel, dt);

  // Blackbox auto-recording
  if (tel.groundSpeed > 20 && !recorder.isRecording) {
    recorder.start();
    document.getElementById("rec-status")?.classList.add("live");
    const recBtn = document.getElementById("btn-rec-toggle");
    if (recBtn) {
      recBtn.classList.add("recording");
      recBtn.textContent = "■ STOP RECORDING";
    }
  }
  if (recorder.isRecording) {
    recorder.durationSec += dt;
    recorder.record(tel);
    const mins = Math.floor(recorder.durationSec / 60);
    const secs = Math.floor(recorder.durationSec % 60);
    const recText = document.getElementById("rec-timer-text");
    if (recText) {
      recText.textContent = `REC ${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
  }

  // Stall alert
  const warnBanner = document.getElementById("warning-banner");
  if (warnBanner) {
    if (tel.isStall) {
      warnBanner.textContent = "STALL WARNING";
      warnBanner.classList.remove("hidden");
      const stallChk = document.getElementById("chk-stall-horn");
      if (stallChk && stallChk.checked) {
        audioSynth.startStallHorn();
      }
    } else if (tel.isOverspeed) {
      warnBanner.textContent = "OVERSPEED VNE";
      warnBanner.classList.remove("hidden");
    } else {
      warnBanner.classList.add("hidden");
      audioSynth.stopStallHorn();
    }
  }

  // Update Live Map Marker with smoothed attitude & position
  if (mapAirplaneMarker) {
    mapAirplaneMarker.setLatLng([renderTel.latitude, renderTel.longitude]);
    const iconElement = mapAirplaneMarker.getElement()?.querySelector('svg');
    if (iconElement) {
      iconElement.style.transform = `rotate(${renderTel.heading}deg)`;
    }
  }

  updateGlideRangeRing();
  renderRangeRings();

  // Update Live PFD VHF Frequency Status Block
  updatePfdFrequencyHud(renderTel);

  // Update Live ADS-B Traffic Manager & Collision Avoidance
  trafficMgr.update(dt, renderTel.latitude, renderTel.longitude, renderTel.indicatedAltitude, renderTel.heading, renderTel.groundSpeed);
  renderTrafficOnMap();

  const adsbStatusText = document.getElementById("adsb-status-text");
  if (adsbStatusText) {
    adsbStatusText.textContent = `ADS-B: ${trafficMgr.targets.size} TRK`;
  }

  // Update Cockpit & PFD TCAS Traffic Warnings
  const trafficBanner = document.getElementById("traffic-warning-banner");
  const pfdCallout = document.getElementById("pfd-traffic-callout");
  const pfdCalloutText = document.getElementById("pfd-traffic-callout-text");

  if (trafficMgr.highestThreatLevel === "RESOLUTION_ADVISORY" && trafficMgr.highestThreatTarget) {
    const tgt = trafficMgr.highestThreatTarget;
    const relBrg = (tgt.bearingDeg - renderTel.heading + 360) % 360;
    let clock = Math.round(relBrg / 30);
    if (clock === 0) clock = 12;
    const altStr = `${tgt.relAltFt >= 0 ? '+' : ''}${Math.round(tgt.relAltFt)} FT`;

    if (trafficBanner) {
      trafficBanner.textContent = "TCAS: COLLISION ALERT";
      trafficBanner.className = "traffic-warning-banner collision";
    }
    if (pfdCallout && pfdCalloutText) {
      pfdCalloutText.textContent = `TRAFFIC ${clock} O'CLOCK, ${tgt.distNm.toFixed(1)} NM, ${altStr}`;
      pfdCallout.className = "pfd-traffic-callout";
    }
  } else if (trafficMgr.highestThreatLevel === "TRAFFIC_ADVISORY" && trafficMgr.highestThreatTarget) {
    const tgt = trafficMgr.highestThreatTarget;
    const relBrg = (tgt.bearingDeg - renderTel.heading + 360) % 360;
    let clock = Math.round(relBrg / 30);
    if (clock === 0) clock = 12;
    const altStr = `${tgt.relAltFt >= 0 ? '+' : ''}${Math.round(tgt.relAltFt)} FT`;

    if (trafficBanner) {
      trafficBanner.textContent = "TRAFFIC ADVISORY";
      trafficBanner.className = "traffic-warning-banner";
    }
    if (pfdCallout && pfdCalloutText) {
      pfdCalloutText.textContent = `TRAFFIC ${clock} O'CLOCK, ${tgt.distNm.toFixed(1)} NM, ${altStr}`;
      pfdCallout.className = "pfd-traffic-callout advisory";
    }
  } else {
    if (trafficBanner) trafficBanner.classList.add("hidden");
    if (pfdCallout) pfdCallout.classList.add("hidden");
  }

  // Update Real-Time Airspace Penetration & Proximity Engine
  const airspaceStatus = airspaceEngine.evaluate(renderTel.latitude, renderTel.longitude, renderTel.indicatedAltitude, renderTel.heading, renderTel.groundSpeed);
  const airspaceBanner = document.getElementById("airspace-warning-banner");
  const pfdAirspaceCallout = document.getElementById("pfd-airspace-callout");
  const pfdAirspaceText = document.getElementById("pfd-airspace-callout-text");

  if (airspaceStatus.penetration) {
    const pen = airspaceStatus.penetration;
    const penLimits = `${pen.lowerLimitText} - ${pen.upperLimitText}`;
    let bannerClass = "airspace-warning-banner";
    let pfdClass = "pfd-airspace-callout";

    if (pen.classification === "RESTRICTED") {
      bannerClass += "";
      pfdClass += "";
    } else if (pen.classification === "MIL_CTR") {
      bannerClass += " mil";
      pfdClass += " mil";
    } else if (pen.classification === "CLASS_C" || pen.classification === "CLASS_D") {
      bannerClass += " controlled";
      pfdClass += " controlled";
    } else if (pen.classification === "DANGER") {
      bannerClass += " danger";
      pfdClass += " danger";
    }

    if (airspaceBanner) {
      airspaceBanner.textContent = `INSIDE ${pen.code} (${penLimits})`;
      airspaceBanner.className = bannerClass;
    }
    if (pfdAirspaceCallout && pfdAirspaceText) {
      pfdAirspaceText.textContent = `INSIDE ${pen.name.toUpperCase()} (${penLimits})`;
      pfdAirspaceCallout.className = pfdClass;
    }
  } else if (airspaceStatus.proximity) {
    const prox = airspaceStatus.proximity;
    if (airspaceBanner) {
      airspaceBanner.textContent = `AIRSPACE: ${prox.code} ${prox.distNm.toFixed(1)} NM`;
      airspaceBanner.className = "airspace-warning-banner proximity";
    }
    if (pfdAirspaceCallout && pfdAirspaceText) {
      pfdAirspaceText.textContent = `AIRSPACE AHEAD: ${prox.code} ${prox.distNm.toFixed(1)} NM (${prox.lowerLimitText}-${prox.upperLimitText})`;
      pfdAirspaceCallout.className = "pfd-airspace-callout proximity";
    }
  } else {
    if (airspaceBanner) airspaceBanner.classList.add("hidden");
    if (pfdAirspaceCallout) pfdAirspaceCallout.classList.add("hidden");
  }

  // Render Upper PFD & Lower HSI with Interpolated Decoupled 60 FPS Telemetry
  if (canvasPfdMaster && ensureCanvasDimensions(canvasPfdMaster)) {
    renderPfdMaster(canvasPfdMaster.getContext("2d"), renderTel, canvasPfdMaster.width, canvasPfdMaster.height);
  }
  if (canvasHsiMaster && ensureCanvasDimensions(canvasHsiMaster)) {
    renderHsiMaster(canvasHsiMaster.getContext("2d"), renderTel, canvasHsiMaster.width, canvasHsiMaster.height);
  }
  if (canvasChart && ensureCanvasDimensions(canvasChart)) {
    renderTelemetryChart(canvasChart.getContext("2d"), canvasChart.width, canvasChart.height);
  }

  requestAnimationFrame(mainLoop);
}

// Start Main Loop Immediately
requestAnimationFrame(mainLoop);

function updateTrafficLegendVisibility() {
  const legend = document.getElementById("map-traffic-altitude-legend");
  if (legend) {
    if (trafficMgr && trafficMgr.showTraffic) {
      legend.classList.remove("hidden");
    } else {
      legend.classList.add("hidden");
    }
  }
}

function bootEfisSuite() {
  resizeCanvases();
  initHoldGestureDetector();
  initLeafletFlightMap();
  initHomeAirportSettings();
  initTwoFingerSwipeNavigation();
  initFullscreenToggle();
  applyOrientationMode(currentOrientationIndex, false);
  updateTrafficLegendVisibility();
  updateTrafficFilterUI();
  switchToScreen(0, false);
}

if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", bootEfisSuite);
} else {
  bootEfisSuite();
}

// ============================================================================
// 10. USER INTERFACE EVENTS & VIEW TOGGLES
// ============================================================================

// Map HUD Controls Menu Toggle (3-Line Hamburger Button)
const btnToggleMapHud = document.getElementById("btn-toggle-map-hud");
const mapHudControls = document.getElementById("map-hud-controls");
if (btnToggleMapHud && mapHudControls) {
  btnToggleMapHud.addEventListener("click", function(e) {
    e.stopPropagation();
    mapHudControls.classList.toggle("minimized");
    mapHudControls.classList.toggle("expanded");
    const isExpanded = mapHudControls.classList.contains("expanded");
    const chevron = document.getElementById("hud-menu-chevron");
    if (chevron) {
      chevron.textContent = isExpanded ? "▲" : "▼";
    }
  });
}

// ADSBexchange Aircraft Inspector Controls
document.getElementById("btn-close-inspector")?.addEventListener("click", deselectAircraftTarget);
document.getElementById("btn-insp-follow")?.addEventListener("click", function() {
  isFollowingSelectedTarget = !isFollowingSelectedTarget;
  this.classList.toggle("active", isFollowingSelectedTarget);
  this.textContent = isFollowingSelectedTarget ? "🎯 Following" : "🎯 Follow";
  if (isFollowingSelectedTarget && selectedTargetHex && leafletMap) {
    const tgt = trafficMgr.targets.get(selectedTargetHex);
    if (tgt) leafletMap.setView([tgt.latitude, tgt.longitude], 10);
  }
});

// Live Web Feed Toggle (Multi-Source ADS-B Traffic Pipeline)
document.getElementById("btn-map-live-feed")?.addEventListener("click", function() {
  trafficMgr.toggleLiveFeed();
  if (audioSynth && typeof audioSynth.playDivertChime === 'function') {
    audioSynth.playDivertChime();
  }
});
document.getElementById("btn-cfg-live-feed")?.addEventListener("click", function() {
  trafficMgr.toggleLiveFeed();
  if (audioSynth && typeof audioSynth.playDivertChime === 'function') {
    audioSynth.playDivertChime();
  }
});

// ADS-B Traffic Directory & Map Controls
document.getElementById("adsb-status")?.addEventListener("click", openTrafficDirectoryModal);
document.getElementById("btn-show-traffic-dir")?.addEventListener("click", openTrafficDirectoryModal);
document.getElementById("btn-close-traffic-modal")?.addEventListener("click", () => {
  document.getElementById("traffic-directory-modal")?.classList.add("hidden");
});
document.getElementById("btn-traffic-close-footer")?.addEventListener("click", () => {
  document.getElementById("traffic-directory-modal")?.classList.add("hidden");
});

document.getElementById("btn-map-traffic")?.addEventListener("click", function() {
  trafficMgr.showTraffic = !trafficMgr.showTraffic;
  localStorage.setItem("efis_show_traffic", trafficMgr.showTraffic);
  this.classList.toggle("active", trafficMgr.showTraffic);
  this.textContent = trafficMgr.showTraffic ? "ADS-B Traffic: ON" : "ADS-B Traffic: OFF";
  updateTrafficLegendVisibility();
  renderTrafficOnMap();
});

document.getElementById("btn-cfg-traffic")?.addEventListener("click", function() {
  trafficMgr.showTraffic = !trafficMgr.showTraffic;
  localStorage.setItem("efis_show_traffic", trafficMgr.showTraffic);
  this.classList.toggle("active", trafficMgr.showTraffic);
  this.textContent = trafficMgr.showTraffic ? "ENABLED (ON)" : "DISABLED (OFF)";
  const mapTrafficBtn = document.getElementById("btn-map-traffic");
  if (mapTrafficBtn) {
    mapTrafficBtn.classList.toggle("active", trafficMgr.showTraffic);
    mapTrafficBtn.textContent = trafficMgr.showTraffic ? "ADS-B Traffic: ON" : "ADS-B Traffic: OFF";
  }
  updateTrafficLegendVisibility();
  renderTrafficOnMap();
});

const updateTrafficFilterUI = () => {
  const mapFilterBtn = document.getElementById("btn-map-traffic-filter");
  if (mapFilterBtn) {
    mapFilterBtn.textContent = `FLT: ${trafficMgr.altitudeFilter}`;
  }
  const cfgFilterBtn = document.getElementById("btn-cfg-traffic-filter");
  if (cfgFilterBtn) {
    const labels = {
      ALL: "ALL (UNRESTRICTED)",
      NORMAL: "NORMAL (±3,000 FT)",
      ABOVE: "ABOVE (+9,000 / -2,700 FT)",
      BELOW: "BELOW (+2,700 / -9,000 FT)"
    };
    cfgFilterBtn.textContent = labels[trafficMgr.altitudeFilter] || trafficMgr.altitudeFilter;
  }
  renderTrafficOnMap();
};

document.getElementById("btn-map-traffic-filter")?.addEventListener("click", function() {
  const filters = ["ALL", "NORMAL", "ABOVE", "BELOW"];
  const curIdx = filters.indexOf(trafficMgr.altitudeFilter);
  trafficMgr.altitudeFilter = filters[(curIdx + 1) % filters.length];
  localStorage.setItem("efis_traffic_filter", trafficMgr.altitudeFilter);
  updateTrafficFilterUI();
});

document.getElementById("btn-cfg-traffic-filter")?.addEventListener("click", function() {
  const filters = ["ALL", "NORMAL", "ABOVE", "BELOW"];
  const curIdx = filters.indexOf(trafficMgr.altitudeFilter);
  trafficMgr.altitudeFilter = filters[(curIdx + 1) % filters.length];
  localStorage.setItem("efis_traffic_filter", trafficMgr.altitudeFilter);
  updateTrafficFilterUI();
});

const injectThreatAction = () => {
  trafficMgr.injectCollisionThreat();
  renderTrafficOnMap();
  audioSynth.playDivertChime();
};
document.getElementById("btn-inject-threat")?.addEventListener("click", injectThreatAction);
document.getElementById("btn-traffic-inject-modal")?.addEventListener("click", injectThreatAction);

// Toggle Synthetic Vision / Map Backdrop Mode
const btnToggleSvt = document.getElementById("btn-toggle-svt");
if (btnToggleSvt) {
  btnToggleSvt.addEventListener("click", function() {
    isSyntheticVisionEnabled = !isSyntheticVisionEnabled;
    isMapBackdropEnabled = isSyntheticVisionEnabled;
    this.classList.toggle("active", isSyntheticVisionEnabled);
    this.textContent = isSyntheticVisionEnabled ? "3D SYNTHETIC VISION + MAP" : "CLASSIC EFIS HORIZON";

    const btnCfg = document.getElementById("btn-cfg-svt");
    if (btnCfg) {
      btnCfg.textContent = isSyntheticVisionEnabled ? "ENABLED (Garmin 3D)" : "CLASSIC HORIZON";
      btnCfg.classList.toggle("active", isSyntheticVisionEnabled);
    }
  });
}

// Sync Heading Bug to Current Track
document.getElementById("btn-hdg-bug-sync")?.addEventListener("click", () => {
  sim.selectedHeadingBug = Math.round(sim.groundTrackDeg);
});

// Emergency & Direct Home Buttons
document.getElementById("btn-emergency-nrst")?.addEventListener("click", triggerEmergencyDivert);
document.getElementById("btn-map-emergency")?.addEventListener("click", triggerEmergencyDivert);
document.getElementById("btn-map-direct-home")?.addEventListener("click", triggerDirectHome);

document.getElementById("btn-show-nrst-list")?.addEventListener("click", () => {
  const ranked = getRankedNearestAirports();
  populateEmergencyDrawer(ranked);
  document.getElementById("emergency-nrst-drawer")?.classList.remove("hidden");
});

document.getElementById("btn-close-nrst-drawer")?.addEventListener("click", () => {
  document.getElementById("emergency-nrst-drawer")?.classList.add("hidden");
});

// Interactive VHF Radio Directory Modal Triggers
document.getElementById("pfd-freq-hud")?.addEventListener("click", openFrequencyDirectoryModal);
document.getElementById("btn-show-freq-dir")?.addEventListener("click", openFrequencyDirectoryModal);
document.getElementById("btn-close-freq-modal")?.addEventListener("click", () => {
  document.getElementById("frequency-directory-modal")?.classList.add("hidden");
});
document.getElementById("btn-freq-close-footer")?.addEventListener("click", () => {
  document.getElementById("frequency-directory-modal")?.classList.add("hidden");
});

// Map Layer Controls (Airports, Glide Ring, Range Rings, VHF Areas & CTAF Rings)
const btnMapAirports = document.getElementById("btn-map-airports");
if (btnMapAirports) {
  btnMapAirports.classList.toggle("active", showAirports);
  btnMapAirports.textContent = showAirports ? "Airports: ON" : "Airports: OFF";
  btnMapAirports.addEventListener("click", function() {
    showAirports = !showAirports;
    localStorage.setItem("efis_show_airports", showAirports);
    this.classList.toggle("active", showAirports);
    this.textContent = showAirports ? "Airports: ON" : "Airports: OFF";
    renderAirportsOnMap();
  });
}

const btnMapGlideRing = document.getElementById("btn-map-glide-ring");
if (btnMapGlideRing) {
  btnMapGlideRing.classList.toggle("active", showGlideRing);
  btnMapGlideRing.textContent = showGlideRing ? "Glide Ring: ON" : "Glide Ring: OFF";
  btnMapGlideRing.addEventListener("click", function() {
    showGlideRing = !showGlideRing;
    localStorage.setItem("efis_show_glide_ring", showGlideRing);
    this.classList.toggle("active", showGlideRing);
    this.textContent = showGlideRing ? "Glide Ring: ON" : "Glide Ring: OFF";
    updateGlideRangeRing();
  });
}

const btnMapRangeRings = document.getElementById("btn-map-range-rings");
if (btnMapRangeRings) {
  btnMapRangeRings.classList.toggle("active", showRangeRings);
  btnMapRangeRings.textContent = showRangeRings ? "Range Rings: ON" : "Range Rings: OFF";
  btnMapRangeRings.addEventListener("click", function() {
    showRangeRings = !showRangeRings;
    localStorage.setItem("efis_show_range_rings", showRangeRings);
    this.classList.toggle("active", showRangeRings);
    this.textContent = showRangeRings ? "Range Rings: ON" : "Range Rings: OFF";
    renderRangeRings();
  });
}

const btnMapVhfAreas = document.getElementById("btn-map-vhf-areas");
if (btnMapVhfAreas) {
  btnMapVhfAreas.classList.toggle("active", showVhfAreas);
  btnMapVhfAreas.textContent = showVhfAreas ? "VHF Areas: ON" : "VHF Areas: OFF";
  btnMapVhfAreas.addEventListener("click", function() {
    showVhfAreas = !showVhfAreas;
    localStorage.setItem("efis_show_vhf_areas", showVhfAreas);
    this.classList.toggle("active", showVhfAreas);
    this.textContent = showVhfAreas ? "VHF Areas: ON" : "VHF Areas: OFF";
    renderVhfAreasOnMap();
  });
}

const btnMapCtafRings = document.getElementById("btn-map-ctaf-rings");
if (btnMapCtafRings) {
  btnMapCtafRings.classList.toggle("active", showCtafRings);
  btnMapCtafRings.textContent = showCtafRings ? "CTAF Rings: ON" : "CTAF Rings: OFF";
  btnMapCtafRings.addEventListener("click", function() {
    showCtafRings = !showCtafRings;
    localStorage.setItem("efis_show_ctaf_rings", showCtafRings);
    this.classList.toggle("active", showCtafRings);
    this.textContent = showCtafRings ? "CTAF Rings: ON" : "CTAF Rings: OFF";
    renderCtafRingsOnMap();
  });
}

// Australian VNC & VTC Airspace Controls
const btnMapAirspaces = document.getElementById("btn-map-airspaces");
if (btnMapAirspaces) {
  btnMapAirspaces.classList.toggle("active", airspaceEngine.showAirspaces);
  btnMapAirspaces.textContent = airspaceEngine.showAirspaces ? "🗺 Airspace: ON" : "🗺 Airspace: OFF";
  btnMapAirspaces.addEventListener("click", function() {
    airspaceEngine.showAirspaces = !airspaceEngine.showAirspaces;
    localStorage.setItem("efis_show_airspaces", airspaceEngine.showAirspaces);
    this.classList.toggle("active", airspaceEngine.showAirspaces);
    this.textContent = airspaceEngine.showAirspaces ? "🗺 Airspace: ON" : "🗺 Airspace: OFF";
    renderAirspacesOnMap();
  });
}

const btnMapChartMode = document.getElementById("btn-map-chart-mode");
const updateChartModeUI = () => {
  if (btnMapChartMode) {
    const mode = airspaceEngine.chartMode || "HYBRID";
    const labels = {
      VNC: "🗺 Chart: VNC (Regional)",
      VTC: "🗺 Chart: VTC (Terminal)",
      HYBRID: "🗺 Chart: HYBRID (Auto)"
    };
    btnMapChartMode.textContent = labels[mode] || `🗺 Chart: ${mode}`;
    btnMapChartMode.classList.toggle("active", true);
  }
  renderAirspacesOnMap();
};
if (btnMapChartMode) {
  updateChartModeUI();
  btnMapChartMode.addEventListener("click", function() {
    airspaceEngine.cycleChartMode();
    updateChartModeUI();
  });
}

const btnMapVfrWaypoints = document.getElementById("btn-map-vfr-waypoints");
if (btnMapVfrWaypoints) {
  btnMapVfrWaypoints.classList.toggle("active", airspaceEngine.showVfrWaypoints);
  btnMapVfrWaypoints.textContent = airspaceEngine.showVfrWaypoints ? "📍 VFR Waypoints: ON" : "📍 VFR Waypoints: OFF";
  btnMapVfrWaypoints.addEventListener("click", function() {
    airspaceEngine.showVfrWaypoints = !airspaceEngine.showVfrWaypoints;
    localStorage.setItem("efis_show_vfr_waypoints", airspaceEngine.showVfrWaypoints);
    this.classList.toggle("active", airspaceEngine.showVfrWaypoints);
    this.textContent = airspaceEngine.showVfrWaypoints ? "📍 VFR Waypoints: ON" : "📍 VFR Waypoints: OFF";
    renderVfrWaypointsOnMap();
  });
}

const updateAirspaceFilterUI = () => {
  const filterBtn = document.getElementById("btn-map-airspace-filter");
  if (filterBtn) {
    const labels = {
      ALL: "FLT: ALL",
      RESTRICTED_MIL: "FLT: PRD/MIL",
      CONTROLLED: "FLT: CTA/CTR",
      VTC: "FLT: VTC STEP"
    };
    filterBtn.textContent = labels[airspaceEngine.airspaceFilter] || `FLT: ${airspaceEngine.airspaceFilter}`;
  }
  renderAirspacesOnMap();
};

document.getElementById("btn-map-airspace-filter")?.addEventListener("click", function() {
  airspaceEngine.cycleFilter();
  updateAirspaceFilterUI();
});

// Settings VHF Toggle
document.getElementById("btn-cfg-vhf-layers")?.addEventListener("click", function() {
  showVhfAreas = !showVhfAreas;
  showCtafRings = showVhfAreas;
  localStorage.setItem("efis_show_vhf_areas", showVhfAreas);
  localStorage.setItem("efis_show_ctaf_rings", showCtafRings);
  
  const mapVhfBtn = document.getElementById("btn-map-vhf-areas");
  const mapCtafBtn = document.getElementById("btn-map-ctaf-rings");
  if (mapVhfBtn) {
    mapVhfBtn.classList.toggle("active", showVhfAreas);
    mapVhfBtn.textContent = showVhfAreas ? "VHF Areas: ON" : "VHF Areas: OFF";
  }
  if (mapCtafBtn) {
    mapCtafBtn.classList.toggle("active", showCtafRings);
    mapCtafBtn.textContent = showCtafRings ? "CTAF Rings: ON" : "CTAF Rings: OFF";
  }

  this.textContent = showVhfAreas ? "ENABLED (ALL)" : "DISABLED (OFF)";
  this.classList.toggle("active", showVhfAreas);

  renderVhfAreasOnMap();
  renderCtafRingsOnMap();
});

// Map Layer Switcher
document.querySelectorAll(".layer-btn").forEach(btn => {
  btn.addEventListener("click", function() {
    document.querySelectorAll(".layer-btn").forEach(b => b.classList.remove("active"));
    this.classList.add("active");
    const layerKey = this.getAttribute("data-layer");
    if (leafletMap && currentTileLayer && MAP_LAYERS[layerKey]) {
      leafletMap.removeLayer(currentTileLayer);
      currentTileLayer = L.tileLayer(MAP_LAYERS[layerKey], { maxZoom: 18 }).addTo(leafletMap);
    }
  });
});

document.getElementById("btn-map-recenter")?.addEventListener("click", () => {
  if (leafletMap) leafletMap.setView([sim.lat, sim.lon], 10);
});

document.getElementById("btn-clear-route")?.addEventListener("click", () => {
  sim.isEmergencyDivert = false;
  sim.destIdent = "YPMQ";
  sim.destLat = -31.4358;
  sim.destLon = 152.8631;
  sim.routeWaypoints = [
    { id: userHomeAirport.icao, name: userHomeAirport.name, lat: userHomeAirport.lat, lon: userHomeAirport.lon },
    { id: "CROWDY", name: "Crowdy Head Fix", lat: -31.8417, lon: 152.7533 },
    { id: "CAMDEN-HVN", name: "Camden Haven Overfly", lat: -31.6367, lon: 152.8250 },
    { id: "YPMQ", name: "Port Macquarie Airport", lat: -31.4358, lon: 152.8631 }
  ];
  updateRouteOnMap();
});

// Wire Route Lock Listeners
document.getElementById("btn-lock-route")?.addEventListener("click", () => toggleRouteLock());
document.getElementById("map-route-lock-badge")?.addEventListener("click", () => toggleRouteLock());
document.getElementById("btn-map-lock-route")?.addEventListener("click", () => toggleRouteLock());
document.getElementById("btn-add-waypoint")?.addEventListener("click", () => {
  if (isRouteLocked) {
    toggleRouteLock(false);
  }
});

// Initialize Route Lock UI
updateRouteLockUI();

// ============================================================================
// ORIENTATION MODES & 2-SECOND HOLD PRESS GESTURE ENGINE
// ============================================================================
const ORIENTATION_MODES = [
  { id: "portrait-mode", label: "PORTRAIT SPLIT (HSI)", desc: "PFD Upper / HSI Lower Split" },
  { id: "landscape-mode", label: "LANDSCAPE SPLIT (HSI)", desc: "PFD Left / HSI Right Split" },
  { id: "portrait-map-mode", label: "PORTRAIT SPLIT (MAP)", desc: "PFD Upper / Live Moving Map Lower Split" },
  { id: "landscape-map-mode", label: "LANDSCAPE SPLIT (MAP)", desc: "PFD Left / Live Moving Map Right Split" },
  { id: "fullscreen-pfd-mode", label: "FULL SCREEN PFD", desc: "100% Full-Bleed Attitude Director & Tapes" },
  { id: "fullscreen-hsi-mode", label: "FULL SCREEN HSI", desc: "100% Full-Bleed HSI Compass & Nav Data" },
  { id: "fullscreen-map-mode", label: "FULL SCREEN MAP", desc: "100% Full-Bleed Interactive Aviation Moving Map" }
];

let currentOrientationIndex = 0;
const savedOrientation = localStorage.getItem("efis_orientation_mode");
if (savedOrientation) {
  const foundIdx = ORIENTATION_MODES.findIndex(m => m.id === savedOrientation);
  if (foundIdx >= 0) currentOrientationIndex = foundIdx;
} else {
  currentOrientationIndex = (window.innerWidth > window.innerHeight) ? 1 : 0;
}

function syncMapContainerLocation() {
  const mapWrapper = document.getElementById("map-viewport-wrapper");
  const efisMapCluster = document.getElementById("efis-map-instrument-cluster");
  const screenMapContainer = document.getElementById("screen-map-container");

  if (!mapWrapper || !efisMapCluster || !screenMapContainer) return;

  const currentMode = ORIENTATION_MODES[currentOrientationIndex] || ORIENTATION_MODES[0];
  const isEfisMapMode = (currentMode.id === "portrait-map-mode" || currentMode.id === "landscape-map-mode" || currentMode.id === "fullscreen-map-mode");

  if (currentScreenIndex === 0 && isEfisMapMode) {
    if (mapWrapper.parentElement !== efisMapCluster) {
      efisMapCluster.appendChild(mapWrapper);
    }
  } else {
    if (mapWrapper.parentElement !== screenMapContainer) {
      screenMapContainer.appendChild(mapWrapper);
    }
  }

  if (typeof weatherService !== 'undefined' && weatherService) {
    weatherService.renderCurrentRadarTile();
  }

  if (leafletMap) {
    setTimeout(() => {
      leafletMap.invalidateSize();
      if (sim) {
        leafletMap.panTo([sim.lat, sim.lon], { animate: false });
      }
    }, 60);
  }
}

function applyOrientationMode(index, announce = false) {
  currentOrientationIndex = (index + ORIENTATION_MODES.length) % ORIENTATION_MODES.length;
  const currentMode = ORIENTATION_MODES[currentOrientationIndex];

  ORIENTATION_MODES.forEach(m => document.body.classList.remove(m.id));
  document.body.classList.add(currentMode.id);
  localStorage.setItem("efis_orientation_mode", currentMode.id);

  const btnHeader = document.getElementById("btn-toggle-orientation");
  if (btnHeader) {
    btnHeader.textContent = `⟲ ${currentMode.label}`;
  }

  const btnCfg = document.getElementById("btn-cfg-orientation");
  if (btnCfg) {
    btnCfg.textContent = currentMode.label;
  }

  syncMapContainerLocation();
  resizeCanvases();

  if (typeof deviceSensors !== 'undefined' && deviceSensors) {
    deviceSensors.handleOrientationChange();
  }

  if (announce) {
    audioSynth.playDivertChime();
    if (navigator.vibrate) {
      try { navigator.vibrate(60); } catch(e) {}
    }
  }
}

function cycleOrientationMode(announce = true) {
  applyOrientationMode(currentOrientationIndex + 1, announce);
}

// Orientation Buttons Click Listeners
document.getElementById("btn-toggle-orientation")?.addEventListener("click", () => {
  cycleOrientationMode(false);
});

document.getElementById("btn-cfg-orientation")?.addEventListener("click", () => {
  cycleOrientationMode(false);
});

// ============================================================================
// 10.5 5-SECOND LONG-PRESS AHRS ZERO-CALIBRATION & CRADLE ORIENTATION ENGINE
// ============================================================================
class AhrsCalibrationManager {
  constructor() {
    this.isLongPressCalEnabled = localStorage.getItem("efis_enable_longpress_cal") !== "false";
    this.isCalibrating = false;
    this.calStartTime = 0;
    this.calDurationMs = 5000;
    this.animFrameId = null;
    this.startX = 0;
    this.startY = 0;
    this.lastVibrateSecond = 5;
    this.toastTimer = null;
  }

  init() {
    const pfdCluster = document.querySelector(".pfd-instrument-cluster");
    const pfdCanvas = document.getElementById("canvas-pfd-master");
    const target = pfdCanvas || pfdCluster;
    if (!target) return;

    const startGesture = (e) => {
      if (!this.isLongPressCalEnabled) return;
      if (e.touches && e.touches.length > 1) return; // Ignore multi-touch
      if (e.target.closest("button") || e.target.closest("input") || e.target.closest("select") || e.target.closest("#pfd-freq-hud")) return;

      this.isCalibrating = true;
      this.calStartTime = Date.now();
      this.lastVibrateSecond = 5;

      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
      this.startX = clientX;
      this.startY = clientY;

      const overlay = document.getElementById("ahrs-cal-overlay");
      const title = document.getElementById("ahrs-cal-title");
      const progress = document.getElementById("ahrs-cal-progress");

      if (overlay) overlay.classList.remove("hidden");
      if (title) title.textContent = "CALIBRATING AHRS: 5s";
      if (progress) {
        progress.style.strokeDashoffset = "263.89";
      }

      if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
      this.loop();
    };

    const cancelGesture = () => {
      if (!this.isCalibrating) return;
      this.isCalibrating = false;
      if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
      const overlay = document.getElementById("ahrs-cal-overlay");
      if (overlay) overlay.classList.add("hidden");
    };

    const moveGesture = (e) => {
      if (!this.isCalibrating) return;
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
      const dist = Math.hypot(clientX - this.startX, clientY - this.startY);
      if (dist > 18) {
        cancelGesture();
      }
    };

    target.addEventListener("pointerdown", startGesture);
    window.addEventListener("pointerup", cancelGesture);
    window.addEventListener("pointercancel", cancelGesture);
    target.addEventListener("pointermove", moveGesture);

    target.addEventListener("touchstart", startGesture, { passive: true });
    window.addEventListener("touchend", cancelGesture, { passive: true });
    window.addEventListener("touchcancel", cancelGesture, { passive: true });
    target.addEventListener("touchmove", moveGesture, { passive: true });

    // Settings Toggle Button
    const btnCfgToggle = document.getElementById("btn-cfg-longpress-cal");
    if (btnCfgToggle) {
      btnCfgToggle.textContent = this.isLongPressCalEnabled ? "ENABLED (ON)" : "DISABLED (OFF)";
      btnCfgToggle.classList.toggle("active", this.isLongPressCalEnabled);
      btnCfgToggle.addEventListener("click", () => {
        this.isLongPressCalEnabled = !this.isLongPressCalEnabled;
        localStorage.setItem("efis_enable_longpress_cal", this.isLongPressCalEnabled);
        btnCfgToggle.textContent = this.isLongPressCalEnabled ? "ENABLED (ON)" : "DISABLED (OFF)";
        btnCfgToggle.classList.toggle("active", this.isLongPressCalEnabled);
      });
    }

    // Reset Calibration Offsets Button
    const btnResetOffsets = document.getElementById("btn-cal-reset-offsets");
    if (btnResetOffsets) {
      btnResetOffsets.addEventListener("click", () => {
        this.resetCalibration();
      });
    }
  }

  loop() {
    if (!this.isCalibrating) return;

    const elapsed = Date.now() - this.calStartTime;
    const progressRatio = Math.min(1.0, elapsed / this.calDurationMs);
    const secondsRemaining = Math.max(1, Math.ceil((this.calDurationMs - elapsed) / 1000));

    const progressEl = document.getElementById("ahrs-cal-progress");
    const titleEl = document.getElementById("ahrs-cal-title");

    const circumference = 263.89; // 2 * Math.PI * 42
    if (progressEl) {
      progressEl.style.strokeDashoffset = (circumference * (1 - progressRatio)).toFixed(2);
    }
    if (titleEl) {
      titleEl.textContent = `CALIBRATING AHRS: ${secondsRemaining}s`;
    }

    // Haptic tick on each elapsed second threshold
    if (secondsRemaining < this.lastVibrateSecond) {
      this.lastVibrateSecond = secondsRemaining;
      if (navigator.vibrate) {
        try { navigator.vibrate(50); } catch(e) {}
      }
    }

    if (elapsed >= this.calDurationMs) {
      this.completeCalibration();
      return;
    }

    this.animFrameId = requestAnimationFrame(() => this.loop());
  }

  completeCalibration() {
    this.isCalibrating = false;
    const overlay = document.getElementById("ahrs-cal-overlay");
    if (overlay) overlay.classList.add("hidden");

    // Capture raw orientation and zero attitude
    const rawPitch = sim.pitchDeg;
    const rawRoll = sim.rollDeg;

    sim.pitchOffset = rawPitch;
    sim.rollOffset = rawRoll;

    localStorage.setItem("efis_pitch_offset", sim.pitchOffset.toString());
    localStorage.setItem("efis_roll_offset", sim.rollOffset.toString());

    // Update Calibration screen displays
    const calPitch = document.getElementById("cal-pitch-val");
    const calRoll = document.getElementById("cal-roll-val");
    if (calPitch) calPitch.textContent = `${sim.pitchOffset.toFixed(1)}°`;
    if (calRoll) calRoll.textContent = `${sim.rollOffset.toFixed(1)}°`;

    // Haptic feedback & Audio Chime
    if (navigator.vibrate) {
      try { navigator.vibrate([100, 50, 100]); } catch(e) {}
    }
    if (typeof audioSynth !== 'undefined' && audioSynth.playDivertChime) {
      audioSynth.playDivertChime();
    }

    // Show Confirmation Toast
    this.showSuccessToast(sim.pitchOffset, sim.rollOffset);
  }

  resetCalibration() {
    sim.pitchOffset = 0.0;
    sim.rollOffset = 0.0;
    localStorage.removeItem("efis_pitch_offset");
    localStorage.removeItem("efis_roll_offset");

    const calPitch = document.getElementById("cal-pitch-val");
    const calRoll = document.getElementById("cal-roll-val");
    if (calPitch) calPitch.textContent = `0.0°`;
    if (calRoll) calRoll.textContent = `0.0°`;

    this.showSuccessToast(0.0, 0.0, "AHRS RESET TO FACTORY LEVEL (0.0°)");
  }

  showSuccessToast(pitch, roll, customMsg = null) {
    const toast = document.getElementById("ahrs-cal-toast");
    const msg = document.getElementById("ahrs-toast-msg");
    if (toast && msg) {
      msg.textContent = customMsg || `✓ AHRS ZEROED TO CRADLE (Pitch: ${pitch >= 0 ? '+' : ''}${pitch.toFixed(1)}°, Roll: ${roll >= 0 ? '+' : ''}${roll.toFixed(1)}°)`;
      toast.classList.remove("hidden");
      if (this.toastTimer) clearTimeout(this.toastTimer);
      this.toastTimer = setTimeout(() => {
        toast.classList.add("hidden");
      }, 2500);
    }
  }
}

const ahrsCalibrationMgr = new AhrsCalibrationManager();

// 2-Second Hold Gesture Handlers
let holdTimer = null;
let holdStartX = 0;
let holdStartY = 0;
let isHolding = false;

function initHoldGestureDetector() {
  const pfdScreen = document.getElementById("screen-pfd");
  const holdOverlay = document.getElementById("hold-indicator-overlay");
  const holdRingProgress = document.getElementById("hold-ring-progress");
  const holdStatusTitle = document.getElementById("hold-status-title");
  const holdStatusSub = document.getElementById("hold-status-sub");

  if (!pfdScreen || !holdOverlay) return;

  function startHold(e) {
    if (e.target.closest("button") || e.target.closest("input") || e.target.closest("select") || e.target.closest("#pfd-freq-hud") || e.target.closest(".pfd-instrument-cluster") || e.target.closest("#canvas-pfd-master")) return;
    
    isHolding = true;
    holdStartX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    holdStartY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

    const nextMode = ORIENTATION_MODES[(currentOrientationIndex + 1) % ORIENTATION_MODES.length];
    if (holdStatusTitle) holdStatusTitle.textContent = "HOLD 2s TO SWITCH ORIENTATION";
    if (holdStatusSub) holdStatusSub.textContent = `Next: ${nextMode.label}`;

    if (holdRingProgress) {
      holdRingProgress.classList.remove("active", "completed");
      holdRingProgress.style.strokeDashoffset = "213.63";
      void holdRingProgress.offsetWidth;
      holdRingProgress.classList.add("active");
    }

    holdOverlay.classList.remove("hidden");

    clearTimeout(holdTimer);
    holdTimer = setTimeout(() => {
      if (isHolding) {
        if (holdRingProgress) holdRingProgress.classList.add("completed");
        const activatedMode = ORIENTATION_MODES[(currentOrientationIndex + 1) % ORIENTATION_MODES.length];
        if (holdStatusTitle) holdStatusTitle.textContent = `✓ SWITCHED ORIENTATION!`;
        if (holdStatusSub) holdStatusSub.textContent = activatedMode.label;

        cycleOrientationMode(true);

        setTimeout(() => {
          cancelHold();
        }, 500);
      }
    }, 2000);
  }

  function cancelHold() {
    isHolding = false;
    clearTimeout(holdTimer);
    if (holdRingProgress) {
      holdRingProgress.classList.remove("active", "completed");
      holdRingProgress.style.strokeDashoffset = "213.63";
    }
    holdOverlay.classList.add("hidden");
  }

  function checkMove(e) {
    if (!isHolding) return;
    const curX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const curY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    const dist = Math.hypot(curX - holdStartX, curY - holdStartY);
    if (dist > 30) {
      cancelHold();
    }
  }

  pfdScreen.addEventListener("pointerdown", startHold);
  window.addEventListener("pointerup", cancelHold);
  window.addEventListener("pointercancel", cancelHold);
  pfdScreen.addEventListener("pointermove", checkMove);

  pfdScreen.addEventListener("touchstart", startHold, { passive: true });
  window.addEventListener("touchend", cancelHold, { passive: true });
  window.addEventListener("touchcancel", cancelHold, { passive: true });
  pfdScreen.addEventListener("touchmove", checkMove, { passive: true });
}

// ============================================================================
// 11. TWO-FINGER SWIPE CAROUSEL NAVIGATION & HUD PAGE INDICATOR
// ============================================================================
const SCREENS = [
  { id: "screen-pfd", name: "PRIMARY FLIGHT DISPLAY (EFIS)", icon: "⬡" },
  { id: "screen-map", name: "LIVE FLIGHT MAP & RADAR", icon: "🗺" },
  { id: "screen-recorder", name: "BLACKBOX RECORDER & LOGBOOK", icon: "⏺" },
  { id: "screen-calibration", name: "AHRS & SENSOR CALIBRATION", icon: "⚙" },
  { id: "screen-settings", name: "SYSTEM CONFIG & SETTINGS", icon: "✈" },
  { id: "screen-tests", name: "AUTOMATED TEST SUITE", icon: "✓" }
];

let currentScreenIndex = 0;
let hudIndicatorTimer = null;

function showPageHudIndicator(screenIndex) {
  const indicator = document.getElementById("hud-page-indicator");
  const icon = document.getElementById("hud-page-icon");
  const name = document.getElementById("hud-page-name");
  const dotsContainer = document.getElementById("hud-page-dots");

  if (!indicator || !SCREENS[screenIndex]) return;

  if (icon) icon.textContent = SCREENS[screenIndex].icon;
  if (name) name.textContent = SCREENS[screenIndex].name;

  if (dotsContainer) {
    dotsContainer.innerHTML = SCREENS.map((s, idx) => 
      `<span class="dot ${idx === screenIndex ? 'active' : ''}"></span>`
    ).join("");
  }

  indicator.classList.remove("hidden");
  void indicator.offsetWidth;
  indicator.classList.add("visible");

  if (hudIndicatorTimer) clearTimeout(hudIndicatorTimer);
  hudIndicatorTimer = setTimeout(() => {
    indicator.classList.remove("visible");
    setTimeout(() => {
      if (!indicator.classList.contains("visible")) {
        indicator.classList.add("hidden");
      }
    }, 300);
  }, 1500);
}

function switchToScreen(index, triggerHud = true) {
  if (index < 0) index = 0;
  if (index >= SCREENS.length) index = SCREENS.length - 1;
  currentScreenIndex = index;

  const track = document.getElementById("screens-track");
  if (track) {
    track.style.transform = `translateX(-${currentScreenIndex * (100 / SCREENS.length)}%)`;
  }

  SCREENS.forEach((s, idx) => {
    const el = document.getElementById(s.id);
    if (el) {
      if (idx === currentScreenIndex) el.classList.add("active");
      else el.classList.remove("active");
    }
  });

  // Update footer tabs if present
  document.querySelectorAll(".nav-tab").forEach((t, idx) => {
    t.classList.toggle("active", idx === currentScreenIndex);
  });

  // Sync moving map DOM container location
  syncMapContainerLocation();

  // Invalidate Leaflet Map & resize canvases
  if (leafletMap) {
    setTimeout(() => {
      leafletMap.invalidateSize();
      renderAirportsOnMap();
      renderVhfAreasOnMap();
      renderCtafRingsOnMap();
      updateGlideRangeRing();
      renderRangeRings();
      renderTrafficOnMap();
    }, 80);
  }
  resizeCanvases();

  if (triggerHud) {
    showPageHudIndicator(currentScreenIndex);
  }
}

function initTwoFingerSwipeNavigation() {
  const container = document.getElementById("app-container") || document.body;
  let touchStart = null;
  let isTwoFinger = false;

  container.addEventListener("touchstart", (e) => {
    if (e.touches.length === 2) {
      isTwoFinger = true;
      const x = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const y = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      touchStart = { x, y, time: Date.now() };
    } else {
      isTwoFinger = false;
      touchStart = null;
    }
  }, { passive: true });

  container.addEventListener("touchmove", (e) => {
    if (isTwoFinger && e.touches.length === 2 && touchStart) {
      const curX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const curY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      const dx = curX - touchStart.x;
      const dy = curY - touchStart.y;
      
      // If predominantly horizontal, prevent native browser forward/back gestures
      if (Math.abs(dx) > Math.abs(dy) * 1.2 && Math.abs(dx) > 15) {
        if (e.cancelable) e.preventDefault();
      }
    }
  }, { passive: false });

  container.addEventListener("touchend", (e) => {
    if (isTwoFinger && touchStart) {
      const touch0 = e.touches[0] || e.changedTouches[0];
      const touch1 = e.touches[1] || e.changedTouches[1] || touch0;
      const endX = (touch0.clientX + touch1.clientX) / 2;
      const endY = (touch0.clientY + touch1.clientY) / 2;

      const deltaX = endX - touchStart.x;
      const deltaY = endY - touchStart.y;
      const deltaTime = Date.now() - touchStart.time;

      // Minimum distance > 50px, predominantly horizontal, within 800ms
      if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2 && deltaTime < 800) {
        if (deltaX < 0) {
          // Swipe Left -> Next screen
          if (currentScreenIndex < SCREENS.length - 1) {
            switchToScreen(currentScreenIndex + 1);
            if (audioSynth && typeof audioSynth.playDivertChime === 'function') {
              audioSynth.playDivertChime();
            }
          }
        } else {
          // Swipe Right -> Previous screen
          if (currentScreenIndex > 0) {
            switchToScreen(currentScreenIndex - 1);
            if (audioSynth && typeof audioSynth.playDivertChime === 'function') {
              audioSynth.playDivertChime();
            }
          }
        }
      }
    }
    if (e.touches.length < 2) {
      isTwoFinger = false;
      touchStart = null;
    }
  }, { passive: true });

  // Desktop Keyboard navigation helper (Alt + Left/Right arrow)
  window.addEventListener("keydown", (e) => {
    if (e.altKey && e.key === "ArrowRight") {
      if (currentScreenIndex < SCREENS.length - 1) switchToScreen(currentScreenIndex + 1);
    } else if (e.altKey && e.key === "ArrowLeft") {
      if (currentScreenIndex > 0) switchToScreen(currentScreenIndex - 1);
    }
  });
}

function initFullscreenToggle() {
  const btn = document.getElementById("btn-toggle-fullscreen");
  if (btn) {
    btn.addEventListener("click", () => {
      if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen();
        }
        btn.classList.add("active");
        btn.title = "Exit Fullscreen Mode";
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
        btn.classList.remove("active");
        btn.title = "Toggle Fullscreen Mode";
      }
    });

    document.addEventListener("fullscreenchange", () => {
      btn.classList.toggle("active", !!document.fullscreenElement);
      setTimeout(resizeCanvases, 150);
    });
  }
}

// Tab Navigation
document.querySelectorAll(".nav-tab").forEach((tab, idx) => {
  tab.addEventListener("click", () => {
    switchToScreen(idx);
  });
});

// Flight Stick Controls
document.getElementById("btn-pitch-up")?.addEventListener("click", () => {
  sim.targetPitchDeg = Math.min(25, sim.targetPitchDeg + 2.0);
  sim.isAutopilot = false;
  document.getElementById("btn-toggle-ap")?.classList.remove("active");
});
document.getElementById("btn-pitch-down")?.addEventListener("click", () => {
  sim.targetPitchDeg = Math.max(-20, sim.targetPitchDeg - 2.0);
  sim.isAutopilot = false;
  document.getElementById("btn-toggle-ap")?.classList.remove("active");
});
document.getElementById("btn-bank-left")?.addEventListener("click", () => {
  sim.targetRollDeg = Math.max(-45, sim.targetRollDeg - 8);
  sim.isAutopilot = false;
  document.getElementById("btn-toggle-ap")?.classList.remove("active");
});
document.getElementById("btn-bank-right")?.addEventListener("click", () => {
  sim.targetRollDeg = Math.min(45, sim.targetRollDeg + 8);
  sim.isAutopilot = false;
  document.getElementById("btn-toggle-ap")?.classList.remove("active");
});
document.getElementById("btn-level-wings")?.addEventListener("click", () => {
  sim.targetRollDeg = 0;
  sim.targetPitchDeg = 0.0;
});

// Throttle Slider
document.getElementById("throttle-slider")?.addEventListener("input", (e) => {
  const val = parseInt(e.target.value);
  sim.throttlePct = val / 100.0;
  const throttleVal = document.getElementById("throttle-val");
  if (throttleVal) throttleVal.textContent = `${val}%`;
});

// Autopilot Toggle
document.getElementById("btn-toggle-ap")?.addEventListener("click", function() {
  sim.isAutopilot = !sim.isAutopilot;
  this.classList.toggle("active", sim.isAutopilot);
});

// Recorder Toggle & Exports
document.getElementById("btn-rec-toggle")?.addEventListener("click", function() {
  if (recorder.isRecording) {
    recorder.stop();
    this.classList.remove("recording");
    this.textContent = "● START RECORDING";
  } else {
    recorder.start();
    this.classList.add("recording");
    this.textContent = "■ STOP RECORDING";
  }
});

function downloadFile(content, filename, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

document.getElementById("btn-export-gpx")?.addEventListener("click", () => {
  downloadFile(recorder.exportGPX(), "flight_track.gpx", "application/gpx+xml");
});
document.getElementById("btn-export-kml")?.addEventListener("click", () => {
  downloadFile(recorder.exportKML(), "flight_track.kml", "application/vnd.google-earth.kml+xml");
});
document.getElementById("btn-export-csv")?.addEventListener("click", () => {
  downloadFile(recorder.exportCSV(), "flight_telemetry.csv", "text/csv");
});

document.getElementById("btn-cal-zero-level")?.addEventListener("click", () => {
  sim.pitchOffset = sim.pitchDeg;
  sim.rollOffset = sim.rollDeg;
  const calPitch = document.getElementById("cal-pitch-val");
  const calRoll = document.getElementById("cal-roll-val");
  if (calPitch) calPitch.textContent = `${sim.pitchOffset.toFixed(1)}°`;
  if (calRoll) calRoll.textContent = `${sim.rollOffset.toFixed(1)}°`;
});

document.getElementById("btn-toggle-sensor-source")?.addEventListener("click", () => {
  deviceSensors.toggle();
});

document.getElementById("btn-cal-ahrs-damping")?.addEventListener("click", () => {
  ahrsFilter.cyclePreset();
});

document.getElementById("btn-cfg-ahrs-damping")?.addEventListener("click", () => {
  ahrsFilter.cyclePreset();
});

// URL Hash Screen Navigation Support (e.g. #map, #settings, #pfd) & Initializer
window.addEventListener("DOMContentLoaded", () => {
  deviceSensors.updateUiStatus();
  ahrsCalibrationMgr.init();
  ahrsFilter.updateUI();

  const calPitch = document.getElementById("cal-pitch-val");
  const calRoll = document.getElementById("cal-roll-val");
  if (calPitch) calPitch.textContent = `${sim.pitchOffset.toFixed(1)}°`;
  if (calRoll) calRoll.textContent = `${sim.rollOffset.toFixed(1)}°`;

  if (window.location.hash) {
    const hash = window.location.hash.toLowerCase().replace("#", "");
    if (hash === "split-map" || hash === "split") {
      setTimeout(() => {
        applyOrientationMode(2, false); // portrait-map-mode
        switchToScreen(0, false);
      }, 100);
    } else {
      const screenIdx = SCREENS.findIndex(s => s.id.toLowerCase().includes(hash) || hash.includes(s.id.toLowerCase()));
      if (screenIdx >= 0) {
        setTimeout(() => switchToScreen(screenIdx), 100);
      }
    }
  }
});

