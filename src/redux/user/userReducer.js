
const initialState = {
    Token:[],
    UserInfo:[]
}

import {SET_CREDENTIALS} from './userActions'

export default (state =  initialState, action) =>{
    switch(action.type){
        case SET_CREDENTIALS:
            return{
                ...state,
                Token:action.token,
                UserInfo:action.info
            }

    }

    return state;
}