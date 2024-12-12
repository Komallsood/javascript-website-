const menuItems = [
    {
        name: "Classic Burger",
        price: "$12.99",
        category: "Main Course",
        image: "https://source.unsplash.com/500x400/?burger",
        description: "Juicy beef patty with fresh vegetables"
    },
    {
        name: "Margherita Pizza",
        price: "$14.99",
        category: "Main Course",
        image: "https://source.unsplash.com/500x400/?pizza",
        description: "Traditional Italian pizza with tomatoes and mozzarella"
    },
    {
        name: "Caesar Salad",
        price: "$8.99",
        category: "Starters",
        image: "https://source.unsplash.com/500x400/?salad",
        description: "Fresh romaine lettuce with Caesar dressing"
    },
    {
        name: "Chocolate Cake",
        price: "$6.99",
        category: "Desserts",
        image: "https://source.unsplash.com/500x400/?chocolate-cake",
        description: "Rich chocolate cake with frosting"
    },
    {
        name: "Pasta Carbonara",
        price: "$13.99",
        category: "Main Course",
        image: "https://source.unsplash.com/500x400/?pasta",
        description: "Creamy pasta with bacon and parmesan"
    },
    {
        name: "Tiramisu",
        price: "$7.99",
        category: "Desserts",
        image: "https://source.unsplash.com/500x400/?tiramisu",
        description: "Classic Italian coffee-flavored dessert"
    }
];

// Chatbot class
class RestaurantChatbot {
    constructor() {
        this.responses = {
            menu: "Our popular items include Classic Burger ($12.99), Margherita Pizza ($14.99), Caesar Salad ($8.99), and Chocolate Cake ($6.99). Would you like to know more about any specific item?",
            hours: "We're open Monday to Friday 9 AM - 10 PM, and weekends 10 AM - 11 PM.",
            location: "We're located at 123 Restaurant Street, Foodville, FC 12345. Free parking available!",
            reservation: "To make a reservation, please call us at (555) 123-4567 or book online through our website.",
            delivery: "Yes, we offer delivery! Minimum order $20, delivery time 30-45 minutes. You can order through our website or call us.",
            payment: "We accept all major credit cards, cash, and digital payments including Apple Pay and Google Pay.",
            default: "I'm not sure about that. Would you like to know about our menu, hours, location, reservations, or delivery service?"
        };
    }

    processInput(input) {
        input = input.toLowerCase();
        
        // Check for greetings
        if (input.match(/^(hi|hello|hey|greetings)/)) {
            return "Hello! How can I assist you today?";
        }
        
        // Check for thanks
        if (input.match(/thank|thanks/)) {
            return "You're welcome! Is there anything else I can help you with?";
        }
        
        // Check for specific queries
        if (input.includes("menu") || input.includes("food") || input.includes("eat")) {
            return this.responses.menu;
        }
        if (input.includes("hour") || input.includes("open") || input.includes("close")) {
            return this.responses.hours;
        }
        if (input.includes("location") || input.includes("address") || input.includes("where")) {
            return this.responses.location;
        }
        if (input.includes("reservation") || input.includes("book") || input.includes("table")) {
            return this.responses.reservation;
        }
        if (input.includes("delivery") || input.includes("deliver") || input.includes("takeout")) {
            return this.responses.delivery;
        }
        if (input.includes("pay") || input.includes("card") || input.includes("cash")) {
            return this.responses.payment;
        }
        
        return this.responses.default;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize chatbot
    const chatbot = new RestaurantChatbot();
    const chatMessages = document.querySelector('.chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-message');
    const toggleChat = document.getElementById('toggle-chat');
    const chatBody = document.querySelector('.chat-body');

    // Display menu items
    function displayMenu(category = 'all') {
        const menuContainer = document.querySelector('.menu-container');
        menuContainer.innerHTML = '';
        
        menuItems.forEach(item => {
            if (category === 'all' || item.category === category) {
                const menuItem = document.createElement('div');
                menuItem.className = 'menu-item';
                menuItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="menu-item-content">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                        <p class="price">${item.price}</p>
                        <p class="category">${item.category}</p>
                    </div>
                `;
                menuContainer.appendChild(menuItem);
            }
        });
    }

    // Menu filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            displayMenu(button.dataset.category);
        });
    });

    // Chatbot functions
    function addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;

        addMessage(message, 'user');
        userInput.value = '';

        setTimeout(() => {
            const response = chatbot.processInput(message);
            addMessage(response, 'bot');
        }, 500);
    }

    // Event listeners
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    toggleChat.addEventListener('click', () => {
        if (chatBody.style.display === 'none') {
            chatBody.style.display = 'flex';
            toggleChat.textContent = '−';
        } else {
            chatBody.style.display = 'none';
            toggleChat.textContent = '+';
        }
    });

    // Handle registration form
    const registrationForm = document.getElementById('registration-form');
    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Registration successful! We will contact you soon.');
        registrationForm.reset();
    });

    // Initial menu display
    displayMenu();
});