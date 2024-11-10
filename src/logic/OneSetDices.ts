import { rollDices } from "../components/DiceRoller";
import { RollEnum } from "../types/RollEnum";
import { ErrorJudge, judgeRoll } from "./JudgeLogic";

export interface DiceManager {
    getDices(): number[];
    getRole(): RollEnum; 
}

/**
 * ちんちろりん1回分のサイコロ3つの出目と役のセット
 */
export class OneSetDices {
    private dices: number[];
    private role: number;
    private onlyOneNumber: number;

    constructor() {
        this.dices = [];
        this.role = RollEnum.NONE;
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
        [this.role, this.onlyOneNumber, errorJudge] = judgeRoll(this.dices);
    }
}