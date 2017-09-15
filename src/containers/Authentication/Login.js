import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  Platform,
  Image
 } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import I18n from 'react-native-i18n'; 
import Types from '@actions/actionTypes'; 
import OverlaySpinner from '@components/OverlaySpinner';
import CommonWidgets from '@components/CommonWidgets';

import { Styles, Images, Colors, Fonts, Metrics } from '@theme/';
import Utils from '@src/utils';
import styles from './styles';
import VersionNumber from 'react-native-version-number';
import { setSpinnerVisible, setNavigator } from '@actions/globals';

class Login extends Component {
  constructor(props) {
    super(props);
    this.props.setNavigator(this.props.navigation)
    this.state = {
      email: '',
      password: '',
    };
   
  
    
  }
  componentDidMount = () => { 
    navigator.geolocation.getCurrentPosition(
      (position) => { 
        this.props.dispatch({
          type: Types.SET_DATA, 
          data: {
              location:{
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
                }}
          });
      },
      (error) => alert(  error )
      ); 
  }
  
  onTextInputFocus(value) {
    this.setState({ emailFocus: false, passwordFocus: false });
    this.setState({ [`${value}Focus`]: true });
  }

  doLogin() {
    this.props.setSpinnerVisible(true);
    setTimeout(() => {
      this.props.setSpinnerVisible(false);
      this.props.navigation.navigate('list');
    }, 500);
  }
 

  render() {
    return (
      <KeyboardAwareScrollView
        style={{ flex: 1, backgroundColor: Colors.brandPrimary }}
        automaticallyAdjustContentInsets={false}>
        <View style={Styles.fullScreen}> 
           
          <View style={[Styles.center, { flex: 5 }]}>
            <Text style={[Fonts.style.h1, { color: Colors.textPrimary }]}>
              {I18n.t('APP_NAME')}
            </Text>
          </View>

          {/* -----Body---- */}
          <View style={styles.bodyContainer}>
            <View
              style={[Styles.textInputContainerStyle,
              { borderColor: Utils.getTextInputBorderColor(this.state.emailFocus) }]}>
              <TextInput
                style={Styles.textInputStyle}
                underlineColorAndroid={'transparent'}
                placeholder={I18n.t('EMAIL')}
                placeholderTextColor={Colors.textPlaceholder}
                multiline={false}
                onChangeText={text => this.setState({ email: text })}
                keyboardType={'email-address'}
                returnKeyType={'next'}
                onSubmitEditing={() => this.loginpwd.focus()}
                onFocus={() => this.onTextInputFocus('email')} />
            </View>
            {CommonWidgets.renderSpacer(1)}
            <View
              style={[Styles.textInputContainerStyle,
              { borderColor: Utils.getTextInputBorderColor(this.state.passwordFocus) }]}>
              <TextInput
                ref={(c) => { this.loginpwd = c; }}
                style={Styles.textInputStyle}
                underlineColorAndroid={'transparent'}
                placeholder={I18n.t('PASSWORD')}
                placeholderTextColor={Colors.textPlaceholder}
                multiline={false}
                secureTextEntry
                onChangeText={text => this.setState({ password: text })}
                returnKeyType={'go'}
                onSubmitEditing={() => this.doLogin()}
                onFocus={() => this.onTextInputFocus('password')} />
            </View>
            {CommonWidgets.renderSpacer(20)}
            {CommonWidgets.renderMaterialButton(I18n.t('LOGIN'),
              Colors.brandSecondary, () => this.doLogin())}
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

Login.propTypes = {
  dispatch: React.PropTypes.func.isRequired, 
  setSpinnerVisible: React.PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    setNavigator: route => dispatch(setNavigator(route)),
    setSpinnerVisible: spinnerVisible => dispatch(setSpinnerVisible(spinnerVisible)),
  };
}
function mapStateToProps(state) {
  const globals = state.get('globals');
  return { globals };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
