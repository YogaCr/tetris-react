const initialState={
    next:[]
}

const setNextShape=(state=initialState,action)=>{
    if(action.type==="NEXT_SHAPE"){
        return {
            ...state,
            next:action.content
        }
    }
    return state
}

export default setNextShape