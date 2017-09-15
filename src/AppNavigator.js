import React, { Component } from 'react';
import { BackAndroid, Platform, StatusBar, View, } from 'react-native';
import { connect } from 'react-redux';
  
import { Colors } from '@theme/';
import { StackNavigator } from 'react-navigation';
import Splash from '@containers/Splash';
import Login from '@containers/Authentication/Login';
import MainContainer from '@containers/MainContainer';
import ListContainer from '@containers/ListContainer';
import MapContainer from '@containers/MapContainer';


const AppNavigator = StackNavigator({
  splash: { screen: Splash },
  login: { screen: Login },
  list: {screen: ListContainer},
  map: {screen: MapContainer},
  main: { screen: MainContainer },      
}, {
  initialRouteName: 'login',
  navigationOptions: {
    header: null,
    gesturesEnabled: false,
    cardStack: { gesturesEnabled: false },
  },
  headerMode: 'screen',
  lazyLoad: true,
});

export default AppNavigator;       
