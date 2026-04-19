// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navbar = document.getElementById('navbar');
    
    navToggle.addEventListener('click', function() {
        navbar.classList.toggle('active');
        
        // Animate hamburger to X
        const hamburger = document.querySelector('.hamburger');
        hamburger.classList.toggle('active');
    });
});

// Optional: Close mobile menu when clicking a link
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        const navbar = document.getElementById('navbar');
        navbar.classList.remove('active');
        const hamburger = document.querySelector('.hamburger');
        hamburger.classList.remove('active');
    });
});