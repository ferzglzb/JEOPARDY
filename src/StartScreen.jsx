import { useState, useEffect } from 'react';

const QUOTES = [
  { text: "Conócete a ti mismo", author: "Sócrates" },
  { text: "El hombre es la medida de todas las cosas", author: "Protágoras" },
  { text: "Pienso, luego existo", author: "Descartes" },
  { text: "La vida no examinada no merece ser vivida", author: "Sócrates" },
  { text: "El ser se dice de muchas maneras", author: "Aristóteles" },
];

function StartScreen({ onStart, onShowCredits }) {
  const [playerCount, setPlayerCount] = useState(2);
  const [playerNames, setPlayerNames] = useState(['', '']);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 300);
    const interval = setInterval(() => {
      setCurrentQuote(q => (q + 1) % QUOTES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleCountChange = (count) => {
    setPlayerCount(count);
    const newNames = Array(count).fill('').map((_, i) => playerNames[i] || '');
    setPlayerNames(newNames);
  };

  const handleNameChange = (index, name) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalNames = playerNames.map((name, i) => name.trim() || `Filósofo ${i + 1}`);
    onStart(finalNames);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 relative overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute w-[500px] h-[500px] rounded-full border border-yellow-500/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      <div className="absolute w-[700px] h-[700px] rounded-full border border-yellow-500/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute w-[900px] h-[900px] rounded-full border border-yellow-500/[0.02] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '2s' }} />

      <div className={`w-full max-w-lg transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Title Section */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-float">🏛️</div>
          <h1
            className="text-5xl md:text-7xl font-black tracking-[0.15em] mb-2 animate-shimmer"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            JEOPARDY!
          </h1>
          <div className="greek-border w-48 mx-auto my-3" />
          <h2
            className="text-2xl md:text-3xl font-bold tracking-[0.4em] text-slate-400 uppercase"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            FILOSOFÍA
          </h2>
        </div>

        {/* Rotating Quote */}
        <div className="text-center mb-8 h-16 flex items-center justify-center">
          <div key={currentQuote} className="animate-fadeInUp">
            <p className="text-sm md:text-base italic text-slate-400">
              "{QUOTES[currentQuote].text}"
            </p>
            <p className="text-xs gold-text mt-1" style={{ fontFamily: "'Cinzel', serif" }}>
              — {QUOTES[currentQuote].author}
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="glass-panel rounded-2xl p-6 md:p-8 gold-glow">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Player Count Selector */}
            <div>
              <label className="block gold-text font-bold mb-3 uppercase tracking-[0.2em] text-xs" style={{ fontFamily: "'Cinzel', serif" }}>
                Jugadores
              </label>
              <div className="grid grid-cols-6 gap-2">
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handleCountChange(num)}
                    className={`py-2.5 rounded-lg font-bold text-sm transition-all duration-300 ${
                      playerCount === num
                        ? 'bg-gradient-to-b from-yellow-500 to-yellow-700 text-slate-900 shadow-[0_0_15px_var(--gold-glow)] scale-105'
                        : 'bg-slate-800 text-slate-500 hover:bg-slate-700 hover:text-slate-300 border border-slate-700'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Player Name Inputs */}
            <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
              {playerNames.map((name, index) => (
                <div key={index} className="animate-fadeInUp" style={{ animationDelay: `${index * 0.08}s` }}>
                  <div className="flex items-center gap-3 bg-slate-900/60 border border-slate-700/80 focus-within:border-yellow-600 rounded-lg px-3 py-2.5 transition-all duration-300 focus-within:shadow-[0_0_10px_var(--gold-glow)]">
                    <span className="text-lg">{['🦉', '🏛️', '📜', '⚖️', '🔮', '🕯️'][index]}</span>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => handleNameChange(index, e.target.value)}
                      className="flex-1 bg-transparent text-white placeholder-slate-600 outline-none text-sm"
                      placeholder={`Filósofo ${index + 1}`}
                      maxLength={14}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Start Button */}
            <button
              type="submit"
              className="w-full mt-2 py-4 rounded-xl text-lg font-black uppercase tracking-[0.25em] transition-all duration-400 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 text-slate-900 shadow-[0_4px_25px_var(--gold-glow)] hover:shadow-[0_4px_40px_rgba(212,168,83,0.5)] hover:-translate-y-1 active:translate-y-0 active:scale-[0.98]"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              ⚡ Comenzar Juego
            </button>
          </form>
        </div>

        {/* Bottom decorative */}
        <div className="text-center mt-6">
          <div className="greek-border w-32 mx-auto mb-2" />
          <p className="text-[10px] text-slate-700 tracking-[0.3em] uppercase mb-4">
            3 Categorías · 15 Preguntas · 1 Ganador
          </p>
          <button
            type="button"
            onClick={onShowCredits}
            className="text-[10px] text-yellow-600/50 hover:text-yellow-400 transition-colors uppercase tracking-[0.2em]"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            ✧ Ver Créditos ✧
          </button>
        </div>
      </div>
    </div>
  );
}

export default StartScreen;
