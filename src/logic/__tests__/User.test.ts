/**
 * @jest-environment jsdom
 */
import { OneSetDices } from "../OneSetDices";
import {User} from "../User"

test("Userクラスで十分なポイントを所持していて、コストを支払う", () => {
    const sut = new User(1000, new OneSetDices());

    sut.payCost(100);

    const point = sut.getNumber();
    expect(point).toBe(900);
});

test("Userクラスでポイントが不足していて、例外が返る", () => {
    const sut = new User(0, new OneSetDices());

    expect(() => sut.payCost(100)).toThrow("Point is less");
});

test("Userクラスにポイントを加算(0から加算)", () => {
    const sut = new User(0, new OneSetDices());

    sut.gainPoint(1000);

    const point = sut.getNumber();
    expect(point).toBe(1000);
});

test("Userクラスにポイントを加算(ポイントアリから加算)", () => {
    const sut = new User(500, new OneSetDices());

    sut.gainPoint(200);

    const point = sut.getNumber();
    expect(point).toBe(700);
});

test("Userクラスをリフレッシュしたら初期値に戻る", () => {
    const pointDefault: number = 1000;
    const sut = new User(pointDefault, new OneSetDices());

    sut.gainPoint(200);
    sut.refreshPoint();

    const point = sut.getNumber();
    expect(point).toBe(pointDefault);
});

