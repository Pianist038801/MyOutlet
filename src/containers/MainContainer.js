import { DrawerNavigator } from 'react-navigation';
import React, { Component } from 'react';
import { View } from 'react-native';
import ListContainer from '@containers/ListContainer';
import MapContainer from '@containers/MapContainer';
import { Colors, Fonts, Metrics } from '@theme/';

const routeConfigs = {
  shoplist: { screen: ListContainer },
  mapview: { screen: MapContainer },  
}; 

const navigatorConfig  = {
  drawerWidth: Metrics.screenWidth * 2 / 3,
  initialRouteName: 'shoplist', 
  contentOptions: { 
    activeTintColor: Colors.whiteColor,
    inactiveTintColor: Colors.textFourth,
    labelStyle: { ...Fonts.style.h2 },
    indicatorStyle: { height: 0 },
    scrollEnabled: false,
  },
};

const MainNavigator = DrawerNavigator(routeConfigs, navigatorConfig);

export default MainNavigator;