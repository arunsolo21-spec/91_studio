document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================
    // 1. SMOOTH SCROLLING FOR NAVIGATION
    // =========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Scroll with offset for the sticky menu
                const headerOffset = 100;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // =========================================
    // 2. ACTIVE MENU HIGHLIGHTER (INTERSECTION OBSERVER)
    // =========================================
    // This highlights the menu item as you scroll through sections
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('.menu-list li a');

    const observerOptions = {
        root: null,
        threshold: 0.25, // Trigger when 25% of the section is visible
        rootMargin: "-100px 0px -100px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                let currentId = entry.target.getAttribute('id');
                
                navLi.forEach((li) => {
                    li.classList.remove('active-link');
                    // Add orange color to active link
                    if (li.getAttribute('href').includes(currentId)) {
                        li.style.color = "#FF5E00"; // Orange
                        li.style.borderBottom = "2px solid #FF5E00";
                    } else {
                        // Reset others to black (or default)
                        li.style.color = ""; 
                        li.style.borderBottom = "none";
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach((section) => {
        observer.observe(section);
    });

    // =========================================
    // 3. WHATSAPP BOOKING LOGIC
    // =========================================
    // Owner Number from your details
    const ownerNumber = "918870842827"; // formatted for WhatsApp API (91 is India code)

    // Function to open WhatsApp
    function openWhatsApp(packageName, price) {
        const message = `Hello Studio 91, I am interested in the *${packageName}* priced at ${price}. Please share more details.`;
        const url = `https://wa.me/${ownerNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    }

    // Attach to buttons
    const buttons = document.querySelectorAll('.btn-book');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Get the card details dynamically
            const card = e.target.closest('.price-card');
            const packageName = card.querySelector('h3').innerText;
            const price = card.querySelector('.price').innerText;
            
            openWhatsApp(packageName, price);
        });
    });

    // =========================================
    // 4. PARALLAX EFFECT FOR HERO TEXT (OPTIONAL COOL FACTOR)
    // =========================================
    window.addEventListener('scroll', () => {
        const scrollValue = window.scrollY;
        const heroText = document.querySelector('.hero-content');
        
        // Moves the text slightly slower than scroll for 3D effect
        if(heroText) {
            heroText.style.transform = `translateY(${scrollValue * 0.3}px)`;
            heroText.style.opacity = 1 - (scrollValue / 700);
        }
    });

});