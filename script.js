const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message');
    msgDiv.classList.add(sender === 'user' ? 'user-message' : 'ai-message');
    msgDiv.innerText = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function handleResponse(text) {
    // Simple logic for Andre's personality
    let response = "That's interesting! Tell me more.";
    
    if (text.toLowerCase().includes("hello")) {
        response = "Hey there! I'm Andre, your personal assistant.";
    } else if (text.toLowerCase().includes("who made you")) {
        response = "I was created by Dunko.";
    }

    setTimeout(() => {
        addMessage(response, 'ai');
    }, 600);
}

sendBtn.addEventListener('click', () => {
    const text = userInput.value;
    if (text.trim() !== "") {
        addMessage(text, 'user');
        userInput.value = "";
        handleResponse(text);
    }
});

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendBtn.click();
});
