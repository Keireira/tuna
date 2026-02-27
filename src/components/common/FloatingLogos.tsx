import { useState, useCallback, useRef, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';

const allLogos = [
  'netflix', 'spotify', 'youtube-premium', 'disney-plus', 'chatgpt', 'claude',
  'github', 'apple-music', 'apple-one', 'apple-tv-plus', 'amazon-prime',
  'telegram', 'discord', 'hbo-max', 'crunchyroll', 'nord-vpn', 'proton',
  'adobe', 'aws', 'deezer', 'twitch', 'patreon', 'medium', 'mega',
  'surfshark', 'express-vpn', 'google-one', 'hulu', 'paramount-plus',
  'digital-ocean', 'vercel', 'heroku', 'render', 'tailscale', 'warp',
  'kagi', 'sketch', 'tidal', 'boosty', 'psn', 'xbox',
  'kinopoisk', 'ivi', 'okko', 'yandex-plus', 'discovery-plus',
  'adguard', 'namecheap', 'porkbun', 'hostinger', 'vultr', 'linode',
];

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

interface LogoPhysics {
  id: number;
  name: string;
  x: number;    // px from left
  y: number;    // px from top
  vx: number;   // px per second
  vy: number;   // px per second
  size: number;  // px
  opacity: number;
}

const SPEED = 18; // base speed px/s
const LOGO_COUNT = 30;

function generateLogos(w: number, h: number): LogoPhysics[] {
  const rand = seededRandom(42);
  const shuffled = [...allLogos].sort(() => rand() - 0.5);
  const logos: LogoPhysics[] = [];

  for (let i = 0; i < LOGO_COUNT; i++) {
    const size = 36 + rand() * 24;
    const angle = rand() * Math.PI * 2;
    const speed = SPEED * (0.5 + rand());
    logos.push({
      id: i,
      name: shuffled[i % shuffled.length],
      x: rand() * (w - size),
      y: rand() * (h - size),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size,
      opacity: 0,
    });
  }
  return logos;
}

const PARTICLE_COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96E6A1', '#FFD93D', '#C9B1FF'];

const particleBurst = keyframes`
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(var(--px), var(--py)) scale(0);
    opacity: 0;
  }
`;

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 2;
  overflow: hidden;
`;

const Logo = styled.img<{
  $size: number;
  $exploding: boolean;
}>`
  position: absolute;
  left: 0;
  top: 0;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  clip-path: url(#squircle);
  filter: saturate(0.3);
  pointer-events: auto;
  cursor: pointer;
  will-change: transform, opacity;
  transition: filter 0.2s;

  &:hover {
    filter: saturate(0.6);
  }

  ${({ $exploding }) =>
    $exploding &&
    css`
      pointer-events: none;
      filter: saturate(0.3);
    `}

  @media (max-width: 768px) {
    width: ${({ $size }) => $size * 0.7}px;
    height: ${({ $size }) => $size * 0.7}px;
  }
`;

const ParticlesContainer = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 3;
`;

const Particle = styled.div<{ $color: string }>`
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  animation: ${particleBurst} 0.5s ease-out forwards;
`;

interface ParticleBurstData {
  id: number;
  x: number;
  y: number;
  particles: { px: number; py: number; color: string }[];
}

export function FloatingLogos() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<LogoPhysics[]>([]);
  const logoEls = useRef<Map<number, HTMLImageElement>>(new Map());
  const rafRef = useRef(0);
  const lastTimeRef = useRef(0);
  const [, forceRender] = useState(0);
  const [explodingIds, setExplodingIds] = useState<Set<number>>(new Set());
  const [bursts, setBursts] = useState<ParticleBurstData[]>([]);
  const burstIdRef = useRef(0);
  const nextLogoId = useRef(LOGO_COUNT);
  const initRef = useRef(false);
  const prevDims = useRef({ w: window.innerWidth, h: window.innerHeight });

  // Initialize logos once wrapper is measured
  useEffect(() => {
    if (initRef.current) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    logosRef.current = generateLogos(w, h);
    prevDims.current = { w, h };
    initRef.current = true;
    forceRender((n) => n + 1);
  }, []);

  // Rescale positions proportionally on resize
  useEffect(() => {
    const handleResize = () => {
      const newW = window.innerWidth;
      const newH = window.innerHeight;
      const { w: oldW, h: oldH } = prevDims.current;

      if (oldW === newW && oldH === newH) return;

      const isMobile = newW <= 768;
      for (const l of logosRef.current) {
        const s = isMobile ? l.size * 0.7 : l.size;
        l.x = Math.max(0, Math.min((l.x / oldW) * newW, newW - s));
        l.y = Math.max(0, Math.min((l.y / oldH) * newH, newH - s));
      }

      prevDims.current = { w: newW, h: newH };
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fade in logos over the first second
  useEffect(() => {
    const start = performance.now();
    const fadeDuration = 1000;
    const tick = () => {
      const elapsed = performance.now() - start;
      const t = Math.min(elapsed / fadeDuration, 1);
      const baseOpacity = window.innerWidth <= 768 ? 0.04 : 0.06;
      for (const l of logosRef.current) {
        l.opacity = baseOpacity * t;
      }
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);

  // Physics loop
  useEffect(() => {
    lastTimeRef.current = performance.now();

    const step = (now: number) => {
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.05); // cap at 50ms
      lastTimeRef.current = now;

      const w = window.innerWidth;
      const h = window.innerHeight;
      const logos = logosRef.current;
      const isMobile = w <= 768;
      const baseOpacity = isMobile ? 0.04 : 0.06;
      const hoverOpacity = isMobile ? 0.1 : 0.15;

      // Move & bounce off walls
      for (const l of logos) {
        l.x += l.vx * dt;
        l.y += l.vy * dt;

        const s = isMobile ? l.size * 0.7 : l.size;
        if (l.x < 0) { l.x = 0; l.vx = Math.abs(l.vx); }
        if (l.y < 0) { l.y = 0; l.vy = Math.abs(l.vy); }
        if (l.x + s > w) { l.x = w - s; l.vx = -Math.abs(l.vx); }
        if (l.y + s > h) { l.y = h - s; l.vy = -Math.abs(l.vy); }
      }

      // Collision detection between logos
      for (let i = 0; i < logos.length; i++) {
        for (let j = i + 1; j < logos.length; j++) {
          const a = logos[i];
          const b = logos[j];
          const ra = (isMobile ? a.size * 0.7 : a.size) / 2;
          const rb = (isMobile ? b.size * 0.7 : b.size) / 2;
          const ax = a.x + ra;
          const ay = a.y + ra;
          const bx = b.x + rb;
          const by = b.y + rb;
          const dx = bx - ax;
          const dy = by - ay;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = ra + rb;

          if (dist < minDist && dist > 0) {
            // Normalize
            const nx = dx / dist;
            const ny = dy / dist;

            // Relative velocity along collision normal
            const dvx = a.vx - b.vx;
            const dvy = a.vy - b.vy;
            const dvn = dvx * nx + dvy * ny;

            // Only resolve if moving toward each other
            if (dvn > 0) {
              a.vx -= dvn * nx;
              a.vy -= dvn * ny;
              b.vx += dvn * nx;
              b.vy += dvn * ny;
            }

            // Separate overlapping logos
            const overlap = minDist - dist;
            a.x -= nx * overlap * 0.5;
            a.y -= ny * overlap * 0.5;
            b.x += nx * overlap * 0.5;
            b.y += ny * overlap * 0.5;
          }
        }
      }

      // Update DOM directly (no React re-render)
      for (const l of logos) {
        const el = logoEls.current.get(l.id);
        if (el) {
          el.style.transform = `translate(${l.x}px, ${l.y}px)`;
          // Check hover state
          const isHovered = el.matches(':hover');
          el.style.opacity = String(isHovered ? hoverOpacity : (l.opacity || baseOpacity));
        }
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const explodeLogo = useCallback((logoId: number, cx: number, cy: number) => {
    setExplodingIds((prev) => new Set(prev).add(logoId));

    const count = 8 + Math.floor(Math.random() * 5);
    const particles = Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 40 + Math.random() * 60;
      return {
        px: Math.cos(angle) * distance,
        py: Math.sin(angle) * distance,
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      };
    });

    const burstId = burstIdRef.current++;
    setBursts((prev) => [...prev, { id: burstId, x: cx, y: cy, particles }]);

    const explodedLogo = logosRef.current.find((l) => l.id === logoId);
    const explodedName = explodedLogo?.name;

    // Animate explosion in DOM
    const el = logoEls.current.get(logoId);
    if (el) {
      el.style.transition = 'opacity 0.4s, transform 0.4s ease-out';
      el.style.opacity = '0';
      el.style.transform = `translate(${explodedLogo?.x ?? 0}px, ${explodedLogo?.y ?? 0}px) scale(2)`;
    }

    setTimeout(() => {
      logosRef.current = logosRef.current.filter((l) => l.id !== logoId);
      logoEls.current.delete(logoId);
      setExplodingIds((prev) => {
        const next = new Set(prev);
        next.delete(logoId);
        return next;
      });
      setBursts((prev) => prev.filter((b) => b.id !== burstId));
      forceRender((n) => n + 1);

      if (explodedName) {
        const respawnDelay = 5000 + Math.random() * 25000;
        setTimeout(() => {
          const w = window.innerWidth;
          const h = window.innerHeight;
          const size = 36 + Math.random() * 24;
          const angle = Math.random() * Math.PI * 2;
          const speed = SPEED * (0.5 + Math.random());
          const isMobile = w <= 768;
          logosRef.current.push({
            id: nextLogoId.current++,
            name: explodedName,
            x: Math.random() * (w - size),
            y: Math.random() * (h - size),
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size,
            opacity: isMobile ? 0.04 : 0.06,
          });
          forceRender((n) => n + 1);
        }, respawnDelay);
      }
    }, 500);
  }, []);

  const handleClick = useCallback((logoId: number, e: React.MouseEvent<HTMLImageElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    explodeLogo(logoId, rect.left + rect.width / 2, rect.top + rect.height / 2);
  }, [explodeLogo]);

  // Auto-explode hint
  useEffect(() => {
    const count = 3 + Math.floor(Math.random() * 2);
    const usedIds = new Set<number>();
    const timers: ReturnType<typeof setTimeout>[] = [];
    let cumulative = 3000;

    for (let i = 0; i < count; i++) {
      const delay = cumulative;
      timers.push(
        setTimeout(() => {
          const available = logosRef.current.filter((l) => !usedIds.has(l.id));
          if (available.length === 0) return;
          const target = available[Math.floor(Math.random() * available.length)];
          usedIds.add(target.id);
          const s = target.size;
          explodeLogo(target.id, target.x + s / 2, target.y + s / 2);
        }, delay),
      );
      cumulative += 3000 + Math.random() * 4000;
    }

    return () => timers.forEach(clearTimeout);
  }, [explodeLogo]);

  const logos = logosRef.current;

  return (
    <>
      <Wrapper ref={wrapperRef}>
        {logos.map((l) => (
          <Logo
            key={l.id}
            ref={(el) => {
              if (el) logoEls.current.set(l.id, el);
            }}
            src={`/assets/logos/${l.name}.webp`}
            alt=""
            loading="lazy"
            $size={l.size}
            $exploding={explodingIds.has(l.id)}
            onClick={(e) => handleClick(l.id, e)}
            style={{ transform: `translate(${l.x}px, ${l.y}px)`, opacity: l.opacity }}
          />
        ))}
      </Wrapper>
      {bursts.length > 0 && (
        <ParticlesContainer>
          {bursts.map((burst) =>
            burst.particles.map((p, i) => (
              <Particle
                key={`${burst.id}-${i}`}
                $color={p.color}
                style={{
                  left: burst.x,
                  top: burst.y,
                  '--px': `${p.px}px`,
                  '--py': `${p.py}px`,
                } as React.CSSProperties}
              />
            ))
          )}
        </ParticlesContainer>
      )}
    </>
  );
}
