import { useState } from 'react';

import { DiceRoller } from './components/DiceRoller';
import { DiceResult } from './components/DiceResult';
import { getRollStr, RollEnum } from "./types/RollEnum";
import { User } from "./logic/User"

export const App = () => {
  const [point, setPoint] = useState<number>(1000);
  const user = new User(1000);
  const [gainPoint, setGainPoint] = useState<number>(0);
  const [diceRolls, setDiceRolls] = useState<Array<number>>([0, 0, 0]);
  const [role, setRole] = useState<string>('なし');
  const [inputPoint, setInputPoint] = useState<number>(0);

  const onClickClear = (): void => {
    setPoint(1000);
    user.refreshPoint();
    setGainPoint(0);
    setDiceRolls([0, 0, 0]);
    setRole('なし');
    alert('リセットしました');
  };

  const onClickPlay = () => {
    user.rollDices();
    const dices = user.getDices();
    const roll = user.getRoll();
    const rollStr: string = getRollStr(roll);
    setDiceRolls(dices);

    const decreasePoint: number = calcDecreasePoint();
    const gainPoint: number = calcGainPoint(roll);
    const resultPoint: number = gainPoint - decreasePoint;
    user.payCost(decreasePoint);
    user.gainPoint(gainPoint);
    setRole(rollStr);
    setGainPoint(resultPoint);
    setPoint(point + resultPoint);
    // alert(`ダイスの目： ${dices.join(',')}, 役： ${rollStr}, 目： ${dice}\n gainPoint:${gainPoint}, decreasePoint:${decreasePoint}, resultPoint:${resultPoint}`);
  };

  // 消費ポイントの計算
  const calcDecreasePoint = (): number => {
    return inputPoint;
  };

  // 獲得ポイントの計算
  const calcGainPoint = (roll: RollEnum): number => {
    switch (roll) {
      case RollEnum.ONLY_ONE_ROLL:
        return 50;
      case RollEnum.PINZORO:
        return 500;
      case RollEnum.ARASHI:
        return 300;
      case RollEnum.HIFUMI:
        return -400;
      case RollEnum.SHIGORO:
        return 100;
      case RollEnum.MENASHI:
        return 0;
      default:
        throw Error
    }
  }
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputPoint(Number(event.target.value));
  };

  return (
    <>
      <button onClick={onClickClear}>リセット</button>
      <br />
      <br />
      <br />
      <div>所持ポイント：{point}</div>
      <div>
        使用ポイント：
        <input
          type="number"
          value={inputPoint}
          onChange={handleInputChange}
          placeholder="Enter point"
        ></input>
      </div>
      <DiceRoller onClickPlay={onClickPlay} />
      <br />
      <br />
      <DiceResult diceRolls={diceRolls} role={role} gainPoint={gainPoint} />
    </>
  );
};
