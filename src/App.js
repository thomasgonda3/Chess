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
      whiteControlledSquares: [],
      blackControlledSquares: [],
      moveRecord: [],
      moveSelected: false,
      currentPiece: "",
      startingPosition: -1,
      playerTurn: "White",
      possibleEnPassantSquare: "",
      checked: false,
      gameOver: false,
      isTie: false,
      whiteKingHasMoved: false,
      whiteARookHasMoved: false,
      whiteHRookHasMoved: false,
      blackKingHasMoved: false,
      blackARookHasMoved: false,
      blackHRookHasMoved: false
    }
  }

  findSquares = (location) => {
    if (this.state.moveSelected === false && this.state.gameOver === false) {
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
            if (current > -1 && !this.state.boardState[current].includes("white") && !this.state.boardState[current].includes("black"))  {
              possibleMoves.push(current);
              if (Math.floor(location * .125) === 6 && !this.state.boardState[current - 8].includes("white") && !this.state.boardState[current - 8].includes("black"))  {
                possibleMoves.push(current - 8);
              }
            }

            for (let i = 0; i < 2; i++) {
              current = location + diagonalPieceMovements[i];
              let counter = mod;
              diagonalPieceMovements[i] % 2 === 0 ? counter-- : counter++;
              if (current < 64 && current > -1 && counter >= 0 && counter <= 8 && (this.state.boardState[current].includes("black") || current === this.state.possibleEnPassantSquare) && Math.floor((location - 8) * .125) === Math.floor(current * .125)) {
                possibleMoves.push(current);
              }
            }

            possibleMoves = possibleMoves.filter((value) => this.checkIllegalMove(value, location))

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
            if (current < 64 && !this.state.boardState[current].includes("white") && !this.state.boardState[current].includes("black"))  {
              possibleMoves.push(current);
              if (Math.floor(location * .125) === 1 && !this.state.boardState[current + 8].includes("white") && !this.state.boardState[current + 8].includes("black"))  {
                possibleMoves.push(current + 8);
              }
            }

            for (let i = 2; i < 4; i++) {
              current = location + diagonalPieceMovements[i];
              let counter = mod;
              diagonalPieceMovements[i] % 2 === 0 ? counter-- : counter++;
              if (current < 64 && current > -1 && counter >= 0 && counter <= 8 && (this.state.boardState[current].includes("white") || current === this.state.possibleEnPassantSquare) && Math.floor((location + 8) * .125) === Math.floor(current * .125)) {
                possibleMoves.push(current);
              }
            }

            possibleMoves = possibleMoves.filter((value) => this.checkIllegalMove(value, location))

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
              if (current < 64 && current > -1) {
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

            possibleMoves = possibleMoves.filter((value) => this.checkIllegalMove(value, location))

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
              if (current < 64 && current > -1) {
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

            possibleMoves = possibleMoves.filter((value) => this.checkIllegalMove(value, location))

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
              while (current < 64 && current > -1 && counter >= 0 && counter < 8) {
                if (this.state.boardState[current].includes("white"))  break;
                possibleMoves.push(current);
                if (this.state.boardState[current].includes("black"))  break;
                current += diagonalPieceMovements[movement];
                movement % 2 === 0 ? counter-- : counter++;
              }
            }

            possibleMoves = possibleMoves.filter((value) => this.checkIllegalMove(value, location))

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
              while (current < 64 && current > -1 && counter >= 0 && counter < 8) {
                if (this.state.boardState[current].includes("black"))  break;
                possibleMoves.push(current);
                if (this.state.boardState[current].includes("white"))  break;
                current += diagonalPieceMovements[movement];
                movement % 2 === 0 ? counter-- : counter++;
              }
            }

            possibleMoves = possibleMoves.filter((value) => this.checkIllegalMove(value, location))

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
              while (current < 64 && current > -1)  {
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

            possibleMoves = possibleMoves.filter((value) => this.checkIllegalMove(value, location))

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
              while (current < 64 && current > -1)  {
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

            possibleMoves = possibleMoves.filter((value) => this.checkIllegalMove(value, location))

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
              while (current < 64 && current > -1)  {
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
              while (current < 64 && current > -1 && counter >= 0 && counter < 8) {
                if (this.state.boardState[current].includes("white"))  break;
                possibleMoves.push(current);
                if (this.state.boardState[current].includes("black"))  break;
                current += diagonalPieceMovements[movement];
                movement % 2 === 0 ? counter-- : counter++;
              }
            }

            possibleMoves = possibleMoves.filter((value) => this.checkIllegalMove(value, location))

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
              while (current < 64 && current > -1)  {
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
              while (current < 64 && current > -1 && counter >= 0 && counter < 8) {
                if (this.state.boardState[current].includes("black"))  break;
                possibleMoves.push(current);
                if (this.state.boardState[current].includes("white"))  break;
                current += diagonalPieceMovements[movement];
                movement % 2 === 0 ? counter-- : counter++;
              }
            }

            possibleMoves = possibleMoves.filter((value) => this.checkIllegalMove(value, location))

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
              if (current < 64 && current > -1 && !this.state.boardState[current].includes("white"))  {
                if (!this.state.blackControlledSquares.includes(current)) {
                  possibleMoves.push(current);
                }
              }
            }

            for (let movement of horizontalPieceMovements)  {
              let current = location + movement;
              if (current < 64 && current > -1) {
                if (!this.state.boardState[current].includes("white") && Math.floor(current * .125) === Math.floor(location * .125))  {
                  if (!this.state.blackControlledSquares.includes(current)) {
                    possibleMoves.push(current);
                  }
                }
              }
            }

            for (let movement in diagonalPieceMovements) {
              let current = location + diagonalPieceMovements[movement];
              let counter = mod;
              movement % 2 === 0 ? counter-- : counter++;
              if (current < 64 && current > -1 && counter >= 0 && counter < 8 && !this.state.boardState[current].includes("white")) {
                if (!this.state.blackControlledSquares.includes(current)) {
                  possibleMoves.push(current);
                }
              }
            }

            //castling
            if (this.state.whiteKingHasMoved === false) {
              if (this.state.whiteHRookHasMoved === false)  {
                if (this.state.boardState[60] === "whiteKing" && this.state.boardState[61] === "" && this.state.boardState[62] === "" && this.state.boardState[63] === "whiteRook" && (!this.state.blackControlledSquares.includes(60) && !this.state.blackControlledSquares.includes(61) && !this.state.blackControlledSquares.includes(62))) {
                  possibleMoves.push(62)
                }
              }
              if (this.state.whiteARookHasMoved === false)  {
                if (this.state.boardState[60] === "whiteKing" && this.state.boardState[59] === "" && this.state.boardState[58] === "" && this.state.boardState[57] === "" && this.state.boardState[56] === "whiteRook" && (!this.state.blackControlledSquares.includes(60) && !this.state.blackControlledSquares.includes(59) && !this.state.blackControlledSquares.includes(58))) {
                  possibleMoves.push(58)
                }
              }
            }

            possibleMoves = possibleMoves.filter((value) => this.checkIllegalMove(value, location))

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
              if (current < 64 && current > -1 && !this.state.boardState[current].includes("black"))  {
                if (!this.state.whiteControlledSquares.includes(current)) {
                  possibleMoves.push(current);
                }
              }
            }

            for (let movement of horizontalPieceMovements)  {
              let current = location + movement;
              if (current > -1 && current < 64) {
                if (!this.state.boardState[current].includes("black") && Math.floor(current * .125) === Math.floor(location * .125))  {
                  if (!this.state.whiteControlledSquares.includes(current)) {
                    possibleMoves.push(current);
                  }
                }
              }
            }

            for (let movement in diagonalPieceMovements) {
              let current = location + diagonalPieceMovements[movement];
              let counter = mod;
              movement % 2 === 0 ? counter-- : counter++;
              if (current < 64 && current > -1 && counter >= 0 && counter < 8 && !this.state.boardState[current].includes("black")) {
                if (!this.state.whiteControlledSquares.includes(current)) {
                  possibleMoves.push(current);
                }
              }
            }

            //castling
            if (this.state.blackKingHasMoved === false) {
              if (this.state.blackHRookHasMoved === false)  {
                if (this.state.boardState[4] === "blackKing" && this.state.boardState[5] === "" && this.state.boardState[6] === "" && this.state.boardState[7] === "blackRook" && (!this.state.whiteControlledSquares.includes(4) && !this.state.whiteControlledSquares.includes(5) && !this.state.whiteControlledSquares.includes(6))) {
                  possibleMoves.push(6)
                }
              }
              if (this.state.blackARookHasMoved === false)  {
                if (this.state.boardState[4] === "blackKing" && this.state.boardState[3] === "" && this.state.boardState[2] === "" && this.state.boardState[1] === "" && this.state.boardState[0] === "blackRook" && (!this.state.whiteControlledSquares.includes(4) && !this.state.whiteControlledSquares.includes(3) && !this.state.whiteControlledSquares.includes(2))) {
                  possibleMoves.push(2)
                }
              }
            }

            possibleMoves = possibleMoves.filter((value) => this.checkIllegalMove(value, location))

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

          //gives a row or column of the piece that is being moved if there is more than one of the same piece that can move to that square
          if (!this.state.currentPiece.includes("Pawn") && !this.state.currentPiece.includes("King")) {
            let array = this.checkSquaresControlled()
            let whiteControlledSquares = array[0]
            let blackControlledSquares = array[1]
            let destinationIndex = (squareName.charAt(1) - 1)
            if (destinationIndex < 3.5)  {
              destinationIndex = destinationIndex + (3.5 - destinationIndex) * 2
            } else {
              destinationIndex = destinationIndex - (destinationIndex - 3.5) * 2
            }
            destinationIndex *= 8
            if (squareName.charAt(0) === "b") {
              destinationIndex++
            } else if (squareName.charAt(0) === "c") {
              destinationIndex += 2
            } else if (squareName.charAt(0) === "d") {
              destinationIndex += 3
            } else if (squareName.charAt(0) === "e") {
              destinationIndex += 4
            } else if (squareName.charAt(0) === "f") {
              destinationIndex += 5
            } else if (squareName.charAt(0) === "g") {
              destinationIndex += 6
            } else if (squareName.charAt(0) === "h") {
              destinationIndex += 7
            }
            for (let location = 0; location < 64; location++) {
              if (this.state.startingPosition === location)  continue;
              if (this.state.currentPiece === this.state.boardState[location]) {
                let otherSamePieceMovements = this.checkmateHelper(location, whiteControlledSquares, blackControlledSquares)
                if (otherSamePieceMovements.includes(destinationIndex)) {
                  let columns = ["a", "b", "c", "d", "e", "f", "g", "h"]
                  let rowName = Math.floor(this.state.startingPosition / 8) + 1
                  let half = 4.5 - rowName
                  rowName = rowName + half * 2
                  let name = `${ columns[this.state.startingPosition % 8] }${ rowName }`
                  if (this.state.startingPosition % 8 === destinationIndex % 8) {
                    pieceInitial = pieceInitial.concat(name.charAt(1))
                  } else {
                    pieceInitial = pieceInitial.concat(name.charAt(0))
                  }
                }
              }
            }
          }

          //adds an x to notation if a capture is made.
          if (this.state.boardState[position] !== '' || (this.state.possibleEnPassantSquare === position && this.state.currentPiece.includes("Pawn")))  {
            if (this.state.currentPiece.includes('Pawn')) {
              let columns = ["a", "b", "c", "d", "e", "f", "g", "h"]
              pieceInitial = columns[this.state.startingPosition % 8]
            }
            pieceInitial = pieceInitial.concat('x')
          }

          //sets en passant square for next turn.
            if (this.state.currentPiece.includes('Pawn') && (this.state.startingPosition - 16 === position || this.state.startingPosition + 16 === position)){
              if (this.state.currentPiece.includes('white'))  {
                this.setState({ possibleEnPassantSquare: position + 8})
              } else {
                this.setState({ possibleEnPassantSquare: position - 8})
              }
            } else {
              this.setState({ possibleEnPassantSquare: ""})
            }
          //checks if move is castling
          if (this.state.startingPosition === 4 && position === 2 && this.state.currentPiece === "blackKing") {
            this.setState({
            boardState: ["", "", "blackKing", "blackRook", "", ...this.state.boardState.slice(5)],
            moveRecord: [...this.state.moveRecord, `O-O-O`],
            currentPiece: "",
            startingPosition: -1,
            moveSelected: false,
            possibleMoves: new Array(64).fill(false),
            checked: false
          })} else if (this.state.startingPosition === 4 && position === 6 && this.state.currentPiece === "blackKing") {
            this.setState({
            boardState: [...this.state.boardState.slice(0,4), "", "blackRook", "blackKing", "", ...this.state.boardState.slice(8)],
            moveRecord: [...this.state.moveRecord, `O-O`],
            currentPiece: "",
            startingPosition: -1,
            moveSelected: false,
            possibleMoves: new Array(64).fill(false),
            checked: false
          })} else if (this.state.startingPosition === 60 && position === 58 && this.state.currentPiece === "whiteKing") {
            this.setState({
            boardState: [...this.state.boardState.slice(0,56), "", "", "whiteKing", "whiteRook", "", ...this.state.boardState.slice(61)],
            moveRecord: [...this.state.moveRecord, `O-O-O`],
            currentPiece: "",
            startingPosition: -1,
            moveSelected: false,
            possibleMoves: new Array(64).fill(false),
            checked: false
          })} else if (this.state.startingPosition === 60 && position === 62 && this.state.currentPiece === "whiteKing") {
            this.setState({
            boardState: [...this.state.boardState.slice(0,60), "", "whiteRook", "whiteKing", ""],
            moveRecord: [...this.state.moveRecord, `O-O`],
            currentPiece: "",
            startingPosition: -1,
            moveSelected: false,
            possibleMoves: new Array(64).fill(false),
            checked: false
            //check for en passant captures
          })} else if ((this.state.currentPiece === "whitePawn") && this.state.possibleEnPassantSquare === position && this.state.startingPosition - 7 === position) {
            //white capture to the right
            this.setState({
            boardState: [...this.state.boardState.slice(0,position), "whitePawn", ...this.state.boardState.slice(position + 1, position + 7), "", "", ...this.state.boardState.slice(position + 9)],
            moveRecord: [...this.state.moveRecord, `${ pieceInitial }${ squareName }`],
            currentPiece: "",
            startingPosition: -1,
            moveSelected: false,
            possibleMoves: new Array(64).fill(false),
            checked: false
          })} else if ((this.state.currentPiece === "whitePawn") && this.state.possibleEnPassantSquare === position && this.state.startingPosition - 9 === position) {
            //white capture to the left
            this.setState({
            boardState: [...this.state.boardState.slice(0,position), "whitePawn", ...this.state.boardState.slice(position + 1, position + 8), "", "", ...this.state.boardState.slice(position + 10)],
            moveRecord: [...this.state.moveRecord, `${ pieceInitial }${ squareName }`],
            currentPiece: "",
            startingPosition: -1,
            moveSelected: false,
            possibleMoves: new Array(64).fill(false),
            checked: false
          })} else if ((this.state.currentPiece === "blackPawn") && this.state.possibleEnPassantSquare === position && this.state.startingPosition + 7 === position) {
            //black capture to the left
            this.setState({
            boardState: [...this.state.boardState.slice(0,position - 8), "", "", ...this.state.boardState.slice(position - 6, position), "blackPawn", ...this.state.boardState.slice(position + 1)],
            moveRecord: [...this.state.moveRecord, `${ pieceInitial }${ squareName }`],
            currentPiece: "",
            startingPosition: -1,
            moveSelected: false,
            possibleMoves: new Array(64).fill(false),
            checked: false
          })} else if ((this.state.currentPiece === "blackPawn") && this.state.possibleEnPassantSquare === position && this.state.startingPosition + 9 === position) {
            //black capture to the right
            this.setState({
            boardState: [...this.state.boardState.slice(0,position - 9), "", "", ...this.state.boardState.slice(position - 7, position), "blackPawn", ...this.state.boardState.slice(position + 1)],
            moveRecord: [...this.state.moveRecord, `${ pieceInitial }${ squareName }`],
            currentPiece: "",
            startingPosition: -1,
            moveSelected: false,
            possibleMoves: new Array(64).fill(false),
            checked: false
          })} else if (this.state.startingPosition < position) {
            //regular moves
            this.setState({
            boardState: [...this.state.boardState.slice(0,this.state.startingPosition), "", ...this.state.boardState.slice(this.state.startingPosition + 1, position), this.state.currentPiece, ...this.state.boardState.slice(position + 1)],
            moveRecord: [...this.state.moveRecord, `${ pieceInitial }${ squareName }`],
            currentPiece: "",
            startingPosition: -1,
            moveSelected: false,
            possibleMoves: new Array(64).fill(false),
            checked: false
          })} else {
            this.setState({
            boardState: [...this.state.boardState.slice(0,position), this.state.currentPiece, ...this.state.boardState.slice(position + 1, this.state.startingPosition), "", ...this.state.boardState.slice(this.state.startingPosition + 1)],
            moveRecord: [...this.state.moveRecord, `${ pieceInitial }${ squareName }`],
            currentPiece: "",
            startingPosition: -1,
            moveSelected: false,
            possibleMoves: new Array(64).fill(false),
            checked: false
          })
          }
        }
    }
  }

  castlingConditions = () => {
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

  checkSquaresControlled = () => {
    let possibleWhiteMoves = [];
    let possibleBlackMoves = [];
    for (let location = 0; location < 64; location++) {
      let mod = location % 8;
      let current = 0;
      let verticalPieceMovements = [-8, 8];
      let horizontalPieceMovements = [-1, 1];
      let diagonalPieceMovements = [-9, -7, 7, 9];
      let knightPieceMovements = [-17, -15, -10, -6, 6, 10, 15, 17]
      switch (this.state.boardState[location]) {
        case "whitePawn":
            for (let i = 0; i < 2; i++) {
              current = location + diagonalPieceMovements[i];
              let counter = mod;
              diagonalPieceMovements[i] % 2 === 0 ? counter-- : counter++;
              if (current < 64 && current > 0 && counter >= 0 && counter <= 8 && Math.floor((location - 8) * .125) === Math.floor(current * .125)) {
                possibleWhiteMoves.push(current);
              }
            }
        break;
        case "blackPawn":
            for (let i = 2; i < 4; i++) {
              current = location + diagonalPieceMovements[i];
              let counter = mod;
              diagonalPieceMovements[i] % 2 === 0 ? counter-- : counter++;
              if (current < 64 && current > 0 && counter >= 0 && counter <= 8 && Math.floor((location + 8) * .125) === Math.floor(current * .125)) {
                possibleBlackMoves.push(current);
              }
            }
        break;
        case "whiteKnight":
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
                possibleWhiteMoves.push(current);
              }
            }
        break;
        case "blackKnight":
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
                possibleBlackMoves.push(current);
              }
            }
        break;
        case "whiteBishop":
            for (let movement in diagonalPieceMovements) {
              let current = location + diagonalPieceMovements[movement];
              let counter = mod;
              movement % 2 === 0 ? counter-- : counter++;
              while (current < 64 && current > 0 && counter >= 0 && counter < 8) {
                if (this.state.boardState[current].includes("white"))  break;
                possibleWhiteMoves.push(current);
                if (this.state.boardState[current].includes("black"))  break;
                current += diagonalPieceMovements[movement];
                movement % 2 === 0 ? counter-- : counter++;
              }
            }
        break;

        case "blackBishop":
            for (let movement in diagonalPieceMovements) {
              let current = location + diagonalPieceMovements[movement];
              let counter = mod;
              movement % 2 === 0 ? counter-- : counter++;
              while (current < 64 && current > 0 && counter >= 0 && counter < 8) {
                if (this.state.boardState[current].includes("black"))  break;
                possibleBlackMoves.push(current);
                if (this.state.boardState[current].includes("white"))  break;
                current += diagonalPieceMovements[movement];
                movement % 2 === 0 ? counter-- : counter++;
              }
            }
        break;

        case "whiteRook":
            for (let movement in verticalPieceMovements) {
              let current = location + verticalPieceMovements[movement];
              while (current < 64 && current > 0)  {
                if (this.state.boardState[current].includes("white"))  break;
                possibleWhiteMoves.push(current);
                if (this.state.boardState[current].includes("black"))  break;
                current += verticalPieceMovements[movement];;
              }
            }

            for (let movement of horizontalPieceMovements)  {
              let current = location + movement;
              if (current < 0 || current > 63) continue;
              if (!this.state.boardState[current].includes("white"))  {
                while (Math.floor(current * .125) === Math.floor(location * .125))  {
                  possibleWhiteMoves.push(current);
                  current += movement;
                  if (current > 63 || current < 0)  break;
                  if (this.state.boardState[current].includes("white"))  break;
                  if (this.state.boardState[current - movement].includes("black"))  break;
                }
              }
            }
        break;

        case "blackRook":
            for (let movement in verticalPieceMovements) {
              let current = location + verticalPieceMovements[movement];
              while (current < 64 && current > 0)  {
                if (this.state.boardState[current].includes("black"))  break;
                possibleBlackMoves.push(current);
                if (this.state.boardState[current].includes("white"))  break;
                current += verticalPieceMovements[movement];;
              }
            }

            for (let movement of horizontalPieceMovements)  {
              let current = location + movement;
              if (current < 0 || current > 63) continue;
              if (!this.state.boardState[current].includes("black"))  {
                while (Math.floor(current * .125) === Math.floor(location * .125))  {
                  possibleBlackMoves.push(current);
                  current += movement;
                  if (current > 63 || current < 0)  break;
                  if (this.state.boardState[current].includes("black"))  break;
                  if (this.state.boardState[current - movement].includes("white"))  break;
                }
              }
            }
          break;
        case "whiteQueen":
            for (let movement in verticalPieceMovements) {
              let current = location + verticalPieceMovements[movement];
              while (current < 64 && current > 0)  {
                if (this.state.boardState[current].includes("white"))  break;
                possibleWhiteMoves.push(current);
                if (this.state.boardState[current].includes("black"))  break;
                current += verticalPieceMovements[movement];;
              }
            }

            for (let movement of horizontalPieceMovements)  {
              let current = location + movement;
              if (!this.state.boardState[current].includes("white"))  {
                while (Math.floor(current * .125) === Math.floor(location * .125))  {
                  possibleWhiteMoves.push(current);
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
                possibleWhiteMoves.push(current);
                if (this.state.boardState[current].includes("black"))  break;
                current += diagonalPieceMovements[movement];
                movement % 2 === 0 ? counter-- : counter++;
              }
            }
            console.log(possibleWhiteMoves, "possible white moves after white queen")
        break;
        case "blackQueen":
            for (let movement in verticalPieceMovements) {
              let current = location + verticalPieceMovements[movement];
              while (current < 64 && current > 0)  {
                if (this.state.boardState[current].includes("black"))  break;
                possibleBlackMoves.push(current);
                if (this.state.boardState[current].includes("white"))  break;
                current += verticalPieceMovements[movement];;
              }
            }

            for (let movement of horizontalPieceMovements)  {
              let current = location + movement;
              if (!this.state.boardState[current].includes("black"))  {
                while (Math.floor(current * .125) === Math.floor(location * .125))  {
                  possibleBlackMoves.push(current);
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
                possibleBlackMoves.push(current);
                if (this.state.boardState[current].includes("white"))  break;
                current += diagonalPieceMovements[movement];
                movement % 2 === 0 ? counter-- : counter++;
              }
            }
        break;
        case "whiteKing":
            for (let movement in verticalPieceMovements) {
              let current = location + verticalPieceMovements[movement];
              if (current < 64 && current > 0 && !this.state.boardState[current].includes("white"))  {
                possibleWhiteMoves.push(current);
              }
            }

            for (let movement of horizontalPieceMovements)  {
              let current = location + movement;
              if (current > -1 && current < 64) {
                if (!this.state.boardState[current].includes("white") && Math.floor(current * .125) === Math.floor(location * .125))  {
                    possibleWhiteMoves.push(current);
                }
              }
            }

            for (let movement in diagonalPieceMovements) {
              let current = location + diagonalPieceMovements[movement];
              let counter = mod;
              movement % 2 === 0 ? counter-- : counter++;
              if (current < 64 && current > 0 && counter >= 0 && counter < 8 && !this.state.boardState[current].includes("white")) {
                possibleWhiteMoves.push(current);
              }
            }
        break;
        case "blackKing":
            for (let movement in verticalPieceMovements) {
              let current = location + verticalPieceMovements[movement];
              if (current < 64 && current > 0 && !this.state.boardState[current].includes("black"))  {
                possibleBlackMoves.push(current);
              }
            }

            for (let movement of horizontalPieceMovements)  {
              let current = location + movement;
              if (current > -1 && current < 64) {
                if (!this.state.boardState[current].includes("black") && Math.floor(current * .125) === Math.floor(location * .125))  {
                    possibleBlackMoves.push(current);
                }
              }
            }

            for (let movement in diagonalPieceMovements) {
              let current = location + diagonalPieceMovements[movement];
              let counter = mod;
              movement % 2 === 0 ? counter-- : counter++;
              if (current < 64 && current > 0 && counter >= 0 && counter < 8 && !this.state.boardState[current].includes("black")) {
                possibleBlackMoves.push(current);
              }
            }
        break;
        default:
      }
    }
    possibleWhiteMoves = [...new Set(possibleWhiteMoves)]
    possibleBlackMoves = [...new Set(possibleBlackMoves)]

     this.setState({
       whiteControlledSquares: [...possibleWhiteMoves],
       blackControlledSquares: [...possibleBlackMoves]
     })

     return [possibleWhiteMoves, possibleBlackMoves]
     // console.log(possibleWhiteMoves)
     // console.log(possibleBlackMoves)
  }

  checkIllegalMove = (newSquare, location) => {
      let boardDuplicate = []
      //how the board will look after move.
      if (this.state.boardState[location] === "whiteKing") {
        if (location === newSquare + 2) {
          boardDuplicate = [...this.state.boardState.slice(0,56), "", "", "whiteKing", "whiteRook", "", ...this.state.boardState.slice(61)]
        } else if (location + 2 === newSquare) {
          boardDuplicate = [...this.state.boardState.slice(0,60), "", "whiteRook", "whiteKing", ""]
        } else if (location > newSquare) {
          boardDuplicate = [...this.state.boardState.slice(0,newSquare), "whiteKing", ...this.state.boardState.slice(newSquare + 1, location), "", ...this.state.boardState.slice(location + 1)]
        } else {
          boardDuplicate = [...this.state.boardState.slice(0,location), "", ...this.state.boardState.slice(location + 1, newSquare), "whiteKing", ...this.state.boardState.slice(newSquare + 1)]
        }
      } else if (this.state.boardState[location] === "blackKing") {
        if (location === newSquare + 2) {
          boardDuplicate = ["", "", "blackKing", "blackRook", "", ...this.state.boardState.slice(5)]
        } else if (location + 2 === newSquare)  {
          boardDuplicate = [...this.state.boardState.slice(0,4), "", "blackRook", "blackKing", "", ...this.state.boardState.slice(8)]
        } else if (location > newSquare) {
          boardDuplicate = [...this.state.boardState.slice(0,newSquare), "blackKing", ...this.state.boardState.slice(newSquare + 1, location), "", ...this.state.boardState.slice(location + 1)]
        } else {
          boardDuplicate = [...this.state.boardState.slice(0,location), "", ...this.state.boardState.slice(location + 1, newSquare), "blackKing", ...this.state.boardState.slice(newSquare + 1)]
        }
      } else if (this.state.playerTurn === "White") {
        if (location > newSquare) {
        boardDuplicate = [...this.state.boardState.slice(0,newSquare), "whitePawn", ...this.state.boardState.slice(newSquare + 1, location), "", ...this.state.boardState.slice(location + 1)]
        } else {
          boardDuplicate = [...this.state.boardState.slice(0,location), "", ...this.state.boardState.slice(location + 1, newSquare), "whitePawn", ...this.state.boardState.slice(newSquare + 1)]
        }
      } else {
        if (location > newSquare) {
        boardDuplicate = [...this.state.boardState.slice(0,newSquare), "blackPawn", ...this.state.boardState.slice(newSquare + 1, location), "", ...this.state.boardState.slice(location + 1)]
        } else {
          boardDuplicate = [...this.state.boardState.slice(0,location), "", ...this.state.boardState.slice(location + 1, newSquare), "blackPawn", ...this.state.boardState.slice(newSquare + 1)]
        }
      }

      let possibleWhiteMoves = [];
      let possibleBlackMoves = [];
      let whiteKingPosition = -1;
      let blackKingPosition = -1;
      for (let location = 0; location < 64; location++) {
        let mod = location % 8;
        let current = 0;
        let verticalPieceMovements = [-8, 8];
        let horizontalPieceMovements = [-1, 1];
        let diagonalPieceMovements = [-9, -7, 7, 9];
        let knightPieceMovements = [-17, -15, -10, -6, 6, 10, 15, 17]
        if (boardDuplicate[location] === "whiteKing") {
          whiteKingPosition = location;
        }
        if (boardDuplicate[location] === "blackKing") {
          blackKingPosition = location;
        }
        switch (boardDuplicate[location]) {
          case "whitePawn":
              for (let i = 0; i < 2; i++) {
                current = location + diagonalPieceMovements[i];
                let counter = mod;
                diagonalPieceMovements[i] % 2 === 0 ? counter-- : counter++;
                if (current < 64 && current > 0 && counter >= 0 && counter <= 8 && Math.floor((location - 8) * .125) === Math.floor(current * .125)) {
                  possibleWhiteMoves.push(current);
                }
              }
          break;
          case "blackPawn":
              for (let i = 2; i < 4; i++) {
                current = location + diagonalPieceMovements[i];
                let counter = mod;
                diagonalPieceMovements[i] % 2 === 0 ? counter-- : counter++;
                if (current < 64 && current > 0 && counter >= 0 && counter <= 8 && Math.floor((location + 8) * .125) === Math.floor(current * .125)) {
                  possibleBlackMoves.push(current);
                }
              }
          break;
          case "whiteKnight":
              for (let movement of knightPieceMovements) {
                current = movement + location
                if (current < 64 && current > 0) {
                  let spacesAway = 0;
                  if (movement === -15 || movement === 17) spacesAway = 1;
                  if (movement === -17 || movement === 15) spacesAway = -1;
                  if (movement === -6 || movement === 10) spacesAway = 2;
                  if (movement === -10 || movement === 6) spacesAway = -2;
                  if (Math.floor(location * .125) !== Math.floor((location + spacesAway) * .125)) continue;
                  if (boardDuplicate[current].includes("white")) continue;
                  possibleWhiteMoves.push(current);
                }
              }
          break;
          case "blackKnight":
              for (let movement of knightPieceMovements) {
                current = movement + location
                if (current < 64 && current > 0) {
                  let spacesAway = 0;
                  if (movement === -15 || movement === 17) spacesAway = 1;
                  if (movement === -17 || movement === 15) spacesAway = -1;
                  if (movement === -6 || movement === 10) spacesAway = 2;
                  if (movement === -10 || movement === 6) spacesAway = -2;
                  if (Math.floor(location * .125) !== Math.floor((location + spacesAway) * .125)) continue;
                  if (boardDuplicate[current].includes("black")) continue;
                  possibleBlackMoves.push(current);
                }
              }
          break;
          case "whiteBishop":
              for (let movement in diagonalPieceMovements) {
                let current = location + diagonalPieceMovements[movement];
                let counter = mod;
                movement % 2 === 0 ? counter-- : counter++;
                while (current < 64 && current > 0 && counter >= 0 && counter < 8) {
                  if (boardDuplicate[current].includes("white"))  break;
                  possibleWhiteMoves.push(current);
                  if (boardDuplicate[current].includes("black"))  break;
                  current += diagonalPieceMovements[movement];
                  movement % 2 === 0 ? counter-- : counter++;
                }
              }
          break;

          case "blackBishop":
              for (let movement in diagonalPieceMovements) {
                let current = location + diagonalPieceMovements[movement];
                let counter = mod;
                movement % 2 === 0 ? counter-- : counter++;
                while (current < 64 && current > 0 && counter >= 0 && counter < 8) {
                  if (boardDuplicate[current].includes("black"))  break;
                  possibleBlackMoves.push(current);
                  if (boardDuplicate[current].includes("white"))  break;
                  current += diagonalPieceMovements[movement];
                  movement % 2 === 0 ? counter-- : counter++;
                }
              }
          break;

          case "whiteRook":
              for (let movement in verticalPieceMovements) {
                let current = location + verticalPieceMovements[movement];
                while (current < 64 && current > 0)  {
                  if (boardDuplicate[current].includes("white"))  break;
                  possibleWhiteMoves.push(current);
                  if (boardDuplicate[current].includes("black"))  break;
                  current += verticalPieceMovements[movement];;
                }
              }

              for (let movement of horizontalPieceMovements)  {
                let current = location + movement;
                if (current < 0 || current > 63) continue;
                if (!boardDuplicate[current].includes("white"))  {
                  while (Math.floor(current * .125) === Math.floor(location * .125))  {
                    possibleWhiteMoves.push(current);
                    current += movement;
                    if (current > 63 || current < 0)  break;
                    if (boardDuplicate[current].includes("white"))  break;
                    if (boardDuplicate[current - movement].includes("black"))  break;
                  }
                }
              }
          break;

          case "blackRook":
              for (let movement in verticalPieceMovements) {
                let current = location + verticalPieceMovements[movement];
                while (current < 64 && current > 0)  {
                  if (boardDuplicate[current].includes("black"))  break;
                  possibleBlackMoves.push(current);
                  if (boardDuplicate[current].includes("white"))  break;
                  current += verticalPieceMovements[movement];;
                }
              }

              for (let movement of horizontalPieceMovements)  {
                let current = location + movement;
                if (current < 0 || current > 63) continue;
                if (!boardDuplicate[current].includes("black"))  {
                  while (Math.floor(current * .125) === Math.floor(location * .125))  {
                    possibleBlackMoves.push(current);
                    current += movement;
                    if (current > 63 || current < 0)  break;
                    if (boardDuplicate[current].includes("black"))  break;
                    if (boardDuplicate[current - movement].includes("white"))  break;
                  }
                }
              }
            break;
          case "whiteQueen":
              for (let movement in verticalPieceMovements) {
                let current = location + verticalPieceMovements[movement];
                while (current < 64 && current > 0)  {
                  if (boardDuplicate[current].includes("white"))  break;
                  possibleWhiteMoves.push(current);
                  if (boardDuplicate[current].includes("black"))  break;
                  current += verticalPieceMovements[movement];;
                }
              }

              for (let movement of horizontalPieceMovements)  {
                let current = location + movement;
                if (!boardDuplicate[current].includes("white"))  {
                  while (Math.floor(current * .125) === Math.floor(location * .125))  {
                    possibleWhiteMoves.push(current);
                    current += movement;
                    if (current > 63 || current < 0)  break;
                    if (boardDuplicate[current].includes("white"))  break;
                    if (boardDuplicate[current - movement].includes("black"))  break;
                  }
                }
              }

              for (let movement in diagonalPieceMovements) {
                let current = location + diagonalPieceMovements[movement];
                let counter = mod;
                movement % 2 === 0 ? counter-- : counter++;
                while (current < 64 && current > 0 && counter >= 0 && counter < 8) {
                  if (boardDuplicate[current].includes("white"))  break;
                  possibleWhiteMoves.push(current);
                  if (boardDuplicate[current].includes("black"))  break;
                  current += diagonalPieceMovements[movement];
                  movement % 2 === 0 ? counter-- : counter++;
                }
              }
          break;
          case "blackQueen":
              for (let movement in verticalPieceMovements) {
                let current = location + verticalPieceMovements[movement];
                while (current < 64 && current > 0)  {
                  if (boardDuplicate[current].includes("black"))  break;
                  possibleBlackMoves.push(current);
                  if (boardDuplicate[current].includes("white"))  break;
                  current += verticalPieceMovements[movement];;
                }
              }

              for (let movement of horizontalPieceMovements)  {
                let current = location + movement;
                if (!boardDuplicate[current].includes("black"))  {
                  while (Math.floor(current * .125) === Math.floor(location * .125))  {
                    possibleBlackMoves.push(current);
                    current += movement;
                    if (current > 63 || current < 0)  break;
                    if (boardDuplicate[current].includes("black"))  break;
                    if (boardDuplicate[current - movement].includes("white"))  break;
                  }
                }
              }

              for (let movement in diagonalPieceMovements) {
                let current = location + diagonalPieceMovements[movement];
                let counter = mod;
                movement % 2 === 0 ? counter-- : counter++;
                while (current < 64 && current > 0 && counter >= 0 && counter < 8) {
                  if (boardDuplicate[current].includes("black"))  break;
                  possibleBlackMoves.push(current);
                  if (boardDuplicate[current].includes("white"))  break;
                  current += diagonalPieceMovements[movement];
                  movement % 2 === 0 ? counter-- : counter++;
                }
              }
          break;
          case "whiteKing":
              for (let movement in verticalPieceMovements) {
                let current = location + verticalPieceMovements[movement];
                if (current < 64 && current > -1 && !boardDuplicate[current].includes("white"))  {
                  possibleWhiteMoves.push(current);
                }
              }

              for (let movement of horizontalPieceMovements)  {
                let current = location + movement;
                if (current < 64 && current > -1) {
                  if (!boardDuplicate[current].includes("white") && Math.floor(current * .125) === Math.floor(location * .125))  {
                      possibleWhiteMoves.push(current);
                  }
                }
              }

              for (let movement in diagonalPieceMovements) {
                let current = location + diagonalPieceMovements[movement];
                let counter = mod;
                movement % 2 === 0 ? counter-- : counter++;
                if (current < 64 && current > 0 && counter >= 0 && counter < 8 && !boardDuplicate[current].includes("white")) {
                  possibleWhiteMoves.push(current);
                }
              }
          break;
          case "blackKing":
              for (let movement in verticalPieceMovements) {
                let current = location + verticalPieceMovements[movement];
                if (current < 64 && current > -1 && !boardDuplicate[current].includes("black"))  {
                  possibleBlackMoves.push(current);
                }
              }

              for (let movement of horizontalPieceMovements)  {
                let current = location + movement;
                if (current < 64 && current > -1) {
                  if (!boardDuplicate[current].includes("black") && Math.floor(current * .125) === Math.floor(location * .125))  {
                      possibleBlackMoves.push(current);
                  }
                }
              }

              for (let movement in diagonalPieceMovements) {
                let current = location + diagonalPieceMovements[movement];
                let counter = mod;
                movement % 2 === 0 ? counter-- : counter++;
                if (current < 64 && current > 0 && counter >= 0 && counter < 8 && !boardDuplicate[current].includes("black")) {
                  possibleBlackMoves.push(current);
                }
              }
          break;
          default:
        }
      }
      possibleWhiteMoves = [...new Set(possibleWhiteMoves)]
      possibleBlackMoves = [...new Set(possibleBlackMoves)]

      if (this.state.playerTurn === "White" && possibleBlackMoves.includes(whiteKingPosition)) return false;
      if (this.state.playerTurn === "Black" && possibleWhiteMoves.includes(blackKingPosition)) return false;
      return true;
  }

  checkmateHelper = (location, whiteControlledSquares, blackControlledSquares) => {
      let mod = location % 8;
      let current = 0;
      let possibleMoves = [];
      let verticalPieceMovements = [-8, 8];
      let horizontalPieceMovements = [-1, 1];
      let diagonalPieceMovements = [-9, -7, 7, 9];
      let knightPieceMovements = [-17, -15, -10, -6, 6, 10, 15, 17]
      switch (this.state.boardState[location]) {
        case "whitePawn":
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
              if (current < 64 && current > 0 && counter >= 0 && counter <= 8 && (this.state.boardState[current].includes("black") || current === this.state.possibleEnPassantSquare) && Math.floor((location - 8) * .125) === Math.floor(current * .125)) {
                possibleMoves.push(current);
              }
            }

            possibleMoves =  possibleMoves.filter((value) => this.checkIllegalMove(value, location))
        break;
        case "blackPawn":
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
              if (current < 64 && current > 0 && counter >= 0 && counter <= 8 && (this.state.boardState[current].includes("white") || current === this.state.possibleEnPassantSquare) && Math.floor((location + 8) * .125) === Math.floor(current * .125)) {
                possibleMoves.push(current);
              }
            }

            possibleMoves =  possibleMoves.filter((value) => this.checkIllegalMove(value, location))
        break;
        case "whiteKnight":
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

            possibleMoves =  possibleMoves.filter((value) => this.checkIllegalMove(value, location))
        break;
        case "blackKnight":
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

            possibleMoves =  possibleMoves.filter((value) => this.checkIllegalMove(value, location))
        break;
        case "whiteBishop":
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

            possibleMoves =  possibleMoves.filter((value) => this.checkIllegalMove(value, location))
        break;

        case "blackBishop":
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

            possibleMoves =  possibleMoves.filter((value) => this.checkIllegalMove(value, location))
        break;

        case "whiteRook":
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

            possibleMoves =  possibleMoves.filter((value) => this.checkIllegalMove(value, location))
        break;

        case "blackRook":
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

            possibleMoves =  possibleMoves.filter((value) => this.checkIllegalMove(value, location))
          break;
        case "whiteQueen":
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

            possibleMoves =  possibleMoves.filter((value) => this.checkIllegalMove(value, location))
        break;
        case "blackQueen":
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

            possibleMoves =  possibleMoves.filter((value) => this.checkIllegalMove(value, location))
        break;
        case "whiteKing":
            for (let movement in verticalPieceMovements) {
              let current = location + verticalPieceMovements[movement];
              if (current < 64 && current > -1 && !this.state.boardState[current].includes("white"))  {
                if (!blackControlledSquares.includes(current)) {
                  possibleMoves.push(current);
                }
              }
            }

            for (let movement of horizontalPieceMovements)  {
              let current = location + movement;
              if (current < 64 && current > -1) {
                if (!this.state.boardState[current].includes("white") && Math.floor(current * .125) === Math.floor(location * .125))  {
                  if (!blackControlledSquares.includes(current)) {
                    possibleMoves.push(current);
                  }
                }
              }
            }

            for (let movement in diagonalPieceMovements) {
              let current = location + diagonalPieceMovements[movement];
              let counter = mod;
              movement % 2 === 0 ? counter-- : counter++;
              if (current < 64 && current > -1 && counter >= 0 && counter < 8 && !this.state.boardState[current].includes("white")) {
                if (!blackControlledSquares.includes(current)) {
                  possibleMoves.push(current);
                }
              }
            }

            possibleMoves =  possibleMoves.filter((value) => this.checkIllegalMove(value, location))
        break;
        case "blackKing":
            //console.log(this.state.boardState)
            console.log(this.state.whiteControlledSquares, "white controlled squares, in case blackKing")
            for (let movement in verticalPieceMovements) {
              let current = location + verticalPieceMovements[movement];
              if (current < 64 && current > -1 && !this.state.boardState[current].includes("black"))  {
                if (!whiteControlledSquares.includes(current)) {
                  possibleMoves.push(current);
                }
              }
            }

            for (let movement of horizontalPieceMovements)  {
              let current = location + movement;
              if (current > -1 && current < 64) {
                if (!this.state.boardState[current].includes("black") && Math.floor(current * .125) === Math.floor(location * .125))  {
                  if (!whiteControlledSquares.includes(current)) {
                    possibleMoves.push(current);
                  }
                }
              }
            }

            for (let movement in diagonalPieceMovements) {
              let current = location + diagonalPieceMovements[movement];
              let counter = mod;
              movement % 2 === 0 ? counter-- : counter++;
              if (current < 64 && current > -1 && counter >= 0 && counter < 8 && !this.state.boardState[current].includes("black")) {
                if (!whiteControlledSquares.includes(current)) {
                  possibleMoves.push(current);
                }
              }
            }

            possibleMoves = possibleMoves.filter((value) => this.checkIllegalMove(value, location))
        break;
        default:
      }
      return possibleMoves
  }

  checkMateCheck = () => {
    if (this.state.checked === false)  {
      let array = this.checkSquaresControlled()
      let whiteKingPosition = -1
      let blackKingPosition = -1
      let possibleWhiteMoves = []
      let possibleBlackMoves = []
      let whiteControlledSquares = array[0]
      let blackControlledSquares = array[1]
      for (let location = 0; location < 64; location++) {
        if (this.state.boardState[location].length !== 0) {
          if (this.state.boardState[location].includes("white"))  {
            possibleWhiteMoves = [...possibleWhiteMoves, ...this.checkmateHelper(location, whiteControlledSquares, blackControlledSquares)]
          } else {
            possibleBlackMoves = [...possibleBlackMoves, ...this.checkmateHelper(location, whiteControlledSquares, blackControlledSquares)]
          }
          if (this.state.boardState[location] === "whiteKing") whiteKingPosition = location
          if (this.state.boardState[location] === "blackKing") blackKingPosition = location
        }
      }
      console.log("White's Moves", this.state.playerTurn, possibleWhiteMoves)
      console.log("Black's Moves", this.state.playerTurn, possibleBlackMoves)

      if (this.state.playerTurn === "White" && possibleBlackMoves.includes(whiteKingPosition) && possibleWhiteMoves.length === 0) {
        this.setState({
          moveRecord: [...this.state.moveRecord.slice(0,this.state.moveRecord.length - 1), this.state.moveRecord[this.state.moveRecord.length - 1] + '#'],
          checked: true,
          gameOver: true,
          playerTurn: "Black"
        })
      } else if (this.state.playerTurn === "White" && possibleBlackMoves.includes(whiteKingPosition)) {
        this.setState({
          moveRecord: [...this.state.moveRecord.slice(0,this.state.moveRecord.length - 1), this.state.moveRecord[this.state.moveRecord.length - 1] + '+'],
          checked: true
        })
      } else if (this.state.playerTurn === "Black" && possibleWhiteMoves.includes(blackKingPosition) && possibleBlackMoves.length === 0) {
        this.setState({
          moveRecord: [...this.state.moveRecord.slice(0,this.state.moveRecord.length - 1), this.state.moveRecord[this.state.moveRecord.length - 1] + '#'],
          checked: true,
          gameOver: true,
          playerTurn: "White"
        })
      } else if (this.state.playerTurn === "Black" && possibleWhiteMoves.includes(blackKingPosition)) {
        this.setState({
          moveRecord: [...this.state.moveRecord.slice(0,this.state.moveRecord.length - 1), this.state.moveRecord[this.state.moveRecord.length - 1] + '+'],
          checked: true
        })
      } else if (this.state.playerTurn === "Black" && !possibleWhiteMoves.includes(blackKingPosition) && possibleBlackMoves.length === 0) {
        this.setState({
          checked: true,
          gameOver: true,
          isTie: true
        })
      } else if (this.state.playerTurn === "White" && !possibleBlackMoves.includes(blackKingPosition) && possibleWhiteMoves.length === 0) {
        this.setState({
          checked: true,
          gameOver: true,
          isTie: true
        })
      } else {
        this.setState({
          checked: true
        })
      }
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
        { this.checkMateCheck() }
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
              {this.state.gameOver === false &&
              <h2>{`${this.state.playerTurn} to move.`}</h2>
              }
              {(this.state.gameOver === true && this.state.isTie === false) &&
              <h2>{`${this.state.playerTurn} wins!`}</h2>
              }
              {(this.state.gameOver === true && this.state.isTie === true) &&
              <h2>{`Draw!`}</h2>
              }
              <div className="row">
                { moveList }
              </div>
              {(this.state.gameOver === true && this.state.playerTurn === "White" && this.state.isTie === false) &&
              <h2>{`1 - 0`}</h2>
              }
              {(this.state.gameOver === true && this.state.playerTurn === "Black" && this.state.isTie === false) &&
              <h2>{`0 - 1`}</h2>
              }
              {(this.state.gameOver === true && this.state.isTie === true) &&
              <h2>{`1/2 - 1/2`}</h2>
              }
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
export default App
