
const initialState = {
    Token:null,
    UserInfo:null
}

import {SET_CREDENTIALS} from './userActions'

export default (state =  initialState, action) =>{
    switch(action.type){
        case SET_CREDENTIALS:
            return{
                ...state,
                Token:action.Token,
                UserInfo:action.UserInfo
            }

    }

    return state;
}