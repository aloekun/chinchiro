import React from 'react';
import { OneSetDices } from '../logic/OneSetDices';

// ちんちろりんの結果を表示するコンポーネント
export const DiceResultTable: React.FC<{ allDices: number[][], roles: string[] }> = ({ allDices, roles }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>セット</th>
          <th>サイコロの出目</th>
          <th>役</th>
        </tr>
      </thead>
      <tbody>
        {allDices.map((dices, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{dices.join(', ')}</td>
            <td>{roles[index]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// // サンプルデータ
// const sampleResults: ChinchiroResult[] = [
//   { diceRolls: [1, 2, 3], role: 'ヒフミ' },
//   { diceRolls: [4, 5, 6], role: 'シゴロ' },
//   { diceRolls: [1, 1, 1], role: 'ピンゾロ' },
// ];

// // メインコンポーネント
// const App: React.FC = () => {
//   return (
//     <div>
//       <h1>ちんちろりんの結果</h1>
//       <ChinchiroTable results={sampleResults} />
//     </div>
//   );
// };

// export default App;
