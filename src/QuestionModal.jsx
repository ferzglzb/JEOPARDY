import { useState } from 'react';

function QuestionModal({ question, players, onScoreUpdate, onComplete, onClose }) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [awardedPlayers, setAwardedPlayers] = useState({}); // To disable buttons after a player is judged

  const handleJudge = (playerId, isCorrect) => {
    onScoreUpdate(playerId, question.points, isCorrect);
    setAwardedPlayers({ ...awardedPlayers, [playerId]: true });
    
    // Si es correcto, normalmente se termina la pregunta (solo 1 gana los puntos positivos)
    // Si se quiere permitir que otros intenten tras un fallo, se deja abierta
    if (isCorrect) {
      setTimeout(() => {
        onComplete();
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-800 w-full max-w-4xl min-h-[50vh] rounded-2xl p-8 shadow-[0_0_50px_rgba(234,179,8,0.2)] border border-yellow-500/50 flex flex-col items-center justify-center relative zoom-in-95 duration-200">
        
        {/* Close without answering button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div className="text-yellow-500 font-bold text-xl md:text-2xl mb-8 tracking-widest uppercase">
          Por {question.points} puntos
        </div>

        <div className="text-3xl md:text-5xl lg:text-6xl font-black text-center text-white mb-12 leading-tight uppercase" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
          "{question.clue}"
        </div>

        {!showAnswer ? (
          <button
            onClick={() => setShowAnswer(true)}
            className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-black py-4 px-12 rounded-lg text-xl uppercase tracking-widest transition-all duration-300 shadow-[0_4px_20px_rgba(234,179,8,0.4)] hover:shadow-[0_4px_30px_rgba(234,179,8,0.6)] hover:-translate-y-1 mt-auto"
          >
            Revelar Respuesta
          </button>
        ) : (
          <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500 mt-auto">
            <div className="text-2xl md:text-4xl font-bold text-yellow-400 mb-12 text-center uppercase">
              Respuesta: <span className="text-white">{question.answer}</span>
            </div>

            <div className="w-full max-w-2xl bg-slate-900/50 p-6 rounded-xl border border-slate-700">
              <h3 className="text-slate-300 text-center uppercase tracking-wider font-bold mb-6">Asignar Puntos</h3>
              
              <div className="flex flex-col gap-4">
                {players.map(player => (
                  <div key={player.id} className="flex items-center justify-between bg-slate-800 p-4 rounded-lg">
                    <span className="text-xl font-bold text-white uppercase">{player.name}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleJudge(player.id, false)}
                        disabled={awardedPlayers[player.id]}
                        className={`px-4 py-2 rounded font-bold uppercase tracking-wider transition-colors ${
                          awardedPlayers[player.id] 
                            ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
                            : 'bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/50 hover:border-red-500'
                        }`}
                      >
                        - {question.points}
                      </button>
                      <button
                        onClick={() => handleJudge(player.id, true)}
                        disabled={awardedPlayers[player.id]}
                        className={`px-4 py-2 rounded font-bold uppercase tracking-wider transition-colors ${
                          awardedPlayers[player.id] 
                            ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
                            : 'bg-green-500/20 hover:bg-green-500 text-green-500 hover:text-white border border-green-500/50 hover:border-green-500'
                        }`}
                      >
                        + {question.points}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  onClick={onComplete}
                  className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-lg uppercase tracking-wider transition-colors"
                >
                  Nadie Acertó / Continuar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionModal;
