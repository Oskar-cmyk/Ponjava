// Check if the user is on a mobile device
const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (!isMobileDevice) {
    // Execute the script only if not on a mobile device
    let isMoving = true; // Initialize to true for "Preteguj" option
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
        if (isMoving) {
            toggleButton.textContent = 'Razgrni'; // Set button text to "Razgrni" when effect is on
        } else {
            toggleButton.textContent = 'Preteguj'; // Set button text to "Preteguj" when effect is off
            resetRectangle(); // Reset the rectangle to its natural position
        }
    }

    // Event listener to handle mouse movement and update the rectangle
    document.addEventListener('mousemove', updateRectangle);

    // Event listener to handle button click and toggle the effect
    toggleButton.addEventListener('click', toggleEffect);

    // Initial text content of the button based on the initial state of the effect
    toggleButton.textContent = isMoving ? 'Razgrni' : 'Preteguj';
}

// script.js
let map;

function initMap() {
    // Initialize the map
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: YOUR_LATITUDE, lng: YOUR_LONGITUDE }, // Replace with your location's latitude and longitude
        zoom: 8, // Adjust zoom level as needed
    });

    // Add a marker for the location
    const marker = new google.maps.Marker({
        position: { lat: YOUR_LATITUDE, lng: YOUR_LONGITUDE }, // Replace with your location's latitude and longitude
        map: map,
        title: "Your Location", // Tooltip for the marker
    });
}

