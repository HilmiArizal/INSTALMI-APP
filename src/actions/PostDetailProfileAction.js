import { INIT_POST_DETAIL_PROFILE, DELETE_POST_LOADING, DELETE_POST_SUCCESS, DELETE_POST_FAIL, EDIT_POST, CANCEL_EDIT_POST } from './types';
import Axios from 'axios';
import { API_URL } from '../helpers/API_URL';
import AsyncStorage from '@react-native-community/async-storage';

export const initPostDetailProfile = (post) => {
    return {
        type: INIT_POST_DETAIL_PROFILE,
        payload: post
    }
}

export const editingPost = () => {
    return {
        type: EDIT_POST
    }
}

export const cancelEditPost = (caption) => {
    return {
        type: CANCEL_EDIT_POST,
        payload: caption
    }
}

export const deletePost = (postId) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: DELETE_POST_LOADING
            })
            const token = await AsyncStorage.getItem('usertoken');
            const options = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            const res = await Axios.delete(API_URL + `/post/deletepost/${postId}`, options)
            dispatch({
                type: DELETE_POST_SUCCESS
            })
        } catch (err) {
            dispatch({
                type: DELETE_POST_FAIL
            })
        }
    }
}