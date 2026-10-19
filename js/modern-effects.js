/**
 * Modern Effects & Particle/Confetti Engine
 * Elevates the birthday experience with magical particles, confetti cannons,
 * ambient glowing lighting, and interactive audio visualizer.
 */

(function () {
  'use strict';

  // 1. Setup Ambient & Confetti Canvases
  const ambientCanvas = document.createElement('canvas');
  ambientCanvas.id = 'ambient-canvas';
  document.body.prepend(ambientCanvas);

  const confettiCanvas = document.createElement('canvas');
  confettiCanvas.id = 'confetti-canvas';
  document.body.appendChild(confettiCanvas);

  const ambientCtx = ambientCanvas.getContext('2d');
  const confettiCtx = confettiCanvas.getContext('2d');

  let width = (ambientCanvas.width = confettiCanvas.width = window.innerWidth);
  let height = (ambientCanvas.height = confettiCanvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = ambientCanvas.width = confettiCanvas.width = window.innerWidth;
    height = ambientCanvas.height = confettiCanvas.height = window.innerHeight;
  });

  // 2. Ambient Particles (Gentle floating stars & warm gold fireflies)
  const ambientParticles = [];
  const AMBIENT_COUNT = 45;

  for (let i = 0; i < AMBIENT_COUNT; i++) {
    ambientParticles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 1,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.5 - 0.2,
      opacity: Math.random() * 0.7 + 0.3,
      pulseSpeed: Math.random() * 0.03 + 0.01,
      color: Math.random() > 0.4 ? 'rgba(255, 220, 140,' : 'rgba(255, 180, 200,'
    });
  }

  function renderAmbient() {
    ambientCtx.clearRect(0, 0, width, height);

    for (let p of ambientParticles) {
      p.x += p.speedX;
      p.y += p.speedY;
      p.opacity += Math.sin(Date.now() * p.pulseSpeed) * 0.01;

      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      const alpha = Math.max(0.1, Math.min(0.9, p.opacity));
      ambientCtx.beginPath();
      ambientCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ambientCtx.fillStyle = `${p.color} ${alpha})`;
      ambientCtx.shadowBlur = 12;
      ambientCtx.shadowColor = p.color + ' 0.8)';
      ambientCtx.fill();
    }

    requestAnimationFrame(renderAmbient);
  }
  renderAmbient();

  // 3. High Performance Confetti System
  const activeConfetti = [];
  const CONFETTI_COLORS = [
    '#ff4d79', '#ff9900', '#ffd200', '#2ed573',
    '#1e90ff', '#a55eea', '#ff6b81', '#ffffff'
  ];

  function launchConfetti(originX, originY, count = 60, options = {}) {
    const spread = options.spread || 75;
    const velocity = options.velocity || 45;
    const angle = options.angle !== undefined ? options.angle : -90;

    for (let i = 0; i < count; i++) {
      const rad = ((angle + (Math.random() - 0.5) * spread) * Math.PI) / 180;
      const speed = velocity * (0.6 + Math.random() * 0.7);

      activeConfetti.push({
        x: originX,
        y: originY,
        vx: Math.cos(rad) * speed,
        vy: Math.sin(rad) * speed,
        size: Math.random() * 8 + 6,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        gravity: 0.85,
        drag: 0.94,
        wobble: Math.random() * 10,
        wobbleSpeed: Math.random() * 0.1 + 0.05,
        opacity: 1,
        shape: Math.random() > 0.3 ? 'rect' : 'circle'
      });
    }
  }

  function renderConfetti() {
    confettiCtx.clearRect(0, 0, width, height);

    for (let i = activeConfetti.length - 1; i >= 0; i--) {
      const c = activeConfetti[i];
      c.vx *= c.drag;
      c.vy *= c.drag;
      c.vy += c.gravity;
      c.x += c.vx;
      c.y += c.vy;
      c.rotation += c.rotationSpeed;
      c.wobble += c.wobbleSpeed;

      if (c.vy > 2) {
        c.opacity -= 0.008;
      }

      if (c.y > height + 20 || c.opacity <= 0) {
        activeConfetti.splice(i, 1);
        continue;
      }

      confettiCtx.save();
      confettiCtx.translate(c.x, c.y);
      confettiCtx.rotate((c.rotation * Math.PI) / 180);
      confettiCtx.globalAlpha = Math.max(0, c.opacity);
      confettiCtx.fillStyle = c.color;

      const scaleX = Math.cos(c.wobble);
      if (c.shape === 'rect') {
        confettiCtx.fillRect(-c.size / 2 * scaleX, -c.size / 2, c.size * scaleX, c.size);
      } else {
        confettiCtx.beginPath();
        confettiCtx.arc(0, 0, (c.size / 2) * Math.abs(scaleX), 0, Math.PI * 2);
        confettiCtx.fill();
      }

      confettiCtx.restore();
    }

    requestAnimationFrame(renderConfetti);
  }
  renderConfetti();

  // Dual side cannons
  function fireDualCannons() {
    launchConfetti(width * 0.1, height * 0.85, 60, { angle: -45, spread: 50, velocity: 40 });
    launchConfetti(width * 0.9, height * 0.85, 60, { angle: -135, spread: 50, velocity: 40 });
  }

  // 4. Interactive Music Visualizer Widget
  function setupMusicWidget() {
    const audio = document.querySelector('.song');
    if (!audio) return;

    const widget = document.createElement('div');
    widget.className = 'music-widget';
    widget.innerHTML = `
      <div class="music-icon">🎵</div>
      <div class="music-bars">
        <span></span><span></span><span></span><span></span>
      </div>
      <span class="music-label">Birthday Music</span>
    `;
    document.body.appendChild(widget);

    widget.addEventListener('click', () => {
      if (audio.paused) {
        audio.play().then(() => {
          widget.classList.add('playing');
        }).catch(() => {});
      } else {
        audio.pause();
        widget.classList.remove('playing');
      }
    });

    audio.addEventListener('play', () => widget.classList.add('playing'));
    audio.addEventListener('pause', () => widget.classList.remove('playing'));
  }

  // 5. Candle Glow Aura on Cake
  function setupCakeAura() {
    const cake = document.querySelector('.cake');
    if (!cake) return;
    const aura = document.createElement('div');
    aura.className = 'candle-glow-aura';
    cake.appendChild(aura);

    // Show aura when candle is lit
    const candleBtn = document.getElementById('light_candle');
    if (candleBtn) {
      candleBtn.addEventListener('click', () => {
        setTimeout(() => {
          $('.candle-glow-aura').fadeIn('slow');
          launchConfetti(width * 0.5, height * 0.5, 40, { angle: -90, spread: 80, velocity: 25 });
        }, 300);
      });
    }
  }

  // 6. Interactive Click Sparkle Trails
  window.addEventListener('click', (e) => {
    // Don't trigger if clicked on a button or lightbox
    if (e.target.closest('button') || e.target.closest('.lightbox')) return;
    for (let i = 0; i < 8; i++) {
      const angle = Math.random() * 360;
      const rad = (angle * Math.PI) / 180;
      const speed = Math.random() * 10 + 4;
      activeConfetti.push({
        x: e.clientX,
        y: e.clientY,
        vx: Math.cos(rad) * speed,
        vy: Math.sin(rad) * speed,
        size: Math.random() * 5 + 3,
        color: '#ffea79',
        rotation: 0,
        rotationSpeed: 5,
        gravity: 0.3,
        drag: 0.9,
        wobble: 0,
        wobbleSpeed: 0.1,
        opacity: 0.9,
        shape: 'circle'
      });
    }
  });

  // 7. Event Hooks for Button Sequences
  document.addEventListener('DOMContentLoaded', () => {
    setupMusicWidget();
    setupCakeAura();

    // Balloons flying -> Confetti Blast
    const balloonBtn = document.getElementById('balloons_flying');
    if (balloonBtn) {
      balloonBtn.addEventListener('click', () => {
        setTimeout(fireDualCannons, 500);
        setTimeout(fireDualCannons, 1800);
      });
    }

    // Wish message -> Star Shower
    const wishBtn = document.getElementById('wish_message');
    if (wishBtn) {
      wishBtn.addEventListener('click', () => {
        setTimeout(() => {
          launchConfetti(width * 0.5, height * 0.4, 80, { angle: -90, spread: 120, velocity: 35 });
        }, 500);
      });
    }

    // Story sequence -> Grand Finale Confetti Celebration
    const storyBtn = document.getElementById('story');
    if (storyBtn) {
      storyBtn.addEventListener('click', () => {
        const messages = document.querySelectorAll('.message p');
        const lastMessage = messages[messages.length - 1];

        if (lastMessage) {
          // Observe when last message becomes visible
          const observer = new MutationObserver(() => {
            if (window.getComputedStyle(lastMessage).display !== 'none') {
              observer.disconnect();

              // Grand Celebratory Confetti Fireworks!
              let count = 0;
              const interval = setInterval(() => {
                fireDualCannons();
                launchConfetti(
                  width * (0.3 + Math.random() * 0.4),
                  height * 0.7,
                  70,
                  { angle: -90, spread: 100, velocity: 45 }
                );
                count++;
                if (count >= 5) clearInterval(interval);
              }, 600);
            }
          });

          observer.observe(lastMessage, { attributes: true, attributeFilter: ['style', 'class'] });
        }
      });
    }
  });
})();
