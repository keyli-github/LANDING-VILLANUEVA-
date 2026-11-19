"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { SiWhatsapp } from "react-icons/si";
import {
  consult,
  consultMessage,
  mail,
  phone,
  address,
  businessHours,
  branches,
  dollarExchangeSubject,
  services,
  destinations,
  reviews,
} from "./data";
import { ExchangeBoard, QuestionsPanel, SendQuote, SendSteps } from "./landing-extras";
import { PrivacyPolicy, TermsAndConditions } from "./legal-documents";
import { WhatsAppLink } from "./whatsapp-tracking";
const asset = (name) => "/media/" + name + ".webp";
const serviceImages = (idx) => services[idx][2]?.images ?? [`s${idx}a`, `s${idx}b`];
const nav = [
  ["inicio", "Inicio"],
  ["servicios", "Servicios"],
  ["destinos", "Destinos"],
  ["testimonios", "Clientes"],
  ["contacto", "Contacto"],
];
function Icon({ name }) {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <use href={"/media/icons.svg#" + name} />
    </svg>
  );
}
function useMotion() {
  const [enabled, set] = useState(false);
  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => set(!mq.matches && !document.hidden);
    sync();
    mq.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      mq.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);
  return enabled;
}
function useVisible(threshold = 0.08) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(null);
  useEffect(() => {
    if (typeof IntersectionObserver !== "function") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.intersectionRatio >= threshold),
      { threshold },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, visible];
}
function useAutoAdvance(active, delay, setIndex, length) {
  useEffect(() => {
    if (!active) return;
    const timer = setInterval(
      () => setIndex((index) => (index + 1) % length),
      delay,
    );
    return () => clearInterval(timer);
  }, [active, delay, setIndex, length]);
}
function watchViewport(update) {
  let frame = null;
  const schedule = () => {
    if (frame !== null) return;
    frame = requestAnimationFrame(() => {
      frame = null;
      update();
    });
  };
  update();
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  return () => {
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
    if (frame !== null) cancelAnimationFrame(frame);
  };
}
function Nav() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("inicio");
  const menuButton = useRef(null);
  const mobileNav = useRef(null);
  useEffect(() => {
    const sections = nav.map(([id]) => document.getElementById(id));
    const root = document.documentElement;
    const update = () => {
      const anchorOffset = parseFloat(getComputedStyle(root).scrollPaddingTop) || 0;
      const readingLine = Math.max(
        anchorOffset + 12,
        Math.min(window.innerHeight * 0.32, 280),
      );
      const active = sections.findLast(
        (section) => section && section.getBoundingClientRect().top <= readingLine,
      );
      const atEnd = window.scrollY + window.innerHeight >= root.scrollHeight - 2;
      const section = active?.id ?? "inicio";
      const atSectionAnchor = window.location.hash === "#" + section;
      setCurrent(atEnd && !atSectionAnchor ? "contacto" : section);
    };
    const stopWatching = watchViewport(update);
    window.addEventListener("hashchange", update);
    return () => {
      stopWatching();
      window.removeEventListener("hashchange", update);
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    mobileNav.current.querySelector("a")?.focus({ preventScroll: true });
    const desktop = matchMedia("(width > 800px)");
    const closeOnDesktop = (event) => {
      if (event.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, [open]);
  const links = nav.map(([id, label]) => (
    <a
      key={id}
      href={"#" + id}
      aria-current={current === id ? "location" : undefined}
      onClick={() => setOpen(false)}
    >
      <span>{label}</span>
    </a>
  ));

  return (
    <header
      className="siteHeader"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          menuButton.current.focus();
        }
      }}
    >
      <a href="#inicio" aria-label="Inicio" onClick={() => setOpen(false)}>
        <img src={asset("logo")} alt="Inversiones Villanueva" />
      </a>
      <nav className="desktopNav" aria-label="Navegación principal">
        {links}
      </nav>
      <button
        type="button"
        className="menu"
        ref={menuButton}
        aria-controls="mobile-nav"
        aria-expanded={open}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="menuBars" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>
      <nav
        id="mobile-nav"
        className="mobileNav"
        aria-label="Navegación móvil"
        ref={mobileNav}
        data-open={open}
        inert={!open}
      >
        {links}
      </nav>
    </header>
  );
}
const slides = [
  [
    "andes",
    "Tu dinero,",
    "más cerca.",
    "Envíos, pagos y más, con la confianza de siempre y la rapidez que necesitas.",
    "Enviar dinero",
    "un envío de dinero",
  ],
  [
    "hero-familia",
    "Tu familia,",
    "más cerca.",
    "Desde Pataz a Chile, Ecuador, Colombia y Venezuela. Elige tu destino y consulta por WhatsApp.",
    "Consultar remesas",
    "remesas internacionales",
  ],
  [
    "hero-cambio",
    "Cambia dólares",
    "en Pataz.",
    "Compra y vende dólares de manera presencial en nuestra agencia.",
    "Consultar cambio",
    dollarExchangeSubject,
  ],
];
const heroMorphDistance = 48;
function Hero({ motion, cardRef, opening, branchSelection, selectBranch }) {
  const [ref, visible] = useVisible();
  const [index, setIndex] = useState(0);
  const [focused, setFocused] = useState(false);
  useAutoAdvance(visible && motion && !focused, 3400, setIndex, slides.length);
  useEffect(() => {
    const hero = ref.current;
    const card = cardRef.current;
    const alignBackdrop = () => {
      const halfHeight = card.getBoundingClientRect().height / 2;
      hero.style.setProperty("--location-overlap", halfHeight + "px");
    };
    alignBackdrop();
    const observer = new ResizeObserver(alignBackdrop);
    observer.observe(card);
    return () => observer.disconnect();
  }, [ref, cardRef]);
  useEffect(() => {
    if (!motion || !visible) return;
    const hero = ref.current;
    return watchViewport(() => {
      const distance = Math.max(0, -hero.getBoundingClientRect().top);
      hero.style.setProperty(
        "--hero-scroll",
        Math.min(distance / heroMorphDistance, 1),
      );
    });
  }, [motion, visible, ref]);
  const [image, title, accent, copy, cta, subject] = slides[index];
  return (
    <section
      className="hero"
      id="inicio"
      ref={ref}
      style={{ "--hero-morph-distance": heroMorphDistance + "px" }}
      aria-label="Servicios destacados"
    >
      <div className="heroFrame">
        <div className="backdrop" aria-hidden="true">
          {slides.map(([file], idx) => (
            <img
              key={file}
              className={idx === index ? "on" : ""}
              data-scene={file}
              alt=""
              src={asset(file)}
              fetchPriority={idx === 0 ? "high" : "low"}
            />
          ))}
        </div>
        <div
          className="heroText"
          key={image}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        >
          <h1>
            {title}
            <br />
            <em>{accent}</em>
          </h1>
          <p>{copy}</p>
          <WhatsAppLink className="cta" origin="portada" service={subject} href={consult(subject)}>
            {cta}
          </WhatsAppLink>
        </div>
        <Location
          motion={motion}
          cardRef={cardRef}
          opening={opening}
          branchSelection={branchSelection}
          selectBranch={selectBranch}
        />
      </div>
    </section>
  );
}
const metrics = [
  ["people", 5000, "Clientes atendidos"],
  ["award", 5, "Años en el mercado"],
  ["globe", 4, "Países de destino"],
  ["clock", 7, "Días de atención"],
];
function Stats({ motion }) {
  const [ref, visible] = useVisible();
  const [progress, setProgress] = useState(0);
  const completed = useRef(false);
  useEffect(() => {
    if (!motion || completed.current) return;
    let frame;
    const start = performance.now();
    const tick = (time) => {
      const p = Math.min(Math.max((time - start) / 1250, 0), 1);
      setProgress(1 - (1 - p) ** 3);
      if (p < 1) frame = requestAnimationFrame(tick);
      else completed.current = true;
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [motion]);
  return (
    <section
      className="reveal"
      data-in-view={visible}
      ref={ref}
      aria-label="Nuestra trayectoria"
    >
      <div className="revealContent stats">
        {metrics.map(([icon, n, label], idx) => {
          const num = motion ? Math.round(n * progress) : n;
          const fmt = (x) =>
            idx === 3
              ? x + "x7"
              : x.toLocaleString("es-PE") + (idx < 2 ? "+" : "");
          return (
            <div key={label}>
              <Icon name={icon} />
              <span>
                <strong aria-label={fmt(n)}>{fmt(num)}</strong>
                <small>{label}</small>
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
function Service({ idx, motion, select }) {
  const [ref, visible] = useVisible();
  const [picture, setPicture] = useState(0);
  const images = serviceImages(idx);
  useAutoAdvance(visible && motion, 2250 + (idx % 4) * 180, setPicture, images.length);
  return (
    <button
      ref={ref}
      className="service"
      data-in-view={visible}
      onClick={() => select(idx)}
      aria-label={"Detalles de " + services[idx][0]}
    >
      <span className="servicePics" aria-hidden="true">
        {["serviceBlur", "serviceSharp"].map((layer) => (
          <span className={layer} key={layer}>
            {images.map((image, i) => (
              <img
                key={image}
                className={i === picture ? "on" : ""}
                loading="lazy"
                src={asset(image)}
                alt=""
              />
            ))}
          </span>
        ))}
      </span>
      <span className="serviceCaption">
        <strong>{services[idx][0]}</strong>
        <span className="more" aria-hidden="true">
          <b />⊕
        </span>
      </span>
    </button>
  );
}
function Modal({ children, close, titleId, className }) {
  const dialog = useRef(null);
  useEffect(() => {
    dialog.current.showModal();
  }, []);
  return (
    <dialog
      ref={dialog}
      className={className}
      aria-labelledby={titleId}
      onClose={close}
      onClick={(e) => {
        if (e.target === e.currentTarget) e.currentTarget.close();
      }}
    >
      <button
        type="button"
        className="dismiss"
        aria-label="Cerrar"
        onClick={() => dialog.current.close()}
      >
        ×
      </button>
      {children}
    </dialog>
  );
}
function ServiceDetail({ idx, close }) {
  const [name, description, options] = services[idx];
  const picture = asset(serviceImages(idx)[0]);
  const subject = options?.subject ?? name.toLowerCase();
  const [attachment, setAttachment] = useState(null);
  const [status, setStatus] = useState("");

  const prepareImage = ({ currentTarget: preview }) => {
    const canShare =
      typeof navigator.share === "function" && typeof navigator.canShare === "function";
    const canCopy =
      typeof ClipboardItem === "function" && typeof navigator.clipboard?.write === "function";
    if (!canShare && !canCopy) return;

    const canvas = document.createElement("canvas");
    canvas.width = preview.naturalWidth;
    canvas.height = preview.naturalHeight;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.drawImage(preview, 0, 0);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], name + ".png", { type: blob.type });
      setAttachment({
        file,
        share: canShare && navigator.canShare({ files: [file] }),
        copy: canCopy,
      });
    }, "image/png");
  };

  const shareImage = async () => {
    try {
      await navigator.share({
        files: [attachment.file],
        text: consultMessage(subject),
      });
    } catch (error) {
      if (error.name === "AbortError") return;
      setAttachment((current) => ({ ...current, share: false }));
      setStatus("Puedes abrir el chat y adjuntar la imagen desde esta ficha.");
    }
  };

  const copyImage = async () => {
    try {
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": attachment.file }),
      ]);
      setStatus("Imagen copiada. Pégala en el chat de WhatsApp.");
    } catch {
      setAttachment((current) => ({ ...current, copy: false }));
      setStatus("Descarga la imagen para adjuntarla en WhatsApp.");
    }
  };

  return (
    <Modal className="serviceDialog" close={close} titleId="service-detail-title">
      <img src={picture} alt={name} onLoad={prepareImage} />
      <div>
        <h2 id="service-detail-title">{name}</h2>
        <p>{description}</p>
        <div className="serviceActions">
          {attachment?.share && (
            <button type="button" className="cta" onClick={shareImage}>
              Compartir imagen y mensaje
            </button>
          )}
          <WhatsAppLink
            className={attachment?.share ? "serviceAction" : "cta"}
            origin="servicios"
            service={name}
            href={consult(subject)}
            target="_blank"
            rel="noopener"
          >
            <Icon name="wa" /> Consultar por WhatsApp
          </WhatsAppLink>
          {!attachment?.share && (
            attachment?.copy ? (
              <button type="button" className="serviceAction" onClick={copyImage}>
                Copiar imagen
              </button>
            ) : (
              <a className="serviceAction" href={picture} download={name + ".webp"}>
                Descargar imagen
              </a>
            )
          )}
        </div>
        <span className="serviceStatus" role="status">{status}</span>
      </div>
    </Modal>
  );
}
function Countries({ onQuote }) {
  return (
    <Reveal id="destinos" className="countries">
      <h2>
        Llegamos a donde
        <br />
        tu familia necesita.
      </h2>
      <p>Enviamos dinero a cuatro países desde Pataz. Elige tu destino para cotizar.</p>
      <div className="destinationRow">
        <div className="destinationTrack">
          {[false, true].map((duplicate) => (
            <div
              className="destinationGroup"
              key={String(duplicate)}
              aria-hidden={duplicate || undefined}
            >
              {destinations.map(([name, currency, code, flag], idx) => (
                <a
                  href="#cotizar"
                  onClick={() => onQuote(flag)}
                  aria-label={`Cotizar envío a ${name} · ${currency} · ${code}`}
                  key={name}
                  className="country"
                  tabIndex={duplicate ? -1 : undefined}
                >
                  <img
                    className="countryPhoto"
                    loading="lazy"
                    src={asset("d" + idx)}
                    alt=""
                  />
                  <div>
                    <strong>
                      <img
                        className="countryFlag"
                        src={asset("flags/" + flag)}
                        alt=""
                        width="26"
                        height="26"
                      />
                      {name}
                    </strong>
                    <small>
                      {currency} · {code}
                    </small>
                  </div>
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
function Reveal({ as: Tag = "section", children, className, threshold, ...props }) {
  const [ref, visible] = useVisible(threshold);
  return (
    <Tag {...props} className="reveal" data-in-view={visible} ref={ref}>
      <div className={"revealContent " + className}>{children}</div>
    </Tag>
  );
}
function ReviewQuote({ text, motion, delay }) {
  const [ref, visible] = useVisible();
  const words = text.match(/\S+\s*|\s+/gu) ?? [];

  return (
    <blockquote
      className="reviewQuote"
      ref={ref}
      data-in-view={motion ? visible : undefined}
      style={{ "--quote-delay": delay + "ms" }}
    >
      {words.map((word, index) => (
        <span
          className="reviewWord"
          key={index}
          style={{ "--quote-word": index }}
        >
          {word}
        </span>
      ))}
    </blockquote>
  );
}
function Testimonials({ motion }) {
  return (
    <section id="testimonios" className="reviews" aria-labelledby="reviews-title">
      <div className="reviewsBanner">
        <div className="reviewsCopy">
          <h2 id="reviews-title">
            Lo que dicen <span>nuestros clientes</span>
          </h2>
          <div className="reviewsList">
            {reviews.map(([name, since, quote], index) => (
              <figure key={name}>
                <span aria-label="5 estrellas">★★★★★</span>
                <ReviewQuote
                  text={"“" + quote + "”"}
                  motion={motion}
                  delay={index * 120}
                />
                <figcaption>
                  <b>{name}</b>
                  <small>Cliente desde {since}</small>
                </figcaption>
              </figure>
            ))}
          </div>
          <WhatsAppLink className="cta reviewsCta" origin="clientes">
            Consultar por WhatsApp <span aria-hidden="true">→</span>
          </WhatsAppLink>
        </div>
      </div>
    </section>
  );
}
function MapOverview({ zoomed = false, onZoom }) {
  return (
    <div className="mapIntro" aria-hidden="true">
      <div className="mapCamera" onAnimationEnd={onZoom}>
        <img
          src={asset("peru-map")}
          alt=""
          width="960"
          height="480"
          decoding="async"
        />
        <span className="mapIntroPoint" />
      </div>
      <span className="mapIntroLabel">{zoomed ? "Pataz" : "Perú"}</span>
    </div>
  );
}
function LocationMap({ branch, motion, opening }) {
  const [ref, visible] = useVisible(0.5);
  const [mapStatus, setMapStatus] = useState("idle");
  const [zoomed, setZoomed] = useState(false);
  useEffect(() => {
    if (visible) setMapStatus((status) => (status === "idle" ? "loading" : status));
  }, [visible]);
  const useOverview = branch.id === "pataz";
  const showIntro = opening || mapStatus !== "ready" || (useOverview && motion && !zoomed);
  return (
    <div
      className="locationMapFrame"
      ref={ref}
      data-in-view={motion ? visible : undefined}
      data-zoomed={zoomed}
      data-intro={showIntro ? "" : undefined}
    >
      {mapStatus !== "idle" && (
        <iframe
          className="locationMap"
          title={branch.mapArea
            ? `Mapa de la localidad de ${branch.name} en Google Maps`
            : `Sede de ${branch.name} en Google Maps`}
          src={branch.map}
          referrerPolicy="no-referrer-when-downgrade"
          tabIndex={showIntro ? -1 : undefined}
          aria-hidden={showIntro || undefined}
          onLoad={() => setMapStatus("ready")}
          allowFullScreen
        />
      )}
      {useOverview ? (
        <MapOverview zoomed={zoomed} onZoom={() => setZoomed(true)} />
      ) : showIntro && (
        <div className="locationMapLoading" aria-hidden="true"><Icon name="pin" /></div>
      )}
    </div>
  );
}
function LocationInfo({ branch, preview = false }) {
  const mapLabel = (
    <>Cómo llegar <span aria-hidden="true">↗</span></>
  );
  const photo = branch.photo && (
    <img
      className="locationPhoto"
      src={branch.photo}
      width="42"
      height="36"
      alt="Fachada de Inversiones Villanueva"
    />
  );
  return (
    <div className="locationInfo">
      <h2>
        {branch.id === "pataz" && <span className="locationLead">Visítanos en </span>}
        {branch.name}
      </h2>
      {branch.address && (
        <p className="locationAddress">
          <Icon name="pin" />
          <span>{branch.address}</span>
        </p>
      )}
      {branch.hours && (
        <p className="locationHours">
          <Icon name="clock" />
          <span className="locationHoursFull">{branch.hours}</span>
          <span className="locationHoursCompact">{branch.shortHours}</span>
        </p>
      )}
      {branch.directions && (
        <div className="locationActions">
          {preview ? (
            <span className="locationLink">{mapLabel}</span>
          ) : (
            <a className="locationLink" href={branch.directions} target="_blank" rel="noopener">
              {mapLabel}
            </a>
          )}
          {photo && (preview ? photo : (
            <a href={branch.photo} target="_blank" rel="noopener" aria-label="Ver la fachada">
              {photo}
            </a>
          ))}
        </div>
      )}
      {branch.mapArea && <small className="locationMapNote">Mapa de la localidad</small>}
    </div>
  );
}
function LocationBranches({ selected, onSelect }) {
  return (
    <div className="locationBranches" role="group" aria-label="Sedes">
      {branches.map((branch, index) => (
        <button
          type="button"
          key={branch.id}
          aria-pressed={index === selected}
          onClick={onSelect ? () => onSelect(index) : undefined}
        >
          {branch.name}
        </button>
      ))}
    </div>
  );
}
function Location({ motion, cardRef, opening, branchSelection, selectBranch }) {
  const [observerRef, visible] = useVisible(0.5);
  const [automaticBranch, setAutomaticBranch] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const setCard = useCallback((node) => {
    observerRef.current = node;
    cardRef.current = node;
  }, [observerRef, cardRef]);
  useAutoAdvance(
    motion && visible && !opening && !hovered && !focused && branchSelection === null,
    7600,
    setAutomaticBranch,
    branches.length,
  );
  const selected = branchSelection ?? automaticBranch;
  const branch = branches[selected];
  return (
    <section
      className="locationPanel"
      id="ubicacion"
      ref={setCard}
      aria-label="Sedes de Inversiones Villanueva"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      <LocationBranches selected={selected} onSelect={selectBranch} />
      <div
        className="locationSlide"
        key={branch.id}
        data-animate={motion ? "" : undefined}
        data-unmapped={branch.map ? undefined : ""}
      >
        <LocationInfo branch={branch} />
        {branch.map && <LocationMap branch={branch} motion={motion} opening={opening} />}
      </div>
    </section>
  );
}
function LandingOpening() {
  return (
    <div className="landingOpening" aria-hidden="true" inert>
      <div className="openingVeil" />
      <div className="openingLogo">
        <img
          src={asset("logo-claro")}
          alt=""
          width="457"
          height="126"
          fetchPriority="high"
        />
      </div>
      <div className="locationPanel openingCard">
        <LocationBranches selected={0} />
        <div className="locationSlide">
          <LocationInfo branch={branches[0]} preview />
          <div className="locationMapFrame" data-intro="">
            <MapOverview />
          </div>
        </div>
      </div>
    </div>
  );
}
function Footer({ showPataz }) {
  const [legalDocument, setLegalDocument] = useState(null);
  return (
    <>
      <Reveal as="footer" id="contacto" className="foot">
        <div className="footMain">
          <div className="footBrand">
            <img
              src={asset("logo-claro")}
              width="457"
              height="126"
              alt="Inversiones Villanueva"
            />
            <p>
              Servicios financieros con rapidez y garantía. Desde Pataz, La
              Libertad, Perú.
            </p>
          </div>
          <nav className="footServices" aria-label="Servicios">
            {services.slice(0, 4).map(([name, , options]) => (
              <WhatsAppLink
                key={name}
                origin="pie"
                service={name}
                href={consult(options?.subject ?? name.toLowerCase())}
              >
                {name}
              </WhatsAppLink>
            ))}
          </nav>
          <WhatsAppLink className="footWhatsApp" origin="pie">
            <SiWhatsapp className="icon" aria-hidden="true" focusable="false" />
            <span>
              WhatsApp
              <small>{phone}</small>
            </span>
          </WhatsAppLink>
        </div>
        <div className="footBottom">
          <nav className="footLegal" aria-label="Legal">
            <button
              type="button"
              className="footLink"
              aria-haspopup="dialog"
              onClick={() => setLegalDocument("privacy")}
            >
              Política de privacidad
            </button>
            <button
              type="button"
              className="footLink"
              aria-haspopup="dialog"
              onClick={() => setLegalDocument("terms")}
            >
              Términos y condiciones
            </button>
          </nav>
          <address className="footContact" aria-label="Contacto">
            <a href="#ubicacion" onClick={showPataz}>
              <Icon name="pin" /> <span>{address}</span>
            </a>
            <p>
              <Icon name="clock" /> <span>{businessHours}</span>
            </p>
            <a href={"mailto:" + mail}>
              <Icon name="mail" /> <span>{mail}</span>
            </a>
          </address>
        </div>
      </Reveal>
      {legalDocument && (
        <Modal
          className="legalDialog"
          titleId={legalDocument + "-title"}
          close={() => setLegalDocument(null)}
        >
          {legalDocument === "privacy" ? (
            <PrivacyPolicy />
          ) : (
            <TermsAndConditions />
          )}
        </Modal>
      )}
    </>
  );
}
export default function Page() {
  const motion = useMotion();
  const [opening, setOpening] = useState("splash");
  const openingActive = opening !== "done";
  const locationCard = useRef(null);
  const [branchSelection, selectBranch] = useState(null);
  const [detail, select] = useState(null);
  const [quote, setQuote] = useState({ country: "", origin: "cotizador" });
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => {
      if (root.dataset.openingPhase) setOpening(root.dataset.openingPhase);
    };
    document.addEventListener("villanueva:opening", sync);
    sync();
    const timeout = setTimeout(() => {
      root.removeAttribute("data-opening-playing");
      setOpening("done");
    }, 3600);
    return () => {
      clearTimeout(timeout);
      document.removeEventListener("villanueva:opening", sync);
    };
  }, []);
  return (
    <>
      {openingActive && <LandingOpening />}
      <Nav />
      <main>
        <Hero
          motion={motion && !openingActive}
          cardRef={locationCard}
          opening={openingActive}
          branchSelection={branchSelection}
          selectBranch={selectBranch}
        />
        <Stats motion={motion && opening !== "splash"} />
        <Reveal
          id="cotizar"
          className="additionSection quoteSection"
          tabIndex={-1}
          aria-labelledby="quote-title"
        >
          <SendQuote
            selection={quote}
            onDestinationChange={(country) => setQuote((current) => ({ ...current, country }))}
          />
        </Reveal>
        <section id="servicios">
          <Reveal as="div" className="serviceHead">
            <h2>Nuestros servicios</h2>
            <span />
          </Reveal>
          <div className="grid">
            {services.map(([name], idx) => (
              <Service key={name} idx={idx} motion={motion} select={select} />
            ))}
          </div>
        </section>
        <Reveal id="como-enviar" className="additionSection stepsSection">
          <SendSteps />
        </Reveal>
        <Countries onQuote={(country) => setQuote({ country, origin: "destinos" })} />
        <Reveal className="partners" threshold={0.65}>
          <h2>Trabajamos con</h2>
          {["KasNet", "Culqi", "Interbank"].map((name, i) => (
            <span key={name} className="partner" style={{ "--partner-index": i }}>
              <img src={asset("partner" + i)} alt={name} />
            </span>
          ))}
        </Reveal>
        <Testimonials motion={motion} />
        <Reveal className="additionSection supportSection">
          <div className="supportGrid">
            <Reveal id="preguntas" className="faqPanel" aria-labelledby="faq-title" threshold={0.35}>
              <QuestionsPanel />
            </Reveal>
            <ExchangeBoard />
          </div>
        </Reveal>
      </main>
      <Footer showPataz={() => selectBranch(0)} />
      <WhatsAppLink
        className="whatsapp"
        origin="flotante"
        aria-label={"Contactar por WhatsApp al " + phone}
      >
        <SiWhatsapp className="icon" aria-hidden="true" focusable="false" />
      </WhatsAppLink>
      {detail !== null && (
        <ServiceDetail key={detail} idx={detail} close={() => select(null)} />
      )}
    </>
  );
}
