import { useState } from 'react';
import './App.css';

function App() {
  const [point, setPoint] = useState<number>(1000);
  const [gainPoint, setGainPoint] = useState<number>(0);
  const [diceRolls, setDiceRolls] = useState<Array<number>>([0, 0, 0]);
  const [role, setRole] = useState<string>('なし');

  // 初期状態に戻すメソッド
  const onClickClear = (): void => {
    setPoint(1000);
    setGainPoint(0);
    setDiceRolls([0, 0, 0]);
    setRole('なし');
    alert('リセットしました');
  };
  const onClickPlay = () => {
    alert();
  };

  return (
    <>
      <button onClick={onClickClear}>リセット</button>
      <br />
      <br />
      <br />
      <div>所持ポイント：{point}</div>
      <div>
        使用ポイント：
        <input type="number"></input>
      </div>
      <button onClick={onClickPlay}>サイコロを振る</button>
      <br />
      <br />
      <div>出た目：{diceRolls.join(', ')}</div>
      <div>役：{role}</div>
      <div>獲得したポイント：{gainPoint}</div>
    </>
  );
}

export default App;
