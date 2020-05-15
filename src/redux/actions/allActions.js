export const increaseScore=(content)=>{
    return {
        type:'INCREASE_SCORE',
        content:content
    }
}

export const setNext=(content)=>{
    return{
        type:'NEXT_SHAPE',
        content:content
    }
}

export const holdShape=(content)=>{
    return{
        type:'HOLD_SHAPE',
        content:content
    }
}