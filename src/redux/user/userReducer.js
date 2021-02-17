
const initialState = {
    Token:null,
    UserInfo:null,
    BookId:null
}

import {
    SET_CREDENTIALS,
    VIEW_ONE_BOOK
} from './userActions'

export default (state =  initialState, action) =>{
    switch(action.type){
        case SET_CREDENTIALS:
            return{
                ...state,
                Token:action.Token,
                UserInfo:action.UserInfo
            }
        case VIEW_ONE_BOOK:
            return{
                ...state,
                BookId:action.bookId
            }

    }

    return state;
}