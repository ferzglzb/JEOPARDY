import { useState, useEffect } from 'react';
import StarWarsCrawl from './StarWarsCrawl';
import { sfxVictoryFanfare, stopCrawlTheme } from './sounds';

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
