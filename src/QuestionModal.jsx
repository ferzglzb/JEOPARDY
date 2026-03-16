import { useState, useEffect } from 'react';
import { sfxModalOpen, sfxRevealAnswer, sfxCorrect, sfxWrong, startThinkingMusic, stopThinkingMusic } from './sounds';

function QuestionModal({ question, categoryName, players, onScoreUpdate, onComplete, onClose }) {
  const [phase, setPhase] = useState('clue'); // clue → answer → scoring
  const [awardedPlayers, setAwardedPlayers] = useState({});
  const [showEntrance, setShowEntrance] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setShowEntrance(true));
    sfxModalOpen();
    startThinkingMusic();
    return () => stopThinkingMusic();
  }, []);

  const handleReveal = () => {
    stopThinkingMusic();
    sfxRevealAnswer();
    setPhase('answer');
  };

  const handleJudge = (playerId, isCorrect) => {
    if (isCorrect) {
      sfxCorrect();
    } else {
      sfxWrong();
    }
    onScoreUpdate(playerId, question.points, isCorrect);
    const updated = { ...awardedPlayers, [playerId]: isCorrect ? 'correct' : 'wrong' };
    setAwardedPlayers(updated);

    if (Object.keys(updated).length === players.length) {
      setTimeout(() => onComplete(), 1000);
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ${showEntrance ? 'bg-black/85 backdrop-blur-md' : 'bg-transparent'}`}>
      <div className={`w-full max-w-3xl glass-panel rounded-2xl relative overflow-hidden transition-all duration-600 ${showEntrance ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
        style={{ boxShadow: '0 0 60px rgba(212, 168, 83, 0.15), 0 25px 50px rgba(0,0,0,0.5)' }}
      >
        {/* Top gold bar */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-800/80 text-slate-500 hover:text-white hover:bg-slate-700 transition-all z-20 text-lg"
        >
          ×
        </button>

        <div className="p-6 md:p-10">
          {/* Category badge */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-xs uppercase tracking-[0.3em] text-slate-500" style={{ fontFamily: "'Cinzel', serif" }}>
              {categoryName}
            </span>
            <span className="text-xs gold-text font-bold">·</span>
            <span className="text-xs uppercase tracking-[0.2em] gold-text font-bold" style={{ fontFamily: "'Cinzel', serif" }}>
              {question.points} pts
            </span>
          </div>

          {/* Decorative separators */}
          <div className="greek-border w-24 mx-auto my-3" />

          {/* Clue Text */}
          <div className="text-center my-8 md:my-10">
            <p
              className="text-2xl md:text-4xl lg:text-5xl font-black leading-tight uppercase tracking-wide"
              style={{
                fontFamily: "'Cinzel', serif",
                textShadow: '0 2px 15px rgba(0,0,0,0.6)',
                color: '#e8e0d0',
              }}
            >
              {question.clue}
            </p>
          </div>

          {phase === 'clue' && (
            <div className="flex justify-center">
              <button
                onClick={handleReveal}
                className="group relative px-10 py-4 rounded-xl font-black uppercase tracking-[0.25em] text-sm transition-all duration-400 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 text-slate-900 shadow-[0_4px_20px_var(--gold-glow)] hover:shadow-[0_4px_35px_rgba(212,168,83,0.5)] hover:-translate-y-1"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  Revelar Respuesta
                </span>
              </button>
            </div>
          )}

          {phase === 'answer' && (
            <div className="animate-revealFlip">
              {/* Answer reveal */}
              <div className="text-center mb-8">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
                  Respuesta
                </p>
                <p
                  className="text-3xl md:text-5xl font-black animate-shimmer"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {question.answer}
                </p>
              </div>

              {/* Scoring area */}
              <div className="bg-slate-900/50 rounded-xl p-4 md:p-5 border border-slate-700/50">
                <h3 className="text-center text-xs uppercase tracking-[0.3em] text-slate-500 mb-4" style={{ fontFamily: "'Cinzel', serif" }}>
                  Asignar Puntos
                </h3>
                <div className="space-y-2">
                  {players.map(player => {
                    const status = awardedPlayers[player.id];
                    return (
                      <div
                        key={player.id}
                        className={`flex items-center justify-between rounded-lg px-4 py-3 transition-all duration-300 ${
                          status === 'correct' ? 'bg-green-900/30 border border-green-500/30' :
                          status === 'wrong' ? 'bg-red-900/30 border border-red-500/30' :
                          'bg-slate-800/60 border border-slate-700/30'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span>{player.avatar}</span>
                          <span className="font-bold text-sm uppercase tracking-wider">{player.name}</span>
                          {status === 'correct' && <span className="text-green-400 text-lg">✓</span>}
                          {status === 'wrong' && <span className="text-red-400 text-lg">✗</span>}
                        </div>

                        {!status && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleJudge(player.id, false)}
                              className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-200"
                            >
                              Incorrecto
                            </button>
                            <button
                              onClick={() => handleJudge(player.id, true)}
                              className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500 hover:text-white transition-all duration-200"
                            >
                              Correcto
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 text-center">
                  <button
                    onClick={onComplete}
                    className="px-8 py-2.5 rounded-lg text-xs font-bold uppercase tracking-[0.2em] bg-slate-800 border border-slate-600 text-slate-400 hover:border-yellow-600 hover:text-white transition-all"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    Nadie Acertó · Continuar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom gold bar */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
      </div>
    </div>
  );
}

export default QuestionModal;
