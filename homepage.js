console.log("JS file loaded successfully");


document.addEventListener("DOMContentLoaded", function () {
    const backgroundVideo = document.querySelector(".background-video");
    console.log("Background video element:", backgroundVideo);
    
    const imageBoxes = document.querySelectorAll(".image-box");
    console.log("Number of image boxes found:", imageBoxes.length);

    imageBoxes.forEach((imageBox) => {
        imageBox.addEventListener("click", () => {
            console.log("Image clicked:", imageBox.src);
        });
    });
});

const backgroundVideo = document.querySelector(".background-video");
const videoSource = backgroundVideo.querySelector("source");
const imageBoxes = document.querySelectorAll(".image-box");


const videos = {
    "ogthumbnail.jpg": "ogteaser.mp4",
    "hit3thumbnail.png": "hit3teaser.mp4",
    "shreyathumbnail.png": "shreyateaser.mp4"
};

// Function to update the video source properly
function setVideo(videoUrl) {
    videoSource.src = videoUrl;
    backgroundVideo.load();
    backgroundVideo.play();
}


imageBoxes.forEach((imageBox) => {
    imageBox.addEventListener("click", () => {
        const imageSrc = imageBox.getAttribute("src");
        if (videos[imageSrc]) {
            setVideo(videos[imageSrc]);
        }
    });
});

// Select the logo image
const videoLogo = document.getElementById("video-logo");

// Object mapping images to corresponding logos
const logos = {
    "ogthumbnail.jpg": "oglogo.png",
    "hit3thumbnail.png": "hitlogo.png",
    "shreyathumbnail.png":"shreyalogo.png"
};

// Modify the click event to change the logo
imageBoxes.forEach((imageBox) => {
    imageBox.addEventListener("click", () => {
        const imageSrc = imageBox.getAttribute("src");

        // Change video source if found
        if (videos[imageSrc]) {
            setVideo(videos[imageSrc]); 
        }

        // Change logo if found
        if (logos[imageSrc]) {
            videoLogo.src = logos[imageSrc];
        } else {
            videoLogo.src = "default-logo.png"; // Fallback to default logo
        }
    });
});

// ✅ Import Firebase properly (Updated to v9+ modular imports)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDqHCYvL1VCg0izImgnxnnnLN_O3Ep2rco",
    authDomain: "ticketer-e269a.firebaseapp.com",
    projectId: "ticketer-e269a",
    storageBucket: "ticketer-e269a.appspot.com",
    messagingSenderId: "1027031718336",
    appId: "1:1027031718336:web:12ef7e714b0ca798ed1025",
    measurementId: "G-M8RMRWHMP8"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const moviesContainer = document.getElementById("moviesContainer");

// ✅ Fetch Movies from Firestore
async function fetchMovies() {
    try {
        const querySnapshot = await getDocs(collection(db, "Movies"));
        const movies = [];

        querySnapshot.forEach((doc) => {
            let movieData = doc.data();
            movieData.id = doc.id; 
            movies.push(movieData);
        });

        displayMovies(movies);
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

function displayMovies(movies) {
    moviesContainer.innerHTML = ""; // Clear previous movies

    const maxRows = 3;
    const moviesPerRow = 4;
    const maxMovies = maxRows * moviesPerRow;
    const limitedMovies = movies.slice(0, maxMovies); // Limit movies to max 12

    limitedMovies.forEach((movie) => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        movieCard.innerHTML = `
            <img src="${movie.Image}" alt="${movie.Title}">
            <div class="movie-info">
                <div class="movie-title">${movie.Title}</div>
                <div class="movie-details">${movie.Certified} | ${movie.Language}</div>
            </div>
        `;

        movieCard.onclick = function () {
            console.log("Movie ID before redirect:", movie.id); // Verify movie.id is correct
            if (movie.id) {
                console.log("Redirecting to movie page with ID:", movie.id);
                window.location.href = `moviepage.html?id=${movie.id}`;
            } else {
                console.error("Movie ID is undefined:", movie);
            }
        };

        moviesContainer.appendChild(movieCard);
    });
}

// ✅ Call fetchMovies function
fetchMovies();

// ✅ Function to create and append a concert card
function createConcertCard(concert, concertId) {
    const concertCard = document.createElement("div");
    concertCard.classList.add("concert-card");

    concertCard.innerHTML = `
        <img src="${concert.Image}" alt="${concert.Title}">
        <div class="concert-info">
            <div class="concert-title">${concert.Title}</div>
            <div class="concert-location">${concert.Location}</div>
        </div>
    `;

    concertCard.onclick = function () {
        console.log("Redirecting to event page with ID:", concertId);
        window.location.href = `eventpage.html?id=${concertId}`;
    };

    concertsContainer.appendChild(concertCard);
}

// ✅ Fetch Concerts from Firestore (Fixed)
async function fetchConcerts() {
    try {
        const concertsRef = collection(db, "concerts");
        const snapshot = await getDocs(concertsRef);

        let concertCount = 0;
        concertsContainer.innerHTML = ""; // Clear previous data

        snapshot.forEach((doc) => {
            if (concertCount < 4) { // Only display max 4 concerts
                const concert = doc.data();
                createConcertCard(concert, doc.id); // ✅ Pass Firestore document ID
                concertCount++;
            }
        });

    } catch (error) {
        console.error("Error fetching concerts:", error);
    }
}

// ✅ Call fetchConcerts on page load
fetchConcerts();





const sportsContainer = document.getElementById("sportsContainer");

// ✅ Fetch Sports Events from Firestore
async function fetchSports() {
    try {
        const querySnapshot = await getDocs(collection(db, "sports"));
        const sports = [];

        querySnapshot.forEach((doc) => {
            let sportEvent = doc.data();
            sportEvent.id = doc.id; // Store Firestore document ID
            sports.push(sportEvent);
        });

        displaySports(sports);
    } catch (error) {
        console.error("Error fetching sports events:", error);
    }
}

// ✅ Function to display sports events
function displaySports(sports) {
    sportsContainer.innerHTML = ""; // Clear previous events

    const maxRows = 2;
    const sportsPerRow = 3;
    const maxSports = maxRows * sportsPerRow; // Limit to max 6 events

    const limitedSports = sports.slice(0, maxSports); 

    limitedSports.forEach((sportEvent) => {
        const sportsCard = document.createElement("div");
        sportsCard.classList.add("sports-card");

        sportsCard.innerHTML = `
            <img src="${sportEvent.Image}" alt="${sportEvent.Title}">
            <div class="sports-info">
                <div class="sports-title">${sportEvent.Title}</div>
                <div class="sports-venue">${sportEvent.Venue}</div>
            </div>
        `;

        // ✅ Corrected `onclick` event
        sportsCard.onclick = function () {
            console.log("Redirecting to event page with ID:", sportEvent.id);
            window.location.href = `sportbooking.html?id=${sportEvent.id}`;
        };

        sportsContainer.appendChild(sportsCard);
    });
}

fetchSports(); // Fetch sports events on page load



document.addEventListener("DOMContentLoaded", function () {
    // Select the button
    const button = document.querySelector(".explore-all");

    // Add event listener to redirect when clicked
    button.addEventListener("click", function () {
        window.location.href = "movies.html"; // Replace with your actual page
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Select the button
    const button = document.querySelector(".explore-all-concerts");

    // Add event listener to redirect when clicked
    button.addEventListener("click", function () {
        window.location.href = "concerts.html"; 
    });
});


document.addEventListener("DOMContentLoaded", function () {
    // Select the button
    const button = document.querySelector(".explore-all-sports");

    // Add event listener to redirect when clicked
    button.addEventListener("click", function () {
        window.location.href = "sports.html"; 
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const navItems = document.querySelectorAll(".nav-item");

    // Get the current page URL
    const currentPage = window.location.pathname.split("/").pop();

    // Set active class based on URL
    navItems.forEach(item => {
        if (item.getAttribute("href") === currentPage) {
            item.classList.add("active");
        }

        // Save the active tab on click
        item.addEventListener("click", function () {
            localStorage.setItem("activeNav", this.getAttribute("href"));
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Select the button
    const button = document.querySelector(".view-tech-stack");

    // Add event listener to redirect when clicked
    button.addEventListener("click", function () {
        window.location.href = "techstack.html"; 
    });
});

window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar-background-shape");
    if (window.scrollY > 210) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Select the button
    const button = document.querySelector(".book-tickets");

    // Add event listener to redirect when clicked
    button.addEventListener("click", function () {
        window.location.href = "movies.html"; 
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Select the button
    const button = document.querySelector(".view-dev-info");

    // Add event listener to redirect when clicked
    button.addEventListener("click", function () {
        window.location.href = "devinfo.html"; 
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const locationDisplay = document.getElementById("locationDisplay");
    const locationSpinner = document.getElementById("locationSpinner");

    function updateLocation(city) {
        locationDisplay.innerText = city || "City not found";
        locationSpinner.style.display = "none"; // Hide spinner
    }

    function getCityByGPS() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`); // Debugging

                    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`)
                        .then(response => response.json())
                        .then(data => {
                            console.log("Location Data:", data); // Debugging
                            if (data.address && data.address.city) {
                                updateLocation(data.address.city);
                            } else if (data.address && data.address.town) {
                                updateLocation(data.address.town);
                            } else if (data.address && data.address.village) {
                                updateLocation(data.address.village);
                            } else {
                                updateLocation("City not found");
                            }
                        })
                        .catch(error => {
                            console.error("Error fetching city:", error);
                            updateLocation("Error fetching location");
                        });
                },
                error => {
                    console.warn("Geolocation Error:", error);
                    updateLocation("Location permission denied");
                }
            );
        } else {
            updateLocation("Geolocation not supported");
        }
    }

    // Call function on page load
    getCityByGPS();
});

