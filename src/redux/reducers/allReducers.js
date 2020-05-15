import scoreCounter from './scoreCounter'
import setNextShape from './nextShape'
import holdShape from './holdShape'
import { combineReducers } from 'redux'
const allReducers = combineReducers({
    scoreCounter,
    nextShape: setNextShape,
    holdShape
})

export default allReducers