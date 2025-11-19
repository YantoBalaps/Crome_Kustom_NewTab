// Daftar video yang MUNGKIN ada
const possibleVideos = [
  './videos/background1.mp4',
  './videos/background2.mp4', 
  './videos/background3.mp4',
  './videos/background4.mp4',
  './videos/background5.mp4',
  './videos/background6.mp4',
  './videos/background7.mp4',
  './videos/background8.mp4',
  './videos/background9.mp4'

let availableVideos = [];
let currentIndex = 0;
const videoElement = document.getElementById('bgVideo');

// ⭐ FUNGSI BARU: Cek video mana yang benar-benar ada
async function checkAvailableVideos() {
  const existingVideos = [];
  
  for (const videoPath of possibleVideos) {
    try {
      const response = await fetch(videoPath, { method: 'HEAD' });
      if (response.ok) {
        existingVideos.push(videoPath);
        console.log(`✅ Video found: ${videoPath}`);
      }
    } catch (error) {
      console.log(`❌ Video not found: ${videoPath}`);
    }
  }
  
  // Fallback jika tidak ada video sama sekali
  if (existingVideos.length === 0) {
    console.warn('⚠️ No videos found! Using solid color background');
  }
  
  return existingVideos;
}

// Initialize
checkAvailableVideos().then(videos => {
  availableVideos = videos;
  
  if (availableVideos.length > 0) {
    currentIndex = Math.floor(Math.random() * availableVideos.length);
    console.log(`🎯 Starting with: ${availableVideos[currentIndex]}`);
    updateVideo();
  } else {
    console.log('🎨 No videos available, using fallback background');
    // Bisa tambahkan fallback background color di sini
    document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  }
});

function updateVideo() {
  if (availableVideos.length === 0) return;
  
  videoElement.src = availableVideos[currentIndex];
  videoElement.load();
  
  videoElement.addEventListener('canplay', function() {
    this.play().catch(e => console.log("Playback error:", e));
  }, { once: true });
}

// Navigasi video
document.getElementById('prevBtn').addEventListener('click', () => {
  if (availableVideos.length === 0) return;
  currentIndex = (currentIndex - 1 + availableVideos.length) % availableVideos.length;
  updateVideo();
});

document.getElementById('nextBtn').addEventListener('click', () => {
  if (availableVideos.length === 0) return;
  currentIndex = (currentIndex + 1) % availableVideos.length;
  updateVideo();
});

// Tombol muncul saat kursor di tepi (tetap sama)
document.addEventListener('mousemove', (e) => {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const edgeThreshold = 50;
  
  if (e.clientX <= edgeThreshold) {
    prevBtn.classList.add('show');
  } else {
    prevBtn.classList.remove('show');
  }
  
  if (e.clientX >= window.innerWidth - edgeThreshold) {
    nextBtn.classList.add('show');
  } else {
    nextBtn.classList.remove('show');
  }
<<<<<<< HEAD
});
=======
});

// Inisialisasi → langsung random
updateVideo();
>>>>>>> 2314b67a51cbffe9a2de0100ea29f08f313ef4bb
