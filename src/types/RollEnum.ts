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
    switch (roll) {
      case RollEnum.NONE:
        return '目無し';
      case RollEnum.ONLY_ONE_ROLL:
        return '2つ一致、1つ残り';
      case RollEnum.PINZORO:
        return 'ピンゾロ';
      case RollEnum.ARASHI:
        return 'アラシ';
      case RollEnum.HIFUMI:
        return 'ヒフミ';
      case RollEnum.SHIGORO:
        return 'シゴロ';
      default:
        throw TypeError;
    }
};