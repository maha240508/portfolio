// ===== MOBILE NAVIGATION =====
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.textContent = "☰";
    });
});

// ===== DARK AND LIGHT THEME =====
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-theme");

    themeToggle.textContent = isDark ? "☀️" : "🌙";
    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light theme" : "Switch to dark theme"
    );
});

// ===== ACTIVE NAVIGATION =====
const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-links a");

function updateActiveLink() {
    let currentSection = "home";

    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 140) {
            currentSection = section.id;
        }
    });

    navItems.forEach(link => {
        const isActive =
            link.getAttribute("href") === "#" + currentSection;

        link.classList.toggle("active", isActive);
    });
}

// ===== BACK TO TOP =====
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 300);
    updateActiveLink();
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// ===== FOOTER YEAR =====
document.getElementById("year").textContent =
    new Date().getFullYear();

// ===== ROCK PAPER SCISSORS GAME =====
const choiceButtons = document.querySelectorAll(".choice-btn");
const playerScoreElement = document.getElementById("playerScore");
const computerScoreElement = document.getElementById("computerScore");
const resultText = document.getElementById("resultText");
const roundText = document.getElementById("roundText");
const resetGameButton = document.getElementById("resetGame");

const choices = ["rock", "paper", "scissors"];

const emojis = {
    rock: "✊",
    paper: "✋",
    scissors: "✌️"
};

let playerScore = 0;
let computerScore = 0;

function playGame(playerChoice) {
    const computerChoice =
        choices[Math.floor(Math.random() * choices.length)];

    let result;

    if (playerChoice === computerChoice) {
        result = "It's a Draw! 🤝";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
    ) {
        result = "You Win! 🎉";
        playerScore++;
    } else {
        result = "Computer Wins! 💻";
        computerScore++;
    }

    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;
    resultText.textContent = result;

    roundText.textContent =
        `You chose ${emojis[playerChoice]} ${capitalize(playerChoice)}. ` +
        `Computer chose ${emojis[computerChoice]} ` +
        `${capitalize(computerChoice)}.`;
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

choiceButtons.forEach(button => {
    button.addEventListener("click", () => {
        playGame(button.dataset.choice);
    });
});

resetGameButton.addEventListener("click", () => {
    playerScore = 0;
    computerScore = 0;

    playerScoreElement.textContent = "0";
    computerScoreElement.textContent = "0";
    resultText.textContent = "Ready to play?";
    roundText.textContent =
        "Select Rock, Paper, or Scissors to start.";
});

// ===== CONTACT FORM =====
// Opens the user's email application with the message prepared.
// Sending the email requires the user to confirm it in that application.
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", event => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
    }

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        formMessage.textContent = "Please fill in all fields.";
        return;
    }

    const subject = encodeURIComponent(
        "Portfolio Contact Message from " + name
    );

    const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    const mailtoLink =
        `mailto:mahalakshmi.74103@gmail.com?subject=${subject}&body=${body}`;

    formMessage.textContent =
        "Opening your email application. Please send the prepared email.";

    window.location.href = mailtoLink;
});