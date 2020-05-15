const initialState = {
    hold: []
}
const holdShape = (state = initialState, action) => {
    if (action.type === "HOLD_SHAPE") {
        return {
            ...state,
            hold: action.content
        }

    }
    return state
}

export default holdShape