import { createSlice } from "@reduxjs/toolkit";
import type { User } from "@/types/user";

interface AuthState{
    user:User | null;
    isAuthenticated:boolean;
    loading:boolean;
}

const initialState:AuthState={
    user:null,
    isAuthenticated:false,
    loading:true,
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