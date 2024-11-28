import { useState } from 'react';

import { DiceRoller } from './components/DiceRoller';
import { DiceResult } from './components/DiceResult';
import { getRoleStr, RoleEnum } from './types/RoleEnum';
import { User } from './logic/User';
import { Rival } from './logic/Rival';
import { compareRole } from './logic/CompareRole';
import { getResultStr } from './types/RollResult';
import { ThreeSetDices } from './logic/ThreeSetDices';
import { DiceResultTable } from './components/DiceResultTable';

export const App = () => {
  const [point, setPoint] = useState<number>(1000);
  const [inputPoint, setInputPoint] = useState<number>(0);

  const user = new User(1000, new ThreeSetDices());
  const [gainPoint, setGainPoint] = useState<number>(0);
  const [diceRolls, setDiceRolls] = useState<Array<number>>([0, 0, 0]);
  const [role, setRole] = useState<string>('なし');
  const [allDiceRolls, setAllDiceRolls] = useState<Array<Array<number>>>([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [allRoles, setAllRoles] = useState<Array<string>>([
    'なし',
    'なし',
    'なし',
  ]);

  const rival = new Rival(new ThreeSetDices());
  const [diceRollsRival, setDiceRollsRival] = useState<Array<number>>([
    0, 0, 0,
  ]);
  const [roleRival, setRoleRival] = useState<string>('なし');
  const [allDiceRollsRival, setAllDiceRollsRival] = useState<
    Array<Array<number>>
  >([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [allRolesRival, setAllRolesRival] = useState<Array<string>>([
    'なし',
    'なし',
    'なし',
  ]);

  const onClickClear = (): void => {
    setPoint(1000);

    user.refreshPoint();
    setGainPoint(0);
    setDiceRolls([0, 0, 0]);
    setRole('なし');
    setAllDiceRolls([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    setAllRoles(['なし', 'なし', 'なし']);

    setDiceRollsRival([0, 0, 0]);
    setRoleRival('なし');
    setAllDiceRollsRival([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    setAllRolesRival(['なし', 'なし', 'なし']);

    alert('リセットしました');
  };

  const onClickPlay = () => {
    // ユーザーのダイスを振る
    user.rollDices();
    // ユーザーの一番強い役を取得
    const dices = user.getDices();
    const role = user.getRole();
    const roleStr: string = getRoleStr(role);
    setDiceRolls(dices);
    setRole(roleStr);
    // ユーザーの全部のダイス・役を取得
    const allDiceSet = user.getAllDiceSet();
    console.log(allDiceSet);
    const newDiceRolls = allDiceSet.map((set) => set.getDices());
    const newRoles = allDiceSet.map((set) => getRoleStr(set.getRole()));
    setAllDiceRolls(newDiceRolls);
    setAllRoles(newRoles);

    // ライバルのダイスを振る
    rival.rollDices();
    // ライバルの一番強い役を取得
    const dicesRival = rival.getDices();
    const roleRival = rival.getRole();
    const roleRivalStr: string = getRoleStr(roleRival);
    setDiceRollsRival(dicesRival);
    setRoleRival(roleRivalStr);
    // ライバルの全部のダイス・役を取得
    const allDiceSetRival = rival.getAllDiceSet();
    const newDiceRollsRival = allDiceSetRival.map((set) => set.getDices());
    const newRolesRival = allDiceSetRival.map((set) =>
      getRoleStr(set.getRole())
    );
    setAllDiceRollsRival(newDiceRollsRival);
    setAllRolesRival(newRolesRival);

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
      <div>■ユーザー情報</div>
      <DiceResult diceRolls={diceRolls} role={role} />
      <div>獲得したポイント：{gainPoint}</div>
      <br />
      <div>■ライバル情報</div>
      <DiceResult diceRolls={diceRollsRival} role={roleRival} />
      <br />
      <div>■ユーザー情報</div>
      {/* {allDiceRolls.map((diceRolls, index) => (
        <DiceResult key={index} diceRolls={diceRolls} role={allRoles[index]} />
      ))} */}
      <DiceResultTable allDices={allDiceRolls} roles={allRoles} />
      <br />
      <div>■ライバル情報</div>
      {/* {allDiceRollsRival.map((diceRolls, index) => (
        <DiceResult
          key={index}
          diceRolls={diceRolls}
          role={allRolesRival[index]}
        />
      ))} */}
      <DiceResultTable allDices={allDiceRollsRival} roles={allRolesRival} />
    </>
  );
};
