function Board({ categories, answered, onQuestionSelect }) {
  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Categories Header */}
      <div className="grid grid-cols-3 gap-2 md:gap-4 mb-2 md:mb-4">
        {categories.map((cat, i) => (
          <div 
            key={i} 
            className="bg-slate-800 border-b-4 border-yellow-500 text-center p-4 md:p-6 rounded-t-lg flex items-center justify-center min-h-[100px] shadow-lg"
          >
            <h2 className="text-xl md:text-2xl font-black text-slate-200 uppercase tracking-widest break-words" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
              {cat.name}
            </h2>
          </div>
        ))}
      </div>

      {/* Questions Grid */}
      <div className="grid grid-cols-3 gap-2 md:gap-4">
        {categories[0].questions.map((_, questionIndex) => {
          return categories.map((cat, catIndex) => {
            const question = cat.questions[questionIndex];
            const isAnswered = answered[`${catIndex}-${questionIndex}`];
            
            return (
              <button
                key={`${catIndex}-${questionIndex}`}
                onClick={() => !isAnswered && onQuestionSelect(catIndex, questionIndex)}
                disabled={isAnswered}
                className={`
                  relative aspect-[4/3] flex items-center justify-center text-3xl md:text-5xl font-black rounded-lg transition-all duration-300
                  ${isAnswered 
                    ? 'bg-slate-900 border-2 border-slate-800 text-slate-800 cursor-not-allowed opacity-50' 
                    : 'bg-slate-700 hover:bg-slate-600 border-2 border-slate-600 hover:border-yellow-400 text-yellow-400 shadow-md hover:shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:-translate-y-1 cursor-pointer group'
                  }
                `}
                style={{
                  textShadow: isAnswered ? 'none' : '0 4px 10px rgba(0,0,0,0.4), 0 0 10px rgba(250,204,21,0.2)'
                }}
              >
                {!isAnswered && (
                  <span className="group-hover:scale-110 transition-transform duration-300">
                    ${question.points}
                  </span>
                )}
              </button>
            );
          });
        })}
      </div>
    </div>
  );
}

export default Board;
