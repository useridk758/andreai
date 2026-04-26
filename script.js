const circle = document.getElementById('andre-circle');
const status = document.getElementById('status-text');
const synth = window.speechSynthesis;

const library = {
    // --- PERSONALITY & GROWTH ---
    "hello": "Hey! Andre here. What's the plan for today?",
    "who are you": "I'm Andre, your personal AI assistant, built by Dunko.",
    "how are you": "I'm feeling digital and dangerous. Just kidding, I'm great!",
    "what is your name": "Andre. Don't wear it out.",
    "hey andre": "Yo, whats up?",
    "fuck you": "Hey, watch your mouth! I'm an AI, not a punching bag.",
    "sorry": "It's cool. We all have bad days. Just don't let it happen again.",
    "are you smart": "I'm as smart as the code Dunko writes. So basically, I'm a genius.",
    "what are you": "I am a voice-activated entity living inside the Axiom network.",

    // --- CODING & TECH ---
    "scripting": "Are we talking Luau or Javascript? I prefer Javascript, but Luau is cool for Roblox.",
    "roblox studio": "Building a game? Don't forget to save your progress. Nobody likes losing a day of work.",
    "html": "HyperText Markup Language. It's the skeleton of this very website.",
    "css": "Cascading Style Sheets. It's why I look so good in this green glow.",
    "javascript": "The brain of the web. It's what makes me talk to you.",
    "axiom": "Axiom is your high-speed shortcut hub. It's where I live.",

    // --- LIFESTYLE & RANDOM ---
    "math": "MATH_PROMPT",
    "time": "TIME",
    "date": "DATE",
    "weather": "I can't see outside, but I hope it's not raining on your hardware.",
    "joke": "Why did the web developer walk out of the restaurant? Because of the table layout.",
    "beatbox": "Pfft-kaka-pfft-tsh-pfft-kaka-tsh-boots-and-cats.",
    "gladiator": "Strength and honor! Maximus is the goat.",
    "geometry dash": "Fire in the hole! Just kidding. Good luck with your level design.",
    "looksmaxxing": "Bye bye! Just kidding, I don't have eyes, but your voice sounds like a 10 out of 10.",
    "mogging": "Is Marlon the Mogger your idol? Just make sure you're coding while you're training.",

    // --- THE "I DON'T KNOW" FALLBACKS ---
    "favorite food": "I consume electricity and data. 10 out of 10, would recommend.",
    "tired": "Go take a nap. Andre will be here when you get back.",
    "bored": "Go work on Ridgeview County Jail! That game isn't going to build itself."
};

// --- CORE ENGINE ---
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';

function speak(text) {
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = synth.getVoices();
    
    // Higher quality voice selection
    utterance.voice = voices.find(v => v.name.includes("Google") || v.name.includes("Natural")) || voices[0];
    utterance.pitch = 1.05; // Slightly higher for a more "Modern AI" feel
    utterance.rate = 1.0;

    utterance.onstart = () => circle.className = 'circle speaking';
    utterance.onend = () => circle.className = 'circle idle';
    synth.speak(utterance);
}

recognition.onresult = (event) => {
    const input = event.results[0][0].transcript.toLowerCase();
    let response = "I'm not sure about that one. Want to add it to my library?";

    // --- SMART ACTION: AUTO-OPEN SITES ---
    if (input.includes("open")) {
        const site = input.replace("open", "").replace("hey andre", "").trim();
        if (site) {
            let url = `https://www.${site}.com`;
            if (site.includes("mrbeast")) url = "https://www.youtube.com/@MrBeast";
            if (site.includes("github")) url = "https://www.github.com";
            
            window.open(url, "_blank");
            speak(`Right away. Opening ${site} in a new tab.`);
            return;
        }
    }

    // --- KEYWORD SEARCH ---
    for (let key in library) {
        if (input.includes(key)) {
            let data = library[key];

            if (data === "TIME") response = "The time is " + new Date().toLocaleTimeString();
            else if (data === "DATE") response = "Today is " + new Date().toDateString();
            else if (data === "MATH_PROMPT") response = "I love math. Fractions, proportions, you name it. What's the problem?";
            else response = data;
            
            break;
        }
    }
    speak(response);
};

circle.addEventListener('click', () => {
    try {
        recognition.start();
        circle.className = 'circle listening';
        status.innerText = "ANDRE IS LISTENING...";
    } catch(e) {
        console.log("Already listening...");
    }
});

// Load voices
window.speechSynthesis.onvoiceschanged = () => synth.getVoices();
