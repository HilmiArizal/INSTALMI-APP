import { INIT_EDIT_PROFILE, INPUT_EDIT_PROFILE_TEXT, LOADING_SAVE_PROFILE, USER_LOGIN_SUCCESS } from '../actions/types'
    ;
const INITIAL_STATE = {
    profileimahe: '',
    username: '',
    displayname: '',
    bio: '',
    error: '',
    saveProfileSuccess: false,
    loading: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INIT_EDIT_PROFILE:
            return { ...INITIAL_STATE, ...action.payload }
        case INPUT_EDIT_PROFILE_TEXT:
            return { ...state, [action.payload.prop]: action.payload.value }
        case LOADING_SAVE_PROFILE:
            return { ...state, loading: true, error: '' }
        case USER_LOGIN_SUCCESS:
            return { ...INITIAL_STATE, saveProfileSuccess: true }
        default:
            return state
    }
}