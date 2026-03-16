function EndScreen({ players, onRestart }) {
  // Sort players by score descending
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const winner = sortedPlayers[0];
  const isTie = sortedPlayers.length > 1 && sortedPlayers[0].score === sortedPlayers[1].score;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 py-12">
      <div className="bg-slate-800 p-8 md:p-12 rounded-2xl shadow-[0_0_50px_rgba(234,179,8,0.2)] border border-yellow-500/50 max-w-2xl w-full text-center relative overflow-hidden">
        
        {/* Confetti or decorative elements could go here */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-600 via-yellow-300 to-yellow-600"></div>

        <h1 className="text-4xl md:text-5xl font-black text-slate-300 mb-8 uppercase tracking-widest">
          ¡Juego Terminado!
        </h1>

        <div className="mb-12">
          {isTie ? (
            <h2 className="text-3xl md:text-5xl font-black text-yellow-400 uppercase drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]">
              ¡Empate!
            </h2>
          ) : (
            <>
              <p className="text-slate-400 text-xl font-bold uppercase tracking-wider mb-2">Gran Ganador</p>
              <h2 className="text-5xl md:text-7xl font-black text-yellow-400 uppercase break-words" style={{ textShadow: '0 0 20px rgba(250, 204, 21, 0.6)' }}>
                {winner.name}
              </h2>
              <p className="text-3xl font-bold text-white mt-4">
                {winner.score} <span className="text-xl text-yellow-500 uppercase tracking-widest">Pts</span>
              </p>
            </>
          )}
        </div>

        <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700 max-w-md mx-auto mb-10">
          <h3 className="text-slate-400 font-bold uppercase tracking-wider mb-4 border-b border-slate-700 pb-2">Posiciones Finales</h3>
          <ul className="space-y-4">
            {sortedPlayers.map((player, index) => (
              <li key={player.id} className="flex justify-between items-center text-lg md:text-xl">
                <div className="flex items-center gap-3">
                  <span className={`font-black ${index === 0 ? 'text-yellow-500' : 'text-slate-500'}`}>
                    #{index + 1}
                  </span>
                  <span className="font-bold text-slate-200 uppercase">{player.name}</span>
                </div>
                <span className={`font-black ${player.score < 0 ? 'text-red-400' : 'text-yellow-400'}`}>
                  {player.score}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={onRestart}
          className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-black py-4 px-12 rounded-lg text-xl uppercase tracking-widest transition-all duration-300 shadow-[0_4px_20px_rgba(234,179,8,0.4)] hover:shadow-[0_4px_30px_rgba(234,179,8,0.6)] hover:-translate-y-1 w-full max-w-sm"
        >
          Volver a Jugar
        </button>
      </div>
    </div>
  );
}

export default EndScreen;
