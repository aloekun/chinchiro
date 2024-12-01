import { RoleEnum } from '../../types/RoleEnum';
import { OneDice } from '../OneDice';
import { OneSetDices } from '../OneSetDices';
import { RollAlgoRand } from '../RollAlgoRand';
import { ThreeSetDices } from '../ThreeSetDices';

test('サイコロ3つを振って、役が出る', () => {
  const sut = new ThreeSetDices([
    new OneSetDices([
      new OneDice(new RollAlgoRand()),
      new OneDice(new RollAlgoRand()),
      new OneDice(new RollAlgoRand()),
    ]),
    new OneSetDices([
      new OneDice(new RollAlgoRand()),
      new OneDice(new RollAlgoRand()),
      new OneDice(new RollAlgoRand()),
    ]),
    new OneSetDices([
      new OneDice(new RollAlgoRand()),
      new OneDice(new RollAlgoRand()),
      new OneDice(new RollAlgoRand()),
    ]),
  ]);

  sut.rollDices();

  const allDiceSet = sut.getAllDiceSet();
  expect(allDiceSet.length).toBe(3);
  // サイコロ3つが3セット
  expect(allDiceSet[0].getDices().length).toBe(3);
  expect(allDiceSet[1].getDices().length).toBe(3);
  expect(allDiceSet[2].getDices().length).toBe(3);
  // 役が出ている
  expect(allDiceSet[0].getRole()).toBeGreaterThan(RoleEnum.NONE);
  expect(allDiceSet[1].getRole()).toBeGreaterThan(RoleEnum.NONE);
  expect(allDiceSet[2].getRole()).toBeGreaterThan(RoleEnum.NONE);
  // 代表の役が出ている
  const role = sut.getRole();
  expect(role).toBeGreaterThan(RoleEnum.NONE);
  // 代表の役のサイコロが出ている
  const dices = sut.getDices();
  expect(dices.length).toBe(3);
});
