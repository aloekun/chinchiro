import { RoleEnum } from '../types/RoleEnum';
import { IDices } from './IDices';
import { OneSetDices } from './OneSetDices';

export class Rival implements IDices {
    private dices: IDices;
    constructor(dices: IDices) {
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