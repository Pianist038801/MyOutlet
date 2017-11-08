import React, { Component } from 'react';
import { View,  } from 'react-native';
import { connect } from 'react-redux'; 
import { Styles, Colors, Metrics, Fonts } from '@theme/'; 
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
 
 
var sortVal = 0;
var _this; 
class ServeyBox extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            value3Index: 0, 
            radio_props: [
                {label: props.values[0], value: 0 },
                {label: props.values[1], value: 1 },
                {label: props.values[2], value:2}
            ]
        }
        _this = this;
    }      
     
    onPress=(value)=>{
        this.setState({value3Index: value}) 
    }
    
    render()
    {
        var i =0;
        return(
            
                    <View style={[this.props.style,{flex:1, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', }]}>
                    {this.state.radio_props.map((obj,i)=>
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

export default connect(mapStateToProps, mapDispatchToProps)(ServeyBox);
