const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const distanceSquared = (ax, ay, bx, by) => {
  const dx = ax - bx;
  const dy = ay - by;
  return dx * dx + dy * dy;
};

export const setupFieldCanvas = () => {
  const canvas = document.querySelector("[data-field-canvas]");
  const isLab = document.body.dataset.page === "lab";

  if (!(canvas instanceof HTMLCanvasElement)) {
    return;
  }

  const context = canvas.getContext("2d");

  if (!context) {
    return;
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pointer = {
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    active: false
  };

  let points = [];
  let labBubbles = [];
  let labVapors = [];
  let rafId = 0;
  let width = 0;
  let height = 0;
  let dpr = 1;

  const createScatter = () => {
    points = [];
    labBubbles = [];
    labVapors = [];

    if (isLab) {
      const bubbleCount = width < 720 ? 18 : width < 1080 ? 24 : 30;
      const vaporCount = width < 720 ? 34 : width < 1080 ? 44 : 56;

      for (let index = 0; index < bubbleCount; index += 1) {
        const originX = Math.random() * width;
        const originY = height + Math.random() * height * 0.35;

        labBubbles.push({
          x: originX,
          y: originY,
          ox: originX,
          oy: originY,
          radius: 10 + Math.random() * 22,
          stretchX: 0.86 + Math.random() * 0.3,
          stretchY: 1.02 + Math.random() * 0.42,
          speed: 0.22 + Math.random() * 0.42,
          wobble: 10 + Math.random() * 28,
          phase: Math.random() * Math.PI * 2,
          alpha: 0.08 + Math.random() * 0.1,
          glow: 0,
          drift: 0.2 + Math.random() * 0.5
        });
      }

      for (let index = 0; index < vaporCount; index += 1) {
        const originX = Math.random() * width;
        const originY = height * (0.62 + Math.random() * 0.48);

        labVapors.push({
          x: originX,
          y: originY,
          baseX: originX,
          baseY: originY,
          width: 120 + Math.random() * 220,
          height: 48 + Math.random() * 110,
          speed: 0.12 + Math.random() * 0.18,
          phase: Math.random() * Math.PI * 2,
          alpha: 0.05 + Math.random() * 0.05,
          pull: 0
        });
      }

      pointer.x = width * 0.5;
      pointer.y = height * 0.46;
      pointer.targetX = pointer.x;
      pointer.targetY = pointer.y;
      return;
    }

    const area = width * height;
    const targetCount = Math.round(area / (width < 720 ? 4700 : width < 1080 ? 4300 : 3900));
    const minDistance = width < 720 ? 18 : width < 1080 ? 20 : 22;
    const maxAttempts = targetCount * 36;
    const minDistanceSquared = minDistance * minDistance;

    let attempts = 0;

    while (points.length < targetCount && attempts < maxAttempts) {
      attempts += 1;

      const x = Math.random() * width;
      const y = Math.random() * height;

      let isValid = true;

      for (let index = 0; index < points.length; index += 1) {
        const point = points[index];

        if (distanceSquared(x, y, point.ox, point.oy) < minDistanceSquared) {
          isValid = false;
          break;
        }
      }

      if (!isValid) {
        continue;
      }

      const depth = 0.7 + Math.random() * 0.95;
      const isBright = Math.random() < 0.19;
      const size = isBright ? 1.1 + Math.random() * 0.7 : 0.52 + Math.random() * 0.62;
      const baseAlpha = isBright ? 0.13 + Math.random() * 0.12 : 0.045 + Math.random() * 0.08;

      points.push({
        ox: x,
        oy: y,
        x,
        y,
        vx: 0,
        vy: 0,
        floatX: 0.03 + Math.random() * 0.16,
        floatY: 0.03 + Math.random() * 0.16,
        speedX: 0.26 + Math.random() * 0.34,
        speedY: 0.22 + Math.random() * 0.38,
        twinkleSpeed: 0.7 + Math.random() * 0.9,
        phase: Math.random() * Math.PI * 2,
        size,
        baseAlpha,
        alpha: baseAlpha,
        glow: 0,
        depth,
        haloScale: isBright ? 2.9 : 2.2
      });
    }

    pointer.x = width * 0.5;
    pointer.y = height * 0.46;
    pointer.targetX = pointer.x;
    pointer.targetY = pointer.y;
  };

  const resize = () => {
    dpr = clamp(window.devicePixelRatio || 1, 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    createScatter();

    if (reducedMotion) {
      draw(0);
    }
  };

  const drawPoints = (time) => {
    if (isLab) {
      labVapors.forEach((vapor) => {
        const gradient = context.createRadialGradient(
          vapor.x,
          vapor.y,
          0,
          vapor.x,
          vapor.y,
          vapor.width
        );
        gradient.addColorStop(0, `rgba(255, 94, 94, ${vapor.alpha + vapor.pull * 0.08})`);
        gradient.addColorStop(0.35, `rgba(224, 34, 34, ${vapor.alpha * 0.72})`);
        gradient.addColorStop(1, "rgba(30, 0, 0, 0)");
        context.fillStyle = gradient;
        context.beginPath();
        context.ellipse(vapor.x, vapor.y, vapor.width, vapor.height, Math.sin(vapor.phase) * 0.12, 0, Math.PI * 2);
        context.fill();
      });

      labBubbles.forEach((bubble) => {
        const bubbleGlow = bubble.alpha + bubble.glow * 0.08;
        const rx = bubble.radius * bubble.stretchX;
        const ry = bubble.radius * bubble.stretchY;

        context.fillStyle = `rgba(255, 28, 28, ${bubbleGlow * 0.1})`;
        context.beginPath();
        context.ellipse(bubble.x, bubble.y, rx * 1.65, ry * 1.65, Math.sin(bubble.phase) * 0.16, 0, Math.PI * 2);
        context.fill();

        context.strokeStyle = `rgba(255, 128, 128, ${bubbleGlow * 0.75})`;
        context.lineWidth = 1;
        context.beginPath();
        context.ellipse(bubble.x, bubble.y, rx, ry, Math.sin(bubble.phase) * 0.12, 0, Math.PI * 2);
        context.stroke();

        context.strokeStyle = `rgba(255, 240, 240, ${bubbleGlow * 0.34})`;
        context.lineWidth = 0.7;
        context.beginPath();
        context.ellipse(
          bubble.x - rx * 0.08,
          bubble.y - ry * 0.08,
          rx * 0.78,
          ry * 0.78,
          Math.sin(bubble.phase) * 0.12,
          Math.PI * 1.04,
          Math.PI * 1.76
        );
        context.stroke();

        context.fillStyle = `rgba(255, 232, 232, ${bubbleGlow * 0.18})`;
        context.beginPath();
        context.ellipse(
          bubble.x - rx * 0.34,
          bubble.y - ry * 0.32,
          rx * 0.16,
          ry * 0.12,
          -0.35,
          0,
          Math.PI * 2
        );
        context.fill();
      });

      return;
    }

    points.forEach((point) => {
      const twinkle =
        (Math.sin(time * 0.00042 * point.twinkleSpeed + point.phase) + 1) * 0.5;
      const outerAlpha = point.alpha * (0.2 + twinkle * 0.11) + point.glow * 0.16;
      const innerAlpha = point.alpha * (1 + twinkle * 0.18) + point.glow * 0.26;

      const outerColor = isLab ? `rgba(214, 92, 104, ${outerAlpha})` : `rgba(232, 239, 249, ${outerAlpha})`;
      const innerColor = isLab ? `rgba(255, 214, 219, ${innerAlpha})` : `rgba(250, 252, 255, ${innerAlpha})`;

      if (isLab) {
        context.fillStyle = outerColor;
        context.beginPath();
        context.arc(point.x, point.y, point.size * (point.haloScale + point.glow * 1.35), 0, Math.PI * 2);
        context.fill();

        context.fillStyle = innerColor;
        context.fillRect(
          point.x - point.size * (0.5 + point.glow * 0.2),
          point.y - point.size * (0.5 + point.glow * 0.2),
          point.size * (1.1 + point.glow * 0.4),
          point.size * (1.1 + point.glow * 0.4)
        );

        context.fillStyle = `rgba(255, 128, 143, ${point.alpha * 0.12 + point.glow * 0.22})`;
        context.fillRect(point.x - 8, point.y - 0.5, 16, 1);
        context.fillRect(point.x - 0.5, point.y - 8, 1, 16);
      } else {
        context.fillStyle = outerColor;
        context.beginPath();
        context.arc(point.x, point.y, point.size * (point.haloScale + point.glow * 1.1), 0, Math.PI * 2);
        context.fill();

        context.fillStyle = innerColor;
        context.beginPath();
        context.arc(point.x, point.y, point.size * (1 + point.glow * 0.22), 0, Math.PI * 2);
        context.fill();
      }
    });
  };

  function draw(time) {
    context.clearRect(0, 0, width, height);

    pointer.x += (pointer.targetX - pointer.x) * 0.14;
    pointer.y += (pointer.targetY - pointer.y) * 0.14;

    if (isLab) {
      const haze = context.createLinearGradient(0, height, 0, height * 0.2);
      haze.addColorStop(0, "rgba(255, 20, 20, 0.22)");
      haze.addColorStop(0.42, "rgba(160, 12, 12, 0.1)");
      haze.addColorStop(1, "rgba(12, 0, 0, 0)");
      context.fillStyle = haze;
      context.fillRect(0, 0, width, height);

      context.fillStyle = "rgba(255, 60, 60, 0.04)";
      for (let y = 0; y < height; y += 42) {
        context.fillRect(0, y, width, 1);
      }

      const scanY = ((time * 0.08) % (height + 220)) - 110;
      const sweep = context.createLinearGradient(0, scanY - 64, 0, scanY + 64);
      sweep.addColorStop(0, "rgba(255, 76, 76, 0)");
      sweep.addColorStop(0.5, "rgba(255, 92, 92, 0.1)");
      sweep.addColorStop(1, "rgba(255, 76, 76, 0)");
      context.fillStyle = sweep;
      context.fillRect(0, scanY - 64, width, 128);

      const bubbleInfluenceRadius = clamp(Math.min(width, height) * 0.22, 120, 220);

      labVapors.forEach((vapor, index) => {
        const rise = (time * 0.014 * vapor.speed + vapor.phase * 44) % (height + 260);
        vapor.y = height - rise;
        vapor.x =
          vapor.baseX +
          Math.sin(time * 0.00022 + vapor.phase + index * 0.3) * 22 +
          (pointer.active ? (pointer.x - width * 0.5) * 0.018 : 0);
        vapor.pull += ((pointer.active ? 1 : 0) - vapor.pull) * 0.03;
      });

      labBubbles.forEach((bubble, index) => {
        bubble.y -= bubble.speed;
        bubble.x =
          bubble.ox +
          Math.sin(time * 0.0008 * bubble.drift + bubble.phase + index * 0.04) * bubble.wobble;

        if (bubble.y < -bubble.radius * 3) {
          bubble.y = height + bubble.radius * 3 + Math.random() * 80;
          bubble.ox = Math.random() * width;
          bubble.x = bubble.ox;
        }

        let glowTarget = 0;

        if (pointer.active) {
          const dx = bubble.x - pointer.x;
          const dy = bubble.y - pointer.y;
          const distance = Math.hypot(dx, dy) || 1;
          const influence = Math.max(0, 1 - distance / bubbleInfluenceRadius);
          const push = influence * influence * 1.35;

          bubble.x += (dx / distance) * push;
          bubble.y += (dy / distance) * push * 0.45;
          glowTarget = influence;
        }

        bubble.glow += (glowTarget - bubble.glow) * 0.12;
      });

      drawPoints(time);
      return;
    }

    if (pointer.active) {
      const glow = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 160);
      glow.addColorStop(0, isLab ? "rgba(224, 98, 112, 0.04)" : "rgba(255, 255, 255, 0.02)");
      glow.addColorStop(0.4, isLab ? "rgba(180, 58, 69, 0.028)" : "rgba(175, 189, 214, 0.014)");
      glow.addColorStop(1, "rgba(7, 8, 11, 0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);
    }

    const influenceRadius = clamp(Math.min(width, height) * (isLab ? 0.16 : 0.18), 92, isLab ? 152 : 164);
    const wave = time * 0.00004;

    points.forEach((point) => {
      const baseX =
        point.ox +
        Math.sin(wave * point.speedX + point.phase) * point.floatX +
        Math.sin(wave * point.speedX * 0.37 + point.phase * 0.63) * point.floatX * 0.3;
      const baseY =
        point.oy +
        Math.sin(wave * point.speedY + point.phase * 1.37) * point.floatY +
        Math.sin(wave * point.speedY * 0.41 + point.phase * 0.91) * point.floatY * 0.28;

      let emphasis = 0;

      point.vx += (baseX - point.x) * 0.018;
      point.vy += (baseY - point.y) * 0.018;

      if (pointer.active) {
        const dx = point.x - pointer.x;
        const dy = point.y - pointer.y;
        const distance = Math.hypot(dx, dy) || 1;
        const influence = Math.max(0, 1 - distance / influenceRadius);
        const push = influence * influence * (isLab ? 1.1 + point.depth * 0.56 : 0.72 + point.depth * 0.44);

        point.vx += (dx / distance) * push;
        point.vy += (dy / distance) * push;
        emphasis = influence * (isLab ? 0.24 : 0.16);
        point.glow += (influence - point.glow) * (isLab ? 0.28 : 0.2);
      } else {
        point.glow += (0 - point.glow) * 0.12;
      }

      point.vx *= isLab ? 0.86 : 0.9;
      point.vy *= isLab ? 0.86 : 0.9;
      point.x += point.vx;
      point.y += point.vy;
      point.alpha = point.baseAlpha + emphasis;
    });

    drawPoints(time);
  }

  const animate = (time) => {
    draw(time);
    rafId = window.requestAnimationFrame(animate);
  };

  const onPointerMove = (event) => {
    pointer.targetX = event.clientX;
    pointer.targetY = event.clientY;
    pointer.active = true;
  };

  const onPointerLeave = () => {
    pointer.active = false;
    pointer.targetX = width * 0.5;
    pointer.targetY = height * 0.46;
  };

  resize();
  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("pointerleave", onPointerLeave);

  if (reducedMotion) {
    draw(0);
    return;
  }

  rafId = window.requestAnimationFrame(animate);

  window.addEventListener("beforeunload", () => {
    window.cancelAnimationFrame(rafId);
    window.removeEventListener("resize", resize);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerleave", onPointerLeave);
  });
};
