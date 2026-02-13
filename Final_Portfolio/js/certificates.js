// Certificates Gallery JavaScript

// DOM Elements
const certificateSearch = document.getElementById('certificateSearch');
const sortButtons = document.querySelectorAll('.sort-btn');
const certificatesGrid = document.getElementById('certificatesGrid');
const certificateCards = document.querySelectorAll('.certificate-card-full');

// State
let currentFilter = 'all';
let currentSearch = '';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    setupScrollAnimations();
});

// Setup Event Listeners
function setupEventListeners() {
    // Search functionality
    if (certificateSearch) {
        certificateSearch.addEventListener('input', (e) => {
            currentSearch = e.target.value.toLowerCase();
            filterCertificates();
        });
    }

    // Sort/Filter buttons
    sortButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            sortButtons.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Update current filter
            currentFilter = btn.getAttribute('data-sort');
            filterCertificates();
        });
    });
}

// Filter Certificates
function filterCertificates() {
    certificateCards.forEach(card => {
        const category = card.getAttribute('data-category');
        const title = card.querySelector('h3').textContent.toLowerCase();
        const issuer = card.querySelector('.cert-issuer').textContent.toLowerCase();
        const tags = Array.from(card.querySelectorAll('.cert-skill-tag'))
            .map(tag => tag.textContent.toLowerCase())
            .join(' ');

        // Check category filter
        const categoryMatch = currentFilter === 'all' || category === currentFilter;

        // Check search filter
        const searchText = currentSearch;
        const searchMatch = !searchText || 
                           title.includes(searchText) || 
                           issuer.includes(searchText) || 
                           tags.includes(searchText);

        // Show or hide card
        if (categoryMatch && searchMatch) {
            card.classList.remove('hidden');
            card.style.animation = 'card-entrance 0.6s ease-out forwards';
        } else {
            card.classList.add('hidden');
        }
    });

    // Check if any cards are visible
    checkNoResults();
}

// Check and display no results message
function checkNoResults() {
    const visibleCards = Array.from(certificateCards).filter(card => !card.classList.contains('hidden'));
    
    // Remove existing no results message
    const existingNoResults = certificatesGrid.querySelector('.no-results');
    if (existingNoResults) {
        existingNoResults.remove();
    }

    // Show no results message if needed
    if (visibleCards.length === 0) {
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.innerHTML = `
            <div class="no-results-icon">
                <i class="fas fa-search"></i>
            </div>
            <div class="no-results-text">No certificates found</div>
            <div class="no-results-subtext">Try adjusting your search or filter criteria</div>
        `;
        certificatesGrid.appendChild(noResults);
    }
}

// Setup Scroll Animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all certificate cards
    certificateCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Add smooth scroll behavior for links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'none' ? 'flex' : 'none';
    });
}

// Header scroll effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 10, 18, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(15, 255, 80, 0.1)';
    } else {
        header.style.background = 'rgba(10, 10, 18, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Responsive canvas resize
const canvas = document.getElementById('matrixCanvas');
if (canvas) {
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

console.log('Certificates gallery loaded successfully!');
