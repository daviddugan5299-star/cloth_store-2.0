// New Arrivals Page JavaScript

class NewArrivalsManager {
    constructor() {
        this.newArrivals = [];
        this.currentFilter = 'all';
        this.currentFilters = {
            category: 'all',
            price: 500,
            sizes: [],
            sort: 'newest'
        };
        this.currentPage = 1;
        this.itemsPerPage = 12;
        
        this.init();
    }
    
    init() {
        this.loadNewArrivals();
        this.setupEventListeners();
        this.updateActiveFilters();
    }
    
    getCategoryFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('category') || 'all';
    }
    
    setupEventListeners() {
        // Price filter
        const priceRange = document.getElementById('price-range');
        const maxPriceDisplay = document.getElementById('max-price');
        
        if (priceRange) {
            priceRange.addEventListener('input', (e) => {
                const value = e.target.value;
                this.currentFilters.price = parseInt(value);
                maxPriceDisplay.textContent = `$${value}`;
                this.filterProducts();
            });
        }
        
        // Size filters
        const sizeCheckboxes = document.querySelectorAll('.size-filter input[type="checkbox"]');
        sizeCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const size = e.target.value;
                if (e.target.checked) {
                    this.currentFilters.sizes.push(size);
                } else {
                    this.currentFilters.sizes = this.currentFilters.sizes.filter(s => s !== size);
                }
                this.filterProducts();
            });
        });
        
        // Sort dropdown
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.currentFilters.sort = e.target.value;
                this.filterProducts();
            });
        }
        
        // Category filters from URL
        this.currentFilters.category = this.getCategoryFromURL();
    }
    
    loadNewArrivals() {
        const productsGrid = document.getElementById('products-grid');
        
        // Show loading state
        productsGrid.innerHTML = `
            <div class="loading-products" style="grid-column: 1 / -1;">
                <div class="loading-spinner"></div>
                <p>Loading new arrivals...</p>
            </div>
        `;
        
        // Get new arrival products
        this.newArrivals = window.StyleHub.getNewArrivals();
        
        // Simulate loading delay
        setTimeout(() => {
            this.filterProducts();
        }, 500);
    }
    
    filterProducts() {
        let products = [...this.newArrivals];
        
        // Apply category filter
        if (this.currentFilters.category !== 'all') {
            products = products.filter(product => 
                product.category === this.currentFilters.category
            );
        }
        
        // Apply price filter
        products = products.filter(product => product.price <= this.currentFilters.price);
        
        // Apply size filter
        if (this.currentFilters.sizes.length > 0) {
            products = products.filter(product => 
                product.sizes.some(size => this.currentFilters.sizes.includes(size))
            );
        }
        
        // Apply sorting
        this.sortProducts(products);
        
        this.renderProducts(products);
        this.updateResultsCount(products.length);
    }
    
    sortProducts(products) {
        switch (this.currentFilters.sort) {
            case 'price-low':
                products.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                products.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                products.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'newest':
            default:
                // New arrivals are already sorted by newest first
                break;
        }
    }
    
    renderProducts(products) {
        const productsGrid = document.getElementById('products-grid');
        
        if (products.length === 0) {
            productsGrid.innerHTML = `
                <div class="empty-products" style="grid-column: 1 / -1;">
                    <i class="fas fa-star"></i>
                    <h3>No new arrivals found</h3>
                    <p>Try adjusting your filters or check back soon for new items.</p>
                    <button class="btn btn-primary" onclick="clearFilters()">Clear Filters</button>
                </div>
            `;
            return;
        }
        
        // Calculate pagination
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const paginatedProducts = products.slice(startIndex, endIndex);
        
        // Render products
        productsGrid.innerHTML = '';
        paginatedProducts.forEach(product => {
            const productCard = this.createNewArrivalCard(product);
            productsGrid.appendChild(productCard);
        });
        
        // Render pagination if needed
        this.renderPagination(products.length);
    }
    
    createNewArrivalCard(product) {
        const card = window.StyleHub.createProductCard(product);
        
        // Add new arrival badge
        const productImage = card.querySelector('.product-image');
        const newBadge = document.createElement('div');
        newBadge.className = 'new-arrival-badge';
        newBadge.textContent = 'NEW';
        newBadge.style.cssText = `
            position: absolute;
            top: 1rem;
            left: 1rem;
            background-color: #5a6c7d;
            color: white;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: 700;
            z-index: 2;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        `;
        
        productImage.appendChild(newBadge);
        
        // Add quick view overlay
        const overlay = document.createElement('div');
        overlay.className = 'product-overlay';
        overlay.innerHTML = `
            <button class="quick-view-btn" onclick="viewProduct(${product.id})">
                Quick View
            </button>
        `;
        productImage.appendChild(overlay);
        
        return card;
    }
    
    renderPagination(totalItems) {
        const paginationContainer = document.getElementById('pagination');
        const totalPages = Math.ceil(totalItems / this.itemsPerPage);
        
        if (totalPages <= 1) {
            paginationContainer.innerHTML = '';
            return;
        }
        
        let paginationHTML = '';
        
        // Previous button
        paginationHTML += `
            <button onclick="newArrivalsManager.goToPage(${this.currentPage - 1})" 
                    ${this.currentPage === 1 ? 'disabled' : ''}>
                <i class="fas fa-chevron-left"></i>
            </button>
        `;
        
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= this.currentPage - 2 && i <= this.currentPage + 2)) {
                paginationHTML += `
                    <button onclick="newArrivalsManager.goToPage(${i})" 
                            class="${i === this.currentPage ? 'active' : ''}">
                        ${i}
                    </button>
                `;
            } else if (i === this.currentPage - 3 || i === this.currentPage + 3) {
                paginationHTML += '<span>...</span>';
            }
        }
        
        // Next button
        paginationHTML += `
            <button onclick="newArrivalsManager.goToPage(${this.currentPage + 1})" 
                    ${this.currentPage === totalPages ? 'disabled' : ''}>
                <i class="fas fa-chevron-right"></i>
            </button>
        `;
        
        paginationContainer.innerHTML = paginationHTML;
    }
    
    goToPage(page) {
        const totalItems = this.newArrivals.length;
        const totalPages = Math.ceil(totalItems / this.itemsPerPage);
        
        if (page >= 1 && page <= totalPages) {
            this.currentPage = page;
            this.filterProducts();
            
            // Scroll to top of products
            document.querySelector('.products-container').scrollIntoView({
                behavior: 'smooth'
            });
        }
    }
    
    updateResultsCount(count) {
        const resultsCount = document.getElementById('results-count');
        if (resultsCount) {
            const total = this.newArrivals.length;
            if (this.currentFilters.category !== 'all') {
                const categoryName = this.currentFilters.category.charAt(0).toUpperCase() + 
                                  this.currentFilters.category.slice(1);
                resultsCount.textContent = `Showing ${count} ${categoryName}'s new arrivals`;
            } else {
                resultsCount.textContent = `Showing ${count} new arrivals`;
            }
        }
    }
    
    updateActiveFilters() {
        // Update active category filter
        const categoryLinks = document.querySelectorAll('.filter-link');
        categoryLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            if (this.currentFilters.category === 'all' && href === 'new-arrivals.html') {
                link.classList.add('active');
            } else if (href.includes(`category=${this.currentFilters.category}`)) {
                link.classList.add('active');
            }
        });
    }
}

// Clear all filters function for new arrivals
function clearFilters() {
    // Reset price filter
    const priceRange = document.getElementById('price-range');
    if (priceRange) {
        priceRange.value = 500;
        document.getElementById('max-price').textContent = '$500';
    }
    
    // Reset size filters
    const sizeCheckboxes = document.querySelectorAll('.size-filter input[type="checkbox"]');
    sizeCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Reset sort
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.value = 'newest';
    }
    
    // Reset filters and reload products
    if (window.newArrivalsManager) {
        window.newArrivalsManager.currentFilters = {
            category: window.newArrivalsManager.getCategoryFromURL(),
            price: 500,
            sizes: [],
            sort: 'newest'
        };
        window.newArrivalsManager.currentPage = 1;
        window.newArrivalsManager.filterProducts();
    }
}

// Make viewProduct function globally available
function viewProduct(productId) {
    window.StyleHub.viewProduct ? window.StyleHub.viewProduct(productId) : 
    window.location.href = `product-detail.html?id=${productId}`;
}

// Initialize new arrivals manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize on new arrivals page
    if (document.querySelector('.page-title') && 
        document.querySelector('.page-title').textContent.includes('New Arrivals')) {
        window.newArrivalsManager = new NewArrivalsManager();
    }
});