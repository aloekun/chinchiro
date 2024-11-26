import { RoleEnum } from '../types/RoleEnum';
import { IDiceFuncs } from './IDiceFuncs';
import { OneSetDices } from './OneSetDices';

export class Rival implements IDiceFuncs {
    private dices: IDiceFuncs;
    constructor(dices: IDiceFuncs) {
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