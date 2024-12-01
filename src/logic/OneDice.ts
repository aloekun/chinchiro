import { IAlgo } from "./IAlgo";

export class OneDice {
    private dice: number;
    private algo: IAlgo;
    constructor(algo: IAlgo) {
        this.dice = 0;
        this.algo = algo;
    }

    public getDice() {
        return this.dice;
    }

    public roll() {
        this.dice = this.algo.roll();
    }
}