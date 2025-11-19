/**
 * BETTER FIELD ENGINEERING LIMITED
 * Animations JavaScript File
 * 
 * Contains: Counter animations, scroll effects, intersection observers
 */

// ========================================
// ANIMATED COUNTER
// ========================================

/**
 * Animate a counter from 0 to target value
 * @param {HTMLElement} element - The element containing the counter
 */
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        
        if (current >= target) {
            element.textContent = target + (target === 100 ? '%' : '+');
            clearInterval(timer);
        } else {
            const displayValue = Math.floor(current);
            element.textContent = displayValue + (target === 100 ? '%' : '+');
        }
    }, 16);
}

// ========================================
// INTERSECTION OBSERVER FOR STATS
// ========================================

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            
            counters.forEach(counter => {
                // Only animate if counter hasn't been animated yet
                if (counter.textContent === '0') {
                    animateCounter(counter);
                }
            });
            
            // Stop observing after first animation
            statsObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5, // Trigger when 50% visible
    rootMargin: '0px'
});

// Observe stats section
const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ========================================
// FADE IN ON SCROLL
// ========================================

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeInObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

// Add fade-in effect to service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    fadeInObserver.observe(card);
});

// Add fade-in effect to industry cards
document.querySelectorAll('.industry-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    fadeInObserver.observe(card);
});

// ========================================
// SCROLL PROGRESS INDICATOR (OPTIONAL)
// ========================================

function createScrollProgress() {
    // Create progress bar element
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 70px;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #f97316, #ea580c);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    // Update progress on scroll
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Uncomment to enable scroll progress bar
// createScrollProgress();

// ========================================
// PARALLAX EFFECT ON SCROLL
// ========================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Parallax effect on hero
    const hero = document.querySelector('.hero');
    if (hero && scrolled <= window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ========================================
// ANIMATE ON SCROLL - AGRO SECTION
// ========================================

const agroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const features = entry.target.querySelectorAll('.agro-feature');
            
            features.forEach((feature, index) => {
                setTimeout(() => {
                    feature.style.opacity = '1';
                    feature.style.transform = 'translateX(0)';
                }, index * 150);
            });
            
            agroObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.3
});

const agroFeatures = document.querySelector('.agro-features');
if (agroFeatures) {
    // Set initial state
    document.querySelectorAll('.agro-feature').forEach(feature => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateX(-30px)';
        feature.style.transition = 'all 0.5s ease';
    });
    
    agroObserver.observe(agroFeatures);
}

// ========================================
// SMOOTH REVEAL FOR PROJECT IMAGES
// ========================================

const projectImageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'scale(1)';
            projectImageObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

document.querySelectorAll('.project-image').forEach(image => {
    image.style.opacity = '0';
    image.style.transform = 'scale(0.95)';
    image.style.transition = 'all 0.6s ease';
    projectImageObserver.observe(image);
});

// ========================================
// BUTTON RIPPLE EFFECT
// ========================================

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// LOADING ANIMATION (OPTIONAL)
// ========================================

function showPageLoader() {
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #091936 0%, #1d3d73 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99999;
            transition: opacity 0.5s ease;
        ">
            <div style="text-align: center; color: white;">
                <div style="
                    width: 60px;
                    height: 60px;
                    border: 4px solid rgba(249, 115, 22, 0.3);
                    border-top: 4px solid #f97316;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 1rem;
                "></div>
                <p style="font-size: 1.2rem; font-weight: 600;">Loading...</p>
            </div>
        </div>
    `;
    document.body.appendChild(loader);

    // Add spin animation
    const spinStyle = document.createElement('style');
    spinStyle.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinStyle);

    // Hide loader when page is loaded
    window.addEventListener('load', () => {
        const loaderElement = document.getElementById('page-loader');
        if (loaderElement) {
            loaderElement.style.opacity = '0';
            setTimeout(() => loaderElement.remove(), 500);
        }
    });
}

// Uncomment to enable page loader
// if (document.readyState !== 'complete') {
//     showPageLoader();
// }

// ========================================
// PERFORMANCE MONITORING (DEVELOPMENT)
// ========================================

if (window.performance && console.table) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const connectTime = perfData.responseEnd - perfData.requestStart;
        const renderTime = perfData.domComplete - perfData.domLoading;

        console.log('%cPage Performance', 'color: #f97316; font-size: 16px; font-weight: bold;');
        console.table({
            'Page Load Time': `${pageLoadTime}ms`,
            'Server Response': `${connectTime}ms`,
            'DOM Render Time': `${renderTime}ms`
        });
    });
}