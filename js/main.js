// StyleHub Clothing Store - Main JavaScript

// Product Data Structure
const products = [
    // Men's Products
    {
        id: 1,
        name: "Classic Cotton T-Shirt",
        category: "men",
        subcategory: "shirts",
        price: 24.99,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ],
        description: "Comfortable and versatile cotton t-shirt perfect for everyday wear.",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Black", "White", "Gray", "Navy"],
        inStock: true,
        featured: true,
        newArrival: true
    },
    {
        id: 2,
        name: "Slim Fit Jeans",
        category: "men",
        subcategory: "pants",
        price: 79.99,
        originalPrice: 99.99,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ],
        description: "Modern slim-fit jeans with premium denim and comfortable stretch.",
        sizes: ["28", "30", "32", "34", "36", "38"],
        colors: ["Dark Blue", "Light Blue", "Black"],
        inStock: true,
        featured: true,
        sale: true
    },
    {
        id: 3,
        name: "Leather Jacket",
        category: "men",
        subcategory: "jackets",
        price: 199.99,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1520975954732-35dd22299614?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ],
        description: "Premium genuine leather jacket with classic motorcycle styling.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Black", "Brown"],
        inStock: true,
        featured: false,
        newArrival: true
    },
    
    // Women's Products
    {
        id: 4,
        name: "Floral Summer Dress",
        category: "women",
        subcategory: "dresses",
        price: 59.99,
        originalPrice: 79.99,
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ],
        description: "Beautiful floral print dress perfect for summer occasions.",
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Floral Blue", "Floral Pink", "Floral Green"],
        inStock: true,
        featured: true,
        sale: true
    },
    {
        id: 5,
        name: "Silk Blouse",
        category: "women",
        subcategory: "tops",
        price: 89.99,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ],
        description: "Elegant silk blouse perfect for professional and casual wear.",
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["White", "Cream", "Black", "Navy"],
        inStock: true,
        featured: true,
        newArrival: true
    },
    {
        id: 6,
        name: "High-Waisted Trousers",
        category: "women",
        subcategory: "bottoms",
        price: 69.99,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1506629905057-f39b5788f2d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ],
        description: "Stylish high-waisted trousers with a flattering fit.",
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Black", "Beige", "Navy", "Gray"],
        inStock: true,
        featured: false,
        newArrival: true
    },
    
    // Kids Products
    {
        id: 7,
        name: "Rainbow Hoodie",
        category: "kids",
        subcategory: "boys",
        price: 34.99,
        originalPrice: 44.99,
        image: "https://images.unsplash.com/photo-1503944168586-c17f9bb2b5c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1503944168586-c17f9bb2b5c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1522706604291-210a56c3b376?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ],
        description: "Colorful rainbow hoodie that kids love to wear.",
        sizes: ["4T", "5T", "6", "7", "8", "10", "12"],
        colors: ["Rainbow", "Blue", "Pink"],
        inStock: true,
        featured: true,
        sale: true
    },
    {
        id: 8,
        name: "Unicorn Dress",
        category: "kids",
        subcategory: "girls",
        price: 39.99,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ],
        description: "Magical unicorn dress perfect for special occasions and play.",
        sizes: ["4T", "5T", "6", "7", "8", "10"],
        colors: ["Purple", "Pink", "White"],
        inStock: true,
        featured: true,
        newArrival: true
    }
];

// Shopping Cart
let cart = JSON.parse(localStorage.getItem('stylehub-cart')) || [];

// DOM Elements
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const cartBtn = document.getElementById('cart-btn');
const cartCount = document.getElementById('cart-count');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const closeCartBtn = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const newsletterForm = document.getElementById('newsletter-form');

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    updateCartCount();
    loadFeaturedProducts();
    setupEventListeners();
    setupMobileMenu();
}

// Event Listeners
function setupEventListeners() {
    // Search functionality
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    // Cart functionality
    cartBtn.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
    
    // Newsletter form
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
}

// Mobile Menu
function setupMobileMenu() {
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Animate hamburger bars
        const bars = hamburger.querySelectorAll('.bar');
        bars.forEach(bar => bar.classList.toggle('active'));
    });
    
    // Close mobile menu when clicking on links
    navMenu.addEventListener('click', function(e) {
        if (e.target.classList.contains('nav-link')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Product Functions
function loadFeaturedProducts() {
    const featuredProductsGrid = document.getElementById('featured-products-grid');
    if (!featuredProductsGrid) return;
    
    const featuredProducts = products.filter(product => product.featured);
    featuredProductsGrid.innerHTML = '';
    
    featuredProducts.forEach(product => {
        const productCard = createProductCard(product);
        featuredProductsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const priceHTML = product.originalPrice 
        ? `<span class="product-price">$${product.price} <span class="original-price">$${product.originalPrice}</span></span>`
        : `<span class="product-price">$${product.price}</span>`;
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            ${product.sale ? '<div class="sale-badge">SALE</div>' : ''}
            ${product.newArrival ? '<div class="new-badge">NEW</div>' : ''}
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            ${priceHTML}
            <div class="product-actions">
                <button class="btn btn-primary btn-sm" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-bag"></i> Add to Cart
                </button>
                <button class="btn btn-secondary btn-sm" onclick="viewProduct(${product.id})">
                    View Details
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Search Functionality
function handleSearch() {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) return;
    
    const searchResults = products.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
    
    // Redirect to search results page with query parameter
    window.location.href = `search.html?q=${encodeURIComponent(query)}`;
}

// Cart Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1,
            selectedSize: product.sizes[0], // Default size
            selectedColor: product.colors[0] // Default color
        });
    }
    
    updateCart();
    showCartNotification(product.name);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            updateCart();
        }
    }
}

function updateCart() {
    localStorage.setItem('stylehub-cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
}

function renderCartItems() {
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-bag" style="font-size: 3rem; color: #ccc; margin-bottom: 1rem;"></i>
                <p>Your cart is empty</p>
                <a href="new-arrivals.html" class="btn btn-primary">Start Shopping</a>
            </div>
        `;
        cartTotal.textContent = '0.00';
        return;
    }
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>Size: ${item.selectedSize} | Color: ${item.selectedColor}</p>
                <div class="cart-item-price">$${item.price}</div>
                <div class="quantity-controls">
                    <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    cartTotal.textContent = total.toFixed(2);
}

function openCart() {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    renderCartItems();
}

function closeCart() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

function showCartNotification(productName) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${productName} added to cart!</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: #28a745;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Product Details
function viewProduct(productId) {
    // Store product ID in session storage for product detail page
    sessionStorage.setItem('selectedProductId', productId);
    window.location.href = 'product-detail.html';
}

// Newsletter
function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    // Simulate newsletter signup
    showNotification('Thank you for subscribing to our newsletter!', 'success');
    e.target.reset();
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 3000;
        color: white;
        background-color: ${type === 'success' ? '#28a745' : '#007bff'};
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Utility Functions
function getProductsByCategory(category) {
    return products.filter(product => product.category === category);
}

function getProductsBySubcategory(category, subcategory) {
    return products.filter(product => 
        product.category === category && product.subcategory === subcategory
    );
}

function getSaleProducts() {
    return products.filter(product => product.sale);
}

function getNewArrivals() {
    return products.filter(product => product.newArrival);
}

// Export functions for use in other pages
window.StyleHub = {
    products,
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getProductsByCategory,
    getProductsBySubcategory,
    getSaleProducts,
    getNewArrivals,
    createProductCard,
    openCart,
    closeCart
};