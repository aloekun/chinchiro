import { RoleEnum } from "../types/RoleEnum";
import { IDiceFuncs } from "./IDiceFuncs";
import { OneSetDices } from "./OneSetDices";

/**
 * ちんちろりん1回分のサイコロ3つの出目と役のセット
 */
export class ThreeSetDices implements IDiceFuncs {
    private dices: number[];
    private role: number;
    private onlyOneNumber: number;
    private setDicesList: OneSetDices[];

    constructor() {
        this.dices = [];
        this.role = RoleEnum.NONE;
        this.onlyOneNumber = 0;

        this.setDicesList = [];
        this.setDicesList.push(new OneSetDices());
        this.setDicesList.push(new OneSetDices());
        this.setDicesList.push(new OneSetDices());
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
     * 全部の要素のサイコロを振って、一番強い役を判定する
     */
    public rollDices() {
        let roleMax = RoleEnum.NONE;
        let role = RoleEnum.NONE;
        let dices: number[] = [];
        let onlyOneNumber: number = 0;
        // 全部のダイスを振りつつ、一番強い役を記録
        this.setDicesList.forEach(element => {
            element.rollDices();
            role = element.getRole();
            // 一番強い役を上回ったら更新
            if (roleMax < role) {
                roleMax = role;
                dices = element.getDices();
                onlyOneNumber = element.getOnlyOneNumber();
            }
        });

        // 最後まで残った結果を保存
        this.role = roleMax;
        this.dices = dices;
        this.onlyOneNumber = onlyOneNumber;
    }

    public getAllDiceSet(): OneSetDices[] {
        return this.setDicesList;
    }
}