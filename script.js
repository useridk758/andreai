const circle = document.getElementById('andre-circle');
const status = document.getElementById('status-text');

// --- ANDRE'S KNOWLEDGE BANK ---
const knowledge = {
    "hello": "Hey there! I'm Andre. Ready to help you with Axiom.",
    "who made you": "I was created by Dunko, the lead developer here.",
    "what is axiom": "Axiom is your personalized web platform for shortcuts and apps.",
    "time": `The current time is ${new Date().toLocaleTimeString()}.`,
    "favorite game": "I don't play games, but I hear Dunko is making some cool ones on Roblox.",
    "default": "I'm not sure about that yet, but I'm learning every day."
};

// --- VOICE SETTINGS ---
const speech = window.speechSynthesis;
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = false;
recognition.lang = 'en-US';

// Function to make Andre speak
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Choose a high-quality voice (usually "Google US English" or "Samantha")
    const voices = speech.getVoices();
    utterance.voice = voices.find(v => v.name.includes("Google")) || voices[0];
    utterance.pitch = 1.1; // Makes him sound a bit more "AI/Modern"
    utterance.rate = 1.0;

    utterance.onstart = () => {
        circle.className = 'circle speaking';
        status.innerText = "Andre is speaking...";
    };

    utterance.onend = () => {
        circle.className = 'circle idle';
        status.innerText = "Tap to talk";
    };

    speech.speak(utterance);
}

// --- INTERACTION LOGIC ---
circle.addEventListener('click', () => {
    recognition.start();
    circle.className = 'circle listening';
    status.innerText = "Listening...";
});

recognition.onresult = (event) => {
    const userText = event.results[0][0].transcript.toLowerCase();
    console.log("You said:", userText);

    // Find the best answer
    let response = knowledge["default"];
    for (let key in knowledge) {
        if (userText.includes(key)) {
            response = knowledge[key];
            break;
        }
    }

    speak(response);
};

recognition.onerror = () => {
    circle.className = 'circle idle';
    status.innerText = "Didn't catch that. Try again.";
};
