import { RollEnum } from "../types/RollEnum.ts"
/**
 * サイコロの出目の配列を受け取り、役を返す
 * 戻り値は役と目の値の配列。アラシや2つの目が一致した場合の目の大きさは、2つ目の要素で返す
 * 一二三や四五六がベタ書きの配列との比較なので、サイコロの出目の最大値を変更するなら要修正
 */
export const judgeRoll = (dices: number[]): [RollEnum, number] => {
    // ヒフミか
    const hifumiRolls: number[] = [1, 2, 3];
    const hifumi: boolean = isArrayEqual(dices, hifumiRolls);
    if (hifumi) {
      return [RollEnum.HIFUMI, 0];
    }

    // シゴロか
    const shigoroRolls: number[] = [4, 5, 6];
    const shigoro: boolean = isArrayEqual(dices, shigoroRolls);
    if (shigoro) {
      return [RollEnum.SHIGORO, 0];
    }

    // アラシか
    const arashi: boolean = dices.every((value, index, array) => {
      return value == array[0];
    });
    // ピンゾロか
    const pinzoro: boolean = arashi && dices[0] == 1;
    if (pinzoro) {
      return [RollEnum.PINZORO, 0];
    } else if (arashi) {
      return [RollEnum.ARASHI, dices[0]];
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
      return [RollEnum.ONLY_ONE_ROLL, diceOnlyOneRoll];
    }

    // 役無し
    return [RollEnum.NONE, 0];
  };
  // 数値配列の一致判定
  const isArrayEqual = (arr1: number[], arr2: number[]): boolean => {
    if (arr1.length != arr2.length) {
      return false;
    }

    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] != arr2[i]) {
        return false;
      }
    }
    return true;
  };
