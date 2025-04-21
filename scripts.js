    // Optimized Slideshow with Lazy Loading
    document.addEventListener('DOMContentLoaded', function() {
        const slides = document.querySelectorAll('.slide');
        const navButtons = document.querySelectorAll('.slide-nav-btn');
        let currentSlide = 0;
        let slideInterval;
        const slideDuration = 6000; // 6 seconds
        
        // Initialize first slide and lazy load images
        showSlide(currentSlide);
        lazyLoadImages();
        
        // Start auto-rotation
        startSlideShow();
        
        // Navigation buttons
        navButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                currentSlide = index;
                resetSlideShow();
                showSlide(currentSlide);
            });
        });
        
        // Pause on hover
        const slideshow = document.querySelector('.slideshow-container');
        slideshow.addEventListener('mouseenter', pauseSlideShow);
        slideshow.addEventListener('mouseleave', startSlideShow);
        
        function showSlide(index) {
            // Hide all slides
            slides.forEach(slide => {
                slide.classList.remove('active');
                // Reset animations
                const content = slide.querySelectorAll('.animate__animated');
                content.forEach(item => {
                    item.style.opacity = '0';
                });
            });
            
            // Deactivate all nav buttons
            navButtons.forEach(btn => btn.classList.remove('active'));
            
            // Show current slide
            slides[index].classList.add('active');
            navButtons[index].classList.add('active');
            
            // Load image if not already loaded
            const imgElement = slides[index].querySelector('.slide-image');
            if (imgElement.dataset.src) {
                imgElement.style.backgroundImage = `url('${imgElement.dataset.src}')`;
                imgElement.removeAttribute('data-src');
            }
            
            // Trigger animations
            setTimeout(() => {
                const content = slides[index].querySelectorAll('.animate__animated');
                content.forEach(item => {
                    item.style.opacity = '1';
                });
            }, 100);
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        
        function startSlideShow() {
            slideInterval = setInterval(nextSlide, slideDuration);
        }
        
        function pauseSlideShow() {
            clearInterval(slideInterval);
        }
        
        function resetSlideShow() {
            pauseSlideShow();
            startSlideShow();
        }
        
        // Lazy load images
        function lazyLoadImages() {
            const lazyImages = document.querySelectorAll('.slide-image[data-src]');
            
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.style.backgroundImage = `url('${img.dataset.src}')`;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    });






















    
    // Gallery Slider Functionality
    document.addEventListener('DOMContentLoaded', function() {
        // Gallery Slider
        const slides = document.querySelectorAll('.gallery-slide');
        const dotsContainer = document.querySelector('.gallery-dots');
        let currentSlide = 0;
        
        // Create dots
        slides.forEach((slide, index) => {
            const dot = document.createElement('button');
            dot.classList.add('gallery-dot');
            if(index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
            dotsContainer.appendChild(dot);
        });
        
        const dots = document.querySelectorAll('.gallery-dot');
        
        // Next/Prev buttons
        document.querySelector('.gallery-next').addEventListener('click', nextSlide);
        document.querySelector('.gallery-prev').addEventListener('click', prevSlide);
        
        // Auto-rotate
        let slideInterval = setInterval(nextSlide, 5000);
        
        // Pause on hover
        const slider = document.querySelector('.gallery-slider');
        slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
        slider.addEventListener('mouseleave', () => {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        });
        
        function nextSlide() {
            goToSlide((currentSlide + 1) % slides.length);
        }
        
        function prevSlide() {
            goToSlide((currentSlide - 1 + slides.length) % slides.length);
        }
        
        function goToSlide(index) {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            
            currentSlide = index;
            
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }
    });