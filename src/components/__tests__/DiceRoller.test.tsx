/**
 * @jest-environment jsdom
 */
// import { render, screen, fireEvent } from '@testing-library/react';
import { rollDices } from '../DiceRoller';

test("3個のダイスを振る", () => {
  const diceCount:number = 3;
  const diceRoles:number = 6;
  const rolls = rollDices(diceCount, diceRoles);

  expect(rolls.length).toBe(diceCount);
  expect(rolls[0]).toBeGreaterThanOrEqual(1);
  expect(rolls[0]).toBeLessThanOrEqual(diceRoles);
  expect(rolls[1]).toBeGreaterThanOrEqual(1);
  expect(rolls[1]).toBeLessThanOrEqual(diceRoles);
  expect(rolls[2]).toBeGreaterThanOrEqual(1);
  expect(rolls[2]).toBeLessThanOrEqual(diceRoles);
});