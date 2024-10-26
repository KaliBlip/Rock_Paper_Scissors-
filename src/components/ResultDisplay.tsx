import React from 'react';
import { Trophy, XCircle, MinusCircle } from 'lucide-react';

interface ResultDisplayProps {
  result: 'win' | 'lose' | 'draw' | null;
}

export function ResultDisplay({ result }: ResultDisplayProps) {
  if (!result) return null;

  const resultConfig = {
    win: { icon: Trophy, text: 'You Win!', className: 'text-green-500' },
    lose: { icon: XCircle, text: 'You Lose!', className: 'text-red-500' },
    draw: { icon: MinusCircle, text: 'Draw!', className: 'text-yellow-500' },
  };

  const { icon: Icon, text, className } = resultConfig[result];

  return (
    <div className={`flex flex-col items-center space-y-2 animate-bounce ${className}`}>
      <Icon className="w-12 h-12" />
      <span className="text-2xl font-bold">{text}</span>
    </div>
  );
}