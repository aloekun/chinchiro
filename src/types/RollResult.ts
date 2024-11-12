export enum RollResult {
    WIN = 1,
    DRAW = 2,
    LOSE = 3,
};

// 勝敗の値から名称を取得
export const getResultStr = (result: RollResult): string => {
    const resultStrings: { [key in RollResult]: string } = {
      [RollResult.WIN]: '勝利',
      [RollResult.DRAW]: '引き分け',
      [RollResult.LOSE]: '敗北',
    };
  
    if (result in resultStrings) {
      return resultStrings[result];
    } else {
      throw new TypeError();
    }
  };
  