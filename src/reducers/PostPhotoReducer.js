import { POST_PHOTO_FAIL, POST_PHOTO_SUCCESS, POST_PHOTO_LOADING, INPUT_CAPTION_CHANGE, IMAGE_CHANGE } from '../actions/types';
const INTIAL_STATE = {
    image: null,
    caption: '',
    loading: false,
    error: ''
}

export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case INPUT_CAPTION_CHANGE:
            return { ...state, caption: action.payload }
        case IMAGE_CHANGE:
            return { ...state, image: action.payload }
        case POST_PHOTO_LOADING:
            return { ...state, loading: true, error: '' }
        case POST_PHOTO_FAIL:
            return { ...state, loading: false, error: action.payload }
        case POST_PHOTO_SUCCESS:
            return INTIAL_STATE
        default:
            return state;
    }
}