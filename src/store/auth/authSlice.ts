import {createSlice} from '@reduxjs/toolkit';
import { AUTH_STATUS } from '../../auth/types/AuthStatus';

interface UserInfo {
    name?:string
    uid?:string
}

interface AuthState{
    status:AUTH_STATUS,
    user:UserInfo,
    errorMessage:string|undefined
}

const initialState:AuthState={
    status:AUTH_STATUS.checking,
    user:{},
    errorMessage:undefined
}

export const authSlice = createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
        onChecking:(state) => {
            state.status = AUTH_STATUS.checking;
            state.user = {};
            state.errorMessage = undefined;
        },
        onLogin: (state,action)=>{
            state.status = AUTH_STATUS.authenticated;
            state.user = action.payload;
            state.errorMessage = undefined;
        },
        onBadLogin:(state, action) => {
            state.status = AUTH_STATUS.not_authenticated,
            state.user = {};
            state.errorMessage = action.payload;
        },
        clearErrormessage:(state)=>{
            state.errorMessage = undefined;
        }
    }
});

export const {onChecking, onLogin, onBadLogin, clearErrormessage} = authSlice.actions;