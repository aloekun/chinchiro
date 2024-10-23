import { FC } from 'react';

type Props = {
  diceRolls: number[];
  role: string;
  gainPoint: number;
};

export const DiceResult: FC<Props> = ({ diceRolls, role, gainPoint }) => {
  return (
    <>
      <div>出た目：{diceRolls.join(', ')}</div>
      <div>役：{role}</div>
      <div>獲得したポイント：{gainPoint}</div>
    </>
  );
};
