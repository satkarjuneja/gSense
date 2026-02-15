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
    // No permission API → just listen
    window.addEventListener('devicemotion', handleMotion);
}