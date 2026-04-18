import './style.css'

// Анімація зірок для Hero
const canvas = document.getElementById('stars-canvas');
const ctx = canvas.getContext('2d');

let width, height, stars;

function initStars() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  stars = [];
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5,
      speed: Math.random() * 0.5
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#fff';
  
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
    
    star.y -= star.speed;
    if (star.y < 0) star.y = height;
  });
  
  requestAnimationFrame(animate);
}

window.addEventListener('resize', initStars);

initStars();
animate();

// Плавне зникнення при скролі
const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('section > *').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'all 0.8s ease-out';
  observer.observe(el);
});

console.log('Мемлогія: Сингулярність активована 🥛');
