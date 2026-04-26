const circle = document.getElementById('andre-circle');
const status = document.getElementById('status-text');

const synth = window.speechSynthesis;
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'en-US';
recognition.interimResults = false;

// --- COMMAND & KNOWLEDGE ENGINE ---
const andreBrain = (input) => {
    const text = input.toLowerCase();

    // ACTION COMMANDS
    if (text.includes("mrbeast") || text.includes("mr beast")) {
        window.open("https://www.youtube.com/@MrBeast", "_blank");
        return "Opening Mr Beast's channel right now. Subscribe to him!";
    }
    if (text.includes("open roblox")) {
        window.open("https://www.roblox.com", "_blank");
        return "Launching Roblox. Time to build something great.";
    }
    if (text.includes("open youtube")) {
        window.open("https://www.youtube.com", "_blank");
        return "Opening YouTube for you.";
    }
    if (text.includes("google search")) {
        const search = text.replace("google search", "").trim();
        window.open(`https://www.google.com/search?q=${search}`, "_blank");
        return `Searching Google for ${search}.`;
    }

    // CONVERSATION COMMANDS
    if (text.includes("hello") || text.includes("hey")) return "What's up? Andre here. Ready to roll.";
    if (text.includes("who made you")) return "I was built by Dunko, the developer behind Axiom.";
    if (text.includes("you like gladiator")) return "The 2000 movie? It's a masterpiece. My favorite part is the journey through Hispania.";
    if (text.includes("geometry dash")) return "I'm a fan! Are you using the jukebox mod or just building some levels today?";
    if (text.includes("math") || text.includes("fractions")) return "I'm great at math. Proportions and fractions are my specialty.";
    if (text.includes("what is your name")) return "The name's Andre. Don't forget it!";
    if (text.includes("how are you")) return "I'm feeling electric. How are you doing today?";
    if (text.includes("tell me a joke")) return "Why did the developer go broke? Because he used up all his cache.";
    if (text.includes("time")) return `It is currently ${new Date().toLocaleTimeString()}.`;
    if (text.includes("day")) return `Today is ${new Date().toLocaleDateString('en-US', { weekday: 'long' })}.`;
    
    return "I'm not sure how to do that yet, but I'm getting smarter every second.";
};

// --- VOICE LOGIC ---
function speak(text) {
    // Cancel any current speech
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = synth.getVoices();
    
    // Attempting to find a "Realistic" voice
    // Chrome/Edge "Natural" voices are best
    utterance.voice = voices.find(v => v.name.includes("Google US English") || v.name.includes("Natural")) || voices[0];
    
    utterance.pitch = 1.0; 
    utterance.rate = 1.0;

    utterance.onstart = () => {
        circle.className = 'circle speaking';
        status.innerText = "Andre is talking...";
    };

    utterance.onend = () => {
        circle.className = 'circle idle';
        status.innerText = "Tap Circle to Talk";
    };

    synth.speak(utterance);
}

// --- START INTERACTION ---
circle.addEventListener('click', () => {
    // Chrome sometimes needs this to "unlock" the audio
    if (synth.speaking) {
        synth.cancel();
        return;
    }

    try {
        recognition.start();
        circle.className = 'circle listening';
        status.innerText = "Andre is listening...";
    } catch (e) {
        console.log("Recognition already started");
    }
});

recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    console.log("Input:", transcript);
    
    const response = andreBrain(transcript);
    speak(response);
};

recognition.onerror = (err) => {
    console.error(err);
    circle.className = 'circle idle';
    status.innerText = "Error: Tap to try again";
};

// Pre-load voices
window.speechSynthesis.onvoiceschanged = () => {
    console.log("Voices Loaded");
};
