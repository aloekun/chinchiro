export enum RoleEnum { // 役
  NONE = 0,
  HIFUMI = 1,
  MENASHI = 2,
  ONLY_ONE_ROLL = 3,
  SHIGORO = 4,
  ARASHI = 5,
  PINZORO = 6,
};

// 役の値から名称を取得
export const getRoleStr = (role: RoleEnum): string => {
  const roleStrings: { [key in RoleEnum]: string } = {
    [RoleEnum.NONE]: '未確定',
    [RoleEnum.ONLY_ONE_ROLL]: '2つ一致、1つ残り',
    [RoleEnum.PINZORO]: 'ピンゾロ',
    [RoleEnum.ARASHI]: 'アラシ',
    [RoleEnum.HIFUMI]: 'ヒフミ',
    [RoleEnum.SHIGORO]: 'シゴロ',
    [RoleEnum.MENASHI]: '目無し',
  };

  if (role in roleStrings) {
    return roleStrings[role];
  } else {
    throw new TypeError();
  }
};
