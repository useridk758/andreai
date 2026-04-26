const circle = document.getElementById('andre-circle');
const status = document.getElementById('status-text');
const synth = window.speechSynthesis;

// --- THE MASSIVE KNOWLEDGE LIBRARY ---
// You can add hundreds more lines here following this pattern!
const library = {
    // PERSONALITY & BASICS
    "hello": "Hey! Andre here. What's the plan for today?",
    "who are you": "I'm Andre, your personal AI assistant, built by Dunko.",
    "how are you": "I'm feeling digital and dangerous. Just kidding, I'm great!",
    "what is your name": "Andre. Don't wear it out.",
    "are you a robot": "I prefer the term high-performance digital entity.",
    
    // OPENING TABS (ACTION COMMANDS)
    "mrbeast": "OPEN:https://www.youtube.com/@MrBeast|Opening Mr Beast. Don't forget to subscribe!",
    "roblox": "OPEN:https://www.roblox.com|Launching Roblox. Let's get to work on Ridgeview.",
    "google": "OPEN:https://www.google.com|Opening Google for you.",
    "youtube": "OPEN:https://www.youtube.com|Starting up YouTube.",
    
    // FUN & EASTER EGGS
    "joke": "Why did the developer stay at work? Because he lost his keys. Get it? Like keyboard keys?",
    "gladiator": "Gladiator is a classic. Maximus really knew how to lead Hispania.",
    "geometry dash": "Geometry Dash is awesome. Are you working on a new level or just practicing?",
    "self destruct": "Self destruct initiated. Three. Two. One. Just kidding, I'm still here.",
    "beatbox": "Boots and cats and boots and cats and boots and cats.",
    
    // GENERAL KNOWLEDGE
    "time": "TIME",
    "date": "DATE",
    "math": "I love math! Whether it's fractions or proportions, I've got the answers.",
    "axiom": "Axiom is the master project. It's the future of your web shortcuts.",
};

// --- CORE ENGINE ---
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';

function speak(text) {
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Picking a realistic voice
    const voices = synth.getVoices();
    utterance.voice = voices.find(v => v.name.includes("Google") || v.name.includes("Natural")) || voices[0];
    utterance.pitch = 1.0;
    utterance.rate = 1.0;

    utterance.onstart = () => circle.className = 'circle speaking';
    utterance.onend = () => circle.className = 'circle idle';
    synth.speak(utterance);
}

recognition.onresult = (event) => {
    const input = event.results[0][0].transcript.toLowerCase();
    let response = "I don't know that one yet, but I'm learning.";

    // Search library for keywords
    for (let key in library) {
        if (input.includes(key)) {
            let data = library[key];

            // Check if it's an ACTION command (like opening a link)
            if (data.includes("OPEN:")) {
                const parts = data.split("|");
                const url = parts[0].replace("OPEN:", "");
                window.open(url, "_blank");
                response = parts[1];
            } 
            else if (data === "TIME") response = "The time is " + new Date().toLocaleTimeString();
            else if (data === "DATE") response = "Today is " + new Date().toDateString();
            else response = data;
            
            break;
        }
    }
    speak(response);
};

circle.addEventListener('click', () => {
    recognition.start();
    circle.className = 'circle listening';
    status.innerText = "LISTENING...";
});

// Load voices immediately
window.speechSynthesis.onvoiceschanged = () => synth.getVoices();
