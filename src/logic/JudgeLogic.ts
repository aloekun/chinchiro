import { RollEnum } from "../types/RollEnum";

export enum ErrorJudge {
  NONE = 0,
  DICE_NUM_NOT_MUCH = 1,
};

export const judgeRoll = (dices: number[]): [RollEnum, number, ErrorJudge] => {
  if (dices.length != 3) {
    return [RollEnum.NONE, 0, ErrorJudge.DICE_NUM_NOT_MUCH];
  }

  const rollType = getRollType(dices);
  const diceOnlyOneRoll = getOnlyOneRoll(dices);

  if (rollType !== RollEnum.NONE) {
    return [rollType, 0, ErrorJudge.NONE];
  }

  if (diceOnlyOneRoll > 0) {
    return [RollEnum.ONLY_ONE_ROLL, diceOnlyOneRoll, ErrorJudge.NONE];
  }

  return [RollEnum.MENASHI, 0, ErrorJudge.NONE];
};

const getRollType = (dices: number[]): RollEnum => {
  if (isHifumi(dices)) {
    return RollEnum.HIFUMI;
  }

  if (isShigoro(dices)) {
    return RollEnum.SHIGORO;
  }

  if (isPinzoro(dices)) {
    return RollEnum.PINZORO;
  }

  if (isArashi(dices)) {
    return RollEnum.ARASHI;
  }

  return RollEnum.NONE;
};

const isHifumi = (dices: number[]): boolean => {
  const hifumiRolls: number[] = [1, 2, 3];
  return isArrayEqual(dices, hifumiRolls);
};

const isShigoro = (dices: number[]): boolean => {
  const shigoroRolls: number[] = [4, 5, 6];
  return isArrayEqual(dices, shigoroRolls);
};

const isArashi = (dices: number[]): boolean => {
  return dices.every((value, index, array) => value == array[0]);
};

const isPinzoro = (dices: number[]): boolean => {
  return isArashi(dices) && dices[0] == 1;
};

const getOnlyOneRoll = (dices: number[]): number => {
  if (dices[0] == dices[1]) {
    return dices[2];
  } else if (dices[1] == dices[2]) {
    return dices[0];
  } else if (dices[0] == dices[2]) {
    return dices[1];
  }
  return 0;
};

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
}
