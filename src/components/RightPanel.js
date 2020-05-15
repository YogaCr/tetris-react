import React from 'react'
import { useSelector } from 'react-redux';
import { color } from './Tetronium'
import '../assets/Tetris.css'
function RightPanel() {
    const score = useSelector(state => state.scoreCounter.score)
    const next = useSelector(state => state.nextShape.next)

    let nextShape = []
    let index = 0;
    for (let y = 0; y < Math.sqrt(next.length); y++) {
        let rowBlock = []
        for (let x = 0; x < Math.sqrt(next.length); x++, index++) {
            let style = {}
            if (!next[index]) {
                style = {
                    border: '1px solid black'
                }
            }
            rowBlock.push(<div className={"tetris-block " + color[next[index]]} style={style} key={index}></div>)
        }
        nextShape.push(<div style={{ width: 'auto' }} key={y}>{rowBlock}</div>)
    }
    return (
        <div>
            <div className="tetris-field" style={{ marginLeft: 8 }}>
                <h1 style={{ margin: 8 }}>Score</h1>
                <h2 style={{ margin: 8 }}>{score}</h2>
            </div>
            <div className="tetris-field" style={{ marginLeft: 8, marginTop: 8, display: 'flex', flexDirection: 'column', paddingBottom: 8, alignItems: 'center', width: '18vh', height: '22vh' }}>
                <h1 style={{ margin: 8 }}>Next</h1>
                <div style={{ margin: 8, padding: 8, display: 'flex', flexDirection: 'column' }}>{nextShape}</div>
            </div>
        </div>
    )
}
export default RightPanel
