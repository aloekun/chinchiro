import { render, screen, fireEvent } from '@testing-library/react';
import { DiceRoller } from '../DiceRoller';

test('rolls dices and calls onClickPlay', () => {
  const onClickPlay = jest.fn();
  render(<DiceRoller onClickPlay={onClickPlay} />);
  const button = screen.getByText('サイコロを振る');
  fireEvent.click(button);
  expect(onClickPlay).toHaveBeenCalled();
});
