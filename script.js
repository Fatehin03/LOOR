/**

 * LOOR E-Commerce Platform

 * Utility Functions

 */

// Global Constants

const STORAGE_KEYS = {

    CART: 'loor_cart',

    USER: 'loor_user',

    PRODUCTS: 'loor_products',

    SELLERS: 'loor_sellers',

    ORDERS: 'loor_orders',

    ADMIN: 'loor_admin'

};

// Helper Functions

const utils = {

    /**

     * Generate a unique ID

     * @return {string} Unique ID

     */

    generateId: function() {

        return 'id_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();

    },

    /**

     * Format currency

     * @param {number} amount - Amount to format

     * @return {string} Formatted currency

     */

    formatCurrency: function(amount) {

        return '$' + parseFloat(amount).toFixed(2);

    },

    /**

     * Format date

     * @param {Date|string} date - Date to format

     * @return {string} Formatted date

     */

    formatDate: function(date) {

        const d = new Date(date);

        return d.toLocaleDateString('en-US', {

            year: 'numeric',

            month: 'long',

            day: 'numeric'

        });

    },

    /**

     * Get data from localStorage

     * @param {string} key - Storage key

     * @param {*} defaultValue - Default value if key doesn't exist

     * @return {*} Retrieved data or default value

     */

    getStorage: function(key, defaultValue = null) {

        const data = localStorage.getItem(key);

        if (data) {

            try {

                return JSON.parse(data);

            } catch (e) {

                console.error('Error parsing data from localStorage:', e);

                return defaultValue;

            }

        }

        return defaultValue;

    },

    /**

     * Save data to localStorage

     * @param {string} key - Storage key

     * @param {*} data - Data to store

     */

    setStorage: function(key, data) {

        try {

            localStorage.setItem(key, JSON.stringify(data));

        } catch (e) {

            console.error('Error saving data to localStorage:', e);

        }

    },

    /**

     * Remove data from localStorage

     * @param {string} key - Storage key to remove

     */

    removeStorage: function(key) {

        localStorage.removeItem(key);

    },

    /**

     * Fetch JSON data

     * @param {string} url - URL to fetch

     * @return {Promise<Object>} Parsed JSON data

     */

    fetchJSON: async function(url) {

        try {

            const response = await fetch(url);

            if (!response.ok) {

                throw new Error(`HTTP error! status: ${response.status}`);

            }

            return await response.json();

        } catch (e) {

            console.error('Error fetching JSON:', e);

            throw e;

        }

    },

    /**

     * Save JSON data to file (simulated using localStorage)

     * @param {string} filename - Name of the JSON file

     * @param {Object} data - Data to save

     */

    saveJSON: function(filename, data) {

        // In a real application, this would make an AJAX request

        // to save data on the server. For our frontend-only app,

        // we'll use localStorage.

        utils.setStorage(filename, data);

    },

    /**

     * Check if user is logged in

     * @return {boolean} Login status

     */

    isLoggedIn: function() {

        return !!utils.getStorage(STORAGE_KEYS.USER);

    },

    /**

     * Check if user is a seller

     * @return {boolean} Seller status

     */

    isSeller: function() {

        const user = utils.getStorage(STORAGE_KEYS.USER);

        return user && user.role === 'seller';

    },

    /**

     * Check if user is an admin

     * @return {boolean} Admin status

     */

    isAdmin: function() {

        const user = utils.getStorage(STORAGE_KEYS.USER);

        return user && user.role === 'admin';

    },

    /**

     * Display a notification message

     * @param {string} message - Message to display

     * @param {string} type - Message type (success, error, info)

     */

    showNotification: function(message, type = 'info') {

        // Create notification element if it doesn't exist

        let notificationContainer = document.getElementById('notification-container');

        

        if (!notificationContainer) {

            notificationContainer = document.createElement('div');

            notificationContainer.id = 'notification-container';

            notificationContainer.style.position = 'fixed';

            notificationContainer.style.top = '20px';

            notificationContainer.style.right = '20px';

            notificationContainer.style.zIndex = '9999';

            document.body.appendChild(notificationContainer);

        }

        

        // Create notification

        const notification = document.createElement('div');

        notification.className = `notification notification-${type}`;

        notification.innerHTML = `

            <div class="notification-content">

                ${message}

            </div>

            <button class="notification-close">&times;</button>

        `;

        

        // Style notification

        notification.style.backgroundColor = type === 'success' ? '#4CAF50' : 

                                             type === 'error' ? '#F44336' : '#2196F3';

        notification.style.color = 'white';

        notification.style.padding = '12px';

        notification.style.marginBottom = '10px';

        notification.style.borderRadius = '4px';

        notification.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';

        notification.style.display = 'flex';

        notification.style.justifyContent = 'space-between';

        notification.style.alignItems = 'center';

        notification.style.minWidth = '300px';

        

        // Add close button functionality

        const closeButton = notification.querySelector('.notification-close');

        closeButton.style.background = 'none';

        closeButton.style.border = 'none';

        closeButton.style.color = 'white';

        closeButton.style.fontSize = '20px';

        closeButton.style.cursor = 'pointer';

        

        closeButton.addEventListener('click', () => {

            notification.remove();

        });

        

        // Add to container

        notificationContainer.appendChild(notification);

        

        // Auto-remove after 5 seconds

        setTimeout(() => {

            if (notification.parentNode) {

                notification.remove();

            }

        }, 5000);

    },

    /**

     * Update user interface based on login status

     */

    updateUI: function() {

        const user = utils.getStorage(STORAGE_KEYS.USER);

        

        // Update cart count

        const cart = utils.getStorage(STORAGE_KEYS.CART, []);

        const cartCountElement = document.getElementById('cart-count');

        if (cartCountElement) {

            cartCountElement.textContent = cart.reduce((total, item) => total + item.quantity, 0);

        }

        

        // Update account dropdown

        const accountDropdown = document.querySelector('.account-dropdown');

        if (accountDropdown) {

            if (user) {

                accountDropdown.innerHTML = `

                    <a href="pages/account.html">My Account</a>

                    <a href="pages/orders.html">My Orders</a>

                    ${user.role === 'seller' ? '<a href="pages/seller/dashboard.html">Seller Dashboard</a>' : ''}

                    ${user.role === 'admin' ? '<a href="pages/admin/dashboard.html">Admin Dashboard</a>' : ''}

                    <a href="#" id="logout-link">Logout</a>

                `;

                

                // Add logout functionality

                const logoutLink = document.getElementById('logout-link');

                if (logoutLink) {

                    logoutLink.addEventListener('click', (e) => {

                        e.preventDefault();

                        utils.removeStorage(STORAGE_KEYS.USER);

                        utils.showNotification('Logged out successfully', 'success');

                        window.location.href = 'index.html';

                    });

                }

            } else {

                accountDropdown.innerHTML = `

                    <a href="pages/login.html">Login</a>

                    <a href="pages/register.html">Register</a>

                    <a href="pages/admin/login.html">Admin</a>

                `;

            }

        }

    },

    /**

     * Initialize data in localStorage if it doesn't exist

     */

    initializeData: function() {

        // Initialize Products

        if (!utils.getStorage(STORAGE_KEYS.PRODUCTS)) {

            const defaultProducts = [

                {

                    id: 'prod001',

                    name: 'Premium Laptop',

                    description: 'High-performance laptop for professionals.',

                    price: 1299.99,

                    category: 'Electronics',

                    sellerId: 'seller001',

                    sellerName: 'TechHub',

                    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',

                    inventory: 25,

                    featured: true,

                    newArrival: true,

                    dateAdded: new Date(2023, 5, 15).toISOString()

                },

                {

                    id: 'prod002',

                    name: 'Wireless Headphones',

                    description: 'Noise-cancelling headphones with premium sound quality.',

                    price: 199.99,

                    category: 'Electronics',

                    sellerId: 'seller001',

                    sellerName: 'TechHub',

                    image: 'https://images.pexels.com/photos/815494/pexels-photo-815494.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',

                    inventory: 40,

                    featured: true,

                    newArrival: false,

                    dateAdded: new Date(2023, 4, 20).toISOString()

                },

                {

                    id: 'prod003',

                    name: 'Designer Watch',

                    description: 'Luxury watch with premium materials and craftsmanship.',

                    price: 349.99,

                    category: 'Fashion',

                    sellerId: 'seller002',

                    sellerName: 'StyleMasters',

                    image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',

                    inventory: 15,

                    featured: false,

                    newArrival: true,

                    dateAdded: new Date(2023, 6, 5).toISOString()

                },

                {

                    id: 'prod004',

                    name: 'Organic Skin Care Set',

                    description: 'Natural ingredients for glowing skin.',

                    price: 89.99,

                    category: 'Beauty',

                    sellerId: 'seller003',

                    sellerName: 'NaturaBeauty',

                    image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',

                    inventory: 30,

                    featured: true,

                    newArrival: true,

                    dateAdded: new Date(2023, 6, 10).toISOString()

                },

                {

                    id: 'prod005',

                    name: 'Smart Home System',

                    description: 'Complete home automation solution.',

                    price: 499.99,

                    category: 'Electronics',

                    sellerId: 'seller001',

                    sellerName: 'TechHub',

                    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',

                    inventory: 10,

                    featured: true,

                    newArrival: false,

                    dateAdded: new Date(2023, 3, 15).toISOString()

                },

                {

                    id: 'prod006',

                    name: 'Gourmet Coffee Beans',

                    description: 'Premium roasted coffee beans from Ethiopia.',

                    price: 29.99,

                    category: 'Food',

                    sellerId: 'seller004',

                    sellerName: 'GourmetDelights',

                    image: 'https://images.pexels.com/photos/3020919/pexels-photo-3020919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',

                    inventory: 50,

                    featured: false,

                    newArrival: true,

                    dateAdded: new Date(2023, 6, 15).toISOString()

                }

            ];

            utils.setStorage(STORAGE_KEYS.PRODUCTS, defaultProducts);

        }

        

        // Initialize Categories

        if (!utils.getStorage('loor_categories')) {

            const defaultCategories = [

                {

                    id: 'cat001',

                    name: 'Electronics',

                    image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'

                },

                {

                    id: 'cat002',

                    name: 'Fashion',

                    image: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'

                },

                {

                    id: 'cat003',

                    name: 'Beauty',

                    image: 'https://images.pexels.com/photos/2693644/pexels-photo-2693644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'

                },

                {

                    id: 'cat004',

                    name: 'Food',

                    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'

                }

            ];

            utils.setStorage('loor_categories', defaultCategories);

        }

        

        // Initialize Sellers

        if (!utils.getStorage(STORAGE_KEYS.SELLERS)) {

            const defaultSellers = [

                {

                    id: 'seller001',

                    username: 'techhub',

                    name: 'TechHub',

                    email: 'contact@techhub.com',

                    verified: true,

                    dateJoined: new Date(2023, 0, 15).toISOString(),

                    products: ['prod001', 'prod002', 'prod005']

                },

                {

                    id: 'seller002',

                    username: 'stylemasters',

                    name: 'StyleMasters',

                    email: 'hello@stylemasters.com',

                    verified: true,

                    dateJoined: new Date(2023, 1, 10).toISOString(),

                    products: ['prod003']

                },

                {

                    id: 'seller003',

                    username: 'naturabeauty',

                    name: 'NaturaBeauty',

                    email: 'info@naturabeauty.com',

                    verified: true,

                    dateJoined: new Date(2023, 2, 5).toISOString(),

                    products: ['prod004']

                },

                {

                    id: 'seller004',

                    username: 'gourmetdelights',

                    name: 'GourmetDelights',

                    email: 'sales@gourmetdelights.com',

                    verified: true,

                    dateJoined: new Date(2023, 3, 20).toISOString(),

                    products: ['prod006']

                }

            ];

            utils.setStorage(STORAGE_KEYS.SELLERS, defaultSellers);

        }

        

        // Initialize Admin

        if (!utils.getStorage(STORAGE_KEYS.ADMIN)) {

            const adminUser = {

                username: 'admin',

                password: 'admin123', // In a real app, this would be hashed

                email: 'admin@loor.com',

                role: 'admin'

            };

            utils.setStorage(STORAGE_KEYS.ADMIN, adminUser);

        }

        

        // Initialize empty cart if it doesn't exist

        if (!utils.getStorage(STORAGE_KEYS.CART)) {

            utils.setStorage(STORAGE_KEYS.CART, []);

        }

        

        // Initialize empty orders if they don't exist

        if (!utils.getStorage(STORAGE_KEYS.ORDERS)) {

            utils.setStorage(STORAGE_KEYS.ORDERS, []);

        }

    }

};

// Initialize data when the script loads

document.addEventListener('DOMContentLoaded', function() {

    utils.initializeData();

    utils.updateUI();

    

    // Toggle mobile menu

    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');

    const mobileMenu = document.querySelector('.mobile-menu');

    

    if (mobileMenuToggle && mobileMenu) {

        mobileMenuToggle.addEventListener('click', function() {

            mobileMenu.classList.toggle('active');

        });

    }

});
/**

 * LOOR E-Commerce Platform

 * Product Management

 */

const ProductManager = {

    /**

     * Get all products

     * @return {Array} Products array

     */

    getAllProducts: function() {

        return utils.getStorage(STORAGE_KEYS.PRODUCTS, []);

    },

    

    /**

     * Get product by ID

     * @param {string} productId - Product ID

     * @return {Object|null} Product object or null if not found

     */

    getProductById: function(productId) {

        const products = this.getAllProducts();

        return products.find(product => product.id === productId) || null;

    },

    

    /**

     * Get products by category

     * @param {string} category - Category name

     * @return {Array} Filtered products

     */

    getProductsByCategory: function(category) {

        const products = this.getAllProducts();

        return products.filter(product => product.category === category);

    },

    

    /**

     * Get products by seller ID

     * @param {string} sellerId - Seller ID

     * @return {Array} Filtered products

     */

    getProductsBySeller: function(sellerId) {

        const products = this.getAllProducts();

        return products.filter(product => product.sellerId === sellerId);

    },

    

    /**

     * Get featured products

     * @param {number} limit - Maximum number of products to return

     * @return {Array} Featured products

     */

    getFeaturedProducts: function(limit = 0) {

        const products = this.getAllProducts();

        const featuredProducts = products.filter(product => product.featured);

        

        if (limit > 0) {

            return featuredProducts.slice(0, limit);

        }

        return featuredProducts;

    },

    

    /**

     * Get new arrivals

     * @param {number} limit - Maximum number of products to return

     * @return {Array} New arrival products

     */

    getNewArrivals: function(limit = 0) {

        const products = this.getAllProducts();

        const newArrivals = products.filter(product => product.newArrival);

        

        if (limit > 0) {

            return newArrivals.slice(0, limit);

        }

        return newArrivals;

    },

    

    /**

     * Search products

     * @param {string} query - Search query

     * @return {Array} Search results

     */

    searchProducts: function(query) {

        if (!query) return [];

        

        const searchTerm = query.toLowerCase().trim();

        const products = this.getAllProducts();

        

        return products.filter(product => {

            return (

                product.name.toLowerCase().includes(searchTerm) ||

                product.description.toLowerCase().includes(searchTerm) ||

                product.category.toLowerCase().includes(searchTerm) ||

                product.sellerName.toLowerCase().includes(searchTerm)

            );

        });

    },

    

    /**

     * Add new product

     * @param {Object} productData - Product data

     * @return {Object} Added product

     */

    addProduct: function(productData) {

        const products = this.getAllProducts();

        

        // Generate ID if not provided

        if (!productData.id) {

            productData.id = utils.generateId();

        }

        

        // Set date added if not provided

        if (!productData.dateAdded) {

            productData.dateAdded = new Date().toISOString();

        }

        

        // Add product to array

        products.push(productData);

        

        // Save updated products

        utils.setStorage(STORAGE_KEYS.PRODUCTS, products);

        

        // Add product to seller's list

        if (productData.sellerId) {

            const sellers = utils.getStorage(STORAGE_KEYS.SELLERS, []);

            const sellerIndex = sellers.findIndex(seller => seller.id === productData.sellerId);

            

            if (sellerIndex !== -1) {

                if (!sellers[sellerIndex].products) {

                    sellers[sellerIndex].products = [];

                }

                sellers[sellerIndex].products.push(productData.id);

                utils.setStorage(STORAGE_KEYS.SELLERS, sellers);

            }

        }

        

        return productData;

    },

    

    /**

     * Update product

     * @param {string} productId - Product ID

     * @param {Object} updatedData - Updated product data

     * @return {Object|null} Updated product or null if not found

     */

    updateProduct: function(productId, updatedData) {

        const products = this.getAllProducts();

        const productIndex = products.findIndex(product => product.id === productId);

        

        if (productIndex === -1) {

            return null;

        }

        

        // Merge current product with updates

        products[productIndex] = { ...products[productIndex], ...updatedData };

        

        // Save updated products

        utils.setStorage(STORAGE_KEYS.PRODUCTS, products);

        

        return products[productIndex];

    },

    

    /**

     * Delete product

     * @param {string} productId - Product ID

     * @return {boolean} Success status

     */

    deleteProduct: function(productId) {

        const products = this.getAllProducts();

        const productIndex = products.findIndex(product => product.id === productId);

        

        if (productIndex === -1) {

            return false;

        }

        

        // Get seller ID before removing product

        const sellerId = products[productIndex].sellerId;

        

        // Remove product

        products.splice(productIndex, 1);

        

        // Save updated products

        utils.setStorage(STORAGE_KEYS.PRODUCTS, products);

        

        // Remove product from seller's list

        if (sellerId) {

            const sellers = utils.getStorage(STORAGE_KEYS.SELLERS, []);

            const sellerIndex = sellers.findIndex(seller => seller.id === sellerId);

            

            if (sellerIndex !== -1 && sellers[sellerIndex].products) {

                sellers[sellerIndex].products = sellers[sellerIndex].products.filter(id => id !== productId);

                utils.setStorage(STORAGE_KEYS.SELLERS, sellers);

            }

        }

        

        return true;

    },

    

    /**

     * Get all categories

     * @return {Array} Categories array

     */

    getAllCategories: function() {

        return utils.getStorage('loor_categories', []);

    },

    

    /**

     * Render product card

     * @param {Object} product - Product object

     * @return {HTMLElement} Product card element

     */

    renderProductCard: function(product) {

        const productCard = document.createElement('div');

        productCard.className = 'product-card';

        productCard.setAttribute('data-product-id', product.id);

        

        productCard.innerHTML = `

            <div class="product-image" style="background-image: url('${product.image}')">

                ${product.newArrival ? '<span class="product-badge">NEW</span>' : ''}

            </div>

            <div class="product-info">

                <h3 class="product-name">${product.name}</h3>

                <div class="product-seller">by ${product.sellerName}</div>

                <div class="product-price">${utils.formatCurrency(product.price)}</div>

                <div class="product-actions">

                    <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>

                    <button class="view-details" data-product-id="${product.id}">Details</button>

                </div>

            </div>

        `;

        

        // Add event listeners

        const addToCartBtn = productCard.querySelector('.add-to-cart');

        const viewDetailsBtn = productCard.querySelector('.view-details');

        

        addToCartBtn.addEventListener('click', function(e) {

            e.preventDefault();

            const productId = this.getAttribute('data-product-id');

            CartManager.addToCart(productId, 1);

            utils.showNotification(`${product.name} added to cart!`, 'success');

        });

        

        viewDetailsBtn.addEventListener('click', function(e) {

            e.preventDefault();

            const productId = this.getAttribute('data-product-id');

            window.location.href = `pages/product.html?id=${productId}`;

        });

        

        return productCard;

    },

    

    /**

     * Render category card

     * @param {Object} category - Category object

     * @return {HTMLElement} Category card element

     */

    renderCategoryCard: function(category) {

        const categoryCard = document.createElement('div');

        categoryCard.className = 'category-card';

        categoryCard.setAttribute('data-category-id', category.id);

        

        categoryCard.innerHTML = `

            <div class="category-image" style="background-image: url('${category.image}')"></div>

            <div class="category-name">${category.name}</div>

        `;

        

        // Add event listener

        categoryCard.addEventListener('click', function() {

            const categoryName = category.name;

            window.location.href = `pages/category.html?name=${encodeURIComponent(categoryName)}`;

        });

        

        return categoryCard;

    },

    

    /**

     * Initialize product-related elements on the page

     */

    initializeElements: function() {

        // Initialize featured products

        const featuredContainer = document.getElementById('featured-products-container');

        if (featuredContainer) {

            const featuredProducts = this.getFeaturedProducts(4);

            featuredContainer.innerHTML = '';

            

            if (featuredProducts.length > 0) {

                featuredProducts.forEach(product => {

                    featuredContainer.appendChild(this.renderProductCard(product));

                });

            } else {

                featuredContainer.innerHTML = '<p class="no-products">No featured products available.</p>';

            }

        }

        

        // Initialize new arrivals

        const newArrivalsContainer = document.getElementById('new-arrivals-container');

        if (newArrivalsContainer) {

            const newArrivals = this.getNewArrivals(4);

            newArrivalsContainer.innerHTML = '';

            

            if (newArrivals.length > 0) {

                newArrivals.forEach(product => {

                    newArrivalsContainer.appendChild(this.renderProductCard(product));

                });

            } else {

                newArrivalsContainer.innerHTML = '<p class="no-products">No new arrivals available.</p>';

            }

        }

        

        // Initialize categories

        const categoriesContainer = document.getElementById('categories-container');

        if (categoriesContainer) {

            const categories = this.getAllCategories();

            categoriesContainer.innerHTML = '';

            

            if (categories.length > 0) {

                categories.forEach(category => {

                    categoriesContainer.appendChild(this.renderCategoryCard(category));

                });

            } else {

                categoriesContainer.innerHTML = '<p class="no-categories">No categories available.</p>';

            }

        }

        

        // Initialize search form

        const searchForm = document.getElementById('search-form');

        if (searchForm) {

            searchForm.addEventListener('submit', function(e) {

                e.preventDefault();

                const searchInput = document.getElementById('search-input');

                const query = searchInput.value.trim();

                

                if (query) {

                    window.location.href = `pages/search.html?q=${encodeURIComponent(query)}`;

                }

            });

        }

    }

};

// Initialize products when DOM is loaded

document.addEventListener('DOMContentLoaded', function() {

    ProductManager.initializeElements();

});
/**

 * LOOR E-Commerce Platform

 * Cart Management

 */

const CartManager = {

    /**

     * Get cart items

     * @return {Array} Cart items

     */

    getCart: function() {

        return utils.getStorage(STORAGE_KEYS.