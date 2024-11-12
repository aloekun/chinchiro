export enum RoleEnum { // 役
  NONE = 0,
  ONLY_ONE_ROLL = 1,
  PINZORO = 2,
  ARASHI = 3,
  HIFUMI = 4,
  SHIGORO = 5,
  MENASHI = 6,
};

// 役の値から名称を取得
export const getRollStr = (roll: RoleEnum): string => {
  const rollStrings: { [key in RoleEnum]: string } = {
    [RoleEnum.NONE]: '未確定',
    [RoleEnum.ONLY_ONE_ROLL]: '2つ一致、1つ残り',
    [RoleEnum.PINZORO]: 'ピンゾロ',
    [RoleEnum.ARASHI]: 'アラシ',
    [RoleEnum.HIFUMI]: 'ヒフミ',
    [RoleEnum.SHIGORO]: 'シゴロ',
    [RoleEnum.MENASHI]: '目無し',
  };

  if (roll in rollStrings) {
    return rollStrings[roll];
  } else {
    throw new TypeError();
  }
};
