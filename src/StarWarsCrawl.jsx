import { useEffect } from 'react';
import { playStarWarsCrawlTheme, stopCrawlTheme } from './sounds';

/* ═══════════════════════════════════════════
   STAR WARS STYLE CREDITS CRAWL
   ═══════════════════════════════════════════ */
function StarWarsCrawl({ onFinish }) {
  useEffect(() => {
    playStarWarsCrawlTheme();
    return () => stopCrawlTheme();
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Stars background */}
      <div className="absolute inset-0">
        {Array.from({ length: 100 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2.5 + 0.5,
              height: Math.random() * 2.5 + 0.5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
              animation: `twinkle ${2 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Perspective container */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] max-w-[700px]"
        style={{ perspective: '350px', height: '100%' }}
      >
        <div
          className="absolute w-full text-center"
          style={{
            transformOrigin: '50% 100%',
            transform: 'rotateX(25deg)',
            animation: 'starWarsCrawl 82s linear forwards',
            bottom: '0',
          }}
        >
          <div className="pb-[50vh]">
            {/* Title */}
            <p className="text-blue-400 text-xl md:text-2xl tracking-[0.5em] uppercase mb-8" style={{ fontFamily: "'Cinzel', serif" }}>
              Hace mucho tiempo, en una clase muy, muy lejana...
            </p>

            <h1
              className="text-6xl md:text-8xl font-black tracking-[0.15em] mb-6"
              style={{
                fontFamily: "'Cinzel', serif",
                color: '#d4a853',
                textShadow: '0 0 30px rgba(212, 168, 83, 0.6)',
              }}
            >
              JEOPARDY!
            </h1>
            <h2
              className="text-4xl md:text-5xl font-bold tracking-[0.4em] text-yellow-200/80 mb-16"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              FILOSOFÍA
            </h2>

            <div className="greek-border w-64 mx-auto my-12 opacity-40" />

            {/* Story paragraph */}
            <p className="text-xl md:text-2xl text-yellow-100/90 leading-relaxed max-w-2xl mx-auto mb-16 tracking-wide">
              En un rincón del conocimiento, tres valientes estudiantes se adentraron
              en los misterios de la filosofía antigua, presocrática y medieval.
              Desde Tales de Mileto hasta Santo Tomás de Aquino, exploraron las grandes
              preguntas de la humanidad...
            </p>

            <div className="greek-border w-48 mx-auto my-12 opacity-30" />

            {/* Credits */}
            <h3
              className="text-4xl md:text-6xl font-black mb-14 tracking-wider uppercase"
              style={{
                fontFamily: "'Cinzel', serif",
                color: '#d4a853',
                textShadow: '0 0 20px rgba(212, 168, 83, 0.5)',
              }}
            >
              Hecho por
            </h3>

            <div className="space-y-12 mb-20">
              <div>
                <p className="text-4xl md:text-5xl font-bold text-yellow-100 tracking-[0.12em]" style={{ fontFamily: "'Cinzel', serif" }}>
                  Fernando Z González Berlanga
                </p>
                <p className="text-sm md:text-base text-yellow-500/50 tracking-[0.3em] uppercase mt-2">Desarrollo & Diseño</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-bold text-yellow-100 tracking-[0.12em]" style={{ fontFamily: "'Cinzel', serif" }}>
                  Rodrigo Reyna Lopez
                </p>
                <p className="text-sm md:text-base text-yellow-500/50 tracking-[0.3em] uppercase mt-2">Investigación & Contenido</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-bold text-yellow-100 tracking-[0.12em]" style={{ fontFamily: "'Cinzel', serif" }}>
                  Vicente Morales Nieto
                </p>
                <p className="text-sm md:text-base text-yellow-500/50 tracking-[0.3em] uppercase mt-2">Diseño & Creatividad</p>
              </div>
            </div>

            <div className="greek-border w-48 mx-auto my-12 opacity-30" />

            {/* Additional credits */}
            <div className="space-y-10 mb-20">
              <div>
                <p className="text-base md:text-lg text-yellow-500/40 tracking-[0.3em] uppercase mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
                  Categorías
                </p>
                <p className="text-xl md:text-2xl text-yellow-100/60 tracking-wider">
                  Filosofía Clásica · Filosofía Presocrática · Filosofía Medieval
                </p>
              </div>
              <div>
                <p className="text-base md:text-lg text-yellow-500/40 tracking-[0.3em] uppercase mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
                  Filósofos Destacados
                </p>
                <p className="text-xl md:text-2xl text-yellow-100/60 tracking-wider">
                  Sócrates · Platón · Aristóteles · Heráclito · Parménides
                </p>
                <p className="text-xl md:text-2xl text-yellow-100/60 tracking-wider mt-2">
                  Tales de Mileto · Empédocles · San Agustín · Santo Tomás · Averroes
                </p>
              </div>
              <div>
                <p className="text-base md:text-lg text-yellow-500/40 tracking-[0.3em] uppercase mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
                  Tecnologías
                </p>
                <p className="text-xl md:text-2xl text-yellow-100/60 tracking-wider">
                  React · Vite · Tailwind CSS · Web Audio API
                </p>
              </div>
              <div>
                <p className="text-base md:text-lg text-yellow-500/40 tracking-[0.3em] uppercase mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
                  Materia
                </p>
                <p className="text-xl md:text-2xl text-yellow-100/60 tracking-wider">
                  Filosofía · Proyecto Escolar
                </p>
              </div>
            </div>

            <div className="greek-border w-64 mx-auto my-16 opacity-30" />

            {/* Quotes section */}
            <div className="space-y-10 mb-20 max-w-3xl mx-auto">
              <div>
                <p className="text-xl md:text-2xl text-yellow-200/50 italic tracking-wider leading-relaxed">
                  "Solo sé que no sé nada"
                </p>
                <p className="text-sm md:text-base text-yellow-500/30 tracking-[0.3em] uppercase mt-2" style={{ fontFamily: "'Cinzel', serif" }}>
                  — Sócrates
                </p>
              </div>

              <div>
                <p className="text-xl md:text-2xl text-yellow-200/50 italic tracking-wider leading-relaxed mt-10">
                  "Conócete a ti mismo"
                </p>
                <p className="text-sm md:text-base text-yellow-500/30 tracking-[0.3em] uppercase mt-2" style={{ fontFamily: "'Cinzel', serif" }}>
                  — Inscripción en el Templo de Apolo en Delfos
                </p>
              </div>

              <div>
                <p className="text-xl md:text-2xl text-yellow-200/50 italic tracking-wider leading-relaxed mt-10">
                  "El ser se dice de muchas maneras"
                </p>
                <p className="text-sm md:text-base text-yellow-500/30 tracking-[0.3em] uppercase mt-2" style={{ fontFamily: "'Cinzel', serif" }}>
                  — Aristóteles
                </p>
              </div>

              <div>
                <p className="text-xl md:text-2xl text-yellow-200/50 italic tracking-wider leading-relaxed mt-10">
                  "La vida no examinada no merece ser vivida"
                </p>
                <p className="text-sm md:text-base text-yellow-500/30 tracking-[0.3em] uppercase mt-2" style={{ fontFamily: "'Cinzel', serif" }}>
                  — Sócrates
                </p>
              </div>

              <div>
                <p className="text-xl md:text-2xl text-yellow-200/50 italic tracking-wider leading-relaxed mt-10">
                  "Nadie se baña en el río dos veces porque todo cambia en el río y en el que se baña"
                </p>
                <p className="text-sm md:text-base text-yellow-500/30 tracking-[0.3em] uppercase mt-2" style={{ fontFamily: "'Cinzel', serif" }}>
                  — Heráclito
                </p>
              </div>

              <div>
                <p className="text-xl md:text-2xl text-yellow-200/50 italic tracking-wider leading-relaxed mt-10">
                  "Busco a un hombre honesto"
                </p>
                <p className="text-sm md:text-base text-yellow-500/30 tracking-[0.3em] uppercase mt-2" style={{ fontFamily: "'Cinzel', serif" }}>
                  — Diógenes de Sinope
                </p>
              </div>
              
              <div>
                <p className="text-xl md:text-2xl text-yellow-200/50 italic tracking-wider leading-relaxed mt-10">
                  "El sabio no se lamenta de lo que no tiene, sino que se alegra de lo que tiene"
                </p>
                <p className="text-sm md:text-base text-yellow-500/30 tracking-[0.3em] uppercase mt-2" style={{ fontFamily: "'Cinzel', serif" }}>
                  — Epicteto
                </p>
              </div>

              <div>
                <p className="text-xl md:text-2xl text-yellow-200/50 italic tracking-wider leading-relaxed mt-10">
                  "Yo no soy un ateniense ni un griego, sino un ciudadano del mundo"
                </p>
                <p className="text-sm md:text-base text-yellow-500/30 tracking-[0.3em] uppercase mt-2" style={{ fontFamily: "'Cinzel', serif" }}>
                  — Sócrates
                </p>
              </div>
            </div>

            <div className="greek-border w-48 mx-auto my-16 opacity-20" />

            {/* Final message */}
            <div className="mt-16 mb-40">
              <p className="text-3xl md:text-4xl text-yellow-200/40 tracking-[0.2em] uppercase mb-6" style={{ fontFamily: "'Cinzel', serif" }}>
                Gracias por jugar
              </p>
              <p className="text-lg md:text-xl text-yellow-500/20 tracking-[0.2em]" style={{ fontFamily: "'Cinzel', serif" }}>
                Que la sabiduría te acompañe
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Skip button */}
      <button
        onClick={onFinish}
        className="absolute bottom-8 right-8 z-[110] text-xs text-slate-600 hover:text-slate-300 transition-colors duration-300 tracking-[0.2em] uppercase border border-slate-800 hover:border-slate-600 px-4 py-2 rounded-lg"
        style={{ fontFamily: "'Cinzel', serif" }}
      >
        Omitir ›
      </button>
    </div>
  );
}

export default StarWarsCrawl;
