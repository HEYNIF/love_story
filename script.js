// Floating Hearts Generation
const floatingHeartsContainer = document.querySelector('.floating-hearts');
const heartImages = ['assets/images/heart.png']; // Array of heart image paths

function createHeart() {
    const heart = document.createElement('img');
    heart.src = heartImages[Math.floor(Math.random() * heartImages.length)];
    heart.alt = 'Heart';
    
    // Randomize size between 20px and 40px
    const size = Math.random() * 20 + 20; // 20px to 40px
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    
    // Random horizontal position
    heart.style.left = `${Math.random() * 100}%`;
    
    // Random delay and duration
    const delay = Math.random() * 5;
    const duration = Math.random() * 5 + 5; // 5s to 10s
    heart.style.animation = `floatUp ${duration}s linear ${delay}s infinite`;
    
    floatingHeartsContainer.appendChild(heart);
    
    // Remove heart after animation completes to prevent DOM overload
    setTimeout(() => {
        heart.remove();
    }, (delay + duration) * 1000);
}

// Generate hearts at intervals
setInterval(createHeart, 500); // Every 0.5 seconds

// Contact Form Submission Handler (Removed as per request)
// ... No contact form code ...

// Initialize Leaflet Map
var map = L.map('map').setView([22.0, 80.0], 5); // Centered between Saudi Arabia and India

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Add marker for Saudi Arabia
var markerSaudi = L.marker([26.3592, 43.9818]).addTo(map)
    .bindPopup('<b>You are in Saudi Arabia!</b>')
    .openPopup();

// Add marker for India
var markerIndia = L.marker([19.1761, 73.0229]).addTo(map)
    .bindPopup('<b>She is in India!</b>');

// Draw a polyline between Saudi Arabia and India
var latlngs = [
    [23.8859, 45.0792], // Saudi Arabia
    [20.5937, 78.9629]  // India
];

var polyline = L.polyline(latlngs, {color: 'blue'}).addTo(map);

// Adjust the map view to fit the polyline
map.fitBounds(polyline.getBounds());

// Music Toggle Button Functionality
document.getElementById('music-toggle').addEventListener('click', function() {
    var music = document.getElementById('background-music');
    if(music.paused) {
        music.play();
        this.textContent = 'Pause Music';
    } else {
        music.pause();
        this.textContent = 'Play Music';
    }
});

// Initialize GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Animate Events on Scroll
gsap.utils.toArray('.event').forEach(function(event) {
    gsap.from(event, {
        scrollTrigger: {
            trigger: event,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out'
    });
});
