// Main JavaScript for Quiz Portal

// Announcement Banner Functionality
function closeAnnouncement() {
    const announcementBanner = document.getElementById('announcementBanner');
    if (announcementBanner) {
        announcementBanner.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        announcementBanner.style.opacity = '0';
        announcementBanner.style.transform = 'translateY(-100%)';
        
        setTimeout(() => {
            announcementBanner.classList.add('hidden');
            // Save to localStorage so it doesn't show again even after page refresh
            localStorage.setItem('announcementClosed', 'true');
        }, 300);
    }
}

// Check if announcement was previously closed
function checkAnnouncementStatus() {
    const announcementBanner = document.getElementById('announcementBanner');
    if (announcementBanner) {
        const isClosed = localStorage.getItem('announcementClosed');
        if (isClosed === 'true') {
            // Hide the announcement if it was previously closed
            announcementBanner.classList.add('hidden');
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Check announcement status on page load
    checkAnnouncementStatus();
    // Smooth scrolling for anchor links
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

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });

        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });

    // Animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .quiz-card, .step-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

