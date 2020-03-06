import { IMAGE_CHANGE, INPUT_CAPTION_CHANGE, POST_PHOTO_SUCCESS, POST_PHOTO_LOADING, POST_PHOTO_FAIL } from '../actions/types'
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import { API_URL } from '../helpers/API_URL';

export const onInputCaptionChange = (caption) => {
    return {
        type: INPUT_CAPTION_CHANGE,
        payload: caption
    }
}

export const onImagePostChange = (image) => {
    return {
        type: IMAGE_CHANGE,
        payload: image
    }
}

export const postingPhoto = ({ image, caption }) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: POST_PHOTO_LOADING
            })
            
            const token = await AsyncStorage.getItem('usertoken')
            const options = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': `multipart/form-data`
                }
            }

            var data = new FormData();
            const img = {
                uri: image.path,
                type: 'image/jpeg',
                name: 'photo.jpg'
            }
            data.append('image', img)
            data.append('data', JSON.stringify({ caption }))

            const res = await Axios.post(API_URL + '/post/addpost', data, options)
            dispatch({
                type: POST_PHOTO_SUCCESS
            })
        } catch (err) {
            console.log(err)
            dispatch({
                type: POST_PHOTO_FAIL,
                payload: 'System Error'
            })
        }
    }
}