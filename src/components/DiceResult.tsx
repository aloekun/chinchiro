import { FC } from 'react';

type Props = {
  diceRolls: number[];
  role: string;
};

export const DiceResult: FC<Props> = ({ diceRolls, role }) => {
  return (
    <>
      <div>出た目：{diceRolls.join(', ')}</div>
      <div>役：{role}</div>
    </>
  );
};
