/**
 * Utility Functions Module
 * Reusable helper functions for DOM, API, Storage, and Validation
 */

// ============================================
// DOM UTILITIES
// ============================================

const DOMUtils = {
    /**
     * Get element by ID
     */
    byId(id) {
        return document.getElementById(id);
    },

    /**
     * Get elements by class name
     */
    byClass(className) {
        return document.querySelectorAll(`.${className}`);
    },

    /**
     * Get element by selector
     */
    select(selector) {
        return document.querySelector(selector);
    },

    /**
     * Create element with optional attributes
     */
    create(tag, attributes = {}, content = '') {
        const element = document.createElement(tag);
        Object.keys(attributes).forEach(key => {
            element.setAttribute(key, attributes[key]);
        });
        if (content) element.innerHTML = content;
        return element;
    },

    /**
     * Add class to element
     */
    addClass(element, className) {
        element?.classList.add(className);
    },

    /**
     * Remove class from element
     */
    removeClass(element, className) {
        element?.classList.remove(className);
    },

    /**
     * Toggle class on element
     */
    toggleClass(element, className) {
        element?.classList.toggle(className);
    },

    /**
     * Check if element has class
     */
    hasClass(element, className) {
        return element?.classList.contains(className);
    },

    /**
     * Show element
     */
    show(element) {
        if (element) element.style.display = '';
    },

    /**
     * Hide element
     */
    hide(element) {
        if (element) element.style.display = 'none';
    },

    /**
     * Set text content
     */
    setText(element, text) {
        if (element) element.textContent = text;
    },

    /**
     * Set HTML content
     */
    setHTML(element, html) {
        if (element) element.innerHTML = html;
    },
};

// ============================================
// API UTILITIES
// ============================================

const APIUtils = {
    /**
     * Make GET request
     */
    async get(url, options = {}) {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', ...options.headers },
                ...options,
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('GET Error:', error);
            throw error;
        }
    },

    /**
     * Make POST request
     */
    async post(url, data, options = {}) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...options.headers },
                body: JSON.stringify(data),
                ...options,
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('POST Error:', error);
            throw error;
        }
    },

    /**
     * Make PUT request
     */
    async put(url, data, options = {}) {
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', ...options.headers },
                body: JSON.stringify(data),
                ...options,
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('PUT Error:', error);
            throw error;
        }
    },

    /**
     * Make DELETE request
     */
    async delete(url, options = {}) {
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', ...options.headers },
                ...options,
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('DELETE Error:', error);
            throw error;
        }
    },
};

// ============================================
// LOCAL STORAGE UTILITIES
// ============================================

const StorageUtils = {
    /**
     * Set item in localStorage
     */
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Storage Set Error:', error);
        }
    },

    /**
     * Get item from localStorage
     */
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Storage Get Error:', error);
            return defaultValue;
        }
    },

    /**
     * Remove item from localStorage
     */
    remove(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Storage Remove Error:', error);
        }
    },

    /**
     * Clear all localStorage
     */
    clear() {
        try {
            localStorage.clear();
        } catch (error) {
            console.error('Storage Clear Error:', error);
        }
    },
};

// ============================================
// VALIDATION UTILITIES
// ============================================

const ValidationUtils = {
    /**
     * Validate email
     */
    isEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    /**
     * Validate password strength
     */
    isStrongPassword(password) {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*]/.test(password);
        const isLongEnough = password.length >= 8;
        return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isLongEnough;
    },

    /**
     * Validate phone number
     */
    isPhoneNumber(phone) {
        const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        return phoneRegex.test(phone);
    },

    /**
     * Validate URL
     */
    isURL(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    },

    /**
     * Check if string is empty or whitespace
     */
    isEmpty(str) {
        return !str || str.trim().length === 0;
    },

    /**
     * Check if required fields are filled
     */
    validateRequired(fields) {
        for (const [fieldName, fieldValue] of Object.entries(fields)) {
            if (this.isEmpty(fieldValue)) {
                return { valid: false, error: `${fieldName} is required` };
            }
        }
        return { valid: true };
    },
};

// ============================================
// NOTIFICATION UTILITIES
// ============================================

const NotificationUtils = {
    /**
     * Show toast notification
     */
    toast(message, type = 'info', duration = 3000) {
        const toast = DOMUtils.create('div', 
            { class: `toast ${type}`, role: 'alert' },
            message
        );
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            DOMUtils.addClass(toast, 'hiding');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    },

    /**
     * Show success notification
     */
    success(message, duration = 3000) {
        this.toast(message, 'success', duration);
    },

    /**
     * Show error notification
     */
    error(message, duration = 3000) {
        this.toast(message, 'error', duration);
    },

    /**
     * Show info notification
     */
    info(message, duration = 3000) {
        this.toast(message, 'info', duration);
    },
};

// ============================================
// EVENT UTILITIES
// ============================================

const EventUtils = {
    /**
     * Add event listener
     */
    on(element, eventType, handler) {
        element?.addEventListener(eventType, handler);
    },

    /**
     * Remove event listener
     */
    off(element, eventType, handler) {
        element?.removeEventListener(eventType, handler);
    },

    /**
     * Trigger custom event
     */
    trigger(element, eventName, detail = {}) {
        const event = new CustomEvent(eventName, { detail });
        element?.dispatchEvent(event);
    },

    /**
     * Debounce function
     */
    debounce(func, delay = 300) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    },

    /**
     * Throttle function
     */
    throttle(func, limit = 300) {
        let inThrottle;
        return function (...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
};

// Export utilities
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        DOMUtils,
        APIUtils,
        StorageUtils,
        ValidationUtils,
        NotificationUtils,
        EventUtils,
    };
}
