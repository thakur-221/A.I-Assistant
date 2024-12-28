let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

// Speak Function
function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "hi-IN"; // Hindi language by default
    window.speechSynthesis.cancel(); // Cancel any ongoing speech
    window.speechSynthesis.speak(text_speak);
}

// Greet Function
function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sir");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon Sir");
    } else {
        speak("Good Evening Sir");
    }
}

// Speech Recognition Setup
let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();
recognition.interimResults = false;
recognition.continuous = false;

// Handle Speech Result
recognition.onresult = (event) => {
    let transcript = event.results[0][0].transcript.toLowerCase();
    content.innerText = transcript;
    takeCommand(transcript);
};

// Handle Speech End
recognition.onend = () => {
    btn.style.display = "flex";
    voice.style.display = "none";
};

// Add Button Click Listener
btn.addEventListener("click", () => {
    recognition.start();
    voice.style.display = "block";
    btn.style.display = "none";
});

// Information about Quantum University
const quantumInfo = {
    hindi: "Quantum University उत्तराखंड के रुड़की में स्थित एक प्रसिद्ध निजी विश्वविद्यालय है। यह विभिन्न पाठ्यक्रमों जैसे B.Tech, B.Com, MBA, और कई अन्य विषयों में उच्च गुणवत्ता वाली शिक्षा प्रदान करता है। यह अपने अद्वितीय इंटरडिसिप्लिनरी पेडागॉजी और उद्योग-केंद्रित दृष्टिकोण के लिए जाना जाता है।",
    english: "Quantum University is a renowned private university located in Roorkee, Uttarakhand. It offers high-quality education in various courses like B.Tech, B.Com, MBA, and many others. It is known for its unique interdisciplinary pedagogy and industry-focused approach."
};

// Flag for waiting for a specific response
let waitingForLanguageChoice = false;

// Command Processor
function takeCommand(message) {
    if (waitingForLanguageChoice) {
        handleLanguageChoice(message);
        return;
    }

    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello Sir, what can I help you with?");
    } else if (message.includes("who are you")) {
        speak("I am your virtual assistant, created by Shri Sumit Singh Bisht Sir, Shri Nitin Saini Sir, Shri Rohit Chauhan Sir, and last but not the least Shri Yash Kaushik Sir.");
    } else if (message.includes("why are you develop for")) {
        speak("I develop because of the lab project under the supervision of Mr. Anurag Chandna Sir to help as an AI assistant.");
    } else if (message.includes("and who is shubhum")) {
        speak("शुभम तो एक नंबर का गधेरा है। बात करनी हो तो पास भी न आए। न लिखता है, न पढ़ता है। ये तो बोझ है, बोझ भी धरती पर।");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://youtube.com/", "_blank");
    } else if (message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://google.com/", "_blank");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak("The time is " + time);
    } else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short", year: "numeric" });
        speak("Today's date is " + date);
    } else if (message.includes("calculate")) {
        try {
            let expression = message.replace("calculate", "").trim();
            let result = eval(expression);
            speak(`The result is ${result}`);
        } catch (error) {
            speak("I couldn't calculate that. Please try again.");
        }
    } else if (message.includes("table of")) {
        let number = parseInt(message.replace("table of", "").trim());
        if (!isNaN(number)) {
            let table = "";
            for (let i = 1; i <= 10; i++) {
                table += `${number} x ${i} = ${number * i}\n`;
            }
            speak("Here is the table for " + number);
            alert(table); // Display the table as an alert
        } else {
            speak("Please provide a valid number.");
        }
    } else if (message.includes("tell me about quantum university")) {
        askLanguagePreference();
    } else {
        speak("Here's what I found on the internet.");
        window.open(`https://www.google.com/search?q=${message}`, "_blank");
    }
}

// Ask for Language Preference
function askLanguagePreference() {
    waitingForLanguageChoice = true;
    speak("Do you want to hear about Quantum University in Hindi or English?");
}

// Handle Language Choice
function handleLanguageChoice(message) {
    if (message.includes("hindi")) {
        speak(quantumInfo.hindi);
    } else if (message.includes("english")) {
        speak(quantumInfo.english);
    } else {
        speak("Sorry, I didn't get that. Please choose Hindi or English.");
    }
    waitingForLanguageChoice = false;
}

// Initial Greeting
wishMe();
