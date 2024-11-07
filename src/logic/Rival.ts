import { rollDices } from '../components/DiceRoller';

export class Rival {
    private dices: number[] = [];
    constructor(diceCount: number, diceRoles: number) {
        this.dices = rollDices(diceCount, diceRoles);
    }

    public getDices(): number[] {
        return this.dices;
    }
}