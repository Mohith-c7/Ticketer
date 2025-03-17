import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, getDocs , writeBatch} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

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

const concertsContainer = document.getElementById("concertsContainer");

async function fetchConcerts() {
    try {
        const concertsRef = collection(db, "concerts");
        const snapshot = await getDocs(concertsRef);

        let concertCount = 0;
        concertsContainer.innerHTML = ""; // Clear previous data

        snapshot.forEach((doc) => {
            const concert = doc.data();
            createConcertCard(concert);
        });

    } catch (error) {
        console.error("Error fetching concerts:", error);
    }
}

// ✅ Function to create and append a concert card
function createConcertCard(concert) {
    const concertCard = document.createElement("div");
    concertCard.classList.add("concert-card");

    concertCard.innerHTML = `
        <img src="${concert.Image}" alt="${concert.Title}">
        <div class="concert-info">
            <div class="concert-title">${concert.Title}</div>
            <div class="concert-location">${concert.Location}</div>
        </div>
    `;

    concertsContainer.appendChild(concertCard);
}

// ✅ Fetch concerts when the page loads
document.addEventListener("DOMContentLoaded", () => {
    fetchConcerts();
});


async function addSeats(movieId , theatreId, showtimeId) {
    const db = getFirestore();
    const batch = writeBatch(db); // ✅ Start batch operation

    const seatRows = ["A", "B", "C", "D"]; // ✅ Define rows
    const seatNumbers = [1, 2, 3, 4, 5]; // ✅ Define seat numbers

    seatRows.forEach(row => {
        seatNumbers.forEach(number => {
            const seatId = `${row}${number}`; // ✅ Create seat ID (e.g., A1, B2)
            const seatRef = doc(db, "Movies", movieId, "Theatres", theatreId, "Timings", showtimeId, "Seats", seatId);

            batch.set(seatRef, {
                bookedBy: "",
                status: "available"
            });
        });
    });

    try {
        await batch.commit(); // ✅ Commit batch write to Firestore
        console.log("✅ All seats added successfully!");
    } catch (error) {
        console.error("❌ Error adding seats:", error);
    }
}


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
    if (window.scrollY > 0) {
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
