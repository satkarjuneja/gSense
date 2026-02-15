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


function handleMotion(event) {
    if (!listening) return; // stop collecting if not started
    const x = event.accelerationIncludingGravity.x;
    const y = event.accelerationIncludingGravity.y;
    const z = event.accelerationIncludingGravity.z;
    const mag = Math.sqrt(x*x + y*y + z*z);
    data.push(mag);

    document.getElementById('output').innerHTML = `Last sample: ${mag.toFixed(2)} m/s²`;
}