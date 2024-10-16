import { useState } from 'react';
import './App.css';

function App() {
  const DICES: number = 3; // 使うサイコロの数
  const ROLE: number = 6; // サイコロの目の最大値
  enum ROLLS { // 役
    NONE = 0,
    ONLY_ONE_ROLL = 1,
    PINZORO = 2,
    ARASHI = 3,
    HIFUMI = 4,
    SHIGORO = 5,
  }

  const [point, setPoint] = useState<number>(1000); // 所持ポイント
  const [gainPoint, setGainPoint] = useState<number>(0); // 獲得ポイント
  const [diceRolls, setDiceRolls] = useState<Array<number>>([0, 0, 0]); // サイコロを振って出た目
  const [role, setRole] = useState<string>('なし'); // サイコロを振って出た役

  const [inputPoint, setInputPoint] = useState<number>(0); // 入力値(使用ポイント)

  // 初期状態に戻すメソッド
  const onClickClear = (): void => {
    setPoint(1000);
    setGainPoint(0);
    setDiceRolls([0, 0, 0]);
    setRole('なし');
    alert('リセットしました');
  };

  // ポイントを消費して、サイコロを振る
  const onClickPlay = () => {
    // const point: number = decreasePoint();
    // alert(`${point}`);
    const dices: Array<number> = rollDices([1, 1, 2]);
    const [roll, dice] = judgeRoll(dices);
    const rollStr: string = getRollStr(roll);
    setRole(rollStr);
    alert(`ダイスの目： ${dices.join(',')}, 役： ${rollStr}, 目： ${dice}`);
  };

  // ポイントの消費
  const decreasePoint = (): number => {
    const result = point - inputPoint;
    if (result < 0) {
      throw Error;
    }
    setPoint(result);
    return result;
  };

  /**
   * ダイスを振る
   * ダイスの数は DICES、ダイスの目は ROLE で決まる
   */
  const rollDices = (debugDices: number[] = []): Array<number> => {
    // ダイスの初期化
    setDiceRolls([]);
    // 定数個・出目のダイスを振る
    const dices: number[] = [];
    for (let i: number = 0; i < DICES; i++) {
      const dice = Math.floor(Math.random() * ROLE + 1);
      dices.push(dice);
    }

    // デバッグ用の引数があるなら、それを使う
    if (debugDices.length > 0) {
      let length = dices.length;
      for (let i: number = 0; i < length; i++) {
        dices.pop();
      }
      length = debugDices.length;
      for (let i: number = 0; i < length; i++) {
        dices.push(debugDices[i]);
      }
    }

    // ダイスの出目を昇順に並べ替える
    dices.sort((a, b) => a - b);
    // 結果を保存
    setDiceRolls(dices);
    return dices;
  };

  /**
   * サイコロの出目の配列を受け取り、役を返す
   * 戻り値は役と目の値の配列。アラシや2つの目が一致した場合の目の大きさは、2つ目の要素で返す
   * 一二三や四五六がベタ書きの配列との比較なので、サイコロの出目の最大値を変更するなら要修正
   */
  const judgeRoll = (dices: number[]): [ROLLS, number] => {
    // ヒフミか
    const hifumiRolls: number[] = [1, 2, 3];
    const hifumi: boolean = isArrayEqual(dices, hifumiRolls);
    if (hifumi) {
      return [ROLLS.HIFUMI, 0];
    }

    // シゴロか
    const shigoroRolls: number[] = [4, 5, 6];
    const shigoro: boolean = isArrayEqual(dices, shigoroRolls);
    if (shigoro) {
      return [ROLLS.SHIGORO, 0];
    }

    // アラシか
    const arashi: boolean = dices.every((value, index, array) => {
      return value == array[0];
    });
    // ピンゾロか
    const pinzoro: boolean = arashi && dices[0] == 1;
    if (pinzoro) {
      return [ROLLS.PINZORO, 0];
    } else if (arashi) {
      return [ROLLS.ARASHI, dices[0]];
    }

    // 2つの目が一致、残り1つの目が役
    let diceOnlyOneRoll = 0;
    if (dices[0] == dices[1]) {
      diceOnlyOneRoll = dices[2];
    } else if (dices[1] == dices[2]) {
      diceOnlyOneRoll = dices[0];
    } else if (dices[0] == dices[2]) {
      diceOnlyOneRoll = dices[1];
    }
    if (diceOnlyOneRoll > 0) {
      return [ROLLS.ONLY_ONE_ROLL, diceOnlyOneRoll];
    }

    // 役無し
    return [ROLLS.NONE, 0];
  };
  // 数値配列の一致判定
  const isArrayEqual = (arr1: number[], arr2: number[]): boolean => {
    for (let i = 0; i < DICES; i++) {
      if (arr1[i] != arr2[i]) {
        return false;
      }
    }
    return true;
  };

  // 役の値から名称を取得
  const getRollStr = (roll: ROLLS): string => {
    switch (roll) {
      case ROLLS.NONE:
        return '目無し';
      case ROLLS.ONLY_ONE_ROLL:
        return '2つ一致、1つ残り';
      case ROLLS.PINZORO:
        return 'ピンゾロ';
      case ROLLS.ARASHI:
        return 'アラシ';
      case ROLLS.HIFUMI:
        return 'ヒフミ';
      case ROLLS.SHIGORO:
        return 'シゴロ';
      default:
        throw TypeError;
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
      <button onClick={onClickPlay} form="post">
        サイコロを振る
      </button>
      <br />
      <br />
      <div>出た目：{diceRolls.join(', ')}</div>
      <div>役：{role}</div>
      <div>獲得したポイント：{gainPoint}</div>
    </>
  );
}

export default App;
