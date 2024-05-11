import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    type: null,
    msg: '',
    visible: false
}

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        showError: (state, action) => {
            state.type = 'error'
            state.msg = action.payload
        },
        showInfo: (state, action) => {
            state.type = 'info'
            state.msg = action.payload
        },
        showSuccess: (state, action) => {
            state.type = 'success'
            state.msg = action.payload
        },
        removeAlert: state => {
            state.visible = false
            state.type = null
            state.msg = ''
        }
    }
})

export default alertSlice
export const { removeAlert, showError, showInfo, showSuccess } = alertSlice.actions