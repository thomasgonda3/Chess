import React, { Component } from 'react'
import Square from './components/Square'
import whitePawn from './images/Chess_plt60.png'
import whiteRook from './images/Chess_rlt60.png'
import whiteKing from './images/Chess_klt60.png'
import blackKnight from './images/Chess_ndt60.png'
import blackBishop from './images/Chess_bdt60.png'
import blackQueen from './images/Chess_qdt60.png'
import './App.css'

class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      colorGrid: ["white", "green", "white", "green", "white", "green", "white", "green", "green", "white", "green", "white", "green", "white", "green", "white", "white", "green", "white", "green", "white", "green", "white", "green", "green", "white", "green", "white", "green", "white", "green", "white", "white", "green", "white", "green", "white", "green", "white", "green", "green", "white", "green", "white", "green", "white", "green", "white", "white", "green", "white", "green", "white", "green", "white", "green", "green", "white", "green", "white", "green", "white", "green", "white"],
      boardState: ["blackRook", "blackKnight", "blackBishop", "blackQueen", "blackKing", "blackBishop", "blackKnight", "blackRook", "blackPawn", "blackPawn", "blackPawn", "blackPawn", "blackPawn", "blackPawn", "blackPawn", "blackPawn", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "whitePawn", "whitePawn", "whitePawn", "whitePawn", "whitePawn", "whitePawn", "whitePawn", "whitePawn", "whiteRook", "whiteKnight", "whiteBishop", "whiteQueen", "whiteKing", "whiteBishop", "whiteKnight", "whiteRook"],
      possibleMoves: new Array(64).fill(false),
      moveRecord: [],
      moveSelected: false,
      currentPiece: "",
      startingPosition: -1,
      playerTurn: "White",
      whiteKingHasMoved: false,
      whiteARookHasMoved: false,
      whiteHRookHasMoved: false,
      blackKingHasMoved: false,
      blackARookHasMoved: false,
      blackHRookHasMoved: false
    }
  }

  findSquares = (location) => {
    if (this.state.moveSelected === false) {
      let mod = location % 8;
      let current = 0;
      let possibleMoves = [];
      let verticalPieceMovements = [-8, 8];
      let horizontalPieceMovements = [-1, 1];
      let diagonalPieceMovements = [-9, -7, 7, 9];
      let knightPieceMovements = [-17, -15, -10, -6, 6, 10, 15, 17]
      switch (this.state.boardState[location]) {
        case "whitePawn":
          if (this.state.playerTurn === "White")  {
            current = location - 8;
            if (current > 7 && !this.state.boardState[current].includes("white") && !this.state.boardState[current].includes("black"))  {
              possibleMoves.push(current);
              if (Math.floor(location * .125) === 6 && !this.state.boardState[current - 8].includes("white") && !this.state.boardState[current - 8].includes("black"))  {
                possibleMoves.push(current - 8);
              }
            }

            for (let i = 0; i < 2; i++) {
              current = location + diagonalPieceMovements[i];
              let counter = mod;
              diagonalPieceMovements[i] % 2 === 0 ? counter-- : counter++;
              if (current < 64 && current > 0 && counter >= 0 && counter <= 8 && this.state.boardState[current].includes("black") && Math.floor((location - 8) * .125) === Math.floor(current * .125)) {
                possibleMoves.push(current);
              }
            }

            this.setState({ possibleMoves: this.state.possibleMoves.map( (value, index) => {
             if (possibleMoves.includes(index))  return true;
             return false;
            })})

            console.log( possibleMoves )
          }
        break;
        case "blackPawn":
          if (this.state.playerTurn === "Black")  {
            current = location + 8;
            if (current < 56 && !this.state.boardState[current].includes("white") && !this.state.boardState[current].includes("black"))  {
              possibleMoves.push(current);
              if (Math.floor(location * .125) === 1 && !this.state.boardState[current + 8].includes("white") && !this.state.boardState[current + 8].includes("black"))  {
                possibleMoves.push(current + 8);
              }
            }

            for (let i = 2; i < 4; i++) {
              current = location + diagonalPieceMovements[i];
              let counter = mod;
              diagonalPieceMovements[i] % 2 === 0 ? counter-- : counter++;
              if (current < 64 && current > 0 && counter >= 0 && counter <= 8 && this.state.boardState[current].includes("white") && Math.floor((location + 8) * .125) === Math.floor(current * .125)) {
                possibleMoves.push(current);
              }
            }

            this.setState({ possibleMoves: this.state.possibleMoves.map( (value, index) => {
             if (possibleMoves.includes(index))  return true;
             return false;
            })})

            console.log( possibleMoves )
          }
        break;
        case "whiteKnight":
          if (this.state.playerTurn === "White")  {
            for (let movement of knightPieceMovements) {
              current = movement + location
              if (current < 64 && current > 0) {
                let spacesAway = 0;
                if (movement === -15 || movement === 17) spacesAway = 1;
                if (movement === -17 || movement === 15) spacesAway = -1;
                if (movement === -6 || movement === 10) spacesAway = 2;
                if (movement === -10 || movement === 6) spacesAway = -2;
                if (Math.floor(location * .125) !== Math.floor((location + spacesAway) * .125)) continue;
                if (this.state.boardState[current].includes("white")) continue;
                possibleMoves.push(current);
              }
            }

            this.setState({ possibleMoves: this.state.possibleMoves.map( (value, index) => {
             if (possibleMoves.includes(index))  return true;
             return false;
            })})

            console.log( possibleMoves )
          }
        break;
        case "blackKnight":
          if (this.state.playerTurn === "Black")  {
            for (let movement of knightPieceMovements) {
              current = movement + location
              if (current < 64 && current > 0) {
                let spacesAway = 0;
                if (movement === -15 || movement === 17) spacesAway = 1;
                if (movement === -17 || movement === 15) spacesAway = -1;
                if (movement === -6 || movement === 10) spacesAway = 2;
                if (movement === -10 || movement === 6) spacesAway = -2;
                if (Math.floor(location * .125) !== Math.floor((location + spacesAway) * .125)) continue;
                if (this.state.boardState[current].includes("black")) continue;
                possibleMoves.push(current);
              }
            }

            this.setState({ possibleMoves: this.state.possibleMoves.map( (value, index) => {
             if (possibleMoves.includes(index))  return true;
             return false;
            })})

            console.log( possibleMoves )
          }
        break;
        case "whiteBishop":
          if (this.state.playerTurn === "White")  {
            for (let movement in diagonalPieceMovements) {
              let current = location + diagonalPieceMovements[movement];
              let counter = mod;
              movement % 2 === 0 ? counter-- : counter++;
              while (current < 64 && current > 0 && counter >= 0 && counter < 8) {
                if (this.state.boardState[current].includes("white"))  break;
                possibleMoves.push(current);
                if (this.state.boardState[current].includes("black"))  break;
                current += diagonalPieceMovements[movement];
                movement % 2 === 0 ? counter-- : counter++;
              }
            }

              this.setState({ possibleMoves: this.state.possibleMoves.map( (value, index) => {
                if (possibleMoves.includes(index))  return true;
                return false;
              })})

            console.log(possibleMoves)
          }
        break;

        case "blackBishop":
          if (this.state.playerTurn === "Black")  {
            for (let movement in diagonalPieceMovements) {
              let current = location + diagonalPieceMovements[movement];
              let counter = mod;
              movement % 2 === 0 ? counter-- : counter++;
              while (current < 64 && current > 0 && counter >= 0 && counter < 8) {
                if (this.state.boardState[current].includes("black"))  break;
                possibleMoves.push(current);
                if (this.state.boardState[current].includes("white"))  break;
                current += diagonalPieceMovements[movement];
                movement % 2 === 0 ? counter-- : counter++;
              }
            }

              this.setState({ possibleMoves: this.state.possibleMoves.map( (value, index) => {
                if (possibleMoves.includes(index))  return true;
                return false;
              })})

            console.log(possibleMoves)
          }
        break;

        case "whiteRook":
          if (this.state.playerTurn === "White")  {
            for (let movement in verticalPieceMovements) {
              let current = location + verticalPieceMovements[movement];
              while (current < 64 && current > 0)  {
                if (this.state.boardState[current].includes("white"))  break;
                possibleMoves.push(current);
                if (this.state.boardState[current].includes("black"))  break;
                current += verticalPieceMovements[movement];;
              }
            }

            for (let movement of horizontalPieceMovements)  {
              let current = location + movement;
              if (current < 0 || current > 63) continue;
              if (!this.state.boardState[current].includes("white"))  {
                while (Math.floor(current * .125) === Math.floor(location * .125))  {
                  possibleMoves.push(current);
                  current += movement;
                  if (current > 63 || current < 0)  break;
                  if (this.state.boardState[current].includes("white"))  break;
                  if (this.state.boardState[current - movement].includes("black"))  break;
                }
              }
            }

            this.setState({ possibleMoves: this.state.possibleMoves.map( (value, index) => {
              if (possibleMoves.includes(index))  return true;
              return false;
            })})

            console.log( possibleMoves )
          }
        break;

        case "blackRook":
          if (this.state.playerTurn === "Black")  {
            for (let movement in verticalPieceMovements) {
              let current = location + verticalPieceMovements[movement];
              while (current < 64 && current > 0)  {
                if (this.state.boardState[current].includes("black"))  break;
                possibleMoves.push(current);
                if (this.state.boardState[current].includes("white"))  break;
                current += verticalPieceMovements[movement];;
              }
            }

            for (let movement of horizontalPieceMovements)  {
              let current = location + movement;
              if (current < 0 || current > 63) continue;
              if (!this.state.boardState[current].includes("black"))  {
                while (Math.floor(current * .125) === Math.floor(location * .125))  {
                  possibleMoves.push(current);
                  current += movement;
                  if (current > 63 || current < 0)  break;
                  if (this.state.boardState[current].includes("black"))  break;
                  if (this.state.boardState[current - movement].includes("white"))  break;
                }
              }
            }

               this.setState({ possibleMoves: this.state.possibleMoves.map( (value, index) => {
                 if (possibleMoves.includes(index))  return true;
                 return false;
               })})

              console.log( possibleMoves )
            }
          break;
        case "whiteQueen":
          if (this.state.playerTurn === "White")  {
            for (let movement in verticalPieceMovements) {
              let current = location + verticalPieceMovements[movement];
              while (current < 64 && current > 0)  {
                if (this.state.boardState[current].includes("white"))  break;
                possibleMoves.push(current);
                if (this.state.boardState[current].includes("black"))  break;
                current += verticalPieceMovements[movement];;
              }
            }

            for (let movement of horizontalPieceMovements)  {
              let current = location + movement;
              if (!this.state.boardState[current].includes("white"))  {
                while (Math.floor(current * .125) === Math.floor(location * .125))  {
                  possibleMoves.push(current);
                  current += movement;
                  if (current > 63 || current < 0)  break;
                  if (this.state.boardState[current].includes("white"))  break;
                  if (this.state.boardState[current - movement].includes("black"))  break;
                }
              }
            }

            for (let movement in diagonalPieceMovements) {
              let current = location + diagonalPieceMovements[movement];
              let counter = mod;
              movement % 2 === 0 ? counter-- : counter++;
              while (current < 64 && current > 0 && counter >= 0 && counter < 8) {
                if (this.state.boardState[current].includes("white"))  break;
                possibleMoves.push(current);
                if (this.state.boardState[current].includes("black"))  break;
                current += diagonalPieceMovements[movement];
                movement % 2 === 0 ? counter-- : counter++;
              }
            }

            this.setState({ possibleMoves: this.state.possibleMoves.map( (value, index) => {
             if (possibleMoves.includes(index))  return true;
             return false;
            })})

            console.log( possibleMoves )
          }
        break;
        case "blackQueen":
          if (this.state.playerTurn === "Black")  {
            for (let movement in verticalPieceMovements) {
              let current = location + verticalPieceMovements[movement];
              while (current < 64 && current > 0)  {
                if (this.state.boardState[current].includes("black"))  break;
                possibleMoves.push(current);
                if (this.state.boardState[current].includes("white"))  break;
                current += verticalPieceMovements[movement];;
              }
            }

            for (let movement of horizontalPieceMovements)  {
              let current = location + movement;
              if (!this.state.boardState[current].includes("black"))  {
                while (Math.floor(current * .125) === Math.floor(location * .125))  {
                  possibleMoves.push(current);
                  current += movement;
                  if (current > 63 || current < 0)  break;
                  if (this.state.boardState[current].includes("black"))  break;
                  if (this.state.boardState[current - movement].includes("white"))  break;
                }
              }
            }

            for (let movement in diagonalPieceMovements) {
              let current = location + diagonalPieceMovements[movement];
              let counter = mod;
              movement % 2 === 0 ? counter-- : counter++;
              while (current < 64 && current > 0 && counter >= 0 && counter < 8) {
                if (this.state.boardState[current].includes("black"))  break;
                possibleMoves.push(current);
                if (this.state.boardState[current].includes("white"))  break;
                current += diagonalPieceMovements[movement];
                movement % 2 === 0 ? counter-- : counter++;
              }
            }

            this.setState({ possibleMoves: this.state.possibleMoves.map( (value, index) => {
             if (possibleMoves.includes(index))  return true;
             return false;
            })})

            console.log( possibleMoves )
          }
        break;
        case "whiteKing":
          if (this.state.playerTurn === "White")  {
            for (let movement in verticalPieceMovements) {
              let current = location + verticalPieceMovements[movement];
              if (current < 64 && current > 0 && !this.state.boardState[current].includes("white"))  {
                possibleMoves.push(current);
              }
            }

            for (let movement of horizontalPieceMovements)  {
              let current = location + movement;
              if (!this.state.boardState[current].includes("white") && Math.floor(current * .125) === Math.floor(location * .125))  {
                  possibleMoves.push(current);
              }
            }

            for (let movement in diagonalPieceMovements) {
              let current = location + diagonalPieceMovements[movement];
              let counter = mod;
              movement % 2 === 0 ? counter-- : counter++;
              if (current < 64 && current > 0 && counter >= 0 && counter < 8 && !this.state.boardState[current].includes("white")) {
                possibleMoves.push(current);
              }
            }

            //castling
            if (this.state.whiteKingHasMoved === false) {
              if (this.state.whiteHRookHasMoved === false)  {
                if (this.state.boardState[60] === "whiteKing" && this.state.boardState[61] === "" && this.state.boardState[62] === "" && this.state.boardState[63] === "whiteRook") {
                  possibleMoves.push(62)
                }
              }
              if (this.state.whiteARookHasMoved === false)  {
                if (this.state.boardState[60] === "whiteKing" && this.state.boardState[59] === "" && this.state.boardState[58] === "" && this.state.boardState[57] === "" && this.state.boardState[56] === "whiteRook") {
                  possibleMoves.push(58)
                }
              }
            }

            this.setState({ possibleMoves: this.state.possibleMoves.map( (value, index) => {
             if (possibleMoves.includes(index))  return true;
             return false;
            })})

            console.log( possibleMoves )
          }
        break;
        case "blackKing":
          if (this.state.playerTurn === "Black")  {
            for (let movement in verticalPieceMovements) {
              let current = location + verticalPieceMovements[movement];
              if (current < 64 && current > 0 && !this.state.boardState[current].includes("black"))  {
                possibleMoves.push(current);
              }
            }

            for (let movement of horizontalPieceMovements)  {
              let current = location + movement;
              if (!this.state.boardState[current].includes("black") && Math.floor(current * .125) === Math.floor(location * .125))  {
                  possibleMoves.push(current);
              }
            }

            for (let movement in diagonalPieceMovements) {
              let current = location + diagonalPieceMovements[movement];
              let counter = mod;
              movement % 2 === 0 ? counter-- : counter++;
              if (current < 64 && current > 0 && counter >= 0 && counter < 8 && !this.state.boardState[current].includes("black")) {
                possibleMoves.push(current);
              }
            }

            //castling
            if (this.state.blackKingHasMoved === false) {
              if (this.state.blackHRookHasMoved === false)  {
                if (this.state.boardState[4] === "blackKing" && this.state.boardState[5] === "" && this.state.boardState[6] === "" && this.state.boardState[7] === "blackRook") {
                  possibleMoves.push(6)
                }
              }
              if (this.state.blackARookHasMoved === false)  {
                if (this.state.boardState[4] === "blackKing" && this.state.boardState[3] === "" && this.state.boardState[2] === "" && this.state.boardState[1] === "" && this.state.boardState[0] === "blackRook") {
                  possibleMoves.push(2)
                }
              }
            }

            this.setState({ possibleMoves: this.state.possibleMoves.map( (value, index) => {
             if (possibleMoves.includes(index))  return true;
             return false;
            })})

            console.log( possibleMoves )
          }
        break;
        default:
      }
    }
  }

  clearMove = () => {
    if (this.state.moveSelected === false)  {
      this.setState({ possibleMoves: new Array(64).fill(false) })
    }
  }

  movePiece = (currentPiece, position, squareName) => {
    //select piece
    if (this.state.moveSelected === false && this.state.boardState[position] !== "" && currentPiece.includes(this.state.playerTurn.toLowerCase()))  {
      this.setState({
      currentPiece: currentPiece,
      startingPosition: position,
      moveSelected: true,
    })} else {
        //cancel move
        if (position === this.state.startingPosition)  {
          this.setState({
            currentPiece: "",
            startingPosition: -1,
            moveSelected: false,
          })
        }
        //make move
        if (this.state.possibleMoves[position] === true) {
          if (this.state.playerTurn.includes("White")) {
            this.setState({ playerTurn: "Black"})
          } else {
            this.setState({ playerTurn: "White"})
          }
          let pieceInitial = ''
          if (this.state.currentPiece.includes("Knight")) {
            pieceInitial = pieceInitial.concat('N')
          } else if (this.state.currentPiece.includes("Bishop")) {
            pieceInitial = pieceInitial.concat('B')
          } else if (this.state.currentPiece.includes("Rook")) {
            pieceInitial = pieceInitial.concat('R')
          } else if (this.state.currentPiece.includes("Queen")) {
            pieceInitial = pieceInitial.concat('Q')
          } else if (this.state.currentPiece.includes("King")) {
            pieceInitial = pieceInitial.concat('K')
          }
          if (this.state.boardState[position] !== '')  {
            if (this.state.currentPiece.includes('Pawn')) {
              let columns = ["a", "b", "c", "d", "e", "f", "g", "h"]
              pieceInitial = columns[this.state.startingPosition % 8]
            }
            pieceInitial = pieceInitial.concat('x')
          }
          //checks if move is castling
          if (this.state.startingPosition === 4 && position === 2 && this.state.currentPiece === "blackKing") {
            this.setState({
            boardState: ["", "", "blackKing", "blackRook", "", ...this.state.boardState.slice(5)],
            moveRecord: [...this.state.moveRecord, "O-O-O"],
            currentPiece: "",
            startingPosition: -1,
            moveSelected: false,
            possibleMoves: new Array(64).fill(false),
          })} else if (this.state.startingPosition === 4 && position === 6 && this.state.currentPiece === "blackKing") {
            this.setState({
            boardState: [...this.state.boardState.slice(0,4), "", "blackRook", "blackKing", "", ...this.state.boardState.slice(8)],
            moveRecord: [...this.state.moveRecord, "O-O"],
            currentPiece: "",
            startingPosition: -1,
            moveSelected: false,
            possibleMoves: new Array(64).fill(false),
          })} else if (this.state.startingPosition === 60 && position === 58 && this.state.currentPiece === "whiteKing") {
            this.setState({
            boardState: [...this.state.boardState.slice(0,56), "", "", "whiteKing", "whiteRook", "", ...this.state.boardState.slice(61)],
            moveRecord: [...this.state.moveRecord, "O-O-O"],
            currentPiece: "",
            startingPosition: -1,
            moveSelected: false,
            possibleMoves: new Array(64).fill(false),
          })} else if (this.state.startingPosition === 60 && position === 62 && this.state.currentPiece === "whiteKing") {
            this.setState({
            boardState: [...this.state.boardState.slice(0,60), "", "whiteRook", "whiteKing", ""],
            moveRecord: [...this.state.moveRecord, "O-O"],
            currentPiece: "",
            startingPosition: -1,
            moveSelected: false,
            possibleMoves: new Array(64).fill(false),
          })} else if (this.state.startingPosition < position) {
            //regular moves
            this.setState({
            boardState: [...this.state.boardState.slice(0,this.state.startingPosition), "", ...this.state.boardState.slice(this.state.startingPosition + 1, position), this.state.currentPiece, ...this.state.boardState.slice(position + 1)],
            moveRecord: [...this.state.moveRecord, `${ pieceInitial }${ squareName }`],
            currentPiece: "",
            startingPosition: -1,
            moveSelected: false,
            possibleMoves: new Array(64).fill(false),
          })} else {
            this.setState({
            boardState: [...this.state.boardState.slice(0,position), this.state.currentPiece, ...this.state.boardState.slice(position + 1, this.state.startingPosition), "", ...this.state.boardState.slice(this.state.startingPosition + 1)],
            moveRecord: [...this.state.moveRecord, `${ pieceInitial }${ squareName }`],
            currentPiece: "",
            startingPosition: -1,
            moveSelected: false,
            possibleMoves: new Array(64).fill(false)
          })
          }

        }
    }
  }

  castlingConditions = () =>  {
    if (this.state.boardState[0] !== "blackRook" && this.state.blackARookHasMoved === false) {
      this.setState({ blackARookHasMoved: true })
    }
    if (this.state.boardState[4] !== "blackKing" && this.state.blackKingHasMoved === false) {
      this.setState({ blackKingHasMoved: true })
    }
    if (this.state.boardState[7] !== "blackRook" && this.state.blackHRookHasMoved === false) {
      this.setState({ blackHRookHasMoved: true })
    }
    if (this.state.boardState[56] !== "whiteRook" && this.state.whiteARookHasMoved === false) {
      this.setState({ whiteARookHasMoved: true })
    }
    if (this.state.boardState[60] !== "whiteKing" && this.state.whiteKingHasMoved === false) {
      this.setState({ whiteKingHasMoved: true })
    }
    if (this.state.boardState[63] !== "whiteRook" && this.state.whiteHRookHasMoved === false) {
      this.setState({ whiteHRookHasMoved: true })
    }
  }

  render(){
    let board = this.state.colorGrid.map((value,index)=> {
      return (
        <Square
          index = { index }
          value = { value }
          key = { index }
          colorGrid = { this.state.colorGrid }
          boardState = { this.state.boardState }
          possibleMoves = { this.state.possibleMoves }
          moveSelected = { this.state.moveSelected }
          startingPosition = { this.state.startingPosition }
          findSquares = { this.findSquares }
          clearMove = { this.clearMove }
          movePiece = { this.movePiece }
        />
      )
    })
    let moveList = this.state.moveRecord.map((value) => {
      return (
        <div className="column notationMoves">{ value }</div>
      )
    })
    return(
      <React.Fragment>
        { this.castlingConditions() }
        <div className="row">
          <div className="column left">
          <p></p>
          </div>
          <div className="column middle">
            <div className="row">
              <div className="headerColumn">
                <img id = "chessHeaderImage" src = { whitePawn } alt="White Pawn"/>
              </div>
              <div className="headerColumn">
                <img id = "chessHeaderImage" src = { blackKnight } alt="black Knight"/>
              </div>
              <div className="headerColumn">
                <img id = "chessHeaderImage" src = { whiteKing } alt="White King"/>
              </div>
              <div className="headerColumn">
                <h1>CHESS</h1>
              </div>
              <div className="headerColumn">
                <img id = "chessHeaderImage" src = { blackQueen } alt="Black Queen"/>
              </div>
              <div className="headerColumn">
                <img id = "chessHeaderImage" src = { whiteRook } alt="White Rook"/>
              </div>
              <div className="headerColumn">
                <img id = "chessHeaderImage" src = { blackBishop } alt="Black Bishop"/>
              </div>
            </div>
          </div>
          <div className="column right">
          <p></p>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <div id = "boardBackground">
              <div id = "boardHolder">
                <div id = "boardHolderTwo">
                  { board }
                </div>
              </div>
            </div>
          </div>
          <div className="column moves">
            <div id= "moveBackground">
              <h2>{`${this.state.playerTurn} to move.`}</h2>
              <div className="row">
                { moveList }
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
export default App
