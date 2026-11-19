(() => {
  const root = document.documentElement;
  if (root.dataset.openingPhase) return;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const started = performance.now();
  const skipEvents = ["pointerdown", "keydown", "scroll", "resize"];
  let frame;
  let flight;
  let veil;
  let revealTimer;
  let finishTimer;
  let finished = false;

  function announce(phase) {
    root.dataset.openingPhase = phase;
    document.dispatchEvent(new Event("villanueva:opening"));
  }

  function finish() {
    if (finished) return;
    finished = true;
    announce("done");
    root.removeAttribute("data-opening-playing");
    cancelAnimationFrame(frame);
    clearTimeout(revealTimer);
    clearTimeout(finishTimer);
    if (flight) {
      flight.onfinish = null;
      flight.cancel();
      veil.cancel();
    }
    for (const event of skipEvents) window.removeEventListener(event, finish);
    reduced.removeEventListener("change", finish);
    document.removeEventListener("visibilitychange", onVisibility);
  }

  function onVisibility() {
    if (document.hidden) finish();
  }

  function start() {
    if (finished) return;
    const hash = window.location.hash;
    if (reduced.matches || document.hidden || window.scrollY > 0 || (hash && hash !== "#inicio")) {
      finish();
      return;
    }

    const overlay = document.querySelector(".landingOpening");
    if (!overlay && document.readyState !== "loading") {
      finish();
      return;
    }
    const card = overlay?.querySelector(".openingCard");
    const destination = document.getElementById("ubicacion");
    const scale = card && parseFloat(getComputedStyle(card).getPropertyValue("--opening-scale"));
    const overlayStyle = overlay && getComputedStyle(overlay);
    const duration = overlayStyle && parseFloat(overlayStyle.getPropertyValue("--opening-duration"));
    if (!destination || !scale || !duration) {
      if (performance.now() - started < 2900) frame = requestAnimationFrame(start);
      else finish();
      return;
    }
    if (typeof card.animate !== "function" || overlayStyle.opacity !== "1") {
      finish();
      return;
    }

    const time = (name) => parseFloat(overlayStyle.getPropertyValue("--opening-" + name));
    const cardDelay = time("card-delay");
    const appearDuration = time("card-appear");
    const flyAt = time("fly-at");
    const revealDelay = flyAt - 80;
    const travelDuration = duration - cardDelay;
    const clock = overlay.getAnimations().find((animation) => animation.animationName === "opening-fallback");
    const resumeAt = Math.min(revealDelay, Math.max(0, clock?.currentTime ?? 0));
    const target = destination.getBoundingClientRect();
    root.dataset.openingPlaying = "";
    const source = card.getBoundingClientRect();
    const x = target.left + target.width / 2 - (source.left + source.width / 2);
    const y = target.bottom - source.bottom;
    const fitX = target.width / source.width;
    const fitY = target.height / source.height;
    const bottomCenter = `translateY(0px) scale(${scale})`;

    flight = card.animate([
      { opacity: 0, transform: `translateY(40px) scale(${scale * 0.91})`, easing: "ease-out" },
      { opacity: 1, transform: bottomCenter, offset: appearDuration / travelDuration },
      {
        opacity: 1,
        transform: bottomCenter,
        offset: (flyAt - cardDelay) / travelDuration,
        easing: "cubic-bezier(0.43, 0.08, 0.24, 1)",
      },
      { opacity: 1, transform: `translate(${x}px, ${y}px) scale(${fitX}, ${fitY})` },
    ], { delay: cardDelay, duration: travelDuration, fill: "both" });
    veil = overlay.querySelector(".openingVeil").animate([{ opacity: 1 }, { opacity: 0 }], {
      delay: revealDelay,
      duration: duration - revealDelay - 100,
      easing: "ease-in-out",
      fill: "both",
    });
    flight.currentTime = resumeAt;
    veil.currentTime = resumeAt;
    flight.onfinish = finish;
    revealTimer = setTimeout(() => announce("revealing"), revealDelay - resumeAt);
    finishTimer = setTimeout(finish, duration - resumeAt + 450);
  }

  announce("splash");
  for (const event of skipEvents) {
    window.addEventListener(event, finish, { once: true, passive: true });
  }
  reduced.addEventListener("change", finish);
  document.addEventListener("visibilitychange", onVisibility);
  frame = requestAnimationFrame(start);
})();
