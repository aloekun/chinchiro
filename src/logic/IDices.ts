import { RoleEnum } from "../types/RoleEnum";

export interface IDice {
    getDices(): number[];
    getRole(): RoleEnum;
    rollDices(): void;
}