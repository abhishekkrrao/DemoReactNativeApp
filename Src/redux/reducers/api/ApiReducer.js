import { API_CALL } from '../../Actions';
const initialState = { data: [] }
export function apiReducer(state = initialState,action) {
    switch (action.type) {
        case API_CALL:
            console.log("action",action);
            return { ...state };
        default:
            return state;
    }
}