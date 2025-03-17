// ✅ Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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

// ✅ Get Movie & Theatre ID from URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("movieId");
const theatreId = urlParams.get("theatreId");
const showTime = urlParams.get("showTime");

if (movieId && theatreId && showTime) {
    fetchMovieAndTheatreDetails(movieId, theatreId, showTime);
} else {
    console.error("❌ Missing required parameters from URL!");
}

// ✅ Fetch Movie & Theatre Details
async function fetchMovieAndTheatreDetails(movieId, theatreId, showTime) {
    try {
        console.log("🔍 Fetching movie, theatre, and showtime details...");

        const movieRef = doc(db, "Movies", movieId);
        const theatreRef = doc(db, "Movies", movieId, "Theatres", theatreId);
        const showTimeRef = doc(db, "Movies", movieId, "Theatres", theatreId, "Timings", showTime);

        const [movieSnap, theatreSnap, showTimeSnap] = await Promise.all([
            getDoc(movieRef),
            getDoc(theatreRef),
            getDoc(showTimeRef)
        ]);

        if (movieSnap.exists()) {
            const movie = movieSnap.data();
            console.log("✅ Movie Data:", movie);
            document.querySelector(".movie-poster").src = movie.Image || "default-movie.jpg";
            document.querySelector(".movie-name").innerText = movie.Title || "Unknown Title";
            document.querySelector(".movie-format").innerText = `${movie.Language} | ${movie.Formats || "N/A"}`;
        } else {
            console.error("❌ Movie not found in Firestore.");
        }

        if (theatreSnap.exists()) {
            const theatre = theatreSnap.data();
            console.log("✅ Theatre Data:", theatre);
            document.querySelector(".theater-name").innerText = theatre.Tname || "Unknown Theatre";
        } else {
            console.error("❌ Theatre not found in Firestore.");
        }

        if (showTimeSnap.exists()) {
            console.log("✅ Showtime Data:", showTimeSnap.data());
            document.querySelector(".show-time").innerText = showTime || "Unknown Showtime";
        } else {
            console.error("❌ Showtime not found in Firestore.");
        }
    } catch (error) {
        console.error("❌ Error fetching data:", error);
    }
}

// ✅ Seat Selection Logic
document.addEventListener("DOMContentLoaded", function () {
    const seats = document.querySelectorAll(".seating-layout .seat:not(.reserved)");
    const screenDetailsElement = document.querySelector(".screen-details");
    const priceDisplay = document.querySelector(".price-info p");
    const ticketPrice = 295;

    function updateSelectedSeats() {
        const selectedSeats = document.querySelectorAll(".seating-layout .seat.selected");
        const selectedSeatIds = [...selectedSeats].map(seat => seat.dataset.id);

        screenDetailsElement.textContent = selectedSeatIds.length > 0 
            ? selectedSeatIds.join(" | ") 
            : "Choose your seats";

        priceDisplay.textContent = selectedSeats.length > 0 
            ? `Total Price: ₹${selectedSeats.length * ticketPrice}` 
            : "Gold 295/-";
    }

    seats.forEach(seat => {
        seat.addEventListener("click", function () {
            if (!this.classList.contains("reserved")) {
                this.classList.toggle("selected");
                updateSelectedSeats();
            }
        });
    });

    const paymentButton = document.querySelector(".payment-btn");
    if (paymentButton) {
        paymentButton.addEventListener("click", function () {
            const selectedSeats = document.querySelectorAll(".seating-layout .seat.selected");
            if (selectedSeats.length > 0) {
                window.location.href = `payment.html?movieId=${movieId}&theatreId=${theatreId}&showTime=${showTime}`;
            } else {
                alert("Please select at least one seat to proceed.");
            }
        });
    }
});

// ✅ Navigation Active Tab Logic
document.addEventListener("DOMContentLoaded", function () {
    const navItems = document.querySelectorAll(".nav-item");
    const currentPage = window.location.pathname.split("/").pop();

    navItems.forEach(item => {
        if (item.getAttribute("href") === currentPage) {
            item.classList.add("active");
        }

        item.addEventListener("click", function () {
            localStorage.setItem("activeNav", this.getAttribute("href"));
        });
    });
});

// ✅ Loading Effect
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.movie-name, .movie-format, .theater-name, .show-time, .screen-details, .movie-poster')
        .forEach(el => el.classList.add('loading-text'));

    setTimeout(() => {
        document.querySelectorAll('.loading-text').forEach(el => {
            el.classList.remove('loading-text');
            el.classList.add('loaded');
        });
    }, 2000);

    document.querySelector('.movie-poster').addEventListener('load', function () {
        this.classList.remove('loading-text');
        this.classList.add('loaded');
    });
});

// ✅ Payment Modal Handling
document.addEventListener('DOMContentLoaded', function() {
    const paymentButton = document.querySelector('.pay-btn');
    const paymentModal = document.querySelector('.modal');
    const checkoutButton = document.querySelector('.purchase--btn');

    if (paymentModal) {
        paymentModal.style.display = 'none';
    }

    if (paymentButton && paymentModal) {
        paymentButton.addEventListener('click', function(e) {
            e.preventDefault();
            paymentModal.style.display = 'flex';
        });

        paymentModal.addEventListener('click', function(e) {
            if (e.target === paymentModal) {
                paymentModal.style.display = 'none';
            }
        });

        if (checkoutButton) {
            checkoutButton.addEventListener('click', function(e) {
                e.preventDefault();
                setTimeout(() => {
                    paymentModal.style.display = 'none';
                }, 800);
            });
        }
    }
});
