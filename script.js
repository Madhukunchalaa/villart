// Custom Cursor
// Hero Slideshow Logic
const initSlideshow = () => {
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    
    // Set interval for 5 seconds
    setInterval(() => {
        // Remove active from current
        slides[currentSlide].classList.remove('active');
        
        // Next slide
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Add active to next
        slides[currentSlide].classList.add('active');
    }, 6000); // 6 seconds per slide
};

document.addEventListener('DOMContentLoaded', () => {
    initSlideshow();
    // initCustomCursor is called later or at EOF
});

const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

window.addEventListener("mousemove", (e) => {
  const posX = e.clientX;
  const posY = e.clientY;

  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;

  // Outline follows with a slight delay naturally via CSS transition usually,
  // but JS mapping ensures it tracks perfectly.
  // We can use animate() for smoother trailing effect if desired.
  cursorOutline.animate(
    {
      left: `${posX}px`,
      top: `${posY}px`,
    },
    { duration: 500, fill: "forwards" },
  );
});

// Hover effects for cursor
const links = document.querySelectorAll("a, button, .category-card");
links.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    cursorOutline.style.width = "60px";
    cursorOutline.style.height = "60px";
    cursorOutline.style.backgroundColor = "rgba(212, 175, 55, 0.1)";
  });
  link.addEventListener("mouseleave", () => {
    cursorOutline.style.width = "40px";
    cursorOutline.style.height = "40px";
    cursorOutline.style.backgroundColor = "transparent";
  });
});

// Shutter Animation on Load
// Shutter Animation on Load
// Use multiple triggers to ensure it opens
const openShutter = () => {
    const shutter = document.getElementById("shutter");
    if (document.body.classList.contains("shutter-open")) return;
    
    setTimeout(() => {
        document.body.classList.add("shutter-open");
    }, 500);
};

window.addEventListener("load", openShutter);
// Fallback if load already fired
if (document.readyState === "complete") {
    openShutter();
}
setTimeout(openShutter, 2000); // Safety net

// Smooth Scroll for Anchors
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Lightbox Logic
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const captionText = document.querySelector('.caption');
const closeBtn = document.querySelector('.close-lightbox');

// Add lightbox to both categories and masonry gallery
document.querySelectorAll('.category-card, .masonry-item').forEach(card => {
    card.addEventListener('click', () => {
        const img = card.querySelector('img');
        const title = card.querySelector('h3, h4').innerText;
        lightbox.style.display = "block";
        lightboxImg.src = img.src; // In a real app, use a high-res data attribute
        captionText.innerText = title;
        document.body.style.overflow = 'hidden'; // Disable scroll
    });
});

closeBtn.addEventListener('click', () => {
    lightbox.style.display = "none";
    document.body.style.overflow = 'auto'; // Re-enable scroll
});

// Gallery Filter Logic
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.masonry-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                // Trigger animation for smooth transition
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 50);

            } else {
                item.style.display = 'none';
            }
        });
    });
});


lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = "none";
        document.body.style.overflow = 'auto';
    }
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Scroll Animations (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
             entry.target.classList.add('visible');
             // observer.unobserve(entry.target); // Optional
        }
    });
}, observerOptions);


// Observe Timeline Items (Film Strip) & Services
document.querySelectorAll('.film-frame, .service-item').forEach(item => {
    observer.observe(item);
});

// Contact Form "Camera Capture" Effect
const contactForm = document.getElementById('contactForm');
const popup = document.getElementById('thankyou-popup');
const popupFrame = document.querySelector('.polaroid-frame');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 1. Trigger Flash
        const flash = document.getElementById('camera-flash');
        if (flash) {
            flash.classList.add('flash-active');
            setTimeout(() => flash.classList.remove('flash-active'), 400); // Reset
        }
        
        // 2. Show "Appearing" Popup after brief delay (like processing)
        setTimeout(() => {
            popup.classList.add('active');
        }, 300);
        
        // 3. Close Popup on click
        popup.addEventListener('click', () => {
            popup.classList.remove('active');
            contactForm.reset();
        });
    });
}





// Observe Sections for Fade-In
document.querySelectorAll('.section-header, .quote-text, .testimonial-editorial').forEach(el => {
    // Initial state logic moved here to avoid CSS issues
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.8s ease-out";
    
    new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 }).observe(el);
});

