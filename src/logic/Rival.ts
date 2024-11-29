import { RoleEnum } from '../types/RoleEnum';
import { DiceHandler } from './DiceHandler';
import { OneSetDices } from './OneSetDices';
import { ThreeSetDices } from './ThreeSetDices';

export class Rival implements DiceHandler {
    private dices: ThreeSetDices;
    constructor(dices: ThreeSetDices) {
        if (dices == null) {
            throw EvalError("not defined interface");
        }
        this.dices = dices;
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