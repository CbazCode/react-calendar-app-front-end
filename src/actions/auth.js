import Swal from "sweetalert2";
import { fectchSinToken } from "../helpers/fetch"
import { types } from "../types/types";

export const startLogin = (email, password) => {
    return async( dispatch ) => {
        const resp = await fectchSinToken( 'auth', {email, password}, 'POST');
        const body = await resp.json();
        console.log(body);

        if(body.ok){
            localStorage.setItem( 'token' , body.token);
            localStorage.setItem( 'token-init-date' , new Date().getTime());
            dispatch( login({
                uid:body.uid,
                name:body.name
            }))
        }else{
            Swal.fire( 'Error', body.msg, 'error');
        }
    }
}

export const startRegister = (email, password, name) => {
    return async(dispatch)=>{
        const resp = await fectchSinToken('auth/new',{name, email, password}, 'POST');
        const body = await resp.json();
        console.log(body);
        if(body.ok){
            localStorage.setItem( 'token' , body.token);
            localStorage.setItem( 'token-init-date' , new Date().getTime());
            dispatch( login({
                uid:body.uid,
                name:body.name
            }))
        }else{
            Swal.fire( 'Error', body.msg, 'error');
        }
    }

}

const login = ( user ) => {
    return {
        type: types.authLogin,
        payload: user
    }
}