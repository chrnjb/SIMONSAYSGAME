// let gameSeq=[];
// let userSeq=[];

// let btns = ["yellow", "red", "green", "cyan"];

// let started = false
// let level = 0;

// let h2 = document.querySelector("h2");

// document.addEventListener("keypress", function () {
//     if(started == false) {
//         console.log("Game is started");
//         started = true;

//         levelUp();
//     }   
// });

// function gameFlash(btn) {
//     btn.classList.add("flash");
//     setTimeout(function() {
//         btn.classList.remove("flash");
//     }, 250);
// }

// function userFlash(btn) {
//     btn.classList.add("userflash");
//     setTimeout(function() {
//         btn.classList.remove("userflash");
//     }, 250);
// }

// function levelUp() {
//     userSeq = [];
//     level++;
//     h2.innerText = `Level ${level}`;

//     let randIndex = Math.floor(Math.random() * 3);
//     let randColor = btns[randIndex];
//     let randBtn = document.querySelector(`.${randColor}`);
//     // console.log(randBtn);
//     // console.log(randColor);
//     // console.log(randIndex);
//     gameSeq.push(randColor);
//     // console.log(gameSeq);
//     gameFlash(randBtn);
// }

// function checkAns(idx) {
//     // console.log("curr level : " + level);

//     if(userSeq[idx] === gameSeq[idx]) {
//         if(userSeq.length === gameSeq.length) {
//             setTimeout(levelUp, 1000);
//         }
//     } else {
//         h2.innerHTML = `Game Over! Your score is <b>${level}</b> <br>. Press any key to restart the game`;
//         document.querySelector("body").style.backgroundColor = "red";
//         setTimeout(function() {
//             document.querySelector("body").style.backgroundColor = "blanchedalmond";
//             for(btn of allBtns) {
//                 btn.classList.add("gameover");
//             }
//         }, 150);
//         reset();
//     }
// }   
// function btnPress() {
//     // console.log(this);
//     let btn = this;
//     userFlash(btn);

//     userColor = btn.getAttribute("id");
//     userSeq.push(userColor);

//     checkAns(userSeq.length - 1);
// }

// let allBtns = document.querySelectorAll(".btn");
// for(btn of allBtns) {
//     btn.addEventListener("click", btnPress);
// }

// function reset() {
//     started == false;
//     gameSeq = [];
//     userSeq = [];
//     level = 0;
// }

let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "green", "cyan"];

let started = false;
let level = 0;
let playerName = "Player";
let timerInterval;
let timeLeft = 15;
let soundBars = [];
let clockInterval;

// DOM Elements
const h2 = document.querySelector("#level-title");
const startBtn = document.querySelector("#start-game");
const playerNameInput = document.querySelector("#player-name");
const saveNameBtn = document.querySelector("#save-name");
const currentPlayerSpan = document.querySelector("#current-player");
const verticalPlayerName = document.querySelector("#vertical-player-name");
const allBtns = document.querySelectorAll(".btn");
const body = document.querySelector("body");
const timerDisplay = document.querySelector("#timer");
const datetimeDisplay = document.querySelector("#datetime");
const artisticEffect = document.querySelector(".artistic-effect");

// Update date and time
function updateDateTime() {
    const now = new Date();
    
    // Format date: Apr 26, 2025
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    
    datetimeDisplay.textContent = now.toLocaleDateString('en-US', options);
}

// Initialize the artistic sound bars
function createSoundBars() {
    // Clear existing sound bars
    while (artisticEffect.querySelector('.sound-bar')) {
        artisticEffect.removeChild(artisticEffect.querySelector('.sound-bar'));
    }
    
    // Create new sound bars - increased number for fuller effect
    const numBars = 30;
    for (let i = 0; i < numBars; i++) {
        const soundBar = document.createElement('div');
        soundBar.className = 'sound-bar';
        
        // Position bars across the entire screen
        soundBar.style.left = `${(i / numBars) * 100}%`;
        soundBar.style.height = `${Math.random() * 50 + 20}px`;
        
        // Set different animation durations for each bar
        const animationDuration = Math.random() * 1.5 + 0.5;
        const animationDelay = Math.random() * 1;
        soundBar.style.animation = `sound-bar-animation ${animationDuration}s infinite ease-in-out ${animationDelay}s`;
        
        artisticEffect.appendChild(soundBar);
        soundBars.push(soundBar);
    }
}

// Save player name and update vertical display
function saveName() {
    const newName = playerNameInput.value.trim();
    if (newName) {
        playerName = newName;
        currentPlayerSpan.innerText = playerName;
        
        // Update vertical display with uppercase name
        verticalPlayerName.innerText = playerName.toUpperCase();
        
        // Trigger animation by removing and re-adding the class
        verticalPlayerName.style.animation = 'none';
        setTimeout(() => {
            verticalPlayerName.style.animation = 'fade-in 1s ease-out';
        }, 10);
        
        playerNameInput.value = "";
    }
}

// Save player name
saveNameBtn.addEventListener("click", saveName);
playerNameInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        saveName();
    }
});

// Start game with button
startBtn.addEventListener("click", function() {
    if(!started) {
        startGame();
    }
});

function startGame() {
    console.log("Game is started");
    started = true;
    level = 0;
    gameSeq = [];
    userSeq = [];
    
    // Reset any visual states
    body.style.backgroundColor = "#f0f5f9";
    for(let btn of allBtns) {
        btn.classList.remove("gameover");
    }
    
    // Create sound visualization
    createSoundBars();
    activateSoundBars();
    
    levelUp();
}

function activateSoundBars() {
    // Activate sound bars with random heights
    soundBars.forEach(bar => {
        const randomHeight = Math.random() * 80 + 20;
        bar.style.height = `${randomHeight}px`;
    });
    
    // Keep updating sound bars during gameplay
    if (started) {
        setTimeout(activateSoundBars, 100);
    }
}

function updateArtisticEffect(color) {
    // Temporarily change wave colors based on the button pressed or flashed
    const waves = document.querySelectorAll('.wave');
    let colorValue;
    
    switch(color) {
        case 'red':
            colorValue = '#ff5c5c';
            break;
        case 'yellow':
            colorValue = '#ffcc29';
            break;
        case 'green':
            colorValue = '#25c685';
            break;
        case 'cyan':
            colorValue = '#46b3e6';
            break;
        default:
            return;
    }
    
    // Enhanced pulse effect for the waves
    waves.forEach(wave => {
        const originalOpacity = wave.style.opacity || '0.1';
        wave.style.opacity = '0.3';
        wave.style.boxShadow = `0 0 50px ${colorValue}`;
        
        setTimeout(() => {
            wave.style.opacity = originalOpacity;
            wave.style.boxShadow = 'none';
        }, 300);
    });
    
    // Also flash the vertical player name
    verticalPlayerName.style.color = colorValue;
    verticalPlayerName.style.textShadow = `0 0 10px ${colorValue}`;
    
    setTimeout(() => {
        verticalPlayerName.style.color = '';
        verticalPlayerName.style.textShadow = '';
    }, 300);
}

function gameFlash(btn) {
    btn.classList.add("flash");
    const color = btn.getAttribute("id");
    updateArtisticEffect(color);
    
    // Add sound effect for game flash
    playSound(color);
    
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    const color = btn.getAttribute("id");
    updateArtisticEffect(color);
    
    // Add sound effect for user flash
    playSound(color);
    
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 150);
}

// Sound effects for each button
function playSound(color) {
    let frequency;
    switch(color) {
        case 'red':
            frequency = 329.63; // E4
            break;
        case 'yellow':
            frequency = 392.00; // G4
            break;
        case 'green':
            frequency = 440.00; // A4
            break;
        case 'cyan':
            frequency = 493.88; // B4
            break;
        default:
            frequency = 261.63; // C4
    }
    
    // Create audio context
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContext();
    
    // Create oscillator
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    gainNode.gain.value = 0.5;
    
    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    // Play and stop
    oscillator.start();
    
    // Fade out the sound
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
    
    // Stop after 0.3 seconds
    setTimeout(() => {
        oscillator.stop();
    }, 300);
}

function playSequence(sequence) {
    let i = 0;
    const interval = setInterval(() => {
        if (i >= sequence.length) {
            clearInterval(interval);
            // Start the timer after sequence finishes playing
            startTimer();
            return;
        }
        
        const color = sequence[i];
        const btn = document.querySelector(`.${color}`);
        gameFlash(btn);
        i++;
    }, 600);
}

function startTimer() {
    // Reset and show timer
    timeLeft = 15;
    timerDisplay.textContent = timeLeft;
    timerDisplay.classList.remove("timer-warning");
    
    // Clear any existing interval
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        
        // Add warning class when time is running low
        if (timeLeft <= 5) {
            timerDisplay.classList.add("timer-warning");
        }
        
        // Time's up
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            gameOver("Time's up!");
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    
    // Stop any existing timer
    stopTimer();

    // Random button selection - fixed the range to include all 4 buttons
    let randIndex = Math.floor(Math.random() * 4);
    let randColor = btns[randIndex];
    gameSeq.push(randColor);
    
    // Adding a slight delay before playing the sequence
    setTimeout(() => {
        // Play the entire sequence
        playSequence(gameSeq);
    }, 800);
}

function checkAns(idx) {
    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length === gameSeq.length) {
            // Stop timer when level is cleared
            stopTimer();
            setTimeout(levelUp, 1000);
        }
    } else {
        gameOver("Wrong pattern!");
    }
}

function gameOver(message) {
    // Stop the timer
    stopTimer();
    
    // Play error sound
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContext();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = 'sawtooth';
    oscillator.frequency.value = 150;
    gainNode.gain.value = 0.3;
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start();
    
    // Frequency sweep down
    oscillator.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.6);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
    
    setTimeout(() => {
        oscillator.stop();
    }, 600);
    
    h2.innerHTML = `Game Over! ${message} <br>${playerName}'s score is <b>${level}</b> <br> Press Start to play again`;
    body.style.backgroundColor = "#e3e3e3";
    
    setTimeout(function() {
        body.style.backgroundColor = "#f0f5f9";
        for(let btn of allBtns) {
            btn.classList.add("gameover");
        }
    }, 200);
    
    reset();
}

function btnPress() {
    if (!started) return;
    
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

// Add click event listeners to game buttons
for(let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    stopTimer();
    timerDisplay.textContent = "15";
    timerDisplay.classList.remove("timer-warning");
    
    // Clear sound visualization
    soundBars = [];
    while (artisticEffect.querySelector('.sound-bar')) {
        artisticEffect.removeChild(artisticEffect.querySelector('.sound-bar'));
    }
}

// Initialize player name and vertical name display
function initializeNames() {
    currentPlayerSpan.innerText = playerName;
    verticalPlayerName.innerText = playerName.toUpperCase();
}

// Start clock for date and time display
function startClock() {
    updateDateTime(); // Update immediately
    
    // Update every second
    clockInterval = setInterval(updateDateTime, 1000);
}

// Function to handle keyboard events for game control
function handleKeyDown(event) {
    if (!started && event.key === " ") {
        // Space bar starts the game
        startGame();
    } else if (started) {
        // Number keys 1-4 can press buttons
        if (event.key === "1") {
            const btn = document.querySelector("#red");
            simulateButtonPress(btn);
        } else if (event.key === "2") {
            const btn = document.querySelector("#yellow");
            simulateButtonPress(btn);
        } else if (event.key === "3") {
            const btn = document.querySelector("#green");
            simulateButtonPress(btn);
        } else if (event.key === "4") {
            const btn = document.querySelector("#cyan");
            simulateButtonPress(btn);
        }
    }
}

function simulateButtonPress(btn) {
    // Flash the button
    userFlash(btn);
    
    // Process the button press as part of the game
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    
    checkAns(userSeq.length - 1);
}

// Add keyboard event listener
document.addEventListener("keydown", handleKeyDown);

// Initialize the game
function init() {
    initializeNames();
    startClock();
    updateDateTime();
    h2.innerText = "Press the Start button to play";
}

// Call init when the page loads
window.addEventListener("load", init);