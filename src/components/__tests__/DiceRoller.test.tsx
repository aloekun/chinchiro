import { render, screen, fireEvent } from '@testing-library/react';
import { DiceRoller } from '../DiceRoller';

test('「サイコロを振る」ボタンを押してonClickPlayを呼ぶ', () => {
  const onClickPlay = jest.fn();
  render(<DiceRoller onClickPlay={onClickPlay} />);
  const button = screen.getByText('サイコロを振る');
  fireEvent.click(button);
  expect(onClickPlay).toHaveBeenCalled();
});
