import { useState, useEffect } from 'react';
import { sfxVictoryFanfare, playStarWarsCrawlTheme, stopCrawlTheme } from './sounds';

function Confetti() {
  const colors = ['#d4a853', '#f0d078', '#6366f1', '#a855f7', '#22d3ee', '#f43f5e', '#4ade80'];
  const pieces = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 2 + Math.random() * 3,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: 6 + Math.random() * 10,
    shape: Math.random() > 0.5 ? 'circle' : 'square',
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
      {pieces.map(p => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            top: '-5%',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.shape === 'circle' ? '50%' : '2px',
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

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
                  Fernando Z González
                </p>
                <p className="text-xs text-yellow-500/50 tracking-[0.3em] uppercase mt-1">Desarrollo & Diseño</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-yellow-100 tracking-[0.12em]" style={{ fontFamily: "'Cinzel', serif" }}>
                  Rodrigo Reyna
                </p>
                <p className="text-xs text-yellow-500/50 tracking-[0.3em] uppercase mt-1">Investigación & Contenido</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-yellow-100 tracking-[0.12em]" style={{ fontFamily: "'Cinzel', serif" }}>
                  Ian Yee
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

const PODIUM_STYLES = [
  { bg: 'from-yellow-600/30 to-yellow-900/20', border: 'border-yellow-500/50', label: '🏆', textColor: 'text-yellow-400' },
  { bg: 'from-slate-400/20 to-slate-600/10', border: 'border-slate-400/40', label: '🥈', textColor: 'text-slate-300' },
  { bg: 'from-amber-700/20 to-amber-900/10', border: 'border-amber-600/40', label: '🥉', textColor: 'text-amber-400' },
];

function EndScreen({ players, onRestart }) {
  const [showContent, setShowContent] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCrawl, setShowCrawl] = useState(false);

  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const winner = sortedPlayers[0];
  const isTie = sortedPlayers.length > 1 && sortedPlayers[0].score === sortedPlayers[1].score;

  useEffect(() => {
    setTimeout(() => setShowContent(true), 200);
    setTimeout(() => setShowConfetti(true), 600);
  }, []);

  const handleRestart = () => {
    setShowCrawl(true);
  };

  const handleCrawlFinish = () => {
    stopCrawlTheme();
    setShowCrawl(false);
    onRestart();
  };

  useEffect(() => {
    if (showCrawl) {
      const timer = setTimeout(() => handleCrawlFinish(), 58000);
      return () => clearTimeout(timer);
    }
  }, [showCrawl]);

  return (
    <>
      {showCrawl && <StarWarsCrawl onFinish={handleCrawlFinish} />}

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/95 backdrop-blur-lg overflow-y-auto">
        {showConfetti && <Confetti />}

        <div className={`w-full max-w-2xl transition-all duration-1000 ${showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <div className="glass-panel rounded-2xl p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-yellow-600 via-yellow-300 to-yellow-600" />

            <div className="text-center mb-8">
              <div className="text-5xl mb-3 animate-float">🏛️</div>
              <h1
                className="text-3xl md:text-4xl font-black uppercase tracking-[0.2em] text-slate-300 mb-1"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                ¡Juego Terminado!
              </h1>
              <div className="greek-border w-32 mx-auto my-3" />
            </div>

            <div className="text-center mb-8">
              {isTie ? (
                <div className="animate-fadeInUp">
                  <p className="text-xl uppercase tracking-[0.3em] text-slate-500 mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
                    ¡Empate Épico!
                  </p>
                  <p className="text-4xl md:text-5xl font-black animate-shimmer" style={{ fontFamily: "'Cinzel', serif" }}>
                    ⚖️ {winner.score} pts
                  </p>
                </div>
              ) : (
                <div className="animate-fadeInUp">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500 mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
                    Gran Filósofo Ganador
                  </p>
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <span className="text-4xl">{winner.avatar}</span>
                    <h2
                      className="text-4xl md:text-6xl font-black animate-shimmer break-words"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      {winner.name}
                    </h2>
                  </div>
                  <p className="text-3xl font-black gold-text" style={{ textShadow: '0 0 20px var(--gold-glow)' }}>
                    {winner.score.toLocaleString()} <span className="text-lg uppercase tracking-[0.3em]">pts</span>
                  </p>
                </div>
              )}
            </div>

            <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-700/50 mb-8">
              <h3 className="text-center text-xs uppercase tracking-[0.3em] text-slate-500 mb-4 pb-2 border-b border-slate-700/50"
                  style={{ fontFamily: "'Cinzel', serif" }}>
                Posiciones Finales
              </h3>
              <div className="space-y-2">
                {sortedPlayers.map((player, index) => {
                  const podium = PODIUM_STYLES[index] || { bg: 'from-slate-800/30 to-slate-900/10', border: 'border-slate-700/30', label: `#${index + 1}`, textColor: 'text-slate-400' };
                  return (
                    <div
                      key={player.id}
                      className={`flex items-center justify-between bg-gradient-to-r ${podium.bg} border ${podium.border} rounded-lg p-3 animate-fadeInUp`}
                      style={{ animationDelay: `${0.8 + index * 0.15}s` }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{podium.label}</span>
                        <span>{player.avatar}</span>
                        <span className={`font-bold text-sm uppercase tracking-wider ${podium.textColor}`}
                              style={{ fontFamily: "'Cinzel', serif" }}>
                          {player.name}
                        </span>
                      </div>
                      <span className={`font-black text-xl ${player.score < 0 ? 'text-red-400' : podium.textColor}`}>
                        {player.score.toLocaleString()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleRestart}
                className="px-12 py-4 rounded-xl font-black uppercase tracking-[0.25em] text-sm transition-all duration-400 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 text-slate-900 shadow-[0_4px_25px_var(--gold-glow)] hover:shadow-[0_4px_40px_rgba(212,168,83,0.5)] hover:-translate-y-1 active:translate-y-0"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                🔄 Volver a Jugar
              </button>
            </div>

            <div className="text-center mt-6">
              <p className="text-[10px] italic text-slate-600 tracking-wider">
                "La verdadera sabiduría está en reconocer la propia ignorancia" — Sócrates
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EndScreen;
