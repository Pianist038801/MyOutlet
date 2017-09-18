import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { View, StyleSheet, Text, Image, Alert, TouchableOpacity} from 'react-native';
import { Metrics, Images, Colors, Styles, Fonts } from '@theme/';
import { DrawerItems } from 'react-navigation';     
import CommonWidgets from '@components/CommonWidgets'      
import Utils from '@src/utils';
const styles = StyleSheet.create({
  currency: {
    ...Fonts.style.h2,
    color: Colors.whiteLetter,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 50,
    backgroundColor: Colors.brandSecondary
  },
  infoView:{
    flex:1,
    backgroundColor: Colors.bk1,
    padding: 20, 
  },
  menuView:{
    flex:2,
    backgroundColor: Colors.bk2
  }
});

class DrawerContent extends Component {

  render() {
    return (
        <View style={styles.container}>  
           
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('About')}} >
                <Text  style={{padding: 10, fontWeight:'bold', fontSize:30, color: Colors.brandPrimary, backgroundColor: Colors.bk1}}>
                    About
                </Text>  
            </TouchableOpacity>  
            <TouchableOpacity onPress={()=>this.props.globals.navigator.dispatch(Utils.getResetAction('login'))} >
                <Text  style={{padding: 10, fontWeight:'bold', fontSize:30, color: Colors.brandPrimary, backgroundColor: Colors.bk1}}>
                    Log Out
                </Text>  
            </TouchableOpacity>    
        </View>
    );
  }
}
 
function mapDispatchToProps(dispatch) { 
  return {
    dispatch,
    replaceRoute: route => dispatch(replaceRoute(route)),
    closeDrawer: () => dispatch(closeDrawer()),
    setSpinnerVisible: spinnerVisible => dispatch(setSpinnerVisible(spinnerVisible)),
  };
}
function mapStateToProps(state) {
  const globals = state.get('globals');
  const routes = state.get('routes');
  return { globals, routes };
}
export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
