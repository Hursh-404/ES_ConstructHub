/**
 * Configuration Object
 * Centralized settings for ConstructHub Frontend
 */

const CONFIG = {
    // API Configuration
    API: {
        BASE_URL: 'http://localhost:3000/api',
        TIMEOUT: 10000,
    },

    // Color Theme
    COLORS: {
        PRIMARY: '#E8500A',
        SECONDARY: '#FF6A2A',
        DARK: '#111111',
        DARK_900: '#0D0D0D',
        DARK_800: '#1a1a1a',
        DARK_700: '#2a2a2a',
        BACKGROUND: '#FAFAF8',
        BACKGROUND_ALT: '#F5F5F3',
    },

    // Animation Durations (ms)
    ANIMATIONS: {
        FAST: 200,
        NORMAL: 300,
        SLOW: 500,
        VERY_SLOW: 1000,
    },

    // Chat Widget
    CHAT: {
        ENABLED: true,
        WELCOME_MESSAGE: 'Welcome to ConstructHub! How can we help?',
    },

    // Dark Mode
    DARK_MODE: {
        STORAGE_KEY: 'constructhub_dark_mode',
        DEFAULT: false,
    },

    // Local Storage Keys
    STORAGE: {
        USER: 'constructhub_user',
        TOKEN: 'constructhub_token',
        PREFERENCES: 'constructhub_preferences',
    },

    // Environment
    ENVIRONMENT: 'development', // 'development', 'staging', 'production'
    DEBUG: true,
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
