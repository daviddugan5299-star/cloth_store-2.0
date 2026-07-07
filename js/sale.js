// Sale Page JavaScript

class SaleManager {
    constructor() {
        this.saleProducts = [];
        this.currentFilter = 'all';
        this.countdownDate = new Date();
        this.countdownDate.setDate(this.countdownDate.getDate() + 7); // Sale ends in 7 days
        
        this.init();
    }
    
    init() {
        this.loadSaleProducts();
        this.startCountdown();
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Newsletter form
        const saleNewsletterForm = document.getElementById('sale-newsletter-form');
        if (saleNewsletterForm) {
            saleNewsletterForm.addEventListener('submit', this.handleNewsletterSubmit.bind(this));
        }
    }
    
    loadSaleProducts() {
        // Get all products with sale flag
        this.saleProducts = window.StyleHub.getSaleProducts();
        this.renderSaleProducts();
    }
    
    renderSaleProducts() {
        const saleProductsGrid = document.getElementById('sale-products-grid');
        if (!saleProductsGrid) return;
        
        let productsToShow = this.saleProducts;
        
        // Filter by category if not 'all'
        if (this.currentFilter !== 'all') {
            productsToShow = this.saleProducts.filter(product => 
                product.category === this.currentFilter
            );
        }
        
        saleProductsGrid.innerHTML = '';
        
        if (productsToShow.length === 0) {
            saleProductsGrid.innerHTML = `
                <div class="empty-products" style="grid-column: 1 / -1;">
                    <i class="fas fa-percentage"></i>
                    <h3>No sale items in this category</h3>
                    <p>Check back soon for more amazing deals!</p>
                </div>
            `;
            return;
        }
        
        productsToShow.forEach(product => {
            const productCard = this.createSaleProductCard(product);
            saleProductsGrid.appendChild(productCard);
        });
    }
    
    createSaleProductCard(product) {
        const card = window.StyleHub.createProductCard(product);
        
        // Add sale-specific styling
        card.classList.add('sale-product-card');
        
        // Calculate savings percentage
        if (product.originalPrice) {
            const savings = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
            const savingsBadge = document.createElement('div');
            savingsBadge.className = 'savings-badge';
            savingsBadge.textContent = `Save ${savings}%`;
            
            const productImage = card.querySelector('.product-image');
            productImage.appendChild(savingsBadge);
        }
        
        return card;
    }
    
    startCountdown() {
        this.updateCountdown();
        setInterval(() => {
            this.updateCountdown();
        }, 1000);
    }
    
    updateCountdown() {
        const now = new Date().getTime();
        const distance = this.countdownDate.getTime() - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update countdown display
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');
        
        if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
        if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
        if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
        if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
        
        // If countdown is finished
        if (distance < 0) {
            if (daysElement) daysElement.textContent = '00';
            if (hoursElement) hoursElement.textContent = '00';
            if (minutesElement) minutesElement.textContent = '00';
            if (secondsElement) secondsElement.textContent = '00';
            
            // Show sale ended message
            this.showSaleEndedMessage();
        }
    }
    
    showSaleEndedMessage() {
        const countdownTimer = document.getElementById('countdown-timer');
        if (countdownTimer) {
            countdownTimer.innerHTML = `
                <div class="sale-ended-message">
                    <h3>Sale Ended</h3>
                    <p>This sale has ended, but don't worry! Sign up for our newsletter to be notified of future sales.</p>
                </div>
            `;
        }
    }
    
    handleNewsletterSubmit(e) {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        
        // Simulate newsletter signup with discount
        this.showNotification('Welcome! Your 15% discount code is: WELCOME15', 'success');
        e.target.reset();
        
        // You could also show a modal with the discount code
        this.showDiscountModal();
    }
    
    showDiscountModal() {
        // Create modal overlay
        const overlay = document.createElement('div');
        overlay.className = 'discount-modal-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.8);
            z-index: 3000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        `;
        
        // Create modal content
        const modal = document.createElement('div');
        modal.className = 'discount-modal';
        modal.style.cssText = `
            background-color: white;
            border-radius: 12px;
            padding: 3rem;
            text-align: center;
            max-width: 500px;
            width: 100%;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        `;
        
        modal.innerHTML = `
            <div style="margin-bottom: 2rem;">
                <i class="fas fa-gift" style="font-size: 4rem; color: #dc3545; margin-bottom: 1rem;"></i>
                <h2 style="margin-bottom: 1rem; color: #000;">Welcome Gift!</h2>
                <p style="margin-bottom: 2rem; color: #666;">Thank you for subscribing! Here's your exclusive discount code:</p>
                <div style="background-color: #f8f9fa; padding: 1rem; border-radius: 8px; border: 2px dashed #dc3545; margin-bottom: 2rem;">
                    <div style="font-size: 2rem; font-weight: bold; color: #dc3545; font-family: 'Courier New', monospace;">WELCOME15</div>
                    <div style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;">15% off your next purchase</div>
                </div>
                <button onclick="this.closest('.discount-modal-overlay').remove()" class="btn btn-primary">Start Shopping</button>
            </div>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        // Close on overlay click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
            }
        });
        
        // Auto close after 10 seconds
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.remove();
            }
        }, 10000);
    }
    
    showNotification(message, type = 'info') {
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
            max-width: 300px;
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
        }, 5000);
    }
}

// Filter sale products by category
function filterSaleProducts(category) {
    // Update active filter button
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().includes(category) || 
            (category === 'all' && btn.textContent.toLowerCase().includes('all'))) {
            btn.classList.add('active');
        }
    });
    
    // Update current filter and re-render products
    if (window.saleManager) {
        window.saleManager.currentFilter = category;
        window.saleManager.renderSaleProducts();
    }
}

// Initialize sale manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize on sale page
    if (document.querySelector('.sale-hero')) {
        window.saleManager = new SaleManager();
    }
});

// Add smooth scrolling for sale CTA button
document.addEventListener('DOMContentLoaded', function() {
    const saleCTA = document.querySelector('a[href="#sale-products"]');
    if (saleCTA) {
        saleCTA.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.getElementById('sale-products');
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});