import { RoleEnum } from '../../types/RoleEnum';
import { getResultStr, RollResult } from '../../types/RollResult';
import { compareRole } from '../CompareRole';
import { judgeRole } from '../JudgeRole';

test('ちんちろの役で勝利', () => {
  const roleUser = RoleEnum.ARASHI;
  const roleRival = RoleEnum.SHIGORO;

  const result = compareRole(roleUser, roleRival);

  const resultStr = getResultStr(result);
  const targetStr = getResultStr(RollResult.WIN);
  expect(resultStr).toBe(targetStr);
});

test('ちんちろの役で引き分け', () => {
  const roleUser = RoleEnum.PINZORO;
  const roleRival = RoleEnum.PINZORO;

  const result = compareRole(roleUser, roleRival);

  const resultStr = getResultStr(result);
  const targetStr = getResultStr(RollResult.DRAW);
  expect(resultStr).toBe(targetStr);
});

test('ちんちろの役で引き分け、2つ一致・1つ残りで敗北', () => {
  const [roleUser, diceUser, errorJudgeUser] = judgeRole([1, 3, 3]);
  const [roleRival, diceRival, errorJudgeRival] = judgeRole([2, 2, 5]);

  const result = compareRole(roleUser, roleRival);

  const resultStr = getResultStr(result);
  const targetStr = getResultStr(RollResult.DRAW);
  expect(resultStr).toBe(targetStr);
  expect(diceUser).toBeLessThan(diceRival);
});

test('ちんちろの役で敗北', () => {
  const roleUser = RoleEnum.HIFUMI;
  const roleRival = RoleEnum.MENASHI;

  const result = compareRole(roleUser, roleRival);

  const resultStr = getResultStr(result);
  const targetStr = getResultStr(RollResult.LOSE);
  expect(resultStr).toBe(targetStr);
});
