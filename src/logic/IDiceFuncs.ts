import { RoleEnum } from "../types/RoleEnum";
import { OneSetDices } from "./OneSetDices";

export interface IDiceFuncs {
    getDices(): number[];
    getRole(): RoleEnum;
    rollDices(): void;
    getAllDiceSet(): OneSetDices[];
    getOnlyOneNumber(): number;
}