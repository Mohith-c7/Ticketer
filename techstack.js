document.addEventListener("DOMContentLoaded", function () {
    const meteorContainer = document.getElementById("meteor-container");

    function createMeteor() {
        const meteor = document.createElement("div");
        meteor.classList.add("meteor");

        // Random position
        let startX = Math.random() * window.innerWidth;
        let startY = Math.random() * -200; // Start above screen
        let duration = Math.random() * 2 + 2.5; // Random fall speed

        meteor.style.left = `${startX}px`;
        meteor.style.top = `${startY}px`;
        meteor.style.animation = `fall ${duration}s linear forwards`;

        meteorContainer.appendChild(meteor);

        // Remove meteor after animation ends
        setTimeout(() => {
            meteor.remove();
        }, duration * 1000);
    }

    function startMeteorAnimation() {
        setInterval(createMeteor, 200); // Increase frequency
    }

    startMeteorAnimation();
});

document.addEventListener("DOMContentLoaded", function () {
    // Select the button
    const button = document.querySelector(".view-tech-stack");

    // Add event listener to redirect when clicked
    button.addEventListener("click", function () {
        window.location.href = "techstack.html"; 
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Select the button
    const button = document.querySelector(".github");

    // Add event listener to redirect when clicked
    button.addEventListener("click", function () {
        window.location.href = "https://github.com/Mohith-c7/Ticketer"; 
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

document.addEventListener("DOMContentLoaded", function () {
    // Select the button
    const button = document.querySelector(".tech-card1");

    // Add event listener to redirect when clicked
    button.addEventListener("click", function () {
        window.location.href = "https://www.linkedin.com/in/mohith-kumar-chadalawada-37a90b2a1/?originalSubdomain=in"; 
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Select the button
    const button = document.querySelector(".tech-card2");

    // Add event listener to redirect when clicked
    button.addEventListener("click", function () {
        window.location.href = "https://www.linkedin.com/in/sri-harsha-tummalapalli-40371727a/"; 
    });
});
