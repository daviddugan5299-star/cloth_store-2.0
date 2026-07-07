// Contact Page JavaScript

class ContactManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupFormValidation();
    }
    
    setupEventListeners() {
        // Contact form submission
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', this.handleFormSubmit.bind(this));
        }
        
        // Real-time form validation
        const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', this.validateField.bind(this, input));
            input.addEventListener('input', this.clearFieldError.bind(this, input));
        });
    }
    
    setupFormValidation() {
        // Add required field indicators
        const requiredFields = document.querySelectorAll('.contact-form input[required], .contact-form select[required], .contact-form textarea[required]');
        requiredFields.forEach(field => {
            const label = field.parentElement.querySelector('label');
            if (label && !label.textContent.includes('*')) {
                label.innerHTML = label.innerHTML.replace(/\s*$/, ' *');
            }
        });
    }
    
    validateField(field) {
        const value = field.value.trim();
        const fieldType = field.type;
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';
        
        // Remove existing error
        this.clearFieldError(field);
        
        // Check if required field is empty
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required.';
        }
        // Validate email
        else if (fieldType === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address.';
            }
        }
        // Validate phone
        else if (fieldType === 'tel' && value) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(value) || value.length < 10) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number.';
            }
        }
        // Validate select
        else if (field.tagName === 'SELECT' && field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Please select an option.';
        }
        
        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }
        
        return isValid;
    }
    
    showFieldError(field, message) {
        field.classList.add('error');
        
        // Remove existing error message
        const existingError = field.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentElement.appendChild(errorDiv);
    }
    
    clearFieldError(field) {
        field.classList.remove('error');
        const errorMessage = field.parentElement.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
    
    validateForm() {
        const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
        let isFormValid = true;
        
        formInputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });
        
        return isFormValid;
    }
    
    handleFormSubmit(e) {
        e.preventDefault();
        
        // Validate form
        if (!this.validateForm()) {
            this.showNotification('Please correct the errors below.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // Show success message
            this.showSuccessMessage();
            
            // Reset form
            e.target.reset();
            
            // Restore button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Show notification
            this.showNotification('Thank you! Your message has been sent successfully.', 'success');
            
            // Scroll to top of form
            document.querySelector('.contact-form-section').scrollIntoView({
                behavior: 'smooth'
            });
            
        }, 2000);
    }
    
    showSuccessMessage() {
        // Remove existing success message
        const existingSuccess = document.querySelector('.success-message');
        if (existingSuccess) {
            existingSuccess.remove();
        }
        
        // Create success message
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <strong>Message Sent Successfully!</strong>
            <p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
        `;
        
        const formSection = document.querySelector('.contact-form-section');
        formSection.insertBefore(successDiv, formSection.firstChild);
        
        // Auto remove after 10 seconds
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.remove();
            }
        }, 10000);
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 3000;
            color: white;
            background-color: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'exclamation-triangle' : 'info'}"></i>
            <span style="margin-left: 0.5rem;">${message}</span>
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

// FAQ Toggle Function
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const isActive = element.classList.contains('active');
    
    // Close all other FAQs
    document.querySelectorAll('.faq-question.active').forEach(q => {
        if (q !== element) {
            q.classList.remove('active');
            q.parentElement.querySelector('.faq-answer').classList.remove('active');
        }
    });
    
    // Toggle current FAQ
    if (isActive) {
        element.classList.remove('active');
        answer.classList.remove('active');
    } else {
        element.classList.add('active');
        answer.classList.add('active');
    }
}

// Store Locator Functions
function searchStores() {
    const searchInput = document.getElementById('locationSearch');
    const query = searchInput.value.trim();
    
    if (!query) {
        showNotification('Please enter a city or ZIP code to search.', 'error');
        return;
    }
    
    // Simulate store search
    showNotification(`Searching for stores near "${query}"...`, 'info');
    
    // In a real implementation, you would make an API call here
    setTimeout(() => {
        showNotification('Found 3 stores near you! Results shown below.', 'success');
        
        // Scroll to results
        document.querySelector('.stores-list').scrollIntoView({
            behavior: 'smooth'
        });
    }, 1500);
}

function getDirections(address) {
    // Open Google Maps with directions
    const encodedAddress = encodeURIComponent(address);
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
    window.open(mapsUrl, '_blank');
}

function callStore(phoneNumber) {
    // Create tel link
    window.location.href = `tel:${phoneNumber}`;
}

function openLiveChat() {
    // Simulate opening live chat
    showNotification('Live chat feature coming soon! Please use our contact form or call us directly.', 'info');
}

// Utility function for notifications
function showNotification(message, type = 'info') {
    if (window.contactManager) {
        window.contactManager.showNotification(message, type);
    } else {
        // Fallback alert
        alert(message);
    }
}

// Initialize contact manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize on contact page
    if (document.querySelector('.contact-form')) {
        window.contactManager = new ContactManager();
    }
});