import { useState } from 'react';
import StartScreen from './StartScreen';
import Board from './Board';
import QuestionModal from './QuestionModal';
import EndScreen from './EndScreen';
import { CATEGORIES } from './data';

function App() {
  const [gameState, setGameState] = useState('START'); // START, PLAYING, FINISHED
  const [players, setPlayers] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState({}); // 'catIndex-questIndex': true
  const [currentQuestion, setCurrentQuestion] = useState(null); // { catIndex, questIndex }

  const handleStartGame = (playerNames) => {
    const initialPlayers = playerNames.map((name, index) => ({
      id: index,
      name,
      score: 0
    }));
    setPlayers(initialPlayers);
    setGameState('PLAYING');
  };

  const handleQuestionSelect = (catIndex, questIndex) => {
    setCurrentQuestion({ catIndex, questIndex });
  };

  const handleScoreUpdate = (playerId, points, isCorrect) => {
    setPlayers(prevPlayers => prevPlayers.map(p => {
      if (p.id === playerId) {
        return { ...p, score: p.score + (isCorrect ? points : -points) };
      }
      return p;
    }));
  };

  const markQuestionAnswered = (catIndex, questIndex) => {
    const key = `${catIndex}-${questIndex}`;
    const newAnswered = { ...answeredQuestions, [key]: true };
    setAnsweredQuestions(newAnswered);
    setCurrentQuestion(null);

    // Check if all questions are answered
    const totalQuestions = CATEGORIES.reduce((acc, cat) => acc + cat.questions.length, 0);
    if (Object.keys(newAnswered).length === totalQuestions) {
      setGameState('FINISHED');
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
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans overflow-x-hidden">
      {gameState === 'START' && (
        <StartScreen onStart={handleStartGame} />
      )}
      
      {gameState === 'PLAYING' && (
        <div className="p-4 md:p-8 flex flex-col items-center max-w-7xl mx-auto min-h-screen">
          <h1 className="text-4xl md:text-6xl font-black text-yellow-400 mb-8 uppercase tracking-widest text-center" style={{ textShadow: '0 0 10px rgba(250, 204, 21, 0.4)' }}>
            Jeopardy! <span className="text-white text-2xl md:text-4xl">Filosofía</span>
          </h1>
          
          <div className="w-full flex justify-center gap-4 md:gap-8 mb-8 flex-wrap">
            {players.map(player => (
              <div key={player.id} className="bg-slate-800 border-2 border-yellow-500 rounded-lg p-4 min-w-[150px] text-center shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                <h3 className="text-xl font-bold text-slate-300 uppercase tracking-wider">{player.name}</h3>
                <p className={`text-3xl font-black mt-2 ${player.score < 0 ? 'text-red-400' : 'text-yellow-400'}`}>
                  {player.score}
                </p>
              </div>
            ))}
          </div>

          <Board 
            categories={CATEGORIES} 
            answered={answeredQuestions} 
            onQuestionSelect={handleQuestionSelect} 
          />

          {currentQuestion && (
            <QuestionModal 
              question={CATEGORIES[currentQuestion.catIndex].questions[currentQuestion.questIndex]}
              players={players}
              onScoreUpdate={handleScoreUpdate}
              onComplete={() => markQuestionAnswered(currentQuestion.catIndex, currentQuestion.questIndex)}
              onClose={closeQuestionWithoutAnswering}
            />
          )}
        </div>
      )}

      {gameState === 'FINISHED' && (
        <EndScreen players={players} onRestart={handleRestart} />
      )}
    </div>
  );
}

export default App;
