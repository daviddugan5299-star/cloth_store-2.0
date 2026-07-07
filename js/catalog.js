// Catalog Page JavaScript
class CatalogManager {
    constructor() {
        this.currentCategory = this.getCategoryFromURL();
        this.currentSubcategory = this.getSubcategoryFromURL();
        this.currentFilters = {
            price: 500,
            sizes: [],
            colors: [],
            sort: 'default'
        };
        this.currentPage = 1;
        this.itemsPerPage = 12;
        this.filteredProducts = [];
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadProducts();
        this.updateActiveFilters();
    }
    
    getCategoryFromURL() {
        const path = window.location.pathname;
        if (path.includes('men.html')) return 'men';
        if (path.includes('women.html')) return 'women';
        if (path.includes('kids.html')) return 'kids';
        return 'all';
    }
    
    getSubcategoryFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('category');
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
        
        // Color filters
        const colorCheckboxes = document.querySelectorAll('.color-filter input[type="checkbox"]');
        colorCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const color = e.target.value;
                if (e.target.checked) {
                    this.currentFilters.colors.push(color);
                } else {
                    this.currentFilters.colors = this.currentFilters.colors.filter(c => c !== color);
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
        
        // Mobile filters toggle
        this.setupMobileFilters();
    }
    
    setupMobileFilters() {
        // Add mobile filters toggle button
        const productsContainer = document.querySelector('.products-container');
        const filtersButton = document.createElement('button');
        filtersButton.className = 'mobile-filters-toggle';
        filtersButton.innerHTML = '<i class="fas fa-filter"></i> Filters';
        filtersButton.addEventListener('click', this.toggleMobileFilters.bind(this));
        
        productsContainer.insertBefore(filtersButton, productsContainer.firstChild);
        
        // Add close button to filters sidebar for mobile
        const sidebar = document.querySelector('.filters-sidebar');
        const closeButton = document.createElement('button');
        closeButton.className = 'close-filters-btn';
        closeButton.innerHTML = '<i class="fas fa-times"></i>';
        closeButton.style.cssText = `
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            display: none;
        `;
        
        sidebar.insertBefore(closeButton, sidebar.firstChild);
        closeButton.addEventListener('click', this.closeMobileFilters.bind(this));
        
        // Show close button on mobile
        if (window.innerWidth <= 768) {
            closeButton.style.display = 'block';
        }
        
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                closeButton.style.display = 'block';
            } else {
                closeButton.style.display = 'none';
                this.closeMobileFilters();
            }
        });
    }
    
    toggleMobileFilters() {
        const sidebar = document.querySelector('.filters-sidebar');
        const overlay = document.createElement('div');
        overlay.className = 'filters-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 1999;
        `;
        
        sidebar.classList.add('open');
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';
        
        overlay.addEventListener('click', this.closeMobileFilters.bind(this));
    }
    
    closeMobileFilters() {
        const sidebar = document.querySelector('.filters-sidebar');
        const overlay = document.querySelector('.filters-overlay');
        
        sidebar.classList.remove('open');
        if (overlay) {
            document.body.removeChild(overlay);
        }
        document.body.style.overflow = '';
    }
    
    loadProducts() {
        const productsGrid = document.getElementById('products-grid');
        
        // Show loading state
        productsGrid.innerHTML = `
            <div class="loading-products" style="grid-column: 1 / -1;">
                <div class="loading-spinner"></div>
                <p>Loading products...</p>
            </div>
        `;
        
        // Get products based on category
        let products = [];
        if (this.currentCategory === 'all') {
            products = window.StyleHub.products;
        } else {
            products = window.StyleHub.getProductsByCategory(this.currentCategory);
        }
        
        // Filter by subcategory if specified
        if (this.currentSubcategory) {
            products = products.filter(product => 
                product.subcategory === this.currentSubcategory
            );
        }
        
        this.filteredProducts = products;
        
        // Simulate loading delay
        setTimeout(() => {
            this.filterProducts();
        }, 500);
    }
    
    filterProducts() {
        let products = [...this.filteredProducts];
        
        // Apply price filter
        products = products.filter(product => product.price <= this.currentFilters.price);
        
        // Apply size filter
        if (this.currentFilters.sizes.length > 0) {
            products = products.filter(product => 
                product.sizes.some(size => this.currentFilters.sizes.includes(size))
            );
        }
        
        // Apply color filter
        if (this.currentFilters.colors.length > 0) {
            products = products.filter(product => 
                product.colors.some(color => 
                    this.currentFilters.colors.some(filterColor => 
                        color.toLowerCase().includes(filterColor)
                    )
                )
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
                products.sort((a, b) => {
                    if (a.newArrival && !b.newArrival) return -1;
                    if (!a.newArrival && b.newArrival) return 1;
                    return 0;
                });
                break;
            default:
                // Keep original order
                break;
        }
    }
    
    renderProducts(products) {
        const productsGrid = document.getElementById('products-grid');
        
        if (products.length === 0) {
            productsGrid.innerHTML = `
                <div class="empty-products" style="grid-column: 1 / -1;">
                    <i class="fas fa-search"></i>
                    <h3>No products found</h3>
                    <p>Try adjusting your filters to see more results.</p>
                    <button class="btn btn-primary" onclick="clearFilters()">Clear All Filters</button>
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
            const productCard = this.createEnhancedProductCard(product);
            productsGrid.appendChild(productCard);
        });
        
        // Render pagination if needed
        this.renderPagination(products.length);
    }
    
    createEnhancedProductCard(product) {
        const card = window.StyleHub.createProductCard(product);
        
        // Add quick view overlay
        const productImage = card.querySelector('.product-image');
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
            <button onclick="catalogManager.goToPage(${this.currentPage - 1})" 
                    ${this.currentPage === 1 ? 'disabled' : ''}>
                <i class="fas fa-chevron-left"></i>
            </button>
        `;
        
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= this.currentPage - 2 && i <= this.currentPage + 2)) {
                paginationHTML += `
                    <button onclick="catalogManager.goToPage(${i})" 
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
            <button onclick="catalogManager.goToPage(${this.currentPage + 1})" 
                    ${this.currentPage === totalPages ? 'disabled' : ''}>
                <i class="fas fa-chevron-right"></i>
            </button>
        `;
        
        paginationContainer.innerHTML = paginationHTML;
    }
    
    goToPage(page) {
        const totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
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
            const total = this.filteredProducts.length;
            resultsCount.textContent = `Showing ${count} of ${total} products`;
        }
    }
    
    updateActiveFilters() {
        // Update active category filter
        const categoryLinks = document.querySelectorAll('.filter-link');
        categoryLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            if (this.currentSubcategory) {
                if (href.includes(`category=${this.currentSubcategory}`)) {
                    link.classList.add('active');
                }
            } else if (href === `${this.currentCategory}.html`) {
                link.classList.add('active');
            }
        });
    }
}

// Clear all filters function
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
    
    // Reset color filters
    const colorCheckboxes = document.querySelectorAll('.color-filter input[type="checkbox"]');
    colorCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Reset sort
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.value = 'default';
    }
    
    // Reset filters and reload products
    if (window.catalogManager) {
        window.catalogManager.currentFilters = {
            price: 500,
            sizes: [],
            colors: [],
            sort: 'default'
        };
        window.catalogManager.currentPage = 1;
        window.catalogManager.filterProducts();
    }
}

// Initialize catalog manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize on catalog pages
    if (document.querySelector('.catalog-section')) {
        window.catalogManager = new CatalogManager();
    }
});

// Make viewProduct function globally available
function viewProduct(productId) {
    window.StyleHub.viewProduct ? window.StyleHub.viewProduct(productId) : 
    window.location.href = `product-detail.html?id=${productId}`;
}