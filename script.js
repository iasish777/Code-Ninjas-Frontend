// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');

// Toggle mobile menu
hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(245, 241, 235, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(58, 58, 58, 0.15)';
    } else {
        navbar.style.background = 'rgba(245, 241, 235, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(58, 58, 58, 0.1)';
    }
});

// Chat Modal Functionality
const startBtn = document.getElementById('startChat');
const modal = document.getElementById('chatModal');
const closeBtn = document.querySelector('.close');
const moodButtons = document.querySelectorAll('.mood-btn');

// Open modal
startBtn?.addEventListener('click', () => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add entrance animation
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
        modalContent.style.animation = 'slideIn 0.3s ease';
    }
});

// Close modal
closeBtn?.addEventListener('click', () => {
    closeModal();
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Mood selection
moodButtons.forEach(button => {
    button.addEventListener('click', () => {
        const mood = button.getAttribute('data-mood');
        handleMoodSelection(mood);
    });
});

function handleMoodSelection(mood) {
    // Add visual feedback
    const selectedBtn = document.querySelector(`[data-mood="${mood}"]`);
    if (selectedBtn) {
        selectedBtn.style.background = 'linear-gradient(135deg, #B3BFB1, #C48E77)';
        selectedBtn.style.color = '#F5F1EB';
        selectedBtn.style.transform = 'scale(0.95)';
    }
    
    // Simulate response based on mood
    setTimeout(() => {
        const response = getMoodResponse(mood);
        showChatResponse(response);
    }, 500);
}

function getMoodResponse(mood) {
    const responses = {
        happy: "That's wonderful to hear! I'm glad you're feeling happy today. Positive emotions are so important for our wellbeing. Would you like to share what's making you feel this way?",
        neutral: "It sounds like you're having an okay day. Sometimes that's perfectly normal - we don't always have to feel extreme emotions. Is there anything specific on your mind today?",
        sad: "I'm sorry you're not feeling your best today. Remember that it's completely okay to feel this way sometimes - these emotions are valid. I'm here to listen without judgment. What's been troubling you?",
        anxious: "I understand that anxiety can feel overwhelming. Take a deep breath with me for a moment. You're safe here in this space, and we can work through this together. What's making you feel anxious right now?"
    };
    return responses[mood] || "Thank you for sharing how you're feeling. I'm here to support you in any way I can. Every emotion is valid and deserves attention.";
}

function showChatResponse(response) {
    const modalBody = document.querySelector('.modal-body');
    if (!modalBody) return;
    
    modalBody.innerHTML = `
        <div class="chat-response">
            <div class="therapist-message">
                <div class="message-avatar">
                    <i class="fas fa-user-md"></i>
                </div>
                <div class="message-content">
                    <p>${response}</p>
                </div>
            </div>
            <div class="chat-input-section">
                <textarea id="userInput" placeholder="Share your thoughts here..." rows="4"></textarea>
                <div class="chat-actions">
                    <button class="secondary-btn" onclick="closeModal()">Maybe Later</button>
                    <button class="primary-btn" onclick="sendMessage()">Send Message</button>
                </div>
            </div>
        </div>
    `;
}

function sendMessage() {
    const userInput = document.getElementById('userInput');
    if (!userInput) return;
    
    const message = userInput.value.trim();
    
    if (message) {
        // Show user message
        showUserMessage(message);
        
        // Show typing indicator
        showTypingIndicator();
        
        // Generate AI response (simulated)
        setTimeout(() => {
            hideTypingIndicator();
            const response = generateAIResponse(message);
            showAIMessage(response);
        }, 1500);
        
        userInput.value = '';
    }
}

function showUserMessage(message) {
    const chatContainer = document.querySelector('.chat-response');
    if (!chatContainer) return;
    
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'user-message';
    userMessageDiv.innerHTML = `
        <div class="message-content user-content">
            <p>${escapeHtml(message)}</p>
        </div>
        <div class="message-avatar user-avatar">
            <i class="fas fa-user"></i>
        </div>
    `;
    
    const inputSection = document.querySelector('.chat-input-section');
    if (inputSection) {
        chatContainer.insertBefore(userMessageDiv, inputSection);
    }
}

function showTypingIndicator() {
    const chatContainer = document.querySelector('.chat-response');
    if (!chatContainer) return;
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'therapist-message typing-indicator';
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-user-md"></i>
        </div>
        <div class="message-content">
            <p><i class="fas fa-circle"></i> <i class="fas fa-circle"></i> <i class="fas fa-circle"></i></p>
        </div>
    `;
    
    // Add CSS for typing animation
    const style = document.createElement('style');
    style.textContent = `
        .typing-indicator .message-content i {
            animation: typing 1.4s infinite;
            opacity: 0;
        }
        .typing-indicator .message-content i:nth-child(1) { animation-delay: 0s; }
        .typing-indicator .message-content i:nth-child(2) { animation-delay: 0.2s; }
        .typing-indicator .message-content i:nth-child(3) { animation-delay: 0.4s; }
        
        @keyframes typing {
            0%, 60%, 100% { opacity: 0; }
            30% { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    const inputSection = document.querySelector('.chat-input-section');
    if (inputSection) {
        chatContainer.insertBefore(typingDiv, inputSection);
        inputSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function hideTypingIndicator() {
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function showAIMessage(response) {
    const chatContainer = document.querySelector('.chat-response');
    if (!chatContainer) return;
    
    const aiMessageDiv = document.createElement('div');
    aiMessageDiv.className = 'therapist-message';
    aiMessageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-user-md"></i>
        </div>
        <div class="message-content">
            <p>${response}</p>
        </div>
    `;
    
    const inputSection = document.querySelector('.chat-input-section');
    if (inputSection) {
        chatContainer.insertBefore(aiMessageDiv, inputSection);
        
        // Scroll to bottom with delay for animation
        setTimeout(() => {
            inputSection.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }
}

function generateAIResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Mental health supportive responses
    if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('worried')) {
        return "I hear that you're feeling anxious. Anxiety is a very common experience, and acknowledging these feelings is an important first step. Try taking slow, deep breaths - in through your nose for 4 counts, hold for 4, and out through your mouth for 6. What specifically is causing you to feel this way today?";
    }
    
    if (lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('down') || lowerMessage.includes('low')) {
        return "I'm sorry you're feeling sad right now. These feelings are completely valid, and it's okay to experience them. Sometimes talking about what's bothering us can help lighten the emotional load. Would you feel comfortable sharing what's been weighing on your mind lately?";
    }
    
    if (lowerMessage.includes('stress') || lowerMessage.includes('overwhelmed') || lowerMessage.includes('pressure')) {
        return "Feeling stressed or overwhelmed can be really challenging, but remember that you're stronger and more resilient than you might feel right now. Let's try to break down what's causing this stress into smaller, more manageable pieces. What are the main things that feel overwhelming to you today?";
    }
    
    if (lowerMessage.includes('happy') || lowerMessage.includes('good') || lowerMessage.includes('great') || lowerMessage.includes('excited')) {
        return "I'm so glad to hear you're feeling positive! It's wonderful when we can appreciate and acknowledge the good moments in our lives. These positive feelings are just as important to talk about as difficult ones. What's contributing to these happy feelings today?";
    }
    
    if (lowerMessage.includes('sleep') || lowerMessage.includes('tired') || lowerMessage.includes('insomnia') || lowerMessage.includes('exhausted')) {
        return "Sleep is incredibly important for our mental and physical health. Are you having trouble falling asleep, staying asleep, or are you feeling tired even after sleeping? Let's talk about what might be affecting your rest and some strategies that might help.";
    }
    
    if (lowerMessage.includes('lonely') || lowerMessage.includes('alone') || lowerMessage.includes('isolated')) {
        return "Feeling lonely can be really painful, and I want you to know that reaching out here shows strength. Even when we feel alone, we're more connected than we might realize. You're taking a positive step by talking about these feelings. What's making you feel most isolated right now?";
    }
    
    if (lowerMessage.includes('angry') || lowerMessage.includes('frustrated') || lowerMessage.includes('mad')) {
        return "Anger and frustration are natural emotions, and it's okay to feel them. Sometimes anger can be a sign that something important to us isn't being heard or respected. Let's explore what's behind these feelings. What situation or experience has triggered this anger for you?";
    }
    
    // Default supportive response
    const defaultResponses = [
        "Thank you for sharing that with me. I can hear that this is important to you, and your feelings matter. Can you tell me more about how this is affecting your daily life?",
        "I appreciate you opening up about this. It takes courage to share our thoughts and feelings. What would be most helpful for you to explore about this topic right now?",
        "Your experience sounds meaningful, and I want to understand it better. How long have you been dealing with this, and what has it been like for you?",
        "I'm here to listen and support you through this. Sometimes it helps to talk through our thoughts and feelings with someone who cares. What aspect of this feels most challenging for you?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Helper function to escape HTML
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize scroll animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.project-card, .feature-card, .team-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
    
    // Add floating animation to feature items
    document.querySelectorAll('.feature-item').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
        item.classList.add('float-animation');
    });
});

// Add typing effect to hero text
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }
    typing();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 500);
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // ESC to close modal
    if (e.key === 'Escape' && modal && modal.style.display === 'block') {
        closeModal();
    }
    
    // Enter to send message in chat (with Ctrl+Enter or just Enter)
    if ((e.key === 'Enter' && (e.ctrlKey || e.metaKey)) || 
        (e.key === 'Enter' && !e.shiftKey && document.getElementById('userInput') === document.activeElement)) {
        e.preventDefault();
        sendMessage();
    }
});

// Add loading animation
window.addEventListener('load', () => {
    // Remove any existing loader
    const existingLoader = document.getElementById('page-loader');
    if (existingLoader) {
        existingLoader.remove();
        return;
    }
    
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #D9D2C9, #F5F1EB);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 1;
        transition: opacity 0.5s ease;
    `;
    
    loader.innerHTML = `
        <div style="text-align: center;">
            <div class="spinner"></div>
            <p style="color: #3A3A3A; font-weight: 500;">Loading MuMind...</p>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 1500);
});

// Accessibility improvements
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // You could add user-friendly error handling here
});

// Performance optimization - lazy load images if any are added
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));