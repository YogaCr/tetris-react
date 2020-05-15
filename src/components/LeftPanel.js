import React from 'react'
import { useSelector } from 'react-redux';
import { color } from './Tetronium'
import '../assets/Tetris.css'
function LeftPanel() {
    const hold = useSelector((state) => state.holdShape.hold)

    let holdShape = []
    let index = 0;
    for (let y = 0; y < Math.sqrt(hold.length); y++) {
        let rowBlock = []
        for (let x = 0; x < Math.sqrt(hold.length); x++, index++) {
            let style = {}
            if (!hold[index]) {
                style = {
                    border: '1px solid black'
                }
            }
            rowBlock.push(<div className={"tetris-block " + color[hold[index]]} style={style} key={index}></div>)
        }
        holdShape.push(<div style={{ width: 'auto' }} key={y}>{rowBlock}</div>)
    }
    return (
        <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end'}}>
            <div className="tetris-field" style={{ marginRight: 8, display: 'flex', flexDirection: 'column', paddingBottom: 8, alignItems: 'center', width: '18vh', height: '22vh' }}>
                <h1 style={{ margin: 8 }}>Hold</h1>
                <div style={{ margin: 8, padding: 8, display: 'flex', flexDirection: 'column' }}>{holdShape}</div>
            </div>
            <div style={{marginRight: 8}}>
                <h2>Controls : </h2>
                <h3>Left Arrow  : Move to left</h3>
                <h3>Right Arrow : Move to right</h3>
                <h3>Down Arrow  : Soft drop</h3>
                <h3>Space       : Hard drop</h3>
                <h3>Shift       : Hold current shape</h3>
                <h3>D/Up Arrow  : Rotate clockwise</h3>
                <h3>S           : Rotate counter-clockwise</h3>
            </div>
        </div>
    )
}
export default LeftPanel
