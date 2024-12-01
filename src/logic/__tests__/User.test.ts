/**
 * @jest-environment jsdom
 */
import { getRoleStr, RoleEnum } from '../../types/RoleEnum';
import { OneDice } from '../OneDice';
import { OneSetDices } from '../OneSetDices';
import { RollAlgoFixCheat } from '../RollAlgoFixCheat';
import { RollAlgoRand } from '../RollAlgoRand';
import { ThreeSetDices } from '../ThreeSetDices';
import { User } from '../User';

test('Userクラスで十分なポイントを所持していて、コストを支払う', () => {
  const dices = new ThreeSetDices([
    new OneSetDices([
      new OneDice(new RollAlgoRand()),
      new OneDice(new RollAlgoRand()),
      new OneDice(new RollAlgoRand()),
    ]),
  ]);
  const sut = new User(1000, dices);

  sut.payCost(100);

  const point = sut.getNumber();
  expect(point).toBe(900);
});

test('Userクラスでポイントが不足していて、例外が返る', () => {
  const dices = new ThreeSetDices([
    new OneSetDices([
      new OneDice(new RollAlgoRand()),
      new OneDice(new RollAlgoRand()),
      new OneDice(new RollAlgoRand()),
    ]),
  ]);
  const sut = new User(0, dices);

  expect(() => sut.payCost(100)).toThrow('Point is less');
});

test('Userクラスにポイントを加算(0から加算)', () => {
  const dices = new ThreeSetDices([
    new OneSetDices([
      new OneDice(new RollAlgoRand()),
      new OneDice(new RollAlgoRand()),
      new OneDice(new RollAlgoRand()),
    ]),
  ]);
  const sut = new User(0, dices);

  sut.gainPoint(1000);

  const point = sut.getNumber();
  expect(point).toBe(1000);
});

test('Userクラスにポイントを加算(ポイントアリから加算)', () => {
  const dices = new ThreeSetDices([
    new OneSetDices([
      new OneDice(new RollAlgoRand()),
      new OneDice(new RollAlgoRand()),
      new OneDice(new RollAlgoRand()),
    ]),
  ]);
  const sut = new User(500, dices);

  sut.gainPoint(200);

  const point = sut.getNumber();
  expect(point).toBe(700);
});

test('Userクラスをリフレッシュしたら初期値に戻る', () => {
  const pointDefault: number = 1000;
  const dices = new ThreeSetDices([
    new OneSetDices([
      new OneDice(new RollAlgoRand()),
      new OneDice(new RollAlgoRand()),
      new OneDice(new RollAlgoRand()),
    ]),
  ]);
  const sut = new User(pointDefault, dices);

  sut.gainPoint(200);
  sut.refreshPoint();

  const point = sut.getNumber();
  expect(point).toBe(pointDefault);
});

test('ダイスセットで複数の「2つ一致、1つ残り」になったときに最も大きい数字のダイスセットを使う', () => {
  const dices = new ThreeSetDices([
    new OneSetDices([
      new OneDice(new RollAlgoFixCheat(1)),
      new OneDice(new RollAlgoFixCheat(3)),
      new OneDice(new RollAlgoFixCheat(3)),
    ]),
    new OneSetDices([
      new OneDice(new RollAlgoFixCheat(2)),
      new OneDice(new RollAlgoFixCheat(2)),
      new OneDice(new RollAlgoFixCheat(4)),
    ]),
    new OneSetDices([
      new OneDice(new RollAlgoFixCheat(6)),
      new OneDice(new RollAlgoFixCheat(6)),
      new OneDice(new RollAlgoFixCheat(5)),
    ]),
  ]);
  const sut = new User(1000, dices);

  sut.rollDices();

  const dicesUser = sut.getDices();
  const roleUser = sut.getRole();
  const roleUserStr = getRoleStr(roleUser);
  const targetStr = getRoleStr(RoleEnum.ONLY_ONE_ROLL);
  expect(dicesUser[0]).toBe(6);
  expect(dicesUser[1]).toBe(6);
  expect(dicesUser[2]).toBe(5);
  expect(roleUserStr).toBe(targetStr);
});
