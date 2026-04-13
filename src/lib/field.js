const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const distanceSquared = (ax, ay, bx, by) => {
  const dx = ax - bx;
  const dy = ay - by;
  return dx * dx + dy * dy;
};

let activeFieldCleanup = null;

const roundedRectPath = (context, x, y, width, height, radius) => {
  const r = Math.min(radius, width * 0.5, height * 0.5);

  context.beginPath();
  context.moveTo(x + r, y);
  context.lineTo(x + width - r, y);
  context.quadraticCurveTo(x + width, y, x + width, y + r);
  context.lineTo(x + width, y + height - r);
  context.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  context.lineTo(x + r, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - r);
  context.lineTo(x, y + r);
  context.quadraticCurveTo(x, y, x + r, y);
  context.closePath();
};

const drawTube = (context, vessel, time) => {
  const width = vessel.width;
  const height = vessel.height;
  const left = -width / 2;
  const top = -height / 2;
  const shimmer = (Math.sin(time * 0.0012 + vessel.phase) + 1) * 0.5;

  roundedRectPath(context, left, top, width, height, width * 0.42);
  context.fillStyle = "rgba(255, 255, 255, 0.02)";
  context.fill();

  context.save();
  roundedRectPath(context, left, top, width, height, width * 0.42);
  context.clip();
  const liquidTop = top + height * (1 - vessel.fill);
  const liquid = context.createLinearGradient(0, liquidTop, 0, top + height);
  liquid.addColorStop(0, "rgba(255, 116, 116, 0.24)");
  liquid.addColorStop(0.35, "rgba(255, 58, 58, 0.44)");
  liquid.addColorStop(1, "rgba(215, 18, 18, 0.84)");
  context.fillStyle = liquid;
  context.fillRect(left + 2, liquidTop, width - 4, top + height - liquidTop + 2);
  context.restore();

  context.strokeStyle = `rgba(255, 234, 234, ${0.18 + shimmer * 0.08})`;
  context.lineWidth = 1.3;
  roundedRectPath(context, left, top, width, height, width * 0.42);
  context.stroke();

  context.strokeStyle = `rgba(255, 116, 116, ${0.1 + shimmer * 0.05})`;
  context.beginPath();
  context.ellipse(0, top + 6, width * 0.42, 4, 0, 0, Math.PI * 2);
  context.stroke();

  context.strokeStyle = "rgba(255, 255, 255, 0.08)";
  context.lineWidth = 0.8;
  context.beginPath();
  context.moveTo(left + width * 0.2, top + 12);
  context.lineTo(left + width * 0.2, top + height * 0.62);
  context.stroke();
};

const drawBeaker = (context, vessel, time) => {
  const width = vessel.width;
  const height = vessel.height;
  const left = -width / 2;
  const top = -height / 2;
  const shimmer = (Math.sin(time * 0.0013 + vessel.phase) + 1) * 0.5;

  context.beginPath();
  context.moveTo(left + width * 0.12, top);
  context.lineTo(left + width * 0.88, top);
  context.lineTo(left + width * 0.76, top + height);
  context.lineTo(left + width * 0.24, top + height);
  context.closePath();
  context.fillStyle = "rgba(255, 255, 255, 0.016)";
  context.fill();

  context.save();
  context.beginPath();
  context.moveTo(left + width * 0.12, top);
  context.lineTo(left + width * 0.88, top);
  context.lineTo(left + width * 0.76, top + height);
  context.lineTo(left + width * 0.24, top + height);
  context.closePath();
  context.clip();
  const liquidTop = top + height * (1 - vessel.fill);
  const liquid = context.createLinearGradient(0, liquidTop, 0, top + height);
  liquid.addColorStop(0, "rgba(255, 104, 104, 0.24)");
  liquid.addColorStop(0.4, "rgba(255, 48, 48, 0.46)");
  liquid.addColorStop(1, "rgba(204, 12, 12, 0.82)");
  context.fillStyle = liquid;
  context.fillRect(left + width * 0.18, liquidTop, width * 0.64, top + height - liquidTop + 2);
  context.restore();

  context.strokeStyle = `rgba(255, 236, 236, ${0.18 + shimmer * 0.08})`;
  context.lineWidth = 1.3;
  context.beginPath();
  context.moveTo(left + width * 0.12, top);
  context.lineTo(left + width * 0.88, top);
  context.lineTo(left + width * 0.76, top + height);
  context.lineTo(left + width * 0.24, top + height);
  context.closePath();
  context.stroke();
};

const drawFlask = (context, vessel, time) => {
  const width = vessel.width;
  const height = vessel.height;
  const shimmer = (Math.sin(time * 0.0011 + vessel.phase) + 1) * 0.5;

  context.beginPath();
  context.moveTo(-width * 0.1, -height * 0.5);
  context.lineTo(width * 0.1, -height * 0.5);
  context.lineTo(width * 0.16, -height * 0.12);
  context.bezierCurveTo(width * 0.44, 0, width * 0.5, height * 0.28, width * 0.22, height * 0.5);
  context.lineTo(-width * 0.22, height * 0.5);
  context.bezierCurveTo(-width * 0.5, height * 0.28, -width * 0.44, 0, -width * 0.16, -height * 0.12);
  context.closePath();
  context.fillStyle = "rgba(255, 255, 255, 0.018)";
  context.fill();

  context.save();
  context.clip();
  const liquidTop = height * (0.5 - vessel.fill * 0.56);
  const liquid = context.createLinearGradient(0, liquidTop, 0, height * 0.5);
  liquid.addColorStop(0, "rgba(255, 116, 116, 0.24)");
  liquid.addColorStop(0.38, "rgba(255, 56, 56, 0.46)");
  liquid.addColorStop(1, "rgba(212, 16, 16, 0.84)");
  context.fillStyle = liquid;
  context.beginPath();
  context.moveTo(-width * 0.3, liquidTop + 12);
  context.quadraticCurveTo(0, liquidTop - 6, width * 0.3, liquidTop + 12);
  context.lineTo(width * 0.34, height * 0.56);
  context.lineTo(-width * 0.34, height * 0.56);
  context.closePath();
  context.fill();
  context.restore();

  context.strokeStyle = `rgba(255, 236, 236, ${0.18 + shimmer * 0.08})`;
  context.lineWidth = 1.3;
  context.beginPath();
  context.moveTo(-width * 0.1, -height * 0.5);
  context.lineTo(width * 0.1, -height * 0.5);
  context.lineTo(width * 0.16, -height * 0.12);
  context.bezierCurveTo(width * 0.44, 0, width * 0.5, height * 0.28, width * 0.22, height * 0.5);
  context.lineTo(-width * 0.22, height * 0.5);
  context.bezierCurveTo(-width * 0.5, height * 0.28, -width * 0.44, 0, -width * 0.16, -height * 0.12);
  context.closePath();
  context.stroke();
};

const drawRoundFlask = (context, vessel, time) => {
  const width = vessel.width;
  const height = vessel.height;
  const shimmer = (Math.sin(time * 0.00105 + vessel.phase) + 1) * 0.5;
  const bulbRadiusX = width * 0.42;
  const bulbRadiusY = height * 0.32;
  const bulbCenterY = height * 0.12;

  context.fillStyle = "rgba(255, 255, 255, 0.018)";
  context.beginPath();
  context.ellipse(0, bulbCenterY, bulbRadiusX, bulbRadiusY, 0, 0, Math.PI * 2);
  context.fill();

  roundedRectPath(context, -width * 0.1, -height * 0.54, width * 0.2, height * 0.42, width * 0.08);
  context.fillStyle = "rgba(255, 255, 255, 0.014)";
  context.fill();

  context.save();
  context.beginPath();
  context.ellipse(0, bulbCenterY, bulbRadiusX, bulbRadiusY, 0, 0, Math.PI * 2);
  context.clip();
  const liquidTop = bulbCenterY + bulbRadiusY * (0.4 - vessel.fill);
  const liquid = context.createLinearGradient(0, liquidTop, 0, bulbCenterY + bulbRadiusY);
  liquid.addColorStop(0, "rgba(255, 118, 118, 0.24)");
  liquid.addColorStop(0.4, "rgba(255, 58, 58, 0.44)");
  liquid.addColorStop(1, "rgba(212, 16, 16, 0.82)");
  context.fillStyle = liquid;
  context.fillRect(-bulbRadiusX - 2, liquidTop, bulbRadiusX * 2 + 4, bulbCenterY + bulbRadiusY - liquidTop + 2);
  context.restore();

  context.strokeStyle = `rgba(255, 236, 236, ${0.18 + shimmer * 0.08})`;
  context.lineWidth = 1.25;
  roundedRectPath(context, -width * 0.1, -height * 0.54, width * 0.2, height * 0.42, width * 0.08);
  context.stroke();
  context.beginPath();
  context.ellipse(0, bulbCenterY, bulbRadiusX, bulbRadiusY, 0, 0, Math.PI * 2);
  context.stroke();
};

const drawLabVessel = (context, vessel, time) => {
  context.save();
  context.translate(vessel.x, vessel.y);
  context.rotate(vessel.tilt);
  context.shadowBlur = 18;
  context.shadowColor = "rgba(255, 36, 36, 0.1)";

  if (vessel.kind === "tube") {
    drawTube(context, vessel, time);
  } else if (vessel.kind === "beaker") {
    drawBeaker(context, vessel, time);
  } else if (vessel.kind === "round") {
    drawRoundFlask(context, vessel, time);
  } else {
    drawFlask(context, vessel, time);
  }

  context.shadowBlur = 0;
  context.strokeStyle = "rgba(255, 44, 44, 0.12)";
  context.lineWidth = 1;
  context.beginPath();
  context.ellipse(0, vessel.height * 0.56, vessel.width * 0.52, vessel.width * 0.11, 0, 0, Math.PI * 2);
  context.stroke();
  context.restore();
};

export const setupFieldCanvas = () => {
  if (typeof activeFieldCleanup === "function") {
    activeFieldCleanup();
    activeFieldCleanup = null;
  }

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
  let labSmoke = [];
  let labBubbles = [];
  let labEffervescence = [];
  let labRipples = [];
  let labParticles = [];
  let labFlares = [];
  let rafId = 0;
  let width = 0;
  let height = 0;
  let dpr = 1;

  let isCleanedUp = false;

  const createLabScene = () => {
    const smokeCount = width < 720 ? 22 : width < 1080 ? 32 : 42;
    const bubbleCount = width < 720 ? 10 : width < 1080 ? 14 : 18;
    const effervescenceCount = width < 720 ? 24 : width < 1080 ? 34 : 48;
    const rippleCount = width < 720 ? 3 : 6;
    const particleCount = width < 720 ? 52 : width < 1080 ? 74 : 96;
    const flareCount = width < 720 ? 10 : 16;

    labSmoke = Array.from({ length: smokeCount }, () => {
      const baseX = width * (0.04 + Math.random() * 0.92);
      const baseY = height * (0.6 + Math.random() * 0.34);

      return {
        baseX,
        baseY,
        x: baseX,
        y: baseY,
        radiusX: 100 + Math.random() * 210,
        radiusY: 54 + Math.random() * 140,
        phase: Math.random() * Math.PI * 2,
        drift: 0.22 + Math.random() * 0.36,
        sway: 24 + Math.random() * 50,
        rise: 0.08 + Math.random() * 0.22,
        alpha: 0.05 + Math.random() * 0.08,
        pull: 0,
        depth: 0.7 + Math.random() * 0.9
      };
    });

    const bubbleMinDistance = width < 720 ? 58 : width < 1080 ? 74 : 88;
    const bubbleMinDistanceSquared = bubbleMinDistance * bubbleMinDistance;
    const bubbleBases = [];
    let attempts = 0;

    while (bubbleBases.length < bubbleCount && attempts < bubbleCount * 18) {
      attempts += 1;

      const baseX = width * (0.05 + Math.random() * 0.9);
      const baseY = height * (0.44 + Math.random() * 0.44);

      let valid = true;
      for (let index = 0; index < bubbleBases.length; index += 1) {
        const bubble = bubbleBases[index];
        if (distanceSquared(baseX, baseY, bubble.baseX, bubble.baseY) < bubbleMinDistanceSquared) {
          valid = false;
          break;
        }
      }

      if (!valid) {
        continue;
      }

      bubbleBases.push({
        baseX,
        baseY,
        x: baseX,
        y: baseY,
        size: 3.5 + Math.random() * 9,
        speed: 0.22 + Math.random() * 0.58,
        drift: 0.2 + Math.random() * 1.1,
        phase: Math.random() * Math.PI * 2,
        alpha: 0.12 + Math.random() * 0.18,
        glow: 0.12 + Math.random() * 0.24,
        stretchX: 0.78 + Math.random() * 0.64,
        stretchY: 0.78 + Math.random() * 0.62,
        ringWidth: 0.42 + Math.random() * 0.42,
        highlightShiftX: -0.62 + Math.random() * 1.24,
        highlightShiftY: -0.62 + Math.random() * 1.24,
        highlightSize: 0.06 + Math.random() * 0.2,
        tint: 0.05 + Math.random() * 0.2,
        wobble: 0.14 + Math.random() * 0.36,
        wobblePhase: Math.random() * Math.PI * 2,
        irregularity: 0.03 + Math.random() * 0.12,
        opacityBias: 0.62 + Math.random() * 0.24
      });
    }

    labBubbles = bubbleBases;

    labEffervescence = Array.from({ length: effervescenceCount }, (_, index) => {
      const anchor = labBubbles[index % Math.max(1, labBubbles.length)] || {
        baseX: width * Math.random(),
        baseY: height * (0.48 + Math.random() * 0.34),
        size: 8
      };

      return {
        baseX: anchor.baseX + (Math.random() - 0.5) * 40,
        baseY: anchor.baseY + (Math.random() - 0.5) * 26,
        x: anchor.baseX,
        y: anchor.baseY,
        size: 0.5 + Math.random() * 1.6,
        speed: 0.54 + Math.random() * 1.2,
        drift: 0.32 + Math.random() * 1.1,
        phase: Math.random() * Math.PI * 2,
        alpha: 0.22 + Math.random() * 0.34,
        glow: 0.18 + Math.random() * 0.3,
        tint: 0.1 + Math.random() * 0.18
      };
    });

    labRipples = Array.from({ length: rippleCount }, () => ({
      x: width * (0.1 + Math.random() * 0.8),
      y: height * (0.12 + Math.random() * 0.36),
      baseRadius: 38 + Math.random() * 90,
      speed: 0.16 + Math.random() * 0.2,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.04 + Math.random() * 0.04
    }));

    labParticles = Array.from({ length: particleCount }, (_, index) => {
      const anchor = labBubbles[index % labBubbles.length] || {
        x: width * 0.5,
        y: height * 0.82,
        size: 14
      };

      return {
        x: anchor.x + (Math.random() - 0.5) * anchor.size * 0.9,
        y: anchor.y + Math.random() * 44,
        baseX: anchor.x,
        baseY: anchor.y,
        size: 0.8 + Math.random() * 2.2,
        speed: 0.44 + Math.random() * 0.86,
        drift: 8 + Math.random() * 22,
        phase: Math.random() * Math.PI * 2,
        alpha: 0.14 + Math.random() * 0.24
      };
    });

    labFlares = Array.from({ length: flareCount }, () => ({
      x: width * (0.06 + Math.random() * 0.88),
      y: height * (0.04 + Math.random() * 0.5),
      radius: 8 + Math.random() * 26,
      alpha: 0.04 + Math.random() * 0.08,
      phase: Math.random() * Math.PI * 2,
      drift: 0.14 + Math.random() * 0.18
    }));
  };

  const createScatter = () => {
    points = [];
    labSmoke = [];
    labBubbles = [];
    labEffervescence = [];
    labRipples = [];
    labParticles = [];
    labFlares = [];

    if (isLab) {
      createLabScene();
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

  const drawLabScene = (time) => {
    const backdrop = context.createLinearGradient(0, 0, 0, height);
    backdrop.addColorStop(0, "rgba(12, 2, 4, 0.08)");
    backdrop.addColorStop(0.42, "rgba(44, 4, 6, 0.12)");
    backdrop.addColorStop(1, "rgba(120, 6, 10, 0.2)");
    context.fillStyle = backdrop;
    context.fillRect(0, 0, width, height);

    const sideGlow = context.createLinearGradient(0, 0, width, 0);
    sideGlow.addColorStop(0, "rgba(255, 44, 44, 0.06)");
    sideGlow.addColorStop(0.5, "rgba(255, 44, 44, 0)");
    sideGlow.addColorStop(1, "rgba(255, 44, 44, 0.04)");
    context.fillStyle = sideGlow;
    context.fillRect(0, 0, width, height);

    context.fillStyle = "rgba(255, 76, 76, 0.03)";
    for (let y = 0; y < height; y += 34) {
      context.fillRect(0, y, width, 1);
    }

    labFlares.forEach((flare, index) => {
      const driftX = Math.sin(time * 0.0002 * flare.drift + flare.phase + index * 0.14) * 10;
      const driftY = Math.cos(time * 0.00024 * flare.drift + flare.phase) * 8;
      const gradient = context.createRadialGradient(
        flare.x + driftX,
        flare.y + driftY,
        0,
        flare.x + driftX,
        flare.y + driftY,
        flare.radius
      );
      gradient.addColorStop(0, `rgba(255, 92, 92, ${flare.alpha})`);
      gradient.addColorStop(0.45, `rgba(255, 40, 40, ${flare.alpha * 0.5})`);
      gradient.addColorStop(1, "rgba(255, 20, 20, 0)");
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(flare.x + driftX, flare.y + driftY, flare.radius, 0, Math.PI * 2);
      context.fill();
    });

    const verticalSweepX = ((time * 0.06) % (width + 260)) - 130;
    const sonar = context.createLinearGradient(verticalSweepX - 88, 0, verticalSweepX + 88, 0);
    sonar.addColorStop(0, "rgba(255, 82, 82, 0)");
    sonar.addColorStop(0.5, "rgba(255, 102, 102, 0.1)");
    sonar.addColorStop(1, "rgba(255, 82, 82, 0)");
    context.fillStyle = sonar;
    context.fillRect(verticalSweepX - 88, 0, 176, height);

    const smokeInfluenceRadius = clamp(Math.min(width, height) * 0.28, 140, 260);

    labSmoke.forEach((smoke, index) => {
      const lift = (time * 0.011 * smoke.rise + smoke.phase * 18) % (height * 0.52 + smoke.radiusY * 2.2);
      smoke.y = smoke.baseY - lift;
      smoke.x =
        smoke.baseX +
        Math.sin(time * 0.00024 * smoke.drift + smoke.phase + index * 0.2) * smoke.sway;

      let pullTarget = 0;

      if (pointer.active) {
        const dx = pointer.x - smoke.x;
        const dy = pointer.y - smoke.y;
        const distance = Math.hypot(dx, dy) || 1;
        const influence = Math.max(0, 1 - distance / smokeInfluenceRadius);
        smoke.x -= (dx / distance) * influence * influence * (22 + smoke.depth * 10);
        smoke.y -= (dy / distance) * influence * (6 + smoke.depth * 3.4);
        pullTarget = influence;
      }

      smoke.pull += (pullTarget - smoke.pull) * 0.08;

      if (smoke.y < -smoke.radiusY * 1.8) {
        smoke.baseY = height * (0.72 + Math.random() * 0.22);
        smoke.baseX = width * (0.04 + Math.random() * 0.92);
        smoke.y = smoke.baseY;
        smoke.x = smoke.baseX;
      }

      const gradient = context.createRadialGradient(smoke.x, smoke.y, 0, smoke.x, smoke.y, smoke.radiusX);
      gradient.addColorStop(0, `rgba(255, 122, 122, ${smoke.alpha + smoke.pull * 0.1})`);
      gradient.addColorStop(0.22, `rgba(236, 46, 46, ${smoke.alpha * 0.96})`);
      gradient.addColorStop(0.6, `rgba(126, 10, 10, ${smoke.alpha * 0.58})`);
      gradient.addColorStop(1, "rgba(30, 0, 0, 0)");
      context.fillStyle = gradient;
      context.beginPath();
      context.ellipse(
        smoke.x,
        smoke.y,
        smoke.radiusX,
        smoke.radiusY,
        Math.sin(smoke.phase) * 0.12,
        0,
        Math.PI * 2
      );
      context.fill();
    });

    labBubbles.forEach((bubble, index) => {
      const lift = (time * 0.00042 * bubble.speed + bubble.phase * 28) % (height * 0.52 + 220);
      bubble.y = bubble.baseY - lift;
      bubble.x =
        bubble.baseX +
        Math.sin(time * 0.00026 * bubble.drift + bubble.phase + index * 0.16) * 18;

      if (pointer.active) {
        const dx = bubble.x - pointer.x;
        const dy = bubble.y - pointer.y;
        const distance = Math.hypot(dx, dy) || 1;
        const influence = Math.max(0, 1 - distance / 180);
        bubble.x += (dx / distance) * influence * (12 + bubble.size * 0.34);
        bubble.y += (dy / distance) * influence * (5 + bubble.size * 0.16);
        bubble.alpha = 0.22 + influence * 0.34;
        bubble.glow = 0.24 + influence * 0.42;
      } else {
        bubble.alpha += (bubble.opacityBias - bubble.alpha) * 0.06;
        bubble.glow += (0.24 - bubble.glow) * 0.08;
      }

      if (bubble.y < -bubble.size * 3) {
        bubble.baseY = height * (0.62 + Math.random() * 0.22);
        bubble.baseX = width * (0.06 + Math.random() * 0.88);
        bubble.y = bubble.baseY;
        bubble.x = bubble.baseX;
      }

      const wobbleX = Math.sin(time * 0.00058 * bubble.wobble + bubble.wobblePhase) * bubble.size * bubble.irregularity;
      const wobbleY = Math.cos(time * 0.00052 * bubble.wobble + bubble.wobblePhase * 0.8) * bubble.size * bubble.irregularity;
      const radiusX = bubble.size * bubble.stretchX + wobbleX * 0.35;
      const radiusY = bubble.size * bubble.stretchY + wobbleY * 0.35;
      const rotation = Math.sin(bubble.phase * 0.6 + time * 0.00018) * 0.3;
      const strokeWidth = 0.8 + bubble.ringWidth * 0.7;

      context.save();
      context.translate(bubble.x, bubble.y);
      context.rotate(rotation);

      context.strokeStyle = `rgba(255, 214, 214, ${bubble.alpha * 0.72})`;
      context.lineWidth = strokeWidth;
      context.beginPath();
      context.ellipse(0, 0, radiusX, radiusY, 0, 0, Math.PI * 2);
      context.stroke();

      const bubbleGlow = context.createRadialGradient(
        wobbleX * 0.18,
        wobbleY * 0.18,
        0,
        wobbleX * 0.18,
        wobbleY * 0.18,
        bubble.size * (3.1 + bubble.glow * 0.4)
      );
      bubbleGlow.addColorStop(0, `rgba(255, 142, 142, ${bubble.glow * 0.78})`);
      bubbleGlow.addColorStop(0.28, `rgba(255, 64, 64, ${bubble.glow * 0.4})`);
      bubbleGlow.addColorStop(1, "rgba(30, 0, 0, 0)");
      context.fillStyle = bubbleGlow;
      context.beginPath();
      context.arc(0, 0, bubble.size * (3.1 + bubble.glow * 0.4), 0, Math.PI * 2);
      context.fill();

      const highlightX = radiusX * bubble.highlightShiftX;
      const highlightY = radiusY * bubble.highlightShiftY;
      context.fillStyle = `rgba(255, 248, 248, ${bubble.alpha * (0.18 + bubble.tint)})`;
      context.beginPath();
      context.ellipse(
        highlightX,
        highlightY,
        bubble.size * bubble.highlightSize,
        bubble.size * bubble.highlightSize * 0.72,
        rotation * -0.5,
        0,
        Math.PI * 2
      );
      context.fill();
      context.restore();
    });

    labEffervescence.forEach((spark, index) => {
      const lift = (time * 0.0012 * spark.speed + spark.phase * 22) % (height * 0.52 + 180);
      spark.y = spark.baseY - lift;
      spark.x =
        spark.baseX +
        Math.sin(time * 0.0009 * spark.drift + spark.phase + index * 0.12) * 14;

      if (pointer.active) {
        const dx = spark.x - pointer.x;
        const dy = spark.y - pointer.y;
        const distance = Math.hypot(dx, dy) || 1;
        const influence = Math.max(0, 1 - distance / 150);
        spark.x += (dx / distance) * influence * 7;
        spark.y += (dy / distance) * influence * 4;
        spark.glow = 0.22 + influence * 0.38;
        spark.alpha = 0.18 + influence * 0.32;
      } else {
        spark.glow += (0.2 - spark.glow) * 0.08;
        spark.alpha += (0.24 - spark.alpha) * 0.05;
      }

      if (spark.y < -20) {
        const anchor = labBubbles[index % Math.max(1, labBubbles.length)] || {
          baseX: width * Math.random(),
          baseY: height * 0.7,
          size: 8
        };

        spark.baseX = anchor.baseX + (Math.random() - 0.5) * 40;
        spark.baseY = anchor.baseY + (Math.random() - 0.5) * 24;
        spark.x = spark.baseX;
        spark.y = spark.baseY;
        spark.speed = 0.54 + Math.random() * 1.2;
        spark.size = 0.5 + Math.random() * 1.6;
      }

      const halo = context.createRadialGradient(spark.x, spark.y, 0, spark.x, spark.y, spark.size * 7);
      halo.addColorStop(0, `rgba(255, 198, 198, ${spark.alpha * 0.62})`);
      halo.addColorStop(0.28, `rgba(255, 84, 84, ${spark.glow * 0.42})`);
      halo.addColorStop(1, "rgba(30, 0, 0, 0)");
      context.fillStyle = halo;
      context.beginPath();
      context.arc(spark.x, spark.y, spark.size * 7, 0, Math.PI * 2);
      context.fill();

      context.fillStyle = `rgba(255, 248, 248, ${spark.alpha * (0.22 + spark.tint)})`;
      context.beginPath();
      context.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
      context.fill();
    });

    labRipples.forEach((ripple, index) => {
      const pulse = (time * 0.0012 * ripple.speed + ripple.phase + index * 0.2) % 1;
      const radius = ripple.baseRadius + pulse * 180;
      const alpha = ripple.alpha * (1 - pulse);

      context.strokeStyle = `rgba(255, 88, 88, ${alpha})`;
      context.lineWidth = 1;
      context.beginPath();
      context.arc(ripple.x, ripple.y, radius, 0, Math.PI * 2);
      context.stroke();
    });

    labParticles.forEach((particle, index) => {
      particle.y -= particle.speed;
      particle.x =
        particle.baseX +
        Math.sin(time * 0.0009 + particle.phase + index * 0.12) * particle.drift;

      if (pointer.active) {
        const dx = particle.x - pointer.x;
        const dy = particle.y - pointer.y;
        const distance = Math.hypot(dx, dy) || 1;
        const influence = Math.max(0, 1 - distance / 120);
        particle.x += (dx / distance) * influence * 1.8;
        particle.y += (dy / distance) * influence * 0.5;
        particle.alpha = 0.16 + influence * 0.26;
      } else {
        particle.alpha += (0.18 - particle.alpha) * 0.08;
      }

      context.fillStyle = `rgba(255, 192, 192, ${particle.alpha})`;
      context.beginPath();
      context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      context.fill();

      context.fillStyle = `rgba(255, 60, 60, ${particle.alpha * 0.3})`;
      context.beginPath();
      context.arc(particle.x, particle.y, particle.size * 2.4, 0, Math.PI * 2);
      context.fill();

      if (particle.y < -20) {
        const anchor = labBubbles[index % labBubbles.length] || {
          x: width * 0.5,
          y: height * 0.82,
          size: 14
        };

        particle.baseX = anchor.x;
        particle.baseY = anchor.y;
        particle.x = anchor.x + (Math.random() - 0.5) * anchor.size * 0.9;
        particle.y = anchor.y + Math.random() * 44;
        particle.speed = 0.44 + Math.random() * 0.86;
        particle.size = 0.8 + Math.random() * 2.2;
      }
    });

    if (pointer.active) {
      const localGlow = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 180);
      localGlow.addColorStop(0, "rgba(255, 80, 80, 0.16)");
      localGlow.addColorStop(0.24, "rgba(255, 42, 42, 0.08)");
      localGlow.addColorStop(1, "rgba(30, 0, 0, 0)");
      context.fillStyle = localGlow;
      context.fillRect(0, 0, width, height);
    }

    const benchGlow = context.createLinearGradient(0, height, 0, height * 0.52);
    benchGlow.addColorStop(0, "rgba(255, 32, 32, 0.14)");
    benchGlow.addColorStop(0.5, "rgba(255, 32, 32, 0.05)");
    benchGlow.addColorStop(1, "rgba(255, 32, 32, 0)");
    context.fillStyle = benchGlow;
    context.fillRect(0, 0, width, height);

    const fogBank = context.createRadialGradient(width * 0.5, height * 0.98, 0, width * 0.5, height * 0.98, width * 0.74);
    fogBank.addColorStop(0, "rgba(255, 34, 34, 0.18)");
    fogBank.addColorStop(0.28, "rgba(180, 12, 12, 0.12)");
    fogBank.addColorStop(1, "rgba(30, 0, 0, 0)");
    context.fillStyle = fogBank;
    context.fillRect(0, 0, width, height);

    const softFog = context.createLinearGradient(0, 0, 0, height);
    softFog.addColorStop(0, "rgba(10, 1, 1, 0)");
    softFog.addColorStop(0.66, "rgba(10, 1, 1, 0.04)");
    softFog.addColorStop(1, "rgba(10, 1, 1, 0.24)");
    context.fillStyle = softFog;
    context.fillRect(0, 0, width, height);
  };

  const drawPoints = (time) => {
    if (isLab) {
      drawLabScene(time);
      return;
    }

    points.forEach((point) => {
      const twinkle =
        (Math.sin(time * 0.00042 * point.twinkleSpeed + point.phase) + 1) * 0.5;
      const outerAlpha = point.alpha * (0.2 + twinkle * 0.11) + point.glow * 0.16;
      const innerAlpha = point.alpha * (1 + twinkle * 0.18) + point.glow * 0.26;

      const outerColor = `rgba(232, 239, 249, ${outerAlpha})`;
      const innerColor = `rgba(250, 252, 255, ${innerAlpha})`;

      context.fillStyle = outerColor;
      context.beginPath();
      context.arc(point.x, point.y, point.size * (point.haloScale + point.glow * 1.1), 0, Math.PI * 2);
      context.fill();

      context.fillStyle = innerColor;
      context.beginPath();
      context.arc(point.x, point.y, point.size * (1 + point.glow * 0.22), 0, Math.PI * 2);
      context.fill();
    });
  };

  function draw(time) {
    context.clearRect(0, 0, width, height);

    pointer.x += (pointer.targetX - pointer.x) * 0.14;
    pointer.y += (pointer.targetY - pointer.y) * 0.14;

    if (!isLab && pointer.active) {
      const glow = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 160);
      glow.addColorStop(0, "rgba(255, 255, 255, 0.02)");
      glow.addColorStop(0.4, "rgba(175, 189, 214, 0.014)");
      glow.addColorStop(1, "rgba(7, 8, 11, 0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);
    }

    if (!isLab) {
      const influenceRadius = clamp(Math.min(width, height) * 0.18, 92, 164);
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
          const push = influence * influence * (0.72 + point.depth * 0.44);

          point.vx += (dx / distance) * push;
          point.vy += (dy / distance) * push;
          emphasis = influence * 0.16;
          point.glow += (influence - point.glow) * 0.2;
        } else {
          point.glow += (0 - point.glow) * 0.12;
        }

        point.vx *= 0.9;
        point.vy *= 0.9;
        point.x += point.vx;
        point.y += point.vy;
        point.alpha = point.baseAlpha + emphasis;
      });
    }

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

  const cleanup = () => {
    if (isCleanedUp) {
      return;
    }

    isCleanedUp = true;
    window.cancelAnimationFrame(rafId);
    window.removeEventListener("resize", resize);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerleave", onPointerLeave);
    window.removeEventListener("beforeunload", cleanup);

    if (activeFieldCleanup === cleanup) {
      activeFieldCleanup = null;
    }
  };

  activeFieldCleanup = cleanup;

  resize();
  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("pointerleave", onPointerLeave);
  window.addEventListener("beforeunload", cleanup);

  if (reducedMotion) {
    draw(0);
    return;
  }

  rafId = window.requestAnimationFrame(animate);
};
