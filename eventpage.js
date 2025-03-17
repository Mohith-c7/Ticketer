// ✅ Import Firebase (Modular)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// ✅ Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDqHCy1VCg0izImgnxnnnLN_O3Ep2rco",
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

// ✅ Get Event ID from URL
const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get("id");

console.log("🎤 Event ID from URL:", eventId); // ✅ Debugging

if (!eventId) {
    console.error("❌ No Event ID found in URL!");
    document.querySelector(".container").innerHTML = "<p>Error: No Event ID provided.</p>";
} else {
    fetchEventDetails(eventId);
}

// ✅ Fetch Event Details
async function fetchEventDetails(eventId) {
    try {
        const eventRef = doc(db, "concerts", eventId);
        const docSnap = await getDoc(eventRef);

        if (docSnap.exists()) {
            let event = docSnap.data();
            console.log("✅ Event found in Firestore:", event);

            // ✅ Update HTML Elements with Event Data
            document.querySelector(".match-title").innerText = event.Title || "No Title";
            document.querySelector(".event-poster").src = event.Image || "default-event.jpg";

            document.querySelector(".location").innerText = event.Location || "No Location";

        } else {
            console.error("❌ Event document NOT FOUND in Firestore.");
            document.querySelector(".container").innerHTML = "<p>Event not found.</p>";
        }
    } catch (error) {
        console.error("❌ Error fetching event:", error);
        document.querySelector(".container").innerHTML = "<p>Error loading event details.</p>";
    }
}

// ✅ Highlight Active Navbar Item
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


