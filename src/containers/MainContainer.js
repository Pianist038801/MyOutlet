import { DrawerNavigator } from 'react-navigation';
import React, { Component } from 'react';
import { View } from 'react-native';
import ListContainer from '@containers/ListContainer';
import MapContainer from '@containers/MapContainer';
import About from '@containers/About';
import { Colors, Fonts, Metrics } from '@theme/';
import DrawerContent from '@components/DrawerContent';

const routeConfigs = {
  shoplist: { screen: ListContainer,
    navigationOptions: ({navigation}) => ({
      drawerLockMode: 'locked-closed'
    }) }, 
  About: {screen: About,
    navigationOptions: ({navigation}) => ({
      drawerLockMode: 'locked-closed'
    })
  }, 
  
}; 

const navigatorConfig  = {
  drawerWidth: Metrics.screenWidth * 2 / 3,
  initialRouteName: 'shoplist', 
  contentComponent: ({navigation})=><DrawerContent navigation={navigation}/>, 
  contentOptions: { 
    activeTintColor: Colors.whiteColor,
    inactiveTintColor: Colors.brandPrimary,
    labelStyle: { ...Fonts.style.h2 },
    indicatorStyle: { height: 0 },
    scrollEnabled: false,
  },
};

const MainNavigator = DrawerNavigator(routeConfigs, navigatorConfig);

export default MainNavigator;