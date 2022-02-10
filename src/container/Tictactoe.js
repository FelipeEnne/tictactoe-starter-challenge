import React, { useState } from "react";
import styled from 'styled-components';

const SquareDiv = styled.div`
  padding: 10px;
  width: 100px;
  height: 100px;
  border: 1px solid #000;
`;

const SquareLine = styled.div`
  display: flex;
  place-content: center;
  font-size: 30px;
`;

const BoardDiv = styled.div`
  margin-top: 80px;
`;

const WinnerDiv = styled.div`
  margin-top: 50px;
  text-align: center;
  font-size: 40px;
`;

const TitleDiv = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 40px;
`;


const ButtonRestartDiv = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const ButtonRestart = styled.button`
  width: 130px;
  height: 50px;
  border-radius: 20px;
  background-color: #75ccf6;
  border: 1px solid;
  font-size: 20px;
`;

const Square = ({id, onClick, table}) => {
  return (
  <SquareDiv id={id} onClick={onClick}>
    {table[id] === 1 ? 
        <img alt="x" src="assets/images/x.svg"/> : 
      table[id] === 2 ? 
        <img alt="o" src="assets/images/o.svg"/> :
        ''  }
  </SquareDiv>
  )
}

const verifyLine = (line) => {
  let winner = 0;
  if(line[0] !== 0 && line[0] === line[1] && line[1] === line[2]){
    winner = line[0];
  } 
  return winner;    
}

const verifyWinner = (table) => {
  let winner = 0;

  for(let i = 0; i <= 2; i++) {
    winner = verifyLine([table[0+i*3],table[1+i*3],table[2+i*3]])
    if(winner !== 0) return winner;
    winner = verifyLine([table[0+i],table[3+i],table[6+i]])
    if(winner !== 0) return winner;
  }
  winner = verifyLine([table[0],table[4],table[8]])
  if(winner !== 0) return winner;
  winner = verifyLine([table[2],table[4],table[6]])

  return winner
}

const Board  = () => {
  const [table, setTable] = useState([0,0,0,0,0,0,0,0,0])
  const [turn, setTurn] = useState(1)
  const [winner, setWinner] = useState(0)

  const onClick = e => {
    const tableId = e.target.id
    let tableUpdate = [...table]

    if(turn === 1 && winner !== -1 && tableUpdate[tableId] === 0) {
      tableUpdate[tableId] = 1
      setTurn(2)
    } else if(turn === 2 && winner !== -1  && tableUpdate[tableId] === 0) {
      tableUpdate[tableId] = 2
      setTurn(1)
    }
    
    setTable(tableUpdate)

    const winnerUpdate = verifyWinner(tableUpdate)

    setWinner(winnerUpdate);

    if(winnerUpdate===0 && tableUpdate.filter(a => a === 0).length === 0){
      setWinner(-1);
    }
  }



  return (
    <div>
      <TitleDiv>
        Tic-Tac-Toe game
      </TitleDiv>
      <BoardDiv>
        <SquareLine>
          <Square id={'0'} onClick={onClick} table={table}/>
          <Square id={'1'} onClick={onClick} table={table}/>
          <Square id={'2'} onClick={onClick} table={table}/>
        </SquareLine>
        <SquareLine>
          <Square id={'3'} onClick={onClick} table={table}/>
          <Square id={'4'} onClick={onClick} table={table}/>
          <Square id={'5'} onClick={onClick} table={table}/>
        </SquareLine>
        <SquareLine>
          <Square id={'6'} onClick={onClick} table={table}/>
          <Square id={'7'} onClick={onClick} table={table}/>
          <Square id={'8'} onClick={onClick} table={table}/>
        </SquareLine>
      </BoardDiv>
      <WinnerDiv>
        {winner === -1 ? 'Empate' : '' }
        {winner === 1 ? 'Jogador 1 venceu' : ''}
        {winner === 2 ? 'Jogador 2 venceu' : ''}
      </WinnerDiv>
      <ButtonRestartDiv>
      {winner !== 0 ?(
        <ButtonRestart onClick={() => {
          setTable([0,0,0,0,0,0,0,0,0]);
          setTurn(1)
        }}>
          Reiniciar 
        </ButtonRestart>
        ) : ''
      }
      </ButtonRestartDiv>
    </div>
  );

};


export default Board