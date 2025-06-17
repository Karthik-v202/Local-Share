self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("walkie-cache").then(cache =>
      cache.addAll(["index.html", "manifest.json", "icon.png"])
    )
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});

// Load sounds
const connectSound = new Audio('connect.mp3');
const whiteNoise = new Audio('white-noise.mp3');
whiteNoise.loop = true;
whiteNoise.volume = 0.3;

// Play when connected
function onConnected() {
  connectSound.play();
  whiteNoise.play();
}

// Stop white noise when talking
function onStartSpeaking() {
  whiteNoise.volume = 0;  // or whiteNoise.pause();
}

// Resume white noise when done
function onStopSpeaking() {
  whiteNoise.volume = 0.3;  // or whiteNoise.play();
}

