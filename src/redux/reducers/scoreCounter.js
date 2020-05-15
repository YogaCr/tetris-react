const initialState = {
    score: 0
}
const scoreCounter = (state = initialState, action) => {
    if (action.type === 'INCREASE_SCORE') {
        console.log(action.payload)
        return {
            ...state,
            score: state.score + action.content
        }
    }
    return state
}

export default scoreCounter;