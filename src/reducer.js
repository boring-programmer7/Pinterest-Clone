export const initialState = {
    pins:[],
   
};

const reducer = (state, action) => {
    //console.log(action);
    switch (action.type) {

        case "SET_PINS": {
            return {
                ...state,
                pins:action.pins
            }
        }
        default:
            return state;
    }
};

export default reducer;