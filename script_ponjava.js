// Check if the user is on an iPhone or Android
const isIPhone = /iPhone|iPod/i.test(navigator.userAgent);
const isAndroid = /Android/i.test(navigator.userAgent);

if ((isIPhone || isAndroid) && window.DeviceOrientationEvent) {
    // Execute the script using gyroscope for iPhones and Android devices
    initializeGyroEffect();
} else {
    // Hide the "Request Permission" button on other devices
    const requestPermissionButton = document.getElementById('requestPermissionButton');
    requestPermissionButton.style.display = 'none';

    // Execute the script using mouse movement for non-gyroscope devices
    initializeMouseEffect();
}

function initializeGyroEffect() {
    let isMoving = true; // Initialize to true for "Razgrni" option
    

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
    enableGyro();
    // Event listener to handle device orientation and update the rectangle
    function enableGyro() {
        window.addEventListener('deviceorientation', updateRectangle);
    }
}

function initializeMouseEffect() {
    let isMoving = true; // Initialize to true for "Razgrni" option
    const toggleButton = document.getElementById('toggleButton');

    // Function to update the rectangle based on mouse movement
    function updateRectangle(event) {
        if (!isMoving) return; // Skip updating if effect is off
        const rectangle = document.querySelector('.rectangle');
        const container = document.querySelector('.container');
        const rect = container.getBoundingClientRect();
        const centerX = rect.width / 2; // Center of the container horizontally
        const centerY = rect.height / 2; // Center of the container vertically
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        // Calculate rotation angles
        const rotateX = -((mouseY / rect.height) - 0.5) * -30; // Rotate between -15 to 15 degrees
        const rotateY = ((mouseX / rect.width) - 0.5) * -30;  // Rotate between -15 to 15 degrees

        // Calculate scaling factors for fisheye effect
        const distanceFromCenterX = mouseX - centerX;
        const distanceFromCenterY = mouseY - centerY;
        const maxDistanceX = rect.width / 2;
        const maxDistanceY = rect.height / 2;
        const scaleFactorX = 1 + (Math.pow((distanceFromCenterX / maxDistanceX), 2) * 2); // Magnify the center, compress the edges
        const scaleFactorY = 1 + (Math.pow((distanceFromCenterY / maxDistanceY), 2) * 2); // Magnify the center, compress the edges

        // Calculate translation offsets to keep the cursor at the center of the fisheye effect
        const translateX = (rect.width / 2) - mouseX;
        const translateY = (rect.height / 2) - mouseY;

        // Apply transformations to the rectangle
        rectangle.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scaleFactorX}, ${scaleFactorY}) translate(${translateX}px, ${translateY}px)`;
    }

    // Function to reset the rectangle to its natural position
    function resetRectangle() {
        const rectangle = document.querySelector('.rectangle');
        rectangle.style.transform = 'none'; // Reset the transformation
    }

    // Function to toggle the effect and update the button text
    function toggleEffect() {
        isMoving = !isMoving; // Toggle the flag
        updateToggleButtonText();
        if (!isMoving) {
            resetRectangle(); // Reset the rectangle to its natural position
        }
    }

    // Function to update the toggle button text
    function updateToggleButtonText() {
        if (isMoving) {
            toggleButton.textContent = 'Razgrni'; // Set button text to "Razgrni" when effect is on
        } else {
            toggleButton.textContent = 'Preteguj'; // Set button text to "Preteguj" when effect is off
        }
        console.log(`Button text: ${toggleButton.textContent}`); // Debugging: Log the button text
    }

    // Event listener to handle mouse movement and update the rectangle
    document.addEventListener('mousemove', updateRectangle);

    // Event listener to handle button click and toggle the effect
    toggleButton.addEventListener('click', toggleEffect);

    // Initial text content of the button based on the initial state of the effect
    updateToggleButtonText();
}

// Function to generate a random color in hexadecimal format
function getRandomColor() {
    // Generate random RGB values
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    // Convert RGB to hexadecimal format
    const color = '#' + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0');
    
    return color;
}

// Function to apply a new color if the stored color is older than one hour
function applyHourlyColor() {
    const rectangle = document.getElementById('rectangle');
    const now = Date.now();
    const lastUpdateTime = localStorage.getItem('lastUpdateTime');
    const storedColor = localStorage.getItem('rectangleColor');
    const oneHour = 60 * 60 * 1000;

    if (!storedColor || !lastUpdateTime || now - lastUpdateTime > oneHour) {
        const newColor = getRandomColor();
        localStorage.setItem('rectangleColor', newColor);
        localStorage.setItem('lastUpdateTime', now);
        rectangle.style.backgroundColor = newColor;
    } else {
        rectangle.style.backgroundColor = storedColor;
    }
}

// Apply the random color when the page is loaded
document.addEventListener('DOMContentLoaded', applyHourlyColor);

// Apply a new random color every hour
setInterval(applyHourlyColor, 3600000); // 3600000 milliseconds = 1 hour

document.addEventListener('DOMContentLoaded', function () {
    // Get the modal
    var modal = document.getElementById("imageModal");

    // Get the Ponjava text element
    var ponjavaText = document.getElementById("text");

    // Show the modal on page load
    modal.style.display = "flex";

    // When the user clicks anywhere on the modal, close it
    modal.onclick = function() {
        modal.style.display = "none";
        if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        // Initialize gyroscope effect if permission granted
                        initializeGyroEffect();
                    } else {
                        // Handle cases where permission denied
                        alert("Permission denied for gyroscope");
                    }
                })
                .catch(console.error);
        } else {
            // If gyroscope or permission request not supported, show an alert
            pass
        }
    }

    // When the user clicks on the Ponjava text, show the modal
    ponjavaText.onclick = function() {
        modal.style.display = "flex";
    }
    
});


