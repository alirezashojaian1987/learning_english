import { createSlice } from "@reduxjs/toolkit";

interface User{
    id:number;
    email:string;
    first_name?:string;
    last_name?:string;
}

interface AuthState{
    user:User | null;
    isAuthenticated:boolean;
    loading:boolean;
}

const initialState:AuthState={
    user:null,
    isAuthenticated:false,
    loading:false,
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUser(state,action){
            state.user=action.payload;
            state.isAuthenticated=true;
        },

        logout(state){
            state.user=null;
            state.isAuthenticated=false;
        },

        setLoading(state,action){
            state.loading=action.payload;
        },
    },
});

export const {setUser,logout,setLoading}=authSlice.actions;
export default authSlice.reducer;