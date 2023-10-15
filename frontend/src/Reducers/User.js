import { createReducer, createAction } from "@reduxjs/toolkit";

const loginRequest = createAction('loginRequest')
const loginSuccess = createAction('loginSuccess')
const loginFailure = createAction('loginFailure')
const registerRequest = createAction('registerRequest')
const registerSuccess = createAction('registerSuccess')
const registerFailure = createAction('registerFailure')
const loadUserRequest = createAction('loadUserRequest')
const loadUserSuccess = createAction('loadUserSuccess')
const loadUserFailure = createAction('loadUserFailure')
const allUsersRequest = createAction('allUsersRequest')
const allUsersSuccess = createAction('allUsersSuccess')
const allUsersFailure = createAction('allUsersFailure')
const userProfileRequest = createAction('userProfileRequest')
const userProfileSuccess = createAction('userProfileSuccess')
const userProfileFailure = createAction('userProfileFailure')
const updateProfileRequest = createAction('updateProfileRequest')
const updateProfileSuccess = createAction('updateProfileSuccess')
const updateProfileFailure = createAction('updateProfileFailure')
const updateRoleRequest = createAction('updateRoleRequest')
const updateRoleSuccess = createAction('updateRoleSuccess')
const updateRoleFailure = createAction('updateRoleFailure')
const changePasswordRequest = createAction('changePasswordRequest')
const changePasswordSuccess = createAction('changePasswordSuccess')
const changePasswordFailure = createAction('changePasswordFailure')
const forgotPasswordRequest = createAction('forgotPasswordRequest')
const forgotPasswordSuccess = createAction('forgotPasswordSuccess')
const forgotPasswordFailure = createAction('forgotPasswordFailure')
const resetPasswordRequest = createAction('resetPasswordRequest')
const resetPasswordSuccess = createAction('resetPasswordSuccess')
const resetPasswordFailure = createAction('resetPasswordFailure')
const logoutUserRequest = createAction('logoutUserRequest')
const logoutUserSuccess = createAction('logoutUserSuccess')
const logoutUserFailure = createAction('logoutUserFailure')
const getShipInfoRequest = createAction('getShipInfoRequest')
const getShipInfoSuccess = createAction('getShipInfoSuccess')
const getShipInfoFailure = createAction('getShipInfoFailure')
const saveShipInfoRequest = createAction('saveShipInfoRequest')
const saveShipInfoSuccess = createAction('saveShipInfoSuccess')
const saveShipInfoFailure = createAction('saveShipInfoFailure')
const clearMsg = createAction('clearMsg')
const clearError = createAction('clearError')

const initialState = { isAuthenticated: false }

export const userReducer = createReducer(initialState, builder => {
    builder.addCase(loginRequest, state => {
        state.loading = true
    })
    builder.addCase(loginSuccess, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
    })
    builder.addCase(loginFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false
    })
    builder.addCase(registerRequest, state => {
        state.loading = true
    })
    builder.addCase(registerSuccess, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
    })
    builder.addCase(registerFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false
    })
    builder.addCase(loadUserRequest, state => {
        state.loading = true
    })
    builder.addCase(loadUserSuccess, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
    })
    builder.addCase(loadUserFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false
    })
    builder.addCase(allUsersRequest, state => {
        state.loading = true
    })
    builder.addCase(allUsersSuccess, (state, action) => {
        state.loading = false
        state.users = action.payload
    })
    builder.addCase(allUsersFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(logoutUserRequest, state => {
        state.loading = true
    })
    builder.addCase(logoutUserSuccess, state => {
        state.loading = false
        state.user = null
        state.isAuthenticated = false
    })
    builder.addCase(logoutUserFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = true
    })
    builder.addCase(clearError, state => {
        state.error = null
    })
})

export const userProfileReducer = createReducer(initialState, builder => {
    builder.addCase(userProfileRequest, state => {
        state.loading = true
    })
    builder.addCase(userProfileSuccess, (state, action) => {
        state.loading = false
        state.user = action.payload
    })
    builder.addCase(userProfileFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(updateRoleRequest, state => {
        state.loading = true
    })
    builder.addCase(updateRoleSuccess, (state, action) => {
        state.loading = false
        state.user = action.payload
    })
    builder.addCase(updateRoleFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(clearError, state => {
        state.error = null
    })
})

export const updateMyProfileReducer = createReducer({}, builder => {
    builder.addCase(updateProfileRequest, state => {
        state.loading = true
    })
    builder.addCase(updateProfileSuccess, (state, action) => {
        state.loading = false
        state.msg = action.payload
    })
    builder.addCase(updateProfileFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(clearError, state => {
        state.error = null
    })
    builder.addCase(clearMsg, state => {
        state.msg = null
    })
})

export const passwordReducer = createReducer({}, builder => {
    builder.addCase(changePasswordRequest, state => {
        state.loading = true
    })
    builder.addCase(changePasswordSuccess, (state, action) => {
        state.loading = false
        state.msg = action.payload
    })
    builder.addCase(changePasswordFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(forgotPasswordRequest, state => {
        state.loading = true
    })
    builder.addCase(forgotPasswordSuccess, (state, action) => {
        state.loading = false
        state.msg = action.payload
    })
    builder.addCase(forgotPasswordFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(resetPasswordRequest, state => {
        state.loading = true
    })
    builder.addCase(resetPasswordSuccess, (state, action) => {
        state.loading = false
        state.msg = action.payload
    })
    builder.addCase(resetPasswordFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(clearMsg, state => {
        state.msg = null
    })
    builder.addCase(clearError, state => {
        state.error = null
    })
})

export const shipReducer = createReducer({}, builder => {
    builder.addCase(getShipInfoRequest, (state) => {
        state.loading = true
    })
    builder.addCase(getShipInfoSuccess, (state, action) => {
        state.shipInfo = action.payload
        state.loading = false
    })
    builder.addCase(getShipInfoFailure, (state, action) => {
        state.error = action.payload
        state.loading = false
    })
    builder.addCase(saveShipInfoRequest, (state) => {
        state.loading = true
    })
    builder.addCase(saveShipInfoSuccess, (state, action) => {
        state.shipInfo = action.payload
        state.loading = false
    })
    builder.addCase(saveShipInfoFailure, (state, action) => {
        state.error = action.payload
        state.loading = false
    })
    builder.addCase(clearError, state => {
        state.error = null
    })
})