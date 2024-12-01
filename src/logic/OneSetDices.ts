import { RoleEnum } from '../types/RoleEnum';
import { IDiceFuncs } from './IDiceFuncs';
import { ErrorJudge, judgeRole } from './JudgeRole';
import { OneDice } from './OneDice';

/**
 * ちんちろりん1回分のサイコロ3つの出目と役のセット
 */
export class OneSetDices implements IDiceFuncs {
  private dices: OneDice[];
  private role: number;
  private onlyOneNumber: number;

  constructor(dices: OneDice[]) {
    if (dices == null) {
      throw EvalError('dices is null in OneSetDices');
    }
    if (dices.length != 3) {
      throw EvalError('Not correct dices count in OneSetDices');
    }
    this.dices = dices;
    this.role = RoleEnum.NONE;
    this.onlyOneNumber = 0;
  }

  public getDices() {
    // OneDiceクラスから出目の配列のみを取得
    const dicesTmp = this.dices.map((element) => {
      return element.getDice();
    });
    return dicesTmp;
  }

  public getRole() {
    return this.role;
  }

  public getOnlyOneNumber() {
    return this.onlyOneNumber;
  }

  /**
   * サイコロを振って、役を判定する
   */
  public rollDices() {
    // サイコロ1つずつを振る
    const dicesTmp = this.dices.map((element) => {
      element.roll();
      return element.getDice();
    });

    // すべてのサイコロの出目の組み合わせで役を決める
    let errorJudge: ErrorJudge = ErrorJudge.NONE;
    [this.role, this.onlyOneNumber, errorJudge] = judgeRole(dicesTmp);
  }

  public getAllDiceSet(): OneSetDices[] {
    return [this];
  }
}
