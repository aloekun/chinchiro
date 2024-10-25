/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { DiceRoller } from '../DiceRoller';

test('「サイコロを振る」をクリックするとonClickPlayが呼ばれる', () => {
  const onClickPlay = jest.fn();
  render(<DiceRoller onClickPlay={onClickPlay} />);
  const button = screen.getByText('サイコロを振る');
  fireEvent.click(button);
  expect(onClickPlay).toHaveBeenCalled();
});
