import React, { Component } from 'react';
import { View, Alert, Linking, WebView, ScrollView, Platform, TouchableOpacity, FlatList, Keyboard, Image, Text } from 'react-native';
import { connect } from 'react-redux'; 
import NavigationBar from 'react-native-navbar'; 
import { Styles, Colors, Metrics, Fonts } from '@theme/';
import ServeyBox from '@components/ServeyBox'
import CommonWidgets from "@components/CommonWidgets";
class ServeyContainer extends Component{
    constructor(props)
    {
        super(props); 
    } 
   
    render()
    {
        return(
            <View style={[Styles.fullScreen, {flex: 1, backgroundColor:  Colors.brandSecondary }] }> 
                <NavigationBar
                statusBar={{ style: 'light-content' }}
                style={Styles.nav}
                title={CommonWidgets.renderNavBarHeader('Servey')}
                tintColor={Colors.brandPrimary}
                leftButton={CommonWidgets.renderNavBarLeftButton(() => this.props.navigation.goBack())}                
                  />
                <View style={{flexDirection: 'row'}} >
                    <ScrollView style={{flex:1}} > 
                        <Text style={{ fontSize:30, marginTop: 30, marginLeft: 30}}> Race </Text>
                        <ServeyBox style={{marginLeft: 20}} values={['Country1', 'Country2', 'Country3']}/>   
                        <Text style={{ fontSize:30, marginTop: 30, marginLeft: 30}}> Religion </Text>
                        <ServeyBox style={{marginLeft: 20}} values={['Buddhist', 'Islam', 'Christian']}/>   
                        <Text style={{ fontSize:30, marginTop: 30, marginLeft: 30}}> Outlet Type </Text>
                        <ServeyBox style={{marginLeft: 20}} values={['Coffee Shop', 'Cafe', 'Grocery', 'Others']}/>   
                        <Text style={{ fontSize:30, marginTop: 30, marginLeft: 30}}> Traffic  </Text>
                        <ServeyBox style={{marginLeft: 20}} values={['1-100', '101-200', '>200']}/>    
                    </ScrollView>
                    <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                        {CommonWidgets.renderTextButton( "Save", Colors.brandPrimary,  () => {alert('Servey Saved');},'black')}
                    </View>
                </View>

            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch, 
  };
}

function mapStateToProps(state) {
  const globals = state.get('globals');
  const navigator = state.get('routes');
  return { globals, navigator};
}

export default connect(mapStateToProps, mapDispatchToProps)(ServeyContainer);
