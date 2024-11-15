import { RoleEnum } from "../types/RoleEnum";

export abstract class DiceHandler {
    abstract getDices(): number[];
    abstract getRole(): RoleEnum;
    abstract rollDices(): void;
}