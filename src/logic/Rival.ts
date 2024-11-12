import { RoleEnum } from '../types/RollEnum';
import { DiceManager, OneSetDices } from './OneSetDices';

export class Rival implements DiceManager {
    private dices: OneSetDices;
    constructor() {
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