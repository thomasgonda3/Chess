import React, { Component } from 'react'
import whitePawn from '../images/Chess_plt60.png'
import whiteKnight from '../images/Chess_nlt60.png'
import whiteBishop from '../images/Chess_blt60.png'
import whiteRook from '../images/Chess_rlt60.png'
import whiteQueen from '../images/Chess_qlt60.png'
import whiteKing from '../images/Chess_klt60.png'
import blackPawn from '../images/Chess_pdt60.png'
import blackKnight from '../images/Chess_ndt60.png'
import blackBishop from '../images/Chess_bdt60.png'
import blackRook from '../images/Chess_rdt60.png'
import blackQueen from '../images/Chess_qdt60.png'
import blackKing from '../images/Chess_kdt60.png'

class Square extends Component{
  constructor(props){
    super(props)
    this.state = {
      squareName: "",
      whitePawn: false,
      whiteKnight: false,
      whiteBishop: false,
      whiteRook: false,
      whiteQueen: false,
      whiteKing: false,
      blackPawn: false,
      blackKnight: false,
      blackBishop: false,
      blackRook: false,
      blackQueen: false,
      blackKing: false,
      empty: false,
      moveableSquares: []
    }
  }

  showPiece = () => {
    switch (this.props.boardState[this.props.index])  {
      case 'whitePawn':
        if (this.state.whitePawn !== true) {
          this.setState({
            whitePawn: true,
            whiteKnight: false,
            whiteBishop: false,
            whiteRook: false,
            whiteQueen: false,
            whiteKing: false,
            blackPawn: false,
            blackKnight: false,
            blackBishop: false,
            blackRook: false,
            blackQueen: false,
            blackKing: false,
            empty: false
          })
        }
      break;
      case 'whiteKnight':
        if (this.state.whiteKnight !== true) {
          this.setState({
            whitePawn: false,
            whiteKnight: true,
            whiteBishop: false,
            whiteRook: false,
            whiteQueen: false,
            whiteking: false,
            blackPawn: false,
            blackKnight: false,
            blackBishop: false,
            blackRook: false,
            blackQueen: false,
            blackKing: false,
            empty: false
          })
        }
      break;
      case 'whiteBishop':
        if (this.state.whiteBishop !== true) {
          this.setState({
            whitePawn: false,
            whiteKnight: false,
            whiteBishop: true,
            whiteRook: false,
            whiteQueen: false,
            whiteKing: false,
            blackPawn: false,
            blackKnight: false,
            blackBishop: false,
            blackRook: false,
            blackQueen: false,
            blackKing: false,
            empty: false
          })
        }
      break;
      case 'whiteRook':
        if (this.state.whiteRook !== true) {
          this.setState({
            whitePawn: false,
            whiteKnight: false,
            whiteBishop: false,
            whiteRook: true,
            whiteQueen: false,
            whiteKing: false,
            blackPawn: false,
            blackKnight: false,
            blackBishop: false,
            blackRook: false,
            blackQueen: false,
            blackKing: false,
            empty: false
          })
        }
      break;
      case 'whiteQueen':
        if (this.state.whiteQueen !== true) {
          this.setState({
            whitePawn: false,
            whiteKnight: false,
            whiteBishop: false,
            whiteRook: false,
            whiteQueen: true,
            whiteKing: false,
            blackPawn: false,
            blackKnight: false,
            blackBishop: false,
            blackRook: false,
            blackQueen: false,
            blackKing: false,
            empty: false
          })
        }
      break;
      case 'whiteKing':
        if (this.state.whiteKing !== true) {
          this.setState({
            whitePawn: false,
            whiteKnight: false,
            whiteBishop: false,
            whiteRook: false,
            whiteQueen: false,
            whiteKing: true,
            blackPawn: false,
            blackKnight: false,
            blackBishop: false,
            blackRook: false,
            blackQueen: false,
            blackKing: false,
            empty: false
          })
        }
      break
      case 'blackPawn':
        if (this.state.blackPawn !== true) {
          this.setState({
            whitePawn: false,
            whiteKnight: false,
            whiteBishop: false,
            whiteRook: false,
            whiteQueen: false,
            whiteKing: false,
            blackPawn: true,
            blackKnight: false,
            blackBishop: false,
            blackRook: false,
            blackQueen: false,
            blackKing: false,
            empty: false
          })
        }
      break;
      case 'blackKnight':
        if (this.state.blackKnight !== true) {
          this.setState({
            whitePawn: false,
            whiteKnight: false,
            whiteBishop: false,
            whiteRook: false,
            whiteQueen: false,
            whiteKing: false,
            blackPawn: false,
            blackKnight: true,
            blackBishop: false,
            blackRook: false,
            blackQueen: false,
            blackking: false,
            empty: false
          })
        }
      break;
      case 'blackBishop':
        if (this.state.blackBishop !== true) {
          this.setState({
            whitePawn: false,
            whiteKnight: false,
            whiteBishop: false,
            whiteRook: false,
            whiteQueen: false,
            whiteKing: false,
            blackPawn: false,
            blackKnight: false,
            blackBishop: true,
            blackRook: false,
            blackQueen: false,
            blackKing: false,
            empty: false
          })
        }
      break;
      case 'blackRook':
        if (this.state.blackRook !== true) {
          this.setState({
            whitePawn: false,
            whiteKnight: false,
            whiteBishop: false,
            whiteRook: false,
            whiteQueen: false,
            whiteKing: false,
            blackPawn: false,
            blackKnight: false,
            blackBishop: false,
            blackRook: true,
            blackQueen: false,
            blackKing: false,
            empty: false
          })
        }
      break;
      case 'blackQueen':
        if (this.state.blackQueen !== true) {
          this.setState({
            whitePawn: false,
            whiteKnight: false,
            whiteBishop: false,
            whiteRook: false,
            whiteQueen: false,
            whiteKing: false,
            blackPawn: false,
            blackKnight: false,
            blackBishop: false,
            blackRook: false,
            blackQueen: true,
            blackKing: false,
            empty: false
          })
        }
      break;
      case 'blackKing':
        if (this.state.blackKing !== true) {
          this.setState({
            whitePawn: false,
            whiteKnight: false,
            whiteBishop: false,
            whiteRook: false,
            whiteQueen: false,
            whiteKing: false,
            blackPawn: false,
            blackKnight: false,
            blackBishop: false,
            blackRook: false,
            blackQueen: false,
            blackKing: true,
            empty: false
          })
        }
      break;
      case '':
        if (this.state.empty !== true) {
          this.setState({
            whitePawn: false,
            whiteKnight: false,
            whiteBishop: false,
            whiteRook: false,
            whiteQueen: false,
            whiteKing: false,
            blackPawn: false,
            blackKnight: false,
            blackBishop: false,
            blackRook: false,
            blackQueen: false,
            blackKing: false,
            empty: true
          })
        }
      break;
      default:
    }
  }

  componentDidMount() {
    let columns = ["a", "b", "c", "d", "e", "f", "g", "h"]
    let rowName = Math.floor(this.props.index / 8) + 1
    let half = 4.5 - rowName
    rowName = rowName + half * 2
    let name = `${ columns[this.props.index % 8] }${ rowName }`
    this.setState({ squareName: name})
  }

  render(){
    return(
      <React.Fragment>
        { this.showPiece() }
        <div
          id = "square"
          style = { { backgroundColor: this.props.colorGrid[this.props.index] } }
          onMouseEnter={ () => this.props.findSquares(this.props.index) }
          onMouseLeave={ () => this.props.clearMove() }
          onClick = { () => this.props.movePiece(this.props.boardState[this.props.index], this.props.index, this.state.squareName)}
        >

        <div className = "pieceHolder">
          <div className = "piece"> { this.props.possibleMoves[this.props.index] &&
              <div id = "selector"></div>
          }</div>
          <div className = "piece"> { (this.props.moveSelected === true && this.props.index === this.props.startingPosition) &&
              <div id = "selectedSquare"></div>
          }</div>
          <div className = "piece"> { this.state.whitePawn && <img id = "chessPawn" src = { whitePawn } alt="White Pawn"/> } </div>
          <div className = "piece"> { this.state.whiteKnight && <img id = "chessPiece" src = { whiteKnight } alt="White Knight"/> } </div>
          <div className = "piece"> { this.state.whiteBishop && <img id = "chessPiece" src = { whiteBishop } alt="White Bishop"/> } </div>
          <div className = "piece"> { this.state.whiteRook && <img id = "chessPiece" src = { whiteRook } alt="White Rook"/> } </div>
          <div className = "piece"> { this.state.whiteQueen && <img id = "chessPiece" src = { whiteQueen } alt="White Queen"/> } </div>
          <div className = "piece"> { this.state.whiteKing && <img id = "chessPiece" src = { whiteKing } alt="White King"/> } </div>
          <div className = "piece"> { this.state.blackPawn && <img id = "chessPawn" src = { blackPawn } alt="Black Pawn"/> } </div>
          <div className = "piece"> { this.state.blackKnight && <img id = "chessPiece" src = { blackKnight } alt="Black Knight"/> } </div>
          <div className = "piece"> { this.state.blackBishop && <img id = "chessPiece" src = { blackBishop } alt="Black Bishop"/> } </div>
          <div className = "piece"> { this.state.blackRook && <img id = "chessPiece" src = { blackRook } alt="Black Rook"/> } </div>
          <div className = "piece"> { this.state.blackQueen && <img id = "chessPiece" src = { blackQueen } alt="Black Queen"/> } </div>
          <div className = "piece"> { this.state.blackKing && <img id = "chessPiece" src = { blackKing } alt="Black King"/> } </div>
        </div>
        </div>

      </React.Fragment>
    )
  }
}
export default Square
