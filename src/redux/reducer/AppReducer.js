import {CARD_LIST} from '../action/Action'

const iniitialstate = {cardlist :[]}


function  cardReducer(state = iniitialstate, action){
    switch(action.type){
        case CARD_LIST:
        return Object.assign({}, state, {cardlist : action.payload})
        default :
        return state
    }
}

export default cardReducer