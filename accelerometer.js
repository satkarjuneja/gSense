let listening = false;
let data = [];           // smoothed/processed for mean/median
let rawData = [];        // all raw samples for log

// Smoothing and rolling window for mean/median
let alpha = 0.1;         
let windowTimeMean = 1;   // 1 second rolling window for stats
let samplingRate = 50;
let windowSizeMean = Math.ceil(windowTimeMean * samplingRate);

// Rolling window for log display (last 10 seconds)
let windowTimeLog = 10;
let windowSizeLog = Math.ceil(windowTimeLog * samplingRate);

let smoothed = { x: 0, y: 0, z: 0 };

// Start/Stop buttons
document.getElementById('startBtn').addEventListener('click', () => listening = true);
document.getElementById('stopBtn').addEventListener('click', () => listening = false);

// DeviceMotion permission
if (typeof DeviceMotionEvent.requestPermission === 'function') {
    DeviceMotionEvent.requestPermission()
        .then(response => {
            if (response === 'granted') {
                window.addEventListener('devicemotion', handleMotion);
            } else {
                alert("Permission denied");
            }
        })
        .catch(console.error);
} else {
    window.addEventListener('devicemotion', handleMotion);
}

// Median function
function median(arr) {
    const sorted = [...arr].sort((a,b) => a-b);
    const mid = Math.floor(sorted.length/2);
    return arr.length % 2 !== 0 ? sorted[mid] : (sorted[mid-1]+sorted[mid])/2;
}

function handleMotion(event) {
    if (!listening) return;

    // smoothing
    smoothed.x = alpha * event.accelerationIncludingGravity.x + (1 - alpha) * smoothed.x;
    smoothed.y = alpha * event.accelerationIncludingGravity.y + (1 - alpha) * smoothed.y;
    smoothed.z = alpha * event.accelerationIncludingGravity.z + (1 - alpha) * smoothed.z;

    // magnitude
    const mag = Math.sqrt(smoothed.x ** 2 + smoothed.y ** 2 + smoothed.z ** 2);

    // store for stats
    data.push(mag);
    if (data.length > windowSizeMean) data.shift();

    // store for log (raw)
    rawData.push(event.accelerationIncludingGravity);
    if (rawData.length > windowSizeLog) rawData.shift();
}

// Update display every second
setInterval(() => {
    if(data.length === 0) return;

    // compute stats from rolling window
    const mean = data.reduce((sum,v)=>sum+v,0)/data.length;
    const med = median(data);

    document.getElementById('mean').innerText = mean.toFixed(3) + " m/s²";
    document.getElementById('median').innerText = med.toFixed(3) + " m/s²";

    // update log (last 10s)
    const logContainer = document.getElementById('log');
    logContainer.innerHTML = '';
    rawData.forEach((sample,i) => {
        const mag = Math.sqrt(sample.x**2 + sample.y**2 + sample.z**2);
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        entry.innerText = `t-${rawData.length-i}s: ${mag.toFixed(3)} m/s²`;
        logContainer.appendChild(entry);
    });

    logContainer.scrollTop = logContainer.scrollHeight;
}, 1000);
