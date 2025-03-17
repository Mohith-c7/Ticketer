console.log("JS file loaded successfully");

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

    const maxRows = 12;
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
    const button = document.querySelector(".view-dev-info");

    // Add event listener to redirect when clicked
    button.addEventListener("click", function () {
        window.location.href = "devinfo.html"; 
    });
});