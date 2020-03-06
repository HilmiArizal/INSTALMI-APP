import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { INIT_EDIT_PROFILE, INPUT_EDIT_PROFILE_TEXT, LOADING_SAVE_PROFILE, USER_LOGIN_SUCCESS } from './types';
import { API_URL } from '../helpers/API_URL';

export const initEditProfile = (user) => {
    return {
        type: INIT_EDIT_PROFILE,
        payload: user
    }
}

export const onInputEditProfileText = (prop, value) => {
    return {
        type: INPUT_EDIT_PROFILE_TEXT,
        payload: {
            prop, value
        }
    }
}

export const saveProfile = ({ username, displayname, bio }) => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOADING_SAVE_PROFILE })
            const token = await AsyncStorage.getItem('usertoken')
            const options = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            const res = await Axios.put(API_URL + '/user/editprofiledata', { username, displayname, bio }, options)
            await AsyncStorage.setItem('usertoken', res.data.token)
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const saveProfileImage = (image) => {
    return async (dispatch) => {
        try {
            const token = await AsyncStorage.getItem('usertoken')
            const options = {
                headers: {
                    'Authorization' : `Bearer${token}`,
                    'Content-Type' : `multipart/form-data`
                }
            }

            var formData = new FormData();
            const image = {
                uri: img.path,
                type: 'image/jpeg',
                name: 'photo.jpg'
            }
            formData.append('image', image)
            const res = await Axios.put(API_URL + `/user/editprofileimage`, formData, options)
            await AsyncStorage.setItem('usertoken', res.data.token)
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            console.log(err)
        }
    }
}