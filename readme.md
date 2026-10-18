# ⚠️ STRICT NON-OPERATIONAL AVIATION DISCLAIMER

### **NOT CERTIFIED FOR FLIGHT OPERATIONS — FOR EXPERIMENTAL, SIMULATION & ENTERTAINMENT PURPOSES ONLY**

This software is an uncertified, open-source experimental software project developed strictly for educational, hobbyist, and simulation purposes. 

* **DO NOT USE AS A PRIMARY OR SECONDARY FLIGHT INSTRUMENT.**
* **NOT CERTIFIED:** This application is **NOT certified or approved** by the FAA, CASA, EASA, or any other civil aviation authority worldwide.
* **NO RELIANCE:** Under no circumstances should this application, its artificial horizon (AHRS), altimeter, airspeed tapes, VHF/airspace boundary overlays, ADS-B traffic indications, or navigation routes be relied upon for flight planning, terrain clearance, collision avoidance, airspace avoidance, or in-flight decision-making in real-world aircraft.
* **ACCURACY & LATENCY:** Sensor readings, GPS updates, consumer hardware gyroscopes, barometric estimations, and third-party map/airspace data may experience severe inaccuracies, latency, drift, unannounced dropouts, or total failure.

### **ASSUMPTION OF RISK & WAIVER OF LIABILITY**
By downloading, compiling, modifying, running, or distributing this software, you explicitly acknowledge and agree that **YOU ASSUME ALL RISKS** associated with its use. 

**THE AUTHORS, MAINTAINERS, AND CONTRIBUTORS ASSUME ABSOLUTELY ZERO LIABILITY OR RESPONSIBILITY** for any direct, indirect, incidental, punitive, consequential, or catastrophic damages—including but not limited to aircraft damage, regulatory violations, airspace infringements, personal injury, or loss of life—arising directly or indirectly from the installation, operation, or reliance upon this software.
## Android app

`android-app/` is a thin Capacitor shell that opens the hosted app (https://lloyd-widdowson.github.io/ACS-EFIS/), so web updates keep arriving without reinstalling. Inside the shell, live ADS-B traffic is fetched through native HTTP from the phone's own connection. This is needed because the public ADS-B networks refuse browser (CORS) requests from GitHub Pages, and refuse server relays on Cloudflare as well.

The **Android app** GitHub Action builds `ACS-EFIS.apk` on every change under `android-app/` and publishes it as the `android-latest` release. To install it, open https://github.com/Lloyd-widdowson/ACS-EFIS/releases/tag/android-latest on the phone, download the APK, and allow installs from that source. The web app itself still has no build step.
