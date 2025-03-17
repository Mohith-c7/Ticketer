// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    sendEmailVerification, 
    sendPasswordResetEmail  
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { 
    getFirestore, 
    doc, 
    setDoc 
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-analytics.js";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyDqHCYvL1VCg0izImgnxnnnLN_O3Ep2rco",
    authDomain: "ticketer-e269a.firebaseapp.com",
    projectId: "ticketer-e269a",
    storageBucket: "ticketer-e269a.appspot.com",
    messagingSenderId: "1027031718336",
    appId: "1:1027031718336:web:12ef7e714b0ca798ed1025",
    measurementId: "G-M8RMRWHMP8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// UI Elements
const signupCard = document.getElementById("signup-card");
const loginCard = document.getElementById("login-card");
const forgotPasswordCard = document.getElementById("forgot-password-card");
const VerifyEmailCard = document.getElementById("VerifyEmailCard");
const resetPassCard = document.getElementById("resetPassCard");

const signupErrorMessage = document.getElementById("signup-error-message");
const signInErrorMessage = document.getElementById("signin-error-message");
const forgotErrorMsg = document.getElementById("forgot-error-message");

// Switch UI Cards
function switchCard(hideCard, showCard) {
    hideCard.style.opacity = "0";
    setTimeout(() => {
        hideCard.classList.add("hidden");
        showCard.classList.remove("hidden");
        showCard.style.position = "absolute";
        showCard.style.top = "50%";
        showCard.style.left = "50%";
        showCard.style.transform = "translate(-50%, -50%)";
        setTimeout(() => { showCard.style.opacity = "1"; }, 50);
    }, 300);
}

// Register User
document.getElementById("signupbutton").addEventListener("click", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("emailid").value;
    const password = document.getElementById("pass").value;
    const confirmPassword = document.getElementById("confirmpass").value;

    if (password !== confirmPassword) {
        signupErrorMessage.innerText = "Passwords do not match";
        signupErrorMessage.style.color = "red";
        signupErrorMessage.style.display = "block";
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await sendEmailVerification(user);
        console.log("Verification email sent");

        // Store user details temporarily
        localStorage.setItem("pendingUserName", name);

        // Switch card **only after email verification is sent**
        switchCard(signupCard, VerifyEmailCard);
    } catch (error) {
        signupErrorMessage.innerText = error.message;
        signupErrorMessage.style.color = "red";
        signupErrorMessage.style.display = "block";
    }
});

// Store user in Firestore **only after email is verified**
async function storeUserData(name, email, userId) {
    try {
        const user = auth.currentUser;
        await user.reload();

        if (!user.emailVerified) {
            signInErrorMessage.innerText = "Please verify your email before logging in.";
            signInErrorMessage.style.color = "red";
            signInErrorMessage.style.display = "block";
            return;
        }

        await setDoc(doc(db, "users", userId), { name, email, firebaseUid: userId });
        console.log("User data stored in Firestore");

    } catch (error) {
        signInErrorMessage.innerText = "Error storing user data.";
        signInErrorMessage.style.color = "red";
        signInErrorMessage.style.display = "block";
    }
}

// Sign-In Function
document.getElementById("signinbutton").addEventListener("click", async (event) => {
    event.preventDefault();

    const email = document.getElementById("signinemail").value;
    const password = document.getElementById("signinpass").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await user.reload();
        if (!user.emailVerified) {
            signInErrorMessage.innerText = "Please verify your email before logging in.";
            signInErrorMessage.style.color = "red";
            signInErrorMessage.style.display = "block";
            return;
        }

        const storedName = localStorage.getItem("pendingUserName") || "User";
        await storeUserData(storedName, email, user.uid);

        localStorage.removeItem("pendingUserName");
        console.log("User logged in successfully");

        // Redirect to homepage after login
        window.location.href = "homepage.html"; 

    } catch (error) {
        signInErrorMessage.innerText = "Incorrect credentials.";
        signInErrorMessage.style.color = "red";
        signInErrorMessage.style.display = "block";
    }
});

// Password Reset
document.getElementById("send-link-btn").addEventListener("click", async function(event) {
    event.preventDefault();

    const emailInput = document.getElementById("emailinput").value.trim();
    if (!emailInput) {
        forgotErrorMsg.innerText = "Enter email ID";
        forgotErrorMsg.style.color = "red";
        forgotErrorMsg.style.display = "block";
        return;
    }

    try {
        await sendPasswordResetEmail(auth, emailInput);
        console.log("Password reset link sent");

        // Switch card **only after reset email is sent**
        switchCard(forgotPasswordCard, resetPassCard);
    } catch (error) {
        forgotErrorMsg.innerText = "Error sending reset link";
        forgotErrorMsg.style.color = "red";
        forgotErrorMsg.style.display = "block";
    }
});

// Event Listeners for Switching UI
document.getElementById("show-signup").addEventListener("click", () => switchCard(loginCard, signupCard));
document.getElementById("show-login").addEventListener("click", () => switchCard(signupCard, loginCard));
document.getElementById("forgotpassword").addEventListener("click", () => switchCard(loginCard, forgotPasswordCard));
document.getElementById("verify-Email-btn").addEventListener("click", () => switchCard(VerifyEmailCard, loginCard));
document.getElementById("reset-pass-btn").addEventListener("click", () => switchCard(resetPassCard, loginCard));
document.getElementById("sign-in-back").addEventListener("click",() => switchCard(forgotPasswordCard,loginCard));