// ==========================================
// 1. CUENTA REGRESIVA (Hacia el 28 de diciembre de 2026 a las 16:00 hrs)
// ==========================================
const weddingDate = new Date("December 28, 2026 16:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = String(days).padStart(2, '0');
    document.getElementById("hours").innerText = String(hours).padStart(2, '0');
    document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
    document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
}

// Ejecutar la cuenta regresiva cada segundo
setInterval(updateCountdown, 1000);
updateCountdown();


// ==========================================
// 2. REPRODUCTOR DE MÚSICA & ANIMACIÓN DE CORAZONES
// ==========================================
const playMusicBtn = document.getElementById('playMusicBtn');
const inlineHeart = document.getElementById('inlineHeart');
const bgAudio = document.getElementById('bgAudio');
const musicIcon = document.getElementById('musicIcon');
const heartsContainer = document.getElementById('heartsContainer');
let isPlaying = false;

function triggerHeartsAnimation() {
    for (let i = 0; i < 7; i++) {
        const heart = document.createElement('span');
        heart.classList.add('floating-heart');
        heart.innerHTML = '<i class="fa-solid fa-heart"></i>';
        
        const randomX = (Math.random() - 0.5) * 40;
        const randomDelay = Math.random() * 0.25;
        
        heart.style.left = `${randomX}px`;
        heart.style.animationDelay = `${randomDelay}s`;
        
        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 1400);
    }
}

function toggleAudio() {
    if (!isPlaying) {
        bgAudio.play().then(() => {
            musicIcon.classList.remove('fa-music');
            musicIcon.classList.add('fa-pause');
            isPlaying = true;
            triggerHeartsAnimation();
        }).catch(e => {
            console.log("La reproducción automática fue prevenida por el navegador:", e);
        });
    } else {
        bgAudio.pause();
        musicIcon.classList.remove('fa-pause');
        musicIcon.classList.add('fa-music');
        isPlaying = false;
    }
}

playMusicBtn.addEventListener('click', toggleAudio);
inlineHeart.addEventListener('click', toggleAudio);


// ==========================================
// 3. ANIMACIÓN DE APARICIÓN AL HACER SCROLL (Scroll Reveal)
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    const reveals = document.querySelectorAll(".reveal");

    const revealOnScroll = function() {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    // Ejecutar una vez al cargar por si hay elementos visibles de inicio
    revealOnScroll();
});

document.addEventListener("DOMContentLoaded", () => {
    // Texto a escribir
    const name1Text = "Fátima";
    const ampText = "&";
    const name2Text = "Francisco";

    // Elementos del DOM
    const name1El = document.getElementById("typewriter-name1");
    const ampEl = document.getElementById("typewriter-amp");
    const name2El = document.getElementById("typewriter-name2");

    // Función auxiliar para escribir texto letra por letra
    function typeEffect(element, text, speed) {
        return new Promise((resolve) => {
            let index = 0;
            element.classList.add("typing-cursor");
            
            const timer = setInterval(() => {
                if (index < text.length) {
                    element.textContent += text.charAt(index);
                    index++;
                } else {
                    clearInterval(timer);
                    element.classList.remove("typing-cursor");
                    resolve();
                }
            }, speed);
        });
    }

    // Secuencia de animación al cargar la página
    async function startTypewriter() {
        // Pequeña pausa inicial de 400ms antes de comenzar a escribir
        await new Promise(r => setTimeout(r, 400));
        
        // Escribe "Fátima" (120ms por letra)
        await typeEffect(name1El, name1Text, 120);
        
        // Pausa breve
        await new Promise(r => setTimeout(r, 200));
        
        // Escribe "&"
        await typeEffect(ampEl, ampText, 150);
        
        // Pausa breve
        await new Promise(r => setTimeout(r, 200));
        
        // Escribe "Francisco"
        await typeEffect(name2El, name2Text, 120);
    }

    startTypewriter();
});

document.addEventListener("DOMContentLoaded", () => {
    const itinerarySection = document.getElementById("itinerary-section");
    const timelineItems = document.querySelectorAll(".timeline-item");
    let hasAnimatedItinerary = false;

    // Función de tipado individual
    function typeText(element, text, speed) {
        return new Promise((resolve) => {
            let index = 0;
            element.classList.add("typing-cursor");
            const timer = setInterval(() => {
                if (index < text.length) {
                    element.textContent += text.charAt(index);
                    index++;
                } else {
                    clearInterval(timer);
                    element.classList.remove("typing-cursor");
                    resolve();
                }
            }, speed);
        });
    }

    // Secuencia para escribir todo el itinerario en orden
    async function runItineraryAnimation() {
        if (hasAnimatedItinerary) return;
        hasAnimatedItinerary = true;

        for (let item of timelineItems) {
            const timeEl = item.querySelector(".timeline-time");
            const descEl = item.querySelector(".timeline-desc");
            const timeText = item.getAttribute("data-time");
            const descText = item.getAttribute("data-desc");

            // Escribe la hora
            await typeText(timeEl, timeText, 70);
            // Pausa breve entre hora y descripción
            await new Promise(r => setTimeout(r, 150));
            // Escribe la descripción
            await typeText(descEl, descText, 50);
            // Pausa breve antes de pasar al siguiente elemento del itinerario
            await new Promise(r => setTimeout(r, 300));
        }
    }

    // Observador para activar la animación solo cuando se llega a la sección
    const itineraryObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runItineraryAnimation();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    if (itinerarySection) {
        itineraryObserver.observe(itinerarySection);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const verseSection = document.getElementById("verse-section");
    const quoteEl = document.getElementById("verse-quote-el");
    const refEl = document.getElementById("verse-ref-el");
    
    const quoteText = "“Mejor son dos que uno, porque obtienen más fruto de su esfuerzo. Si caen, El uno levanta al otro”";
    const refText = "ECLESIASTÉS 4:9-10";
    let hasAnimatedVerse = false;

    // Función auxiliar de tipado (si ya tienes una similar, puedes adaptarla)
    function typeVerseText(element, text, speed) {
        return new Promise((resolve) => {
            let index = 0;
            element.classList.add("typing-cursor");
            const timer = setInterval(() => {
                if (index < text.length) {
                    element.textContent += text.charAt(index);
                    index++;
                } else {
                    clearInterval(timer);
                    element.classList.remove("typing-cursor");
                    resolve();
                }
            }, speed);
        });
    }

    async function runVerseAnimation() {
        if (hasAnimatedVerse) return;
        hasAnimatedVerse = true;

        // Escribe la frase principal (velocidad de 35ms por letra por ser un texto más largo)
        await typeVerseText(quoteEl, quoteText, 35);
        // Pausa breve antes de escribir la referencia
        await new Promise(r => setTimeout(r, 400));
        // Escribe la referencia bíblica
        await typeVerseText(refEl, refText, 50);
    }

    // Observador para activar la animación solo al visualizar la sección
    const verseObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runVerseAnimation();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    if (verseSection) {
        verseObserver.observe(verseSection);
    }
});