import { RoleEnum } from "../types/RoleEnum";
import { DiceHandler } from "./DiceHandler";
import { OneSetDices } from "./OneSetDices";
import { ThreeSetDices } from "./ThreeSetDices";

export class User extends DiceHandler {
    private pointDefault: number;
    private point: number;
    private dices: ThreeSetDices;

    constructor(point: number, dices: ThreeSetDices) {
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

    public getAllDiceSet(): OneSetDices[] {
        return this.dices.getAllDiceSet();
    }
}