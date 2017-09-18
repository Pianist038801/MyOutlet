import React, { Component } from 'react';
import { View, Alert, ScrollView, TouchableOpacity, FlatList, Keyboard, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import NavigationBar from 'react-native-navbar'; 
import { Styles, Colors, Metrics, Fonts } from '@theme/';
import CommonWidgets from '@components/CommonWidgets';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import geolib from 'geolib';
var radio_props = [
    {label: 'Outlet Name', value: 0 },
    {label: 'Outlet ID', value: 1 },
    {label: 'Distance', value:2}
  ];
var sortVal = 0;
var _this;
onPress=(v)=>{}
class OptionBox extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            value3Index: 0,
            dayfilter: '_Visit_All',
            sortFilter: 0,
            popup: false
        }
        _this = this;
    } 
     
    onPress=(value)=>{
        this.setState({value3Index: value})
        this.props.onChange(value);
    }
     
    render()
    {
        var i =0;
        return(
            
                    <View style={{flex:1, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', }}>
                    {radio_props.map((obj,i)=>
                        <RadioButton labelHorizontal={true} key={i} > 
                            <RadioButtonInput
                            obj={obj}
                            index={i}
                            isSelected={this.state.value3Index === i}
                            onPress={this.onPress}
                            borderWidth={1}
                            buttonInnerColor={'#e74c3c'}
                            buttonOuterColor={this.state.value3Index === i ? '#2196f3' : '#000'}
                            buttonSize={20}
                            buttonOuterSize={25}
                            buttonStyle={{}}
                            buttonWrapStyle={{marginLeft: 10}}
                            />
                            <RadioButtonLabel
                            obj={obj}
                            index={i}
                            labelHorizontal={true}
                            onPress={this.onPress}
                            labelStyle={{fontSize: 20, color: Colors.brandPrimary}}
                            labelWrapStyle={{}}
                            />
                        </RadioButton> 
                    )}
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

export default connect(mapStateToProps, mapDispatchToProps)(OptionBox);
