import { createSlice, current } from "@reduxjs/toolkit"
import { act } from "react"

const initialState = {
    currentUser : {
        name : "test" ,
        age : 10 ,
        gender : "male"
    } , 
    error : null ,
    loading  : false
}

const slice = createSlice({
    name : "user" ,
    initialState ,
    reducers : {
        loginStart : ( state , action) => {
            state.loading = true
            state.error = null 
            state.currentUser = null
        } ,
        loginInSuccessfull : ( state , action) => {
            state.currentUser = action.payload.user 
            state.loading = false 
            state.error = null
        } ,
        loginFailed : (state , action) => {
            state.currentUser = null
            state.error = action.payload
            state.loading = false
        }
    }
})

export const {loginFailed , loginInSuccessfull , loginStart} = slice.actions

export default slice.reducer
