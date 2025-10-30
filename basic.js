document.addEventListener("DOMContentLoaded", function() {

    // --- 1. 3D Slider Logic (Unchanged) ---
    const gallery = document.querySelector(".gallery");
    // Check if gallery exists before running slider code
    if (gallery) {
        const images = gallery.querySelectorAll("img");
        
        const carousel = document.createElement("div");
        carousel.className = "carousel";
        
        const slides = []; 
        
        images.forEach(img => {
            const slide = document.createElement("div");
            slide.className = "carousel-slide";
            slide.appendChild(img); 
            carousel.appendChild(slide); 
            slides.push(slide);
        });
        
        gallery.innerHTML = ""; 
        gallery.appendChild(carousel);

        const prevBtn = document.createElement("button");
        prevBtn.className = "slider-btn";
        prevBtn.id = "prevBtn";
        prevBtn.innerHTML = "&#8249;";
        
        const nextBtn = document.createElement("button");
        nextBtn.className = "slider-btn";
        nextBtn.id = "nextBtn";
        nextBtn.innerHTML = "&#8250;";

        gallery.appendChild(prevBtn);
        gallery.appendChild(nextBtn);

        const numSlides = slides.length;
        const angle = 360 / numSlides; 
        const translateZ = (slides[0].offsetWidth / 2) / Math.tan((angle / 2) * (Math.PI / 180));

        slides.forEach((slide, i) => {
            slide.style.transform = `rotateY(${i * angle}deg) translateZ(${translateZ}px)`;
        });

        let currentAngle = 0;
        
        function rotateCarousel() {
            currentAngle -= angle;
            carousel.style.transform = `rotateY(${currentAngle}deg)`;
        }

        nextBtn.addEventListener("click", rotateCarousel);

        prevBtn.addEventListener("click", () => {
            currentAngle += angle;
            carousel.style.transform = `rotateY(${currentAngle}deg)`;
        });

        let autoRotateInterval = setInterval(rotateCarousel, 2000); // 2 seconds

        gallery.addEventListener('mouseenter', () => {
            clearInterval(autoRotateInterval);
        });

        gallery.addEventListener('mouseleave', () => {
            autoRotateInterval = setInterval(rotateCarousel, 2000);
        });
    }

    // --- 2. NEW: Tribute Wall Form Logic ---
    const tributeForm = document.getElementById("tribute-form");
    const tributeInput = document.getElementById("tribute-input");
    const tributeWall = document.getElementById("tribute-wall");

    if (tributeForm) {
        tributeForm.addEventListener("submit", function(event) {
            event.preventDefault(); // Stop the form from reloading the page
            
            const message = tributeInput.value.trim(); // Get text and remove whitespace
            
            if (message) {
                // 1. Create the new message elements
                const messageContainer = document.createElement("div");
                messageContainer.className = "tribute-message";
                
                const messageText = document.createElement("p");
                messageText.textContent = `"${message}"`; // Add quotes
                
                const messageAuthor = document.createElement("small");
                messageAuthor.textContent = "- Anonymous";
                
                // 2. Add text and author to the container
                messageContainer.appendChild(messageText);
                messageContainer.appendChild(messageAuthor);
                
                // 3. Add the new message to the top of the wall
                // tributeWall.appendChild(messageContainer); // Adds to bottom
                tributeWall.prepend(messageContainer); // Adds to top
                
                // 4. Clear the input field
                tributeInput.value = "";
            }
        });
    }

    // --- 3. NEW: Scroll-Reveal Logic ---
    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Optional: Stop observing after it has been revealed
                // observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // observes intersections relative to the viewport
        threshold: 0.1, // trigger when 10% of the element is visible
    });

    // Observe each .reveal element
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

});