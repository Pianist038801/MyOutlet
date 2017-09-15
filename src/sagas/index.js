import { put, call, takeEvery, takeLatest } from 'redux-saga/effects';
import Types from '@actions/actionTypes'; 
import getList from '../api/getList';
function* getListFromServer(action) {
  try {
    yield put({type: Types.SET_SPINNER_VISIBLE, spinnerVisible: true})
    const values = yield call(getList);
    console.log(values);
    console.log('__________________'); 
    yield put({
      type: Types.SET_DATA,
      data: {list: values}, //response data
    }); 
    yield put({type: Types.SET_SPINNER_VISIBLE, spinnerVisible: false})
  } catch (error) {
    console.log('sss')
  }
}

export default function* loadTodos() {
  yield takeLatest("GET_LIST", getListFromServer);                                     
}
