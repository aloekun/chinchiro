import { rollDices } from "../components/DiceRoller";
import { RollEnum } from "../types/RollEnum";
import { OneSetDices } from "./OneSetDices";

export class User {
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

    public getRoll(): RollEnum {
        return this.dices.getRole() ?? RollEnum.NONE;
    }

    public rollDices() {
        this.dices.rollDices();
    }
}