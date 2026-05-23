const orbitSettings = {
  about: {
    radiusX: 135,
    radiusY: 50,
    rotation: -8,
    offsetX: -6,
    offsetY: 2,
    speed: 0.00008,
    start: 0.4
  },
  lab: {
    radiusX: 300,
    radiusY: 100,
    rotation: -8,
    offsetX: 8,
    offsetY: -4,
    speed: -0.00009,
    start: 2.2
  },
  blog: {
  radiusX: 400,
  radiusY: 165,
  rotation: -8,
  offsetX: 0,
  offsetY: 6,
  speed: 0.00004,
  start: 4.1
}
};

export const initOrbitalNavigation = () => {
  const root = document.querySelector("[data-orbital-nav]");

  if (!root) return;

  const items = [...root.querySelectorAll("[data-orbit-item]")];

  if (!items.length) return;

  const startTime = performance.now();

  const animate = (time) => {
    const elapsed = time - startTime;

    items.forEach((item) => {
      const orbitName = item.dataset.orbit;
      const settings = orbitSettings[orbitName];
      const marker = item.querySelector(".orbital-marker");

      if (!settings || !marker) return;

      const angle = settings.start + elapsed * settings.speed;
      const x = Math.cos(angle) * settings.radiusX;
      const y = Math.sin(angle) * settings.radiusY;

      item.style.width = `${settings.radiusX * 2}px`;
      item.style.height = `${settings.radiusY * 2}px`;
      item.style.transform = `
        translate(
          calc(-50% + ${settings.offsetX}px),
          calc(-50% + ${settings.offsetY}px)
        )
        rotate(${settings.rotation}deg)
      `;

      marker.style.left = "50%";
      marker.style.top = "50%";
      marker.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });

    requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
};