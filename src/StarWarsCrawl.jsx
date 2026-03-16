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
            animation: 'starWarsCrawl 55s linear forwards',
            bottom: '0',
          }}
        >
          <div className="pb-[50vh]">
            {/* Title */}
            <p className="text-blue-400 text-base md:text-lg tracking-[0.5em] uppercase mb-6" style={{ fontFamily: "'Cinzel', serif" }}>
              Hace mucho tiempo, en una clase muy, muy lejana...
            </p>

            <h1
              className="text-4xl md:text-6xl font-black tracking-[0.15em] mb-4"
              style={{
                fontFamily: "'Cinzel', serif",
                color: '#d4a853',
                textShadow: '0 0 30px rgba(212, 168, 83, 0.6)',
              }}
            >
              JEOPARDY!
            </h1>
            <h2
              className="text-2xl md:text-3xl font-bold tracking-[0.4em] text-yellow-200/80 mb-12"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              FILOSOFÍA
            </h2>

            <div className="greek-border w-48 mx-auto my-8 opacity-40" />

            {/* Story paragraph */}
            <p className="text-base md:text-lg text-yellow-100/90 leading-relaxed max-w-lg mx-auto mb-12 tracking-wide">
              En un rincón del conocimiento, tres valientes estudiantes se adentraron
              en los misterios de la filosofía antigua, presocrática y medieval.
              Desde Tales de Mileto hasta Santo Tomás de Aquino, exploraron las grandes
              preguntas de la humanidad...
            </p>

            <div className="greek-border w-32 mx-auto my-8 opacity-30" />

            {/* Credits */}
            <h3
              className="text-2xl md:text-4xl font-black mb-10 tracking-wider uppercase"
              style={{
                fontFamily: "'Cinzel', serif",
                color: '#d4a853',
                textShadow: '0 0 20px rgba(212, 168, 83, 0.5)',
              }}
            >
              Hecho por
            </h3>

            <div className="space-y-8 mb-14">
              <div>
                <p className="text-2xl md:text-3xl font-bold text-yellow-100 tracking-[0.12em]" style={{ fontFamily: "'Cinzel', serif" }}>
                  Fernando Z González Berlanga
                </p>
                <p className="text-xs text-yellow-500/50 tracking-[0.3em] uppercase mt-1">Desarrollo & Diseño</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-yellow-100 tracking-[0.12em]" style={{ fontFamily: "'Cinzel', serif" }}>
                  Rodrigo Reyna Lopez
                </p>
                <p className="text-xs text-yellow-500/50 tracking-[0.3em] uppercase mt-1">Investigación & Contenido</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-yellow-100 tracking-[0.12em]" style={{ fontFamily: "'Cinzel', serif" }}>
                  Vicente Morales Nieto
                </p>
                <p className="text-xs text-yellow-500/50 tracking-[0.3em] uppercase mt-1">Diseño & Creatividad</p>
              </div>
            </div>

            <div className="greek-border w-32 mx-auto my-8 opacity-30" />

            {/* Additional credits */}
            <div className="space-y-6 mb-14">
              <div>
                <p className="text-xs text-yellow-500/40 tracking-[0.3em] uppercase mb-1" style={{ fontFamily: "'Cinzel', serif" }}>
                  Categorías
                </p>
                <p className="text-sm text-yellow-100/60 tracking-wider">
                  Filosofía Clásica · Filosofía Presocrática · Filosofía Medieval
                </p>
              </div>
              <div>
                <p className="text-xs text-yellow-500/40 tracking-[0.3em] uppercase mb-1" style={{ fontFamily: "'Cinzel', serif" }}>
                  Filósofos Destacados
                </p>
                <p className="text-sm text-yellow-100/60 tracking-wider">
                  Sócrates · Platón · Aristóteles · Heráclito · Parménides
                </p>
                <p className="text-sm text-yellow-100/60 tracking-wider mt-1">
                  Tales de Mileto · Empédocles · San Agustín · Santo Tomás · Averroes
                </p>
              </div>
              <div>
                <p className="text-xs text-yellow-500/40 tracking-[0.3em] uppercase mb-1" style={{ fontFamily: "'Cinzel', serif" }}>
                  Tecnologías
                </p>
                <p className="text-sm text-yellow-100/60 tracking-wider">
                  React · Vite · Tailwind CSS · Web Audio API
                </p>
              </div>
              <div>
                <p className="text-xs text-yellow-500/40 tracking-[0.3em] uppercase mb-1" style={{ fontFamily: "'Cinzel', serif" }}>
                  Materia
                </p>
                <p className="text-sm text-yellow-100/60 tracking-wider">
                  Filosofía · Proyecto Escolar
                </p>
              </div>
            </div>

            <div className="greek-border w-48 mx-auto my-8 opacity-30" />

            {/* Quotes section */}
            <div className="space-y-6 mb-14">
              <p className="text-sm text-yellow-200/50 italic tracking-wider max-w-md mx-auto leading-relaxed">
                "Solo sé que no sé nada"
              </p>
              <p className="text-[10px] text-yellow-500/30 tracking-[0.3em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                — Sócrates
              </p>

              <p className="text-sm text-yellow-200/50 italic tracking-wider max-w-md mx-auto leading-relaxed mt-6">
                "Conócete a ti mismo"
              </p>
              <p className="text-[10px] text-yellow-500/30 tracking-[0.3em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                — Inscripción en el Templo de Apolo en Delfos
              </p>

              <p className="text-sm text-yellow-200/50 italic tracking-wider max-w-md mx-auto leading-relaxed mt-6">
                "El ser se dice de muchas maneras"
              </p>
              <p className="text-[10px] text-yellow-500/30 tracking-[0.3em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                — Aristóteles
              </p>

              <p className="text-sm text-yellow-200/50 italic tracking-wider max-w-md mx-auto leading-relaxed mt-6">
                "La vida no examinada no merece ser vivida"
              </p>
              <p className="text-[10px] text-yellow-500/30 tracking-[0.3em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                — Sócrates
              </p>

              <p className="text-sm text-yellow-200/50 italic tracking-wider max-w-md mx-auto leading-relaxed mt-6">
                "Nadie se baña en el río dos veces porque todo cambia en el río y en el que se baña"
              </p>
              <p className="text-[10px] text-yellow-500/30 tracking-[0.3em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                — Heráclito
              </p>

              <p className="text-sm text-yellow-200/50 italic tracking-wider max-w-md mx-auto leading-relaxed mt-6">
                "Busco a un hombre honesto"
              </p>
              <p className="text-[10px] text-yellow-500/30 tracking-[0.3em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                — Diógenes de Sinope
              </p>

              <p className="text-sm text-yellow-200/50 italic tracking-wider max-w-md mx-auto leading-relaxed mt-6">
                "El sabio no se lamenta de lo que no tiene, sino que se alegra de lo que tiene"
              </p>
              <p className="text-[10px] text-yellow-500/30 tracking-[0.3em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                — Epicteto
              </p>

              <p className="text-sm text-yellow-200/50 italic tracking-wider max-w-md mx-auto leading-relaxed mt-6">
                "Yo no soy un ateniense ni un griego, sino un ciudadano del mundo"
              </p>
              <p className="text-[10px] text-yellow-500/30 tracking-[0.3em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                — Sócrates
              </p>
            </div>

            <div className="greek-border w-24 mx-auto my-8 opacity-20" />

            {/* Final message */}
            <div className="mt-8 mb-20">
              <p className="text-lg text-yellow-200/40 tracking-[0.2em] uppercase mb-4" style={{ fontFamily: "'Cinzel', serif" }}>
                Gracias por jugar
              </p>
              <p className="text-xs text-yellow-500/20 tracking-[0.2em]" style={{ fontFamily: "'Cinzel', serif" }}>
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
