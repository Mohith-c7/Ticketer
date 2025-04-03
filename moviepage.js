
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, doc, getDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyDqHCYvL1VCg0izImgnxnnnLN_O3Ep2rco",
    authDomain: "ticketer-e269a.firebaseapp.com",
    projectId: "ticketer-e269a",
    storageBucket: "ticketer-e269a.appspot.com",
    messagingSenderId: "1027031718336",
    appId: "1:1027031718336:web:12ef7e714b0ca798ed1025",
    measurementId: "G-M8RMRWHMP8"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

console.log("🎬 Movie ID from URL:", movieId); 

if (!movieId) {
    console.error("❌ No Movie ID found in URL!");
    document.querySelector(".content-container").innerHTML = "<p>Error: No movie ID provided.</p>";
} else {
    fetchMovies(movieId);
}

async function fetchMovies(movieId) {
    try {
        const movieRef = doc(db, "Movies", movieId);
        const docSnap = await getDoc(movieRef);

        if (docSnap.exists()) {
            let movie = docSnap.data();
            console.log("✅ Movie found in Firestore:", movie);

            // ✅ Update HTML Elements with Movie Data
            document.querySelector(".Movie-name").innerText = movie.Title || "No Title";
            document.querySelector(".movie-rating").innerText = movie.Rating ? `${movie.Rating}` : "No Rating";
            document.querySelector(".movie-details").innerText = 
                `${movie.Duration || "N/A"} • ${movie.Genre || "N/A"} • ${movie.Certified || "N/A"} • ${movie.Releasedate || "N/A"}`;
            document.querySelector(".movie-formats").innerText = movie.Formats || "N/A";
            document.querySelector(".movie-about").innerText = movie.About || "No Description Available";
            
            // ✅ Update Movie Poster
            document.querySelector(".movie-poster").src = movie.Image || "default-movie.jpg";

            // ✅ Update Trailer if Available
            const trailerElement = document.querySelector(".movie-trailer");
            if (trailerElement) {
                trailerElement.muted = true; 
                let trailerUrl = movie.Trailer ? `${movie.Trailer}` : "path-to-your-trailers/default-trailer.mp4";
                trailerElement.src = trailerUrl;
                trailerElement.load();
                trailerElement.currentTime = movie.startTime;
                trailerElement.play().catch(error => console.error("Autoplay blocked:", error));

            }
            fetchTheatres(movieId);
        } else {
            console.error("❌ Movie document NOT FOUND in Firestore.");
            document.querySelector(".content-container").innerHTML = "<p>Movie not found.</p>";
        }
    } catch (error) {
        console.error("❌ Error fetching movie:", error);
        document.querySelector(".content-container").innerHTML = "<p>Error loading movie details.</p>";
    }
}


async function fetchTheatres(movieId) {
    try {
        const theatresRef = collection(db, "Movies", movieId, "Theatres");
        const querySnapshot = await getDocs(theatresRef);

        if (querySnapshot.empty) {
            console.log("❌ No theatres found for this movie.");
            document.getElementById("theatre-list").innerHTML = '<p style="color: white; font-size: 24px;">No theatres available.</p>';
            return;
        }

        const theatreContainer = document.getElementById("theatre-list");
        if (!theatreContainer) {
            console.error("❌ Element with ID 'theatre-list' not found.");
            return;
        }

        theatreContainer.innerHTML = ""; 

    
        for (const theatreDoc of querySnapshot.docs) {
            const theatreData = theatreDoc.data();
            console.log("🎭 Theatre:", theatreData);

            const theatreElement = document.createElement("div");
            theatreElement.classList.add("theater");
            theatreElement.innerHTML = `
                <h2 class="theater-name">${theatreData.Tname}</h2>
                <p class="theater-location">${theatreData.Tlocation}</p>
                <div class="amenities">
                    <div class="amenity">Cancellation Available</div>
                </div>
                <div class="showtimes"></div> <!-- Empty container for showtimes -->
            `;


            theatreContainer.appendChild(theatreElement);

            const showtimesContainer = theatreElement.querySelector(".showtimes");

            const timingsRef = collection(db, `Movies/${movieId}/Theatres/${theatreDoc.id}/Timings`);
            const timingsSnapshot = await getDocs(timingsRef);

            if (!timingsSnapshot.empty) {
                timingsSnapshot.forEach((timingDoc) => {
                    const timingData = timingDoc.data();
                    console.log("⏰ Showtime Data:", timingData);

                    const button = document.createElement("button");
                    button.classList.add("showtime-btn");
                    button.innerHTML = `
                        <span class="time">${timingData.Time}</span>
                        <span class="screen-type">${timingData.screen}</span>
                    `;
                    button.addEventListener("click", () => {
                        window.location.href = `seats.html?movieId=${movieId}&theatreId=${theatreDoc.id}&showTime=${timingData.Time}`;
                    });

                    showtimesContainer.appendChild(button);
                });
            } else {
                console.log("❌ No showtimes found.");
            }
        }
    } catch (error) {
        console.error("❌ Error fetching theatres:", error);
    }
}


document.addEventListener("DOMContentLoaded", function () {
    const navItems = document.querySelectorAll(".nav-item");
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
    console.log("DOM fully loaded");

    const bookTicketsBtn = document.getElementById("book-tickets-btn");
    const theatreSection = document.getElementById("theatre-section");

    if (!bookTicketsBtn) {
        console.error("❌ Button not found! Check if #book-tickets-btn exists in HTML.");
    }
    if (!theatreSection) {
        console.error("❌ Theatre section not found! Check if #theatre-section exists in HTML.");
    }

    if (bookTicketsBtn && theatreSection) {
        console.log("✅ Button and section found!");
        
        bookTicketsBtn.addEventListener("click", function () {
            console.log("🎯 Button clicked! Scrolling to theatre section...");
            theatreSection.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const dateItems = document.querySelectorAll(".date-item");

    dateItems.forEach(item => {
        item.addEventListener("click", function () {
            // Remove 'active' class from all date items
            document.querySelector(".date-item.active")?.classList.remove("active");

            // Add 'active' class to the clicked item
            this.classList.add("active");
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector(".view-dev-info");

    button.addEventListener("click", function () {
        window.location.href = "devinfo.html"; 
    });
});

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
