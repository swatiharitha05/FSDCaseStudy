// script.js
const messagePage = document.getElementById('messagePage');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

// Predefined chatbot responses
const chatbotResponses = [
  { keywords: ["hello", "hi", "hey"], response: "Hi there! How can I assist you today?" },
  { keywords: ["how are you", "how's it going"], response: "I'm just a bot, but I'm here to help! How about you?" },
  { keywords: ["time"], response: () => `The current time is ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.` },
  { keywords: ["date"], response: () => `Today's date is ${new Date().toLocaleDateString()}.` },
  { keywords: ["help"], response: "Sure! Please tell me what you need assistance with." },
  { keywords: ["your name"], response: "I'm your friendly chatbot! I don't have a name yet, but you can call me Bot." },
  { keywords: ["bye", "goodbye"], response: "Goodbye! Have a great day!" },
];

// Fallback response
const fallbackResponse = "I'm sorry, I didn't understand that. Could you please rephrase?";

// Function to send a user message
function sendMessage() {
  const messageText = messageInput.value.trim();
  if (messageText) {
    // Add user message to chat
    addMessageToChat(messageText, 'outgoing');
    messageInput.value = ''; // Clear input

    // Generate chatbot response
    setTimeout(() => {
      const response = generateChatbotResponse(messageText);
      addMessageToChat(response, 'incoming');
    }, 1000); // Simulate a slight delay
  }
}

// Function to add a message to the chat
function addMessageToChat(text, type) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${type}`;

  const contentHTML =
    type === 'incoming'
      ? `<img src="avatar.jpeg" alt="Avatar">
         <div class="message-content">
           <p>${text}</p>
           <span class="time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
         </div>`
      : `<div class="message-content">
           <p>${text}</p>
           <span class="time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
         </div>`;

  messageDiv.innerHTML = contentHTML;
  messagePage.appendChild(messageDiv);
  messagePage.scrollTop = messagePage.scrollHeight; // Scroll to the latest message
}

// Function to generate a chatbot response
function generateChatbotResponse(userMessage) {
  const normalizedMessage = userMessage.toLowerCase();

  // Match user message with predefined keywords
  for (const item of chatbotResponses) {
    if (item.keywords.some(keyword => normalizedMessage.includes(keyword))) {
      return typeof item.response === "function" ? item.response() : item.response;
    }
  }

  // Return fallback response if no match is found
  return fallbackResponse;
}

// Event listener for the send button
sendButton.addEventListener('click', sendMessage);

// Event listener for pressing Enter key
messageInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});
