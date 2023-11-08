import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isDateModalOpen:false
    },
    reducers:{
        handleOpen:(state)=>{
            state.isDateModalOpen = true;
        },
        handleClose:(state)=>{
            state.isDateModalOpen = false;
        }
    }
});

export const {
    handleClose,
    handleOpen,
  } = uiSlice.actions;