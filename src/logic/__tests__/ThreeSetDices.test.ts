import { RoleEnum } from "../../types/RoleEnum";
import { ThreeSetDices } from "../ThreeSetDices";

test("サイコロ3つを振って、役が出る", () => {
    const sut = new ThreeSetDices();

    sut.rollDices();

    // サイコロ3つ
    const allDices = sut.getAllDices();
    expect(allDices.length).toBe(3);
    // 役が出ている
    const role = sut.getRole();
    expect(role).toBeGreaterThan(RoleEnum.NONE);
});