import { useState } from "react";
import "./TicTacToe.css";
const TicTaeToe = () => {
  const [turn, setTurn] = useState(`x`);
  const [cells, setCells] = useState(Array(9).fill(""));
  const [winMessage, setWinMessage] = useState("");
  // console.log(cells);
  const tie = () => {
    setWinMessage("Match Got TIE PlayAgain ->");
  };
  const reloadGame = () => {
    setTurn("x");
    setWinMessage("");
    setCells(Array(9).fill(""));
  };
  const handleClick = (num) => {
    if (cells[num] !== "") {
      alert("Already Clicked");
      return;
    }
    let newcells = [...cells];
    if (turn === "x") {
      newcells[num] = "x";
      setTurn("o");
    } else {
      newcells[num] = "o";
      setTurn("x");
    }
    setCells(newcells);
    checkWinner(newcells);
  };
  const checkWinner = (cells) => {
    let winning = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];

    let round = false;
    // console.log(cells, "Into CheckWinner");
    for (let i = 0; i <= 7; i++) {
      let temp = winning[i];
      var a = cells[temp[0]];
      var b = cells[temp[1]];
      var c = cells[temp[2]];
      if (a == "" || b == "" || c == "") {
        continue;
      }
      if (a == b && b == c) {
        round = true;
        break;
      }
    }
    // console.log(round  ,"Round")
    if (round) {
      setWinMessage(a);
    }
   else if (round == false && cells.indexOf("") == -1) {
      tie();
    }
  };
  const Cell = ({ num }) => {
    return (
      <td onClick={() => handleClick(num)} className="cell">
        {cells[num]}
      </td>
    );
  };

  return (
    <div className="cell-container">
      <table>
        <tbody>
          <tr>
            <Cell num={0} />
            <Cell num={1} />
            <Cell num={2} />
          </tr>
          <tr>
            <Cell num={3} />
            <Cell num={4} />
            <Cell num={5} />
          </tr>
          <tr>
            <Cell num={6} />
            <Cell num={7} />
            <Cell num={8} />
          </tr>
        </tbody>
      </table>
      {winMessage && (
        <div>
          <h1>{winMessage}</h1>
          <button onClick={reloadGame}>Reload</button>
        </div>
      )}
    </div>
  );
};

export default TicTaeToe;
