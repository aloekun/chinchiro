import { FC } from 'react';

type Props = {
  onClickPlay: (dices: number[]) => void;
};

export const DiceRoller: FC<Props> = ({ onClickPlay }) => {
  const DICES: number = 3;
  const ROLE: number = 6;

  const rollDices = (): number[] => {
    const dices: number[] = [];
    for (let i: number = 0; i < DICES; i++) {
      const dice = Math.floor(Math.random() * ROLE + 1);
      dices.push(dice);
    }
    dices.sort((a, b) => a - b);
    return dices;
  };

  const handleClick = () => {
    const dices = rollDices();
    onClickPlay(dices);
  };

  return <button onClick={handleClick}>サイコロを振る</button>;
};
