import React, { useEffect, useState } from 'react';
import Actions from './Actions';
import Button from './Button';
import TextIndicator from './TextIndicator';

const X = 'X';
const O = 'O';
const W = '-';

const Board = () => {
  const [winner, setWinner] = useState();

  const [turn, setTurn] = useState(X);

  const [game, setGame] = useState([
    [W, W, W],
    [W, W, W],
    [W, W, W],
  ]);

  const toogleTurn = () => {
    if (turn === X) {
      setTurn(O);
      return;
    }
    setTurn(X);
  };

  const handleClick = (x, y) => {
    let newGame = game;

    if (newGame[x][y] === W) {
      newGame[x][y] = turn;
      setGame(newGame);

      let horizontal = false;
      let vertical = false;
      for (let i = 0; i < game.length; i++) {
        if (
          newGame[i][0] !== W &&
          newGame[i][0] === newGame[i][1] &&
          newGame[i][1] === newGame[i][2]
        ) {
          horizontal = true;
          break;
        }
        if (
          newGame[0][i] !== W &&
          newGame[0][i] === newGame[1][i] &&
          newGame[1][i] === newGame[2][i]
        ) {
          vertical = true;
          break;
        }
      }

      let diagonal1 =
        newGame[0][0] !== W &&
        newGame[0][0] === newGame[1][1] &&
        newGame[1][1] === newGame[2][2];

      let diagonal2 =
        newGame[0][2] !== W &&
        newGame[0][2] === newGame[1][1] &&
        newGame[1][1] === newGame[2][0];

      if (horizontal || vertical || diagonal1 || diagonal2) {
        setWinner(turn);
        console.log(turn, 'es el ganador');
      } else {
        toogleTurn();
      }
    }
  };

  const handleNewGame = () => {
    setGame([
      [W, W, W],
      [W, W, W],
      [W, W, W],
    ]);
    setTurn(X);
    setWinner(undefined);
  };

  useEffect(() => {
    console.log('Cambia el ganador', winner);
  }, [winner]);

  const getCurrentBoard = () => {
    return game.map((row, x) => {
      return (
        <div key={`row-${x}`} className="row">
          {row.map((cell, y) => {
            return (
              <Button
                key={`cell-${x}-${y}`}
                content={cell}
                onClick={() => handleClick(x, y)}
              />
            );
          })}
        </div>
      );
    });
  };

  return (
    <div className="board">
      <TextIndicator
        content={!winner ? 'Turno de ' + turn : 'El ganador es ' + winner}
      />
      {getCurrentBoard()}
      <Actions handleNewGame={handleNewGame} />
    </div>
  );
};

export default Board;
