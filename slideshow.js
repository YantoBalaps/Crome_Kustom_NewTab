const videos = [
  './video/background4.mp4',
  './video/background3.mp4',
  './video/background2.mp4',
  './video/background5.mp4',
  './video/background6.mp4',
  './video/background7.mp4',
  './video/background8.mp4',
  './video/background9.mp4',
  './video/background1.mp4'
];

let currentIndex = 0;
const videoElement = document.getElementById('bgVideo');

// Pastikan video siap diputar
videoElement.addEventListener('loadedmetadata', function() {
  this.play().catch(e => console.log("Autoplay blocked:", e));
});

function updateVideo() {
  videoElement.src = videos[currentIndex];
  videoElement.load();
  
  videoElement.addEventListener('canplay', function() {
    this.play().catch(e => console.log("Playback error:", e));
  }, { once: true });
}

// Navigasi video
document.getElementById('prevBtn').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + videos.length) % videos.length;
  updateVideo();
});

document.getElementById('nextBtn').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % videos.length;
  updateVideo();
});

// Inisialisasi
updateVideo();