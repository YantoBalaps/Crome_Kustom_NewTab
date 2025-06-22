document.addEventListener('DOMContentLoaded', () => {
  const snowContainer = document.getElementById('snowContainer');
  const rgb = "rgb(255, 255, 255)"; // white color
  setInterval(() => {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.textContent = '❄';
    snowflake.style.color = rgb;
    
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.animationDuration = 5 + Math.random() * 5 + 's';
    snowflake.style.fontSize = 10 + Math.random() * 20 + 'px';
    snowflake.style.opacity = Math.random();

    snowContainer.appendChild(snowflake);

    setTimeout(() => {
      snowflake.remove();
    }, 10000);
  }, 300);
});
