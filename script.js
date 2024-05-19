// Check if the user is on a mobile device
const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (isMobileDevice && window.DeviceOrientationEvent) {
    // Execute the script only if on a mobile device and DeviceOrientationEvent is supported
    let isMoving = true; // Initialize to true for "Preteguj" option
    const toggleButton = document.getElementById('toggleButton');

    // Function to update the rectangle based on device orientation
    function updateRectangle(event) {
        if (!isMoving) return; // Skip updating if effect is off
        const rectangle = document.querySelector('.rectangle');
        const container = document.querySelector('.container');
        const rect = container.getBoundingClientRect();
        
        // Extract rotation angles from device orientation data
        const rotateX = event.beta; // Vertical rotation (around x-axis)
        const rotateY = event.gamma; // Horizontal rotation (around y-axis)

        // Apply transformations to the rectangle
        rectangle.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

    // Function to reset the rectangle to its natural position
    function resetRectangle() {
        const rectangle = document.querySelector('.rectangle');
        rectangle.style.transform = 'none'; // Reset the transformation
    }

    // Function to toggle the effect and update the button text
    function toggleEffect() {
        isMoving = !isMoving; // Toggle the flag
        if (isMoving) {
            toggleButton.textContent = 'Razgrni'; // Set button text to "Razgrni" when effect is on
        } else {
            toggleButton.textContent = 'Preteguj'; // Set button text to "Preteguj" when effect is off
            resetRectangle(); // Reset the rectangle to its natural position
        }
    }

    // Event listener to handle device orientation and update the rectangle
    window.addEventListener('deviceorientation', updateRectangle);

    // Event listener to handle button click and toggle the effect
    toggleButton.addEventListener('click', toggleEffect);

    // Initial text content of the button based on the initial state of the effect
    toggleButton.textContent = isMoving ? 'Razgrni' : 'Preteguj';
}
