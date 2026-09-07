'use client';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowRight, CheckCircle2, Gift, Percent, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { config, type Site } from '../config';

function Logo({
  name,
  src,
  brand = false,
}: {
  name: string;
  src: string;
  brand?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <span className={`logo ${brand ? 'brand-logo' : ''}`}>
      {src && !failed ? (
        <img
          src={src}
          alt={name}
          onError={() => setFailed(true)}
          width={52}
          height={52}
        />
      ) : brand ? (
        <Percent aria-hidden="true" />
      ) : (
        <span aria-hidden="true">{name.slice(0, 1)}</span>
      )}
    </span>
  );
}
function ProfileImage({ name, src }: { name: string; src: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <span className="profile-image">
      {src && !failed ? (
        <img
          src={src}
          alt={name}
          onError={() => setFailed(true)}
          width={90}
          height={90}
        />
      ) : (
        <span aria-hidden="true">{name.replace('@', '').slice(0, 1)}</span>
      )}
    </span>
  );
}
function SiteLink({ site, main = false }: { site: Site; main?: boolean }) {
  let href: string | undefined;
  try {
    const url = new URL(site.url);
    if (['https:', 'http:'].includes(url.protocol)) href = url.href;
  } catch {
    /* Invalid destination remains unavailable. */
  }
  return (
    <article className={main ? 'main-site' : 'secondary-site'}>
      {main && (
        <div className="recommended">{site.badge || '🔥 RECOMENDADO'}</div>
      )}
      <div className="site-info">
        <Logo name={site.name} src={site.logo} />
        <div>
          <h2>{site.name}</h2>
          {site.description && <p>{site.description}</p>}
        </div>
      </div>
      {main && (
        <span className="discount-badge">
          <Tag size={15} aria-hidden="true" /> {config.discount}% OFF
        </span>
      )}
      <a
        className={main ? 'cta' : 'secondary-cta'}
        href={href}
        aria-disabled={!href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${main ? 'Acessar com 50% OFF' : 'Acessar'} — ${site.name} (abre em nova aba)`}
      >
        {main ? 'ACESSAR COM 50% OFF' : 'ACESSAR'}
        <ArrowRight size={18} aria-hidden="true" />
      </a>
    </article>
  );
}
export default function Presell({ links = false }: { links?: boolean }) {
  const [unlocked, setUnlocked] = useState(false);
  const [ready, setReady] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [celebrating, setCelebrating] = useState(false);
  const busy = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const celebrationTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const resultHeading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    try {
      const saved =
        localStorage.getItem('discountUnlocked') === String(config.discount);
      setUnlocked(saved);
      busy.current = saved;
    } catch {
      if (links) setUnlocked(true);
    }
    setReady(true);
    return () => {
      clearTimeout(timer.current);
      clearTimeout(celebrationTimer.current);
    };
  }, [links]);
  function chooseBox(index: number) {
    if (!ready || busy.current || unlocked) return;
    busy.current = true;
    setSelected(index);
    timer.current = setTimeout(() => {
      try {
        localStorage.setItem('discountUnlocked', String(config.discount));
      } catch {
        /* Optional persistence. */
      }
      setUnlocked(true);
      setCelebrating(true);
      celebrationTimer.current = setTimeout(() => setCelebrating(false), 1100);
    }, 850);
  }
  useEffect(() => {
    if (unlocked && selected !== null) resultHeading.current?.focus();
  }, [unlocked, selected]);
  return (
    <div className="page-shell">
      {!links && (
        <header className="brand">
          <Logo name={config.branding.name} src={config.branding.logo} brand />
          <span>{config.branding.name}</span>
        </header>
      )}
      <main
        className={links ? 'content links-content' : 'content game-content'}
        aria-busy={!ready}
      >
        {!links && (
          <div className="steps" aria-label="Etapa 1 de 2">
            <span className="current-step">
              <i>1</i> Desbloqueie
            </span>
            <span className="step-line" />
            <span>
              <i>2</i> Aproveite
            </span>
          </div>
        )}
        {links ? (
          <>
            <section className="profile-header">
              <ProfileImage
                name={config.profile.name}
                src={config.profile.image}
              />
              <h1>{config.profile.name}</h1>
              <p>{config.profile.description}</p>
              <span className="profile-benefit">
                🔥 {config.discount}% OFF liberado
              </span>
            </section>
            <SiteLink site={config.mainSite} main />
            {config.sites.length > 0 && (
              <section className="other-sites" aria-label="Outras opções">
                <p className="section-label">OUTRAS OPÇÕES</p>
                {config.sites.map((site, index) => (
                  <SiteLink key={`${site.name}-${index}`} site={site} />
                ))}
              </section>
            )}
          </>
        ) : (
          <section className="game-panel">
            {celebrating && (
              <div className="confetti" aria-hidden="true">
                {Array.from({ length: 18 }, (_, i) => (
                  <i
                    key={i}
                    style={
                      {
                        '--x': `${5 + ((i * 19) % 90)}%`,
                        '--r': `${i * 43}deg`,
                        '--delay': `${(i % 4) * 35}ms`,
                      } as CSSProperties
                    }
                  />
                ))}
              </div>
            )}
            {unlocked ? (
              <div className="result">
                <span className="success-icon">
                  <CheckCircle2 aria-hidden="true" />
                </span>
                <h1 ref={resultHeading} tabIndex={-1}>
                  {config.texts.textoResultado}
                </h1>
                <div className="benefit-ticket">
                  <span>SEU BENEFÍCIO</span>
                  <div className="discount-number">
                    {config.discount}
                    <span>% OFF</span>
                  </div>
                  <p>{config.texts.complementoResultado}</p>
                </div>
                <a href="/links" className="cta">
                  {config.texts.resgatar}
                  <ArrowRight size={20} aria-hidden="true" />
                </a>
              </div>
            ) : (
              <>
                <span className="eyebrow">
                  <span /> UM BENEFÍCIO PARA VOCÊ
                </span>
                <h1>{config.texts.tituloMiniGame}</h1>
                <p className="subtitle">{config.texts.textoMiniGame}</p>
                <div className="boxes" aria-label="Escolha uma das três caixas">
                  {[0, 1, 2].map((index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className={`gift-box ${selected === index ? 'is-opening' : ''} ${selected !== null && selected !== index ? 'not-selected' : ''}`}
                      disabled={!ready || selected !== null}
                      onClick={() => chooseBox(index)}
                      aria-label={`Escolher caixa ${index + 1}`}
                    >
                      <span className="gift-emoji" aria-hidden="true">
                        🎁
                      </span>
                      <span className="box-label">CAIXA {index + 1}</span>
                    </Button>
                  ))}
                </div>
                <p className="game-hint" role="status">
                  {selected !== null
                    ? 'Revelando seu benefício…'
                    : 'Toque em uma caixa para abrir'}
                </p>
                <div className="panel-note">
                  <Gift size={18} aria-hidden="true" />
                  <span>Seu próximo benefício começa aqui.</span>
                </div>
              </>
            )}
          </section>
        )}
        <footer>
          <span className="footer-dot" />
          {links
            ? 'Benefício liberado. Escolha e aproveite.'
            : 'Escolha. Desbloqueie. Aproveite.'}
        </footer>
      </main>
    </div>
  );
}
