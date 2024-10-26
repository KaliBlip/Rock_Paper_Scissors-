import React, { useState, useEffect } from 'react';
import { GameChoice } from './components/GameChoice';
import { ResultDisplay } from './components/ResultDisplay';
import { Trophy } from 'lucide-react';

type Choice = 'rock' | 'paper' | 'scissors';
type Result = 'win' | 'lose' | 'draw' | null;

const choices: Choice[] = ['rock', 'paper', 'scissors'];

function App() {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<Result>(null);
  const [score, setScore] = useState({ player: 0, computer: 0 });
  const [isPlaying, setIsPlaying] = useState(false);

  const determineWinner = (player: Choice, computer: Choice): Result => {
    if (player === computer) return 'draw';
    const wins = {
      rock: 'scissors',
      paper: 'rock',
      scissors: 'paper',
    };
    return wins[player] === computer ? 'win' : 'lose';
  };

  const playRound = (choice: Choice) => {
    setIsPlaying(true);
    setPlayerChoice(choice);
    
    // Simulate computer thinking
    setTimeout(() => {
      const computerChoice = choices[Math.floor(Math.random() * choices.length)];
      setComputerChoice(computerChoice);
      const roundResult = determineWinner(choice, computerChoice);
      setResult(roundResult);
      
      if (roundResult === 'win') {
        setScore(prev => ({ ...prev, player: prev.player + 1 }));
      } else if (roundResult === 'lose') {
        setScore(prev => ({ ...prev, computer: prev.computer + 1 }));
      }
      
      setTimeout(() => {
        setIsPlaying(false);
        setPlayerChoice(null);
        setComputerChoice(null);
        setResult(null);
      }, 2000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Rock Paper Scissors</h1>
          <p className="text-gray-600">Choose your weapon!</p>
        </div>

        <div className="flex justify-between items-center px-8 py-4 bg-gray-50 rounded-xl">
          <div className="text-center">
            <p className="text-sm text-gray-600">Player</p>
            <p className="text-3xl font-bold text-blue-600">{score.player}</p>
          </div>
          <Trophy className="w-8 h-8 text-yellow-400" />
          <div className="text-center">
            <p className="text-sm text-gray-600">Computer</p>
            <p className="text-3xl font-bold text-red-600">{score.computer}</p>
          </div>
        </div>

        <div className="flex justify-center space-x-8">
          {choices.map((choice) => (
            <GameChoice
              key={choice}
              choice={choice}
              onClick={() => !isPlaying && playRound(choice)}
              disabled={isPlaying}
            />
          ))}
        </div>

        <div className="h-24 flex items-center justify-center">
          {isPlaying && !computerChoice && (
            <p className="text-xl text-gray-600 animate-pulse">Computer is choosing...</p>
          )}
          {playerChoice && computerChoice && (
            <div className="flex items-center space-x-8">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">You chose</p>
                <GameChoice choice={playerChoice} onClick={() => {}} disabled />
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Computer chose</p>
                <GameChoice choice={computerChoice} onClick={() => {}} disabled />
              </div>
            </div>
          )}
          <ResultDisplay result={result} />
        </div>
      </div>
    </div>
  );
}

export default App;