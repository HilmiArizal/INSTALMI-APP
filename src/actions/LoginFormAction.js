import { INPUT_TEXT, HIDE_UNHIDE_PASSWORD, LOADING_LOGIN, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL } from './types';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import { API_URL } from '../helpers/API_URL';

export const onInputText = (prop, value) => {
    return {
        type: INPUT_TEXT,
        payload: {
            prop, value
        }
    }
}

export const hideUnhidePassword = () => {
    return {
        type: HIDE_UNHIDE_PASSWORD
    }
}

export const onUserLogin = ({ email, password }) => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOADING_LOGIN })
            const res = await Axios.post(API_URL + `/user/login`, {
                email, password
            })
            console.log(res.data)
            await AsyncStorage.setItem('usertoken', res.data.token)
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: res.data
            })

            const userToken = await AsyncStorage.getItem('usertoken')
            console.log('usertoken : ', userToken)

        } catch (err) {
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: err.response ? err.response.data.message : err.message
            })
        }
    }
}

export const userLoginCheck = () => {
    return async (dispatch) => {
        try {
            const token = await AsyncStorage.getItem('usertoken')
            if (!token) {
                return dispatch({
                    type: USER_LOGIN_FAIL
                })
            }
            const res = await Axios.post(API_URL + `/user/keeplogin`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(res.data)
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            dispatch({ type: USER_LOGIN_FAIL })
        }
    }
}

export const onUserLogout = () => {
    return async (dispatch) => {
        await AsyncStorage.removeItem('usertoken')
        dispatch({
            type: USER_LOGIN_FAIL
        })
    }
}