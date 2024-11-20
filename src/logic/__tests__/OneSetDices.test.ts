import { RoleEnum } from "../../types/RoleEnum";
import { OneSetDices } from "../OneSetDices";

test("1回分のダイスを振って、役が出る", () => {
    const sut = new OneSetDices();

    sut.rollDices();

    const dices = sut.getDices();
    const role = sut.getRole();
    const onlyOneNumber = sut.getOnlyOneNumber();
    expect(dices.length).toBe(3);
    expect(role).toBeGreaterThan(RoleEnum.NONE);
    expect(onlyOneNumber).toBeGreaterThanOrEqual(0);

    const allDiceSet = sut.getAllDiceSet();
    expect(allDiceSet[0].getRole()).toBeGreaterThan(RoleEnum.NONE);
    expect(allDiceSet[0].getDices().length).toBe(3);
});