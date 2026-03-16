const CATEGORY_ICONS = {
  'CLÁSICA': '🏛️',
  'PRESOCRÁTICA': '🔥',
  'MEDIEVAL': '⚔️',
};

const CATEGORY_COLORS = {
  'CLÁSICA': { from: 'from-blue-900/80', to: 'to-blue-800/60', accent: 'border-blue-400/30' },
  'PRESOCRÁTICA': { from: 'from-purple-900/80', to: 'to-purple-800/60', accent: 'border-purple-400/30' },
  'MEDIEVAL': { from: 'from-emerald-900/80', to: 'to-emerald-800/60', accent: 'border-emerald-400/30' },
};

function Board({ categories, answered, onQuestionSelect }) {
  return (
    <div className="w-full h-full flex flex-col gap-1.5 md:gap-2">
      {/* Category Headers */}
      <div className="grid grid-cols-3 gap-1.5 md:gap-2 flex-shrink-0">
        {categories.map((cat, i) => {
          const colors = CATEGORY_COLORS[cat.name] || CATEGORY_COLORS['CLÁSICA'];
          return (
            <div
              key={i}
              className={`bg-gradient-to-b ${colors.from} ${colors.to} border-b-2 border-yellow-500/60 text-center py-2.5 md:py-3 rounded-t-xl flex items-center justify-center gap-2 animate-fadeInUp backdrop-blur-md`}
              style={{ animationDelay: `${i * 0.1}s`, fontFamily: "'Cinzel', serif" }}
            >
              <span className="text-xl md:text-2xl">{CATEGORY_ICONS[cat.name] || '📚'}</span>
              <h2 className="text-xs md:text-sm lg:text-base font-black text-slate-200 uppercase tracking-[0.2em]">
                {cat.name}
              </h2>
            </div>
          );
        })}
      </div>

      {/* Questions Grid – fills remaining space */}
      <div className="grid grid-cols-3 gap-1.5 md:gap-2 flex-1 min-h-0">
        {categories[0].questions.map((_, questionIndex) => (
          categories.map((cat, catIndex) => {
            const question = cat.questions[questionIndex];
            const isAnswered = answered[`${catIndex}-${questionIndex}`];
            const staggerIndex = questionIndex * 3 + catIndex + 1;
            const colors = CATEGORY_COLORS[cat.name] || CATEGORY_COLORS['CLÁSICA'];

            return (
              <button
                key={`${catIndex}-${questionIndex}`}
                onClick={() => !isAnswered && onQuestionSelect(catIndex, questionIndex)}
                disabled={isAnswered}
                className={`
                  relative flex items-center justify-center rounded-lg transition-all duration-400 opacity-0 animate-fadeInUp overflow-hidden
                  stagger-${staggerIndex}
                  ${isAnswered
                    ? 'bg-slate-900/60 border border-slate-800/50 cursor-not-allowed'
                    : `card-3d glass-panel border ${colors.accent} hover:border-yellow-500/60 cursor-pointer group`
                  }
                `}
              >
                {isAnswered ? (
                  <div className="flex flex-col items-center gap-0.5 opacity-20">
                    <span className="text-lg">✓</span>
                  </div>
                ) : (
                  <>
                    {/* Hover shimmer overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Value */}
                    <div className="flex flex-col items-center z-10">
                      <span
                        className="text-2xl md:text-4xl lg:text-5xl font-black gold-text group-hover:scale-110 transition-transform duration-300"
                        style={{
                          fontFamily: "'Cinzel', serif",
                          textShadow: '0 2px 8px rgba(0,0,0,0.5), 0 0 15px var(--gold-glow)',
                        }}
                      >
                        {question.points}
                      </span>
                      <span className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-slate-500 group-hover:text-yellow-600 transition-colors mt-0.5">
                        puntos
                      </span>
                    </div>
                  </>
                )}
              </button>
            );
          })
        ))}
      </div>
    </div>
  );
}

export default Board;
