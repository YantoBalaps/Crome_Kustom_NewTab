const icon = document.getElementById('runawayIcon');
let isMoving = false;

const possiblePositions = [
  { x: -180, y: -60 }, { x: 180, y: -60 }, { x: -150, y: 40 }, { x: 150, y: 40 },
  { x: -120, y: 100 }, { x: 120, y: 100 }, { x: 0, y: -100 }, { x: -200, y: 0 },
  { x: 200, y: 0 }, { x: -80, y: -120 }, { x: 80, y: -120 }, { x: -90, y: 80 },
  { x: 90, y: 80 }, { x: -60, y: -80 }, { x: 60, y: -80 }, { x: -100, y: 120 },
  { x: 100, y: 120 }
];

let currentPosition = { x: 0, y: 0 };

function getPositionAwayFromCursor(iconRect, cursorX, cursorY) {
  const iconCenterX = iconRect.left + iconRect.width / 2;
  const iconCenterY = iconRect.top + iconRect.height / 2;
  
  // Hitung arah dari kursor ke icon
  const deltaX = iconCenterX - cursorX;
  const deltaY = iconCenterY - cursorY;
  
  // Normalize dan scale ke jarak yang ditentukan
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  const runDistance = 150;
  
  // Posisi target (menjauh dari kursor)
  const targetX = (deltaX / distance) * runDistance;
  const targetY = (deltaY / distance) * runDistance;
  
  // Cari posisi di possiblePositions yang paling dekat dengan target
  let bestPos = possiblePositions[0];
  let minDistance = Infinity;
  
  possiblePositions.forEach(pos => {
    if (pos.x === currentPosition.x && pos.y === currentPosition.y) return;
    
    const dist = Math.sqrt(
      Math.pow(pos.x - targetX, 2) + Math.pow(pos.y - targetY, 2)
    );
    
    if (dist < minDistance) {
      minDistance = dist;
      bestPos = pos;
    }
  });
  
  return bestPos;
}

icon.addEventListener('mouseenter', (e) => {
  if (isMoving) return;
  
  isMoving = true;
  
  const iconRect = icon.getBoundingClientRect();
  const newPos = getPositionAwayFromCursor(iconRect, e.clientX, e.clientY);
  const randomScale = 0.9 + Math.random() * 0.3;
  const randomRotate = (Math.random() - 0.5) * 45;
  
  icon.style.transform = `translate(${newPos.x}px, ${newPos.y}px) scale(${randomScale}) rotate(${randomRotate}deg)`;
  icon.style.opacity = '1';
  icon.style.textShadow = '0 0 25px rgba(255, 255, 255, 0.9)';
  
  currentPosition = newPos;

  // Apply ke container icon
  icon.style.transform = `translate(${newPos.x}px, ${newPos.y}px) scale(${randomScale}) rotate(${randomRotate}deg)`;
  icon.style.filter = 'drop-shadow(0 0 25px rgba(255, 255, 255, 0.9))';
  
  currentPosition = newPos;

  setTimeout(() => {
    isMoving = false;
  }, 800);
});

// Reset dengan klik kanan
icon.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  icon.style.transform = 'translateY(-50px) scale(1) rotate(0deg)';
  icon.style.opacity = '0.8';
  icon.style.textShadow = '0 0 15px rgba(255, 255, 255, 0.5)';
  currentPosition = { x: 0, y: 0 };
});