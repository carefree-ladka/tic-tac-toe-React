import { useState } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import SuccessPopUp from "./SuccessPopUp";

const initialState = Array(9).fill("");
const TicTacToe = () => {
  const { width, height } = useWindowSize();
  const [turn, setTurn] = useState("X");
  const [cells, setCells] = useState(initialState);
  const [winner, setWinner] = useState();
  const [winnerPattern, setWinnerPattern] = useState("");
  const [tied, setTied] = useState(false);

  const checkWinner = (squares) => {
    const filledCells = squares.filter((item) => item !== "");
    if (filledCells.length === squares.length) {
      setWinner("Match Tied");
      setTied(true);
      setWinnerPattern("");
      return;
    }
    const possibleWins = {
      across: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8]
      ],
      down: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
      ],
      diagonal: [
        [0, 4, 8],
        [2, 4, 6]
      ]
    };
    for (let win in possibleWins) {
      possibleWins[win].forEach((pattern) => {
        if (
          squares[pattern[0]] === "" ||
          squares[pattern[1]] === "" ||
          squares[pattern[2]] === ""
        ) {
          return;
        } else if (
          squares[pattern[0]] === squares[pattern[1]] &&
          squares[pattern[1]] === squares[pattern[2]]
        ) {
          setTied(false);
          setWinnerPattern(pattern);
          setWinner(`${squares[pattern[0]]} is the winner`);
        }
      });
    }
  };
  const handleClick = (num) => {
    if (cells[num] !== "") return;
    let squares = [...cells];
    if (turn === "X") {
      squares[num] = "X";
      setTurn("O");
    } else {
      squares[num] = "O";
      setTurn("X");
    }
    checkWinner(squares);
    setCells(squares);
  };

  const handleRestart = () => {
    setWinner("");
    setCells(initialState);
  };
  const Cell = ({ num }) => (
    <>
      <td
        onClick={() => !winner && handleClick(num)}
        className={`${cells[num] === "X" ? "cellX" : "cellO"} ${
          winner ? (winnerPattern.indexOf(num) !== -1 ? "" : "disabled") : ""
        }`}
      >
        {cells[num]}
      </td>
    </>
  );

  return (
    <div className="container">
      <h2> Turn {turn}</h2>
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
      <div className="result">
        {!tied && winner && <Confetti width={width} height={height} />}
        {winner && (
          <>
            <SuccessPopUp winner={winner} handleRestart={handleRestart} />
          </>
        )}
      </div>
    </div>
  );
};

export default TicTacToe;
