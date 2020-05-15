import React, { Component } from 'react';
import '../assets/Tetris.css';
import { connect } from 'react-redux';
import { increaseScore, setNext, holdShape } from '../redux/actions/allActions';
import { color, tetrisItem } from './Tetronium'

const width = 10
const height = 20
class Tetris extends Component {

    constructor() {
        super();
        this.state = {

        }
    }

    componentWillMount() {
        let nextShape = tetrisItem[Math.floor(Math.random() * 7)]
        this.props.setNext(nextShape)

        this.TetrisField = this.TetrisField.bind(this)
        this.StartNewGame = this.StartNewGame.bind(this)
        document.addEventListener("keydown", this.onKeyDown.bind(this))
        document.addEventListener("keyup", this.onKeyUp.bind(this))
        this.StartNewGame()
    }

    StartNewGame() {
        let tB = [];
        for (let y = 0; y < height; y++) {
            let row = [];
            for (let x = 0; x < width; x++) {
                row.push(0);
            }
            tB.push(row);
        }
        let BG = []
        for (let y = 0; y < height; y++) {
            let row = [];
            for (let x = 0; x < width; x++) {
                row.push(0);
            }
            BG.push(row);
        }

        let currShape = tetrisItem[Math.floor(Math.random() * 7)]
        this.setState({
            tetrisBox: tB,
            score: 0,
            start: true,
            speed: 1,
            current: currShape,
            bgBox: BG,
            alreadySwap: false,
            position: { x: (width / 2) - Math.floor(Math.sqrt(currShape.length) / 2), y: -Math.sqrt(currShape.length) + 1 }
        })
        this.GameProgress();
    }

    EraseCurrentBoard() {
        let tB = [...this.state.tetrisBox];
        let index = 0;
        let position = this.state.position;
        for (let y = position.y; y < position.y + Math.sqrt(this.state.current.length); y++) {
            for (let x = position.x; x < position.x + Math.sqrt(this.state.current.length); x++, index++) {
                if (y < 0) {
                    continue;
                }
                if (this.state.current[index]) {
                    tB[y][x] = 0;
                }
            }
        }
        this.setState({
            tetrisBox: tB
        })
    }

    DrawPiece() {
        let tB = [...this.state.tetrisBox];
        let index = 0;
        let position = this.state.position;
        for (let y = position.y; y < position.y + Math.sqrt(this.state.current.length); y++) {
            for (let x = position.x; x < position.x + Math.sqrt(this.state.current.length); x++, index++) {
                if (y < 0) {
                    continue;
                }
                if (this.state.current[index]) {
                    tB[y][x] = this.state.current[index];
                }
            }
        }
        this.setState({
            tetrisBox: tB
        })
    }

    GameProgress() {
        this.gameRun = setTimeout(() => {
            let position = this.state.position;
            if (this.CollisionCheck(0, 1, this.state.current)) {
                if (position.y < 0) {
                    this.setState({
                        start: false
                    })
                    return;
                }
                let nextShape = this.props.nextShape
                let getNext = nextShape;
                let setNext = tetrisItem[Math.floor(Math.random() * 7)]
                let index = 0;
                let tB = [...this.state.bgBox]
                for (let y = position.y; y < position.y + Math.sqrt(this.state.current.length); y++) {
                    for (let x = position.x; x < position.x + Math.sqrt(this.state.current.length); x++, index++) {
                        if (this.state.current[index]) {
                            tB[y][x] = this.state.current[index];
                        }
                    }
                }
                this.setState({
                    current: getNext,
                    alreadySwap: false,
                    position: {
                        x: width / 2 - Math.floor(Math.sqrt(getNext.length) / 2),
                        y: -Math.sqrt(getNext.length)
                    },
                    bgBox: tB
                })
                this.props.setNext(setNext)
                this.CheckRowClear()
            } else {
                this.EraseCurrentBoard();
                position = {
                    x: this.state.position.x,
                    y: this.state.position.y + 1
                }
                this.setState({
                    position: position
                })
                this.DrawPiece()
            }
            this.GameProgress()

        }, 300 / this.state.speed)
    }

    onKeyDown(e) {
        if (this.state.start && this.state.position.y > -Math.sqrt(this.state.current.length)) {
            //left arrow
            if (e.keyCode === 37) {
                if (!this.CollisionCheck(-1, 0, this.state.current)) {
                    this.EraseCurrentBoard();
                    this.setState({
                        position: {
                            x: this.state.position.x - 1,
                            y: this.state.position.y
                        }
                    })
                    this.DrawPiece()
                }

            }
            //up arrow or 'D'
            else if (e.keyCode === 38||e.keyCode===68) {
                this.RotateRight()
            }
            //'A'
            else if (e.keyCode===65){
                this.RotateLeft()
            }
            //right arrow
            else if (e.keyCode === 39) {
                if (!this.CollisionCheck(1, 0, this.state.current)) {
                    this.EraseCurrentBoard();
                    this.setState({
                        position: {
                            x: this.state.position.x + 1,
                            y: this.state.position.y
                        }
                    })
                    this.DrawPiece()
                }
            }
            //down arrow
            else if (e.keyCode === 40) {
                this.setState({
                    speed: 5
                })

            }
            //space
            else if (e.keyCode === 32) {
                let y = 1;
                while (!this.CollisionCheck(0, y, this.state.current)) {
                    y++;
                }
                this.EraseCurrentBoard()
                this.setState({
                    position: {
                        x: this.state.position.x,
                        y: this.state.position.y + y - 1
                    }
                })
                this.DrawPiece()
            }
            //shift
            else if (e.keyCode === 16) {
                if (!this.state.alreadySwap) {

                    clearTimeout(this.gameRun)
                    this.EraseCurrentBoard()
                    if (this.props.shapeHolded.length > 0) {
                        let backupShape = [...this.state.current]
                        this.setState({
                            alreadySwap: true,
                            position: {
                                x: width / 2 - Math.floor(Math.sqrt(this.props.shapeHolded.length) / 2),
                                y: -Math.sqrt(this.props.shapeHolded.length)
                            },
                            current: this.props.shapeHolded
                        })
                        this.props.holdShape(backupShape)
                    } else {
                        this.props.holdShape(this.state.current)
                        let nextShape = this.props.nextShape
                        let getNext = nextShape;
                        let setNext = tetrisItem[Math.floor(Math.random() * 7)]
                        this.props.setNext(setNext)
                        this.setState({
                            current: getNext,
                            alreadySwap: true,
                            position: {
                                x: width / 2 - Math.floor(Math.sqrt(getNext.length) / 2),
                                y: -Math.sqrt(getNext.length)
                            }
                        })
                    }
                    this.GameProgress()
                }
            }
        }
    }

    onKeyUp(e) {
        if (e.keyCode === 40) {
            this.setState({
                speed: 1
            })

        }
    }

    RotateLeft() {
        let backup = [...this.state.current];
        let map = []
        let current = []
        if (Math.sqrt(this.state.current.length) === 3) {
            map = [2, 5, 8, 1, 4, 7, 0, 3, 6];
        }
        else if (Math.sqrt(this.state.current.length) === 4) {
            map = [12, 8, 4, 0, 13, 9, 5, 1, 14, 10, 6, 2, 15, 11, 7, 3]

        }
        else if (Math.sqrt(this.state.current.length) === 2) {
            return
        }
        for (let i = 0; i < this.state.current.length; i++) {
            current[i] = backup[map[i]]
        }
        if (this.CollisionCheck(0, 0, current)) {
            return;
        }
        this.EraseCurrentBoard()
        this.setState({
            current: current
        }
        )
        this.DrawPiece()
    }

    RotateRight() {
        let backup = [...this.state.current];
        let map = [];
        let current = []
        if (Math.sqrt(this.state.current.length) === 3) {
            map = [6, 3, 0, 7, 4, 1, 8, 5, 2];
        } else if (Math.sqrt(this.state.current.length) === 4) {
            map = [3, 7, 11, 15, 2, 6, 10, 14, 1, 5, 9, 13, 0, 4, 8, 12]
        } else if (Math.sqrt(this.state.current.length) === 2) {
            return;
        }
        for (let i = 0; i < this.state.current.length; i++) {
            current[i] = backup[map[i]]
        }
        if (this.CollisionCheck(0, 0, current)) {
            return;
        }
        this.EraseCurrentBoard()
        this.setState({
            current: current
        }
        )
        this.DrawPiece()
    }

    CollisionCheck(xDir, yDir, piece) {
        let index = 0;
        for (let y = 0; y < Math.sqrt(piece.length); y++) {
            for (let x = 0; x < Math.sqrt(piece.length); x++, index++) {
                if (!piece[index]) { continue; }
                let newX = this.state.position.x + xDir + x;
                let newY = this.state.position.y + yDir + y;
                if (newX < 0 || newX >= width || newY >= height) { return true; }
                if (newY < 0) continue;
                if (this.state.bgBox[newY][newX] !== 0) {
                    return true;
                }
            }
        }
        return false;
    }

    CheckRowClear() {
        let foreField = [...this.state.tetrisBox]
        let bgField = [...this.state.bgBox]
        let clearExist = false
        let cleared = 0
        for (let row = 0; row < this.state.tetrisBox.length; row++) {
            let isClear = true
            for (let col = 0; col < this.state.tetrisBox[row].length; col++) {
                if (!this.state.tetrisBox[row][col]) {
                    isClear = false
                    break
                }
            }
            if (isClear) {
                clearExist = true
                cleared++
                for (let y = row; y > 1; y--) {
                    for (let c = 0; c < this.state.tetrisBox[row].length; c++) {
                        foreField[y][c] = foreField[y - 1][c]
                        bgField[y][c] = bgField[y - 1][c]
                    }
                }
                for (let c = 0; c < this.state.tetrisBox[row].length; c++) {
                    bgField[0][c] = 0
                }
            }
        }

        if (clearExist) {
            this.props.increaseScore(10 * cleared)
            this.setState({
                tetrisBox: [...foreField],
                bgBox: [...bgField]
            })
        }
        return clearExist
    }

    TetrisField() {
        let field = []
        if (this.state.tetrisBox === null) {
            return <div></div>
        }
        for (let y = 0; y < this.state.tetrisBox.length; y++) {
            let rowBlock = []
            for (let x = 0; x < this.state.tetrisBox[y].length; x++) {
                rowBlock.push(<div className={"tetris-block " + color[this.state.tetrisBox[y][x]]} key={y * 10 + x}></div>)
            }
            field.push(<div key={"row" + (y + 1)}>{rowBlock}</div>)
        }
        return <div>{field}</div>
    }

    render() {
        if (this.state.start) {
            return (<div className="tetris-field"><this.TetrisField></this.TetrisField></div>)
        }
        else {
            return (<div className="tetris-field" style={{ position: "relative" }}>
                <div style={{ height: "100%", zIndex: 100, background: "rgba(0, 0, 0, 0.9)", position: "absolute", width: "100%" }}>
                    <h1>Game Over</h1>
                    <button className="btn-retro btn-primary" onClick={this.StartNewGame}>Retry</button>
                </div>
                <this.TetrisField></this.TetrisField>
            </div>)
        }

    }
}

export default connect((state) => {
    const nextShape = state.nextShape.next
    const shapeHolded = state.holdShape.hold
    return { nextShape, shapeHolded }
}, { increaseScore, setNext, holdShape })(Tetris);