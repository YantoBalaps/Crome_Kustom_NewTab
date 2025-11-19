const videos = [
  './video/background1.mp4'
];

// Pilih video random setiap kali new tab dibuka
let currentIndex = Math.floor(Math.random() * videos.length);

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

// Navigasi video (pakai tombol ⟨ ⟩)
document.getElementById('prevBtn').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + videos.length) % videos.length;
  updateVideo();
});

document.getElementById('nextBtn').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % videos.length;
  updateVideo();
});

// Detect ketika kursor mendekati area tepi layar
document.addEventListener('mousemove', (e) => {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const edgeThreshold = 50; // Pixel dari tepi
  
  // Cek jika kursor dekat tepi kiri
  if (e.clientX <= edgeThreshold) {
    prevBtn.classList.add('show');
  } else {
    prevBtn.classList.remove('show');
  }
  
  // Cek jika kursor dekat tepi kanan
  if (e.clientX >= window.innerWidth - edgeThreshold) {
    nextBtn.classList.add('show');
  } else {
    nextBtn.classList.remove('show');
  }
});

// Inisialisasi → langsung random
updateVideo();
