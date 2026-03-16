import { useState } from 'react';

function StartScreen({ onStart }) {
  const [playerCount, setPlayerCount] = useState(1);
  const [playerNames, setPlayerNames] = useState(['']);

  const handleCountChange = (count) => {
    setPlayerCount(count);
    setPlayerNames(Array(count).fill(''));
  };

  const handleNameChange = (index, name) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalNames = playerNames.map((name, i) => name.trim() || `Jugador ${i + 1}`);
    onStart(finalNames);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-slate-800 p-8 rounded-2xl shadow-[0_0_30px_rgba(234,179,8,0.15)] border border-yellow-500/30 max-w-md w-full">
        <h1 className="text-4xl md:text-5xl font-black text-center text-yellow-500 mb-2 uppercase tracking-widest" style={{ textShadow: '0 0 15px rgba(234, 179, 8, 0.4)' }}>
          Jeopardy!
        </h1>
        <h2 className="text-2xl font-bold text-center text-slate-300 mb-8 tracking-wider">
          FILOSOFÍA
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-yellow-500 font-bold mb-3 uppercase tracking-wide text-sm">
              Cantidad de Jugadores
            </label>
            <div className="flex gap-4">
              {[1, 2, 3].map(num => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleCountChange(num)}
                  className={`flex-1 py-3 rounded-lg font-bold transition-all duration-300 ${
                    playerCount === num 
                      ? 'bg-yellow-500 text-slate-900 shadow-[0_0_15px_rgba(234,179,8,0.4)]' 
                      : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {playerNames.map((name, index) => (
              <div key={index}>
                <label className="block text-slate-400 font-medium mb-1 text-sm">
                  Nombre Jugador {index + 1}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => handleNameChange(index, e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 rounded-lg px-4 py-3 text-white placeholder-slate-500 outline-none transition-all"
                  placeholder={`Ej. Platón`}
                  maxLength={15}
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-black py-4 rounded-lg text-lg uppercase tracking-widest transition-all duration-300 shadow-[0_4px_20px_rgba(234,179,8,0.3)] hover:shadow-[0_4px_30px_rgba(234,179,8,0.5)] active:scale-[0.98]"
          >
            COMENZAR JUEGO
          </button>
        </form>
      </div>
    </div>
  );
}

export default StartScreen;
