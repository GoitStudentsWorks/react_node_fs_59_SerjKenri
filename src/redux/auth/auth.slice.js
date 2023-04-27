import { createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { initUserState } from './auth.intit-state';
import { loginUser, refreshUser, signUpUser, currentUser, updateUser, logoutUser } from 'redux/operations';


const handlePending = state => state.isLoading = true

const handleRejected = state => state.isLoading = false


const authSlice = createSlice({
    name: 'auth',
    initialState: initUserState,
    extraReducers: builder => {
        builder
            .addCase(signUpUser.pending, handlePending)
            .addCase(signUpUser.rejected, handleRejected)
            .addCase(signUpUser.fulfilled, (state, actions) => {
                console.log(actions.payload)
                state.user = actions.payload.user;
                state.token = actions.payload.user.token;
                state.isLoggedIn = true;
                state.isLoading = false;
            })
            .addCase(loginUser.pending, handlePending)
            .addCase(loginUser.rejected, handleRejected)
            .addCase(loginUser.fulfilled, (state, actions) => {
                console.log(actions.payload)
                state.user = actions.payload.user;
                state.token = actions.payload.user.token;
                state.isLoggedIn = true;
                state.isLoading = false;
                console.log(storage);
                console.log(state);
            })
            .addCase(refreshUser.pending, state => {
                state.isLoading = true;
                state.isRefreshing = true;
            })
            .addCase(refreshUser.rejected, state => {
                state.isLoading = false;
                state.isRefreshing = false;
            })
            .addCase(refreshUser.fulfilled, (state, action) => {
                console.log(action.payload)
                state.user = action.payload;
                state.isLoggedIn = true;
                state.isRefreshing = false;
                state.isLoading = false;

            })
            .addCase(updateUser.pending, handlePending)
            .addCase(updateUser.rejected, handleRejected)
            .addCase(updateUser.fulfilled, (state, { payload }) => {
                state.user = { ...state.user, ...payload.user };
                state.isLoading = false;
            })
            .addCase(currentUser.pending, handlePending)
            .addCase(currentUser.rejected, handleRejected)
            .addCase(currentUser.fulfilled, (state, { payload }) => {
                state.user = { ...state.user, ...payload.user };
                state.isLoading = false;

            })
            .addCase(logoutUser.pending, handlePending)
            .addCase(logoutUser.rejected, handleRejected)
            .addCase(logoutUser.fulfilled, state => {
                state.isLoggedIn = false;
                state.user = {
                    name: null,
                    email: null,
                    token: null,
                    verify: null,
                    id: '',
                    avatarURL: '',
                    birthDay: '',
                    phone: '',
                    messenger: '',
                };
                state.token = null;
                state.isLoading = false;
            })
    },
});
export const authReducer = authSlice.reducer;

const persistConfig = {
    key: 'userToken',
    storage,
    whitelist: ['token'],
};

export const authPersistReducer = persistReducer(persistConfig, authReducer);
