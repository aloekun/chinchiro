import { rollDices } from "../components/DiceRoller";

export class User {
    private pointDefault: number;
    private point: number;
    private dices: number[];

    constructor(point: number) {
        this.point = point;
        this.pointDefault = point;
        this.dices = [];
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
        return this.dices;
    }

    public rollDices(diceCount: number, diceRoles: number) {
        this.dices = rollDices(diceCount, diceRoles);
    }
}