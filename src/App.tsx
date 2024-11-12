import { useState } from 'react';

import { DiceRoller } from './components/DiceRoller';
import { DiceResult } from './components/DiceResult';
import { getRollStr, RoleEnum } from "./types/RoleEnum";
import { User } from "./logic/User"
import { Rival } from './logic/Rival';

export const App = () => {
  const [point, setPoint] = useState<number>(1000);
  const user = new User(1000);
  const rival = new Rival();
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
    const role = user.getRole();
    const roleStr: string = getRollStr(role);
    setDiceRolls(dices);

    rival.rollDices();
    const dicesRival = rival.getDices();
    const roleRival = rival.getRole();
    const roleRivalStr: string = getRollStr(roleRival);
    alert(
      `ダイスの目： ${dices.join(
        ','
      )}, 役： ${roleStr}, ダイスの目： ${dicesRival.join(
        ','
      )}, 役： ${roleRivalStr}`
    );

    const decreasePoint: number = calcDecreasePoint();
    const gainPoint: number = calcGainPoint(role);
    const resultPoint: number = gainPoint - decreasePoint;
    user.payCost(decreasePoint);
    user.gainPoint(gainPoint);
    setRole(roleStr);
    setGainPoint(resultPoint);
    setPoint(point + resultPoint);
    // alert(`ダイスの目： ${dices.join(',')}, 役： ${rollStr}, 目： ${dice}\n gainPoint:${gainPoint}, decreasePoint:${decreasePoint}, resultPoint:${resultPoint}`);
  };

  // 消費ポイントの計算
  const calcDecreasePoint = (): number => {
    return inputPoint;
  };

  // 獲得ポイントの計算
  const calcGainPoint = (roll: RoleEnum): number => {
    switch (roll) {
      case RoleEnum.ONLY_ONE_ROLL:
        return 50;
      case RoleEnum.PINZORO:
        return 500;
      case RoleEnum.ARASHI:
        return 300;
      case RoleEnum.HIFUMI:
        return -400;
      case RoleEnum.SHIGORO:
        return 100;
      case RoleEnum.MENASHI:
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
