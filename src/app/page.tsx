"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { newsItems } from "./news-data";

const navItems = [
  { label: "Experiências", href: "#experiencias" },
  { label: "Galeria", href: "#galeria" },
  { label: "Acontecendo", href: "#acontecendo" },
];

const experienceCards = [
  {
    title: "Atividades imperdíveis",
    text: "Trilhas, água, mirantes e roteiros que mostram a cidade com tempo de olhar.",
    href: "/turismo",
    image: "/assets/1.jpeg",
  },
  {
    title: "Eventos",
    text: "Da cultura popular aos encontros esportivos, acompanhe o calendário de Fartura.",
    href: "/eventos",
    image: "/assets/21.jpg",
  },
];

const galleryColumns = [
  [
    { image: "/assets/3.jpg", title: "Paisagens abertas", text: "Horizontes largos para chegar sem pressa." },
    { image: "/assets/7.jpg", title: "Caminhos de água", text: "A represa como ponto de encontro e descanso." },
    { image: "/assets/12.jpg", title: "Pontos para respirar", text: "Pausas de natureza entre um roteiro e outro." },
  ],
  [
    { image: "/assets/8.jpg", title: "Cultura viva", text: "Memória, encontros e festas no ritmo da cidade." },
    { image: "/assets/19.jpg", title: "Fim de tarde no Angradoce", text: "Luz quente, água calma e tempo suspenso." },
    { image: "/assets/4.jpg", title: "Roteiros de natureza", text: "Estradas, trilhas e paisagens para explorar." },
  ],
  [
    { image: "/assets/10.jpg", title: "Encontros da cidade", text: "Programas que aproximam visitantes e moradores." },
    { image: "/assets/11.jpg", title: "Experiências locais", text: "Sabores, histórias e detalhes que ficam." },
    { image: "/assets/20.jpg", title: "Memórias de viagem", text: "Registros para lembrar por onde o dia passou." },
  ],
];

const galleryRows = galleryColumns[0].map((_, rowIndex) =>
  galleryColumns.map((column, columnIndex) => ({
    ...column[rowIndex],
    columnIndex,
  })),
);

const sponsors = [
  { name: "ACIF - Associação Comercial e Industrial de Fartura", image: "/assets/sponsors/acif.jpg" },
  { name: "Projeto Guri", image: "/assets/sponsors/guri.png" },
  { name: "COMTUR - Conselho Municipal de Turismo", image: "/assets/sponsors/comtur.jpg" },
  { name: "CMPC - Conselho Municipal de Políticas Culturais", image: "/assets/sponsors/cmpc.jpg" },
];

function useHoverIntent<T>(delay = 75) {
  const [active, setActive] = useState<T | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const cancelPending = () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const schedule = (value: T) => {
    cancelPending();
    timeoutRef.current = window.setTimeout(() => {
      setActive(value);
      timeoutRef.current = null;
    }, delay);
  };

  const activate = (value: T) => {
    cancelPending();
    setActive(value);
  };

  const clear = () => {
    cancelPending();
    setActive(null);
  };

  useEffect(
    () => () => {
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    },
    [],
  );

  return { active, schedule, activate, clear };
}

function useHomeMotion() {
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = pageRef.current;
    if (!root) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hero = root.querySelector<HTMLElement>("[data-hero]");
    const header = root.querySelector<HTMLElement>("[data-header]");
    const parallaxItems = Array.from(root.querySelectorAll<HTMLElement>("[data-parallax]"));
    const revealItems = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    let ticking = false;
    let heroFrame: number | null = null;
    let heroTargetProgress = 0;
    let heroRenderedProgress = 0;
    let heroInitialized = false;

    const applyHeroProgress = (progress: number) => {
      hero?.style.setProperty("--hero-progress", progress.toFixed(4));
    };

    const renderHero = () => {
      if (!hero) {
        heroFrame = null;
        return;
      }

      const difference = heroTargetProgress - heroRenderedProgress;
      heroRenderedProgress = reducedMotion.matches
        ? heroTargetProgress
        : heroRenderedProgress + difference * 0.18;

      if (Math.abs(difference) < 0.0005) {
        heroRenderedProgress = heroTargetProgress;
      }

      applyHeroProgress(heroRenderedProgress);

      if (heroRenderedProgress !== heroTargetProgress) {
        heroFrame = window.requestAnimationFrame(renderHero);
      } else {
        heroFrame = null;
      }
    };

    const updateScroll = () => {
      const scrollY = window.scrollY;
      const heroRect = hero?.getBoundingClientRect();
      const headerBottom = header?.getBoundingClientRect().bottom ?? 96;
      header?.classList.toggle("is-scrolled", heroRect ? heroRect.bottom <= headerBottom + 12 : scrollY > 48);

      if (hero && heroRect) {
        const height = hero.offsetHeight || 1;
        const traveled = Math.max(-heroRect.top, 0);
        heroTargetProgress = Math.min(Math.max(traveled / (height * 0.9), 0), 1);

        if (!heroInitialized || reducedMotion.matches) {
          heroRenderedProgress = heroTargetProgress;
          applyHeroProgress(heroRenderedProgress);
          heroInitialized = true;
        } else if (heroFrame === null) {
          heroFrame = window.requestAnimationFrame(renderHero);
        }
      }

      if (!reducedMotion.matches) {
        parallaxItems.forEach((item) => {
          const speed = Number(item.dataset.speed ?? "0.08");
          const rect = item.getBoundingClientRect();
          const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
          const clamped = Math.min(Math.max(progress, 0), 1);
          const offset = (clamped - 0.5) * speed * -360;
          item.style.setProperty("--parallax-y", `${offset.toFixed(2)}px`);
        });
      }

      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "-8% 0px -12% 0px", threshold: 0.12 },
    );

    root.classList.add("motion-ready");

    let contentRevealIndex = 0;
    revealItems.forEach((item) => {
      const isHeading = item.hasAttribute("data-reveal-heading");
      const delay = isHeading ? "0ms" : `${Math.min(contentRevealIndex % 6, 5) * 90}ms`;
      if (!isHeading) contentRevealIndex += 1;

      item.style.setProperty("--reveal-delay", delay);
      if (reducedMotion.matches) {
        item.classList.add("is-visible");
      } else {
        observer.observe(item);
      }
    });

    updateScroll();
    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", requestTick);

    return () => {
      observer.disconnect();
      root.classList.remove("motion-ready");
      if (heroFrame !== null) window.cancelAnimationFrame(heroFrame);
      window.removeEventListener("scroll", requestTick);
      window.removeEventListener("resize", requestTick);
    };
  }, []);

  return pageRef;
}

export default function Home() {
  const pageRef = useHomeMotion();
  const experienceMotion = useHoverIntent<number>();
  const galleryMotion = useHoverIntent<{ row: number; column: number }>();
  const newsMotion = useHoverIntent<number>();

  return (
    <main ref={pageRef} className="site-shell">
      <header className="site-header" data-header>
        <a className="brand-mark" href="#top" aria-label="Turismo de Fartura">
          <Image
            src="/assets/log-perfil-v80.png"
            alt="Fartura, Pérola do Angradoce"
            width={80}
            height={74}
            priority
          />
        </a>
        <nav className="desktop-nav" aria-label="Navegacao principal">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header-socials" aria-label="Redes sociais">
          <a
            className="header-social-link header-social-link-facebook"
            href="https://www.facebook.com/Farturismo/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook do Farturismo"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="M14.1 8.5h2.1V5h-2.9C10.8 5 9.6 6.6 9.6 8.9V11H7.8v3.3h1.8V21h3.6v-6.7h2.5l0.4-3.3h-2.9V9.2c0-0.5 0.3-0.7 0.9-0.7Z" />
            </svg>
          </a>
          <a
            className="header-social-link header-social-link-instagram"
            href="https://www.instagram.com/farturismo"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram do Farturismo"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <rect x="6.2" y="6.2" width="11.6" height="11.6" rx="3.2" />
              <circle cx="12" cy="12" r="2.8" />
              <circle cx="15.6" cy="8.4" r="0.8" />
            </svg>
          </a>
        </div>
      </header>

      <section id="top" className="hero-section" data-hero aria-labelledby="hero-title">
        <div className="hero-image hero-image-base">
          <Image
            src="/assets/17.jpg"
            alt="Ponte sobre a represa de Fartura ao pôr do sol"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="hero-shade" />
        <div className="hero-copy">
          <h1 id="hero-title">
            <span>Descubra, Explore...</span>
            <strong>Farture-se!</strong>
          </h1>
        </div>
        <div className="hero-image hero-foreground hero-foreground-water" aria-hidden="true">
          <Image src="/assets/17.jpg" alt="" fill sizes="100vw" />
        </div>
        <div className="hero-actions" aria-label="Atalhos da home">
          <a href="#farturense">Sou Farturense</a>
          <a href="#experiencias">Sou Farturista</a>
        </div>
      </section>

      <section id="experiencias" className="section experiences-section" aria-labelledby="experiences-title">
        <div className="section-heading experiences-heading" data-reveal data-reveal-heading>
          <h2 id="experiences-title" className="section-title">Experiência Farturista Completa</h2>
          <p className="section-subtitle">Encontre boas razões para ficar mais um pouco.</p>
        </div>
        <div
          className="experience-grid"
          data-active={experienceMotion.active ?? undefined}
          onPointerLeave={experienceMotion.clear}
          onBlur={(event) => {
            const nextFocus = event.relatedTarget as Node | null;
            if (!nextFocus || !event.currentTarget.contains(nextFocus)) experienceMotion.clear();
          }}
        >
          {experienceCards.map((card, index) => (
            <a
              className="experience-card motion-card"
              href={card.href}
              key={card.title}
              data-active={experienceMotion.active === index ? "true" : undefined}
              data-reveal
              onPointerEnter={(event) => event.pointerType !== "touch" && experienceMotion.schedule(index)}
              onFocus={() => experienceMotion.activate(index)}
            >
              <span className="card-media">
                <Image src={card.image} alt="" fill sizes="(max-width: 768px) 90vw, 33vw" />
              </span>
              <span className="card-body">
                <strong>{card.title}</strong>
                <span>{card.text}</span>
              </span>
              <span className="card-action-icon" aria-hidden="true">
                <ArrowUpRight strokeWidth={1.8} />
              </span>
            </a>
          ))}
        </div>
      </section>

      <section id="galeria" className="gallery-section" aria-labelledby="gallery-title">
        <div className="gallery-intro gallery-heading" data-reveal data-reveal-heading>
          <h2 id="gallery-title" className="section-title">Olhe com calma...</h2>
          <p className="section-subtitle">Água, ponte, cultura e estrada formam o mapa afetivo da cidade.</p>
        </div>
        <div
          className="gallery-rows"
          onPointerLeave={galleryMotion.clear}
          onBlur={(event) => {
            const nextFocus = event.relatedTarget as Node | null;
            if (!nextFocus || !event.currentTarget.contains(nextFocus)) galleryMotion.clear();
          }}
        >
          {galleryRows.map((row, rowIndex) => (
            <div
              className="gallery-row"
              data-active-column={galleryMotion.active?.row === rowIndex ? galleryMotion.active.column : undefined}
              data-parallax
              data-speed={rowIndex === 1 ? "0.12" : "0.08"}
              key={rowIndex}
            >
              {row.map((item) => (
                <div className="gallery-card-motion" key={item.image}>
                  <figure
                    className={`gallery-card motion-card${rowIndex === 1 ? " gallery-card-tall" : ""}`}
                    data-active={
                      galleryMotion.active?.row === rowIndex && galleryMotion.active.column === item.columnIndex
                        ? "true"
                        : undefined
                    }
                    data-reveal
                    tabIndex={0}
                    onPointerEnter={(event) =>
                      event.pointerType !== "touch" &&
                      galleryMotion.schedule({ row: rowIndex, column: item.columnIndex })
                    }
                    onFocus={() => galleryMotion.activate({ row: rowIndex, column: item.columnIndex })}
                  >
                    <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 80vw, 30vw" />
                    <figcaption>
                      <strong>{item.title}</strong>
                      <span>{item.text}</span>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section id="acontecendo" className="section news-section" aria-labelledby="news-title">
        <div className="section-heading news-heading" data-reveal data-reveal-heading>
          <h2 id="news-title" className="section-title">Acontecendo</h2>
          <p className="section-subtitle">Notícias, encontros e movimentos recentes da cidade.</p>
        </div>
        <div
          className="news-board"
          data-active={newsMotion.active ?? undefined}
          onPointerLeave={newsMotion.clear}
          onBlur={(event) => {
            const nextFocus = event.relatedTarget as Node | null;
            if (!nextFocus || !event.currentTarget.contains(nextFocus)) newsMotion.clear();
          }}
        >
          <Link
            className="news-feature"
            href={`/acontecendo/${newsItems[0].slug}`}
            data-active={newsMotion.active === 0 ? "true" : undefined}
            data-reveal
            onPointerEnter={(event) => event.pointerType !== "touch" && newsMotion.schedule(0)}
            onFocus={() => newsMotion.activate(0)}
          >
            <span className="news-feature-media">
              <Image src={newsItems[0].image} alt="" fill sizes="(max-width: 900px) 90vw, 58vw" />
            </span>
            <span className="news-feature-copy">
              <strong>{newsItems[0].title}</strong>
              <em>{newsItems[0].text}</em>
            </span>
          </Link>
          <aside className="news-related" aria-label="Outras notícias">
            <h3>Outras notícias</h3>
            <div className="news-related-list">
              {newsItems.slice(1, 4).map((item, itemIndex) => {
                const index = itemIndex + 1;
                return (
                  <Link
                    className="news-related-item"
                    href={`/acontecendo/${item.slug}`}
                    key={item.href}
                    data-active={newsMotion.active === index ? "true" : undefined}
                    data-reveal
                    onPointerEnter={(event) => event.pointerType !== "touch" && newsMotion.schedule(index)}
                    onFocus={() => newsMotion.activate(index)}
                  >
                    <span>
                      <strong>{item.title}</strong>
                      <em>{item.date}</em>
                    </span>
                    <span className="news-related-media">
                      <Image src={item.image} alt="" fill sizes="(max-width: 900px) 24vw, 8vw" />
                    </span>
                  </Link>
                );
              })}
            </div>
            <Link className="news-more-link" href="/acontecendo">
              Ver mais
              <ArrowUpRight aria-hidden="true" strokeWidth={1.8} />
            </Link>
          </aside>
        </div>
      </section>

      <section id="farturense" className="civic-section" aria-labelledby="civic-title">
        <div className="questionnaire-shell">
          <div className="questionnaire-visual" data-reveal>
            <div className="questionnaire-photo">
              <Image
                src="/assets/21.jpg"
                alt="Ponte sobre a represa em Fartura"
                fill
                sizes="(max-width: 900px) 86vw, 38vw"
              />
            </div>
          </div>

          <div className="questionnaire-copy" data-reveal data-reveal-heading>
            <h2 id="civic-title">
              Ajude Fartura a construir um turismo <span>mais forte</span>
            </h2>
            <p>
              A participação dos moradores ajuda a orientar ações de cultura, memória, eventos e turismo.
              Sua opinião fortalece o que já existe e abre caminho para novas oportunidades.
            </p>
            <div className="questionnaire-action-row">
              <a className="questionnaire-cta" href="https://www.turismo.fartura.sp.gov.br">
                Responder pesquisa
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="parceiros" className="partners-section" aria-labelledby="partners-title">
        <div className="partners-heading partners-title-block" data-reveal data-reveal-heading>
          <h2 id="partners-title" className="section-title">Parceiros</h2>
          <p className="section-subtitle">
            Instituições que atuam em conjunto pelo desenvolvimento cultural e turístico de Fartura.
          </p>
        </div>
        <div className="partners-list" aria-label="Instituições parceiras">
          {sponsors.map((sponsor) => (
            <figure className="partner-item" data-reveal key={sponsor.image}>
              <span className="partner-logo">
                <Image src={sponsor.image} alt={sponsor.name} fill sizes="(max-width: 768px) 42vw, 18vw" />
              </span>
              <figcaption>{sponsor.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-brand-column">
          <Image
            className="footer-brand"
            src="/assets/site-farturismo.png"
            alt="Farturismo"
            width={225}
            height={66}
          />
          <p>
            Somos o elo entre o potencial turístico e a rica herança cultural,
            valorizamos ambos para o benefício da comunidade.
          </p>
          <div className="footer-socials" aria-label="Redes sociais">
            <a
              className="footer-social-link"
              href="https://www.facebook.com/Farturismo/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook do Farturismo"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M14.1 8.5h2.1V5h-2.9C10.8 5 9.6 6.6 9.6 8.9V11H7.8v3.3h1.8V21h3.6v-6.7h2.5l0.4-3.3h-2.9V9.2c0-0.5 0.3-0.7 0.9-0.7Z" />
              </svg>
            </a>
            <a
              className="footer-social-link"
              href="https://www.instagram.com/farturismo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram do Farturismo"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <rect x="6.2" y="6.2" width="11.6" height="11.6" rx="3.2" />
                <circle cx="12" cy="12" r="2.8" />
                <circle cx="15.6" cy="8.4" r="0.8" />
              </svg>
            </a>
          </div>
        </div>

        <nav className="footer-link-column" aria-label="Links da cidade">
          <h2>Cidade</h2>
          <a href="#acontecendo">Acontecendo</a>
          <Link href="/turismo">Turismo</Link>
          <Link href="/eventos">Eventos</Link>
        </nav>

        <nav className="footer-link-column" aria-label="Serviços municipais">
          <h2>Serviços</h2>
          <a href="https://www.fartura.sp.gov.br/" target="_blank" rel="noopener noreferrer">
            Prefeitura
          </a>
          <a
            href="https://www.fartura.sp.gov.br/diario-oficial-eletronico"
            target="_blank"
            rel="noopener noreferrer"
          >
            Diário Oficial
          </a>
          <a
            href="https://fartura-sp.1doc.com.br/b.php?pg=wp/wp&itd=5"
            target="_blank"
            rel="noopener noreferrer"
          >
            Protocolo
          </a>
          <a
            href="https://fartura-sp.1doc.com.br/b.php?pg=wp/wp&itd=6"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ouvidoria
          </a>
        </nav>

        <address className="footer-contact">
          <h2>Contato</h2>
          <a
            href="https://maps.google.com/?q=Rua%20Flor%20de%20Lis%2C%2038%20-%20Parque%20das%20Flores%2C%20Fartura%20SP"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MapPin aria-hidden="true" strokeWidth={1.9} />
            Rua Flor de Lis, 38 - Parque das Flores
          </a>
          <a href="mailto:ctur@fartura.sp.gov.br">
            <Mail aria-hidden="true" strokeWidth={1.9} />
            ctur@fartura.sp.gov.br
          </a>
          <a href="tel:+551433821016">
            <Phone aria-hidden="true" strokeWidth={1.9} />
            +55 (14) 3382 1016
          </a>
        </address>
      </footer>
    </main>
  );
}
