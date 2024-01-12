import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    email:null,
    id:null,
    token:null,
    nickname:null,
    info:null,
    avatar:null
};
const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser(state, action){
            state.email = action.payload.email;
            state.id = action.payload.id;
            state.token = action.payload.token;
        },
        removeUser(state){
            state.email = null;
            state.id = null;
            state.token = null;
            state.nickname = null;
            state.info = null;
            state.avatar = null;
        },
        setUserInfo(state,action){
            state.nickname = action.payload.nickname
            state.info = action.payload.info
            state.avatar = action.payload.avatar
            state.id = action.payload.id
            state.email = action.payload.email
        }
    }
});

export const {setUser,removeUser,setUserInfo} = userSlice.actions;

export default userSlice.reducer;