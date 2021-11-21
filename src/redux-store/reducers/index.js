export const loginReducer = (state = false, action)=> {
    switch(action.type){
        case "LOGIN":
            state = true;
            return {state, user: action['payload']}

        default:
            return state;
    }
}



