package au.com.altitudecs.efis;

import android.os.Bundle;
import android.view.WindowManager;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        // App-specific native plugins must be registered before the bridge starts
        registerPlugin(BarometerPlugin.class);
        super.onCreate(savedInstanceState);
        // Cockpit display: keep the screen on while the app is in front
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
    }
}
