import React, { Component } from 'react';
import { View, Alert, Linking, WebView, ScrollView, Platform, TouchableOpacity, FlatList, Keyboard, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import NavigationBar from 'react-native-navbar'; 
import { Styles, Colors, Metrics, Fonts } from '@theme/';
import CommonWidgets from '@components/CommonWidgets';
import CT from '@src/constants';
import Types from '@actions/actionTypes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import OverlaySpinner from '@components/OverlaySpinner';
import Utils from '@src/utils';
import DayFilter from '@components/DayFilter';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import PopupDialog,  { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import geolib from 'geolib'; 
var _this;
class MapContainer extends Component{
    constructor(props)
    {
        super(props);
        const info = [
            {
                key: 'saddr', 
                value: `${this.props.globals.data.location.latitude},${this.props.globals.data.location.longitude}`
            },
            {
            key: 'daddr', 
            value: `${props.navigation.state.params.data._GPS_Lat},${props.navigation.state.params.data._GPS_Lng}`
            }
        ];
        const getParameterString = (params = []) => {
            return params
              .map(({ key, value }) => {
                const encodedKey = encodeURIComponent(key)
                const encodedValue = encodeURIComponent(value)
          
                return `${encodedKey}=${encodedValue}`
              })
              .join('&')
          }
        const googleUrl = `http://maps.google.com/maps?${getParameterString(info)}`;
        const wazeUrl = `waze://?ll=${props.navigation.state.params.data._GPS_Lat},${props.navigation.state.params.data._GPS_Lng}&navigate=yes`;
        var dist = (geolib.getDistance(
          this.props.globals.data.location,
          {latitude: props.navigation.state.params.data._GPS_Lat, longitude: props.navigation.state.params.data._GPS_Lng}
          ))
        dist = dist / 1000;
        dist = dist.toFixed(2) 
        
        this.state={
            data: props.navigation.state.params.data,
            dist: dist,
            googleUrl: googleUrl,
            wazeUrl: wazeUrl,
            url: `https://www.google.com/maps/search/?api=1&query=${props.navigation.state.params.data._GPS_Lat},${props.navigation.state.params.data._GPS_Lng}`,
            bdr0: Colors.borderPrimary,
            bdr1: Colors.brandSecondary,
        }
        _this = this;
    } 
    setMap= (id)=>
    {
        this.setState({bdr1: Colors.brandSecondary, bdr0: Colors.brandSecondary});
        this.setState({[`bdr${id}`] : Colors.borderPrimary});
        if(id==1)
        {
            return Linking.openURL(`http://maps.google.com/maps?saddr=${this.props.globals.data.location.latitude},${this.props.globals.data.location.longitude}&daddr=${this.props.navigation.state.params.data._GPS_Lat},${this.props.navigation.state.params.data._GPS_Lng}`).catch(err=>alert('s'));
        }
        else
        { 
            Linking.canOpenURL(this.state.wazeUrl).then(supported => {
                if (!supported) {
                    if(Platform.OS==='android')
                        return Linking.openURL("market://details?id=com.waze");
                    else
                        return Linking.openURL("http://itunes.apple.com/us/app/id323229106");
                } else {
                  return Linking.openURL(this.state.wazeUrl).catch(err=>alert('s'));
                }
              }).catch(err => console.error('An error occurred', err));
            
        }
        //Linking.openURL("waze://?ll=5.12,35.23&navigate=yes").catch(err=>alert('s'));
        //this.setState({url: this.state.wazeUrl});
    }
    render()
    {
        return(
            <View style={[Styles.fullScreen, {flex: 1, backgroundColor:  Colors.brandSecondary }] }> 
                <NavigationBar
                statusBar={{ style: 'light-content' }}
                style={Styles.nav}
                title={CommonWidgets.renderNavBarHeader('Map')}
                tintColor={Colors.brandPrimary}
                leftButton={CommonWidgets.renderNavBarLeftButton(() => this.props.navigation.goBack())}                
                  /> 
                <View style={{flexDirection: 'column'}}>
                <Text style={{...Fonts.style.h5, color: Colors.text}}>{this.state.data._Customer_Name}</Text>
                <Text style={{...Fonts.style.h5, color: Colors.text}}>{this.state.data._Customer_ID}</Text>
                <Text style={{...Fonts.style.h5, color: Colors.text}}>{this.state.data._Addr}</Text>
                <Text style={{...Fonts.style.h5, color: Colors.text}}>{this.state.dist}KM</Text>
                </View>
                <WebView style={{margin: 30,}} source={{uri: this.state.url}}/>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    {CommonWidgets.renderTextButton('WazeMap', Colors.brandPrimary, ()=>{this.setMap(0)},this.state.bdr0)}
                    {CommonWidgets.renderTextButton('GoogleMap', Colors.brandPrimary, ()=>{this.setMap(1)},this.state.bdr1)}
                </View>
                <OverlaySpinner visible={this.props.globals.spinnerVisible} />   
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

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
