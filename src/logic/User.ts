import { RoleEnum } from "../types/RoleEnum";
import { DiceManager, OneSetDices } from "./OneSetDices";

export class User implements DiceManager {
    private pointDefault: number;
    private point: number;
    private dices: OneSetDices;

    constructor(point: number) {
        this.point = point;
        this.pointDefault = point;
        this.dices = new OneSetDices();
    }

    public getNumber(): number {
        return this.point;
    }

    public gainPoint(point: number) {
        this.point += point;
    }

    public payCost(point: number) {
        if (this.point < point) {
            throw new EvalError("Point is less");
        }
        this.point -= point;
    }

    public refreshPoint() {
        this.point = this.pointDefault;
    }

    public getDices(): number[] {
        return this.dices.getDices() ?? [];
    }

    public getRole(): RoleEnum {
        return this.dices.getRole() ?? RoleEnum.NONE;
    }

    public rollDices() {
        this.dices.rollDices();
    }
}