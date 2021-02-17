import {APP_LINK} from '../../config'

export const SET_CREDENTIALS = 'SET_CREDENTIALS';
export const VIEW_ONE_BOOK = 'VIEW_ONE_BOOK';

export const loginStudent = (email, password) =>{
    return async (dispatch) =>{
        const response  = await fetch(APP_LINK + 'login-student', {
            method: 'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })

        const responseData = await response.json();

        if(responseData.status){
            dispatch({
                type: SET_CREDENTIALS, 
                Token: responseData.token,
                UserInfo: responseData.information
            });

            throw new Error(true)

        }else{

            throw new Error(false)
        }
    }
}

export const ViewOneBook = (bookId) =>{
    return async (dispatch) =>{
        dispatch({
            type: VIEW_ONE_BOOK, 
            bookId: bookId
        });
    }
}