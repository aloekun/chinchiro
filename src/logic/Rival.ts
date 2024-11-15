import { RoleEnum } from '../types/RoleEnum';
import { DiceHandler } from './DiceHandler';
import { OneSetDices } from './OneSetDices';

export class Rival extends DiceHandler {
    private dices: OneSetDices;
    constructor() {
        super();
        this.dices = new OneSetDices();
        this.dices.rollDices();
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