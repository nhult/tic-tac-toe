import React from 'react';
import Cell from './Cell.jsx';

import '../styles/Grid.scss';

export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: ['', '', '', '', '', '', '', '', ''],
      currentPlayer: 'X'
    }
  }

  alternatePlayer = () => {
    this.state.currentPlayer === 'X' ? this.setState({currentPlayer: 'O'}, () => this.__PerfectAI()) : this.setState({currentPlayer: 'X'});
  }

  markCell = (index) => {
    let boardClone = this.state.board
    if (boardClone[index] === '') { boardClone[index] = this.state.currentPlayer } else return;
    this.setState({board: boardClone}, () => {
      this.checkTerminal();
      this.alternatePlayer();
    });
  }

  resetBoard = (message) => {
    console.log(message);
    this.setState({board: ['', '', '', '', '', '', '', '', ''], currentPlayer: 'X'});
  }

  checkTerminal = () => {
    let winningRows = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    winningRows.forEach(row =>  {
      if (this.state.board[row[0]] === 'X' && this.state.board[row[1]] === 'X' && this.state.board[row[2]] === 'X') {
        console.log("X WON!");
        this.resetBoard();
        return false;
      }
      else if (this.state.board[row[0]] === 'O' && this.state.board[row[1]] === 'O' && this.state.board[row[2]] === 'O') {
        console.log("O WON!");
        this.resetBoard();
        return false;
      }
    });

    if (this.state.board.indexOf('') < 0) this.resetBoard("TIE! (Board is full and no one won)");
  }

  emptyIndices = () => {
    let emptyIndices = [];
    this.state.board.forEach((cell, index) => {
      if (cell === '') {
        emptyIndices.push(index);
      }
    });
    return emptyIndices;
  }

  /*Not quite minimax, but tries to follow the strategy of a perfect player*/
  __PerfectAI = () => { /*https://en.wikipedia.org/wiki/Tic-tac-toe#Strategy*/
    if (this.state.currentPlayer !== 'O') return false;

    let winningRows = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    for (let i = 0; i < winningRows.length; i++) {
      //Step 1
      if (this.state.board[winningRows[i][0]] === 'O' && this.state.board[winningRows[i][1]] === 'O' && this.state.board[winningRows[i][2]] === '') {this.markCell(winningRows[i][2]); return;}
      else if (this.state.board[winningRows[i][0]] === 'O' && this.state.board[winningRows[i][1]] === '' && this.state.board[winningRows[i][2]] === 'O') {this.markCell(winningRows[i][1]); return;}
      else if (this.state.board[winningRows[i][0]] === '' && this.state.board[winningRows[i][1]] === 'O' && this.state.board[winningRows[i][2]] === 'O') {this.markCell(winningRows[i][0]); return;}

      //Step 2
      if (this.state.board[winningRows[i][0]] === 'X' && this.state.board[winningRows[i][1]] === 'X' && this.state.board[winningRows[i][2]] === '') {this.markCell(winningRows[i][2]); return;}
      else if (this.state.board[winningRows[i][0]] === 'X' && this.state.board[winningRows[i][1]] === '' && this.state.board[winningRows[i][2]] === 'X') {this.markCell(winningRows[i][1]); return;}
      else if (this.state.board[winningRows[i][0]] === '' && this.state.board[winningRows[i][1]] === 'X' && this.state.board[winningRows[i][2]] === 'X') {this.markCell(winningRows[i][0]); return;}

      //Step 3
      if (this.state.board[winningRows[i][0]] === 'O' && this.state.board[winningRows[i][1]] === '' && this.state.board[winningRows[i][2]] === '') {this.markCell(winningRows[i][1]); return;}
      else if (this.state.board[winningRows[i][0]] === '' && this.state.board[winningRows[i][1]] === 'O' && this.state.board[winningRows[i][2]] === '') {this.markCell(winningRows[i][0]); return;}
      else if (this.state.board[winningRows[i][0]] === '' && this.state.board[winningRows[i][1]] === '' && this.state.board[winningRows[i][2]] === 'O') {this.markCell(winningRows[i][1]); return;}
    }

    //Final step placeholder, take all the empty cells and randomly mark one of them. Note that function has not returned value yet if this point has been reached, therefore 'O', the opponent hasn't played his turn.
    let randomEmptyCell = Math.floor(Math.random() * this.emptyIndices().length + 1);
    this.markCell(randomEmptyCell); return;
  }

  render() {
    return (
      <div className="Grid">
        {
          this.state.board.map((mark, index) => {
            return <Cell key={index + 100} mark={mark} clickHandler={() => this.markCell(index)} />
          })
        }
      </div>
    );
  }
}
