/**

 * LOOR - Main JavaScript

 * Handles core functionality for the LOOR e-commerce platform

 */

// Wait for the DOM to fully load

document.addEventListener('DOMContentLoaded', function() {

    // Initialize the site

    initSideMenu();

    initHeroSlider();

    loadFeaturedProducts();

    loadDeals();

    setupCategoryNavigation();

    setupSearchFunctionality();



    // Update cart count from localStorage

    updateCartCount();

});

/**

 * Initialize the side menu functionality

 */

function initSideMenu() {

    const menuToggle = document.getElementById('menu-toggle');

    const sideMenu = document.getElementById('side-menu');

    const closeBtn = document.querySelector('.close-btn');

    const overlay = document.getElementById('overlay');



    // Open menu

    menuToggle.addEventListener('click', function(e) {

        e.preventDefault();

        sideMenu.classList.add('active');

        overlay.style.display = 'block';

        document.body.style.overflow = 'hidden'; // Prevent scrolling

    });



    // Close menu

    closeBtn.addEventListener('click', function() {

        sideMenu.classList.remove('active');

        overlay.style.display = 'none';

        document.body.style.overflow = 'auto'; // Enable scrolling

    });



    // Close menu when clicking overlay

    overlay.addEventListener('click', function() {

        sideMenu.classList.remove('active');

        overlay.style.display = 'none';

        document.body.style.overflow = 'auto'; // Enable scrolling

    });

}

/**

 * Initialize the hero slider banner

 */

function initHeroSlider() {

    const sliderContainer = document.getElementById('hero-slider');

    const prevButton = document.querySelector('.slider-arrow.prev');

    const nextButton = document.querySelector('.slider-arrow.next');



    // Sample banner images

    const banners = [

        {

            image: "/api/placeholder/1200/350",

            alt: "Special offers"

        },

        {

            image: "/api/placeholder/1200/350",

            alt: "New arrivals"

        },

        {

            image: "/api/placeholder/1200/350",

            alt: "Summer sale"

        },

        {

            image: "/api/placeholder/1200/350",

            alt: "Electronics"

        }

    ];



    // Create slides

    banners.forEach(banner => {

        const slide = document.createElement('div');

        slide.className = 'hero-slide';

        slide.style.backgroundImage = `url(${banner.image})`;

        slide.setAttribute('aria-label', banner.alt);

        sliderContainer.appendChild(slide);

    });



    let currentSlide = 0;

    const totalSlides = banners.length;



    // Function to update slider position

    function updateSliderPosition() {

        sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

    }



    // Previous slide

    prevButton.addEventListener('click', function() {

        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;

        updateSliderPosition();

    });



    // Next slide

    nextButton.addEventListener('click', function() {

        currentSlide = (currentSlide + 1) % totalSlides;

        updateSliderPosition();

    });



    // Auto-slide every 5 seconds

    const autoSlideInterval = setInterval(() => {

        currentSlide = (currentSlide + 1) % totalSlides;

        updateSliderPosition();

    }, 5000);



    // Stop auto-slide when user interacts with slider

    [prevButton, nextButton].forEach(button => {

        button.addEventListener('click', () => {

            clearInterval(autoSlideInterval);

        });

    });

}

/**

 * Load featured products from JSON file

 */

function loadFeaturedProducts() {

    // In a real implementation, this would fetch from a JSON file

    // For demo purposes, we'll use sample data

    const featuredProductsContainer = document.getElementById('featured-products');



    // Sample products

    const products = [

            {

                id: 1,

                title: "Wireless Bluetooth Earbuds with Charging Case",

                price: 49.99,

                image: "/api/placeholder/200/200",

                rating: 4.5,

                reviewCount: 1245,

                isPrime: true,

                category: "electronics"

            },

            {

                id: 2,

                title: "Smartphone Stand Holder with Adjustable Height",

                price: 19.99,

                image: "/api/placeholder/200/200",

                rating: 4.2,

                reviewCount: 873,

                isPrime: true,

                category: "electronics"

            },

            {

                id: 3,

                title: "Lightweight Cotton T-Shirt, Multiple Colors",

                price: 12.99,

                image: "/api/placeholder/200/200",

                rating: 4.0,

                reviewCount: 562,

                isPrime: false,

                category: "clothing"

            },

            {

                id: 4,

                title: "Stainless Steel Water Bottle, 32oz",

                price: 24.95,

                image: "/api/placeholder/200/200",

                rating: 4.7,

                reviewCount: 2103,

                isPrime: true,

                category: "home"

            },

            {

                id: 5,

                title: "Bestselling Mystery Novel: The Silent Witness",

                price: 14.99,

                image: "/api/placeholder/200/200",

                rating: 4.4,

                reviewCount: 1876,

                isPrime: true,

                category: "books"

            },

            {

                id: 6,

                title: "Multi-Purpose Kitchen Scissors with Magnetic Holder",

                price: 9.99,

                image: "/api/