import { useDispatch, useSelector } from "react-redux"
import { RootState, clearErrormessage, onBadLogin, onChecking, onLogin } from "../store";
import { calendarApi } from "../api";
import { AxiosError } from "axios";

export const useAuthStore = () =>{

    const {status, user, errorMessage} = useSelector((state:RootState)=>state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({email, password}:{email:string, password:string}) =>{
        dispatch(onChecking());
        console.log(email, password);
        try {
            const {data} = await calendarApi.post('/auth/login', {email, password});
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());
            dispatch (onLogin({name:data.name, uid:data._id}))
        } catch (error) {
            dispatch(onBadLogin('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch(clearErrormessage());
            }, 10);
        }
    }

    const startRegister = async ({name, email, password}:{name:string,email:string,password:string })=>{
        dispatch(onChecking());
        try {
            const {data} = await calendarApi.post('/auth/new',{name,email,password});
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());
            dispatch (onLogin({name:data.name, uid:data.uid}))
        } catch (error) {
            if(error instanceof AxiosError){
                console.log(error.response?.data)
                if(error.response?.data.errors){
                    dispatch(onBadLogin('Error en el formulario'));
                }
                if(error.response?.data.msg === 'Duplicate key.'){
                    dispatch(onBadLogin('Mail ya registrado'))
                }
            }
            setTimeout(() => {
                dispatch(clearErrormessage());
            }, 10);
        }
    }

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if(!token) return dispatch(onBadLogin(''));
        try{
            const{data} = await calendarApi.get('auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());
            dispatch (onLogin({name:data.name, uid:data.uid}))
        } catch(error){
            localStorage.clear();
            dispatch(onBadLogin(''));
        }

    }

    const startLogout = () =>{
        localStorage.clear();
        dispatch(onBadLogin(''));
    }

    return {
        // All properties
        status, errorMessage, user,
        // All methods
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout,
    }
}