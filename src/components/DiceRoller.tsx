import { FC } from 'react';

type Props = {
  onClickPlay: () => void;
};

export const rollDices = (): number[] => {
  const DICE_COUNT:number = 3;
  const DICE_ROLES:number = 6;
  const dices: number[] = [];
  for (let i: number = 0; i < DICE_COUNT; i++) {
    const dice = Math.floor(Math.random() * DICE_ROLES + 1);
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
