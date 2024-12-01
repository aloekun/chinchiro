import { IAlgo } from "./IAlgo";

export class RollAlgoFixCheat implements IAlgo {
    private diceFixed: number;

    constructor(dice: number) {
        this.diceFixed = dice;
    }

    public roll(): number {
        return this.diceFixed;
    }
}