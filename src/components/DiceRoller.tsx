import { FC } from 'react';

type Props = {
  onClickPlay: () => void;
};

export const DiceRoller: FC<Props> = ({ onClickPlay }) => {
  const handleClick = () => {
    onClickPlay();
  };

  return <button onClick={handleClick}>サイコロを振る</button>;
};
