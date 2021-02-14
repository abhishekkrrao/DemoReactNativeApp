import { takeEvery,call,put } from "redux-saga/effects";
import { API_CALL,API_CALL_FAILURE } from '../../Actions'
export const apiWatcherSaga = [ takeEvery(API_CALL,apiWorkerSaga)];
console.log(apiWatcherSaga)
function* apiWorkerSaga(action) {
    console.log(action)
    try {
        const response = yield call(apiCall);
        console.log('res: ',JSON.stringify(response))
        const data = response;
        yield put({ type: action.type,data });
    } catch (error) {
        console.log('error',JSON.stringify(error))
        yield put({ type: API_CALL_FAILURE,error });
    }
}
function apiCall() {
    return fetch("https://api.github.com/users/defunkt")
        .then(response => {
            return response.json();
        }).then(data => {
            return data;
        }).catch(error => {
            console.log(error);
            alert(error ? error.message : 'Something went wrong..!!');
        });

}