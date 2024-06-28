// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Loader
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        gsap.to(loader, { opacity: 0, duration: 1, onComplete: () => loader.style.display = 'none' });
    });

    // Smooth scrolling
    const smoothScroll = (target, duration) => {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const animation = currentTime => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        const ease = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        requestAnimationFrame(animation);
    };

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            smoothScroll(target, 1000);
        });
    });

    // Navigation
    const nav = document.querySelector('nav');
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');

    const navSlide = () => {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            
            navItems.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
            
            burger.classList.toggle('toggle');
        });
    };

    navSlide();

    // Parallax effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        parallaxElements.forEach(el => {
            const speed = el.dataset.speed;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

   


    const menuItems = [
        { name: 'Köttbullar med potatismos', category: 'daily', price: 89, image: 'kottbullar.jpg', description: 'Klassiska svenska köttbullar' },
        { name: 'Laxfilé med citronrisotto', category: 'daily', price: 109, image: 'lax.jpg', description: 'Grillad lax med krämig risotto' },
        { name: 'Pasta Carbonara', category: 'food', price: 95, image: 'carbonara.jpg', description: 'Krämig pasta med bacon och ägg' },
        { name: 'Caesarsallad', category: 'food', price: 85, image: 'caesar.jpg', description: 'Krispig sallad med kyckling och dressing' },
        { name: 'Espresso', category: 'coffee', price: 25, image: 'espresso.jpg', description: 'Stark och fyllig espresso' },
        { name: 'Cappuccino', category: 'coffee', price: 35, image: 'cappuccino.jpg', description: 'Espresso med skummad mjölk' },
        { name: 'Chokladtårta', category: 'dessert', price: 45, image: 'chokladtarta.jpg', description: 'Saftig chokladtårta med grädde' },
        { name: 'Äppelpaj', category: 'dessert', price: 40, image: 'appelpaj.jpg', description: 'Hemlagad äppelpaj med vaniljsås' },
    ];
    
    const menuContainer = document.querySelector('.menu-container');
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    function displayMenuItems(category = 'all') {
        const sections = menuContainer.querySelectorAll('.menu-section');
        
        sections.forEach(section => {
            const sectionCategory = section.id;
            const menuItemsContainer = section.querySelector('.menu-items');
            menuItemsContainer.innerHTML = '';
            
            const filteredItems = category === 'all' ? 
                menuItems.filter(item => item.category === sectionCategory) : 
                menuItems.filter(item => item.category === category);
            
            filteredItems.forEach(item => {
                const menuItem = document.createElement('div');
                menuItem.classList.add('menu-item');
                menuItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                    <div class="menu-item-info">
                        <h4 class="menu-item-title">${item.name}</h4>
                        <p class="menu-item-description">${item.description}</p>
                        <p class="menu-item-price">${item.price} kr</p>
                    </div>
                `;
                menuItemsContainer.appendChild(menuItem);
            });
            
            section.style.display = (category === 'all' || category === sectionCategory) ? 'block' : 'none';
        });
    }
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            displayMenuItems(button.dataset.category);
        });
    });
    
    // Initialize the menu
    displayMenuItems();
    
    // Function to update daily lunch
    function updateDailyLunch() {
        const today = new Date().getDay();
        const dailyLunchItems = menuItems.filter(item => item.category === 'daily');
        if (dailyLunchItems.length > today) {
            dailyLunchItems[today].category = 'daily';
            displayMenuItems();
        }
    }
    
    // Update daily lunch every day at midnight
    setInterval(() => {
        const now = new Date();
        if (now.getHours() === 0 && now.getMinutes() === 0) {
            updateDailyLunch();
        }
    }, 60000); // Check every minute
    
    // Initial update
    updateDailyLunch();













    // Initialize Swiper
    const initSwiper = () => {
        new Swiper('.swiper-container', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
            }
        });
    };

    // Initial menu display
    displayMenuItems();

    // Booking Form
    const bookingForm = document.getElementById('booking-form');
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(bookingForm);
        // Here you would typically send this data to a server
        console.log('Booking submitted:', Object.fromEntries(formData));
        alert('Thank you for your booking! We will confirm shortly.');
        bookingForm.reset();
    });

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        // Here you would typically send this data to a server
        console.log('Contact form submitted:', Object.fromEntries(formData));
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletter-form');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        // Here you would typically send this data to a server
        console.log('Newsletter subscription:', email);
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
    });

    // Chat Widget
    const chatWidget = document.getElementById('chat-widget');
    const openChatButton = document.getElementById('open-chat');
    const closeChatButton = document.getElementById('close-chat');
    const chatForm = document.getElementById('chat-form');
    const chatBody = document.querySelector('.chat-body');

    openChatButton.addEventListener('click', () => {
        chatWidget.classList.add('chat-open');
        openChatButton.style.display = 'none';
    });

    closeChatButton.addEventListener('click', () => {
        chatWidget.classList.remove('chat-open');
        openChatButton.style.display = 'block';
    });

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = chatForm.querySelector('input');
        const message = input.value.trim();
        if (message) {
            appendMessage('user', message);
            input.value = '';
            // Simulate a response (replace with actual chat functionality)
            setTimeout(() => {
                appendMessage('bot', 'Thank you for your message. Our team will get back to you soon.');
            }, 1000);
        }
    });

    const appendMessage = (sender, message) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = message;
        chatBody.appendChild(messageElement);
        chatBody.scrollTop = chatBody.scrollHeight;
    };

    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
    });

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }

    // Intersection Observer for animations
    const faders = document.querySelectorAll('.fade-in');
    const sliders = document.querySelectorAll('.slide-in');

    const appearOptions = {
        threshold: 0,
        rootMargin: "0px 0px -100px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => appearOnScroll.observe(fader));
    sliders.forEach(slider => appearOnScroll.observe(slider));

    // Performance optimization
    const debouncedResize = debounce(() => {
        // Perform resize-sensitive operations here
    }, 250);

    window.addEventListener('resize', debouncedResize);

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Lazy loading images
    if ('IntersectionObserver' in window) {
        const imgOptions = {
            threshold: 0,
            rootMargin: "0px 0px 300px 0px"
        };

        const imgObserver = new IntersectionObserver((entries, imgObserver) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const img = entry.target;
                const src = img.getAttribute('data-src');
                if (!src) return;
                img.src = src;
                img.classList.add('fade-in');
                imgObserver.unobserve(img);
            });
        }, imgOptions);

        document.querySelectorAll('img[data-src]').forEach(img => imgObserver.observe(img));
    }
});



    //* HAMBURGARE
    document.addEventListener('DOMContentLoaded', function() {
        const burger = document.querySelector('.burger');
        const menu = document.querySelector('.menu');
        const menuLinks = document.querySelectorAll('.menu ul li a');
    
        burger.addEventListener('click', function() {
            burger.classList.toggle('active');
            menu.classList.toggle('active');
        });
    
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                menu.classList.remove('active');
            });
        });
    });






























