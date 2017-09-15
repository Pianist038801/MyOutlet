import React, { Component, PropTypes } from 'react';
import { Text, View, Modal, ScrollView, TouchableOpacity, Animated } from 'react-native'; 
import styles, { btnStyle, sheetStyle, hairlineWidth } from './styles';
import { Metrics, Images, Fonts, Colors, Styles } from '@theme/';

const TITLE_H = 40;
const CANCEL_MARGIN = 6;
const BUTTON_H = 50 + hairlineWidth;
const WARN_COLOR = '#ff3b30';
const MAX_HEIGHT = Metrics.screenHeight * 0.7;

let _this;
class DayFilter extends Component {

  constructor(props) {
    super(props);
    this.state={
      day: 7
    };
  }
  _renderButton(text, ind, onPress, loading = false) {
    let color = ind==this.state.day ? Colors.selected : Colors.brandPrimary ; 
    return (
      <TouchableOpacity key={ind}
        style={[Styles.button, { width: Metrics.screenWidth/8, backgroundColor: color }]}
        onPress={onPress}>
          <Text style={Fonts.style.buttonText}>
            {text}
          </Text>  
      </TouchableOpacity>
    ); 
  }
  _onPress=(ind)=>{
    var days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'All'];
    this.setState({day:ind})
    this.props.onPress('_Visit_' + days[ind]);
  }
  render() {
    const { cancelButtonIndex } = this.props;
    const { visible, sheetAnim } = this.state;
    var days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'All']
    return (
      <View style={{flexDirection: 'row'}}>
        {
          days.map((title, ind)=>(this._renderButton(title,ind,()=>{this._onPress(ind)})))
        }
      </View>
    );
  }
} 

DayFilter.defaultProps = {
  tintColor: '#007aff',
  onPress: () => {},

};


export default DayFilter;