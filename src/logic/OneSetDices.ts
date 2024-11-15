import { rollDices } from "../components/DiceRoller";
import { RoleEnum } from "../types/RoleEnum";
import { IDice } from "./IDices";
import { ErrorJudge, judgeRole } from "./JudgeRole";

/**
 * ちんちろりん1回分のサイコロ3つの出目と役のセット
 */
export class OneSetDices implements IDice {
    private dices: number[];
    private role: number;
    private onlyOneNumber: number;

    constructor() {
        this.dices = [];
        this.role = RoleEnum.NONE;
        this.onlyOneNumber = 0;
    }

    public getDices() {
        return this.dices;
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
        this.dices = rollDices();
        let errorJudge:ErrorJudge = ErrorJudge.NONE;
        [this.role, this.onlyOneNumber, errorJudge] = judgeRole(this.dices);
    }
}