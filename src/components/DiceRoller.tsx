import { FC } from 'react';

type Props = {
  onClickPlay: () => void;
};

export const rollDices = (diceCount: number, diceRoles: number): number[] => {
  const dices: number[] = [];
  for (let i: number = 0; i < diceCount; i++) {
    const dice = Math.floor(Math.random() * diceRoles + 1);
    dices.push(dice);
  }
  dices.sort((a, b) => a - b);
  return dices;
};

export const DiceRoller: FC<Props> = ({ onClickPlay }) => {
  const handleClick = () => {
    onClickPlay();
  };

  return <button onClick={handleClick}>サイコロを振る</button>;
};
