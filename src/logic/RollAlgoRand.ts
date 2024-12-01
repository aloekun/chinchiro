import { IAlgo } from "./IAlgo";

export class RollAlgoRand implements IAlgo {
    public readonly DICE_ROLES:number = 6;
    public roll(): number {
        return Math.floor(Math.random() * this.DICE_ROLES + 1);
    }
}