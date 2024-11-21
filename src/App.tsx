import { useState } from 'react';

import { DiceRoller } from './components/DiceRoller';
import { DiceResult } from './components/DiceResult';
import { getRoleStr, RoleEnum } from './types/RoleEnum';
import { User } from './logic/User';
import { Rival } from './logic/Rival';
import { compareRole } from './logic/CompareRole';
import { getResultStr } from './types/RollResult';
import { ThreeSetDices } from './logic/ThreeSetDices';

export const App = () => {
  const [point, setPoint] = useState<number>(1000);
  const user = new User(1000, new ThreeSetDices());
  const rival = new Rival();
  const [gainPoint, setGainPoint] = useState<number>(0);
  const [diceRolls, setDiceRolls] = useState<Array<number>>([0, 0, 0]);
  const [role, setRole] = useState<string>('なし');
  const [diceRolls1, setDiceRolls1] = useState<Array<number>>([0, 0, 0]);
  const [role1, setRole1] = useState<string>('なし');
  const [diceRolls2, setDiceRolls2] = useState<Array<number>>([0, 0, 0]);
  const [role2, setRole2] = useState<string>('なし');
  const [diceRolls3, setDiceRolls3] = useState<Array<number>>([0, 0, 0]);
  const [role3, setRole3] = useState<string>('なし');
  const [inputPoint, setInputPoint] = useState<number>(0);

  const onClickClear = (): void => {
    setPoint(1000);
    user.refreshPoint();
    setGainPoint(0);
    setDiceRolls([0, 0, 0]);
    setRole('なし');
    setDiceRolls1([0, 0, 0]);
    setRole1('なし');
    setDiceRolls2([0, 0, 0]);
    setRole2('なし');
    setDiceRolls3([0, 0, 0]);
    setRole3('なし');
    alert('リセットしました');
  };

  const onClickPlay = () => {
    user.rollDices();
    const dices = user.getDices();
    const role = user.getRole();
    const roleStr: string = getRoleStr(role);
    setDiceRolls(dices);
    setRole(roleStr);
    const allDiceSet = user.getAllDiceSet();
    console.log(allDiceSet);
    setDiceRolls1(allDiceSet[0].getDices());
    setDiceRolls2(allDiceSet[1].getDices());
    setDiceRolls3(allDiceSet[2].getDices());
    const role1 = allDiceSet[0].getRole();
    const role1Str = getRoleStr(role1);
    setRole1(role1Str);
    const role2 = allDiceSet[1].getRole();
    const role2Str = getRoleStr(role2);
    setRole2(role2Str);
    const role3 = allDiceSet[2].getRole();
    const role3Str = getRoleStr(role3);
    setRole3(role3Str);

    rival.rollDices();
    const dicesRival = rival.getDices();
    const roleRival = rival.getRole();
    const roleRivalStr: string = getRoleStr(roleRival);

    const resultRole = compareRole(role, roleRival);
    const resultRoleStr = getResultStr(resultRole);

    alert(
      `ダイスの目(自分): ${dices.join(
        ','
      )}, 役： ${roleStr}, ダイスの目(相手): ${dicesRival.join(
        ','
      )}, 役： ${roleRivalStr}, 勝敗: ${resultRoleStr}`
    );

    const decreasePoint: number = calcDecreasePoint();
    const gainPoint: number = calcGainPoint(role);
    const resultPoint: number = gainPoint - decreasePoint;
    user.payCost(decreasePoint);
    user.gainPoint(gainPoint);
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
        throw Error;
    }
  };

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
      <DiceResult diceRolls={diceRolls} role={role} />
      <div>獲得したポイント：{gainPoint}</div>
      <br />
      <DiceResult diceRolls={diceRolls1} role={role1} />
      <DiceResult diceRolls={diceRolls2} role={role2} />
      <DiceResult diceRolls={diceRolls3} role={role3} />
    </>
  );
};
