import { RoleEnum } from "../types/RoleEnum";

export enum ErrorJudge {
  NONE = 0,
  DICE_NUM_NOT_MUCH = 1,
};

export const judgeRole = (dices: number[]): [RoleEnum, number, ErrorJudge] => {
  if (dices.length != 3) {
    return [RoleEnum.NONE, 0, ErrorJudge.DICE_NUM_NOT_MUCH];
  }

  const rollType = getRollType(dices);
  const diceOnlyOneRoll = getOnlyOneRoll(dices);

  if (rollType !== RoleEnum.NONE) {
    return [rollType, 0, ErrorJudge.NONE];
  }

  if (diceOnlyOneRoll > 0) {
    return [RoleEnum.ONLY_ONE_ROLL, diceOnlyOneRoll, ErrorJudge.NONE];
  }

  return [RoleEnum.MENASHI, 0, ErrorJudge.NONE];
};

const getRollType = (dices: number[]): RoleEnum => {
  if (isHifumi(dices)) {
    return RoleEnum.HIFUMI;
  }

  if (isShigoro(dices)) {
    return RoleEnum.SHIGORO;
  }

  if (isPinzoro(dices)) {
    return RoleEnum.PINZORO;
  }

  if (isArashi(dices)) {
    return RoleEnum.ARASHI;
  }

  return RoleEnum.NONE;
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
