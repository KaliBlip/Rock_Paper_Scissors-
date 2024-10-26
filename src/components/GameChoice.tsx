import React from 'react';
import { Scissors, Hand, Square } from 'lucide-react';

type Choice = 'rock' | 'paper' | 'scissors';

interface GameChoiceProps {
  choice: Choice;
  onClick: () => void;
  disabled?: boolean;
}

const icons = {
  rock: Square,
  paper: Hand,
  scissors: Scissors,
};

export function GameChoice({ choice, onClick, disabled }: GameChoiceProps) {
  const Icon = icons[choice];
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        p-6 rounded-full transition-all duration-300
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110 hover:shadow-lg'}
        ${choice === 'rock' ? 'bg-red-100 hover:bg-red-200' : ''}
        ${choice === 'paper' ? 'bg-blue-100 hover:bg-blue-200' : ''}
        ${choice === 'scissors' ? 'bg-yellow-100 hover:bg-yellow-200' : ''}
      `}
    >
      <Icon className={`
        w-12 h-12 transition-transform
        ${choice === 'rock' ? 'text-red-600' : ''}
        ${choice === 'paper' ? 'text-blue-600' : ''}
        ${choice === 'scissors' ? 'text-yellow-600' : ''}
      `} />
    </button>
  );
}