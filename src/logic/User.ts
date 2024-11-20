import { RoleEnum } from "../types/RoleEnum";
import { DiceHandler } from "./DiceHandler";
import { IDices } from "./IDices";

export class User extends DiceHandler {
    private pointDefault: number;
    private point: number;
    private readonly dices: IDices;

    constructor(point: number, dices: IDices) {
        super();
        this.point = point;
        this.pointDefault = point;

        if (dices == null) {
            throw EvalError("not defined interface");
        }
        this.dices = dices;
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
        return this.dices.getDices();
    }

    public getRole(): RoleEnum {
        return this.dices.getRole();
    }

    public rollDices() {
        this.dices.rollDices();
    }
}