import { put, call, takeEvery, takeLatest, select, cps } from 'redux-saga/effects';
import Types from '@actions/actionTypes';  
import {getLogin, getList, getVersion} from '@api/getList';
import VersionNumber from 'react-native-version-number';
import React, { Component,  } from 'react';
import {
  Platform,Linking, Alert
 } from 'react-native';
const getGlobals = (state)=>state.get('globals');
function* getListFromServer(action) {
  try {
     
    yield put({type: Types.SET_SPINNER_VISIBLE, spinnerVisible: true})
    let globals = yield select(getGlobals); 
    const values = yield call(getList, globals.data.userInfo._UserType, globals.data.userInfo._UserID);
    yield put({
      type: Types.SET_DATA,
      data: {list: values}, //response data
    }); 
    yield put({type: Types.SET_SPINNER_VISIBLE, spinnerVisible: false})
  } catch (error) {
    console.log('sss')
  }
}
 
function* logIn(action) {
  try { 
    const values =  yield call(getLogin,action.username, action.password, action.uid); 
   
    yield put({
      type: Types.SET_DATA,
      data: {userInfo: values}, //response data
    }); 
    if(values._UserID==null)
    { 
      alert('Invalid Credential')
    }
    else
    {   
      let globals = yield select(getGlobals); 
      globals.navigator.navigate('main');
    }
    yield put({type: Types.SET_SPINNER_VISIBLE, spinnerVisible: false})
  } catch (error) {
    console.log(error)
  }
}
export default function* loadTodos() {
  yield takeLatest("GET_LIST", getListFromServer); 
  yield takeLatest("LogIn", logIn);                                   
}
