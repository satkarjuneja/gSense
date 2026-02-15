# gSense Accelerometer

gSense is a lightweight browser based tool that reads your phone’s accelerometer data and displays live statistics.  
It is intended as a **demonstration and exploration** of motion sensor data on mobile devices.

## Features

- Reads acceleration including gravity from your phone’s sensors
- Applies smoothing to reduce noise
- Computes **mean** and **median** over a short rolling window (~1 second)
- Maintains a **10-second log** of raw acceleration magnitudes
- Start/Stop controls for measurement


## Notes / Limitations

- This tool does **not calibrate your device**; readings may vary across phones.
- If there is a fault in Mems sensor of the device the application will produce faulty data  
- Smoothing and short rolling windows reduce noise but cannot remove all sensor errors.  

### How MEMS Sensors Work

Most modern phones, including those used by gSense, rely on **MEMS (Micro-Electro-Mechanical Systems) accelerometers** to measure acceleration.  

- **Structure:** A tiny mass (proof mass) is suspended by micro-scale springs on a silicon chip.  
- **Principle:** When the device accelerates, the mass moves relative to its frame. This displacement is measured using **capacitive plates** or **piezoelectric elements**, generating an electrical signal proportional to acceleration.  
- **Axes:** Most phone accelerometers measure in **3 axes (x, y, z)**, giving a vector representation of total acceleration, including gravity.  
- **Characteristics & Limitations:**  
  - High sensitivity but also **noise and drift**; readings fluctuate slightly even when the device is stationary.  
  - Resolution is limited by the electronics and physical size of the MEMS structures.  
  - Temperature changes can affect accuracy.  
- **In practice for gSense:**  
  - The app reads **acceleration including gravity**, smooths the raw data, and computes rolling statistics to reduce the impact of noise.  
  - Logs show real-time fluctuations, giving a hands-on demonstration of sensor behavior.


