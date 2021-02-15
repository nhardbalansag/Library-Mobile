import {APP_LINK} from '../../config'

const SET_CREDENTIALS = 'SET_CREDENTIALS';

export const loginCustomer = (email, password) =>{
    return async (dispatch) =>{
        const response  = await fetch(APP_LINK + 'login', {
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

        dispatch({
            type:SET_CREDENTIALS, 
            Token:responseData.token,
            UserInfo:responseData.data
        });
    }
}