// ✅ Import Firebase properly (Updated to v9+ modular imports)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// ✅ Firebase Configuration
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

// ✅ Ensure sportsContainer exists before using it
const sportsContainer = document.getElementById("sportsContainer");
if (sportsContainer) {
    fetchSports();
}

// ✅ Fetch Sports Events from Firestore
async function fetchSports() {
    try {
        const querySnapshot = await getDocs(collection(db, "sports"));
        const sports = [];

        querySnapshot.forEach((doc) => {
            sports.push({ id: doc.id, ...doc.data() }); // Ensure ID is included
        });

        displaySports(sports);
    } catch (error) {
        console.error("❌ Error fetching sports events:", error);
    }
}

// ✅ Display Sports Cards
function displaySports(sports) {
    if (!sportsContainer) return; // Avoid errors if container is missing

    sportsContainer.innerHTML = ""; // Clear previous events

    const maxRows = 2;
    const sportsPerRow = 3;
    const maxSports = maxRows * sportsPerRow; // Limit sports events to max 6

    const limitedSports = sports.slice(0, maxSports);

    limitedSports.forEach((sportEvent) => {
        const sportsCard = document.createElement("div");
        sportsCard.classList.add("sports-card");

        sportsCard.innerHTML = `
            <img src="${sportEvent.Image || 'default.jpg'}" alt="${sportEvent.Title}">
            <div class="sports-info">
                <div class="sports-title">${sportEvent.Title || "Untitled Event"}</div>
                <div class="sports-venue">${sportEvent.Venue || "Unknown Venue"}</div>
            </div>
        `;

        // ✅ Ensure sportEvent.id exists before setting click event
        if (sportEvent.id) {
            sportsCard.onclick = function () {
                console.log("Redirecting to event page with ID:", sportEvent.id);
                window.location.href = `sportbooking.html?id=${sportEvent.id}`;
            };
        }

        sportsContainer.appendChild(sportsCard);
    });
}

// ✅ Highlight Active Navbar Item Based on URL
document.addEventListener("DOMContentLoaded", function () {
    const navItems = document.querySelectorAll(".nav-item");

    if (navItems.length === 0) return; // Avoid errors if no nav items exist

    // Get the current page URL
    const currentPage = window.location.pathname.split("/").pop();

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

// ✅ Button Redirection Logic
document.addEventListener("DOMContentLoaded", function () {
    // ✅ View Tech Stack Button
    const techStackButton = document.querySelector(".view-tech-stack");
    if (techStackButton) {
        techStackButton.addEventListener("click", function () {
            window.location.href = "techstack.html";
        });
    }

    // ✅ View Dev Info Button
    const devInfoButton = document.querySelector(".view-dev-info");
    if (devInfoButton) {
        devInfoButton.addEventListener("click", function () {
            window.location.href = "devinfo.html";
        });
    }
});

// ✅ Navbar Scroll Effect
window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar-background-shape");
    if (navbar) {
        if (window.scrollY > 0) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }
});
