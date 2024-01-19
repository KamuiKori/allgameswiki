import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categoryId:0,
    currentPage:1,
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action){
            state.categoryId = action.payload;
        },
        setSortType(state,action){
            state.sort = action.payload;
        },
        setCurrentPage(state,action){
            state.currentPage = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setCategoryId ,setSortType, setCurrentPage, setFilters} = filterSlice.actions

export default filterSlice.reducer