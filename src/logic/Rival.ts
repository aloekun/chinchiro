import { rollDices } from '../components/DiceRoller';

export class Rival {
    private dices: number[] = [];
    constructor() {
        this.dices = rollDices();
    }

    public getDices(): number[] {
        return this.dices;
    }
}