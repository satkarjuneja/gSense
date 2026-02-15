let listening = true;
let data = [];


if (typeof DeviceMotionEvent.requestPermission === 'function') {
    DeviceMotionEvent.requestPermission()
        .then(response => {
            if (response === 'granted') {
                console.log("in baby");
                window.addEventListener('devicemotion', handleMotion);
            } else {
                alert("Permission denied");
            }
        })
        .catch(console.error);
} else {
    window.addEventListener('devicemotion', handleMotion);
}

let alpha = 0.1;          // smoothing factor
let windowTime = 0.5;     // half-second rolling window
let samplingRate = 50;    // approx. samples per second
let windowSize = Math.ceil(windowTime * samplingRate);


let smoothed = { x: 0, y: 0, z: 0 };

function handleMotion(event) {
    if (!listening) return;

    smoothed.x = alpha * event.accelerationIncludingGravity.x + (1 - alpha) * smoothed.x;
    smoothed.y = alpha * event.accelerationIncludingGravity.y + (1 - alpha) * smoothed.y;
    smoothed.z = alpha * event.accelerationIncludingGravity.z + (1 - alpha) * smoothed.z;

    const mag = Math.sqrt(smoothed.x ** 2 + smoothed.y ** 2 + smoothed.z ** 2);

    //store in data and maintain rolling window
    data.push(mag);
    if (data.length > windowSize) data.shift(); // keep last N samples

    //mean
    const mean = data.reduce((sum, v) => sum + v, 0) / data.length;

    //compute standard deviation
    const variance = data.reduce((sum, v) => sum + (v - mean) ** 2, 0) / (data.length - 1);
    const stdError = Math.sqrt(variance / data.length);

    //display results
    document.getElementById('output').innerHTML =
        `g ≈ ${mean.toFixed(3)} ± ${stdError.toFixed(3)} m/s²<br>` +
        `Last sample: ${mag.toFixed(3)} m/s²`;
}
