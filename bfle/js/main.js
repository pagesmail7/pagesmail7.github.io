/**
 * BETTER FIELD ENGINEERING LIMITED
 * Main JavaScript File
 * 
 * Contains: Mobile menu, smooth scroll, navbar effects
 */

// ========================================
// MOBILE MENU TOGGLE
// ========================================

function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// ========================================
// SMOOTH SCROLL NAVIGATION
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // Close mobile menu after clicking a link
        const navLinks = document.getElementById('navLinks');
        if (navLinks) {
            navLinks.classList.remove('active');
        }
    });
});

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================

window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    
    if (window.scrollY > 50) {
        nav.style.background = 'linear-gradient(135deg, rgba(9, 25, 54, 0.98) 0%, rgba(29, 61, 115, 0.98) 100%)';
        nav.style.backdropFilter = 'blur(10px)';
        nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
    } else {
        nav.style.background = 'linear-gradient(135deg, #091936 0%, #1d3d73 100%)';
        nav.style.backdropFilter = 'none';
        nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// ========================================
// CLOSE MOBILE MENU ON OUTSIDE CLICK
// ========================================

document.addEventListener('click', (event) => {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    // Check if click is outside nav and menu is open
    if (navLinks && navLinks.classList.contains('active')) {
        if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
            navLinks.classList.remove('active');
        }
    }
});

// ========================================
// PREVENT BODY SCROLL WHEN MOBILE MENU OPEN
// ========================================

const navLinks = document.getElementById('navLinks');
if (navLinks) {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                if (navLinks.classList.contains('active') && window.innerWidth <= 768) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            }
        });
    });
    
    observer.observe(navLinks, { attributes: true });
}

// ========================================
// ACTIVE NAV LINK HIGHLIGHTING
// ========================================

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// ========================================
// LAZY LOADING IMAGES (IF NEEDED)
// ========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// CONSOLE LOG (DEVELOPMENT ONLY - REMOVE IN PRODUCTION)
// ========================================

console.log('%c🔧 Better Field Engineering Limited', 'color: #f97316; font-size: 20px; font-weight: bold;');
console.log('%cWebsite by 3Pages® Info-Tech Solutions', 'color: #1d3d73; font-size: 12px;');
console.log('%cFor support: pages@e.email | +234-901-342-5094', 'color: #64748b; font-size: 10px;');