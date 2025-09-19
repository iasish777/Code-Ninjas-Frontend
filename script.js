// Configuration - Update this URL to match your Python backend
const PYTHON_BACKEND_URL = 'http://localhost:5000';

// DOM Elements
const startBtn = document.getElementById('startChat');

// Initialize application
document.addEventListener('DOMContentLoaded', initializeApp);

function initializeApp() {
    setupEventListeners();
    setupSmoothScrolling();
    console.log('MuMind initialized successfully');
}

// Event Listeners Setup
function setupEventListeners() {
    // Chat button - redirect to Python backend
    startBtn?.addEventListener('click', redirectToPythonBackend);
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', handleSmoothScroll);
    });
}

// Redirect to Python Backend
function redirectToPythonBackend() {
    // Try to open in the same window first
    window.location.href = PYTHON_BACKEND_URL;
    
    // Fallback: if that doesn't work, try opening in new window
    setTimeout(() => {
        const newWindow = window.open(PYTHON_BACKEND_URL, '_blank');
        if (!newWindow) {
            // If popup is blocked, show alert
            alert(`Please visit ${PYTHON_BACKEND_URL} to start chatting with MuMind`);
        }
    }, 100);
}

// Smooth Scrolling
function setupSmoothScrolling() {
    document.documentElement.style.scrollBehavior = 'smooth';
}

function handleSmoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Configuration update function (for easy backend URL changes)
window.updateBackendURL = function(newURL) {
    PYTHON_BACKEND_URL = newURL;
    console.log('Backend URL updated to:', PYTHON_BACKEND_URL);
};

// Log the current configuration
console.log('MuMind ready. Python Backend URL:', PYTHON_BACKEND_URL);
console.log('To update backend URL, run: updateBackendURL("your-new-url")');

// Error handling
window.addEventListener('error', (event) => {
    console.error('JavaScript error:', event.error);
});
