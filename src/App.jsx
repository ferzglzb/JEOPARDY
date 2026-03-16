import { useState, useEffect } from 'react';
import StartScreen from './StartScreen';
import Board from './Board';
import QuestionModal from './QuestionModal';
import EndScreen from './EndScreen';
import { generateGameCategories } from './data';

const PHILOSOPHY_SYMBOLS = ['Φ', 'Ω', 'Σ', 'Ψ', 'Δ', 'Π', 'λ', 'α', 'θ', '∞', '☿', '⚛'];

function FloatingSymbols() {
  return (
    <div className="philosophy-bg">
      {PHILOSOPHY_SYMBOLS.map((symbol, i) => (
        <span
          key={i}
          className="absolute text-yellow-500 select-none pointer-events-none"
          style={{
            fontSize: `${Math.random() * 30 + 14}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.04 + Math.random() * 0.06,
            animation: `symbolFloat ${8 + Math.random() * 12}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
            fontFamily: "'Cinzel', serif",
          }}
        >
          {symbol}
        </span>
      ))}
    </div>
  );
}

function App() {
  const [gameState, setGameState] = useState('START');
  const [players, setPlayers] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [activePlayer, setActivePlayer] = useState(0);
  const [questionsAnsweredCount, setQuestionsAnsweredCount] = useState(0);
  const [categories, setCategories] = useState(() => generateGameCategories());

  const totalQuestions = categories.reduce((acc, cat) => acc + cat.questions.length, 0);

  const handleStartGame = (playerNames) => {
    const initialPlayers = playerNames.map((name, index) => ({
      id: index,
      name,
      score: 0,
      avatar: ['🦉', '🏛️', '📜', '⚖️', '🔮', '🕯️'][index % 6],
    }));
    setPlayers(initialPlayers);
    setGameState('PLAYING');
  };

  const handleQuestionSelect = (catIndex, questIndex) => {
    setCurrentQuestion({ catIndex, questIndex });
  };

  const handleScoreUpdate = (playerId, points, isCorrect) => {
    setPlayers(prev => prev.map(p => {
      if (p.id === playerId) {
        return { ...p, score: p.score + (isCorrect ? points : -points) };
      }
      return p;
    }));
    if (isCorrect) {
      setActivePlayer(playerId);
    }
  };

  const markQuestionAnswered = (catIndex, questIndex) => {
    const key = `${catIndex}-${questIndex}`;
    const newAnswered = { ...answeredQuestions, [key]: true };
    setAnsweredQuestions(newAnswered);
    setCurrentQuestion(null);
    const newCount = questionsAnsweredCount + 1;
    setQuestionsAnsweredCount(newCount);

    if (newCount >= totalQuestions) {
      setTimeout(() => setGameState('FINISHED'), 600);
    }
  };

  const closeQuestionWithoutAnswering = () => {
    setCurrentQuestion(null);
  };

  const handleRestart = () => {
    setGameState('START');
    setPlayers([]);
    setAnsweredQuestions({});
    setCurrentQuestion(null);
    setQuestionsAnsweredCount(0);
    setActivePlayer(0);
    setCategories(generateGameCategories()); // New random questions each game!
  };

  return (
    <div className="min-h-screen relative">
      <FloatingSymbols />

      <div className="relative z-10">
        {gameState === 'START' && <StartScreen onStart={handleStartGame} />}

        {gameState === 'PLAYING' && (
          <div className="flex flex-col h-screen p-3 md:p-4 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-3 animate-slideDown flex-shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-3xl md:text-4xl animate-float">🏛️</span>
                <div>
                  <h1 className="text-2xl md:text-3xl font-black uppercase tracking-[0.2em] animate-shimmer" style={{ fontFamily: "'Cinzel', serif" }}>
                    Jeopardy!
                  </h1>
                  <p className="text-xs text-yellow-600 tracking-[0.3em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                    Filosofía
                  </p>
                </div>
              </div>

              {/* Progress */}
              <div className="hidden md:flex items-center gap-2">
                <span className="text-xs text-slate-400 uppercase tracking-wider">Progreso</span>
                <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: `${(questionsAnsweredCount / totalQuestions) * 100}%`,
                      background: 'linear-gradient(90deg, var(--gold), var(--gold-bright))',
                      boxShadow: '0 0 8px var(--gold-glow)',
                    }}
                  />
                </div>
                <span className="text-xs gold-text font-bold">{questionsAnsweredCount}/{totalQuestions}</span>
              </div>
            </div>

            {/* Scorecards */}
            <div className="flex justify-center gap-2 md:gap-4 mb-3 flex-shrink-0 flex-wrap">
              {players.map((player, i) => (
                <div
                  key={player.id}
                  className={`glass-panel rounded-xl px-4 py-2 md:px-6 md:py-3 text-center transition-all duration-500 animate-fadeInUp ${
                    activePlayer === player.id ? 'gold-glow ring-1 ring-yellow-500/50' : ''
                  }`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{player.avatar}</span>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300" style={{ fontFamily: "'Cinzel', serif" }}>
                      {player.name}
                    </h3>
                  </div>
                  <p className={`text-2xl md:text-3xl font-black ${player.score < 0 ? 'text-red-400' : 'gold-text'}`}>
                    {player.score.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            {/* Board */}
            <div className="flex-1 min-h-0">
              <Board
                categories={categories}
                answered={answeredQuestions}
                onQuestionSelect={handleQuestionSelect}
              />
            </div>

            {/* Bottom quote */}
            <div className="text-center mt-2 flex-shrink-0">
              <p className="text-[10px] md:text-xs text-slate-600 italic tracking-wider">
                "Solo sé que no sé nada" — Sócrates
              </p>
            </div>
          </div>
        )}

        {currentQuestion && (
          <QuestionModal
            question={categories[currentQuestion.catIndex].questions[currentQuestion.questIndex]}
            categoryName={categories[currentQuestion.catIndex].name}
            players={players}
            onScoreUpdate={handleScoreUpdate}
            onComplete={() => markQuestionAnswered(currentQuestion.catIndex, currentQuestion.questIndex)}
            onClose={closeQuestionWithoutAnswering}
          />
        )}

        {gameState === 'FINISHED' && (
          <EndScreen players={players} onRestart={handleRestart} />
        )}
      </div>
    </div>
  );
}

export default App;
