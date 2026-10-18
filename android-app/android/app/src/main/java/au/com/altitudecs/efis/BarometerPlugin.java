package au.com.altitudecs.efis;

import android.content.Context;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.SystemClock;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

/**
 * Streams the phone's pressure sensor to the web app as "pressure" events ({ hPa, t }),
 * about 10 per second. The WebView has no barometer API, and pressure altitude gives a far
 * steadier altitude and climb rate than GPS.
 */
@CapacitorPlugin(name = "EfisBarometer")
public class BarometerPlugin extends Plugin implements SensorEventListener {
    private static final long MIN_INTERVAL_MS = 100;
    private SensorManager sensorManager;
    private Sensor pressureSensor;
    private boolean running = false;
    private long lastSentMs = 0;

    @Override
    public void load() {
        sensorManager = (SensorManager) getContext().getSystemService(Context.SENSOR_SERVICE);
        pressureSensor = sensorManager != null ? sensorManager.getDefaultSensor(Sensor.TYPE_PRESSURE) : null;
    }

    @PluginMethod
    public void isAvailable(PluginCall call) {
        JSObject ret = new JSObject();
        ret.put("available", pressureSensor != null);
        call.resolve(ret);
    }

    @PluginMethod
    public void start(PluginCall call) {
        if (pressureSensor == null) {
            call.reject("No pressure sensor on this device");
            return;
        }
        if (!running) {
            sensorManager.registerListener(this, pressureSensor, SensorManager.SENSOR_DELAY_GAME);
            running = true;
        }
        call.resolve();
    }

    @PluginMethod
    public void stop(PluginCall call) {
        stopSensor();
        call.resolve();
    }

    private void stopSensor() {
        if (running && sensorManager != null) {
            sensorManager.unregisterListener(this);
        }
        running = false;
    }

    @Override
    protected void handleOnPause() {
        if (running && sensorManager != null) sensorManager.unregisterListener(this);
    }

    @Override
    protected void handleOnResume() {
        if (running && sensorManager != null && pressureSensor != null) {
            sensorManager.registerListener(this, pressureSensor, SensorManager.SENSOR_DELAY_GAME);
        }
    }

    @Override
    protected void handleOnDestroy() {
        stopSensor();
    }

    @Override
    public void onSensorChanged(SensorEvent event) {
        long now = SystemClock.elapsedRealtime();
        if (now - lastSentMs < MIN_INTERVAL_MS) return;
        lastSentMs = now;
        JSObject data = new JSObject();
        data.put("hPa", event.values[0]);
        data.put("t", now);
        notifyListeners("pressure", data);
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int accuracy) {}
}
