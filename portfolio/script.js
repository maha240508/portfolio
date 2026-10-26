// ===== MOBILE MENU =====
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

function closeMenu() {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
}

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));

// ===== ACTIVE LINK WHILE SCROLLING =====
const sections = document.querySelectorAll("main section[id]");
const navItems = navLinks.querySelectorAll("a");

function updateActiveLink() {
    let current = "home";
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 140) current = section.id;
    });
    navItems.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === "#" + current);
    });
}

window.addEventListener("scroll", updateActiveLink);
updateActiveLink();

// ===== FOOTER YEAR =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== PROFILE PHOTO (tries jpg, jpeg, png, webp in the images folder) =====
const photo = document.getElementById("profilePhoto");
const extensions = ["jpg", "jpeg", "png", "webp"];
let extIndex = 0;

function tryNextPhoto() {
    if (extIndex >= extensions.length) return;
    photo.src = "images/profile." + extensions[extIndex++];
}

photo.addEventListener("load", () => { photo.style.visibility = "visible"; });
photo.addEventListener("error", tryNextPhoto);
tryNextPhoto();