export enum RollEnum { // 役
  NONE = 0,
  ONLY_ONE_ROLL = 1,
  PINZORO = 2,
  ARASHI = 3,
  HIFUMI = 4,
  SHIGORO = 5,
};

// 役の値から名称を取得
export const getRollStr = (roll: RollEnum): string => {
  const rollStrings: { [key in RollEnum]: string } = {
    [RollEnum.NONE]: '目無し',
    [RollEnum.ONLY_ONE_ROLL]: '2つ一致、1つ残り',
    [RollEnum.PINZORO]: 'ピンゾロ',
    [RollEnum.ARASHI]: 'アラシ',
    [RollEnum.HIFUMI]: 'ヒフミ',
    [RollEnum.SHIGORO]: 'シゴロ',
  };

  if (roll in rollStrings) {
    return rollStrings[roll];
  } else {
    throw new TypeError();
  }
};
