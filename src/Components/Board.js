import React, { useEffect, useState } from 'react'
import './Board.css'

const Board = () => {

    const getRandom=() =>{
      return{
        x: Math.floor(Math.random() * 10),
        y: Math.floor(Math.random() * 10)
      }
    }
    const BOARD_SIZE = 10
    
    const ini = new Array(BOARD_SIZE) .fill(0).map(row => new Array(BOARD_SIZE) .fill(0));
    let initialState = {
      food : getRandom(),
      snake: [{x:5,y:5}],
      speed : 1000,
    }
    const [board,setBoard]= useState(ini);
    const [states, setStates]=useState(initialState)  
    const [direction,setDir]=useState('STOP')
    
    const displaySnake=()=>{
      console.log('inside display snake')
        let newBoard = new Array(BOARD_SIZE) .fill('').map(row => new Array(BOARD_SIZE) .fill(''));
        console.log('after new board')
        console.log('new Board :' + JSON.stringify(newBoard))
        states.snake.map((element)=>newBoard[element.x][element.y] = 'snake')
        console.log('new Board :' + JSON.stringify(newBoard))
        console.log('x:y' + states.food.x + ":" + states.food.y)
        newBoard[states.food.x][states.food.y]= 'food'
       
        setBoard(newBoard)
        
    }
    //const isEaten=()=>{}
    const isDead=()=>{}
    const _direction=(e) =>{
      let dir;
      switch (e.key)
      {
        case 'ArrowUp':
          dir=(states.direction === 'DOWN')?'DOWN':'UP'
          setDir(direction => dir)
          break;

        case 'ArrowDown':
            dir=(states.direction === 'UP')?'UP':'DOWN'
            setDir(direction => dir)
            break;

        case 'ArrowLeft':
          dir=(states.direction === 'RIGHT')?'RIGHT':'LEFT'
          setDir(direction => dir)
          break;

        case 'ArrowRight':
          dir=(states.direction === 'LEFT')?'LEFT':'RIGHT'
          setDir(direction => dir)
          break;
      }

    }
    const moveSnake=()=>{
      const newSnake = [...states.snake]
      const head = {...newSnake[newSnake.length - 1]}
      console.log('move snake')
      console.log(direction)
      switch(direction){
        case 'LEFT':  head.y += -1; break;    
        case 'UP':    head.x += -1; break;
        case 'RIGHT': head.y += 1;  break;
        case 'DOWN':  head.x += 1;  break;
        default: return;
      }
      newSnake.push(head)
      newSnake.shift();
      setStates({...states, snake:newSnake})
      displaySnake()
      //requestAnimationFrame(moveSnake)

       
    }
    const isEaten =()=>{
      let snakeCopy  = [...states.snake];
      let head  =  {...snakeCopy[snakeCopy.length-1]};
      let food = states.food;
      if ((head.x === food.x) &&(head.y === food.y)) {
          snakeCopy.push(head);
          setStates({
              ...states,
              snake: snakeCopy,
              food: getRandom() 
          });
      } 
  }

    useEffect(()=>{
      moveSnake()
      console.log('useeffect')
      document.onkeydown=_direction
    },[])

    useEffect(()=>{
      moveSnake()
      console.log("states :  " + direction)
      console.log(JSON.stringify(board))

    },[states, board])
  
  return (
    <div className='board'>{direction}
    {board.map((ele,rindex)=>
    { return(<div key={rindex} className="row"> {ele.map((cEle,cindex)=>(<div key={cindex} id='cell' className={cEle}></div>))}</div>)}
    )}
    </div>
  )
}

export default Board