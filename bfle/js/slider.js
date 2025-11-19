/**
 * BETTER FIELD ENGINEERING LIMITED
 * Slider JavaScript File
 * 
 * Contains: Hero slider and project slider functionality
 */

// ========================================
// HERO SLIDER
// ========================================

let currentHeroSlide = 0;
let heroSlideInterval;
let isHeroPaused = false;

/**
 * Change hero slide by direction
 * @param {number} direction - 1 for next, -1 for previous
 */
function changeHeroSlide(direction) {
    const slides = document.getElementById('heroSlides');
    const dots = document.querySelectorAll('.hero-nav-dot');
    const totalSlides = 4;

    currentHeroSlide = (currentHeroSlide + direction + totalSlides) % totalSlides;
    
    slides.style.transform = `translateX(-${currentHeroSlide * 100}%)`;
    
    // Update active dot
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentHeroSlide);
    });

    // Reset auto-slide timer
    resetHeroAutoSlide();
}

/**
 * Go directly to a specific hero slide
 * @param {number} index - Slide index (0-3)
 */
function goToHeroSlide(index) {
    const slides = document.getElementById('heroSlides');
    const dots = document.querySelectorAll('.hero-nav-dot');
    
    currentHeroSlide = index;
    slides.style.transform = `translateX(-${currentHeroSlide * 100}%)`;
    
    // Update active dot
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentHeroSlide);
    });

    resetHeroAutoSlide();
}

/**
 * Auto-advance hero slider
 */
function autoSlideHero() {
    if (!isHeroPaused) {
        changeHeroSlide(1);
    }
}

/**
 * Reset auto-slide interval
 */
function resetHeroAutoSlide() {
    if (!isHeroPaused) {
        clearInterval(heroSlideInterval);
        heroSlideInterval = setInterval(autoSlideHero, 5000);
    }
}

// Pause hero slider on hover/touch
const heroSection = document.querySelector('.hero');
if (heroSection) {
    // Mouse events
    heroSection.addEventListener('mouseenter', () => {
        isHeroPaused = true;
        clearInterval(heroSlideInterval);
    });

    heroSection.addEventListener('mouseleave', () => {
        isHeroPaused = false;
        heroSlideInterval = setInterval(autoSlideHero, 5000);
    });

    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    heroSection.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        isHeroPaused = true;
        clearInterval(heroSlideInterval);
    }, { passive: true });

    heroSection.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleHeroSwipe();
        
        // Resume auto-slide after 3 seconds
        setTimeout(() => {
            isHeroPaused = false;
            heroSlideInterval = setInterval(autoSlideHero, 5000);
        }, 3000);
    }, { passive: true });

    function handleHeroSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                changeHeroSlide(1);
            } else {
                // Swipe right - previous slide
                changeHeroSlide(-1);
            }
        }
    }
}

// Start hero auto-slide on page load
heroSlideInterval = setInterval(autoSlideHero, 5000);

// ========================================
// PROJECT SLIDER
// ========================================

let currentProjectSlide = 0;
let projectSlideInterval;

/**
 * Go to next project slide
 */
function nextSlide() {
    const slides = document.getElementById('projectSlides');
    if (!slides) return;
    
    const totalSlides = slides.children.length;
    currentProjectSlide = (currentProjectSlide + 1) % totalSlides;
    slides.style.transform = `translateX(-${currentProjectSlide * 100}%)`;
}

/**
 * Go to previous project slide
 */
function previousSlide() {
    const slides = document.getElementById('projectSlides');
    if (!slides) return;
    
    const totalSlides = slides.children.length;
    currentProjectSlide = (currentProjectSlide - 1 + totalSlides) % totalSlides;
    slides.style.transform = `translateX(-${currentProjectSlide * 100}%)`;
}

/**
 * Go directly to a specific project slide
 * @param {number} index - Slide index
 */
function goToProjectSlide(index) {
    const slides = document.getElementById('projectSlides');
    if (!slides) return;
    
    const totalSlides = slides.children.length;
    
    if (index >= 0 && index < totalSlides) {
        currentProjectSlide = index;
        slides.style.transform = `translateX(-${currentProjectSlide * 100}%)`;
    }
}

// Auto-advance project slider every 6 seconds
projectSlideInterval = setInterval(nextSlide, 6000);

// Pause project slider on hover
const projectsSlider = document.querySelector('.projects-slider');
if (projectsSlider) {
    projectsSlider.addEventListener('mouseenter', () => {
        clearInterval(projectSlideInterval);
    });

    projectsSlider.addEventListener('mouseleave', () => {
        projectSlideInterval = setInterval(nextSlide, 6000);
    });

    // Touch events for mobile
    let projectTouchStartX = 0;
    let projectTouchEndX = 0;

    projectsSlider.addEventListener('touchstart', (e) => {
        projectTouchStartX = e.changedTouches[0].screenX;
        clearInterval(projectSlideInterval);
    }, { passive: true });

    projectsSlider.addEventListener('touchend', (e) => {
        projectTouchEndX = e.changedTouches[0].screenX;
        handleProjectSwipe();
        
        // Resume auto-slide
        projectSlideInterval = setInterval(nextSlide, 6000);
    }, { passive: true });

    function handleProjectSwipe() {
        const swipeThreshold = 50;
        const diff = projectTouchStartX - projectTouchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                previousSlide();
            }
        }
    }
}

// ========================================
// KEYBOARD NAVIGATION
// ========================================

document.addEventListener('keydown', (e) => {
    // Hero slider keyboard controls
    if (document.activeElement.closest('.hero')) {
        if (e.key === 'ArrowLeft') {
            changeHeroSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeHeroSlide(1);
        }
    }
    
    // Project slider keyboard controls
    if (document.activeElement.closest('.projects-slider')) {
        if (e.key === 'ArrowLeft') {
            previousSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    }
});

// ========================================
// PRELOAD NEXT SLIDE IMAGES (PERFORMANCE)
// ========================================

function preloadSlideImages() {
    const heroSlides = document.querySelectorAll('.hero-slide');
    const projectSlides = document.querySelectorAll('.project-slide .project-image');
    
    const allSlides = [...heroSlides, ...projectSlides];
    
    allSlides.forEach(slide => {
        const bgImage = slide.style.backgroundImage;
        if (bgImage) {
            const imageUrl = bgImage.match(/url\(['"]?([^'"]*)['"]?\)/);
            if (imageUrl && imageUrl[1]) {
                const img = new Image();
                img.src = imageUrl[1];
            }
        }
    });
}

// Preload images after page load
if (document.readyState === 'complete') {
    preloadSlideImages();
} else {
    window.addEventListener('load', preloadSlideImages);
}

// ========================================
// PAUSE SLIDERS WHEN TAB IS INACTIVE
// ========================================

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Tab is inactive - pause sliders
        clearInterval(heroSlideInterval);
        clearInterval(projectSlideInterval);
    } else {
        // Tab is active - resume sliders
        if (!isHeroPaused) {
            heroSlideInterval = setInterval(autoSlideHero, 5000);
        }
        projectSlideInterval = setInterval(nextSlide, 6000);
    }
});