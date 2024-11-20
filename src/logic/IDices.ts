import { RoleEnum } from "../types/RoleEnum";
import { OneSetDices } from "./OneSetDices";

export interface IDices {
    getDices(): number[];
    getRole(): RoleEnum;
    rollDices(): void;
    getAllDiceSet(): OneSetDices[];
}